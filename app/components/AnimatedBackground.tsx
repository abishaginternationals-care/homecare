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
          background: linear-gradient(135deg, #EFF7E8 0%, #EAE5DC 40%, #F0EDE8 70%, #E8F3E0 100%);
        }
        /* Animated orbs */
        .ab-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0;
          animation: ab-float linear infinite;
        }
        .ab-orb-1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(106,176,76,0.38) 0%, rgba(106,176,76,0.10) 60%, transparent 100%);
          top: -200px; left: -200px;
          animation-duration: 18s;
          animation-name: ab-drift1;
        }
        .ab-orb-2 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(74,138,48,0.32) 0%, rgba(74,138,48,0.08) 60%, transparent 100%);
          bottom: -150px; right: -150px;
          animation-duration: 22s;
          animation-name: ab-drift2;
        }
        .ab-orb-3 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(61,26,10,0.14) 0%, rgba(61,26,10,0.04) 60%, transparent 100%);
          top: 30%; left: 60%;
          animation-duration: 26s;
          animation-name: ab-drift3;
        }
        .ab-orb-4 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(106,176,76,0.28) 0%, rgba(106,176,76,0.06) 60%, transparent 100%);
          top: 55%; left: 10%;
          animation-duration: 20s;
          animation-name: ab-drift4;
        }
        .ab-orb-5 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(217,160,102,0.18) 0%, rgba(217,160,102,0.05) 60%, transparent 100%);
          top: 15%; right: 15%;
          animation-duration: 24s;
          animation-name: ab-drift5;
        }

        @keyframes ab-drift1 {
          0%   { opacity:1; transform: translate(0px, 0px)   scale(1.0); }
          25%  { transform: translate(120px, 80px)  scale(1.1); }
          50%  { transform: translate(80px, 160px)  scale(0.9); }
          75%  { transform: translate(-60px, 100px) scale(1.05); }
          100% { opacity:1; transform: translate(0px, 0px)   scale(1.0); }
        }
        @keyframes ab-drift2 {
          0%   { opacity:1; transform: translate(0px, 0px)    scale(1.0); }
          25%  { transform: translate(-100px, -80px) scale(1.1); }
          50%  { transform: translate(-60px, -140px) scale(0.95); }
          75%  { transform: translate(80px, -80px)   scale(1.05); }
          100% { opacity:1; transform: translate(0px, 0px)    scale(1.0); }
        }
        @keyframes ab-drift3 {
          0%   { opacity:1; transform: translate(0px, 0px)   scale(1.0); }
          33%  { transform: translate(-80px, 60px)  scale(1.08); }
          66%  { transform: translate(100px, -50px) scale(0.92); }
          100% { opacity:1; transform: translate(0px, 0px)   scale(1.0); }
        }
        @keyframes ab-drift4 {
          0%   { opacity:1; transform: translate(0px, 0px)  scale(1.0); }
          40%  { transform: translate(90px, -70px) scale(1.1); }
          80%  { transform: translate(-50px, 90px) scale(0.9); }
          100% { opacity:1; transform: translate(0px, 0px)  scale(1.0); }
        }
        @keyframes ab-drift5 {
          0%   { opacity:1; transform: translate(0px, 0px)    scale(1.0); }
          50%  { transform: translate(-120px, 100px) scale(1.15); }
          100% { opacity:1; transform: translate(0px, 0px)    scale(1.0); }
        }

        /* Subtle grid lines */
        .ab-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(106,176,76,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(106,176,76,0.05) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        /* Diagonal shimmer beam */
        .ab-beam {
          position: absolute;
          width: 2px;
          height: 100%;
          top: 0;
          background: linear-gradient(to bottom, transparent, rgba(106,176,76,0.12), transparent);
          filter: blur(1px);
          animation: ab-beam-pulse 6s ease-in-out infinite;
        }
        .ab-beam-1 { left: 20%; animation-delay: 0s; }
        .ab-beam-2 { left: 50%; animation-delay: 2s; }
        .ab-beam-3 { left: 80%; animation-delay: 4s; }
        @keyframes ab-beam-pulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50%      { opacity: 1.0; transform: scaleY(1.0); }
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
