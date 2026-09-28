interface FooterProps {
  scrollTo: (id: string) => void
}

export function Footer({ scrollTo }: FooterProps) {
  return (
    <footer className="main-footer">
      <div className="footer-inner">
        <div className="footer-top-row">
          <div className="footer-wordmark font-logo">
            PARACORPSE
          </div>
          <button onClick={() => scrollTo('portal')} className="back-to-top-btn font-mono">
            <span>RETURN TO TOP ↑</span>
          </button>
        </div>

        <div className="footer-links-grid font-mono">
          <div>
            <div className="footer-col-title">NAVIGATION</div>
            <ul className="footer-link-list">
              <li><button onClick={() => scrollTo('news')}>NEWS</button></li>
              <li><button onClick={() => scrollTo('join')}>JOIN A BAND</button></li>
              <li><button onClick={() => scrollTo('about')}>ABOUT US</button></li>
              <li><button onClick={() => scrollTo('contact')}>CONTACT US</button></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">RECRUITMENT</div>
            <ul className="footer-link-list">
              <li><button onClick={() => scrollTo('join')}>RHYTHM GUITARIST</button></li>
              <li><button onClick={() => scrollTo('join')}>LEAD GUITARIST</button></li>
              <li><button onClick={() => scrollTo('join')}>VOCALIST</button></li>
              <li style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                MIASS (AGE 15+)
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">OFFICIAL LINKS</div>
            <ul className="footer-link-list">
              <li>
                <a href="https://tiktok.com/@paracorpse" target="_blank" rel="noopener noreferrer">
                  TIK TOK ↗
                </a>
              </li>
              <li>
                <a href="https://instagram.com/paracorpseband" target="_blank" rel="noopener noreferrer">
                  INSTAGRAM ↗
                </a>
              </li>
              <li>
                <a href="https://vk.ru/paracorpse" target="_blank" rel="noopener noreferrer">
                  VK ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">CONTACT &amp; LOCATION</div>
            <ul className="footer-link-list">
              <li>
                <a href="mailto:paracorpse0@gmail.com">
                  PARACORPSE0@GMAIL.COM
                </a>
              </li>
              <li style={{ color: 'var(--text-muted)' }}>
                MIASS, SOUTH URAL
              </li>
              <li style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                RUSSIAN FEDERATION
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-meta font-mono">
          <div>© {new Date().getFullYear()} PARACORPSE. ALL RIGHTS RESERVED.</div>
        </div>
      </div>
    </footer>
  )
}
