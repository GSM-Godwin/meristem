import "dotenv/config";
import {
  PrismaClient,
  PostCategory,
  PostStatus,
  SectionType,
  BlockType,
} from "@prisma/client";

const prisma = new PrismaClient();

const SLUG = "simple-vs-comprehensive-will";

const introText =
  'I was in a gathering of young professionals and during lunch found myself at a table where some young people were in an intense argument about writing their Will. One said, "I have only worked for 6 years and have not accumulated enough assets", whilst another said, "Is it my MacBook and iPhone I will put in a Will". As a financial planner passionate about speaking to people about wealth creation and succession planning, I could not resist joining in the conversation.';

const longDescription =
  'Excitedly, I asked, "What if I told you that you could have a Will regardless of the size of assets you own?" I shared a real-life story — the story of Ms. Matilda my neighbour, who wrote her Will when she attained the age of 25 years. The only assets she had to her name were three savings accounts in commercial banks and her Retirement Savings Account.';

async function main() {
  // Idempotent: clear any existing row (incl. the seed stub) so re-runs always
  // reflect the latest content. Cascade removes its sections + blocks.
  const deleted = await prisma.post.deleteMany({ where: { slug: SLUG } });
  if (deleted.count > 0) {
    console.log(`• Removed ${deleted.count} existing post(s) with slug "${SLUG}"`);
  }

  const post = await prisma.post.create({
    data: {
      title: "Simple vs Comprehensive Will: Distinction between both types",
      slug: SLUG,
      shortDescription:
        "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty? Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      longDescription,
      featuredImage: "/simple-vs-comp.png",
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
                { type: BlockType.PARAGRAPH, text: introText, order: 0 },
                { type: BlockType.IMAGE, imageUrl: "/intro.png", order: 1 },
              ],
            },
          },
          {
            type: SectionType.QUOTE,
            quoteText:
              "In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.",
            attribution: "Olivia Rhye, Product Designer",
            order: 1,
          },
          {
            // Orphan paragraph that follows the quote (no heading by design).
            type: SectionType.CONTENT,
            heading: null,
            order: 2,
            blocks: {
              create: [{ type: BlockType.PARAGRAPH, text: introText, order: 0 }],
            },
          },
          {
            type: SectionType.CONTENT,
            heading: "Software and tools",
            order: 3,
            blocks: {
              create: [
                {
                  type: BlockType.PARAGRAPH,
                  text: "Pharetra morbi libero id aliquam elit massa integer tellus. Quis felis aliquam ullamcorper porttitor. Pulvinar ullamcorper sit dictumst ut eget a, elementum eu. Maecenas est morbi mattis id in ac pellentesque ac.",
                  order: 0,
                },
              ],
            },
          },
          {
            type: SectionType.CONTENT,
            heading: "Simple Will",
            order: 4,
            blocks: {
              create: [
                {
                  type: BlockType.PARAGRAPH,
                  text: "The Simple Will, true to its name is simple. It is for those whose estate planning needs are not complex. With your cash in the bank, Retirement Savings Account (RSA) and equities (even those processed through our Meritrade App) a Simple Will can be prepared for you and lodged at the Probate Registry. You can say this is us democratising the Will service. This service is available for everyone regardless of status or pocket/asset size. We pledge never again will it be said that our clients/prospects cannot put a Will in place because of the cost effect.",
                  order: 0,
                },
                { type: BlockType.IMAGE, imageUrl: "/simple-will.png", order: 1 },
                {
                  type: BlockType.PARAGRAPH,
                  text: "Lectus leo massa amet posuere. Malesuada mattis non convallis quisque. Libero sit et imperdiet bibendum quisque dictum vestibulum in non. Pretium ultricies tempor non est diam. Enim ut enim amet amet integer cursus. Sit ac commodo pretium sed etiam turpis suspendisse at.",
                  order: 2,
                },
                {
                  type: BlockType.PARAGRAPH,
                  text: "Tristique odio senectus nam posuere ornare leo metus, ultricies. Blandit duis ultricies vulputate morbi feugiat cras placerat elit. Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque suscipit accumsan. Cursus viverra aenean magna risus elementum faucibus molestie pellentesque. Arcu ultricies sed mauris vestibulum.",
                  order: 3,
                },
              ],
            },
          },
          {
            type: SectionType.CONTENT,
            heading: "Comprehensive Will",
            order: 5,
            blocks: {
              create: [
                {
                  type: BlockType.PARAGRAPH,
                  text: "This is for those whose Estate planning needs are a bit complex, whether by assets owned or instructions. Once you want your Will to cover more than cash and RSA, then the comprehensive will be an apposite service. This covers your liquid assets like savings accounts, investment accounts, fixed deposits, unit trust funds, Shares and Bonds. It also covers illiquid assets like Real Estate properties, collectables such as vehicles, Art, antiques, jewellery, digital Assets etc.",
                  order: 0,
                },
                {
                  type: BlockType.PARAGRAPH,
                  text: "By way of testamentary trust, you can also leave trust instructions in your Will, appoint guardians for your minors/under-aged children, etc.",
                  order: 1,
                },
              ],
            },
          },
        ],
      },
    },
    include: { sections: { include: { blocks: true } } },
  });

  const blockCount = post.sections.reduce((n, s) => n + s.blocks.length, 0);
  console.log(
    `✓ Migrated Will insight — slug: ${post.slug}, sections: ${post.sections.length}, blocks: ${blockCount}`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
