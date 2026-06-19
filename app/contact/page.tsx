import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Meristem Family Office",
  description:
    "Start the conversation with Meristem Family Office about continuity, stewardship, and family enterprise.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <PageHero title="Start the Conversation" />
        <section className="px-5 md:px-10 lg:px-20 py-16 md:py-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <ContactInfo />
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
