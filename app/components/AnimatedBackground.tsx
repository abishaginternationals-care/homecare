'use client';

export default function AnimatedBackground() {
  return (
    <>
      <style>{`
        .ab-root {
          position: fixed;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
          background: linear-gradient(135deg, #EBF5E0 0%, #E8E3DA 40%, #EDF0E6 70%, #E6F2DC 100%);
          /* Isolate layer for performance */
          contain: strict;
        }

        .ab-orb {
          position: absolute;
          border-radius: 50%;
          /* Force hardware acceleration and composite layer */
          will-change: transform;
          transform: translateZ(0);
          /* Reduced blur radius for significantly better performance */
          filter: blur(40px);
        }

        /* Large bold green orb — top left */
        .ab-orb-1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(106,176,76,0.45) 0%, rgba(106,176,76,0.15) 45%, transparent 70%);
          top: -150px; left: -150px;
          animation: ab-drift1 20s ease-in-out infinite alternate;
        }
        /* Large bold green orb — bottom right */
        .ab-orb-2 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(74,138,48,0.40) 0%, rgba(74,138,48,0.15) 45%, transparent 70%);
          bottom: -100px; right: -100px;
          animation: ab-drift2 24s ease-in-out infinite alternate;
        }
        /* Brown warm orb — center */
        .ab-orb-3 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(61,26,10,0.15) 0%, rgba(61,26,10,0.05) 45%, transparent 70%);
          top: 35%; left: 55%;
          animation: ab-drift3 28s ease-in-out infinite alternate;
        }
        /* Amber orb — top right */
        .ab-orb-4 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(200,140,60,0.20) 0%, rgba(200,140,60,0.05) 45%, transparent 70%);
          top: 5%; right: 5%;
          animation: ab-drift4 22s ease-in-out infinite alternate;
        }

        /* Simplified drift animations utilizing translate3d to avoid layout thrashing */
        @keyframes ab-drift1 {
          0%   { transform: translate3d(0px, 0px, 0) scale(1.0); }
          100% { transform: translate3d(80px, 120px, 0) scale(1.05); }
        }
        @keyframes ab-drift2 {
          0%   { transform: translate3d(0px, 0px, 0) scale(1.0); }
          100% { transform: translate3d(-90px, -110px, 0) scale(0.95); }
        }
        @keyframes ab-drift3 {
          0%   { transform: translate3d(0px, 0px, 0); }
          100% { transform: translate3d(-100px, 80px, 0); }
        }
        @keyframes ab-drift4 {
          0%   { transform: translate3d(0px, 0px, 0); }
          100% { transform: translate3d(-130px, 60px, 0); }
        }

        /* Subtle green grid overlay — static */
        .ab-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(106,176,76,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(106,176,76,0.05) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        /* Disable animations entirely if user prefers reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .ab-orb-1, .ab-orb-2, .ab-orb-3, .ab-orb-4 {
            animation: none !important;
          }
        }
      `}</style>

      <div className="ab-root">
        <div className="ab-orb ab-orb-1" />
        <div className="ab-orb ab-orb-2" />
        <div className="ab-orb ab-orb-3" />
        <div className="ab-orb ab-orb-4" />
        <div className="ab-grid" />
      </div>
    </>
  );
}
