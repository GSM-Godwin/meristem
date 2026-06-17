import Navbar from "@/components/Navbar";
import Image from "next/image";
import herobg from "@/assets/herobg.png";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative w-full h-screen">
        {/* Background image */}
        <Image
          src={herobg}
          alt="Hero"
          fill
          className="object-fill md:object-cover"
          priority
        />

        {/* Content sits on top */}
        <div className="relative z-10 gap-5 flex flex-col items-center justify-center h-full">
          <h1 className="text-[80px] font-bold text-center leading-21.5">Preserving More <br /> Than Wealth</h1>
          <p className="text-center text-[24px] leading-8">Helping families sustain what they have built, across generations, businesses, <br /> relationships, and legacy” with “Partnering with families to sustain and strengthen <br /> what they have built across generations, businesses, relationships, and legacy</p>
          <div className="flex gap-4 items-center mt-5">
            <Link href="/" className="bg-yellow px-10 py-4.5 font-medium text-[16px] leading-6 rounded-lg">Start the conversation</Link>
            <Link href="/" className="bg-transparent leading-6 border-2 border-white px-10 py-4.5 font-medium text-[16px] rounded-lg">How we Support Families</Link>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}
