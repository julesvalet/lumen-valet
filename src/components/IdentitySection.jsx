import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { ChevronDownIcon } from "./Icons";
import GalleryLightbox from "./GalleryLightbox";
import { identity } from "../data/assets";

const slides = identity.map((item) => ({
  src: item.src,
  title: item.title,
  description: item.tag,
}));

const INITIAL_COUNT = 6;

export default function IdentitySection() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const visibleIdentity = showAll ? identity : identity.slice(0, INITIAL_COUNT);

  const toggleShowAll = () => {
    if (showAll) {
      setShowAll(false);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setShowAll(true);
    }
  };

  return (
    <section id="identite" ref={sectionRef} className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
      <div className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
        <SectionHeading index="02" label="Systèmes" title="Identité de Marque" />
        <p className="max-w-sm text-sm leading-relaxed text-haze md:text-right">
          Packaging, étiquettes et déclinaisons graphiques — penser une
          identité dans son ensemble, du print au digital.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {visibleIdentity.map((item, i) => (
          <motion.div
            key={item.title}
            data-cursor
            onClick={() => setLightboxIndex(i)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-paper"
          >
            <img
              src={item.src}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <div className="absolute left-5 top-5 flex flex-col gap-1">
              <p className="font-display text-xs uppercase tracking-[0.25em] text-noir/60">
                {item.tag}
              </p>
              <p className="font-display text-sm text-noir">{item.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {identity.length > INITIAL_COUNT && (
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
