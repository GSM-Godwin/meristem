import type {
  ContentBlock,
  Insight,
  InsightCategory,
  InsightCategoryFilter,
} from "@/lib/types/insight";

export const INSIGHT_CATEGORIES: InsightCategoryFilter[] = [
  { id: "all", label: "View All" },
  { id: "founder-psychology", label: "Founder Psychology" },
  { id: "family-continuity", label: "Family Continuity" },
  { id: "next-generation-leadership", label: "Next-Generation Leadership" },
  { id: "women-and-wealth", label: "Women and Wealth" },
  { id: "the-future-of-family-wealth", label: "The Future of Family Wealth" },
  { id: "see-all", label: "See all" },
];

const defaultContent: ContentBlock[] = [
  {
    type: "heading",
    text: "Introduction",
  },
  {
    type: "paragraph",
    text: "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.",
  },
  {
    type: "paragraph",
    text: "Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.",
  },
  {
    type: "image-row",
    images: [
      { caption: "Image caption goes here" },
      { caption: "Image caption goes here" },
    ],
  },
  {
    type: "heading",
    text: "Conclusion",
  },
  {
    type: "paragraph",
    text: "Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.",
  },
  {
    type: "paragraph",
    text: "Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo.",
  },
];

const introText =
  "I was in a gathering of young professionals and during lunch found myself at a table where some young people were in an intense argument about writing their Will. One said, \"I have only worked for 6 years and have not accumulated enough assets\", whilst another said, \"Is it my MacBook and iPhone I will put in a Will\". As a financial planner passionate about speaking to people about wealth creation and succession planning, I could not resist joining in the conversation.";

const willArticleContent: ContentBlock[] = [
  {
    type: "long-description",
    text: "Excitedly, I asked, \"What if I told you that you could have a Will regardless of the size of assets you own?\" I shared a real-life story — the story of Ms. Matilda my neighbour, who wrote her Will when she attained the age of 25 years. The only assets she had to her name were three savings accounts in commercial banks and her Retirement Savings Account.",
  },
  {
    type: "heading",
    text: "Introduction",
  },
  {
    type: "paragraph",
    text: introText,
  },
  {
    type: "image",
    src: "/intro.png",
    alt: "Young professionals at a lunch gathering",
  },
  {
    type: "blockquote",
    quote:
      "In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.",
    attribution: "Olivia Rhye, Product Designer",
  },
  {
    type: "paragraph",
    text: introText,
  },
  {
    type: "heading",
    text: "Software and tools",
  },
  {
    type: "paragraph",
    text: "Pharetra morbi libero id aliquam elit massa integer tellus. Quis felis aliquam ullamcorper porttitor. Pulvinar ullamcorper sit dictumst ut eget a, elementum eu. Maecenas est morbi mattis id in ac pellentesque ac.",
  },
  {
    type: "heading",
    text: "Simple Will",
  },
  {
    type: "paragraph",
    text: "The Simple Will, true to its name is simple. It is for those whose estate planning needs are not complex. With your cash in the bank, Retirement Savings Account (RSA) and equities (even those processed through our Meritrade App) a Simple Will can be prepared for you and lodged at the Probate Registry. You can say this is us democratising the Will service. This service is available for everyone regardless of status or pocket/asset size. We pledge never again will it be said that our clients/prospects cannot put a Will in place because of the cost effect.",
  },
  {
    type: "image",
    src: "/simple-will.png",
    alt: "Simple Will illustration",
  },
  {
    type: "paragraph",
    text: "Lectus leo massa amet posuere. Malesuada mattis non convallis quisque. Libero sit et imperdiet bibendum quisque dictum vestibulum in non. Pretium ultricies tempor non est diam. Enim ut enim amet amet integer cursus. Sit ac commodo pretium sed etiam turpis suspendisse at.",
  },
  {
    type: "paragraph",
    text: "Tristique odio senectus nam posuere ornare leo metus, ultricies. Blandit duis ultricies vulputate morbi feugiat cras placerat elit. Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque suscipit accumsan. Cursus viverra aenean magna risus elementum faucibus molestie pellentesque. Arcu ultricies sed mauris vestibulum.",
  },
  {
    type: "heading",
    text: "Comprehensive Will",
  },
  {
    type: "paragraph",
    text: "This is for those whose Estate planning needs are a bit complex, whether by assets owned or instructions. Once you want your Will to cover more than cash and RSA, then the comprehensive will be an apposite service. This covers your liquid assets like savings accounts, investment accounts, fixed deposits, unit trust funds, Shares and Bonds. It also covers illiquid assets like Real Estate properties, collectables such as vehicles, Art, antiques, jewellery, digital Assets etc.",
  },
  {
    type: "paragraph",
    text: "By way of testamentary trust, you can also leave trust instructions in your Will, appoint guardians for your minors/under-aged children, etc.",
  },
];

export const insights: Insight[] = [
  {
    id: "1",
    slug: "simple-vs-comprehensive-will",
    title: "Simple vs Comprehensive Will: Distinction between both types",
    excerpt:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty? Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    intro:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty? Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author: "Brandon Johnson",
    date: "19th Oct 2021",
    category: "family-continuity",
    featured: true,
    coverSrc: "/simple-vs-comp.png",
    content: willArticleContent,
  },
  {
    id: "2",
    slug: "empowering-women-understanding-probate-in-nigeria",
    title: "Empowering Women: Understanding Probate in Nigeria",
    excerpt:
      "Mental models give you a framework for how to view the world and solve problems. Learn how great product managers apply them.",
    intro:
      "Probate processes in Nigeria can feel opaque and intimidating. This article explores what women need to know to navigate estate administration with confidence.",
    author: "Brand & Content Team",
    date: "2 Feb 2024",
    category: "women-and-wealth",
    featured: true,
    content: defaultContent,
  },
  {
    id: "3",
    slug: "understanding-credit-ratings-in-nigeria",
    title: "Understanding Credit Ratings in Nigeria",
    excerpt:
      "Collaboration can make our teams stronger, and our individual designs better. Here is how to build a culture of design collaboration.",
    intro:
      "Credit ratings play a critical role in how businesses and families access capital. Here is a clear overview of how ratings work in the Nigerian context.",
    author: "Brand & Content Team",
    date: "2 Feb 2024",
    category: "the-future-of-family-wealth",
    featured: true,
    content: defaultContent,
  },
  {
    id: "4",
    slug: "bill-walsh-leadership-lessons",
    title: "Bill Walsh leadership lessons",
    excerpt:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty? Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    intro:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty? Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author: "Brandon Johnson",
    date: "19 Oct 2021",
    category: "founder-psychology",
    coverSrc: "/more1.png",
    content: defaultContent,
  },
  {
    id: "5",
    slug: "pm-mental-models",
    title: "PM mental models",
    excerpt:
      "Mental models give you a framework for how to view the world and solve problems. Learn how great product managers apply them.",
    intro:
      "Mental models give you a framework for how to view the world and solve problems. Learn how great product managers apply them.",
    author: "Brandon Johnson",
    date: "19 Oct 2021",
    category: "founder-psychology",
    coverSrc: "/more2.png",
    content: defaultContent,
  },
  {
    id: "6",
    slug: "what-is-wireframing",
    title: "What is Wireframing?",
    excerpt:
      "Introduction to Wireframing and its Principles. Learn from the best in the industry about wireframing and its role in design.",
    intro:
      "Introduction to Wireframing and its Principles. Learn from the best in the industry about wireframing and its role in design.",
    author: "Brandon Johnson",
    date: "19 Oct 2021",
    category: "next-generation-leadership",
    coverSrc: "/more3.png",
    content: defaultContent,
  },
  {
    id: "7",
    slug: "how-collaboration-makes-us-better-designers",
    title: "How collaboration makes us better designers",
    excerpt:
      "Collaboration can make our teams stronger, and our individual designs better. Here is how to build a culture of design collaboration.",
    intro:
      "Collaboration can make families stronger and their plans more resilient. Here is how to build a culture of shared decision-making.",
    author: "Brand & Content Team",
    date: "17 Mar 2024",
    category: "family-continuity",
    content: defaultContent,
  },
  {
    id: "8",
    slug: "our-top-10-javascript-frameworks-to-use",
    title: "Our top 10 Javascript frameworks to use",
    excerpt:
      "JavaScript frameworks make development easy with extensive features and functionalities. Here are our top picks for modern development.",
    intro:
      "Choosing the right tools matters as much for family enterprises as for technology teams. These frameworks illustrate how structure enables scale.",
    author: "Brand & Content Team",
    date: "16 Mar 2024",
    category: "the-future-of-family-wealth",
    content: defaultContent,
  },
  {
    id: "9",
    slug: "podcast-creating-a-better-cx-community",
    title: "Podcast: Creating a better CX Community",
    excerpt:
      "Starting a community does not need to be complicated, but how do you get started? Listen to our latest podcast episode on CX communities.",
    intro:
      "Starting a community does not need to be complicated. This conversation explores how families can foster meaningful dialogue across generations.",
    author: "Brand & Content Team",
    date: "15 Mar 2024",
    category: "women-and-wealth",
    content: defaultContent,
  },
  {
    id: "10",
    slug: "building-generational-wealth-strategies",
    title: "Building generational wealth strategies",
    excerpt:
      "Explore practical frameworks for preserving and growing family wealth across generations while maintaining unity and shared purpose.",
    intro:
      "Explore practical frameworks for preserving and growing family wealth across generations while maintaining unity and shared purpose.",
    author: "Brand & Content Team",
    date: "14 Mar 2024",
    category: "family-continuity",
    content: defaultContent,
  },
  {
    id: "11",
    slug: "next-gen-leadership-in-family-enterprises",
    title: "Next-gen leadership in family enterprises",
    excerpt:
      "Transitioning leadership to the next generation requires intention, governance, and open communication. Here is what successful families do.",
    intro:
      "Transitioning leadership to the next generation requires intention, governance, and open communication. Here is what successful families do.",
    author: "Brand & Content Team",
    date: "13 Mar 2024",
    category: "next-generation-leadership",
    content: defaultContent,
  },
  {
    id: "12",
    slug: "the-psychology-of-founder-decision-making",
    title: "The psychology of founder decision-making",
    excerpt:
      "Founders face unique psychological pressures that shape how they lead, invest, and plan for continuity. Understanding these patterns matters.",
    intro:
      "Founders face unique psychological pressures that shape how they lead, invest, and plan for continuity. Understanding these patterns matters.",
    author: "Brand & Content Team",
    date: "12 Mar 2024",
    category: "founder-psychology",
    content: defaultContent,
  },
];

export const POSTS_PER_PAGE = 12;

export function getCategoryLabel(category: InsightCategory): string {
  const match = INSIGHT_CATEGORIES.find((item) => item.id === category);
  return match?.label ?? category;
}

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((insight) => insight.slug === slug);
}

export function getRelatedInsights(
  currentSlug: string,
  limit: number = 3
): Insight[] {
  const curatedRelated: Record<string, string[]> = {
    "simple-vs-comprehensive-will": [
      "bill-walsh-leadership-lessons",
      "pm-mental-models",
      "what-is-wireframing",
    ],
  };

  const curated = curatedRelated[currentSlug];
  if (curated) {
    return curated
      .map((slug) => getInsightBySlug(slug))
      .filter((insight): insight is Insight => Boolean(insight));
  }

  const current = getInsightBySlug(currentSlug);
  if (!current) {
    return insights.filter((i) => i.slug !== currentSlug).slice(0, limit);
  }

  const sameCategory = insights.filter(
    (insight) =>
      insight.slug !== currentSlug && insight.category === current.category
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const others = insights.filter(
    (insight) =>
      insight.slug !== currentSlug && insight.category !== current.category
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function getFeaturedInsights(category: string = "all"): Insight[] {
  const filtered =
    category === "all" || category === "see-all"
      ? insights.filter((insight) => insight.featured)
      : insights.filter(
          (insight) => insight.featured && insight.category === category
        );

  return filtered.length > 0
    ? filtered
    : insights.filter((insight) => insight.featured);
}

export function getBlogInsights(category: string = "all"): Insight[] {
  const nonFeatured = insights.filter((insight) => !insight.featured);

  if (category === "all" || category === "see-all") {
    return nonFeatured;
  }

  return nonFeatured.filter((insight) => insight.category === category);
}
