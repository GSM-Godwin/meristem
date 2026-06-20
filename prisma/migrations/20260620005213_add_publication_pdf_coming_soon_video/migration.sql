-- AlterEnum
ALTER TYPE "BlockType" ADD VALUE 'VIDEO';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "comingSoon" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fileUrl" TEXT;

-- AlterTable
ALTER TABLE "SectionBlock" ADD COLUMN     "videoUrl" TEXT;
