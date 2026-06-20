import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InsightsContent from "@/components/insights/InsightsContent";
import { getPublishedPostCards } from "@/lib/post-cards";

export const metadata: Metadata = {
  title: "Insights | Meristem Family Office",
  description:
    "A curated collection of articles, videos, reports, and thought leadership on wealth, continuity, family enterprise, and legacy.",
};

export default async function InsightsPage() {
  const [publications, insights, perspectives] = await Promise.all([
    getPublishedPostCards("PUBLICATION", 3),
    getPublishedPostCards("INSIGHT", 6),
    getPublishedPostCards("PERSPECTIVE", 6),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <InsightsContent
          publications={publications}
          insights={insights}
          perspectives={perspectives}
        />
      </main>
      <Footer />
    </>
  );
}
