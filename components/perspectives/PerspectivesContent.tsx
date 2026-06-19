"use client";

import { useMemo, useState } from "react";
import PostCard from "@/components/shared/PostCard";
import Pagination from "@/components/shared/Pagination";
import {
  getPaginatedPerspectives,
  getTotalPerspectivePages,
} from "@/lib/data/perspectives";

export default function PerspectivesContent() {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedPerspectives = useMemo(
    () => getPaginatedPerspectives(currentPage),
    [currentPage]
  );

  const totalPages = getTotalPerspectivePages();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white">
      <section className="px-5 md:px-10 lg:px-20 pt-14 pb-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-dark1 mb-5">
            Perspectives
          </h1>
          <p className="text-base md:text-lg text-neutral leading-relaxed max-w-2xl">
            Perspectives and reflections on continuity, stewardship, family
            enterprise, succession, governance, next-generation leadership, and
            the future of wealth across generations.
          </p>
        </div>
      </section>

      <section className="px-5 md:px-10 lg:px-20 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-dark1 mb-10">
            Recent publications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 mb-14">
            {paginatedPerspectives.map((p) => (
              <PostCard
                key={p.id}
                href={`/perspectives/${p.slug}`}
                variant="perspective"
                title={p.title}
                author={p.author}
                date={p.date}
                duration={p.duration}
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
