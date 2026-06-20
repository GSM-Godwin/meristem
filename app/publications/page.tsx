import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PublicationsContent from "@/components/publications/PublicationsContent";
import { getPublishedPostCards } from "@/lib/post-cards";

export const metadata: Metadata = {
  title: "Publications | Meristem Family Office",
  description:
    "Browse Meristem Family Office publications on wealth, continuity, family enterprise, and legacy.",
};

export default async function PublicationsPage() {
  const publications = await getPublishedPostCards("PUBLICATION");

  return (
    <>
      <Navbar />
      <main>
        <PublicationsContent posts={publications} />
      </main>
      <Footer />
    </>
  );
}
