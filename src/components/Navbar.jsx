import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { logoMark } from "../data/assets";

const links = [
  { href: "#projets", label: "Projets" },
  { href: "#identite", label: "Identité" },
  { href: "#logos", label: "Logos" },
  { href: "#portraits", label: "Portraits" },
  { href: "#apropos", label: "Studio" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ docked = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-all duration-500 md:top-6 md:px-8">
      <div
        className={`relative flex w-full max-w-[1400px] items-center justify-between gap-6 rounded-full border border-white/20 px-5 py-3 backdrop-blur transition-all duration-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] md:px-8 md:py-4 ${
          scrolled ? "bg-noir/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_32px_rgba(0,0,0,0.35)]" : "bg-noir/25"
        }`}
      >
        <a href="#top" data-cursor className="flex items-center gap-3">
          <img src={logoMark} alt="" className="h-6 w-auto object-contain md:h-8" />
          {docked ? (
            <motion.h1
              layoutId="hero-title"
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="whitespace-nowrap font-display text-lg font-black uppercase tracking-[0.2em] text-paper md:text-xl"
            >
              Lumen — Valet
            </motion.h1>
          ) : (
            <span
              aria-hidden="true"
              className="whitespace-nowrap font-display text-lg font-black uppercase tracking-[0.2em] text-paper opacity-0 md:text-xl"
            >
              Lumen — Valet
            </span>
          )}
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor
              className="font-display text-xs uppercase tracking-[0.25em] text-haze transition-colors duration-300 hover:text-acid"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="mailto:designlumenvalet@gmail.com"
          data-cursor
          className="hidden rounded-full border border-paper/20 px-6 py-2 font-display text-xs uppercase tracking-[0.25em] text-paper transition-all duration-300 hover:border-acid hover:text-acid md:inline-flex"
        >
          Démarrer un projet
        </a>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span
            className={`block h-px w-6 bg-paper transition-transform duration-300 ${
              menuOpen ? "translate-y-1 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-paper transition-transform duration-300 ${
              menuOpen ? "-translate-y-1 -rotate-45" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-full mt-3 overflow-hidden rounded-3xl border border-white/20 bg-noir/80 backdrop-blur shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] md:hidden"
            >
              <div className="flex flex-col gap-6 px-6 py-6">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-2xl uppercase tracking-wide text-paper transition-colors duration-300 hover:text-acid"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="mailto:designlumenvalet@gmail.com"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 inline-flex w-fit rounded-full border border-paper/20 px-6 py-2 font-display text-xs uppercase tracking-[0.25em] text-paper transition-all duration-300 hover:border-acid hover:text-acid"
                >
                  Démarrer un projet
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
