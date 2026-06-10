"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArticleData } from "@/data/articles";

interface ArticleModalProps {
  article: ArticleData | null;
  onClose: () => void;
}

function renderContent(block: ArticleData["content"][0], i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={i}
          className="font-serif text-[22px] text-[var(--text)] mt-8 mb-3 leading-snug"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={i}
          className="font-serif text-[16px] text-[var(--gold)] mt-6 mb-2 uppercase tracking-wide"
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p
          key={i}
          className="text-[13.5px] text-[var(--text2)] leading-[1.85] mb-4"
        >
          {block.text}
        </p>
      );
    case "bold-p":
      return (
        <p
          key={i}
          className="text-[13.5px] text-[var(--text2)] leading-[1.85] mb-3"
        >
          <strong className="text-[var(--text)] font-medium">{block.label}</strong>{" "}
          {block.text}
        </p>
      );
    case "note":
      return (
        <div
          key={i}
          className="border-l-2 border-[var(--border2)] pl-4 py-1 my-4 bg-[var(--surface2)]"
        >
          <p className="text-[12px] text-[var(--text3)] leading-relaxed">
            {block.text}
          </p>
        </div>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="border-l-2 border-[var(--gold)] pl-4 py-1 my-5"
        >
          <p className="text-[14px] text-[var(--text2)] italic leading-relaxed mb-1">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <p className="text-[11px] text-[var(--text3)]">
              — {block.attribution}
            </p>
          )}
        </blockquote>
      );
    case "exhibit":
      return (
        <div
          key={i}
          className="my-5 border border-[var(--border)] p-4 bg-[var(--surface)]"
        >
          <p className="text-[10px] uppercase tracking-[2px] text-[var(--gold)] mb-2">
            {block.label}
          </p>
          <p className="text-[12px] text-[var(--text2)] leading-relaxed italic">
            {block.caption}
          </p>
        </div>
      );
    case "table":
      return (
        <div key={i} className="my-5 overflow-x-auto">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="border-b border-[var(--border2)]">
                {block.headers.map((h, j) => (
                  <th
                    key={j}
                    className="text-left py-2 px-3 text-[10px] uppercase tracking-[1.5px] text-[var(--text3)] font-normal"
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
                  className="border-b border-[var(--border)] hover:bg-[var(--surface2)] transition-colors"
                >
                  {row.map((cell, k) => (
                    <td
                      key={k}
                      className={`py-2.5 px-3 leading-snug text-[var(--text2)] ${
                        k === 0 ? "text-[var(--text3)]" : ""
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
        <ul key={i} className="my-4 space-y-2">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-3 text-[13.5px] text-[var(--text2)] leading-[1.75]">
              <span className="text-[var(--gold)] mt-0.5 flex-shrink-0">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "verdict":
      return (
        <div
          key={i}
          className="my-5 border border-[var(--gold)] border-opacity-30 p-4 bg-[rgba(200,169,106,0.04)]"
        >
          <p className="text-[10px] uppercase tracking-[2px] text-[var(--gold)] mb-2">
            {block.label}
          </p>
          <p className="text-[13px] text-[var(--text2)] leading-relaxed">
            {block.text}
          </p>
        </div>
      );
    case "divider":
      return <hr key={i} className="border-[var(--border)] my-6" />;
    default:
      return null;
  }
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (article) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [article]);

  return (
    <AnimatePresence>
      {article && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-[720px] bg-[var(--surface)] border-l border-[var(--border)] overflow-hidden flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-8 pt-7 pb-5 border-b border-[var(--border)] flex-shrink-0">
              <div className="pr-8">
                <p className="text-[10px] uppercase tracking-[2px] text-[var(--text3)] mb-2">
                  {article.meta} · {article.readTime}
                </p>
                <h1 className="font-serif text-[24px] text-[var(--text)] leading-snug">
                  {article.title}
                </h1>
                <p className="text-[13px] text-[var(--text2)] mt-1 leading-snug">
                  {article.subtitle}
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[var(--text3)] hover:text-[var(--text)] transition-colors border border-[var(--border)] hover:border-[var(--border2)]"
                aria-label="Close article"
              >
                ✕
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-8 py-7">
              {article.content.map((block, i) => renderContent(block, i))}

              <div className="mt-12 pt-5 border-t border-[var(--border)]">
                <p className="text-[11px] text-[var(--text3)]">
                  All views are personal opinion. Not investment advice.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
