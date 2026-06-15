import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { ChevronDownIcon } from "./Icons";
import GalleryLightbox from "./GalleryLightbox";
import { logos } from "../data/assets";

const slides = logos.map((logo) => ({
  src: logo.src,
  title: logo.title,
  description: logo.tag,
}));

const INITIAL_COUNT = 6;

export default function LogosSection() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const visibleLogos = showAll ? logos : logos.slice(0, INITIAL_COUNT);

  const toggleShowAll = () => {
    if (showAll) {
      setShowAll(false);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setShowAll(true);
    }
  };

  return (
    <section id="logos" ref={sectionRef} className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
      <div className="mb-16 md:mb-24">
        <SectionHeading index="03" label="Marques" title="Logos & Symboles" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {visibleLogos.map((logo, i) => (
          <motion.div
            key={logo.title + i}
            data-cursor
            onClick={() => setLightboxIndex(i)}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-ink transition-colors duration-300 hover:border-acid/40"
          >
            <img
              src={logo.src}
              alt={logo.title}
              className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-0.5 bg-gradient-to-t from-noir/85 to-transparent pb-4 pt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="font-display text-xs uppercase tracking-[0.2em] text-paper">
                {logo.title}
              </p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-acid">{logo.tag}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {logos.length > INITIAL_COUNT && (
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
