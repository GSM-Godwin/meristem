"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import ArrowUpRight from "@/components/insights/ArrowUpRight";
import {
  PUBLICATION_CATEGORIES,
  getPaginatedPublications,
  getTotalPublicationPages,
} from "@/lib/data/publications";
import type { Publication } from "@/lib/types/publication";

function getPaginationRange(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("ellipsis");

  pages.push(total);

  return pages;
}

function PublicationCard({ publication }: { publication: Publication }) {
  return (
    <Link
      href={`/publications/${publication.slug}`}
      className="group flex flex-col gap-4"
    >
      <div
        className="relative w-full aspect-[384/256] overflow-hidden"
        style={{ backgroundColor: publication.coverColor }}
      >
        <Image
          src={logo}
          alt={publication.title}
          fill
          className="object-contain p-10"
        />
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-yellow">
          {publication.author} • {publication.date}
        </p>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-2xl font-semibold text-[#181D27] leading-8 group-hover:text-yellow transition-colors">
            {publication.title}
          </h3>
          <ArrowUpRight className="shrink-0 text-[#181D27] mt-1.5" />
        </div>
        <p className="text-base text-[#535862] leading-6 line-clamp-2">
          {publication.excerpt}
        </p>
      </div>
    </Link>
  );
}

export default function PublicationsContent() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedPublications = useMemo(
    () => getPaginatedPublications(currentPage, activeCategory),
    [currentPage, activeCategory]
  );

  const totalPages = getTotalPublicationPages(activeCategory);
  const paginationRange = getPaginationRange(currentPage, totalPages);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white">
      <section className="px-5 md:px-10 lg:px-20 pt-16 pb-12">
        <div className="max-w-360 mx-auto flex flex-col items-center text-center">
          <h1 className="text-[48px] font-semibold text-[#181D27] leading-[1.2] mb-5">
            Publications
          </h1>
          <p className="text-xl text-[#535862] leading-[30px] max-w-[768px]">
            Subscribe to learn about new product features, the latest in
            technology, solutions, and updates.
          </p>
        </div>
      </section>

      <section className="px-5 md:px-10 lg:px-20 pb-24">
        <div className="max-w-360 mx-auto">
          <h2 className="text-[30px] font-semibold text-[#181D27] leading-[38px] mb-8">
            All publications
          </h2>

          <div className="flex flex-wrap items-center gap-2 mb-12">
            {PUBLICATION_CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 text-sm rounded-full transition-colors ${
                    isActive
                      ? "bg-primarybg text-[#181D27] font-medium"
                      : "text-[#535862] hover:text-[#181D27]"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-x-8 gap-y-16 mb-16">
            {paginatedPublications.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-[#E9EAEB] pt-5">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 text-sm font-medium text-[#535862] disabled:opacity-40 hover:text-[#181D27] transition-colors"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-1">
              {paginationRange.map((page, index) =>
                page === "ellipsis" ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 text-sm text-[#535862]"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-primarybg text-[#181D27]"
                        : "text-[#535862] hover:bg-primarybg/50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 text-sm font-medium text-[#535862] disabled:opacity-40 hover:text-[#181D27] transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
