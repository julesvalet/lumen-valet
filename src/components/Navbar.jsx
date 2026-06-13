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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-noir/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 md:px-10">
        <a
          href="#top"
          data-cursor
          className="flex items-center gap-3 font-display text-lg font-semibold uppercase tracking-[0.2em] text-paper"
        >
          <img src={logoMark} alt="" className="h-6 w-6 object-contain md:h-8 md:w-8" />
          <span>
            Lumen <span className="text-acid">Valet</span>
          </span>
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
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-noir md:hidden"
          >
            <div className="flex flex-col gap-6 px-6 pb-8 pt-2">
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
    </header>
  );
}
