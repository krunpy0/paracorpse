import { useState } from 'react'
import type { BandMember } from '../../types'
import { BAND_MEMBERS } from '../../data'
import bandPortraitImg from '../../assets/band-portrait.jpg'

export function BandSection() {
  const [activeMember, setActiveMember] = useState<BandMember | null>(null)

  return (
    <section className="content-section" id="about">
      <div className="section-header-bar">
        <h2 className="section-title font-display">ABOUT US</h2>
      </div>

      <div className="about-manifesto-grid">
        <div className="about-manifesto-col">
          <p className="about-lead font-display">
            PARACORPSE — AN INDUSTRIAL MONOLITH FORGED WITHIN RAW CONCRETE WALLS.
          </p>
        </div>
        <div className="about-manifesto-col font-ui">
          <p>
            Uniting subterranean low-frequency resonance, crushing guitar riffs, analog tape distortion, and relentless energy. A sound where the mechanical cadence of industrial groove converges with the dark atmosphere of the underground.
          </p>
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
            Operating from Miass, South Ural. The sonic laboratory is open to dedicated collaborators who share an uncompromising commitment to heavy music.
          </p>
        </div>
      </div>

      <div className="band-editorial-layout" style={{ marginTop: '3.5rem' }}>
        <img
          src={bandPortraitImg}
          alt="PARACORPSE Band members"
          className="band-portrait-img"
        />

        <div className="band-interactive-overlay">
          {BAND_MEMBERS.map(member => (
            <div
              key={member.id}
              className={`band-column-hotspot ${activeMember?.id === member.id ? 'active' : ''}`}
              onClick={() => setActiveMember(member)}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') setActiveMember(member) }}
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
  )
}
