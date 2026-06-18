# Meristem Family Office — Build Overview

This is a step-by-step spec for an AI coding assistant (Claude Code, Cursor, etc.) to build the Meristem Family Office public website plus an internal admin dashboard for managing its content.

**Scope note:** the public-facing pages — Insights, Perspectives, Publications (listings and details), FAQ, Privacy Policy, and Terms & Conditions — already exist in the codebase, currently rendering static/hardcoded content. Home and About Us are still being built separately and are out of scope here. The actual remaining work is: build the database, authentication, and admin dashboard from scratch, then connect the existing Insights/Perspectives/Publications pages to read from that database instead of static content. Do not scaffold a new project and do not rebuild markup that already exists — see `04-public-frontend.md` for exactly what does and doesn't change on those pages.

Read this file first, then the others in order: `01-database-schema.md`, `02-authentication.md`, `03-admin-dashboard.md`, `04-public-frontend.md`, and finally `05-build-steps.md`, which is the literal task checklist.

## Recommended tech stack

- **Framework:** Next.js 14+ (App Router), TypeScript
- **Styling:** Tailwind CSS, using the project's existing custom theme tokens (brown/cream palette, serif display type for headings) rather than default Tailwind colors
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** Custom credentials-based session (bcrypt password hashing + JWT in an httpOnly cookie), protecting all `/admin` routes via middleware. No third-party auth provider needed — there is only ever a small, known set of admin users.
- **Image storage:** Cloudinary (free tier is sufficient). The database only ever stores the resulting image URL, never the binary.
- **Deployment target:** Vercel (not required, but assumed for examples like `revalidatePath`)

## Final information architecture

### Public site
- Home
- About Us
- Insights (listing — posts where `category = INSIGHT`)
- Perspectives (listing — posts where `category = PERSPECTIVE`)
- Publications (listing — posts where `category = PUBLICATION`)
- Shared detail page template, used by all three above (e.g. `/insights/[slug]`, `/perspectives/[slug]`, `/publications/[slug]`)
- Start the Conversation (contact form)
- Important Conversations (FAQ) — hardcoded content, not CMS-managed
- Privacy Policy — hardcoded content
- Terms & Conditions — hardcoded content

### Admin dashboard (`/admin`)
- Login
- Dashboard home (simple overview counts)
- Insights (list + add/edit — category locked to `INSIGHT`)
- Perspectives (list + add/edit — category locked to `PERSPECTIVE`)
- Publications (list + add/edit — category locked to `PUBLICATION`)
- Inquiries (list + view, sourced from the contact form)

Deliberately **not** built into the dashboard: FAQ, Static Pages, Media Library, Settings. Their content lives directly in code.

## Key decisions made during planning (do not deviate without checking with the project owner)

1. Insights, Perspectives, and Publications are **one content model** (`Post`), distinguished only by a `category` enum. There is no separate "downloadable file" field for Publications — they use the exact same body structure as everything else.
2. The featured image serves double duty as the hero image on the detail page **and** the thumbnail on listing pages/cards. There is no separate "cover image" field.
3. `writtenBy` is free text, not a relation to an authors table — it needs to support any individual's name, typed in directly.
4. The post body is **not** one freeform rich-text field. It is an ordered list of **Sections**. Each section is one of:
   - `CONTENT` — one required heading, plus an ordered list of **blocks**, where each block is either a paragraph or an image, in any order, repeatable (so images can sit between two paragraphs).
   - `QUOTE` — a quote string and an attribution line, no heading, no blocks.
5. Image captions/credits are explicitly not supported. Don't add a caption field to image blocks.
6. "More posts" at the bottom of a detail page is automatic — same `category`, excluding the current post, most recent first. It is never manually curated per-post.
7. Social share buttons (copy link, X, Facebook, Instagram) require zero admin input. They're generated client-side from the post's canonical URL. Instagram has no native "share to Instagram" web link the way X/Facebook do — treat that icon as "copy link for Instagram" rather than a real share intent.
8. **Open question, not yet resolved:** whether the date shown publicly on a post is the original publish date (set once, editable) or the last-modified date (auto-updating). The schema stores both (`publishDate` and `updatedAt`) so the decision can be made later without a migration. Default to displaying `publishDate` until told otherwise.

## How to brief your AI coding assistant

A reasonable first prompt, once these files are in your repo (e.g. under `/docs/build-spec/`):

> Read `00-overview-and-stack.md` through `05-build-steps.md` in `/docs/build-spec/`, then open `PROGRESS.md` in the same folder. Work through the unchecked tasks in `PROGRESS.md` in order, top to bottom. Before starting a task, mark it `[~]`; once it's actually built and working, mark it `[x]` and add a short note describing what you did, or anything you decided that wasn't already specified in the docs. Don't start a new numbered section while a task above it is still unchecked, and don't batch multiple tasks together — show me the result after each one before moving on. If something isn't covered in these docs, ask me instead of guessing.

Working one task at a time matters more than it sounds like it should — it's much easier to catch a wrong assumption after task 3 than after task 30, and `PROGRESS.md` means you can pick the conversation back up tomorrow without re-explaining where things stand.
