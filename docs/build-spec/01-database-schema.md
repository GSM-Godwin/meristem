# Database Schema

PostgreSQL via Prisma. This is the full `schema.prisma` — copy it in directly and run a migration.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum PostCategory {
  INSIGHT
  PERSPECTIVE
  PUBLICATION
}

enum PostStatus {
  DRAFT
  PUBLISHED
}

enum SectionType {
  CONTENT
  QUOTE
}

enum BlockType {
  PARAGRAPH
  IMAGE
}

enum InquiryStatus {
  NEW
  CONTACTED
  RESOLVED
}

model Admin {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
}

model Post {
  id               String       @id @default(cuid())
  title            String
  slug             String       @unique
  shortDescription String
  longDescription  String
  featuredImage    String
  writtenBy        String
  category         PostCategory
  status           PostStatus   @default(DRAFT)
  featured         Boolean      @default(false)
  publishDate      DateTime     @default(now())
  createdAt        DateTime     @default(now())
  updatedAt        DateTime     @updatedAt
  sections         Section[]

  @@index([category, status])
}

model Section {
  id          String        @id @default(cuid())
  postId      String
  post        Post          @relation(fields: [postId], references: [id], onDelete: Cascade)
  type        SectionType   @default(CONTENT)
  heading     String?
  quoteText   String?
  attribution String?
  order       Int
  blocks      SectionBlock[]

  @@index([postId, order])
}

model SectionBlock {
  id        String    @id @default(cuid())
  sectionId String
  section   Section   @relation(fields: [sectionId], references: [id], onDelete: Cascade)
  type      BlockType
  text      String?
  imageUrl  String?
  order     Int

  @@index([sectionId, order])
}

model Inquiry {
  id        String        @id @default(cuid())
  name      String
  email     String
  message   String
  status    InquiryStatus @default(NEW)
  createdAt DateTime      @default(now())
}
```

## Why it's shaped this way

**`Post` is the single content model** behind Insights, Perspectives, and Publications. `category` decides which admin nav item and which public listing page a row belongs to — nothing else differs structurally between the three.

**`Section` is a child table, not a JSON blob.** Each row is one section of a post's body, ordered by `order` (0, 1, 2…). A section is either:
- `type = CONTENT`, which uses `heading` and has child `SectionBlock` rows, or
- `type = QUOTE`, which uses `quoteText` and `attribution` directly and has no blocks.

This keeps both section types in one ordered list per post, exactly matching the "sections stack top to bottom" mental model from the editor, while letting each type use only the fields relevant to it.

**`SectionBlock` is the paragraph/image stream inside a `CONTENT` section**, also ordered by `order`. A paragraph block uses `text`; an image block uses `imageUrl`. This is what allows images to sit between two paragraphs — they're just rows in the same ordered list.

**Slugs are generated in application code, not by Prisma** — slugify the title on create (e.g. `simple-vs-comprehensive-will`), and if a collision exists, append a short random suffix. Slugs should not change once published, since the public URL depends on them; if the title is edited later, leave the slug as-is unless explicitly regenerated.

**`featuredImage` is a single string URL**, not a relation to a media table — there's no media library, so each post just stores the URL of the image it uploaded directly.

## Seeding

Write a seed script (`prisma/seed.ts`) that creates: one `Admin` row (so there's a way to log in on a fresh database), and 2–3 sample `Post` rows — one per category — each with at least one `CONTENT` section with a paragraph + image block, and one `QUOTE` section, so the detail page template has real data to render against during development.
