import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InsightsContent from "@/components/insights/InsightsContent";

export const metadata: Metadata = {
  title: "Insights | Meristem Family Office",
  description:
    "A curated collection of articles, videos, reports, and thought leadership on wealth, continuity, family enterprise, and legacy.",
};

export default function InsightsPage() {
  return (
    <>
      <Navbar />
      <main>
        <InsightsContent />
      </main>
      <Footer />
    </>
  );
}
