"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* Custom cursor: a dot with a lagging ring. Targets with [data-cursor]
   grow the ring; [data-cursor-label] shows a word inside it.
   Desktop fine-pointer only; blend-difference keeps it visible on bone. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest?.(
        "[data-cursor], a, button"
      ) as HTMLElement | null;
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute("data-cursor-label"));
      } else {
        setHovering(false);
        setLabel(null);
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.body.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[400] pointer-events-none w-[6px] h-[6px] rounded-full bg-ivory mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      {/* Ring */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[399] pointer-events-none rounded-full border border-ivory mix-blend-difference flex items-center justify-center"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 84 : hovering ? 52 : 30,
          height: label ? 84 : hovering ? 52 : 30,
          backgroundColor: label
            ? "rgba(241,238,231,1)"
            : "rgba(241,238,231,0)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {label && (
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-void">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
