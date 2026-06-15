import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contact" className="border-t border-white/10 px-6 py-28 md:px-12 md:py-40">
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
    </section>
  );
}
