import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPerspectiveBySlug, perspectives } from "@/lib/data/perspectives";

interface PerspectivePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return perspectives.map((perspective) => ({ slug: perspective.slug }));
}

export async function generateMetadata({
  params,
}: PerspectivePageProps): Promise<Metadata> {
  const { slug } = await params;
  const perspective = getPerspectiveBySlug(slug);

  if (!perspective) {
    return { title: "Perspective Not Found | Meristem Family Office" };
  }

  return {
    title: `${perspective.title} | Meristem Family Office`,
    description: `${perspective.title} — ${perspective.author}, ${perspective.date}`,
  };
}

export default async function PerspectiveDetailPage({
  params,
}: PerspectivePageProps) {
  const { slug } = await params;
  const perspective = getPerspectiveBySlug(slug);

  if (!perspective) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="px-5 md:px-10 lg:px-20 py-16 bg-white">
        <div className="max-w-360 mx-auto">
          <Link
            href="/perspectives"
            className="text-sm text-[#535862] hover:text-yellow transition-colors mb-8 inline-block"
          >
            ← Back to Perspectives
          </Link>
          <p className="text-sm text-[#535862] mb-4">
            {perspective.author} • {perspective.date} ({perspective.duration})
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-[40px] font-semibold text-[#181D27] mb-6 leading-tight">
            {perspective.title}
          </h1>
          <p className="text-lg text-[#535862] leading-7">
            Individual perspective page content will be added here.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
