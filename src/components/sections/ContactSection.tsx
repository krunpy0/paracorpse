import { useState } from 'react'

export function ContactSection() {
  const [copied, setCopied] = useState(false)
  const directEmail = 'paracorpseband@gmail.com'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="content-section" id="contact">
      <div className="section-header-bar">
        <h2 className="section-title font-display">CONTACT US</h2>
      </div>

      <div className="contact-layout-grid">
        {/* Left Column: Official Social / Media Channels */}
        <div className="contact-card">
          <h3 className="contact-title font-display">OFFICIAL CHANNELS</h3>

          <p className="contact-desc font-ui">
            Official digital channels, live performance archives, rehearsal videos, and music releases:
          </p>

          <div className="social-links-list">
            {/* TikTok */}
            <a
              href="https://tiktok.com/@paracorpse"
              target="_blank"
              rel="noopener noreferrer"
              className="social-item"
              aria-label="PARACORPSE TikTok"
            >
              <div className="social-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.41a6.33 6.33 0 0 0-.85-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.16 8.16 0 0 0 4.77 1.52V7.12a4.85 4.85 0 0 1-1-.43z" />
                </svg>
              </div>
              <div className="social-info">
                <span className="social-name font-mono">TIKTOK</span>
                <span className="social-url font-mono">tiktok.com/@paracorpse</span>
              </div>
              <span className="social-arrow font-mono" aria-hidden="true">↗</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/paracorpseband"
              target="_blank"
              rel="noopener noreferrer"
              className="social-item"
              aria-label="PARACORPSE Instagram"
            >
              <div className="social-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <div className="social-info">
                <span className="social-name font-mono">INSTAGRAM</span>
                <span className="social-url font-mono">instagram.com/paracorpseband</span>
              </div>
              <span className="social-arrow font-mono" aria-hidden="true">↗</span>
            </a>

            {/* VK */}
            <a
              href="https://vk.ru/paracorpse"
              target="_blank"
              rel="noopener noreferrer"
              className="social-item"
              aria-label="PARACORPSE VK"
            >
              <div className="social-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.162 16.5c.34 0 .546-.226.546-.62 0-.374-.01-.84-.01-1.378 0-.442.203-.68.513-.68.267 0 .502.138.868.497.64.63 1.096 1.487 1.155 1.581.12.19.345.6.937.6h2.298c.531 0 .782-.239.654-.727-.123-.467-1.189-1.92-1.748-2.525-.337-.367-.478-.523-.478-.737 0-.256.126-.456.402-.84.44-.61 1.704-2.298 1.849-3.057.07-.372-.119-.597-.565-.597h-2.274c-.456 0-.64.218-.767.518-.328.78-1.042 2.227-1.488 2.805-.285.369-.475.467-.648.467-.174 0-.324-.097-.324-.492V8.52c0-.446-.145-.634-.518-.634h-3.41c-.265 0-.422.18-.422.37 0 .378.618.466.68.1.528.07.63.385.63.855v2.793c0 .544-.112.723-.339.723-.19 0-.457-.148-.99-1.077-.52-1.03-1.085-2.292-1.173-2.47-.098-.198-.285-.386-.714-.386H4.664c-.476 0-.582.218-.582.463 0 .425.592 2.656 2.668 5.409 1.737 2.308 4.195 3.564 6.412 3.564z" />
                </svg>
              </div>
              <div className="social-info">
                <span className="social-name font-mono">VKONTAKTE</span>
                <span className="social-url font-mono">vk.ru/paracorpse</span>
              </div>
              <span className="social-arrow font-mono" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Right Column: Direct Inquiries */}
        <div className="contact-card">
          <h3 className="contact-title font-display">DIRECT INQUIRIES</h3>

          <p className="contact-desc font-ui">
            Direct communication channel for concert booking, press, distribution, and band audition submissions:
          </p>

          <div className="contact-email-box">
            <div className="email-display font-mono">
              {directEmail}
            </div>

            <div className="email-actions">
              <a
                href={`mailto:${directEmail}?subject=${encodeURIComponent('[PARACORPSE] Official Inquiry')}`}
                className="btn-primary font-mono contact-action-btn"
              >
                <span>SEND EMAIL</span>
                <span aria-hidden="true">↗</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="contact-copy-btn font-mono"
                aria-label="Copy direct email address"
              >
                {copied ? 'COPIED ✓' : 'COPY ADDRESS'}
              </button>
            </div>
          </div>

          <div className="contact-info-list font-mono">
            <div className="info-row">
              <span className="info-label">LOCATION</span>
              <span className="info-value">Miass, Russia</span>
            </div>
            <div className="info-row">
              <span className="info-label">TIMEZONE</span>
              <span className="info-value">UTC+5 (Yekaterinburg Time)</span>
            </div>
            <div className="info-row">
              <span className="info-label">INQUIRIES</span>
              <span className="info-value">Booking, Press, Auditions</span>
            </div>
            <div className="info-row">
              <span className="info-label">RESPONSE TIME</span>
              <span className="info-value">Within 24–48 hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
