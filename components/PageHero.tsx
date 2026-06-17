import Image from "next/image";
import semicircle from "@/assets/semicircle.png";
import glass from "@/assets/glass.png";

interface PageHeroProps {
  title: string;
}

export default function PageHero({ title }: PageHeroProps) {
  return (
    <section className="relative bg-yellow overflow-hidden">
      <Image
        src={semicircle}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-[75px] bottom-0 h-[230px] md:h-[270px] w-auto object-contain object-left-bottom"
        priority
      />
      <Image
        src={glass}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute right-[225px] top-0 h-[230px] md:h-[270px] w-auto object-contain object-right-top"
        priority
      />

      <div className="relative z-10 h-[220px] md:h-[260px] flex items-center justify-center px-5">
        <h1 className="text-[40px] md:text-[48px] font-semibold text-white text-center leading-tight">
          {title}
        </h1>
      </div>
    </section>
  );
}
