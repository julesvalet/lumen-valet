import { useEffect, useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

/**
 * Shared fullscreen lightbox used by every gallery section.
 * Adds mouse-wheel navigation (scroll down = next, scroll up = previous)
 * on top of the library's default arrow/swipe controls.
 */
export default function GalleryLightbox({ slides, index, setIndex }) {
  const lockRef = useRef(false);

  useEffect(() => {
    const isOpen = index >= 0;
    document.body.classList.toggle("lightbox-open", isOpen);

    if (!isOpen) return undefined;

    const onWheel = (e) => {
      e.preventDefault();
      if (lockRef.current) return;
      lockRef.current = true;

      if (e.deltaY > 0) {
        setIndex((i) => (i + 1) % slides.length);
      } else if (e.deltaY < 0) {
        setIndex((i) => (i - 1 + slides.length) % slides.length);
      }

      setTimeout(() => {
        lockRef.current = false;
      }, 380);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [index, slides.length, setIndex]);

  useEffect(() => {
    return () => document.body.classList.remove("lightbox-open");
  }, []);

  return (
    <Lightbox
      open={index >= 0}
      index={Math.max(index, 0)}
      close={() => setIndex(-1)}
      slides={slides}
      plugins={[Captions]}
      styles={{ container: { backgroundColor: "rgba(10, 10, 10, 0.95)" } }}
    />
  );
}
