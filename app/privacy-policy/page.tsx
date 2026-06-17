import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import LegalDocument from "@/components/legal/LegalDocument";
import { privacyPolicySections } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Meristem Family Office",
  description: "Privacy Policy for Meristem Family Office.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <PageHero title="Privacy Policy" />
        <LegalDocument sections={privacyPolicySections} />
      </main>
      <Footer />
    </>
  );
}
