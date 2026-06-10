"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reader from "./Reader";
import { articles, ArticleData } from "@/data/articles";
import { EASE, Reveal, SectionHead } from "./shared";

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

function readTimeFor(id?: string) {
  if (!id) return null;
  return articles.find((a) => a.id === id)?.readTime ?? null;
}

function EssayRow({
  row,
  i,
  onRead,
}: {
  row: WritingRow;
  i: number;
  onRead: (id: string) => void;
}) {
  const readable = row.cta === "read" && row.articleId;
  const rt = readTimeFor(row.articleId);

  return (
    <motion.div
      className={`group border-b border-border ${
        readable ? "cursor-pointer" : ""
      }`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: 0.04 + i * 0.06, ease: EASE }}
      onClick={() => readable && onRead(row.articleId!)}
    >
      <div className="py-9 md:py-10 grid grid-cols-1 md:grid-cols-[56px_1fr_auto] gap-4 md:gap-8 items-baseline relative">
        {/* Hover sheen */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(201,169,110,0.04)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <span className="hidden md:block font-serif italic text-[20px] text-text3">
          {String(i + 1).padStart(2, "0")}
        </span>

        <div>
          <h3
            className={`font-serif leading-[1.15] tracking-[-0.01em] mb-3 transition-colors duration-300 ${
              readable
                ? "text-text group-hover:text-gold"
                : "text-text3"
            }`}
            style={{ fontSize: "clamp(1.35rem, 2.6vw, 1.9rem)" }}
          >
            {row.title}
          </h3>
          <p className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-text3">
            {row.meta}
            {rt && <span className="text-gold2"> · {rt}</span>}
          </p>
        </div>

        <div className="md:text-right">
          {readable ? (
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
              Read
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </span>
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text3 border border-border2 px-2.5 py-1">
              Soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Writing() {
  const [activeArticle, setActiveArticle] = useState<ArticleData | null>(null);

  function openArticle(id: string) {
    const found = articles.find((a) => a.id === id);
    if (found) setActiveArticle(found);
  }

  return (
    <>
      <section
        id="writing"
        className="relative px-6 md:px-14 lg:px-24 xl:px-32 py-24 md:py-36 bg-surface border-y border-border"
      >
        <div className="max-w-[1100px] mx-auto">
          <SectionHead
            num="05"
            label="Writing & Content"
            title={
              <>
                Essays &amp; <em className="italic text-gold">teardowns.</em>
              </>
            }
            lede="Opinionated long-form writing on product strategy, manufacturing, and capital allocation. Not sponsored content."
          />

          <Reveal y={10}>
            <div className="flex items-center gap-4 mb-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold whitespace-nowrap">
                Product Breakdowns &amp; Essays
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
          </Reveal>
          {productEssays.map((row, i) => (
            <EssayRow key={row.title} row={row} i={i} onRead={openArticle} />
          ))}

          <Reveal y={10} className="mt-16">
            <div className="flex items-center gap-4 mb-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold whitespace-nowrap">
                Investment Essays
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
          </Reveal>
          {investmentEssays.map((row, i) => (
            <EssayRow
              key={row.title}
              row={row}
              i={i + productEssays.length}
              onRead={openArticle}
            />
          ))}
        </div>
      </section>

      <Reader article={activeArticle} onClose={() => setActiveArticle(null)} />
    </>
  );
}
