import { useEffect, useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

/**
 * Shared fullscreen lightbox used by every gallery section.
 * Adds mouse-wheel navigation (scroll down = next, scroll up = previous)
 * on top of the library's default arrow/swipe controls, plus click-to-zoom
 * on the image and click-on-backdrop-to-close.
 */
export default function GalleryLightbox({ slides, index, setIndex }) {
  const lockRef = useRef(false);
  const zoomRef = useRef(null);

  useEffect(() => {
    const isOpen = index >= 0;
    document.body.classList.toggle("lightbox-open", isOpen);

    if (!isOpen) return undefined;

    const onWheel = (e) => {
      e.preventDefault();
      if (lockRef.current) return;

      const zoomState = zoomRef.current;
      if (zoomState && zoomState.zoom > zoomState.minZoom + 0.01) return;

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
    return () => {
      document.body.classList.remove("lightbox-open");
      window.dispatchEvent(new CustomEvent("lightbox-zoom-change", { detail: { zoomed: false } }));
    };
  }, []);

  const handleZoomChange = ({ zoom }) => {
    const zoomState = zoomRef.current;
    const minZoom = zoomState ? zoomState.minZoom : 1;
    window.dispatchEvent(
      new CustomEvent("lightbox-zoom-change", { detail: { zoomed: zoom > minZoom + 0.01 } })
    );
  };

  const toggleZoom = () => {
    const zoomState = zoomRef.current;
    if (!zoomState) return;

    if (zoomState.zoom > zoomState.minZoom + 0.01) {
      zoomState.changeZoom(zoomState.minZoom);
    } else {
      zoomState.changeZoom(Math.min(zoomState.maxZoom, zoomState.minZoom * 2.5));
    }
  };

  return (
    <Lightbox
      open={index >= 0}
      index={Math.max(index, 0)}
      close={() => setIndex(-1)}
      slides={slides}
      plugins={[Zoom, Captions]}
      zoom={{ ref: zoomRef, maxZoomPixelRatio: 3, scrollToZoom: false, doubleClickMaxStops: 1 }}
      controller={{ closeOnBackdropClick: true }}
      on={{ click: toggleZoom, zoom: handleZoomChange }}
      styles={{ container: { backgroundColor: "rgba(10, 10, 10, 0.95)" } }}
    />
  );
}
