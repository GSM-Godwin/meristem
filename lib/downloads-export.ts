import { prisma } from "@/lib/prisma";
import ExcelJS from "exceljs";

function formatDownloadDate(date: Date): string {
  return new Date(date).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function buildDownloadsWorkbook(publicationId?: string): Promise<ExcelJS.Buffer> {
  const where = publicationId ? { publicationId } : {};

  const downloads = await prisma.publicationDownload.findMany({
    where,
    include: { publication: { select: { title: true } } },
    orderBy: { createdAt: "desc" },
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Downloads");

  sheet.columns = [
    { header: "Email", key: "email", width: 32 },
    { header: "Phone", key: "phone", width: 20 },
    { header: "Publication", key: "publication", width: 48 },
    { header: "Downloaded At", key: "downloadedAt", width: 24 },
  ];

  sheet.getRow(1).font = { bold: true };

  for (const row of downloads) {
    sheet.addRow({
      email: row.email,
      phone: row.phone,
      publication: row.publication.title,
      downloadedAt: formatDownloadDate(row.createdAt),
    });
  }

  return workbook.xlsx.writeBuffer();
}

export function downloadsExportFilename(publicationTitle?: string): string {
  if (!publicationTitle) return "publication-downloads-all.xlsx";
  const safe = publicationTitle
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return `${safe || "publication"}-downloads.xlsx`;
}
