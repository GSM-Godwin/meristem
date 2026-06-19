import Image from "next/image";
import Link from "next/link";
import herobg from "@/assets/herobg.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src={herobg}
        alt=""
        fill
        className="object-cover object-center"
        priority
      />


      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center text-white px-5 max-w-4xl mx-auto py-16">
        <h1 className="text-[42px] leading-[48px] sm:text-[60px] sm:leading-[66px] lg:text-[80px] lg:leading-[86px] font-bold text-white mb-6">
          Preserving more
          <br />
          than{" "}
          Wealth
        </h1>

        <p className="text-[18px] leading-[26px] md:text-[24px] md:leading-[32px] font-normal text-white max-w-2xl mb-10">
          Partnering with families to sustain and strengthen what they have
          built across generations, businesses, relationships, and legacy.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Link
            href="/contact"
            className="bg-yellow text-white px-[40px] py-[14px] text-[16px] leading-[24px] font-medium rounded-[8px] hover:opacity-90 transition-opacity w-full sm:w-auto text-center"
          >
            Start the Conversation
          </Link>
          <Link
            href="#solutions"
            className="bg-transparent border border-white text-white px-[40px] py-[14px] text-[16px] leading-[24px] font-medium rounded-[8px] hover:bg-white/10 transition-colors w-full sm:w-auto text-center"
          >
            How We Support Families
          </Link>
        </div>
      </div>
    </section>
  );
}
