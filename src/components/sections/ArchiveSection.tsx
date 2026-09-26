import archiveTapeImg from '../../assets/archive-tape.jpg'

export function ArchiveSection() {
  return (
    <section className="content-section" id="archive">
      <div className="section-header-bar">
        <h2 className="section-title font-display">ARCHIVE</h2>
      </div>

      <div className="archive-timeline">
        <div className="timeline-epoch">
          <span className="epoch-tag font-mono">EPOCH 2026 · CURRENT MASTER CYCLE</span>
          <h3 className="epoch-title font-display">DISGORGEMENT ALBUM &amp; GLOBAL CYCLE</h3>
          <p className="epoch-desc">
            Recorded in Milan and Reykjavik. The transition from extreme underground experimentation into documented physical vinyl cataloguing. 500 hand-numbered 180g obsidian vinyl copies pressed.
          </p>
        </div>

        <div className="timeline-epoch">
          <span className="epoch-tag font-mono">EPOCH 2025 · SUBTERRANEAN EXPANSION</span>
          <h3 className="epoch-title font-display">EUROPEAN VAULT TOUR &amp; 'TECTONIC EXHAUST'</h3>
          <p className="epoch-desc">
            Mini-tour through decommissioned industrial spaces across Berlin, Prague, Zurich, and Milan. Sound telemetry honed to low-end frequencies triggering physical acoustic resonance.
          </p>
        </div>

        <div className="timeline-epoch" style={{ opacity: 0.85 }}>
          <span className="epoch-tag font-mono">EPOCH 2024 · GENESIS REHEARSAL VAULT [RAW]</span>
          <h3 className="epoch-title font-display">BASEMENT CASSETTES &amp; FORMATION</h3>
          <p className="epoch-desc">
            Four individuals gathered in an unheated concrete basement. Initial 4-track cassette recordings 'BASEMENT DRIFT'. Analog tape saturation, natural wall reflections, and heavy volume.
          </p>

          <div className="epoch-visual-card">
            <img
              src={archiveTapeImg}
              alt="1990s Rehearsal Cassette Deck"
              className="epoch-visual-img"
            />
            <div className="analog-scanline-effect" />
          </div>
        </div>
      </div>
    </section>
  )
}
