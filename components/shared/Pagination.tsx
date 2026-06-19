"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPaginationRange(
  current: number,
  total: number
): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("ellipsis");

  pages.push(total);
  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const range = getPaginationRange(currentPage, totalPages);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-light2 pt-5">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-2 text-sm font-medium text-neutral disabled:opacity-40 hover:text-dark1 transition-colors"
      >
        ← Previous
      </button>

      <div className="flex items-center gap-1 flex-wrap justify-center">
        {range.map((page, i) =>
          page === "ellipsis" ? (
            <span key={`e-${i}`} className="px-2 text-sm text-neutral">
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                currentPage === page
                  ? "bg-primarybg text-dark1"
                  : "text-neutral hover:bg-primarybg/50"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 text-sm font-medium text-neutral disabled:opacity-40 hover:text-dark1 transition-colors"
      >
        Next →
      </button>
    </div>
  );
}
