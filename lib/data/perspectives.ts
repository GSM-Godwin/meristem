import type { Perspective } from "@/lib/types/perspective";

export const PERSPECTIVES_PER_PAGE = 15;

const perspectiveTemplates = [
  {
    title: "Podcast: Creating a better CX Community",
    slug: "podcast-creating-a-better-cx-community",
    duration: "9:12",
  },
  {
    title: "How collaboration makes us better designers",
    slug: "how-collaboration-makes-us-better-designers",
    duration: "12:45",
  },
  {
    title: "Our top 10 Javascript frameworks to use",
    slug: "our-top-10-javascript-frameworks-to-use",
    duration: "8:30",
  },
];

function buildPerspectives(count: number): Perspective[] {
  return Array.from({ length: count }, (_, index) => {
    const template = perspectiveTemplates[index % perspectiveTemplates.length];
    const pageOffset = Math.floor(index / perspectiveTemplates.length);

    return {
      id: String(index + 1),
      slug: pageOffset > 0 ? `${template.slug}-${pageOffset + 1}` : template.slug,
      title: template.title,
      author: "Brand & Comms Team",
      date: "28 Mar 2024",
      duration: template.duration,
    };
  });
}

export const perspectives: Perspective[] = buildPerspectives(45);

export function getPerspectiveBySlug(slug: string): Perspective | undefined {
  return perspectives.find((perspective) => perspective.slug === slug);
}

export function getPaginatedPerspectives(page: number): Perspective[] {
  const start = (page - 1) * PERSPECTIVES_PER_PAGE;
  return perspectives.slice(start, start + PERSPECTIVES_PER_PAGE);
}

export function getTotalPerspectivePages(): number {
  return Math.max(1, Math.ceil(perspectives.length / PERSPECTIVES_PER_PAGE));
}
