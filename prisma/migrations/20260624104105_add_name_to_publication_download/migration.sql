-- AlterTable
ALTER TABLE "PublicationDownload" ADD COLUMN     "name" TEXT,
ALTER COLUMN "phone" DROP NOT NULL;
