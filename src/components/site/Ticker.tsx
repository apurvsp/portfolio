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

export default function Ticker() {
  const row = (
    <>
      {items.map((item) => (
        <span key={item} className="flex items-center flex-shrink-0">
          <span className="font-serif italic text-[15px] text-text2 whitespace-nowrap">
            {item}
          </span>
          <span className="mx-7 text-gold text-[9px]">✦</span>
        </span>
      ))}
    </>
  );

  return (
    <div className="relative border-y border-border bg-surface overflow-hidden py-3.5 select-none">
      <div className="flex w-max animate-marquee">
        <div className="flex">{row}</div>
        <div className="flex" aria-hidden="true">
          {row}
        </div>
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
