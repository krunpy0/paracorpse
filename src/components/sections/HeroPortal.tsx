import liveStageImg from "../../assets/live-stage.jpg";

interface HeroPortalProps {
  scrollProgress: number;
  scrollTo: (id: string) => void;
}

export function HeroPortal({ scrollProgress, scrollTo }: HeroPortalProps) {
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
            backgroundImage: `url(${liveStageImg})`,
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
          <h1 className="portal-logo-text font-logo">PARACORPSE</h1>
        </div>

        {/* Minimal Scroll Cue */}
        <div
          className="portal-scroll-indicator"
          style={{
            opacity: Math.max(1 - scrollProgress * 2.8, 0),
          }}
          onClick={() => scrollTo("news")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") scrollTo("news");
          }}
          aria-label="Scroll to News"
        >
          <span className="portal-scroll-label font-mono">SCROLL</span>
          <div className="portal-scroll-line">
            <span className="portal-scroll-runner" />
          </div>
        </div>
      </div>
    </div>
  );
}
