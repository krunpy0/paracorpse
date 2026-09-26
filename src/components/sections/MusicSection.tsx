import { useState } from 'react'
import type { Release, Track } from '../../types'
import { RELEASES } from '../../data'

interface MusicSectionProps {
  isPlaying: boolean
  activeTrackId: string
  onPlayTrack: (track: Track) => void
}

export function MusicSection({ isPlaying, activeTrackId, onPlayTrack }: MusicSectionProps) {
  const [selectedRelease, setSelectedRelease] = useState<Release>(RELEASES[0])

  return (
    <section className="content-section" id="music">
      <div className="section-header-bar">
        <h2 className="section-title font-display">MUSIC</h2>
      </div>

      <div className="music-layout">
        <div className="music-selector-column">
          {RELEASES.map(release => (
            <div
              key={release.id}
              className={`release-select-card ${selectedRelease.id === release.id ? 'active' : ''}`}
              onClick={() => setSelectedRelease(release)}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') setSelectedRelease(release) }}
            >
              <div className="release-card-top font-mono">
                <span>{release.catalog}</span>
                <span>{release.year}</span>
              </div>
              <h3 className="release-card-title font-display">{release.title}</h3>
              <div className="release-card-meta font-mono">{release.format}</div>
            </div>
          ))}
        </div>

        <div className="music-detail-panel">
          <div className="music-detail-header">
            <img
              src={selectedRelease.artwork}
              alt={selectedRelease.title}
              className="music-cover-thumbnail"
            />
            <div className="music-meta-info">
              <span className="font-mono" style={{ fontSize: '0.75rem', color: '#888' }}>
                {selectedRelease.catalog} // {selectedRelease.year}
              </span>
              <h3 className="music-active-title font-display">{selectedRelease.title}</h3>
              <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.5, maxWidth: '520px' }}>
                {selectedRelease.description}
              </p>
            </div>
          </div>

          <div className="tracklist-ledger font-mono">
            {selectedRelease.tracks.map(track => {
              const isThisPlaying = isPlaying && activeTrackId === track.id
              return (
                <div key={track.id} className="track-row">
                  <div className="track-left">
                    <span className="track-number">{track.number}</span>
                    <button
                      onClick={() => onPlayTrack(track)}
                      className="track-play-btn"
                      aria-label={isThisPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                    >
                      {isThisPlaying ? '■' : '▶'}
                    </button>
                    <span className="track-title font-ui" style={{ color: isThisPlaying ? '#fff' : '#ccc' }}>
                      {track.title}
                    </span>
                  </div>

                  <div className="track-right">
                    <span>{track.duration}</span>
                    <span style={{ fontSize: '0.72rem', color: '#666' }}>[{track.bitrate}]</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="streaming-links-bar font-mono" style={{ fontSize: '0.75rem' }}>
            <span style={{ color: '#666', marginRight: '0.5rem' }}>DISTRIBUTION:</span>
            <a href="#music" className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.72rem' }}>SPOTIFY</a>
            <a href="#music" className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.72rem' }}>APPLE MUSIC</a>
            <a href="#music" className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.72rem' }}>BANDCAMP</a>
            <a href="#music" className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.72rem' }}>180G VINYL</a>
          </div>
        </div>
      </div>
    </section>
  )
}
