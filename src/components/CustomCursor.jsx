import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [variant, setVariant] = useState("default");
  const [isZoomedIn, setIsZoomedIn] = useState(false);
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
      if (e.target.closest(".yarl__slide_image")) {
        setVariant("zoom");
      } else if (e.target.closest("[data-cursor]")) {
        setVariant("active");
      } else {
        setVariant("default");
      }
    };

    const onZoomChange = (e) => {
      setIsZoomedIn(Boolean(e.detail?.zoomed));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("lightbox-zoom-change", onZoomChange);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("lightbox-zoom-change", onZoomChange);
    };
  }, [x, y]);

  const isZoom = variant === "zoom";
  const isActive = variant === "active";
  const size = isZoom ? 46 : isActive ? 72 : 12;

  return (
    <motion.div
      className={`cursor-dot ${isZoom ? "cursor-dot--zoom" : ""}`}
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{ width: size, height: size }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {isZoom && (
        <>
          <span className="cursor-dot__handle" />
          <span
            className={`cursor-dot__indicator ${isZoomedIn ? "cursor-dot__indicator--minus" : ""}`}
          />
        </>
      )}
    </motion.div>
  );
}
