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
      "Building structures that preserve family unity and shared decision-making across generations.",
  },
  {
    image: wealthStruc,
    title: "Wealth Structuring & Coordination",
    description:
      "Coordinating complex financial, legal, and investment needs under one strategic framework.",
  },
  {
    image: nextGen,
    title: "Next-Generation Stewardship",
    description:
      "Preparing the next generation to be confident, capable stewards of family wealth and values.",
  },
  {
    image: wellbeing,
    title: "Wellbeing & Longevity",
    description:
      "Supporting the holistic health and longevity of family members as part of a complete wealth plan.",
  },
  {
    image: philantropy,
    title: "Philanthropy & Social Impact",
    description:
      "Channelling family values into meaningful social impact with structure and long-term intention.",
  },
  {
    image: legacy,
    title: "Legacy & Intangible Capital",
    description:
      "Identifying and transferring the values, stories, and relationships that form a family's true legacy.",
  },
];

export default function SolutionsSection() {
  return (
    <section id="solutions" className="bg-dark1 py-20 px-5 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-5">
            How We Support Families
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-snug mb-4">
            Solutions for now and generations to come
          </h2>
          <p className="text-white/55 text-base leading-relaxed">
            Tailored strategies that protect, grow, and transfer what matters
            most to the families we serve.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((solution) => (
            <div
              key={solution.title}
              className="border border-yellow/70 rounded-lg overflow-hidden flex flex-col group hover:border-yellow transition-colors"
            >
              {/* Card image */}
              <div className="relative h-48 overflow-hidden shrink-0">
                <Image
                  src={solution.image}
                  alt={solution.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card body */}
              <div className="bg-dark1 border-t border-yellow/70 group-hover:border-yellow p-5 flex-1 transition-colors">
                <h3 className="font-semibold text-white text-base leading-snug mb-2">
                  {solution.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {solution.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
