"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reader from "./Reader";
import { articles, ArticleData } from "@/data/articles";
import { EASE, FileHead, Reveal } from "./shared";

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
      className={`group border-b border-paper/20 ${
        readable ? "cursor-pointer" : ""
      }`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: 0.04 + i * 0.06, ease: EASE }}
      onClick={() => readable && onRead(row.articleId!)}
    >
      <div className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-[64px_1fr_auto] gap-4 md:gap-8 items-center relative">
        <span className="hidden md:block font-display text-[30px] leading-none text-paper/25 group-hover:text-red transition-colors duration-300">
          {String(i + 1).padStart(2, "0")}
        </span>

        <div>
          <h3
            className={`font-display uppercase leading-[1.02] tracking-[0.01em] mb-3 transition-colors duration-300 ${
              readable
                ? "text-paper group-hover:text-red"
                : "text-paper/35"
            }`}
            style={{ fontSize: "clamp(1.45rem, 3vw, 2.4rem)" }}
          >
            {row.title}
          </h3>
          <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-paper/45">
            {row.meta}
            {rt && <span className="text-red"> · {rt}</span>}
          </p>
        </div>

        <div className="md:text-right">
          {readable ? (
            <span className="inline-flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-paper border-2 border-paper/40 px-4 py-2.5 group-hover:bg-red group-hover:border-red group-hover:text-ink transition-all duration-300">
              Read
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-paper/40 border border-dashed border-paper/30 px-3 py-2">
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
        className="relative px-5 md:px-10 py-20 md:py-28 bg-ink text-paper"
      >
        <div className="max-w-[1280px] mx-auto">
          <FileHead
            dark
            file="05"
            label="Writing & Content"
            title={
              <>
                The reading <span className="text-red">room.</span>
              </>
            }
            lede="Opinionated long-form writing on product strategy, manufacturing, and capital allocation. Not sponsored content."
          />

          <Reveal y={10}>
            <div className="flex items-center gap-4 mb-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-red whitespace-nowrap">
                Product Breakdowns &amp; Essays
              </span>
              <div className="flex-1 h-px bg-paper/25" />
            </div>
          </Reveal>
          {productEssays.map((row, i) => (
            <EssayRow key={row.title} row={row} i={i} onRead={openArticle} />
          ))}

          <Reveal y={10} className="mt-16">
            <div className="flex items-center gap-4 mb-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-red whitespace-nowrap">
                Investment Essays
              </span>
              <div className="flex-1 h-px bg-paper/25" />
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
