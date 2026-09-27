import "./App.css";

import { useScrollProgress } from "./hooks/useScrollProgress";

import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

import { HeroPortal } from "./components/sections/HeroPortal";
import { NewsSection } from "./components/sections/NewsSection";
import { JoinBandSection } from "./components/sections/JoinBandSection";
import { BandSection } from "./components/sections/BandSection";

export default function App() {
  const { scrollProgress, activeSection, scrollTo } = useScrollProgress();

  return (
    <div className="app-container">
      {/* Persistent Navigation Bar */}
      <Header
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        scrollTo={scrollTo}
      />

      <main>
        {/* Intro Screen & Hero Stage */}
        <HeroPortal scrollProgress={scrollProgress} scrollTo={scrollTo} />

        {/* Content Sheet: black background that rises/slides up over the hero */}
        <div className="content-sheet">
          {/* Soft Gradient Feathering: ensures transition from hero to black sheet is soft, not sharp */}
          <div className="sheet-edge-gradient" />

          {/* 01. News Section (Rammstein-style tabs with photo reveal on hover) */}
          <NewsSection />

          {/* 02. Join A Band Section (2 Vertical Cards: Guitarists & Vocalist) */}
          <JoinBandSection />

          {/* 03. About Us Section (Manifesto & Personnel Dossier) */}
          <BandSection />
        </div>
      </main>

      {/* Monolithic Footer */}
      <Footer scrollTo={scrollTo} />
    </div>
  );
}
