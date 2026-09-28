import type { AboutContent } from "../../types";
import { SITE_CONTENT, resolveMediaUrl } from "../../data";

interface BandSectionProps {
  about?: AboutContent;
}

export function BandSection({ about = SITE_CONTENT.about }: BandSectionProps) {
  if (!about) return null;

  return (
    <section className="content-section" id="about">
      <div className="section-header-bar">
        <h2 className="section-title font-display">{about.title || "ABOUT US"}</h2>
      </div>

      <div className="about-manifesto-grid">
        <div className="about-manifesto-col">
          <p className="about-lead font-display">
            {about.lead}
          </p>
        </div>
        <div className="about-manifesto-col font-ui">
          {about.paragraphs.map((p, idx) => (
            <p key={idx} style={{ marginTop: idx > 0 ? "1rem" : 0 }}>
              {p}
            </p>
          ))}
        </div>
      </div>

      {about.members && about.members.length > 0 && (
        <div className="members-section">
          <div className="members-header-bar">
            <h3
              className="members-section-title font-display"
              style={{ fontFamily: "Dirty Stains" }}
            >
              {about.membersTitle || "MEMBERS"}
            </h3>
          </div>

          <div className="members-grid">
            {about.members.map((member) => {
              const photoUrl = resolveMediaUrl(member.photo);

              return (
                <article key={member.id} className="member-card">
                  <div className="member-photo-frame">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={`${member.name} — ${member.role}`}
                        className="member-photo"
                        loading="lazy"
                      />
                    ) : (
                      <div className="member-photo" style={{ background: "#111" }} />
                    )}
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
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
