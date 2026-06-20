export default function PurposeSection() {
  return (
    <section className="bg-white py-20 px-5 md:px-10 lg:px-20">
          <p className="text-[12px] leading-[16px] font-semibold uppercase tracking-[0.2em] text-primary mb-5 md:mb-10">
            Purpose
          </p>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        <div>
          <h2 className="text-[36px] leading-[44px] md:text-[48px] md:leading-[60px] font-bold text-dark2">
            Families often build wealth faster than they build continuity
          </h2>
        </div>

        <div>
          <p className="text-[18px] leading-[28px] md:text-[22px] md:leading-[32px] font-normal text-dark1">
            For many successful families, there comes a point where the
            questions become bigger than wealth creation itself.
            <br />
            At Meristem Family Office, we help families navigate these
            realities through a Complete Wealth approach designed to preserve
            not only financial wealth, but also the human, intellectual, and
            values capital that sustain families across generations.
          </p>
        </div>
      </div>
    </section>
  );
}
