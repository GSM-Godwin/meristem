import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import MeristemOfficeSection from "@/components/about/MeristemOfficeSection";
import OurPerspectiveSection from "@/components/about/OurPerspectiveSection";
import WealthApproachSection from "@/components/about/WealthApproachSection";
import PerspectivesSection from "@/components/home/PerspectivesSection";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHeroSection />
        <MeristemOfficeSection />
        <OurPerspectiveSection />
        <WealthApproachSection />
        <PerspectivesSection />
      </main>
      <Footer />
    </>
  );
}
