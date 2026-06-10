"use client";

import { View } from "@/types";

const navItems: { num: string; label: string; view: View }[] = [
  { num: "01", label: "Home", view: "home" },
  { num: "02", label: "Ventures", view: "ventures" },
  { num: "03", label: "Projects", view: "projects" },
  { num: "04", label: "Writing", view: "writing" },
  { num: "05", label: "Now", view: "now" },
  { num: "06", label: "Connect", view: "connect" },
];

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-[200px] bg-[var(--surface)] border-r border-[var(--border)] z-40">
      {/* Logo */}
      <div className="px-6 pt-7 pb-5 border-b border-[var(--border)]">
        <p className="font-serif text-[20px] text-[var(--text)] leading-tight">
          Apurv / Patil
        </p>
        <p className="text-[9px] uppercase tracking-[2px] text-[var(--text3)] mt-1.5">
          Product · Finance · Manufacturing
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3">
        {navItems.map((item) => {
          const isActive = activeView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => setActiveView(item.view)}
              className={`w-full text-left px-5 py-2.5 flex items-center gap-3 transition-all duration-150 border-l-2 ${
                isActive
                  ? "border-[var(--gold)] bg-[rgba(200,169,106,0.05)] text-[var(--gold)]"
                  : "border-transparent text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--surface2)]"
              }`}
            >
              <span className="text-[10px] opacity-50">{item.num}</span>
              <span className="text-[11px] uppercase tracking-[1.5px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Social links — LinkedIn + YouTube only */}
      <div className="px-6 pb-7 pt-4 border-t border-[var(--border)] flex flex-col gap-2.5">
        <a
          href="https://www.linkedin.com/in/apurv-patil/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-widest text-[var(--text3)] hover:text-[var(--text2)] transition-colors"
        >
          LinkedIn ↗
        </a>
        <a
          href="https://www.youtube.com/@TheMechanicsofReality"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-widest text-[var(--text3)] hover:text-[var(--text2)] transition-colors"
        >
          YouTube ↗
        </a>
      </div>
    </aside>
  );
}
