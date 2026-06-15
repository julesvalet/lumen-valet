import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import AcidBackground from "./components/AcidBackground";
import Preloader from "./components/Preloader";
import HeroIntro from "./components/HeroIntro";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import ProjectsSection from "./components/ProjectsSection";
import LogosSection from "./components/LogosSection";
import IdentitySection from "./components/IdentitySection";
import PortraitsSection from "./components/PortraitsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import DiscordSection from "./components/DiscordSection";
import Footer from "./components/Footer";
import { CursorProvider } from "./context/CursorContext";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("is-loading", loading);
    return () => document.body.classList.remove("is-loading");
  }, [loading]);

  // Verrouille la restauration du scroll : pas de saut au rechargement.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Le titre "dock" dans la navbar une fois le hero dépassé.
  const [docked, setDocked] = useState(false);
  useEffect(() => {
    const onScroll = () => setDocked(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <CursorProvider>
      <div className="relative min-h-screen font-sans text-paper">
        <AcidBackground />
        <div className="grain" />
        <CustomCursor />
        <Preloader onDone={() => setLoading(false)} />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={loading ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Navbar docked={docked} />

          <main className="flex flex-col">
            <HeroIntro active={!loading} docked={docked} />
            <Hero />
            <Marquee />
            <ProjectsSection />
            <IdentitySection />
            <LogosSection />
            <PortraitsSection />
            <AboutSection />
          </main>

          <ContactSection />
          <DiscordSection />
          <Footer />
        </motion.div>
      </div>
    </CursorProvider>
  );
}
