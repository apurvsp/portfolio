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
        <h2 className="font-serif text-[26px] md:text-[30px] text-text mt-14 mb-5 leading-[1.2] tracking-[-0.01em]">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-mono text-[11px] text-gold mt-10 mb-4 uppercase tracking-[0.35em]">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p
          className={`font-serif text-[17px] md:text-[18px] text-text2 leading-[1.85] mb-6 ${
            isFirstP ? "dropcap" : ""
          }`}
        >
          {block.text}
        </p>
      );
    case "bold-p":
      return (
        <p className="font-serif text-[17px] md:text-[18px] text-text2 leading-[1.85] mb-5">
          <strong className="text-text font-semibold">{block.label}</strong>{" "}
          {block.text}
        </p>
      );
    case "note":
      return (
        <aside className="border-l-2 border-border2 bg-surface2 pl-5 pr-4 py-3.5 my-7">
          <p className="font-mono text-[11.5px] text-text3 leading-[1.8]">
            {block.text}
          </p>
        </aside>
      );
    case "quote":
      return (
        <blockquote className="my-10 pl-6 border-l-2 border-gold">
          <p className="font-serif italic text-[21px] md:text-[23px] text-text leading-[1.55] mb-3">
            “{block.text}”
          </p>
          {block.attribution && (
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text3">
              — {block.attribution}
            </p>
          )}
        </blockquote>
      );
    case "exhibit":
      return (
        <figure className="my-8 border border-border bg-surface p-5">
          <figcaption className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-2.5">
            ▣ {block.label}
          </figcaption>
          <p className="font-serif italic text-[14.5px] text-text2 leading-[1.7]">
            {block.caption}
          </p>
        </figure>
      );
    case "table":
      return (
        <div className="my-8 overflow-x-auto border border-border">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-surface2">
                {block.headers.map((h, j) => (
                  <th
                    key={j}
                    className="text-left py-3 px-4 font-mono text-[9.5px] uppercase tracking-[0.2em] text-gold font-normal border-b border-border2"
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
                  className="border-b border-border last:border-b-0 hover:bg-[rgba(201,169,110,0.03)] transition-colors"
                >
                  {row.map((cell, k) => (
                    <td
                      key={k}
                      className={`py-3 px-4 leading-[1.6] ${
                        k === 0
                          ? "font-mono text-[10.5px] text-text3 uppercase tracking-[0.06em]"
                          : "font-serif text-[14px] text-text2"
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
              className="flex gap-4 font-serif text-[16.5px] md:text-[17.5px] text-text2 leading-[1.75]"
            >
              <span className="text-gold mt-0.5 flex-shrink-0 font-mono text-[13px]">
                →
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "verdict":
      return (
        <aside className="my-8 border border-[rgba(201,169,110,0.4)] bg-[rgba(201,169,110,0.045)] p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold mb-3">
            ※ {block.label}
          </p>
          <p className="font-serif text-[16px] text-text2 leading-[1.8]">
            {block.text}
          </p>
        </aside>
      );
    case "divider":
      return (
        <div className="flex items-center justify-center gap-3 my-10 text-gold text-[10px]">
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

  // Index of the first plain paragraph (gets the drop cap)
  const firstPIdx = article?.content.findIndex((b) => b.type === "p") ?? -1;

  return (
    <AnimatePresence>
      {article && (
        <motion.div
          className="fixed inset-0 z-[120] bg-bg flex flex-col"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {/* Reading progress */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-border z-10">
            <div
              className="h-full bg-gold origin-left transition-transform duration-150"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>

          {/* Reader top bar */}
          <div className="flex items-center justify-between px-6 md:px-10 h-[58px] border-b border-border bg-[rgba(10,9,8,0.85)] backdrop-blur-md flex-shrink-0">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-text3 truncate pr-4">
              Reading — {article.title}
            </span>
            <div className="flex items-center gap-5 flex-shrink-0">
              <span className="hidden md:block font-mono text-[9px] uppercase tracking-[0.25em] text-text3">
                ESC to close
              </span>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center border border-border2 text-text3 hover:text-gold hover:border-gold transition-colors duration-300"
                aria-label="Close article"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Scrollable article */}
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="flex-1 overflow-y-auto reader-scroll"
          >
            <article className="max-w-[760px] mx-auto px-6 md:px-10 py-16 md:py-24">
              {/* Title block */}
              <header className="mb-12 md:mb-16">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold mb-6">
                  {article.meta} · {article.readTime}
                </p>
                <h1
                  className="font-serif text-text leading-[1.04] tracking-[-0.02em] mb-6"
                  style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)" }}
                >
                  {article.title}
                </h1>
                <p className="font-serif italic text-[19px] md:text-[21px] text-text2 leading-[1.6] max-w-[600px]">
                  {article.subtitle}
                </p>
                <div className="flex items-center gap-4 mt-10">
                  <div className="w-14 h-px bg-gold" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-text3">
                    By Apurv Patil
                  </span>
                </div>
              </header>

              {article.content.map((block, i) => (
                <Block key={i} block={block} isFirstP={i === firstPIdx} />
              ))}

              {/* Footer */}
              <footer className="mt-20 pt-8 border-t border-border">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text3">
                    All views are personal opinion. Not investment advice.
                  </p>
                  <button
                    onClick={onClose}
                    className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold link-draw pb-0.5"
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
