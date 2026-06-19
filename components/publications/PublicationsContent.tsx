"use client";

import { useMemo, useState } from "react";
import PostCard from "@/components/shared/PostCard";
import Pagination from "@/components/shared/Pagination";
import {
  getPaginatedPublications,
  getTotalPublicationPages,
} from "@/lib/data/publications";

export default function PublicationsContent() {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedPublications = useMemo(
    () => getPaginatedPublications(currentPage),
    [currentPage]
  );

  const totalPages = getTotalPublicationPages();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="px-5 md:px-10 lg:px-20 pt-14 pb-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-dark1 mb-5">
            Publications
          </h1>
          <p className="text-base md:text-lg text-neutral leading-relaxed max-w-2xl">
            Subscribe to learn about new product features, the latest in
            technology, solutions, and updates.
          </p>
        </div>
      </section>

      {/* Listing */}
      <section className="px-5 md:px-10 lg:px-20 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-dark1 mb-10">
            All publications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 mb-14">
            {paginatedPublications.map((pub) => (
              <PostCard
                key={pub.id}
                href={`/publications/${pub.slug}`}
                variant="publication"
                coverColor={pub.coverColor}
                title={pub.title}
                author={pub.author}
                date={pub.date}
                excerpt={pub.excerpt}
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
