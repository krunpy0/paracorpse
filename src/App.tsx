import "./App.css";

import { useScrollProgress } from "./hooks/useScrollProgress";
import { FilmGrain } from "./components/layout/FilmGrain";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

import { HeroPortal } from "./components/sections/HeroPortal";
import { NewsSection } from "./components/sections/NewsSection";
import { JoinBandSection } from "./components/sections/JoinBandSection";
import { BandSection } from "./components/sections/BandSection";
import { ContactSection } from "./components/sections/ContactSection";

export default function App() {
  const { scrollProgress, activeSection, scrollTo } = useScrollProgress();

  return (
    <div className="app-container">
      {/* Visual Film Grain Texture Overlay */}
      <FilmGrain />

      {/* Persistent Navigation Bar */}
      <Header
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        scrollTo={scrollTo}
      />

      <main>
        {/* Intro Screen & Camera Dolly Portal Transition */}
        <HeroPortal scrollProgress={scrollProgress} scrollTo={scrollTo} />

        {/* 01. News Section (Rammstein-style tabs with photo reveal on hover) */}
        <NewsSection />

        {/* 02. Join A Band Section (2 Vertical Cards: Guitarists & Vocalist) */}
        <JoinBandSection />

        {/* 03. About Us Section (Manifesto & Personnel Dossier) */}
        <BandSection />
      </main>

      {/* Monolithic Footer */}
      <Footer scrollTo={scrollTo} />
    </div>
  );
}
