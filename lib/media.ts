export function toDownloadUrl(url: string): string {
  if (!url) return url;
  if (url.includes("/upload/") && !url.includes("/upload/fl_attachment")) {
    return url.replace("/upload/", "/upload/fl_attachment/");
  }
  return url;
}
