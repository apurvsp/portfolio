"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Reveal } from "./shared";

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1500;
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

const stats = [
  { to: 2, prefix: "0", label: "Continents operated" },
  { to: 3, prefix: "0", label: "Active ventures" },
  { to: 8, prefix: "0", label: "Models & tools built" },
  { to: 4, prefix: "0", label: "Essays published" },
  { to: 55, suffix: "+", label: "Positions tracked" },
  { to: 100, prefix: "~", label: "People on the shop floor" },
];

export default function Stats() {
  return (
    <section className="relative px-6 md:px-14 lg:px-24 py-16 md:py-20 border-y border-line bg-void2/60">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} y={16}>
            <div>
              <p className="font-display font-extrabold text-[40px] md:text-[48px] leading-none text-ivory tracking-[-0.03em]">
                <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-dim leading-relaxed">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
