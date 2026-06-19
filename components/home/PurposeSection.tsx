export default function PurposeSection() {
  return (
    <section className="bg-white py-20 px-5 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Left — label + heading */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-5">
            Purpose
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-dark1 leading-snug">
            Families often build wealth faster than they build continuity
          </h2>
        </div>

        {/* Right — supporting text, vertically centered */}
        <div className="flex items-center">
          <p className="text-neutral text-base md:text-lg leading-relaxed">
            There is a critical gap that many thriving families face — the
            difference between accumulating assets and ensuring those assets,
            values, and relationships endure across generations. At Meristem
            Family Office, we sit at that intersection, helping families build
            not just wealth, but the continuity to carry it forward.
          </p>
        </div>
      </div>
    </section>
  );
}
