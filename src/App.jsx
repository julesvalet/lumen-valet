import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import AcidBackground from "./components/AcidBackground";
import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import ProjectsSection from "./components/ProjectsSection";
import LogosSection from "./components/LogosSection";
import IdentitySection from "./components/IdentitySection";
import PortraitsSection from "./components/PortraitsSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("is-loading", loading);
    return () => document.body.classList.remove("is-loading");
  }, [loading]);

  return (
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
        <Navbar />

        <main className="flex flex-col">
          <Hero />
          <Marquee />
          <ProjectsSection />
          <IdentitySection />
          <LogosSection />
          <PortraitsSection />
          <AboutSection />
        </main>

        <Footer />
      </motion.div>
    </div>
  );
}
