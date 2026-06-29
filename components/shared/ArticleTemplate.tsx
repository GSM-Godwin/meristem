import Image from "next/image";
import logo from "@/assets/logo.svg";
import ArticleContent from "@/components/insights/ArticleContent";
import ArticleShareBar from "@/components/insights/ArticleShareBar";
import PublicationDownloadGate from "@/components/public/PublicationDownloadGate";
import PostCard from "@/components/shared/PostCard";
import Link from "next/link";
import type { ContentBlock } from "@/lib/types/insight";
import type { CardVariant } from "@/components/shared/PostCard";
import { pdfDownloadFilename, toDownloadUrl } from "@/lib/media";

export interface RelatedArticle {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt?: string;
  duration?: string;
  coverColor?: string;
  coverSrc?: string;
  comingSoon?: boolean;
  cardVariant: CardVariant;
  category: string;
}

export interface ArticleTemplateProps {
  categoryLabel: string;
  backHref: string;
  backLabel: string;
  title: string;
  intro: string;
  author: string;
  date: string;
  coverSrc?: string;
  content: ContentBlock[];
  shareUrl: string;
  fileUrl?: string;
  publicationId?: string;
  comingSoon?: boolean;
  relatedPosts: RelatedArticle[];
  relatedHeading?: string;
  relatedSeeAllHref?: string;
}

export default function ArticleTemplate({
  title,
  intro,
  author,
  date,
  coverSrc,
  content,
  shareUrl,
  fileUrl,
  publicationId,
  comingSoon = false,
  relatedPosts,
  relatedHeading = "More post",
  relatedSeeAllHref,
}: ArticleTemplateProps) {
  if (comingSoon) {
    return (
      <article className="px-5 md:px-10 lg:px-20 py-16 md:py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-227.5 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-dark2 leading-tight mb-8">
            {title}
          </h1>
          <div className="rounded-2xl border border-light2 bg-primarybg px-6 py-16 md:py-20">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-wide text-yellow mb-3">
              Coming soon
            </p>
            <p className="text-lg md:text-xl text-neutral max-w-xl mx-auto leading-relaxed">
              This publication isn&rsquo;t available yet. Please check back soon.
            </p>
          </div>
        </div>
      </article>
    );
  }

  const downloadFilename = pdfDownloadFilename(title);
  const downloadUrl = fileUrl ? toDownloadUrl(fileUrl, downloadFilename) : undefined;

  return (
    <>
      <article className="px-5 md:px-10 lg:px-20 py-8 md:py-16 lg:py-24 bg-white">
        <div className="mx-auto">
          <header className="max-w-3xl mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-dark2 leading-tight mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-neutral leading-7.5">{intro}</p>
          </header>

          <div className="relative w-full aspect-1216/640 bg-primarybg overflow-hidden mb-8">
            <Image
              src={coverSrc ?? logo}
              alt={title}
              fill
              className={coverSrc ? "object-contain" : "object-contain p-16 md:p-24"}
              priority
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-5 border-light2 mb-14">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-20">
              <div className="flex flex-col gap-2 md:gap-4">
                <p className="text-12px md:text-14px font-semibold text-yellow">Written by</p>
                <p className="text-base md:text-lg text-dark2 font-medium">{author}</p>
              </div>
              <div className="flex flex-col gap-2 md:gap-4">
                <p className="text-12px md:text-14px font-semibold text-yellow">Published on</p>
                <p className="text-base md:text-lg text-dark2 font-medium">{date}</p>
              </div>
            </div>
            <ArticleShareBar
              url={shareUrl}
              title={title}
              downloadUrl={downloadUrl}
              downloadGate={
                publicationId && downloadUrl ? (
                  <PublicationDownloadGate
                    publicationId={publicationId}
                    title={title}
                    downloadUrl={downloadUrl}
                  />
                ) : undefined
              }
            />
          </div>

          <div className="max-w-227.5">
            <ArticleContent blocks={content} />
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="px-5 md:px-10 lg:px-20 pt-4 pb-20 bg-white">
          <div className="mx-auto">
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
                  coverSrc={post.coverSrc}
                  comingSoon={post.comingSoon}
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
