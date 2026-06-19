import Image from "next/image";
import Link from "next/link";
import herobg from "@/assets/herobg.png";

function TreeIcon() {
  return (
    <svg
      width="16"
      height="22"
      viewBox="0 0 16 22"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Canopy */}
      <polygon points="8,0 16,12 0,12" />
      {/* Trunk */}
      <rect x="6.5" y="12" width="3" height="7" rx="1" />
    </svg>
  );
}

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

      {/* Gradient overlay — darker at the bottom so text reads clearly */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark2/50 via-dark2/55 to-dark2/75" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center text-white px-5 max-w-4xl mx-auto py-16">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold leading-tight mb-6">
          Preserving more
          <br />
          than{" "}
          <span className="relative inline-block">
            Wealth
            {/* Decorative tree icon — top-right of the word */}
            <span className="absolute -top-5 -right-5 text-yellow opacity-90">
              <TreeIcon />
            </span>
          </span>
        </h1>

        <p className="text-base md:text-lg text-white/80 max-w-2xl leading-relaxed mb-10">
          Partnering with families to sustain and strengthen what they have
          built across generations, businesses, relationships, and legacy.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/contact"
            className="bg-yellow text-white px-8 py-4 text-sm font-medium rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto text-center"
          >
            Start the Conversation
          </Link>
          <Link
            href="#solutions"
            className="border-2 border-white text-white px-8 py-4 text-sm font-medium rounded-lg hover:bg-white/10 transition-colors w-full sm:w-auto text-center"
          >
            How We Support Families
          </Link>
        </div>
      </div>
    </section>
  );
}
