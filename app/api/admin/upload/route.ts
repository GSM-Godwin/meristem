import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { uploadFile, type UploadResourceType } from "@/lib/cloudinary";

type UploadKind = "image" | "pdf" | "video";

const KIND_CONFIG: Record<
  UploadKind,
  { resourceType: UploadResourceType; maxBytes: number; check: (file: File) => boolean; error: string }
> = {
  image: {
    resourceType: "image",
    maxBytes: 10 * 1024 * 1024,
    check: (file) => file.type.startsWith("image/"),
    error: "File must be an image",
  },
  pdf: {
    resourceType: "raw",
    maxBytes: 25 * 1024 * 1024,
    check: (file) => file.type === "application/pdf",
    error: "File must be a PDF",
  },
  video: {
    resourceType: "video",
    maxBytes: 100 * 1024 * 1024,
    check: (file) => file.type.startsWith("video/"),
    error: "File must be a video",
  },
};

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const kind = (formData.get("kind") as string | null) ?? "image";

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!(kind in KIND_CONFIG)) {
    return NextResponse.json({ error: "Unsupported upload kind" }, { status: 400 });
  }

  const config = KIND_CONFIG[kind as UploadKind];

  if (!config.check(file)) {
    return NextResponse.json({ error: config.error }, { status: 400 });
  }

  if (file.size > config.maxBytes) {
    const mb = Math.round(config.maxBytes / (1024 * 1024));
    return NextResponse.json(
      { error: `File must be under ${mb} MB` },
      { status: 400 }
    );
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const url = await uploadFile(buffer, config.resourceType);
    return NextResponse.json({ url });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
