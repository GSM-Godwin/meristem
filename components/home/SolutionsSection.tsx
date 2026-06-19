import Image, { StaticImageData } from "next/image";
import famCont from "@/assets/fam-cont.png";
import wealthStruc from "@/assets/wealth-struc.png";
import nextGen from "@/assets/next-gen.png";
import wellbeing from "@/assets/wellbeing.png";
import philantropy from "@/assets/philantropy.png";
import legacy from "@/assets/legacy.png";

interface Solution {
  image: StaticImageData;
  title: string;
  description: string;
}

const SOLUTIONS: Solution[] = [
  {
    image: famCont,
    title: "Family Continuity & Governance",
    description:
      "As families and businesses grow, informal structures become harder to sustain.We work with families to create structures that support continuity, facilitate decision-making, reduce uncertainty, and help preserve stability across generations.",
  },
  {
    image: wealthStruc,
    title: "Wealth Structuring & Coordination",
    description:
      "Many families accumulate assets across businesses, real estate, investments, and multiple advisors. Without coordination, visibility and alignment can become difficult. We help families bring clarity and alignment to their wealth structures.",
  },
  {
    image: nextGen,
    title: "Next-Generation Stewardship",
    description:
      "Preparing the next generation often requires far more than financial inheritance alone. We support families in creating thoughtful pathways for involvement, preparation, and long-term capability development across generations.",
  },
  {
    image: wellbeing,
    title: "Wellbeing & Longevity",
    description:
      "Long-term continuity also depends on the wellbeing of the individuals and relationships that hold families together. We support families in coordinating aspects of health and wellbeing for longevity and peace of mind.",
  },
  {
    image: philantropy,
    title: "Philanthropy & Social Impact",
    description:
      "Many families aspire to create a lasting impact beyond wealth. We support families in structuring their philanthropic efforts in ways that reflect their values, strengthen engagement across generations, and sustain long-term impact.",
  },
  {
    image: legacy,
    title: "Legacy & Intangible Capital",
    description:
      "The values, mindset, discipline, and relationships that helped create wealth are often the very things at risk of being lost over time. We help families intentionally preserve the stories, principles, thinking, and identity that shape long-term continuity.",
  },
];

export default function SolutionsSection() {
  return (
    <section id="solutions" className="bg-dark2 py-20 px-5 md:px-10 lg:px-20">
      <div className="mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-xs leading-[16px] font-semibold uppercase text-[#C3AA6A] mb-5">
            How We Support Families
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Solutions for now and generations to come
          </h2>
          <p className="text-white leading-relaxed text-[22px]">
            Tailored support across the areas that matter most to families seeking to preserve, grow, and transfer wealth and legacy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[26px]">
          {SOLUTIONS.map((solution) => (
            <div
              key={solution.title}
              className="bg-dark1 p-[15px] rounded-md max-w-[388px] mx-auto w-full group"
            >
              <div className="border-2 border-[#C3AA6A] rounded-md overflow-hidden flex flex-col h-full">
                <div className="relative h-48 overflow-hidden shrink-0">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="bg-dark1 py-5 px-3 flex-1">
                  <h3 className="font-semibold text-[32px] leading-[40px] text-white mb-3">
                    {solution.title}
                  </h3>
                  <p className="font-normal text-[16px] leading-[24px] text-white/70">
                    {solution.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
