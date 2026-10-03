import type { FooterContent, JoinUsContent } from "../../types";
import { SITE_CONTENT } from "../../data";

interface FooterProps {
  scrollTo: (id: string) => void;
  footer?: FooterContent;
  joinUs?: JoinUsContent;
  onOpenAdmin?: () => void;
}

export function Footer({
  scrollTo,
  footer = SITE_CONTENT.footer,
  joinUs = SITE_CONTENT.joinUs,
  onOpenAdmin,
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const isJoinEnabled = joinUs?.enabled ?? true;

  return (
    <footer className="main-footer">
      <div className="footer-inner">
        <div className="footer-top-row">
          <div className="footer-wordmark font-logo">
            {footer.wordmark || "PARACORPSE"}
          </div>
          <button
            onClick={() => scrollTo("portal")}
            className="back-to-top-btn font-mono"
          >
            <span>RETURN TO TOP ↑</span>
          </button>
        </div>

        <div className="footer-links-grid font-mono">
          <div>
            <div className="footer-col-title">NAVIGATION</div>
            <ul className="footer-link-list">
              <li>
                <button onClick={() => scrollTo("news")}>NEWS</button>
              </li>
              {isJoinEnabled && (
                <li>
                  <button onClick={() => scrollTo("join")}>JOIN A BAND</button>
                </li>
              )}
              <li>
                <button onClick={() => scrollTo("about")}>ABOUT US</button>
              </li>
            </ul>
          </div>

          {isJoinEnabled ? (
            <div>
              <div className="footer-col-title">
                {footer.recruitmentTitle || "RECRUITMENT"}
              </div>
              <ul className="footer-link-list">
                {joinUs.cards.map((card) => (
                  <li key={card.id}>
                    <button onClick={() => scrollTo("join")}>
                      {card.title}
                    </button>
                  </li>
                ))}
                {joinUs.subtitle && (
                  <li
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.75rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    MIASS (AGE 15+)
                  </li>
                )}
              </ul>
            </div>
          ) : (
            <div>
              <div className="footer-col-title">
                {footer.recruitmentTitle || "RECRUITMENT"}
              </div>
              <ul className="footer-link-list">
                <li style={{ color: "var(--text-secondary)" }}>
                  Auditions Currently Closed
                </li>
              </ul>
            </div>
          )}

          <div>
            <div className="footer-col-title">OFFICIAL LINKS</div>
            <ul className="footer-link-list">
              {footer.socialLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">CONTACT &amp; LOCATION</div>
            <ul className="footer-link-list">
              <li>
                <a href={`mailto:${footer.contactEmail}`}>
                  {footer.contactEmail.toUpperCase()}
                </a>
              </li>
              <li style={{ color: "var(--text-secondary)" }}>
                {footer.locationCity}
              </li>
              <li
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.75rem",
                }}
              >
                {footer.locationCountry}
              </li>
            </ul>
          </div>
        </div>

        <div
          className="footer-bottom-meta font-mono"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            © {currentYear}{" "}
            {footer.copyright || "PARACORPSE. ALL RIGHTS RESERVED."}
          </div>
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-secondary)",
                fontSize: "0.75rem",
                cursor: "pointer",
                padding: "2px 6px",
                opacity: 0.85,
                transition: "opacity 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.85";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
              title="Admin Portal (Ctrl+Shift+A)"
              aria-label="Open Admin CMS"
            >
              CMS
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
