import type { Track } from '../../types'
import { RELEASES } from '../../data'

interface CurrentSectionProps {
  isPlaying: boolean
  activeTrackId: string
  onPlayTrack: (track: Track) => void
  scrollTo: (id: string) => void
}

export function CurrentSection({
  isPlaying,
  activeTrackId,
  onPlayTrack,
  scrollTo
}: CurrentSectionProps) {
  const currentRelease = RELEASES[0]
  const firstTrack = currentRelease.tracks[0]
  const isThisPlaying = isPlaying && activeTrackId === firstTrack.id

  return (
    <section className="content-section" id="current">
      <div className="section-header-bar">
        <h2 className="section-title font-display">CURRENT</h2>
      </div>

      <div className="current-grid">
        <div className="current-visual-column">
          <div className="vinyl-showcase-box group">
            <img
              src={currentRelease.artwork}
              alt={`PARACORPSE - ${currentRelease.title}`}
              className="vinyl-sleeve-img"
            />
            <div className="vinyl-disc">
              <div className="vinyl-label-center font-mono">
                PARACORPSE<br />PRC-04 · 45 RPM
              </div>
            </div>
          </div>
        </div>

        <div className="current-info-column">
          <div className="current-status-tag font-mono">OFFICIAL VINYL TRANSMISSION</div>
          <h3 className="current-release-name font-display">{currentRelease.title}</h3>
          <p className="current-release-desc">
            {currentRelease.description}
          </p>

          <div className="current-spec-ledger font-mono">
            <div className="spec-row">
              <span className="spec-label">CATALOGUE</span>
              <span className="spec-value">PRC-04-2026</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">SPECIFICATION</span>
              <span className="spec-value">12" OBSIDIAN VINYL / 24-BIT 96kHz FLAC</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">EDITION</span>
              <span className="spec-value">STRICT 500 UNITS · HAND NUMBERED</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">NEXT LIVE SHOW</span>
              <span className="spec-value" style={{ color: '#fff', fontWeight: 600 }}>18 OCT // MILAN // [SOLD OUT]</span>
            </div>
          </div>

          <div className="current-action-row">
            <button
              onClick={() => onPlayTrack(firstTrack)}
              className="btn-primary font-mono"
            >
              <span>{isThisPlaying ? 'PAUSE TRANSMISSION' : 'STREAM EXCERPT ▶'}</span>
            </button>
            <button
              onClick={() => scrollTo('music')}
              className="btn-secondary font-mono"
            >
              <span>INSPECT TRACKLIST →</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
