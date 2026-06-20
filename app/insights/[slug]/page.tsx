import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleTemplate from "@/components/shared/ArticleTemplate";
import { getPostDetailBySlug } from "@/lib/post-detail";
import { getRelatedPostCards } from "@/lib/post-cards";

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostDetailBySlug("INSIGHT", slug);
  if (!post) return { title: "Insight Not Found | Meristem Family Office" };
  return {
    title: `${post.title} | Meristem Family Office`,
    description: post.intro,
  };
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const post = await getPostDetailBySlug("INSIGHT", slug);
  if (!post) notFound();

  const related = await getRelatedPostCards("INSIGHT", slug, 3);

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <ArticleTemplate
          categoryLabel="Insights"
          backHref="/insights"
          backLabel="Back to Insights"
          title={post.title}
          intro={post.intro}
          author={post.author}
          date={post.date}
          coverSrc={post.coverSrc}
          content={post.content}
          shareUrl={`${siteUrl}/insights/${post.slug}`}
          relatedPosts={related.map((r) => ({
            id: r.id,
            slug: r.slug,
            title: r.title,
            author: r.author,
            date: r.date,
            excerpt: r.excerpt,
            coverSrc: r.coverSrc,
            cardVariant: "insight" as const,
            category: "insights",
          }))}
          relatedHeading="More post"
          relatedSeeAllHref="/insights/all"
        />
      </main>
      <Footer />
    </>
  );
}
