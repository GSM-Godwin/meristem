import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PerspectivesContent from "@/components/perspectives/PerspectivesContent";
import { getPublishedPostCards } from "@/lib/post-cards";

export const metadata: Metadata = {
  title: "Perspectives | Meristem Family Office",
  description:
    "Perspectives and reflections on continuity, stewardship, family enterprise, succession, governance, and the future of wealth across generations.",
};

export default async function PerspectivesPage() {
  const perspectives = await getPublishedPostCards("PERSPECTIVE");

  return (
    <>
      <Navbar />
      <main>
        <PerspectivesContent posts={perspectives} />
      </main>
      <Footer />
    </>
  );
}
