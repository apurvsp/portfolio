"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ArticleModal from "@/components/ArticleModal";
import { articles, ArticleData } from "@/data/articles";

interface WritingRow {
  title: string;
  meta: string;
  cta: "read" | "soon";
  articleId?: string;
}

const productEssays: WritingRow[] = [
  {
    title: "Who They Think You Are: Zerodha vs Groww — A Product Teardown",
    meta: "Product Analysis · Fintech · 2025",
    cta: "read",
    articleId: "zerodha-groww",
  },
  {
    title: "Linear vs Notion — Two Philosophies of Work, One Winner Per Context",
    meta: "Product Comparison · Productivity · 2026",
    cta: "read",
    articleId: "linear-vs-notion",
  },
  {
    title: "CRED and the Patience Myth — What a Credit Card App Got Right",
    meta: "Product Analysis · Fintech · 2025",
    cta: "read",
    articleId: "cred-strategy",
  },
];

const investmentEssays: WritingRow[] = [
  {
    title: "Boring Businesses with Technology: An Investment Thesis",
    meta: "Essay · Private Equity Framework · 2026",
    cta: "read",
    articleId: "boring-businesses",
  },
  {
    title: "Why Indian Precision Manufacturing is Systematically Mispriced",
    meta: "Essay · In Progress",
    cta: "soon",
  },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function WritingRow({
  row,
  i,
  onRead,
}: {
  row: WritingRow;
  i: number;
  onRead: (id: string) => void;
}) {
  return (
    <motion.div
      className="grid grid-cols-[1fr_72px] border-b border-[var(--border)] py-4 gap-4 items-start group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 + i * 0.07, ease }}
    >
      <div>
        <p
          className={`font-serif text-[16px] leading-snug mb-1.5 transition-colors duration-150 ${
            row.cta === "read"
              ? "text-[var(--text)] group-hover:text-[var(--gold)] cursor-pointer"
              : "text-[var(--text2)]"
          }`}
          onClick={() => row.articleId && onRead(row.articleId)}
        >
          {row.title}
        </p>
        <p className="text-[10px] text-[var(--text3)] tracking-wide">
          {row.meta}
        </p>
      </div>
      <div className="flex justify-end pt-0.5">
        {row.cta === "read" && row.articleId ? (
          <button
            onClick={() => onRead(row.articleId!)}
            className="text-[11px] text-[var(--gold)] hover:text-[var(--gold2)] transition-colors duration-150 whitespace-nowrap"
          >
            Read →
          </button>
        ) : (
          <span className="text-[11px] text-[var(--text3)] whitespace-nowrap">
            Soon
          </span>
        )}
      </div>
    </motion.div>
  );
}

function GroupLabel({ label, offset }: { label: string; offset: number }) {
  return (
    <motion.div
      className="flex items-center gap-4 py-3 mb-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: offset, ease }}
    >
      <span className="text-[9px] uppercase tracking-[2px] text-[var(--text3)] whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-[var(--border)]" />
    </motion.div>
  );
}

export default function WritingView() {
  const [activeArticle, setActiveArticle] = useState<ArticleData | null>(null);

  function openArticle(id: string) {
    const found = articles.find((a) => a.id === id);
    if (found) setActiveArticle(found);
  }

  return (
    <>
      <div className="px-8 md:px-12 lg:px-16 py-14 max-w-3xl">
        {/* Section header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[var(--gold)] text-[10px] tracking-wider">04</span>
            <div className="w-6 h-px bg-[var(--border2)]" />
            <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--text3)]">
              Writing & Content
            </span>
          </div>
          <h2 className="font-serif text-[28px] md:text-[34px] text-[var(--text)] leading-tight mb-3">
            Thinking
          </h2>
          <p className="text-[13px] text-[var(--text2)] max-w-[420px] leading-relaxed">
            Opinionated long-form writing on product strategy, manufacturing, and
            capital allocation. Not sponsored content.
          </p>
        </motion.div>

        {/* Group 1 */}
        <GroupLabel label="Product Breakdowns & Essays" offset={0.1} />
        {productEssays.map((row, i) => (
          <WritingRow key={row.title} row={row} i={i} onRead={openArticle} />
        ))}

        {/* Group 2 */}
        <div className="mt-8">
          <GroupLabel label="Investment Essays" offset={0.18} />
          {investmentEssays.map((row, i) => (
            <WritingRow
              key={row.title}
              row={row}
              i={i + productEssays.length}
              onRead={openArticle}
            />
          ))}
        </div>
      </div>

      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />
    </>
  );
}
