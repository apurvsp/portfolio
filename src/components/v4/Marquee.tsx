"use client";

const items = [
  "M&A",
  "Private Equity",
  "Manufacturing",
  "Financial Modelling",
  "NSE Equities",
  "Product",
  "Software Tools",
  "Family Business",
  "US Market Entry",
  "AI Tooling",
];

/* Full-bleed marquee strip.
   variant "red"  → tilted vermillion banner (post-hero)
   variant "ink"  → straight black banner (pre-contact) */
export default function Marquee({
  variant = "red",
}: {
  variant?: "red" | "ink";
}) {
  const row = (
    <>
      {items.map((item) => (
        <span key={item} className="flex items-center flex-shrink-0">
          <span className="font-display uppercase text-[22px] md:text-[26px] tracking-[0.04em] whitespace-nowrap">
            {item}
          </span>
          <span className="mx-6 text-[14px]">✕</span>
        </span>
      ))}
    </>
  );

  if (variant === "ink") {
    return (
      <div className="relative bg-ink text-paper overflow-hidden py-3 select-none border-y-2 border-ink">
        <div className="flex w-max animate-marquee-slow">
          <div className="flex">{row}</div>
          <div className="flex" aria-hidden="true">
            {row}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden py-7 select-none">
      <div className="rotate-[-1.6deg] scale-[1.03] bg-red text-ink border-y-2 border-ink overflow-hidden py-3">
        <div className="flex w-max animate-marquee">
          <div className="flex">{row}</div>
          <div className="flex" aria-hidden="true">
            {row}
          </div>
        </div>
      </div>
    </div>
  );
}
