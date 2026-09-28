import { useState } from "react";
import type { JoinUsContent } from "../../types";
import { SITE_CONTENT } from "../../data";

interface JoinBandSectionProps {
  joinUs?: JoinUsContent;
}

export function JoinBandSection({ joinUs = SITE_CONTENT.joinUs }: JoinBandSectionProps) {
  const [copied, setCopied] = useState(false);

  // If section is disabled in admin, do not render anything
  if (!joinUs || !joinUs.enabled) {
    return null;
  }

  const emailAddress = joinUs.contactEmail || "paracorpse0@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="content-section" id="join">
      <div className="section-header-bar">
        <h2 className="section-title font-display">{joinUs.title || "JOIN A BAND"}</h2>
      </div>

      {joinUs.subtitle && (
        <p className="join-subtitle font-ui">
          {joinUs.subtitle}
        </p>
      )}

      <div className="join-cards-grid">
        {joinUs.cards.map((card) => {
          const subject =
            card.emailSubject ||
            `Audition: ${card.title} — PARACORPSE (Miass)`;
          const body =
            card.emailBody ||
            `Hello! Applying for ${card.title} position in PARACORPSE.\n\nName:\nAge:\nCity:\nGear / Rig:\nExperience / Audio or Video demo links:`;

          return (
            <article key={card.id} className="join-card">
              <div className="join-card-titles">
                <h3
                  className="join-card-name font-display"
                  style={{ fontFamily: "Dirty Stains" }}
                >
                  {card.title}
                </h3>
                {card.subtitle && (
                  <div className="join-card-sub font-mono">
                    {card.subtitle}
                  </div>
                )}
              </div>

              {card.soundStyle && (
                <div className="join-card-section">
                  <div className="join-label font-mono">SOUND &amp; STYLE</div>
                  <p className="join-desc font-ui">{card.soundStyle}</p>
                </div>
              )}

              {card.requirements && card.requirements.length > 0 && (
                <div className="join-card-section">
                  <div className="join-label font-mono">REQUIREMENTS</div>
                  <ul className="join-list font-mono">
                    {card.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="join-card-action">
                <a
                  href={`mailto:${emailAddress}?subject=${encodeURIComponent(
                    subject
                  )}&body=${encodeURIComponent(body)}`}
                  className="btn-primary font-mono join-btn"
                >
                  <span>{card.buttonText || `APPLY FOR ${card.title}`}</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="join-direct-line font-mono">
        <span>Direct audition contact: {emailAddress}</span>
        <button
          onClick={handleCopyEmail}
          className="join-copy-btn"
          aria-label="Copy email address"
        >
          {copied ? "COPIED ✓" : "COPY EMAIL"}
        </button>
      </div>
    </section>
  );
}
