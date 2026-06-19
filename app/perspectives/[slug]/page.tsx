import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleTemplate from "@/components/shared/ArticleTemplate";
import { getPerspectiveBySlug, perspectives } from "@/lib/data/perspectives";

interface PerspectivePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return perspectives.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PerspectivePageProps): Promise<Metadata> {
  const { slug } = await params;
  const perspective = getPerspectiveBySlug(slug);
  if (!perspective) return { title: "Perspective Not Found | Meristem Family Office" };
  return {
    title: `${perspective.title} | Meristem Family Office`,
    description: perspective.intro,
  };
}

export default async function PerspectiveDetailPage({ params }: PerspectivePageProps) {
  const { slug } = await params;
  const perspective = getPerspectiveBySlug(slug);
  if (!perspective) notFound();

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/perspectives/${perspective.slug}`;

  // Pick 3 other perspectives as related
  const related = perspectives.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <ArticleTemplate
          categoryLabel="Perspectives"
          backHref="/perspectives"
          backLabel="Back to Perspectives"
          title={perspective.title}
          intro={perspective.intro}
          author={perspective.author}
          date={`${perspective.date} · ${perspective.duration}`}
          content={perspective.content}
          shareUrl={shareUrl}
          relatedPosts={related.map((r) => ({
            id: r.id,
            slug: r.slug,
            title: r.title,
            author: r.author,
            date: r.date,
            duration: r.duration,
            cardVariant: "perspective" as const,
            category: "perspectives",
          }))}
          relatedHeading="More perspectives"
          relatedSeeAllHref="/perspectives"
        />
      </main>
      <Footer />
    </>
  );
}
