import { ReactNode } from "react";

function ContinuityIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.5 17.5 A5 5 0 0 1 10.5 10.5 L14 10.5" />
      <path d="M17.5 10.5 A5 5 0 0 1 17.5 17.5 L14 17.5" />
      <line x1="10.5" y1="14" x2="17.5" y2="14" />
    </svg>
  );
}

function WealthBeyondIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="14" y1="28" x2="14" y2="14" />
      <path d="M14 14 C14 10 8 8 8 4 C8 1 10 0 14 0 C18 0 20 1 20 4 C20 8 14 10 14 14Z" />
      <path d="M14 20 L10 24" />
      <path d="M14 20 L18 24" />
    </svg>
  );
}

function StewardshipIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 18 L8 12 L12 14 L18 10 L26 18" />
      <path d="M8 12 L10 20 C10 21.1 10.9 22 12 22 L16 22 C17.1 22 18 21.1 18 20 L18 18" />
      <path d="M2 14 L6 18" />
    </svg>
  );
}

function PrivacyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2 L4 6 L4 14 C4 19.5 8.5 24.5 14 26 C19.5 24.5 24 19.5 24 14 L24 6 Z" />
      <path d="M9.5 14 L12.5 17 L18.5 11" />
    </svg>
  );
}

interface Pillar {
  icon: ReactNode;
  title: string;
  description: string;
}

const PILLARS: Pillar[] = [
  {
    icon: <ContinuityIcon />,
    title: "Continuity Matters",
    description:
      "Wealth rarely disappears suddenly. Continuity weakens gradually through lack of structure, preparedness, alignment, and stewardship. We help families build resilient systems that support continuity and stability beyond the founder.",
  },
  {
    icon: <WealthBeyondIcon />,
    title: "Wealth is More Than Financial Capital",
    description:
      "Financial capital alone does not sustain families across generations. Human capital, intellectual capital, values, governance and reputational capital play critical roles in preserving continuity and determining if financial wealth will last.",
  },
  {
    icon: <StewardshipIcon />,
    title: "Stewardship Over Transactions",
    description:
      "Our work is built around long-term relationships rather than isolated transactions. We work alongside families thoughtfully and discreetly, helping them navigate continuity, complexity, and long-term decision-making with greater clarity and confidence.",
  },
  {
    icon: <PrivacyIcon />,
    title: "Privacy & Trusted Coordination",
    description:
      "As family structures and assets become more complex, families often require careful coordination across multiple priorities, advisors, and decisions. We provide discreet oversight and trusted coordination so families can operate with greater clarity.",
  },
];

export default function WealthApproachSection() {
  return (
    <section className="bg-white py-20 px-5 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow mb-4">
            Our Pillars
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-dark2 mb-5">
            Our Complete Wealth Approach
          </h2>
          <p className="max-w-196.5 text-dark2 text-base md:text-[18px] lg:text-[22px] mx-auto leading-relaxed">
            We believe that long-term family success depends on preserving more than financial capital alone. Sustainable continuity requires intentional stewardship of the structures, relationships, values, knowledge, and capabilities that support families across generations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-primarybg rounded-xl px-6 py-8 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-yellow mb-4 shrink-0">
                {pillar.icon}
              </div>

              <h3 className="font-semibold text-dark2 text-[16px] md:text-[18px] lg:text-[20px] mb-2">
                {pillar.title}
              </h3>

              <p className="text-dark1 text-sm md:text-[14px] lg:text-[16px] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
