import { useState } from "react";

export function JoinBandSection() {
  const emailAddress = "paracorpseband@gmail.com";
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="content-section" id="join">
      <div className="section-header-bar">
        <h2 className="section-title font-display">JOIN A BAND</h2>
      </div>

      <p className="join-subtitle font-ui">
        Auditioning rhythm/lead guitarist and vocalist for upcoming live shows
        and studio sessions. Miass, Russia · Age 15+.
      </p>

      <div className="join-cards-grid">
        {/* Guitarist Card */}
        <article className="join-card">
          <div className="join-card-titles">
            <h3 className="join-card-name font-display">GUITARIST</h3>
            <div className="join-card-sub font-mono">
              RHYTHM &amp; LEAD GUITAR
            </div>
          </div>

          <div className="join-card-section">
            <div className="join-label font-mono">SOUND &amp; STYLE</div>
            <p className="join-desc font-ui">
              Dense industrial sound, low drop tunings (Drop A / Drop B), tight
              synchronization with rhythm section, textural feedback, and heavy
              groove.
            </p>
          </div>

          <div className="join-card-section">
            <div className="join-label font-mono">REQUIREMENTS</div>
            <ul className="join-list font-mono">
              <li>Age 15+ · Based in Miass or surrounding area</li>
              <li>Own stage instrument and rehearsal gear</li>
              <li>Accurate playing with a metronome and tight timing</li>
              <li>Readiness for regular weekly rehearsals and gigs</li>
            </ul>
          </div>

          <div className="join-card-action">
            <a
              href={`mailto:${emailAddress}?subject=${encodeURIComponent("Audition: Guitarist — PARACORPSE (Miass)")}&body=${encodeURIComponent("Hello! Applying for guitarist position in PARACORPSE.\n\nName:\nAge:\nCity:\nGear / Rig:\nExperience / Audio or Video demo links:")}`}
              className="btn-primary font-mono join-btn"
            >
              <span>APPLY FOR GUITARIST</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </article>

        {/* Vocalist Card */}
        <article className="join-card">
          <div className="join-card-titles">
            <h3 className="join-card-name font-display">VOCALIST</h3>
            <div className="join-card-sub font-mono">FRONTMAN / VOCALS</div>
          </div>

          <div className="join-card-section">
            <div className="join-label font-mono">SOUND &amp; STYLE</div>
            <p className="join-desc font-ui">
              Aggressive vocal drive, extreme techniques (harsh, growl, scream)
              and/or solid clean vocals. High stage energy, charisma, and
              dynamic control.
            </p>
          </div>

          <div className="join-card-section">
            <div className="join-label font-mono">REQUIREMENTS</div>
            <ul className="join-list font-mono">
              <li>Age 15+ · Based in Miass or surrounding area</li>
              <li>Vocal control, breath support, and endurance</li>
              <li>Dedication to band concepts, lyrics, and rehearsal cycles</li>
              <li>Reliability, stage confidence, and discipline</li>
            </ul>
          </div>

          <div className="join-card-action">
            <a
              href={`mailto:${emailAddress}?subject=${encodeURIComponent("Audition: Vocalist — PARACORPSE (Miass)")}&body=${encodeURIComponent("Hello! Applying for vocalist position in PARACORPSE.\n\nName:\nAge:\nCity:\nVocal style (harsh/growl/clean):\nExperience / Audio or Video demo links:")}`}
              className="btn-primary font-mono join-btn"
            >
              <span>APPLY FOR VOCALIST</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </article>
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
