"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/types/faq";

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <span className="shrink-0 w-8 h-8 rounded-full border border-[#DEE3EB] flex items-center justify-center text-[#535862]">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        {open ? (
          <path
            d="M3.5 8h9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ) : (
          <>
            <path
              d="M8 3.5v9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M3.5 8h9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </span>
  );
}

interface FaqAccordionProps {
  items: FaqItem[];
  defaultOpenIds?: string[];
}

export default function FaqAccordion({
  items,
  defaultOpenIds = ["1", "2"],
}: FaqAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds));

  const toggleItem = (id: string) => {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="border-t border-[#E9EAEB]">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);

        return (
          <div key={item.id} className="border-b border-[#E9EAEB]">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-start justify-between gap-6 py-6 text-left"
            >
              <span className="text-lg font-semibold text-[#181D27] leading-7">
                {item.question}
              </span>
              <ToggleIcon open={isOpen} />
            </button>

            {isOpen && (
              <div className="pb-6 pr-14">
                <p className="text-base text-[#535862] leading-6">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
