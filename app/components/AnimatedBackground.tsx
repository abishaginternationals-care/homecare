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
        }

        .ab-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
        }

        /* Large bold green orb — top left */
        .ab-orb-1 {
          width: 750px; height: 750px;
          background: radial-gradient(circle, rgba(106,176,76,0.55) 0%, rgba(106,176,76,0.25) 40%, transparent 70%);
          top: -150px; left: -150px;
          animation: ab-drift1 16s ease-in-out infinite;
        }
        /* Large bold green orb — bottom right */
        .ab-orb-2 {
          width: 650px; height: 650px;
          background: radial-gradient(circle, rgba(74,138,48,0.50) 0%, rgba(74,138,48,0.20) 40%, transparent 70%);
          bottom: -100px; right: -100px;
          animation: ab-drift2 20s ease-in-out infinite;
        }
        /* Brown warm orb — center */
        .ab-orb-3 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(61,26,10,0.22) 0%, rgba(61,26,10,0.08) 40%, transparent 70%);
          top: 35%; left: 55%;
          animation: ab-drift3 24s ease-in-out infinite;
        }
        /* Mid-left green */
        .ab-orb-4 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(106,176,76,0.45) 0%, rgba(106,176,76,0.15) 40%, transparent 70%);
          top: 50%; left: 0%;
          animation: ab-drift4 18s ease-in-out infinite;
        }
        /* Top-right amber */
        .ab-orb-5 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(200,140,60,0.30) 0%, rgba(200,140,60,0.10) 40%, transparent 70%);
          top: 5%; right: 5%;
          animation: ab-drift5 22s ease-in-out infinite;
        }

        @keyframes ab-drift1 {
          0%, 100% { transform: translate(0px, 0px) scale(1.0); }
          25%       { transform: translate(140px, 100px) scale(1.12); }
          50%       { transform: translate(90px, 180px) scale(0.92); }
          75%       { transform: translate(-70px, 120px) scale(1.06); }
        }
        @keyframes ab-drift2 {
          0%, 100% { transform: translate(0px, 0px) scale(1.0); }
          25%       { transform: translate(-120px, -90px) scale(1.12); }
          50%       { transform: translate(-80px, -160px) scale(0.90); }
          75%       { transform: translate(90px, -90px) scale(1.08); }
        }
        @keyframes ab-drift3 {
          0%, 100% { transform: translate(0px, 0px); }
          33%       { transform: translate(-90px, 70px); }
          66%       { transform: translate(110px, -60px); }
        }
        @keyframes ab-drift4 {
          0%, 100% { transform: translate(0px, 0px); }
          40%       { transform: translate(100px, -80px); }
          80%       { transform: translate(-60px, 100px); }
        }
        @keyframes ab-drift5 {
          0%, 100% { transform: translate(0px, 0px); }
          50%       { transform: translate(-140px, 120px); }
        }

        /* Subtle green grid overlay */
        .ab-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(106,176,76,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(106,176,76,0.07) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        /* Pulsing vertical beams */
        .ab-beam {
          position: absolute;
          width: 250px;
          height: 100%;
          top: 0;
          background: linear-gradient(to bottom,
            transparent 0%,
            rgba(106,176,76,0.12) 30%,
            rgba(106,176,76,0.18) 50%,
            rgba(106,176,76,0.12) 70%,
            transparent 100%
          );
          filter: blur(25px);
          animation: ab-beam-pulse 8s ease-in-out infinite;
        }
        .ab-beam-1 { left: 15%; animation-delay: 0s; }
        .ab-beam-2 { left: 55%; animation-delay: 3s; }
        .ab-beam-3 { right: 10%; animation-delay: 6s; }

        @keyframes ab-beam-pulse {
          0%, 100% { opacity: 0.4; transform: scaleX(0.7); }
          50%       { opacity: 1.0; transform: scaleX(1.4); }
        }
      `}</style>

      <div className="ab-root">
        <div className="ab-orb ab-orb-1" />
        <div className="ab-orb ab-orb-2" />
        <div className="ab-orb ab-orb-3" />
        <div className="ab-orb ab-orb-4" />
        <div className="ab-orb ab-orb-5" />
        <div className="ab-grid" />
        <div className="ab-beam ab-beam-1" />
        <div className="ab-beam ab-beam-2" />
        <div className="ab-beam ab-beam-3" />
      </div>
    </>
  );
}
