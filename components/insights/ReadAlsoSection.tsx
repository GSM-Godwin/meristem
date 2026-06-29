import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import ArrowUpRight from "@/components/insights/ArrowUpRight";
import type { Insight } from "@/lib/types/insight";

function RelatedPostCard({ insight }: { insight: Insight }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group flex flex-col gap-6"
    >
      <div className="relative w-full aspect-[384/256] bg-[#F2EDE0] overflow-hidden">
        <Image
          src={logo}
          alt={insight.title}
          fill
          className="object-contain p-10"
        />
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-sm text-[#535862]">
          {insight.author} • {insight.date}
        </p>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold text-[#181D27] leading-8 group-hover:text-yellow transition-colors">
            {insight.title}
          </h3>
          <ArrowUpRight className="shrink-0 text-[#181D27] mt-1.5" />
        </div>
        <p className="text-base text-[#535862] leading-6 line-clamp-2">
          {insight.excerpt}
        </p>
      </div>
    </Link>
  );
}

export default function ReadAlsoSection({ posts }: { posts: Insight[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="px-5 md:px-10 lg:px-20 pb-24 pt-4 bg-white">
      <div className="max-w-360 mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-[30px] font-semibold text-[#181D27] leading-[38px]">
            More post
          </h2>
          <Link
            href="/insights"
            className="text-base font-semibold text-yellow hover:opacity-80 transition-opacity"
          >
            See all
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {posts.map((insight) => (
            <RelatedPostCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </section>
  );
}
