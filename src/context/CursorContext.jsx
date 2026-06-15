import { createContext, useContext, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const CursorContext = createContext(null);

export function CursorProvider({ children }) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 });
  const springY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return <CursorContext.Provider value={{ springX, springY }}>{children}</CursorContext.Provider>;
}

export function useCursorPosition() {
  return useContext(CursorContext);
}
