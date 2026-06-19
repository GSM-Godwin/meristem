import Image from "next/image";
import whoWeAre from "@/assets/whoweare.png";

function CheckIcon() {
  return (
    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-yellow flex items-center justify-center">
      <svg
        width="10"
        height="10"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 6.5L5 9.5L10 3.5"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

const CHECKLIST = [
  "Financial capital",
  "Human capital",
  "Intellectual capital",
  "Values",
  "Relationships",
  "Legacy",
];

export default function MeristemOfficeSection() {
  return (
    <section className="bg-white py-20 px-5 md:px-10 lg:px-20">
      <div className="mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-dark2 mb-5">
            The Meristem Family Office
          </h2>
          <p className="text-dark1 text-base md:text-[18px] lg:text-[22px] leading-tight">
            Preserving continuity often requires intentional structure, thoughtful coordination, and long-term planning across generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="relative w-full aspect-4/3 rounded-sm overflow-hidden">
            <Image
              src={whoWeAre}
              alt="Meristem Family Office team meeting"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="text-[20px] md:text-[24px] lg:text-[32px] font-medium text-dark2 mb-3">
              Who we are
            </h3>

            <p className="text-dark1 text-[12px] md:text-base leading-relaxed mb-4">
              Meristem Family Office was established to help families preserve and sustain wealth across generations through a holistic complete wealth approach..
            </p>

            <p className="text-dark1 text-[12px] md:text-base leading-relaxed mb-6">
              Our focus extends beyond financial assets alone. We support families in navigating continuity, governance, succession, stewardship, and long-term preservation in a way that protects both tangible and intangible wealth.
            </p>

            <p className="text-dark1 text-[12px] md:text-base mb-4">
              We work with families to help sustain:
            </p>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span className="text-sm md:text-base text-dark1 leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
