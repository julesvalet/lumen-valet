import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const DURATION = 3000;
const SIZE = 40;
const STROKE = 1.5;
const RADIUS = SIZE / 2 - STROKE;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(-RADIUS);
  const followX = useSpring(targetX, { damping: 10, stiffness: 90, mass: 0.7 });
  const followY = useSpring(targetY, { damping: 10, stiffness: 90, mass: 0.7 });

  useEffect(() => {
    let raf;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / DURATION) * 100);
      setProgress(pct);

      const angle = (pct / 100) * 2 * Math.PI - Math.PI / 2;
      targetX.set(Math.cos(angle) * RADIUS);
      targetY.set(Math.sin(angle) * RADIUS);

      if (elapsed < DURATION) {
        raf = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        setTimeout(onDone, 700);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone, targetX, targetY]);

  const dashOffset = CIRCUMFERENCE * (1 - progress / 100);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-noir"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative flex items-center justify-center" style={{ width: SIZE, height: SIZE }}>
            <svg width={SIZE} height={SIZE} className="-rotate-90">
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke="rgba(245, 243, 238, 0.15)"
                strokeWidth={STROKE}
              />
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke="#f5f3ee"
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
              />
            </svg>

            {/* Magnetic follower — chases the progress point with inertia */}
            <motion.span
              className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-acid"
              style={{ x: followX, y: followY, translateX: "-50%", translateY: "-50%" }}
            />

            <span className="absolute font-display text-[10px] uppercase tracking-[0.3em] text-haze">
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
