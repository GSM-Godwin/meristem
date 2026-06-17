import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import LegalDocument from "@/components/legal/LegalDocument";
import { termsSections } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions | Meristem Family Office",
  description: "Terms and Conditions for Meristem Family Office.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <PageHero title="Terms & Conditions" />
        <LegalDocument sections={termsSections} />
      </main>
      <Footer />
    </>
  );
}
