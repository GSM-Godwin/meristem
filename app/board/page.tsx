import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import BoardSection from "@/components/board/BoardSection";
import { boardOfDirectors, executiveManagement } from "@/lib/board-data";

export const metadata: Metadata = {
  title: "Board of Directors | Meristem Family Office",
  description:
    "Meet the Board of Directors guiding Meristem Family Office.",
};

export default function BoardPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <PageHero title="Team" />
        <BoardSection title="Board of Directors" members={boardOfDirectors} />
        {/* <BoardSection title="Executive Management" members={executiveManagement} /> */}
      </main>
      <Footer />
    </>
  );
}
