import { useState } from 'react'
import type { TourDate } from '../../types'
import { TOUR_DATES } from '../../data'
import { Modal } from '../ui/Modal'
import liveStageImg from '../../assets/live-stage.jpg'

export function LiveSection() {
  const [ticketModalShow, setTicketModalShow] = useState<TourDate | null>(null)
  const [ticketReserved, setTicketReserved] = useState(false)

  const handleOpenTicketModal = (show: TourDate) => {
    setTicketModalShow(show)
    setTicketReserved(false)
  }

  return (
    <section className="content-section" id="live">
      <div className="section-header-bar">
        <h2 className="section-title font-display">LIVE</h2>
      </div>

      <div className="live-monument-banner">
        <img
          src={liveStageImg}
          alt="PARACORPSE Live concert set"
          className="live-stage-bg"
        />
        <div className="live-banner-overlay">
          <h3 className="live-banner-headline font-display">SUBTERRANEAN FREQUENCY TOUR</h3>
          <span className="live-banner-sub font-mono">124dB PEAK // QUADRAPHONIC ARRAY SYSTEM</span>
        </div>
      </div>

      <div className="tour-ledger">
        {TOUR_DATES.map(show => (
          <div key={show.id} className={`tour-row ${show.status === 'ARCHIVED' ? 'past' : ''}`}>
            <div className="tour-date font-mono">
              {show.status === 'AVAILABLE' && <span className="pulse-dot" style={{ width: 5, height: 5 }} />}
              <span>{show.date}</span>
            </div>
            <div className="tour-city font-display">{show.city}</div>
            <div className="tour-venue font-ui">{show.venue}</div>
            <div className="tour-status font-mono">
              {show.status === 'SOLD OUT' ? (
                <span style={{ color: '#888' }}>[SOLD OUT]</span>
              ) : show.status === 'AVAILABLE' ? (
                <button
                  onClick={() => handleOpenTicketModal(show)}
                  className="btn-secondary"
                  style={{ padding: '0.4rem 0.9rem', fontSize: '0.75rem' }}
                >
                  TICKETS →
                </button>
              ) : (
                <span style={{ color: '#555' }}>[ARCHIVED]</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Modal */}
      <Modal isOpen={!!ticketModalShow} onClose={() => setTicketModalShow(null)}>
        {ticketModalShow && (
          <>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: '#888' }}>
              OFFICIAL TICKET DISPATCH // TOUR 2026
            </span>
            <h3 className="font-display" style={{ fontSize: '1.75rem', margin: '0.75rem 0 0.5rem' }}>
              {ticketModalShow.city}
            </h3>
            <p className="font-mono" style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              {ticketModalShow.date} · {ticketModalShow.venue}
            </p>

            {ticketReserved ? (
              <div
                style={{
                  padding: '1.5rem',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-medium)',
                  marginBottom: '1.5rem'
                }}
              >
                <span className="font-mono" style={{ color: '#fff', fontSize: '0.85rem' }}>
                  ✓ ADMISSION ACCESS REGISTERED
                </span>
                <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                  Confirmation coordinate dispatched. Admission verification will take place via photographic identity at doors.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                  <span className="font-mono" style={{ fontSize: '0.8rem', color: '#888' }}>GENERAL ADMISSION</span>
                  <span className="font-mono" style={{ fontSize: '0.8rem', color: '#fff' }}>€34.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                  <span className="font-mono" style={{ fontSize: '0.8rem', color: '#888' }}>EAR PROTECTION AT VENUE</span>
                  <span className="font-mono" style={{ fontSize: '0.8rem', color: '#fff' }}>INCLUDED</span>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem' }}>
              {!ticketReserved ? (
                <button className="btn-primary font-mono" onClick={() => setTicketReserved(true)}>
                  CONFIRM ACCESS [€34]
                </button>
              ) : (
                <button className="btn-secondary font-mono" onClick={() => setTicketModalShow(null)}>
                  CLOSE
                </button>
              )}
            </div>
          </>
        )}
      </Modal>
    </section>
  )
}
