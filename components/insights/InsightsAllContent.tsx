"use client";

import { useMemo, useState } from "react";
import PostCard from "@/components/shared/PostCard";
import Pagination from "@/components/shared/Pagination";
import { insights } from "@/lib/data/insights";

const PER_PAGE = 9;

export default function InsightsAllContent() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(insights.length / PER_PAGE));

  const paginatedInsights = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return insights.slice(start, start + PER_PAGE);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="px-5 md:px-10 lg:px-20 pt-14 pb-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold text-dark1 mb-5">
            Insights
          </h1>
          <p className="text-base md:text-lg text-neutral leading-relaxed max-w-2xl">
            A curated collection of articles, videos, reports, conversations,
            and thought leadership exploring the realities of wealth,
            continuity, family enterprise, and legacy.
          </p>
        </div>
      </section>

      {/* Listing */}
      <section className="px-5 md:px-10 lg:px-20 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-dark1 mb-10">
            All insights
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 mb-14">
            {paginatedInsights.map((insight) => (
              <PostCard
                key={insight.id}
                href={`/insights/${insight.slug}`}
                variant="insight"
                title={insight.title}
                author={insight.author}
                date={insight.date}
                excerpt={insight.excerpt}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  );
}
