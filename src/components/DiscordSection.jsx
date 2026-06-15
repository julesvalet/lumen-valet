import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { DiscordIcon } from "./Icons";

export default function DiscordSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scrollBig = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const scrollSmall = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 26, stiffness: 140, mass: 0.6 });
  const springY = useSpring(mouseY, { damping: 26, stiffness: 140, mass: 0.6 });

  const bigX = useTransform(springX, (v) => v * 0.6);
  const bigY = useTransform([springY, scrollBig], ([m, s]) => m * 0.6 + s);

  const smallX = useTransform(springX, (v) => v * -1.1);
  const smallY = useTransform([springY, scrollSmall], ([m, s]) => m * -1.1 + s);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 60);
      mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 60);
    };

    const onMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-t border-white/10 px-6 py-28 md:px-12 md:py-40">
      <div className="flex flex-col gap-16 md:gap-24">
        <motion.div style={{ x: bigX, y: bigY }} className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mb-6 block font-display text-xs uppercase tracking-[0.4em] text-haze">
              Communauté
            </span>
            <h2 className="font-display text-[clamp(2.8rem,10vw,8rem)] font-medium leading-[0.95] tracking-tight text-paper">
              et c'est pas tout&nbsp;!
            </h2>
          </motion.div>
        </motion.div>

        <motion.div style={{ x: smallX, y: smallY }} className="flex self-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-6 text-left md:items-end md:text-right"
          >
            <p className="font-display text-xl text-paper md:text-2xl">
              découvrez notre serveur discord&nbsp;!
            </p>
            <a
              href="https://discord.gg/JcCT4khfEZ"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="group inline-flex items-center gap-3 rounded-full border border-paper/20 px-8 py-3 font-display text-xs uppercase tracking-[0.25em] text-paper transition-all duration-300 hover:border-acid hover:text-acid"
            >
              <DiscordIcon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Rejoindre
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
