import Image from "next/image";
import { getMemberInitials, type BoardMember } from "@/lib/board-data";

interface BoardMemberCardProps {
  member: BoardMember;
}

export default function BoardMemberCard({ member }: BoardMemberCardProps) {
  const alt = `${member.name}, ${member.position}`;
  const initials = getMemberInitials(member.name);
  const hasPhoto = Boolean(member.imageUrl.trim());

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-primarybg">
        {hasPhoto ? (
          <Image
            src={member.imageUrl}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-dark1 to-dark2"
            aria-hidden="true"
          >
            <span className="text-4xl md:text-5xl font-semibold tracking-wide text-yellow/90">
              {initials}
            </span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 hidden bg-linear-to-t from-dark2 via-dark2/90 to-transparent px-4 pb-4 pt-16 opacity-0 transition-opacity duration-300 ease-out [@media(hover:hover)_and_(pointer:fine)]:block [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100">
          <p className="text-sm md:text-base font-semibold text-white leading-snug">
            {member.name}
          </p>
          <p className="mt-1 text-xs md:text-sm text-yellow leading-snug">
            {member.position}
          </p>
        </div>
      </div>

      <div className="mt-4 [@media(hover:hover)_and_(pointer:fine)]:sr-only">
        <p className="text-sm md:text-base font-semibold text-dark2 leading-snug">
          {member.name}
        </p>
        <p className="mt-1 text-xs md:text-sm text-yellow leading-snug">
          {member.position}
        </p>
      </div>
    </article>
  );
}
