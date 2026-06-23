import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleTemplate from "@/components/shared/ArticleTemplate";
import { getPostDetailBySlug } from "@/lib/post-detail";
import { getRelatedPostCards } from "@/lib/post-cards";

interface PublicationPageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata({ params }: PublicationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostDetailBySlug("PUBLICATION", slug);
  if (!post) return { title: "Publication Not Found | Meristem Family Office" };
  return {
    title: `${post.title} | Meristem Family Office`,
    description: post.intro,
  };
}

export default async function PublicationDetailPage({ params }: PublicationPageProps) {
  const { slug } = await params;
  const post = await getPostDetailBySlug("PUBLICATION", slug);
  if (!post) notFound();

  const related = await getRelatedPostCards("PUBLICATION", slug, 3);

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <ArticleTemplate
          categoryLabel="Publications"
          backHref="/publications"
          backLabel="Back to Publications"
          title={post.title}
          intro={post.intro}
          author={post.author}
          date={post.date}
          coverSrc={post.coverSrc}
          content={post.content}
          shareUrl={`${siteUrl}/publications/${post.slug}`}
          fileUrl={post.fileUrl ?? undefined}
          publicationId={post.id}
          comingSoon={post.comingSoon}
          relatedPosts={related.map((r) => ({
            id: r.id,
            slug: r.slug,
            title: r.title,
            author: r.author,
            date: r.date,
            excerpt: r.excerpt,
            coverSrc: r.coverSrc,
            comingSoon: r.comingSoon,
            cardVariant: "publication" as const,
            category: "publications",
          }))}
          relatedHeading="More publications"
          relatedSeeAllHref="/publications"
        />
      </main>
      <Footer />
    </>
  );
}
