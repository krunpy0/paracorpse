import type { HeroContent } from "../../types";
import { SITE_CONTENT } from "../../data";

interface HeroPortalProps {
  scrollProgress: number;
  scrollTo: (id: string) => void;
  hero?: HeroContent;
}

export function HeroPortal({
  scrollProgress,
  scrollTo: _scrollTo,
  hero = SITE_CONTENT.hero,
}: HeroPortalProps) {
  // Gentle parallax and subtle fade as the content sheet slides up over the hero
  const textTranslateY = scrollProgress * 50;
  const textOpacity = Math.max(1 - scrollProgress * 1.15, 0);
  const bgScale = 1 + scrollProgress * 0.05;

  return (
    <div className="portal-wrapper" id="portal">
      <div className="portal-chamber">
        {/* Atmospheric darkened concert / stage background */}
        <div
          className="portal-bg-layer"
          style={{
            transform: `scale(${bgScale})`,
          }}
        />

        {/* Ambient Darkening & Radial Vignette */}
        <div className="portal-dark-overlay" />

        {/* Soft bottom gradient to blend into the rising content sheet */}
        <div className="portal-bottom-gradient" />

        {/* Centered Monolithic Logo that stays elegant as page scrolls */}
        <div
          className="portal-logo-center"
          style={{
            transform: `translateY(${textTranslateY}px)`,
            opacity: textOpacity,
          }}
        >
          <h1 className="portal-logo-text font-logo">{hero.title}</h1>
        </div>
      </div>
    </div>
  );
}
