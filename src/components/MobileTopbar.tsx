"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { View } from "@/types";

const navItems: { num: string; label: string; view: View }[] = [
  { num: "01", label: "Home", view: "home" },
  { num: "02", label: "Ventures", view: "ventures" },
  { num: "03", label: "Projects", view: "projects" },
  { num: "04", label: "Writing", view: "writing" },
  { num: "05", label: "Now", view: "now" },
  { num: "06", label: "Connect", view: "connect" },
];

interface MobileTopbarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

export default function MobileTopbar({
  activeView,
  setActiveView,
}: MobileTopbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  function navigate(view: View) {
    setActiveView(view);
    setIsOpen(false);
  }

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50" ref={containerRef}>
      {/* Topbar */}
      <div className="h-[52px] bg-[var(--surface)] border-b border-[var(--border)] flex items-center justify-between px-5">
        <span className="font-serif text-[17px] text-[var(--text)]">
          Apurv Patil
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-[5px] p-1 -mr-1"
          aria-label="Toggle navigation menu"
        >
          <span className="block w-[20px] h-px bg-[var(--text2)]" />
          <span className="block w-[20px] h-px bg-[var(--text2)]" />
          <span className="block w-[20px] h-px bg-[var(--text2)]" />
        </button>
      </div>

      {/* Dropdown drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.14 }}
            className="w-full bg-[var(--surface)] border-b border-[var(--border)] shadow-lg"
          >
            {navItems.map((item) => {
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => navigate(item.view)}
                  className={`w-full text-left px-5 py-3.5 flex items-center gap-3 border-l-2 transition-colors ${
                    isActive
                      ? "border-[var(--gold)] text-[var(--gold)] bg-[rgba(200,169,106,0.05)]"
                      : "border-transparent text-[var(--text2)]"
                  }`}
                >
                  <span className="text-[10px] opacity-50">{item.num}</span>
                  <span className="text-[11px] uppercase tracking-[1.5px]">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
