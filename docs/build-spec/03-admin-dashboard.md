# Admin Dashboard

Everything under `/admin`, protected per `02-authentication.md`.

## Visual style

The dashboard should reuse the public site's existing Tailwind theme tokens — the same brown/cream palette, the same fonts already configured in the project — rather than a generic gray admin theme. It should feel like part of the same product, not a bolted-on third-party tool.

## Navigation (sidebar)

Five items only:
1. **Dashboard** — overview/home
2. **Insights**
3. **Perspectives**
4. **Publications**
5. **Inquiries**

Nothing else. No Media Library, no Settings, no FAQ, no Static Pages — those were deliberately cut (see `00-overview-and-stack.md`).

## Dashboard home (`/admin`)

A few simple counts pulled from the database: total Insights, total Perspectives, total Publications, and open (non-resolved) Inquiries. A short "recent activity" list (most recently updated posts, most recent inquiries) is a nice-to-have, not a requirement.

## Insights / Perspectives / Publications pages (`/admin/insights`, `/admin/perspectives`, `/admin/publications`)

All three routes render the **same list component**, each just querying `Post` filtered by its matching `category`. Each shows: title, status (Draft/Published badge), date, and edit/delete actions. Each has an **"Add new"** button.

**Important:** the "Add new" button on each of these three pages must open the shared post form with `category` already set to match — Insights → `INSIGHT`, Perspectives → `PERSPECTIVE`, Publications → `PUBLICATION` — and that field should be locked/non-editable in the form when arriving this way, since changing a post's category after the fact would move it to a different listing page unexpectedly. (If category does need to be changeable later, that's a deliberate edit-mode exception, not the default add-new behavior.)

## The shared post form (add/edit)

One form, reused by all three sections, with this field order:

**Top-level fields:**
- Title (text, required)
- Short description (textarea, required) — shown under the title on the detail page and on listing cards
- Featured image (image upload, required) — doubles as both the hero image and the listing-card thumbnail
- Written by (text, required) — free text, any name
- Category — pre-filled and locked when adding from one of the three section pages
- Status — Draft / Published
- Publish date
- Featured on homepage (checkbox) — controls whether it can appear in home/about page carousels
- Long description (textarea, required) — the intro paragraph that sits above the sections, after the byline

**Sections (repeatable, ordered):**

Below the top-level fields, a "Page sections" area with a button to **Add section** and a separate button to **Add quote**.

A regular section (added via "Add section") contains:
- Heading (text, required)
- An ordered stack of blocks, each either a **paragraph** (textarea) or an **image** (upload) — added one at a time via "Add paragraph" / "Add image" buttons at the bottom of the section, so an editor can interleave them in any order (paragraph → image → paragraph → image, etc.)
- Each block can be deleted individually; reordering via drag handle is a nice-to-have, not required for v1

A quote section (added via "Add quote") contains just:
- Quote text (textarea, required)
- Attribution (text, optional)

On save, persist the top-level `Post` fields plus its `Section` rows (in the order they appear in the form) and each section's `SectionBlock` rows (in the order they appear within that section).

## Inquiries page (`/admin/inquiries`)

A simple list: name, email, submission date, status (New / Contacted / Resolved). Clicking a row shows the full message. Status should be updatable from this view (e.g. a dropdown or button), so someone can mark an inquiry as handled.
