import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import PurposeSection from "@/components/home/PurposeSection";
import SolutionsSection from "@/components/home/SolutionsSection";
import PerspectivesSection from "@/components/home/PerspectivesSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PurposeSection />
        <SolutionsSection />
        <PerspectivesSection />
      </main>
      <Footer />
    </>
  );
}
