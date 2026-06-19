import Image from "next/image";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — filename has a space; Next.js static imports handle this correctly
import aboutHeroBg from "@/assets/abouthero bg.png";

export default function AboutHeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center overflow-hidden">
      <Image
        src={aboutHeroBg}
        alt=""
        fill
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-b from-dark2/55 via-dark2/60 to-dark2/75" />

      <div className="relative z-10 flex flex-col items-center text-center text-white px-5 max-w-3xl mx-auto py-16">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold leading-tight mb-6">
          About Us
        </h1>
        <p className="text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
          Partnering with families to sustain and strengthen what they have
          built across generations, businesses, relationships, and legacy.
        </p>
      </div>
    </section>
  );
}
