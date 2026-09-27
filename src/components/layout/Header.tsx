import { useState } from "react";
import type { SectionId } from "../../types";
import { Modal } from "../ui/Modal";

interface HeaderProps {
  scrollProgress: number;
  activeSection: SectionId;
  scrollTo: (id: string) => void;
}

interface NavItem {
  id: SectionId;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "news", label: "NEWS" },
  { id: "join", label: "JOIN A BAND" },
  { id: "about", label: "ABOUT US" },
];

export function Header({
  scrollProgress,
  activeSection,
  scrollTo,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isVisible = scrollProgress > 0.15;

  const handleNavClick = (sec: SectionId) => {
    scrollTo(sec);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className="main-header"
        style={{
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? "all" : "none",
          transform: isVisible ? "translateY(0)" : "translateY(-10px)",
        }}
      >
        <nav className="header-nav" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`nav-link font-logo ${activeSection === item.id ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-controls">
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Modal */}
      <Modal
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        maxWidth="400px"
      >
        <h3
          className="font-mono"
          style={{
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            marginBottom: "2rem",
            letterSpacing: "0.15em",
          }}
        >
          NAVIGATION
        </h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="font-logo"
              style={{
                textAlign: "left",
                fontSize: "1.65rem",
                color: activeSection === item.id ? "#ffffff" : "#888888",
                textDecoration:
                  activeSection === item.id ? "underline" : "none",
                textUnderlineOffset: "6px",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}
