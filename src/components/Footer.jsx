import { motion } from "framer-motion";
import { InstagramIcon } from "./Icons";

export default function Footer() {
  return (
    <footer id="contact" className="px-6 pb-10 pt-28 md:px-12 md:pt-40">
      <div className="flex flex-col gap-10 border-t border-white/10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <span className="font-display text-xs uppercase tracking-[0.4em] text-haze">
            06 — Contact
          </span>
          <a
            href="mailto:designlumenvalet@gmail.com"
            data-cursor
            className="group inline-block font-display text-[clamp(2.5rem,9vw,7rem)] font-medium leading-[0.95] tracking-tight text-paper transition-colors duration-500 hover:text-acid"
          >
            Travaillons
            <br />
            ensemble
            <span className="ml-4 inline-block transition-transform duration-500 group-hover:translate-x-3 group-hover:-translate-y-3">
              ↗
            </span>
          </a>
        </motion.div>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.25em] text-haze">Email</p>
            <a
              href="mailto:designlumenvalet@gmail.com"
              data-cursor
              className="text-sm text-paper hover:text-acid"
            >
              designlumenvalet@gmail.com
            </a>
          </div>

          <a
            href="https://www.instagram.com/lumen.design.fr/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="group flex items-center gap-3 font-display text-xs uppercase tracking-[0.25em] text-haze transition-colors duration-300 hover:text-acid"
          >
            <InstagramIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            Instagram
          </a>

          <p className="text-xs uppercase tracking-[0.25em] text-haze">
            © {new Date().getFullYear()} Lumen Valet — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
