import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { ChevronDownIcon, ExpandIcon } from "./Icons";
import GalleryLightbox from "./GalleryLightbox";
import { projects } from "../data/assets";

const slides = projects.map((project) => ({
  src: project.src,
  title: project.title,
  description: project.description,
}));

const INITIAL_COUNT = 6;

export default function ProjectsSection() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  const toggleShowAll = () => {
    if (showAll) {
      setShowAll(false);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setShowAll(true);
    }
  };

  return (
    <section id="projets" ref={sectionRef} className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
      <div className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
        <SectionHeading index="01" label="Sélection" title="Projets" />
        <p className="max-w-sm text-sm leading-relaxed text-haze">
          Une sélection de campagnes, visuels de marque et expérimentations
          graphiques — de la direction artistique à l'exécution finale.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {visibleProjects.map((project, i) => (
          <motion.div
            key={project.title}
            data-cursor
            onClick={() => setLightboxIndex(i)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative aspect-square cursor-pointer rounded-2xl"
          >
            <div className="absolute inset-0 overflow-hidden rounded-2xl bg-ink">
              <img
                src={project.src}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-contain transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

              <div className="absolute inset-x-0 bottom-0 flex translate-y-6 items-end justify-between gap-4 p-6 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
                <div>
                  <p className="font-display text-xl text-paper md:text-2xl">{project.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-acid">{project.description}</p>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-paper/30 text-paper">
                  <ExpandIcon />
                </span>
              </div>

              {!project.badge && (
                <div className="absolute left-6 top-6 text-xs uppercase tracking-[0.25em] text-haze opacity-80 transition-opacity duration-300 group-hover:opacity-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
              )}
            </div>

            {project.badge && (
              <span
                className="absolute -left-3 -top-3 z-20 -rotate-[8deg] rounded-xl px-3 py-1 font-display text-sm font-bold uppercase tracking-wider text-white shadow-lg"
                style={{ backgroundColor: "#2bff00", boxShadow: "0 4px 14px rgba(43,255,0,0.45)" }}
              >
                {project.badge}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {projects.length > INITIAL_COUNT && (
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
