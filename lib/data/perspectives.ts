import type { Perspective } from "@/lib/types/perspective";
import type { ContentBlock } from "@/lib/types/insight";

const defaultPerspectiveContent: ContentBlock[] = [
  { type: "paragraph", text: "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt." },

  { type: "video", caption: "Watch the full conversation" },
  { type: "heading", text: "Key takeaways" },
  { type: "paragraph", text: "Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec." },
  { type: "image-row", captions: ["", ""] },
  { type: "blockquote", quote: "The families that thrive across generations are those who invest as much in their relationships and values as they do in their financial assets.", attribution: "Meristem Family Office" },
  { type: "paragraph", text: "Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed." },
];

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

const perspectiveCovers = ["/pers1.png", "/pers2.jpg", "/pers3.png"];

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
      coverSrc: perspectiveCovers[index % perspectiveCovers.length],
      intro: "Starting a community doesn't need to be complicated. This conversation explores how families can foster meaningful dialogue across generations and steward shared purpose.",
      content: defaultPerspectiveContent,
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
