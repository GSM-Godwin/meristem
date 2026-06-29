import Image from "next/image";
import logo from "@/assets/logo.svg";
import type { ContentBlock } from "@/lib/types/insight";
import { renderRichText } from "@/lib/renderRichText";

interface ArticleImageProps {
  src?: string;
  alt?: string;
  caption?: string;
  className?: string;
}

function ArticleImage({ src, alt = "", caption, className = "" }: ArticleImageProps) {
  return (
    <figure className={`flex flex-col gap-3 ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      ) : (
        <div className="relative w-full aspect-720/480 bg-primarybg overflow-hidden">
          <Image
            src={logo}
            alt={alt}
            fill
            className="object-contain p-12"
          />
        </div>
      )}
      {caption && (
        <figcaption className="text-sm text-neutral text-center leading-5">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function ArticleVideo({
  src,
  caption,
  className = "",
}: {
  src?: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`flex flex-col gap-3 ${className}`}>
      {src ? (
        <video
          src={src}
          controls
          className="w-full aspect-video rounded-sm bg-black"
        />
      ) : (
        <div className="relative w-full aspect-video bg-primarybg overflow-hidden rounded-sm flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M8 5.14v13.72c0 .79.87 1.27 1.54.84l11.04-6.86c.63-.39.63-1.29 0-1.68L9.54 4.3C8.87 3.87 8 4.35 8 5.14z"
                fill="#3B2314"
              />
            </svg>
          </div>
        </div>
      )}
      {caption && (
        <figcaption className="text-sm text-neutral text-center leading-5">
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
          case "long-description":
            return (
              <p
                key={index}
                className="text-sm md:text-md text-neutral border-b border-light2 pb-4 md:pb-8 leading-tight"
              >
                {block.text}
              </p>
            );

          case "paragraph":
            return (
              <div key={index}>
                {renderRichText(block.contentJson ?? block.text)}
              </div>
            );

          case "heading":
            return (
              <h2
                key={index}
                className="text-[24px] md:text-[30px] font-semibold text-dark2 leading-8 md:leading-9.5 first:mt-0"
              >
                {block.text}
              </h2>
            );

          case "image":
            return (
              <ArticleImage
                key={index}
                src={block.src}
                alt={block.alt}
                caption={block.caption}
                className="mb-2"
              />
            );

          case "image-row":
            return (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-2">
                <ArticleImage
                  src={block.images?.[0]?.src}
                  alt={block.images?.[0]?.alt}
                  caption={block.images?.[0]?.caption}
                />
                <ArticleImage
                  src={block.images?.[1]?.src}
                  alt={block.images?.[1]?.alt}
                  caption={block.images?.[1]?.caption}
                />
              </div>
            );

          case "video":
            return (
              <ArticleVideo
                key={index}
                src={block.src}
                caption={block.caption}
                className="mb-2"
              />
            );

          case "blockquote":
            return (
              <figure key={index} className="my-4">
                <div className="border-l-2 border-yellow pl-4">
                  <blockquote>
                    <p className="text-[20px] md:text-[24px] font-medium text-dark2 leading-7 md:leading-8">
                      &ldquo;{block.quote}&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="mt-3 text-base text-neutral">
                    — {block.attribution}
                  </figcaption>
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
