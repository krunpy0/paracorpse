import { useState } from "react";
import type { NewsItem } from "../../types";
import { SITE_CONTENT, resolveMediaUrl } from "../../data";

interface NewsSectionProps {
  news?: NewsItem[];
}

export function NewsSection({ news = SITE_CONTENT.news }: NewsSectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!news || news.length === 0) {
    return null;
  }

  return (
    <section className="content-section" id="news">
      <div className="section-header-bar">
        <h2 className="section-title font-display">NEWS</h2>
      </div>

      <div className="rammstein-news-list">
        {news.map((item) => {
          const isExpanded = hoveredId === item.id;
          const imageUrl = resolveMediaUrl(item.previewImage);

          return (
            <article
              key={item.id}
              className={`rammstein-news-row ${isExpanded ? "active" : ""}`}
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

              <p className="rammstein-news-text font-ui">{item.content}</p>

              {/* Photo smoothly reveals underneath on hover if photo exists */}
              {imageUrl && (
                <div
                  className={`rammstein-news-photo-drawer ${
                    isExpanded ? "open" : ""
                  }`}
                >
                  <div className="rammstein-photo-container">
                    <img
                      src={imageUrl}
                      alt={item.headline}
                      className="rammstein-news-img"
                      loading="lazy"
                    />
                    <div className="rammstein-photo-overlay" />
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
