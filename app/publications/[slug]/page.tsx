import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleTemplate from "@/components/shared/ArticleTemplate";
import { getPublicationBySlug, publications } from "@/lib/data/publications";

interface PublicationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PublicationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const publication = getPublicationBySlug(slug);
  if (!publication) return { title: "Publication Not Found | Meristem Family Office" };
  return {
    title: `${publication.title} | Meristem Family Office`,
    description: publication.excerpt,
  };
}

export default async function PublicationDetailPage({ params }: PublicationPageProps) {
  const { slug } = await params;
  const publication = getPublicationBySlug(slug);
  if (!publication) notFound();

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/publications/${publication.slug}`;

  const related = publications.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <ArticleTemplate
          categoryLabel="Publications"
          backHref="/publications"
          backLabel="Back to Publications"
          title={publication.title}
          intro={publication.intro}
          author={publication.author}
          date={publication.date}
          coverSrc={publication.coverSrc}
          content={publication.content}
          shareUrl={shareUrl}
          fileUrl={publication.fileUrl}
          comingSoon={publication.comingSoon}
          relatedPosts={related.map((r) => ({
            id: r.id,
            slug: r.slug,
            title: r.title,
            author: r.author,
            date: r.date,
            excerpt: r.excerpt,
            coverColor: r.coverColor,
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
