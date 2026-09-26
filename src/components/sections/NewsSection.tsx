import { useState } from 'react'
import { NEWS_DATA } from '../../data'

export function NewsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section className="content-section" id="news">
      <div className="section-header-bar">
        <h2 className="section-title font-display">NEWS</h2>
      </div>

      <div className="rammstein-news-list">
        {NEWS_DATA.map((item) => {
          const isExpanded = hoveredId === item.id

          return (
            <article
              key={item.id}
              className={`rammstein-news-row ${isExpanded ? 'active' : ''}`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setHoveredId(hoveredId === item.id ? null : item.id)}
              tabIndex={0}
              onFocus={() => setHoveredId(item.id)}
              onBlur={() => setHoveredId(null)}
            >
              <h3 className="rammstein-news-title font-display">
                {item.headline}
              </h3>

              <p className="rammstein-news-text font-ui">
                {item.content}
              </p>

              {/* Photo smoothly reveals underneath on hover */}
              <div className={`rammstein-news-photo-drawer ${isExpanded ? 'open' : ''}`}>
                <div className="rammstein-photo-container">
                  <img
                    src={item.previewImage}
                    alt={item.headline}
                    className="rammstein-news-img"
                    loading="lazy"
                  />
                  <div className="rammstein-photo-overlay" />
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
