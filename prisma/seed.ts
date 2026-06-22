import { PrismaClient, PostCategory, PostStatus, SectionType, BlockType } from "@prisma/client";
import bcrypt from "bcryptjs";
import { paragraphJson } from "./paragraph-json";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin1234", 12);

  await prisma.admin.upsert({
    where: { email: "familyoffice@meristemng.com" },
    update: {},
    create: {
      name: "Meristem Admin",
      email: "familyoffice@meristemng.com",
      passwordHash,
    },
  });

  console.log("✓ Admin user created — email: familyoffice@meristemng.com  password: admin1234");

  const insight = await prisma.post.upsert({
    where: { slug: "simple-vs-comprehensive-will" },
    update: {},
    create: {
      title: "Simple vs Comprehensive Will: Distinction between both types",
      slug: "simple-vs-comprehensive-will",
      shortDescription:
        "Understanding the difference between a simple and comprehensive will is critical for effective estate planning in Nigeria.",
      longDescription:
        "Estate planning is often put off until it feels urgent — but the type of will you choose shapes everything from how assets are distributed to how long the probate process takes. In this article we examine both structures so families can make an informed decision.",
      featuredImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
      writtenBy: "Brandon Johnson",
      category: PostCategory.INSIGHT,
      status: PostStatus.PUBLISHED,
      featured: true,
      publishDate: new Date("2021-10-19"),
      sections: {
        create: [
          {
            type: SectionType.CONTENT,
            heading: "Introduction",
            order: 0,
            blocks: {
              create: [
                {
                  type: BlockType.PARAGRAPH,
                  contentJson: paragraphJson(
                    "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt."
                  ),
                  order: 0,
                },
                {
                  type: BlockType.IMAGE,
                  imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
                  order: 1,
                },
                {
                  type: BlockType.PARAGRAPH,
                  contentJson: paragraphJson(
                    "Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at."
                  ),
                  order: 2,
                },
              ],
            },
          },
          {
            type: SectionType.QUOTE,
            quoteText:
              "In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained.",
            attribution: "Olivia Rhye, Product Designer",
            order: 1,
          },
          {
            type: SectionType.CONTENT,
            heading: "Conclusion",
            order: 2,
            blocks: {
              create: [
                {
                  type: BlockType.PARAGRAPH,
                  contentJson: paragraphJson(
                    "Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed."
                  ),
                  order: 0,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log(`✓ Insight created — slug: ${insight.slug}`);

  const perspective = await prisma.post.upsert({
    where: { slug: "podcast-creating-a-better-cx-community" },
    update: {},
    create: {
      title: "Podcast: Creating a better CX Community",
      slug: "podcast-creating-a-better-cx-community",
      shortDescription:
        "Starting a community does not need to be complicated. This conversation explores how families can foster meaningful dialogue across generations.",
      longDescription:
        "In this episode we sit down with community-building practitioners to explore how intentional structures — not just good intentions — create lasting bonds within family enterprises.",
      featuredImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=80",
      writtenBy: "Brand & Content Team",
      category: PostCategory.PERSPECTIVE,
      status: PostStatus.PUBLISHED,
      featured: false,
      publishDate: new Date("2024-03-15"),
      sections: {
        create: [
          {
            type: SectionType.CONTENT,
            heading: "Why Community Matters",
            order: 0,
            blocks: {
              create: [
                {
                  type: BlockType.PARAGRAPH,
                  contentJson: paragraphJson(
                    "Community is not accidental. The families that sustain connection across generations do so because they build intentional structures — regular gatherings, shared language, and explicit agreements about how decisions get made."
                  ),
                  order: 0,
                },
              ],
            },
          },
          {
            type: SectionType.QUOTE,
            quoteText: "The families that endure are not those with the most wealth, but those with the most clarity about what they stand for.",
            attribution: "Guest Speaker",
            order: 1,
          },
        ],
      },
    },
  });

  console.log(`✓ Perspective created — slug: ${perspective.slug}`);

  const publication = await prisma.post.upsert({
    where: { slug: "building-generational-wealth-strategies" },
    update: {},
    create: {
      title: "Building generational wealth strategies",
      slug: "building-generational-wealth-strategies",
      shortDescription:
        "Explore practical frameworks for preserving and growing family wealth across generations while maintaining unity and shared purpose.",
      longDescription:
        "This publication draws on interviews with over twenty multigenerational families to surface the governance, investment, and communication practices that differentiate families that sustain wealth from those that don't.",
      featuredImage: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=1200&q=80",
      writtenBy: "Brand & Content Team",
      category: PostCategory.PUBLICATION,
      status: PostStatus.PUBLISHED,
      featured: false,
      publishDate: new Date("2024-03-14"),
      sections: {
        create: [
          {
            type: SectionType.CONTENT,
            heading: "The Three Pillars",
            order: 0,
            blocks: {
              create: [
                {
                  type: BlockType.PARAGRAPH,
                  contentJson: paragraphJson(
                    "Every family enterprise that successfully passes wealth across generations does so by mastering three disciplines: governance (who decides what and how), investment policy (how the capital is managed and grown), and family communication (how members stay aligned and informed)."
                  ),
                  order: 0,
                },
                {
                  type: BlockType.IMAGE,
                  imageUrl: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80",
                  order: 1,
                },
              ],
            },
          },
          {
            type: SectionType.QUOTE,
            quoteText: "Wealth is not transferred — it is rebuilt by each generation with the foundation the last one laid.",
            attribution: "Meristem Research",
            order: 1,
          },
        ],
      },
    },
  });

  console.log(`✓ Publication created — slug: ${publication.slug}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
