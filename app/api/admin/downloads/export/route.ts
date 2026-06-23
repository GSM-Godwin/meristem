import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  buildDownloadsWorkbook,
  downloadsExportFilename,
} from "@/lib/downloads-export";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const publicationId = request.nextUrl.searchParams.get("publication");
  let publicationTitle: string | undefined;

  if (publicationId) {
    const publication = await prisma.post.findFirst({
      where: { id: publicationId, category: "PUBLICATION" },
      select: { title: true },
    });

    if (!publication) {
      return NextResponse.json({ error: "Publication not found." }, { status: 404 });
    }

    publicationTitle = publication.title;
  }

  const buffer = await buildDownloadsWorkbook(publicationId ?? undefined);
  const filename = downloadsExportFilename(publicationTitle);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
