import BoardMemberCard from "@/components/board/BoardMemberCard";
import type { BoardMember } from "@/lib/board-data";

interface BoardSectionProps {
  title: string;
  members: BoardMember[];
}

export default function BoardSection({ title, members }: BoardSectionProps) {
  return (
    <section className="px-5 md:px-10 lg:px-20 py-16 md:py-20">
      <div className="mx-auto">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-[48px] font-bold text-dark2 leading-tight">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
          {members.map((member) => (
            <BoardMemberCard key={`${title}-${member.name}-${member.position}`} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
