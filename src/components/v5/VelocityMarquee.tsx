"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/* Marquee whose speed and skew react to scroll velocity. */
export default function VelocityMarquee({
  items,
  baseVelocity = 1.6,
  outline = false,
}: {
  items: string[];
  baseVelocity?: number;
  outline?: boolean;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false,
  });
  const skew = useTransform(smoothVelocity, [-1200, 1200], [4, -4]);

  const directionRef = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let moveBy = directionRef.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionRef.current = -1;
    else if (vf > 0) directionRef.current = 1;
    moveBy += directionRef.current * moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  const row = items.map((item, i) => (
    <span key={i} className="flex items-center flex-shrink-0">
      <span
        className={`font-display font-extrabold tracking-[-0.02em] whitespace-nowrap text-[28px] md:text-[40px] ${
          outline ? "text-outline" : "text-ivory/90"
        }`}
      >
        {item}
      </span>
      <span className="mx-8 text-violet-bright text-[14px]">✦</span>
    </span>
  ));

  return (
    <div className="relative overflow-hidden py-8 select-none" aria-hidden="true">
      <motion.div className="flex w-max" style={{ x, skewX: skew }}>
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </motion.div>
    </div>
  );
}
