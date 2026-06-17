import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InsightArticle from "@/components/insights/InsightArticle";
import { getInsightBySlug, insights } from "@/lib/data/insights";

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    return { title: "Insight Not Found | Meristem Family Office" };
  }

  return {
    title: `${insight.title} | Meristem Family Office`,
    description: insight.intro,
  };
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/insights/${insight.slug}`;

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <InsightArticle insight={insight} shareUrl={shareUrl} />
      </main>
      <Footer />
    </>
  );
}
