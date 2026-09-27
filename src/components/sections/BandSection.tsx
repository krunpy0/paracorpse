import type { BandMember } from "../../types";
import { BAND_MEMBERS } from "../../data";

export function BandSection() {
  return (
    <section className="content-section" id="about">
      <div className="section-header-bar">
        <h2 className="section-title font-display">ABOUT US</h2>
      </div>

      <div className="about-manifesto-grid">
        <div className="about-manifesto-col">
          <p className="about-lead font-display">
            PARACORPSE — MODERN METAL AND NU-METAL FROM MIASS, RUSSIA.
          </p>
        </div>
        <div className="about-manifesto-col font-ui">
          <p>
            Paracorpse is a modern metal and nu-metal band from Russia, formed
            in September 2026 by Igor and Pavel. The project is built around
            heavy riffs, groovy rhythms, and dynamic songwriting.
          </p>
          <p style={{ marginTop: "1rem" }}>
            The band focuses on individuality and honest self-expression. The
            music explores themes of mental health, inner struggles, difficult
            emotions, and the process of finding a way through them.
          </p>
          <p style={{ marginTop: "1rem", color: "var(--text-muted)" }}>
            Based in Miass, Russia. Currently working on new material and
            looking for musicians to join the project for future releases and
            live shows.
          </p>
        </div>
      </div>

      <div className="members-section">
        <div className="members-header-bar">
          <h3
            className="members-section-title font-display"
            style={{ fontFamily: "Dirty Stains" }}
          >
            MEMBERS
          </h3>
        </div>

        <div className="members-grid">
          {BAND_MEMBERS.map((member: BandMember) => (
            <article key={member.id} className="member-card">
              <div className="member-photo-frame">
                <img
                  src={member.photo}
                  alt={`${member.name} — ${member.role}`}
                  className="member-photo"
                  loading="lazy"
                />
                <div className="member-photo-gradient" />
              </div>

              <div className="member-content">
                <div className="member-meta-top">
                  <span className="member-role font-mono">{member.role}</span>
                </div>

                <h4 className="member-name font-display">{member.name}</h4>

                <p className="member-bio font-ui">{member.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
