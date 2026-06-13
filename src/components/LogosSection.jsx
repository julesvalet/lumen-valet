import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { ChevronDownIcon } from "./Icons";
import GalleryLightbox from "./GalleryLightbox";
import { logos } from "../data/assets";

const sizeClasses = {
  small: "col-span-1 aspect-square",
  wide: "col-span-2 aspect-[16/9] md:aspect-auto",
  tall: "col-span-1 aspect-[3/4] md:aspect-auto md:row-span-2",
  large: "col-span-2 aspect-square md:aspect-auto md:row-span-2",
};

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
      <div className="mb-16 md:mb-24">
        <SectionHeading index="03" label="Marques" title="Logos & Symboles" />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[minmax(280px,auto)] md:gap-5 md:grid-flow-dense">
        {visibleLogos.map((logo, i) => (
          <motion.div
            key={logo.title + i}
            data-cursor
            onClick={() => setLightboxIndex(i)}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-ink p-6 transition-colors duration-300 hover:border-acid/40 ${sizeClasses[logo.size]}`}
          >
            <img
              src={logo.src}
              alt={logo.title}
              className="h-2/3 w-2/3 object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-0.5 pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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

      <GalleryLightbox slides={slides} index={lightboxIndex} setIndex={setLightboxIndex} />
    </section>
  );
}
