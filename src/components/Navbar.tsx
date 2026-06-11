"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Writing", href: "#writing", id: "writing" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const borderColor = useTransform(
    scrollY,
    [0, 80],
    ["rgba(26,26,26,0)", "rgba(26,26,26,1)"]
  );
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.85]);

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.25, rootMargin: "-15% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Blurred bg on scroll */}
      <motion.div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ opacity: bgOpacity, backgroundColor: "rgba(9,9,9,0.85)" }}
      />

      <motion.div
        className="relative flex items-center justify-between py-5 border-b"
        style={{ borderColor }}
      >
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.2em] text-primary uppercase hover:text-accent transition-colors duration-200"
        >
          AP
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[11px] uppercase tracking-[0.3em] transition-colors duration-200 group"
                style={{ color: isActive ? "#eeebe4" : "#3a3a3a" }}
              >
                {link.label}
                {/* Active indicator dot */}
                <motion.span
                  className="absolute -bottom-[18px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-accent"
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile — email shortcut */}
        <a
          href="mailto:apurv@example.com"
          className="md:hidden text-[11px] uppercase tracking-[0.2em] text-muted hover:text-primary transition-colors"
        >
          Email
        </a>
      </motion.div>
    </motion.header>
  );
}
