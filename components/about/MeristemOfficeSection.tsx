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
      <div className="max-w-6xl mx-auto">
        {/* Top — centered heading + subtext */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-dark1 mb-5">
            The Meristem Family Office
          </h2>
          <p className="text-neutral text-base leading-relaxed">
            A dedicated team of multi-disciplinary advisors — bringing together
            expertise in finance, law, governance, and behavioural science to
            serve the whole family across generations.
          </p>
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left — image */}
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={whoWeAre}
              alt="Meristem Family Office team meeting"
              fill
              className="object-cover"
            />
          </div>

          {/* Right — who we are content */}
          <div>
            <h3 className="text-2xl font-semibold text-dark1 mb-5">
              Who we are
            </h3>

            <p className="text-neutral text-base leading-relaxed mb-4">
              Meristem Family Office is a multi-family office serving
              high-net-worth and ultra-high-net-worth families in Africa and
              beyond. We act as a trusted partner and strategic advisor, helping
              families protect, grow, and transfer what matters most to them.
            </p>

            <p className="text-neutral text-base leading-relaxed mb-6">
              Unlike traditional wealth managers, we take a whole-family view —
              recognising that the health of a family&rsquo;s wealth is
              inseparable from the health of its relationships, governance, and
              values.
            </p>

            <p className="text-dark1 text-sm font-semibold mb-4">
              We work with families to help sustain:
            </p>

            {/* 2-column 3-row checklist */}
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span className="text-sm text-neutral leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
