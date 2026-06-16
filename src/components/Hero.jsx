import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const titleLines = ["Direction", "Artistique", "& Identité"];

export default function Hero() {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const target = { x: 50, y: 50 };
    const current = { x: 50, y: 50 };
    let frame;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width) * 100;
      target.y = ((e.clientY - rect.top) / rect.height) * 100;
    };

    const animate = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      el.style.setProperty("--shine-x", `${current.x}%`);
      el.style.setProperty("--shine-y", `${current.y}%`);
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-12 pt-32 md:px-12">
      <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <filter id="liquid-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.018"
            numOctaves="2"
            seed="3"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className="flex flex-1 flex-col justify-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 font-display text-xs uppercase tracking-[0.4em] text-haze"
        >
          Lumen Valet — Studio Créatif · Édition 2026
        </motion.span>

        <h1 ref={titleRef} className="liquid-text font-display font-medium leading-[0.92] tracking-tight text-paper">
          {titleLines.map((line, i) => (
            <motion.span
              key={line}
              data-text={line}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`shiny-text block text-[clamp(2.8rem,11vw,9rem)] ${
                i === titleLines.length - 1 ? "text-acid" : ""
              }`}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-8 max-w-md text-sm leading-relaxed text-haze md:text-base"
        >
          Branding, design graphique et photographie au service de marques
          qui veulent marquer leur époque. Du logo à la campagne complète,
          chaque détail est pensé pour durer.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="flex flex-wrap items-end justify-between gap-8 border-t border-white/10 pt-6"
      >
        <div className="flex gap-12">
          <div>
            <p className="font-display text-3xl text-paper">40+</p>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-haze">Projets livrés</p>
          </div>
          <div>
            <p className="font-display text-3xl text-paper">12</p>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-haze">Identités créées</p>
          </div>
        </div>

        <a
          href="#projets"
          data-cursor
          className="group flex items-center gap-3 font-display text-xs uppercase tracking-[0.3em] text-paper"
        >
          Découvrir le travail
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 transition-all duration-300 group-hover:translate-y-1 group-hover:border-acid group-hover:text-acid">
            ↓
          </span>
        </a>
      </motion.div>
    </section>
  );
}
