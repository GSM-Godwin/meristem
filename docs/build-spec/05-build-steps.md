# Build Steps (revised scope)

Insights, Perspectives, Publications, FAQ, Privacy Policy, and Terms & Conditions already exist as front-end pages. Home and About Us are in progress separately and aren't covered here. This checklist covers only what's actually left: database, auth, admin dashboard, and connecting the existing pages to real data.

1. **Database.** Add Prisma to the existing project, paste in the schema from `01-database-schema.md`, run the migration.
2. **Migrate existing content.** Write a one-off script that takes whatever's currently hardcoded on the Insights/Perspectives/Publications pages and inserts it as real `Post`/`Section`/`SectionBlock` rows, so nothing goes blank once the data source switches over. (Detail in `04-public-frontend.md`.)
3. **Authentication.** Build login, session cookie, and `/admin` middleware per `02-authentication.md`.
4. **Admin shell.** Build the admin layout and sidebar nav (Dashboard, Insights, Perspectives, Publications, Inquiries), using the existing site's visual theme.
5. **Post list views.** Build the three list pages, each filtered by category, each with a working "Add new" that opens the shared form with category pre-set and locked.
6. **Shared post form.** Build the add/edit form including the section builder, wired to Prisma's nested create/update for `Section` and `SectionBlock`.
7. **Inquiries admin page.** List, detail view, status update.
8. **Connect listing pages.** Swap each existing listing page's hardcoded data for the matching Prisma query.
9. **Connect detail pages.** Refactor the existing detail page component to map over `post.sections` / `section.blocks` instead of fixed JSX. This is the step most likely to need real care — it's a structural change to how the body renders, not just a data swap. The visual result for the existing example article should be unchanged.
10. **Contact form.** Wire Start the Conversation to create an `Inquiry` row on submit.
11. **Revalidation.** Add `revalidatePath` calls on post create/update/delete so dashboard changes show up live immediately.
12. **QA.** Edit one real post end to end through the new dashboard and confirm it updates correctly on its public detail page, its listing page, and any "more posts" section referencing it from a sibling post in the same category.
