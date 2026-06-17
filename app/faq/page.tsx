import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { faqItems } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "FAQ | Meristem Family Office",
  description:
    "Frequently asked questions about family offices, continuity planning, and preserving wealth across generations.",
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <PageHero title="Important Conversations" />
        <section className="px-5 md:px-10 lg:px-20 py-16 md:py-20">
          <div className="max-w-[768px] mx-auto">
            <h2 className="text-[30px] font-semibold text-[#181D27] leading-[38px] mb-8">
              FAQ
            </h2>
            <FaqAccordion items={faqItems} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
