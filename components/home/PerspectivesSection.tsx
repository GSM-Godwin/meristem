import Image from "next/image";
import Link from "next/link";
import glassImg from "@/assets/wellbeing.png";
import PlayButton from "@/components/perspectives/PlayButton";

// TODO: Replace static placeholder data with a Prisma query for Posts where
// featured = true and category = PERSPECTIVE, once backend integration
// sections 8-12 resume. Query should be:
//   prisma.post.findMany({ where: { featured: true, status: "PUBLISHED" }, orderBy: { publishDate: "desc" }, take: 3 })

const PERSPECTIVES = [
  {
    slug: "podcast-creating-a-better-cx-community",
    title: "Podcast: Creating a better CX Community",
    author: "Brand & Comms Team",
    date: "28 Mar 2024",
    duration: "9:12",
  },
  {
    slug: "how-collaboration-makes-us-better-designers",
    title: "How collaboration makes us better designers",
    author: "Brand & Comms Team",
    date: "28 Mar 2024",
    duration: "12:45",
  },
  {
    slug: "our-top-10-javascript-frameworks-to-use",
    title: "Our top 10 Javascript frameworks to use",
    author: "Brand & Comms Team",
    date: "28 Mar 2024",
    duration: "8:30",
  },
];

function ArrowUpRight() {
  return (
    <svg
      className="shrink-0 mt-0.5"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export default function PerspectivesSection() {
  return (
    <section className="bg-white py-20 px-5 md:px-10 lg:px-20">
      <div className="mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-3">
          <h2 className="text-2xl md:text-3xl lg:text-[48px] font-bold text-dark2 leading-tight max-w-[750px]">
            Perspectives on Continuity, Family, and Legacy
          </h2>
          <div className="sm:pt-2 shrink-0">
            <Link
              href="/perspectives"
              className="inline-flex items-center gap-2 border border-yellow text-yellow text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-yellow/90 hover:text-white/90 transition-colors"
            >
              See more
            </Link>
          </div>
        </div>

        <p className="text-dark1 text-sm md:text-[18px] lg:text-[22px] leading-relaxed mb-10">
          Explore selected videos, conversations, and perspectives from the Family Office.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PERSPECTIVES.map((item) => (
            <Link
              key={item.slug}
              href={`/perspectives/${item.slug}`}
              className="group block"
            >
              <div className="relative rounded-lg overflow-hidden aspect-video mb-4">
                <Image
                  src={glassImg}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <PlayButton />
              </div>

              <p className="text-xs md:text-[14px] text-yellow mb-2">
                {item.author} &nbsp;·&nbsp; {item.date} &nbsp;·&nbsp;{" "}
                {item.duration}
              </p>

              <h3 className="text-dark2 font-semibold text-[16px] md:text-[20px] lg:text-[24px] leading-tight group-hover:text-yellow transition-colors flex items-start gap-1.5">
                <span>{item.title}</span>
                <ArrowUpRight />
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
