import { motion } from "framer-motion";

export default function SectionHeading({ index, label, title, align = "left" }) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "right" ? "items-end text-right" : "items-start text-left"
      }`}
    >
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.35em] text-haze"
      >
        <span className="text-acid">{index}</span>
        {label}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-tight text-paper"
      >
        {title}
      </motion.h2>
    </div>
  );
}
