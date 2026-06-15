import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroTrail } from "../data/assets";
import { useCursorPosition } from "../context/CursorContext";

const TRAIL_MIN_DISTANCE = 120; // espacement de spawn : plus haut = traînée aérée, "poussière lumineuse"
const TRAIL_LIFETIME = 0.8; // durée de vie totale d'une image (s) — source unique du cycle
const ENTER_DURATION = TRAIL_LIFETIME * 0.4; // éclosion douce (inspiration) — 40% du cycle -> 0.32s
const EXIT_DURATION = TRAIL_LIFETIME * 0.6; // évaporation lente (expiration) — 60% du cycle -> 0.48s
const BREATH = [0.37, 0, 0.63, 1]; // easeInOutSine — même courbe aller/retour = respiration

const centerTransform = (_, generated) => `translate(-50%, -50%) ${generated}`;

export default function HeroIntro({ active = true, docked = false }) {
  const sectionRef = useRef(null);
  const lastPointRef = useRef(null);
  const trailIdRef = useRef(0);
  const lastSrcIndexRef = useRef(-1);
  const [trail, setTrail] = useState([]);
  const { springX, springY } = useCursorPosition();

  useEffect(() => {
    if (!active) return undefined;

    let frameId;

    const tick = () => {
      const section = sectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const cx = springX.get();
        const cy = springY.get();
        const inBounds = cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom;

        if (inBounds) {
          const x = cx - rect.left;
          const y = cy - rect.top;
          const last = lastPointRef.current;
          const dist = last ? Math.hypot(x - last.x, y - last.y) : Infinity;

          if (dist >= TRAIL_MIN_DISTANCE) {
            lastPointRef.current = { x, y };

            const id = trailIdRef.current++;
            // décalage d'origine : l'image naît au point précédent puis sera "tractée" vers son ancre
            const ox = last ? last.x - x : 0;
            const oy = last ? last.y - y : 0;
            let srcIndex = Math.floor(Math.random() * heroTrail.length);
            if (heroTrail.length > 1) {
              while (srcIndex === lastSrcIndexRef.current) {
                srcIndex = Math.floor(Math.random() * heroTrail.length);
              }
            }
            lastSrcIndexRef.current = srcIndex;

            setTrail((prev) => [...prev, { id, src: heroTrail[srcIndex], x, y, ox, oy }]);
            // fin de l'inspiration -> on retire l'item, AnimatePresence enchaîne l'expiration (exit)
            window.setTimeout(() => setTrail((prev) => prev.filter((it) => it.id !== id)), ENTER_DURATION * 1000);
          }
        } else {
          lastPointRef.current = null;
        }
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, springX, springY]);

  return (
    <section ref={sectionRef} id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {active && !docked && (
        <motion.h1
          layoutId="hero-title"
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 px-6 text-center font-display font-black uppercase leading-none tracking-tight text-paper text-[clamp(3.5rem,13vw,12rem)]"
        >
          Lumen — Valet
        </motion.h1>
      )}

      <div className="pointer-events-none absolute inset-0 z-30">
        <AnimatePresence>
          {trail.map((item) => (
            <motion.div
              key={item.id}
              // INSPIRER : opacité 0 -> 1, scale 0.8 -> 1, + tract élastique de la position
              initial={{ opacity: 0, scale: 0.8, x: item.ox, y: item.oy }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                transition: {
                  opacity: { duration: ENTER_DURATION, ease: BREATH },
                  scale: { duration: ENTER_DURATION, ease: BREATH },
                  x: { type: "spring", stiffness: 280, damping: 24, mass: 1 },
                  y: { type: "spring", stiffness: 280, damping: 24, mass: 1 },
                },
              }}
              // EXPIRER : opacité 1 -> 0, scale 1 -> 0.9, même courbe, plus lent
              exit={{
                opacity: 0,
                scale: 0.9,
                transition: { duration: EXIT_DURATION, ease: BREATH },
              }}
              style={{ left: item.x, top: item.y }}
              transformTemplate={centerTransform}
              className="absolute aspect-[4/3] w-40 overflow-hidden rounded-lg border border-white/10 shadow-2xl"
            >
              <img src={item.src} alt="" className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
