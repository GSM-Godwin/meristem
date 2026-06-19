"use client";

import { useState } from "react";
import type { LegalSection } from "@/lib/types/legal";

interface LegalDocumentProps {
  sections: LegalSection[];
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LegalDocument({ sections }: LegalDocumentProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleMobileNavClick = (id: string) => {
    scrollToSection(id);
    setMobileTocOpen(false);
  };

  const navItemClass = (id: string) =>
    `text-left text-sm md:text-base leading-6 transition-colors ${
      activeId === id
        ? "font-semibold text-[#181D27]"
        : "text-[#535862] hover:text-[#181D27]"
    }`;

  return (
    <section className="px-5 md:px-10 lg:px-20 py-10 md:py-20">
      <div className="max-w-6xl mx-auto">

        {/* ── Mobile: collapsible table of contents ─────────────────── */}
        <div className="md:hidden mb-8">
          <button
            type="button"
            onClick={() => setMobileTocOpen((v) => !v)}
            aria-expanded={mobileTocOpen}
            className="w-full flex items-center justify-between px-4 py-3.5 border border-[#E9EAEB] rounded-lg text-left bg-white touch-manipulation"
          >
            <span className="text-sm font-semibold text-[#181D27]">
              Table of contents
            </span>
            <ChevronIcon open={mobileTocOpen} />
          </button>

          {mobileTocOpen && (
            <nav className="border border-t-0 border-[#E9EAEB] rounded-b-lg px-4 py-3 flex flex-col gap-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleMobileNavClick(section.id)}
                  className={`${navItemClass(section.id)} py-2 text-left`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* ── Desktop: sidebar grid ──────────────────────────────────── */}
        <div className="hidden md:grid md:grid-cols-[240px_1fr] md:gap-16">
          <nav className="flex flex-col gap-4 sticky top-36 self-start">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={navItemClass(section.id)}
              >
                {section.title}
              </button>
            ))}
          </nav>

          <div className="flex flex-col gap-12">
            {sections.map((section) => (
              <ContentSection key={section.id} section={section} />
            ))}
          </div>
        </div>

        {/* ── Mobile: full-width content ─────────────────────────────── */}
        <div className="md:hidden flex flex-col gap-10">
          {sections.map((section) => (
            <ContentSection key={section.id} section={section} />
          ))}
        </div>

      </div>
    </section>
  );
}

// Extracted to avoid repeating JSX — IDs are unique because
// only one of the two grids is rendered at a time (CSS display:none).
function ContentSection({ section }: { section: LegalSection }) {
  return (
    <article id={section.id} className="scroll-mt-36">
      <h2 className="text-base md:text-lg font-semibold text-[#181D27] mb-4">
        {section.title}
      </h2>
      <div className="flex flex-col gap-4">
        {section.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-sm md:text-base text-[#535862] leading-7">
            {paragraph}
          </p>
        ))}
        {section.listItems && (
          <ul className="list-disc pl-5 md:pl-6 flex flex-col gap-2">
            {section.listItems.map((item, index) => (
              <li key={index} className="text-sm md:text-base text-[#535862] leading-7">
                {item}
              </li>
            ))}
          </ul>
        )}
        {section.paragraphsAfter?.map((paragraph, index) => (
          <p key={`after-${index}`} className="text-sm md:text-base text-[#535862] leading-7">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
