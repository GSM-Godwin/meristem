"use client";

import { useState } from "react";
import type { LegalSection } from "@/lib/types/legal";

interface LegalDocumentProps {
  sections: LegalSection[];
}

export default function LegalDocument({ sections }: LegalDocumentProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  const scrollToSection = (id: string) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="px-5 md:px-10 lg:px-20 py-16 md:py-20">
      <div className="max-w-360 mx-auto grid grid-cols-[240px_1fr] gap-16">
        <nav className="flex flex-col gap-4 sticky top-36 self-start">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className={`text-left text-base leading-6 transition-colors ${
                activeId === section.id
                  ? "font-semibold text-[#181D27]"
                  : "text-[#535862] hover:text-[#181D27]"
              }`}
            >
              {section.title}
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-12">
          {sections.map((section) => (
            <article key={section.id} id={section.id} className="scroll-mt-36">
              <h2 className="text-lg font-semibold text-[#181D27] mb-4">
                {section.title}
              </h2>
              <div className="flex flex-col gap-4">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-base text-[#535862] leading-7">
                    {paragraph}
                  </p>
                ))}
                {section.listItems && (
                  <ul className="list-disc pl-6 flex flex-col gap-2">
                    {section.listItems.map((item, index) => (
                      <li key={index} className="text-base text-[#535862] leading-7">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.paragraphsAfter?.map((paragraph, index) => (
                  <p key={`after-${index}`} className="text-base text-[#535862] leading-7">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
