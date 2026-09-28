import { useState, useEffect } from "react";
import "./App.css";

import { useScrollProgress } from "./hooks/useScrollProgress";
import { SITE_CONTENT } from "./data";

import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

import { HeroPortal } from "./components/sections/HeroPortal";
import { NewsSection } from "./components/sections/NewsSection";
import { JoinBandSection } from "./components/sections/JoinBandSection";
import { BandSection } from "./components/sections/BandSection";
import { AdminApp } from "./admin/AdminApp";

function checkIsAdminRoute(): boolean {
  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  return (
    hash.startsWith("#/admin") ||
    hash.startsWith("#admin") ||
    path.endsWith("/admin") ||
    path.endsWith("/admin/")
  );
}

export default function App() {
  const { scrollProgress, activeSection, scrollTo } = useScrollProgress();
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(() => checkIsAdminRoute());

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminOpen(checkIsAdminRoute());
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Hotkey Ctrl+Shift+A or Cmd+Shift+A to toggle Admin
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setIsAdminOpen((prev) => {
          const next = !prev;
          window.location.hash = next ? "/admin" : "/";
          return next;
        });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (isAdminOpen) {
    return (
      <AdminApp
        onBackToSite={() => {
          setIsAdminOpen(false);
          window.location.hash = "/";
        }}
      />
    );
  }

  const joinUsEnabled = SITE_CONTENT.joinUs.enabled;

  return (
    <div className="app-container">
      {/* Persistent Navigation Bar */}
      <Header
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        scrollTo={scrollTo}
        joinUsEnabled={joinUsEnabled}
      />

      <main>
        {/* Intro Screen & Hero Stage */}
        <HeroPortal
          scrollProgress={scrollProgress}
          scrollTo={scrollTo}
          hero={SITE_CONTENT.hero}
        />

        {/* Content Sheet: black background that rises/slides up over the hero */}
        <div className="content-sheet">
          {/* Soft Gradient Feathering: ensures transition from hero to black sheet is soft, not sharp */}
          <div className="sheet-edge-gradient" />

          {/* 01. News Section (Rammstein-style tabs with photo reveal on hover) */}
          <NewsSection news={SITE_CONTENT.news} />

          {/* 02. Join A Band Section (Conditionally rendered, customizable cards) */}
          {joinUsEnabled && <JoinBandSection joinUs={SITE_CONTENT.joinUs} />}

          {/* 03. About Us Section (Manifesto & Personnel Dossier) */}
          <BandSection about={SITE_CONTENT.about} />
        </div>
      </main>

      {/* Monolithic Footer */}
      <Footer
        scrollTo={scrollTo}
        footer={SITE_CONTENT.footer}
        joinUs={SITE_CONTENT.joinUs}
        onOpenAdmin={() => {
          setIsAdminOpen(true);
          window.location.hash = "/admin";
        }}
      />
    </div>
  );
}
