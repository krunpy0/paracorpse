import liveStageImg from "../../assets/live-stage.jpg";

interface HeroPortalProps {
  scrollProgress: number;
  scrollTo: (id: string) => void;
}

export function HeroPortal({ scrollProgress, scrollTo: _scrollTo }: HeroPortalProps) {
  const portalScale = 1 + scrollProgress * 8;
  const portalOpacity = Math.max(1 - scrollProgress * 1.3, 0);
  const revealOpacity = Math.min(0.2 + scrollProgress * 0.5, 0.75);

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
            transform: `scale(${1.08 - scrollProgress * 0.08})`,
          }}
        />
      </div>
    </div>
  );
}
