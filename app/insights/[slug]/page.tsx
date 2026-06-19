import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleTemplate from "@/components/shared/ArticleTemplate";
import { getInsightBySlug, getRelatedInsights, insights } from "@/lib/data/insights";

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return { title: "Insight Not Found | Meristem Family Office" };
  return {
    title: `${insight.title} | Meristem Family Office`,
    description: insight.intro,
  };
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/insights/${insight.slug}`;
  const related = getRelatedInsights(insight.slug, 3);

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <ArticleTemplate
          categoryLabel="Insights"
          backHref="/insights"
          backLabel="Back to Insights"
          title={insight.title}
          intro={insight.intro}
          author={insight.author}
          date={insight.date}
          content={insight.content}
          shareUrl={shareUrl}
          relatedPosts={related.map((r) => ({
            id: r.id,
            slug: r.slug,
            title: r.title,
            author: r.author,
            date: r.date,
            excerpt: r.excerpt,
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
