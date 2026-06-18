# Connecting the Existing Front-End to the Backend

Insights, Perspectives, Publications, FAQ, Privacy Policy, and Terms & Conditions already exist as pages in the codebase. This document covers exactly what changes on them, and what doesn't, now that there's a real database and admin dashboard behind them.

## What does NOT change

FAQ, Privacy Policy, and Terms & Conditions stay exactly as they are. They were never part of the CMS plan — nothing here touches them.

The overall markup, components, and Tailwind styling on the Insights/Perspectives/Publications pages also don't need a rebuild. Keep the layout, the card components, the page shells. What changes is *where the data comes from* — and, on the detail pages specifically, *how the body is rendered*.

## Listing pages (Insights / Perspectives / Publications)

Find wherever each page currently gets its card data — most likely a hardcoded array or a local constants/JSON file. Replace it with a Prisma query, swapping the category per page:

```ts
const posts = await prisma.post.findMany({
  where: { category: "INSIGHT", status: "PUBLISHED" },
  orderBy: { publishDate: "desc" },
});
```

Then map the returned fields onto whatever props the existing card component already expects — this is mostly a field-renaming exercise (e.g. if the card expects an `image` prop, pass `post.featuredImage`).

## Detail pages — the part that needs real structural change

The currently-built detail page almost certainly renders the body as fixed JSX matching one specific example article (hardcoded "Introduction" / "Simple Will" / "Comprehensive Will" headings and paragraphs baked directly into the component). That has to become a loop over real data instead of fixed markup.

Once the page fetches a `Post` along with its `sections` (and each section's `blocks`, both ordered), render the body like this:

- If `section.type === "CONTENT"`: render the heading, then map over `section.blocks` in order — a `PARAGRAPH` block renders as a `<p>` using `block.text`; an `IMAGE` block renders as an `<img>` using `block.imageUrl`.
- If `section.type === "QUOTE"`: reuse the existing blockquote styling, rendering `section.quoteText` and, if present, `section.attribution`.

Reuse the exact same heading/paragraph/image/blockquote Tailwind classes already in the hardcoded version. Only the data source and the fact that it's a `.map()` now should change — the visual output for the existing example article should look identical before and after this refactor.

Also wire up while you're in there: the byline row (`post.writtenBy`, `post.publishDate`), the share buttons (build the canonical URL from `post.slug` plus the category's route segment), and "more posts" — a second query for the same `category`, excluding the current post, limited to a few, most recent first.

## Home & About Us

Still being built elsewhere — nothing to connect yet. One thing worth flagging now so it doesn't get hardcoded by accident: whenever the "Perspectives on Continuity, Family, and Legacy" carousel gets built, it should query `Post` where `featured = true`, not ship as a hardcoded list of posts.

## Migrating existing hardcoded content into real rows

Since the Insights/Perspectives/Publications pages already ship with specific example content, that content needs to become real `Post` rows before the data-source swap happens — otherwise the live pages go blank the moment they switch from static JSX to a database query. Write a one-off script that takes the existing hardcoded content and inserts it as proper `Post` + `Section` + `SectionBlock` rows. This is faster than re-typing everything through the new admin dashboard by hand, especially if there's more than a couple of posts already live.
