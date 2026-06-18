-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('INSIGHT', 'PERSPECTIVE', 'PUBLICATION');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "SectionType" AS ENUM ('CONTENT', 'QUOTE');

-- CreateEnum
CREATE TYPE "BlockType" AS ENUM ('PARAGRAPH', 'IMAGE');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'RESOLVED');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "featuredImage" TEXT NOT NULL,
    "writtenBy" TEXT NOT NULL,
    "category" "PostCategory" NOT NULL,
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "publishDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "type" "SectionType" NOT NULL DEFAULT 'CONTENT',
    "heading" TEXT,
    "quoteText" TEXT,
    "attribution" TEXT,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionBlock" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "type" "BlockType" NOT NULL,
    "text" TEXT,
    "imageUrl" TEXT,
    "order" INTEGER NOT NULL,

    CONSTRAINT "SectionBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_category_status_idx" ON "Post"("category", "status");

-- CreateIndex
CREATE INDEX "Section_postId_order_idx" ON "Section"("postId", "order");

-- CreateIndex
CREATE INDEX "SectionBlock_sectionId_order_idx" ON "SectionBlock"("sectionId", "order");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionBlock" ADD CONSTRAINT "SectionBlock_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
