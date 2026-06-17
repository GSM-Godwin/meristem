import Image from "next/image";
import logo from "@/assets/logo.png";
import type { ContentBlock } from "@/lib/types/insight";

function ArticleImage({
  caption,
  className = "",
}: {
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="relative w-full aspect-[720/480] bg-[#F2EDE0] overflow-hidden">
        <Image
          src={logo}
          alt=""
          fill
          className="object-contain p-12"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-base text-[#535862]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function ArticleContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-8">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="text-lg text-[#535862] leading-[28px]"
              >
                {block.text}
              </p>
            );

          case "heading":
            return (
              <h2
                key={index}
                className="text-[30px] font-semibold text-[#181D27] leading-[38px] mt-8 first:mt-0"
              >
                {block.text}
              </h2>
            );

          case "image":
            return (
              <ArticleImage
                key={index}
                caption={block.caption}
                className="my-4"
              />
            );

          case "image-row":
            return (
              <div key={index} className="grid grid-cols-2 gap-8 my-4">
                <ArticleImage caption={block.captions?.[0]} />
                <ArticleImage caption={block.captions?.[1]} />
              </div>
            );

          case "blockquote":
            return (
              <figure key={index} className="my-12 py-2">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-[#E9EAEB]" />
                  <div className="w-2 h-2 rotate-45 border border-[#E9EAEB]" />
                  <div className="flex-1 h-px bg-[#E9EAEB]" />
                </div>
                <blockquote>
                  <p className="font-[family-name:var(--font-playfair)] text-[36px] font-medium text-[#181D27] leading-[44px] tracking-[-0.02em] text-center">
                    {block.quote}
                  </p>
                </blockquote>
                <figcaption className="mt-8 text-center text-base text-[#535862]">
                  — {block.attribution}
                </figcaption>
                <div className="flex items-center gap-4 mt-8">
                  <div className="flex-1 h-px bg-[#E9EAEB]" />
                  <div className="w-2 h-2 rotate-45 border border-[#E9EAEB]" />
                  <div className="flex-1 h-px bg-[#E9EAEB]" />
                </div>
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
