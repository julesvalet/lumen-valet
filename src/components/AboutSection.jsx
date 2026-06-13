import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { MailIcon } from "./Icons";

const contacts = [
  { label: "Pro", email: "designlumenvalet@gmail.com" },
  { label: "Perso", email: "julesvalet71250@gmail.com" },
];

export default function AboutSection() {
  return (
    <section id="apropos" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mb-16 md:mb-24">
        <SectionHeading index="05" label="Studio" title="À propos" />
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <p className="font-display text-[clamp(1.5rem,3.2vw,2.5rem)] font-medium leading-tight text-paper">
            <span className="text-acid">Jules Valet</span> — Studio Créatif
          </p>
          <p className="text-sm leading-relaxed text-haze md:text-base">
            Designer graphique et développeur indépendant basé à Prissé (71).
          </p>
          <p className="text-sm leading-relaxed text-haze md:text-base">
            Je fusionne direction artistique minimaliste et précision
            technique pour concevoir des identités visuelles fortes et des
            expériences web sur-mesure. Du concept original à l'intégration
            finale, chaque projet est pensé pour marquer les esprits à
            travers un design radical, fluide et percutant. Collaborons pour
            donner une dimension supérieure à votre image de marque.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 border-t border-white/10 pt-8 md:border-t-0 md:border-l md:pl-12 md:pt-0"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-haze">Contact</p>

          {contacts.map((contact) => (
            <a
              key={contact.email}
              href={`mailto:${contact.email}`}
              data-cursor
              className="group flex items-center gap-4 transition-colors duration-300 hover:text-acid"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-paper/20 text-paper transition-colors duration-300 group-hover:border-acid group-hover:text-acid">
                <MailIcon className="h-4 w-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.25em] text-haze">{contact.label}</span>
                <span className="font-display text-base text-paper transition-colors duration-300 group-hover:text-acid md:text-lg">
                  {contact.email}
                </span>
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
