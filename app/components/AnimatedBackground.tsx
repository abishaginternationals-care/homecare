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

        .ab-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }

        .ab-orb-1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(106,176,76,0.40) 0%, rgba(106,176,76,0.15) 50%, transparent 100%);
          top: -200px; left: -200px;
          animation: ab-drift1 18s ease-in-out infinite;
        }
        .ab-orb-2 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(74,138,48,0.35) 0%, rgba(74,138,48,0.10) 50%, transparent 100%);
          bottom: -150px; right: -150px;
          animation: ab-drift2 22s ease-in-out infinite;
        }
        .ab-orb-3 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(61,26,10,0.16) 0%, rgba(61,26,10,0.05) 50%, transparent 100%);
          top: 30%; left: 60%;
          animation: ab-drift3 26s ease-in-out infinite;
        }
        .ab-orb-4 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(106,176,76,0.30) 0%, rgba(106,176,76,0.08) 50%, transparent 100%);
          top: 55%; left: 5%;
          animation: ab-drift4 20s ease-in-out infinite;
        }
        .ab-orb-5 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(217,160,102,0.22) 0%, rgba(217,160,102,0.06) 50%, transparent 100%);
          top: 10%; right: 10%;
          animation: ab-drift5 24s ease-in-out infinite;
        }

        @keyframes ab-drift1 {
          0%, 100% { transform: translate(0px, 0px)    scale(1.0); }
          25%       { transform: translate(120px, 80px)  scale(1.1); }
          50%       { transform: translate(80px, 160px)  scale(0.9); }
          75%       { transform: translate(-60px, 100px) scale(1.05); }
        }
        @keyframes ab-drift2 {
          0%, 100% { transform: translate(0px, 0px)     scale(1.0); }
          25%       { transform: translate(-100px, -80px) scale(1.1); }
          50%       { transform: translate(-60px, -140px) scale(0.95); }
          75%       { transform: translate(80px, -80px)   scale(1.05); }
        }
        @keyframes ab-drift3 {
          0%, 100% { transform: translate(0px, 0px);   }
          33%       { transform: translate(-80px, 60px); }
          66%       { transform: translate(100px, -50px);}
        }
        @keyframes ab-drift4 {
          0%, 100% { transform: translate(0px, 0px);  }
          40%       { transform: translate(90px, -70px); }
          80%       { transform: translate(-50px, 90px); }
        }
        @keyframes ab-drift5 {
          0%, 100% { transform: translate(0px, 0px);     }
          50%       { transform: translate(-120px, 100px); }
        }

        .ab-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(106,176,76,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(106,176,76,0.06) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        .ab-beam {
          position: absolute;
          width: 200px;
          height: 100%;
          top: 0;
          background: linear-gradient(to bottom,
            transparent 0%,
            rgba(106,176,76,0.08) 30%,
            rgba(106,176,76,0.12) 50%,
            rgba(106,176,76,0.08) 70%,
            transparent 100%
          );
          filter: blur(20px);
          animation: ab-beam-pulse 8s ease-in-out infinite;
        }
        .ab-beam-1 { left: 15%; animation-delay: 0s; }
        .ab-beam-2 { left: 55%; animation-delay: 3s; }
        .ab-beam-3 { right: 10%; animation-delay: 6s; }

        @keyframes ab-beam-pulse {
          0%, 100% { opacity: 0.3; transform: scaleX(0.7); }
          50%       { opacity: 1.0; transform: scaleX(1.3); }
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
