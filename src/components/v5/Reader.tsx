"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArticleData } from "@/data/articles";
import { EASE } from "./shared";

interface ReaderProps {
  article: ArticleData | null;
  onClose: () => void;
}

function Block({
  block,
  isFirstP,
}: {
  block: ArticleData["content"][0];
  isFirstP: boolean;
}) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="font-display font-extrabold text-void mt-14 mb-5 leading-[1.1] tracking-[-0.02em] text-[clamp(1.5rem,3vw,2rem)]">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-mono text-[10.5px] font-semibold text-violet mt-10 mb-4 uppercase tracking-[0.32em]">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p
          className={`leading-[1.82] mb-6 ${
            isFirstP
              ? "font-display font-medium text-[19px] md:text-[21px] text-void"
              : "text-[16px] md:text-[16.5px] text-void/75"
          }`}
        >
          {block.text}
        </p>
      );
    case "bold-p":
      return (
        <p className="text-[16px] md:text-[16.5px] text-void/75 leading-[1.82] mb-5">
          <strong className="text-void font-bold">{block.label}</strong>{" "}
          {block.text}
        </p>
      );
    case "note":
      return (
        <aside className="rounded-2xl border border-dashed border-linedark2 bg-bone2/70 px-5 py-4 my-7">
          <span className="font-mono text-[8.5px] font-semibold uppercase tracking-[0.3em] text-void/45 block mb-2">
            Note
          </span>
          <p className="font-mono text-[11.5px] text-void/65 leading-[1.75]">
            {block.text}
          </p>
        </aside>
      );
    case "quote":
      return (
        <blockquote className="my-10 pl-6 border-l-[3px] border-violet">
          <p className="font-display font-semibold text-[21px] md:text-[24px] text-void leading-[1.45] mb-3 tracking-[-0.01em]">
            “{block.text}”
          </p>
          {block.attribution && (
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-void/50">
              — {block.attribution}
            </p>
          )}
        </blockquote>
      );
    case "exhibit":
      return (
        <figure className="my-8 rounded-2xl border border-linedark2 bg-bone2 overflow-hidden">
          <figcaption className="px-5 pt-4 font-mono text-[9.5px] font-semibold uppercase tracking-[0.3em] text-violet">
            ▣ {block.label}
          </figcaption>
          <p className="px-5 py-4 text-[14px] italic text-void/70 leading-[1.7]">
            {block.caption}
          </p>
        </figure>
      );
    case "table":
      return (
        <div className="my-8 overflow-x-auto rounded-2xl border border-linedark2">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-void text-ivory">
                {block.headers.map((h, j) => (
                  <th
                    key={j}
                    className="text-left py-3.5 px-4 font-mono text-[9px] uppercase tracking-[0.18em] font-medium"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, j) => (
                <tr
                  key={j}
                  className="border-b border-linedark last:border-b-0 hover:bg-bone2/80 transition-colors"
                >
                  {row.map((cell, k) => (
                    <td
                      key={k}
                      className={`py-3 px-4 leading-[1.6] ${
                        k === 0
                          ? "font-mono text-[10px] text-void uppercase tracking-[0.04em] font-semibold"
                          : "text-[13.5px] text-void/75"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "list":
      return (
        <ul className="my-7 space-y-3.5">
          {block.items.map((item, j) => (
            <li
              key={j}
              className="flex gap-4 text-[15.5px] text-void/75 leading-[1.75]"
            >
              <span className="mt-[9px] flex-shrink-0 w-[7px] h-[7px] rounded-full bg-violet" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "verdict":
      return (
        <aside className="my-8 rounded-2xl bg-void text-ivory p-7 shadow-glow-soft">
          <p className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.35em] text-violet-bright mb-3">
            ※ {block.label}
          </p>
          <p className="text-[15.5px] text-ivory/85 leading-[1.78]">
            {block.text}
          </p>
        </aside>
      );
    case "divider":
      return (
        <div className="flex items-center justify-center gap-3 my-10 text-violet text-[11px]">
          ✦ ✦ ✦
        </div>
      );
    default:
      return null;
  }
}

export default function Reader({ article, onClose }: ReaderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = article ? "hidden" : "";
    setProgress(0);
    return () => {
      document.body.style.overflow = "";
    };
  }, [article]);

  function onScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 0);
  }

  const firstPIdx = article?.content.findIndex((b) => b.type === "p") ?? -1;

  return (
    <AnimatePresence>
      {article && (
        <motion.div
          className="fixed inset-0 z-[220] bg-bone text-void flex flex-col"
          initial={{ opacity: 0, y: "6%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "6%" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {/* Top bar */}
          <div className="relative flex items-center justify-between px-5 md:px-8 h-[56px] border-b border-linedark bg-bone/85 flex-shrink-0"
            style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-void/55 truncate pr-4">
              Reading — {article.title}
            </span>
            <div className="flex items-center gap-5 flex-shrink-0">
              <span className="hidden md:block font-mono text-[9px] uppercase tracking-[0.25em] text-void/40">
                ESC to close
              </span>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-linedark2 text-void hover:bg-void hover:text-bone transition-colors duration-300"
                aria-label="Close article"
                data-cursor
              >
                ✕
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-linedark">
              <div
                className="h-full origin-left transition-transform duration-150"
                style={{
                  transform: `scaleX(${progress})`,
                  background:
                    "linear-gradient(90deg, var(--violet), var(--cyan))",
                }}
              />
            </div>
          </div>

          {/* Article */}
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="flex-1 overflow-y-auto reader-scroll"
          >
            <article className="max-w-[760px] mx-auto px-5 md:px-10 py-14 md:py-20">
              <header className="mb-12 md:mb-14">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-violet mb-6">
                  {article.meta} · {article.readTime}
                </p>
                <h1 className="font-display font-extrabold text-void leading-[1.0] tracking-[-0.03em] mb-6 text-[clamp(2.3rem,6vw,4.2rem)]">
                  {article.title}
                </h1>
                <p className="text-[17px] md:text-[19px] font-medium italic text-void/65 leading-[1.6] max-w-[620px]">
                  {article.subtitle}
                </p>
                <div className="flex items-center gap-4 mt-9">
                  <div
                    className="w-14 h-[3px] rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--violet), var(--cyan))",
                    }}
                  />
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-void/45">
                    By Apurv Patil
                  </span>
                </div>
              </header>

              {article.content.map((block, i) => (
                <Block key={i} block={block} isFirstP={i === firstPIdx} />
              ))}

              <footer className="mt-20 pt-7 border-t border-linedark2">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-void/45">
                    All views are personal opinion. Not investment advice.
                  </p>
                  <button
                    onClick={onClose}
                    className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-violet link-draw pb-0.5"
                    data-cursor
                  >
                    ← Back to index
                  </button>
                </div>
              </footer>
            </article>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
