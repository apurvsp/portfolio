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
        <h2
          className="font-display uppercase text-ink mt-14 mb-5 leading-[1.05] tracking-[0.01em]"
          style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.1rem)" }}
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-mono text-[11px] font-bold text-red mt-10 mb-4 uppercase tracking-[0.32em]">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p
          className={`leading-[1.78] mb-6 ${
            isFirstP
              ? "text-[18px] md:text-[19.5px] font-semibold text-ink"
              : "text-[16px] md:text-[16.5px] text-ink2"
          }`}
        >
          {block.text}
        </p>
      );
    case "bold-p":
      return (
        <p className="text-[16px] md:text-[16.5px] text-ink2 leading-[1.78] mb-5">
          <strong className="text-ink font-extrabold">{block.label}</strong>{" "}
          {block.text}
        </p>
      );
    case "note":
      return (
        <aside className="border border-dashed border-ink/50 bg-paper2 px-5 py-4 my-7">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-ink3 block mb-2">
            Note
          </span>
          <p className="font-mono text-[11.5px] text-ink2 leading-[1.75]">
            {block.text}
          </p>
        </aside>
      );
    case "quote":
      return (
        <blockquote className="my-10 border-l-[6px] border-red pl-6">
          <p className="text-[21px] md:text-[24px] font-extrabold italic text-ink leading-[1.45] mb-3">
            “{block.text}”
          </p>
          {block.attribution && (
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink3">
              — {block.attribution}
            </p>
          )}
        </blockquote>
      );
    case "exhibit":
      return (
        <figure className="my-8 border-2 border-ink bg-paper2 shadow-hard-sm">
          <figcaption className="inline-block bg-ink text-paper font-mono text-[9px] font-bold uppercase tracking-[0.3em] px-3 py-1.5">
            ▣ {block.label}
          </figcaption>
          <p className="px-5 py-4 text-[14px] italic text-ink2 leading-[1.7]">
            {block.caption}
          </p>
        </figure>
      );
    case "table":
      return (
        <div className="my-8 overflow-x-auto border-2 border-ink">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-ink text-paper">
                {block.headers.map((h, j) => (
                  <th
                    key={j}
                    className="text-left py-3 px-4 font-mono text-[9.5px] uppercase tracking-[0.18em] font-bold"
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
                  className="border-b border-line-soft last:border-b-0 hover:bg-paper2 transition-colors"
                >
                  {row.map((cell, k) => (
                    <td
                      key={k}
                      className={`py-3 px-4 leading-[1.6] ${
                        k === 0
                          ? "font-mono text-[10.5px] text-ink uppercase tracking-[0.04em] font-bold"
                          : "text-[13.5px] text-ink2"
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
              className="flex gap-4 text-[15.5px] md:text-[16px] text-ink2 leading-[1.7]"
            >
              <span className="text-red mt-[7px] flex-shrink-0 w-[9px] h-[9px] bg-red" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "verdict":
      return (
        <aside className="my-8 bg-ink text-paper p-6 shadow-hard-red">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-red mb-3">
            ※ {block.label}
          </p>
          <p className="text-[15.5px] text-paper/85 leading-[1.75]">
            {block.text}
          </p>
        </aside>
      );
    case "divider":
      return (
        <div className="flex items-center justify-center gap-3 my-10 text-red text-[11px]">
          ✕ ✕ ✕
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
          className="fixed inset-0 z-[120] bg-paper flex flex-col"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {/* Reader top bar */}
          <div className="relative flex items-center justify-between pl-5 md:pl-8 h-[54px] bg-ink text-paper flex-shrink-0">
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-paper/70 truncate pr-4">
              Reading — {article.title}
            </span>
            <div className="flex items-center self-stretch flex-shrink-0">
              <span className="hidden md:flex items-center font-mono text-[9px] uppercase tracking-[0.25em] text-paper/50 px-5 border-l border-paper/20 self-stretch">
                ESC to close
              </span>
              <button
                onClick={onClose}
                className="w-[54px] self-stretch flex items-center justify-center border-l border-paper/20 text-paper text-[16px] hover:bg-red transition-colors duration-300"
                aria-label="Close article"
              >
                ✕
              </button>
            </div>
            {/* Reading progress */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-paper/15">
              <div
                className="h-full bg-red origin-left transition-transform duration-150"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>
          </div>

          {/* Scrollable article */}
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="flex-1 overflow-y-auto reader-scroll"
          >
            <article className="max-w-[780px] mx-auto px-5 md:px-10 py-14 md:py-20">
              {/* Title block */}
              <header className="mb-12 md:mb-14">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-red mb-6">
                  {article.meta} · {article.readTime}
                </p>
                <h1
                  className="font-display uppercase text-ink leading-[0.95] tracking-[0.005em] mb-6"
                  style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.6rem)" }}
                >
                  {article.title}
                </h1>
                <p className="text-[17.5px] md:text-[19px] font-semibold italic text-ink2 leading-[1.55] max-w-[620px]">
                  {article.subtitle}
                </p>
                <div className="flex items-center gap-4 mt-9">
                  <div className="w-14 h-[3px] bg-red" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink3">
                    By Apurv Patil
                  </span>
                </div>
              </header>

              {article.content.map((block, i) => (
                <Block key={i} block={block} isFirstP={i === firstPIdx} />
              ))}

              {/* Footer */}
              <footer className="mt-20 pt-7 border-t-2 border-ink">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink3">
                    All views are personal opinion. Not investment advice.
                  </p>
                  <button
                    onClick={onClose}
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-red link-draw pb-0.5"
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
