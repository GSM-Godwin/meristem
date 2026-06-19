import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InsightsAllContent from "@/components/insights/InsightsAllContent";

export const metadata: Metadata = {
  title: "All Insights | Meristem Family Office",
  description:
    "Browse all thought leadership articles on wealth, continuity, family enterprise, and legacy.",
};

export default function InsightsAllPage() {
  return (
    <>
      <Navbar />
      <main>
        <InsightsAllContent />
      </main>
      <Footer />
    </>
  );
}
