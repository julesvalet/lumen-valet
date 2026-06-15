import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { ChevronDownIcon } from "./Icons";
import GalleryLightbox from "./GalleryLightbox";
import { portraits } from "../data/assets";

const slides = portraits.map((portrait) => ({
  src: portrait.src,
  title: portrait.title,
  description: portrait.tag,
}));

const INITIAL_COUNT = 6;

export default function PortraitsSection() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const visiblePortraits = showAll ? portraits : portraits.slice(0, INITIAL_COUNT);

  const toggleShowAll = () => {
    if (showAll) {
      setShowAll(false);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setShowAll(true);
    }
  };

  return (
    <section id="portraits" ref={sectionRef} className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
      <div className="mb-16 md:mb-24">
        <SectionHeading index="04" label="Visages" title="Portraits & Photographie" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {visiblePortraits.map((portrait, i) => (
          <motion.div
            key={portrait.title}
            data-cursor
            onClick={() => setLightboxIndex(i)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-ink"
          >
            <img
              src={portrait.src}
              alt={portrait.title}
              className="absolute inset-0 h-full w-full object-contain grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-display text-lg text-paper">{portrait.title}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-acid">{portrait.tag}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {portraits.length > INITIAL_COUNT && (
        <div className="mt-10 flex justify-center md:mt-14">
          <button
            onClick={toggleShowAll}
            data-cursor
            className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-8 py-3 font-display text-xs uppercase tracking-[0.25em] text-paper transition-all duration-300 hover:border-acid hover:text-acid"
          >
            {showAll ? "Voir moins" : "En voir plus"}
            <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}
      </div>

      <GalleryLightbox slides={slides} index={lightboxIndex} setIndex={setLightboxIndex} />
    </section>
  );
}
