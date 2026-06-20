import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleTemplate from "@/components/shared/ArticleTemplate";
import { getPostDetailBySlug } from "@/lib/post-detail";
import { getRelatedPostCards } from "@/lib/post-cards";

interface PerspectivePageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata({ params }: PerspectivePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostDetailBySlug("PERSPECTIVE", slug);
  if (!post) return { title: "Perspective Not Found | Meristem Family Office" };
  return {
    title: `${post.title} | Meristem Family Office`,
    description: post.intro,
  };
}

export default async function PerspectiveDetailPage({ params }: PerspectivePageProps) {
  const { slug } = await params;
  const post = await getPostDetailBySlug("PERSPECTIVE", slug);
  if (!post) notFound();

  const related = await getRelatedPostCards("PERSPECTIVE", slug, 3);

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <ArticleTemplate
          categoryLabel="Perspectives"
          backHref="/perspectives"
          backLabel="Back to Perspectives"
          title={post.title}
          intro={post.intro}
          author={post.author}
          date={post.date}
          coverSrc={post.coverSrc}
          content={post.content}
          shareUrl={`${siteUrl}/perspectives/${post.slug}`}
          relatedPosts={related.map((r) => ({
            id: r.id,
            slug: r.slug,
            title: r.title,
            author: r.author,
            date: r.date,
            coverSrc: r.coverSrc,
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
