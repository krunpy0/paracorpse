import { useState } from "react";
import type { BandMember } from "../../types";
import { BAND_MEMBERS } from "../../data";
import bandPortraitImg from "../../assets/band-portrait.jpg";

export function BandSection() {
  const [activeMember, setActiveMember] = useState<BandMember | null>(null);

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

      <div className="band-editorial-layout" style={{ marginTop: "3.5rem" }}>
        <img
          src={bandPortraitImg}
          alt="PARACORPSE Band members"
          className="band-portrait-img"
        />

        <div className="band-interactive-overlay">
          {BAND_MEMBERS.map((member) => (
            <div
              key={member.id}
              className={`band-column-hotspot ${activeMember?.id === member.id ? "active" : ""}`}
              onClick={() => setActiveMember(member)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") setActiveMember(member);
              }}
            >
              <div className="member-info-box">
                <h3 className="member-name font-display">{member.name}</h3>
                <div className="member-role font-mono">{member.role}</div>
                <div className="member-spec font-mono">
                  <div>{member.equipment}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
