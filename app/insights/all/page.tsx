import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InsightsAllContent from "@/components/insights/InsightsAllContent";
import { getPublishedPostCards } from "@/lib/post-cards";

export const metadata: Metadata = {
  title: "All Insights | Meristem Family Office",
  description:
    "Browse all thought leadership articles on wealth, continuity, family enterprise, and legacy.",
};

export default async function InsightsAllPage() {
  const insights = await getPublishedPostCards("INSIGHT");

  return (
    <>
      <Navbar />
      <main>
        <InsightsAllContent posts={insights} />
      </main>
      <Footer />
    </>
  );
}
