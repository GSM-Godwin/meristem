"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import ArrowUpRight from "@/components/insights/ArrowUpRight";
import {
  INSIGHT_CATEGORIES,
  POSTS_PER_PAGE,
  getBlogInsights,
  getFeaturedInsights,
} from "@/lib/data/insights";
import type { Insight } from "@/lib/types/insight";

function InsightMeta({ insight }: { insight: Insight }) {
  return (
    <p className="text-sm text-[#535B6E]">
      {insight.author} • {insight.date}
    </p>
  );
}

function FeaturedLargeCard({ insight }: { insight: Insight }) {
  return (
    <Link href={`/insights/${insight.slug}`} className="group flex flex-col gap-6">
      <div className="relative w-full aspect-[16/10] bg-[#F2EDE0] overflow-hidden">
        <Image
          src={logo}
          alt={insight.title}
          fill
          className="object-contain p-12"
        />
      </div>
      <div className="flex flex-col gap-3">
        <InsightMeta insight={insight} />
        <h3 className="text-2xl font-semibold text-[#3B2314] group-hover:text-yellow transition-colors">
          {insight.title}
        </h3>
        <p className="text-base text-[#535B6E] leading-6">{insight.excerpt}</p>
      </div>
    </Link>
  );
}

function FeaturedSideCard({ insight }: { insight: Insight }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group flex gap-6 items-start"
    >
      <div className="relative w-[200px] shrink-0 aspect-[4/3] bg-[#F2EDE0] overflow-hidden">
        <Image
          src={logo}
          alt={insight.title}
          fill
          className="object-contain p-6"
        />
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <InsightMeta insight={insight} />
        <h3 className="text-lg font-semibold text-[#3B2314] group-hover:text-yellow transition-colors">
          {insight.title}
        </h3>
        <p className="text-sm text-[#535B6E] leading-6 line-clamp-3">
          {insight.excerpt}
        </p>
      </div>
    </Link>
  );
}

function BlogPostCard({ insight }: { insight: Insight }) {
  return (
    <Link href={`/insights/${insight.slug}`} className="group flex flex-col gap-4">
      <div className="relative w-full aspect-[16/10] bg-[#F2EDE0] overflow-hidden">
        <Image
          src={logo}
          alt={insight.title}
          fill
          className="object-contain p-10"
        />
      </div>
      <div className="flex flex-col gap-2">
        <InsightMeta insight={insight} />
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-[#3B2314] group-hover:text-yellow transition-colors">
            {insight.title}
          </h3>
          <ArrowUpRight className="shrink-0 text-[#3B2314] mt-1" />
        </div>
        <p className="text-base text-[#535B6E] leading-6 line-clamp-3">
          {insight.excerpt}
        </p>
      </div>
    </Link>
  );
}

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

export default function InsightsContent() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");

  const featuredInsights = useMemo(
    () => getFeaturedInsights(activeCategory),
    [activeCategory]
  );

  const blogInsights = useMemo(
    () => getBlogInsights(activeCategory),
    [activeCategory]
  );

  const totalPages = Math.max(1, Math.ceil(blogInsights.length / POSTS_PER_PAGE));

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return blogInsights.slice(start, start + POSTS_PER_PAGE);
  }, [blogInsights, currentPage]);

  const paginationRange = getPaginationRange(currentPage, totalPages);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  const [featuredMain, ...featuredSide] = featuredInsights;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="px-5 md:px-10 lg:px-20 pt-16 pb-20">
        <div className="max-w-360 mx-auto flex flex-col items-center text-center">
          <h1 className="text-[48px] font-semibold text-dark2 leading-15 mb-6">
            Insights
          </h1>
          <p className="text-[20px] text-neutral leading-7.5 max-w-3xl mb-10">
            A curated collection of articles, videos, reports, conversations,
            and thought leadership exploring the realities of wealth,
            continuity, family enterprise, and legacy.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex w-full max-w-120"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 text-base border border-neutral rounded-l-lg outline-none focus:border-yellow placeholder:text-[#A5ADC0]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-yellow text-white text-base font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="px-5 md:px-10 lg:px-20 pb-20">
        <div className="max-w-360 mx-auto">
          <h2 className="text-[24px] font-semibold text-dark2 leading-9 mb-8">
            Recent Publications
          </h2>

          <div className="flex flex-wrap items-center gap-2 mb-12">
            {INSIGHT_CATEGORIES.map((category) => {
              const isActive =
                category.id === "see-all"
                  ? false
                  : activeCategory === category.id ||
                    (category.id === "all" &&
                      (activeCategory === "all" || activeCategory === "see-all"));

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 text-sm rounded-full transition-colors ${
                    isActive
                      ? "bg-primarybg text-yellow font-medium"
                      : "text-neutral hover:text-[#3B2314]"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          {featuredMain && (
            <div className="grid grid-cols-[1.2fr_1fr] gap-12">
              <FeaturedLargeCard insight={featuredMain} />
              <div className="flex flex-col gap-10 justify-center">
                {featuredSide.map((insight) => (
                  <FeaturedSideCard key={insight.id} insight={insight} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* All Blog Posts */}
      <section className="px-5 md:px-10 lg:px-20 pb-20">
        <div className="max-w-360 mx-auto">
          <h2 className="text-[30px] font-semibold text-[#3B2314] mb-12">
            All blog posts
          </h2>

          <div className="grid grid-cols-3 gap-x-8 gap-y-16 mb-16">
            {paginatedPosts.map((insight) => (
              <BlogPostCard key={insight.id} insight={insight} />
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-[#DEE3EB] pt-5">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 text-sm font-medium text-[#535B6E] disabled:opacity-40 hover:text-[#3B2314] transition-colors"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-1">
              {paginationRange.map((page, index) =>
                page === "ellipsis" ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 text-sm text-[#535B6E]"
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
                        ? "bg-primarybg text-[#3B2314]"
                        : "text-[#535B6E] hover:bg-primarybg/50"
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
              className="flex items-center gap-2 text-sm font-medium text-[#535B6E] disabled:opacity-40 hover:text-[#3B2314] transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
