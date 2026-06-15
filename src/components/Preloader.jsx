import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate as animateValue } from "framer-motion";

const GLOW_DURATION = 2.2;
const HOLD_DURATION = 0.3;
const EXIT_DURATION = 1.2;

export default function Preloader({ onDone }) {
  const [phase, setPhase] = useState("glow"); // glow -> done
  const progress = useMotionValue(0);

  const opacity = useTransform(progress, [0, 100], [0, 1]);
  const textShadow = useTransform(
    progress,
    [0, 100],
    [
      "0 0 0px rgba(255, 255, 255, 0), 0 0 0px rgba(255, 255, 255, 0), 0 0 0px rgba(255, 255, 255, 0)",
      "0 0 10px #fff, 0 0 20px #fff, 0 0 40px #fff",
    ]
  );

  useEffect(() => {
    const controls = animateValue(progress, 100, {
      duration: GLOW_DURATION,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        setTimeout(() => setPhase("done"), HOLD_DURATION * 1000);
      },
    });
    return () => controls.stop();
  }, [progress]);

  useEffect(() => {
    if (phase === "done") onDone();
  }, [phase, onDone]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-noir"
            exit={{ opacity: 0 }}
            transition={{ duration: EXIT_DURATION, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center"
            exit={{ opacity: 1 }}
            transition={{ duration: EXIT_DURATION, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              layoutId="hero-title"
              transition={{ duration: EXIT_DURATION, ease: [0.16, 1, 0.3, 1] }}
              style={{ opacity, textShadow, color: "#fff" }}
              className="px-6 text-center font-display font-black uppercase leading-none tracking-tight text-[clamp(3.5rem,13vw,12rem)]"
            >
              Lumen — Valet
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
