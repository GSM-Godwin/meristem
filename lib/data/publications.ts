import type {
  Publication,
  PublicationCategory,
  PublicationCategoryFilter,
} from "@/lib/types/publication";

export const PUBLICATION_CATEGORIES: PublicationCategoryFilter[] = [
  { id: "all", label: "View all" },
  { id: "design", label: "Design" },
  { id: "product", label: "Product" },
  { id: "software-development", label: "Software Development" },
  { id: "customer-success", label: "Customer Success" },
];

export const PUBLICATIONS_PER_PAGE = 9;

const coverColors = [
  "#E8F5E9",
  "#E3F2FD",
  "#FFF8E1",
  "#FCE4EC",
  "#E0F7FA",
  "#F3E5F5",
  "#FFF3E0",
  "#FFEBEE",
  "#E8EAF6",
];

const publicationTemplates: {
  title: string;
  slug: string;
  excerpt: string;
  category: PublicationCategory;
}[] = [
  {
    title: "Bill Walsh leadership lessons",
    slug: "bill-walsh-leadership-lessons",
    excerpt:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty? Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "design",
  },
  {
    title: "PM mental models",
    slug: "pm-mental-models",
    excerpt:
      "Mental models give you a framework for how to view the world and solve problems. Learn how great product managers apply them.",
    category: "product",
  },
  {
    title: "What is Wireframing?",
    slug: "what-is-wireframing",
    excerpt:
      "Introduction to Wireframing and its Principles. Learn from the best in the industry about wireframing and its role in design.",
    category: "design",
  },
  {
    title: "Podcast: Creating a better CX Community",
    slug: "podcast-creating-a-better-cx-community",
    excerpt:
      "Starting a community doesn't need to be complicated, but how do you get started? Listen to our latest podcast episode on CX communities.",
    category: "customer-success",
  },
  {
    title: "Our top 10 Javascript frameworks to use",
    slug: "our-top-10-javascript-frameworks-to-use",
    excerpt:
      "JavaScript frameworks make development easy with extensive features and functionalities. Here are our top picks for modern development.",
    category: "software-development",
  },
  {
    title: "How collaboration makes us better designers",
    slug: "how-collaboration-makes-us-better-designers",
    excerpt:
      "Collaboration can make our teams stronger, and our individual designs better. Here is how to build a culture of design collaboration.",
    category: "design",
  },
];

function buildPublications(count: number): Publication[] {
  return Array.from({ length: count }, (_, index) => {
    const template = publicationTemplates[index % publicationTemplates.length];
    const pageOffset = Math.floor(index / publicationTemplates.length);

    return {
      id: String(index + 1),
      slug: pageOffset > 0 ? `${template.slug}-${pageOffset + 1}` : template.slug,
      title: template.title,
      excerpt: template.excerpt,
      author: "Brand & Comms Team",
      date: "28 Mar 2024",
      category: template.category,
      coverColor: coverColors[index % coverColors.length],
    };
  });
}

export const publications: Publication[] = buildPublications(90);

export function getCategoryLabel(category: PublicationCategory): string {
  const match = PUBLICATION_CATEGORIES.find((item) => item.id === category);
  return match?.label ?? category;
}

export function getPublicationBySlug(slug: string): Publication | undefined {
  return publications.find((publication) => publication.slug === slug);
}

export function getFilteredPublications(category: string = "all"): Publication[] {
  if (category === "all") {
    return publications;
  }

  return publications.filter((publication) => publication.category === category);
}

export function getPaginatedPublications(
  page: number,
  category: string = "all"
): Publication[] {
  const filtered = getFilteredPublications(category);
  const start = (page - 1) * PUBLICATIONS_PER_PAGE;
  return filtered.slice(start, start + PUBLICATIONS_PER_PAGE);
}

export function getTotalPublicationPages(category: string = "all"): number {
  const filtered = getFilteredPublications(category);
  return Math.max(1, Math.ceil(filtered.length / PUBLICATIONS_PER_PAGE));
}
