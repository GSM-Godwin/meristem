import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCategoryLabel, getPublicationBySlug, publications } from "@/lib/data/publications";

interface PublicationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return publications.map((publication) => ({ slug: publication.slug }));
}

export async function generateMetadata({
  params,
}: PublicationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const publication = getPublicationBySlug(slug);

  if (!publication) {
    return { title: "Publication Not Found | Meristem Family Office" };
  }

  return {
    title: `${publication.title} | Meristem Family Office`,
    description: publication.excerpt,
  };
}

export default async function PublicationDetailPage({
  params,
}: PublicationPageProps) {
  const { slug } = await params;
  const publication = getPublicationBySlug(slug);

  if (!publication) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="px-5 md:px-10 lg:px-20 py-16 bg-white">
        <div className="max-w-360 mx-auto">
          <Link
            href="/publications"
            className="text-sm text-[#535862] hover:text-yellow transition-colors mb-8 inline-block"
          >
            ← Back to Publications
          </Link>
          <p className="text-sm font-semibold text-yellow mb-4">
            {publication.author} • {publication.date}
          </p>
          <p className="text-sm text-[#535862] mb-6">
            {getCategoryLabel(publication.category)}
          </p>
          <h1 className="text-[40px] font-semibold text-[#181D27] mb-6 leading-tight">
            {publication.title}
          </h1>
          <p className="text-lg text-[#535862] leading-7">{publication.excerpt}</p>
          <p className="mt-8 text-base text-[#535862]">
            Publication detail or download will be added here.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
