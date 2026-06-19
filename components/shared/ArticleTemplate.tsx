import Image from "next/image";
import logo from "@/assets/logo.png";
import ArticleContent from "@/components/insights/ArticleContent";
import ArticleShareBar from "@/components/insights/ArticleShareBar";
import PostCard from "@/components/shared/PostCard";
import Link from "next/link";
import type { ContentBlock } from "@/lib/types/insight";
import type { CardVariant } from "@/components/shared/PostCard";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RelatedArticle {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt?: string;
  duration?: string;
  coverColor?: string;
  cardVariant: CardVariant;
  /** Base URL segment for related post links, e.g. "insights". */
  category: string;
}

export interface ArticleTemplateProps {
  /** Display label e.g. "INSIGHTS", "PERSPECTIVES", "PUBLICATIONS" */
  categoryLabel: string;
  backHref: string;
  backLabel: string;
  title: string;
  intro: string;
  author: string;
  date: string;
  content: ContentBlock[];
  shareUrl: string;
  relatedPosts: RelatedArticle[];
  relatedHeading?: string;
  relatedSeeAllHref?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ArticleTemplate({
  categoryLabel,
  backHref,
  backLabel,
  title,
  intro,
  author,
  date,
  content,
  shareUrl,
  relatedPosts,
  relatedHeading = "More post",
  relatedSeeAllHref,
}: ArticleTemplateProps) {
  return (
    <>
      <article className="px-5 md:px-10 lg:px-20 pt-10 pb-16 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb / back link */}
          <Link
            href={backHref}
            className="inline-flex items-center gap-1 text-sm text-neutral hover:text-yellow transition-colors mb-6"
          >
            ← {backLabel}
          </Link>

          {/* Category label */}
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-yellow mb-4">
            {categoryLabel}
          </p>

          {/* Title + intro */}
          <header className="max-w-[720px] mb-10">
            <h1 className="text-3xl md:text-5xl font-semibold text-dark1 leading-tight tracking-[-0.02em] mb-5">
              {title}
            </h1>
            <p className="text-lg text-neutral leading-[30px]">{intro}</p>
          </header>

          {/* Hero image */}
          <div className="relative w-full aspect-[1216/640] bg-primarybg overflow-hidden mb-8">
            <Image
              src={logo}
              alt={title}
              fill
              className="object-contain p-16 md:p-24"
              priority
            />
          </div>

          {/* Byline + share */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-5 border-y border-light2 mb-14">
            <div>
              <p className="text-base font-semibold text-dark1">{author}</p>
              <p className="text-base text-neutral">Published {date}</p>
            </div>
            <ArticleShareBar url={shareUrl} title={title} />
          </div>

          {/* Article body */}
          <div className="max-w-[720px] mx-auto">
            <ArticleContent blocks={content} />
          </div>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="px-5 md:px-10 lg:px-20 pt-4 pb-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-xl font-semibold text-dark1">
                {relatedHeading}
              </h2>
              {relatedSeeAllHref && (
                <Link
                  href={relatedSeeAllHref}
                  className="text-sm font-semibold text-yellow hover:opacity-80 transition-opacity"
                >
                  See all
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  href={`/${post.category}/${post.slug}`}
                  variant={post.cardVariant}
                  coverColor={post.coverColor}
                  title={post.title}
                  author={post.author}
                  date={post.date}
                  excerpt={post.excerpt}
                  duration={post.duration}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
