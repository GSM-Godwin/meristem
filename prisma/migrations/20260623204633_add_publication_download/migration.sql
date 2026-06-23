-- CreateTable
CREATE TABLE "PublicationDownload" (
    "id" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PublicationDownload_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PublicationDownload_publicationId_createdAt_idx" ON "PublicationDownload"("publicationId", "createdAt");

-- AddForeignKey
ALTER TABLE "PublicationDownload" ADD CONSTRAINT "PublicationDownload_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
