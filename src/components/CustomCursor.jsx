import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isActive, setIsActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 });
  const springY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e) => {
      const target = e.target.closest("[data-cursor]");
      setIsActive(Boolean(target));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  return (
    <motion.div
      className="cursor-dot"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isActive ? 72 : 12,
        height: isActive ? 72 : 12,
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
