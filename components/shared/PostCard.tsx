import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import PlayButton from "@/components/perspectives/PlayButton";

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export type CardVariant = "publication" | "insight" | "perspective";

export interface PostCardProps {
  href: string;
  variant: CardVariant;
  coverColor?: string;
  coverSrc?: string;
  comingSoon?: boolean;
  title: string;
  author: string;
  date: string;
  duration?: string;
  excerpt?: string;
}

export default function PostCard({
  href,
  variant,
  coverColor,
  coverSrc,
  comingSoon,
  title,
  author,
  date,
  duration,
  excerpt,
}: PostCardProps) {
  const bgColor =
    variant === "publication" ? (coverColor ?? "#F2EDE0") : "#F2EDE0";

  const metaColor =
    variant === "publication"
      ? "text-yellow font-semibold"
      : "text-neutral";

  return (
    <Link href={href} className="group flex flex-col gap-8">
      {/* Thumbnail */}
      <div
        className="relative w-full h-103.5 aspect-3/2 overflow-hidden rounded-sm"
        style={{ backgroundColor: bgColor }}
      >
        <Image
          src={coverSrc ?? logo}
          alt={title}
          fill
          className={coverSrc ? "object-cover" : "object-contain p-10"}
        />
        {variant === "perspective" && <PlayButton />}
        {comingSoon && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-dark2/85 text-white text-xs font-semibold px-3 py-1 backdrop-blur-sm">
            Coming soon
          </span>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <p className={`text-sm font-semibold text-yellow {metaColor}`}>
          {author}&nbsp;&bull;&nbsp;{date}
          {duration ? ` (${duration})` : ""}
        </p>

        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base md:text-[20p] lg:text-[24px] font-semibold text-dark2 group-hover:text-yellow transition-colors leading-snug">
            {title}
          </h3>
          <ArrowUpRight className="text-dark2 mt-0.5" />
        </div>

        {excerpt && (
          <p className="text-sm md:text-[16px] text-neutral leading-tight line-clamp-2">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
