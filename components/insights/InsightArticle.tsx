import Image from "next/image";
import logo from "@/assets/logo.svg";
import ArticleContent from "@/components/insights/ArticleContent";
import ArticleShareBar from "@/components/insights/ArticleShareBar";
import ReadAlsoSection from "@/components/insights/ReadAlsoSection";
import { getRelatedInsights } from "@/lib/data/insights";
import type { Insight } from "@/lib/types/insight";

interface InsightArticleProps {
  insight: Insight;
  shareUrl: string;
}

export default function InsightArticle({ insight, shareUrl }: InsightArticleProps) {
  const relatedPosts = getRelatedInsights(insight.slug, 3);

  return (
    <>
      <article className="px-5 md:px-10 lg:px-20 pt-16 pb-20 bg-white">
        <div className="max-w-360 mx-auto">
          <header className="max-w-[720px] mx-auto mb-10">
            <h1 className="text-[48px] font-semibold text-[#181D27] leading-[1.2] tracking-[-0.02em] mb-5">
              {insight.title}
            </h1>
            <p className="text-xl text-[#535862] leading-[30px]">
              {insight.intro}
            </p>
          </header>

          <div className="relative w-full aspect-[1216/640] bg-[#F2EDE0] overflow-hidden mb-8">
            <Image
              src={logo}
              alt={insight.title}
              fill
              className="object-contain p-20"
              priority
            />
          </div>

          <div className="flex items-center justify-between gap-8 py-5 border-y border-[#E9EAEB] mb-16">
            <div>
              <p className="text-base font-semibold text-[#181D27]">
                {insight.author}
              </p>
              <p className="text-base text-[#535862]">
                Published {insight.date}
              </p>
            </div>

            <ArticleShareBar url={shareUrl} title={insight.title} />
          </div>

          <div className="max-w-[720px] mx-auto">
            <ArticleContent blocks={insight.content} />
          </div>
        </div>
      </article>

      <ReadAlsoSection posts={relatedPosts} />
    </>
  );
}
