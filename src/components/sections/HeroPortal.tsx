import liveStageImg from "../../assets/live-stage.jpg";

interface HeroPortalProps {
  scrollProgress: number;
  scrollTo: (id: string) => void;
}

export function HeroPortal({ scrollProgress, scrollTo: _scrollTo }: HeroPortalProps) {
  const portalScale = 1 + scrollProgress * 10;
  const portalOpacity = Math.max(1 - scrollProgress * 1.4, 0);
  const revealOpacity = Math.min(scrollProgress * 1.5, 0.7);

  return (
    <div className="portal-wrapper" id="portal">
      <div className="portal-chamber">
        {/* Centered Monolithic Logo that scales during scroll */}
        <div
          className="portal-logo-center"
          style={{
            transform: `scale(${portalScale})`,
            opacity: portalOpacity,
          }}
        >
          <h1 className="portal-logo-text font-logo">PARACORPSE</h1>
        </div>

        {/* Background atmosphere revealed during pass-through */}
        <div
          className="portal-reveal-layer"
          style={{
            backgroundImage: `url(${liveStageImg})`,
            opacity: revealOpacity,
            transform: `scale(${1.1 - scrollProgress * 0.1})`,
          }}
        />
      </div>
    </div>
  );
}
