import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PublicationsContent from "@/components/publications/PublicationsContent";

export const metadata: Metadata = {
  title: "Publications | Meristem Family Office",
  description:
    "Browse Meristem Family Office publications on wealth, continuity, family enterprise, and legacy.",
};

export default function PublicationsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PublicationsContent />
      </main>
      <Footer />
    </>
  );
}
