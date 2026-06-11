"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reader from "./Reader";
import { articles, ArticleData } from "@/data/articles";
import { Reveal, SectionLabel } from "./shared";

interface Cover {
  title: string;
  meta: string;
  cta: "read" | "soon";
  articleId?: string;
  hue: number;
}

const productEssays: Cover[] = [
  {
    title: "Who They Think You Are: Zerodha vs Groww — A Product Teardown",
    meta: "Product Analysis · Fintech · 2025",
    cta: "read",
    articleId: "zerodha-groww",
    hue: 255,
  },
  {
    title: "Linear vs Notion — Two Philosophies of Work, One Winner Per Context",
    meta: "Product Comparison · Productivity · 2026",
    cta: "read",
    articleId: "linear-vs-notion",
    hue: 200,
  },
  {
    title: "CRED and the Patience Myth — What a Credit Card App Got Right",
    meta: "Product Analysis · Fintech · 2025",
    cta: "read",
    articleId: "cred-strategy",
    hue: 320,
  },
];

const investmentEssays: Cover[] = [
  {
    title: "Boring Businesses with Technology: An Investment Thesis",
    meta: "Essay · Private Equity Framework · 2026",
    cta: "read",
    articleId: "boring-businesses",
    hue: 150,
  },
  {
    title: "Why Indian Precision Manufacturing is Systematically Mispriced",
    meta: "Essay · In Progress",
    cta: "soon",
    hue: 30,
  },
];

function readTimeFor(id?: string) {
  if (!id) return null;
  return articles.find((a) => a.id === id)?.readTime ?? null;
}

/* 3D tilt cover card */
function CoverCard({
  cover,
  index,
  onRead,
}: {
  cover: Cover;
  index: number;
  onRead: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 200,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), {
    stiffness: 200,
    damping: 22,
  });
  const readable = cover.cta === "read" && cover.articleId;
  const rt = readTimeFor(cover.articleId);

  function onMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }
  function reset() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <Reveal delay={index * 0.06} className="h-full">
      <div style={{ perspective: 1100 }} className="h-full">
        <motion.div
          ref={ref}
          onMouseMove={readable ? onMove : undefined}
          onMouseLeave={reset}
          onClick={() => readable && onRead(cover.articleId!)}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={`group relative h-full min-h-[300px] md:min-h-[360px] rounded-3xl overflow-hidden border flex flex-col justify-between p-7 md:p-9 transition-shadow duration-500 ${
            readable
              ? "cursor-pointer border-linedark2 bg-bone2 hover:shadow-[0_40px_80px_-30px_rgba(7,6,11,0.35)]"
              : "border-dashed border-linedark2 bg-transparent"
          }`}
          data-cursor-label={readable ? "READ" : undefined}
        >
          {/* Tint wash */}
          {readable && (
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: `radial-gradient(120% 90% at 20% 0%, hsl(${cover.hue} 65% 82% / 0.55) 0%, transparent 60%)`,
              }}
            />
          )}

          {/* Giant numeral */}
          <span
            aria-hidden="true"
            className="absolute -right-3 -bottom-7 font-display font-extrabold text-outline-bone leading-none select-none pointer-events-none text-[clamp(6rem,11vw,10rem)]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="relative">
            <div className="flex items-center justify-between mb-7">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-void/55">
                {cover.meta}
              </span>
              {rt && (
                <span
                  className="font-mono text-[9px] tracking-[0.15em] px-2.5 py-1 rounded-full"
                  style={{
                    background: `hsl(${cover.hue} 60% 50% / 0.14)`,
                    color: `hsl(${cover.hue} 75% 32%)`,
                  }}
                >
                  {rt}
                </span>
              )}
            </div>
            <h3
              className={`font-display font-extrabold leading-[1.04] tracking-[-0.025em] text-[clamp(1.5rem,2.6vw,2.2rem)] ${
                readable ? "text-void" : "text-void/40"
              }`}
            >
              {cover.title}
            </h3>
          </div>

          <div className="relative flex items-center justify-between mt-8">
            {readable ? (
              <span className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-void font-semibold">
                Read essay
                <span className="inline-flex w-8 h-8 items-center justify-center rounded-full border border-linedark2 transition-all duration-400 group-hover:bg-void group-hover:text-bone group-hover:translate-x-1">
                  →
                </span>
              </span>
            ) : (
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-void/45 border border-dashed border-linedark2 rounded-full px-4 py-2">
                In progress
              </span>
            )}
            <span className="font-mono text-[9px] tracking-[0.2em] text-void/35 uppercase">
              By Apurv Patil
            </span>
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

export default function Writing() {
  const [activeArticle, setActiveArticle] = useState<ArticleData | null>(null);

  function openArticle(id: string) {
    const found = articles.find((a) => a.id === id);
    if (found) setActiveArticle(found);
  }

  const covers = [...productEssays, ...investmentEssays];

  return (
    <>
      <section
        id="writing"
        className="relative px-6 md:px-14 lg:px-24 py-28 md:py-40 bg-bone text-void rounded-t-[40px] md:rounded-t-[64px]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel num="005" text="Writing & Content" light className="mb-5" />
          <Reveal>
            <h2 className="font-display font-extrabold tracking-[-0.03em] leading-none text-void text-[clamp(2.4rem,6vw,4.6rem)] mb-4">
              The reading room<span className="text-violet">.</span>
            </h2>
            <p className="text-[15.5px] text-void/65 max-w-[600px] leading-[1.75] mb-16">
              Opinionated long-form writing on product strategy, manufacturing,
              and capital allocation. Not sponsored content.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 auto-rows-fr">
            {covers.map((c, i) => (
              <CoverCard key={c.title} cover={c} index={i} onRead={openArticle} />
            ))}
          </div>
        </div>
      </section>

      <Reader article={activeArticle} onClose={() => setActiveArticle(null)} />
    </>
  );
}
