export function pdfDownloadFilename(title: string, fallback = "publication"): string {
  const sanitized = title
    .trim()
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const base = sanitized || fallback;
  return base.toLowerCase().endsWith(".pdf") ? base : `${base}.pdf`;
}

function encodeCloudinaryAttachmentFilename(filename: string): string {
  return encodeURIComponent(filename).replace(/\./g, "%252E");
}

export function toDownloadUrl(url: string, filename?: string): string {
  if (!url) return url;
  if (!url.includes("/upload/")) return url;

  const flag = filename
    ? `fl_attachment:${encodeCloudinaryAttachmentFilename(filename)}`
    : "fl_attachment";

  const normalized = url.replace(/\/upload\/fl_attachment(?::[^/]+)?\//, "/upload/");
  return normalized.replace("/upload/", `/upload/${flag}/`);
}
