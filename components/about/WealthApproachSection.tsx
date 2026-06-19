import { ReactNode } from "react";

/* ── Pillar icons ─────────────────────────────────────────────────────────── */

function ContinuityIcon() {
  // Two interlocking link rings — "continuity / connection"
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.5 17.5 A5 5 0 0 1 10.5 10.5 L14 10.5" />
      <path d="M17.5 10.5 A5 5 0 0 1 17.5 17.5 L14 17.5" />
      <line x1="10.5" y1="14" x2="17.5" y2="14" />
    </svg>
  );
}

function WealthBeyondIcon() {
  // Tree with roots — wealth that grows and deepens
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
  // Handshake — stewardship / partnership over transactions
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 18 L8 12 L12 14 L18 10 L26 18" />
      <path d="M8 12 L10 20 C10 21.1 10.9 22 12 22 L16 22 C17.1 22 18 21.1 18 20 L18 18" />
      <path d="M2 14 L6 18" />
    </svg>
  );
}

function PrivacyIcon() {
  // Shield with a checkmark — privacy & trusted coordination
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2 L4 6 L4 14 C4 19.5 8.5 24.5 14 26 C19.5 24.5 24 19.5 24 14 L24 6 Z" />
      <path d="M9.5 14 L12.5 17 L18.5 11" />
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────────────────────── */

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
      "Building strategies that connect today's decisions to tomorrow's outcomes — so that family wealth endures beyond a single generation.",
  },
  {
    icon: <WealthBeyondIcon />,
    title: "Wealth is More Than Financial Capital",
    description:
      "True family wealth encompasses human capital, intellectual capital, values, relationships, and legacy — not just financial assets.",
  },
  {
    icon: <StewardshipIcon />,
    title: "Stewardship Over Transactions",
    description:
      "We prioritise long-term stewardship relationships over transactional advice, aligning our success with the success of the families we serve.",
  },
  {
    icon: <PrivacyIcon />,
    title: "Privacy & Trusted Coordination",
    description:
      "We operate with the highest discretion, acting as a trusted coordinator across all advisors and institutions serving your family.",
  },
];

/* ── Component ────────────────────────────────────────────────────────────── */

export default function WealthApproachSection() {
  return (
    <section className="bg-white py-20 px-5 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow mb-4">
            Our Pillars
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-dark1 mb-5">
            Our Complete Wealth Approach
          </h2>
          <p className="text-neutral text-base leading-relaxed">
            We take a whole-family view, recognising that financial health and
            family health are inseparable.
          </p>
        </div>

        {/* 2 × 2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-primarybg rounded-lg p-8 flex flex-col items-center text-center"
            >
              {/* Circular icon container */}
              <div className="w-14 h-14 rounded-full bg-yellow/10 flex items-center justify-center text-yellow mb-5 shrink-0">
                {pillar.icon}
              </div>

              <h3 className="font-semibold text-dark1 text-base mb-3">
                {pillar.title}
              </h3>

              <p className="text-neutral text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
