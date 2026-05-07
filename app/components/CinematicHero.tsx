'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MagneticButton from "./MagneticButton";
import EcgDoodleTransition from "./EcgDoodleTransition";

const slides = [
  {
    title: "Compassionate Care at Home",
    subtitle: "Trusted healthcare services for families across Tamil Nadu",
    image: "/scene1.png",
  },
  {
    title: "Advanced Home ICU",
    subtitle: "Hospital-grade care in the comfort of your home",
    image: "/scene2.png",
  },
  {
    title: "Physiotherapy & Rehabilitation",
    subtitle: "Restoring movement, restoring confidence",
    image: "/scene3.png",
  },
  {
    title: "Teleconsultation Services",
    subtitle: "Expert doctors just a tap away",
    image: "/scene5.png",
  },
  {
    title: "Home Lab & Diagnostics",
    subtitle: "Precise diagnostics at your doorstep",
    image: "/scene6.png",
  },
  {
    title: "Medicine Delivery",
    subtitle: "Your prescriptions delivered, right on time",
    image: "/scene7.png",
  },
];

export default function CinematicHero() {
  const [index, setIndex] = useState(0);
  const [showDoodle, setShowDoodle] = useState(true);
  const [doodleKey, setDoodleKey] = useState(0);
  const [showText, setShowText] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const i = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
      setShowDoodle(true);
      setShowText(false);
      setDoodleKey((k) => k + 1);
    }, 8000);
    return () => clearInterval(i);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative flex items-center justify-center overflow-hidden"
      style={{
        height: 'calc(100vh - 85px)',
        minHeight: '600px',
        width: '100%',
        marginTop: '0',
        borderRadius: '0',
        boxShadow: '0 12px 48px rgba(0,0,0,0.18)',
      }}
    >
      {/* 🌄 Background Images with smooth crossfade */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-in-out ${
            i === index
              ? showDoodle
                ? 'opacity-0 scale-100'          // hidden while doodle plays
                : 'opacity-100 scale-105'         // revealed after doodle
              : 'opacity-0 scale-100'
          }`}
          style={{ backgroundImage: `url(${s.image})` }}
        />
      ))}

      {/* ✨ ECG Doodle Transition overlay */}
      {showDoodle && (
        <EcgDoodleTransition
          key={doodleKey}
          slideIndex={index}
          onComplete={() => {
            setShowDoodle(false);
            // Wait for image fade-in to start (400ms), then reveal text
            setTimeout(() => setShowText(true), 400);
          }}
        />
      )}

      {/* 🎨 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3D1A0A]/60 via-black/40 to-black/70" />

      {/* 🌿 Decorative Traditional Pattern */}
      {/* Removed kolam-pattern since we might not have the image, using CSS pattern instead */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
        backgroundSize: `20px 20px`
      }} />

      {/* 🌞 Soft Warm Glow - reduced blur */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#6AB04C]/15 blur-[60px]" />

      {/* ✨ PREMIUM 3D EFFECTS — purely decorative, no functional impact ✨ */}

      {/* Scanline texture — subtle depth */}
      <div className="hero-scanlines absolute inset-0 z-[3]" style={{ opacity: 0.35 }} />

      {/* Aurora orbs — brand-colored volumetric light blobs */}
      <div className="hero-aurora-orb absolute z-[4]"
        style={{
          width: 560, height: 560, top: '-12%', right: '-6%',
          background: 'radial-gradient(circle, rgba(106,176,76,0.30) 0%, rgba(74,190,214,0.12) 55%, transparent 78%)',
          animationDuration: '14s',
        }} />
      <div className="hero-aurora-orb absolute z-[4]"
        style={{
          width: 400, height: 400, bottom: '4%', right: '14%',
          background: 'radial-gradient(circle, rgba(61,26,10,0.24) 0%, rgba(106,176,76,0.10) 60%, transparent 80%)',
          animationDuration: '19s', animationDelay: '-6s',
        }} />
      <div className="hero-aurora-orb absolute z-[4]"
        style={{
          width: 280, height: 280, top: '32%', left: '58%',
          background: 'radial-gradient(circle, rgba(74,190,214,0.20) 0%, transparent 72%)',
          animationDuration: '11s', animationDelay: '-3s',
        }} />

      {/* Light ray sweeps — cinematic lens flare */}
      <div className="hero-light-ray z-[5]"
        style={{ '--ray-delay': '0s' } as React.CSSProperties} />
      <div className="hero-light-ray z-[5]"
        style={{
          '--ray-delay': '3s', width: '18%',
          background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.04),rgba(255,255,255,0.08),rgba(255,255,255,0.04),transparent)',
        } as React.CSSProperties} />

      {/* Holographic 3D spinning rings — right-side depth anchor */}
      <div className="hero-holo-ring z-[5]"
        style={{
          width: 440, height: 440,
          top: '50%', right: '7%', marginTop: -220,
          borderColor: 'rgba(106,176,76,0.24)',
          boxShadow: '0 0 32px rgba(106,176,76,0.12), inset 0 0 32px rgba(106,176,76,0.06)',
          '--spin-dur': '13s',
        } as React.CSSProperties} />
      <div className="hero-holo-ring z-[5]"
        style={{
          width: 290, height: 290,
          top: '50%', right: '11%', marginTop: -145,
          borderColor: 'rgba(74,190,214,0.20)',
          boxShadow: '0 0 20px rgba(74,190,214,0.10)',
          '--spin-dur': '9s', animationDirection: 'reverse',
        } as React.CSSProperties} />
      <div className="hero-holo-ring z-[5]"
        style={{
          width: 160, height: 160,
          top: '50%', right: '15%', marginTop: -80,
          borderColor: 'rgba(255,255,255,0.14)',
          '--spin-dur': '5s',
        } as React.CSSProperties} />

      {/* Star glints — 10 scattered twinkle particles */}
      {([
        { top: '12%', left: '22%', dur: '2.8s', delay: '0s',   sz: 6 },
        { top: '28%', left: '48%', dur: '3.5s', delay: '1.2s', sz: 4 },
        { top: '60%', left: '35%', dur: '4.1s', delay: '0.6s', sz: 5 },
        { top: '18%', left: '70%', dur: '2.4s', delay: '2.1s', sz: 7 },
        { top: '75%', left: '55%', dur: '3.8s', delay: '0.3s', sz: 4 },
      ] as const).map((g, gi) => (
        <div key={gi} className="hero-glint absolute z-[6]"
          style={{
            top: g.top, left: g.left,
            width: g.sz, height: g.sz,
            '--dur': g.dur,
            '--delay': g.delay,
          } as React.CSSProperties}
        >
          <div style={{
            position: 'absolute', inset: 0,
            background: '#ffffff',
            clipPath: 'polygon(50% 0%,55% 45%,100% 50%,55% 55%,50% 100%,45% 55%,0% 50%,45% 45%)',
            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.9))',
          }} />
        </div>
      ))}

      {/* Floating depth accent lines — 3D architectural feel */}
      <div className="hero-depth-layer absolute z-[5]"
        style={{
          top: '18%', right: '6%', width: 180, height: 1,
          background: 'linear-gradient(90deg,transparent,rgba(106,176,76,0.65),transparent)',
          '--float-dur': '6s', '--float-delay': '0s',
        } as React.CSSProperties} />
      <div className="hero-depth-layer absolute z-[5]"
        style={{
          top: '22%', right: '6%', width: 100, height: 1,
          background: 'linear-gradient(90deg,transparent,rgba(74,190,214,0.45),transparent)',
          '--float-dur': '8s', '--float-delay': '-2s',
        } as React.CSSProperties} />
      <div className="hero-depth-layer absolute z-[5]"
        style={{
          bottom: '28%', right: '8%', width: 140, height: 1,
          background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.32),transparent)',
          '--float-dur': '7s', '--float-delay': '-4s',
        } as React.CSSProperties} />

      {/* Glassy pulsing corner badge - removed backdropFilter */}
      <div className="absolute top-8 right-8 z-[6]" style={{ pointerEvents: 'none' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(106,176,76,0.38) 0%,rgba(74,190,214,0.16) 58%,transparent 80%)',
          border: '1px solid rgba(106,176,76,0.32)',
          boxShadow: '0 0 24px rgba(106,176,76,0.28), 0 0 60px rgba(74,190,214,0.14)',
          animation: 'glowPulseGreen 3s ease-in-out infinite',
        }} />
      </div>

      {/* ✨ END PREMIUM EFFECTS ✨ */}

      {/* 🧡 Content (Bottom Left) — only visible after doodle + image reveal */}
      {showText && (
      <div key={`content-${index}`} className="absolute bottom-14 left-12 z-20 max-w-3xl text-left pl-6" style={{ borderLeft: '4px solid #6AB04C' }}>

        {/* ✨ Trust badge — springs in from left */}
        <div
          className="opacity-0 animate-[heroBadgeIn_0.65s_cubic-bezier(0.34,1.56,0.64,1)_forwards] mb-4 inline-flex items-center gap-2"
          style={{ animationDelay: '0.05s' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(61, 26, 10, 0.45)', /* Darker semi-transparent background instead of blur */
            border: '1px solid rgba(106,176,76,0.38)',
            borderRadius: 999,
            padding: '5px 16px',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#6AB04C',
              display: 'inline-block',
              boxShadow: '0 0 10px rgba(106,176,76,0.9)',
              animation: 'glowPulseGreen 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: 11, letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.88)',
              fontWeight: 700, textTransform: 'uppercase',
            }}>
              Trusted Home Healthcare
            </span>
          </div>
        </div>

        {/* Title — per-word 3D flip reveal with blur */}
        <h1
          className="text-4xl md:text-5xl md:text-[4rem] mb-3 leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: '#ffffff',
            perspective: '800px',
            perspectiveOrigin: 'left center',
            animation: `heroTitleGlow 4s ease-in-out ${slide.title.split(' ').length * 0.14 + 0.8}s infinite`,
          }}
        >
          {slide.title.split(" ").map((word, i) => (
            <span
              key={i}
              className="inline-block opacity-0 animate-[heroCharIn_0.7s_cubic-bezier(0.22,1,0.36,1)_forwards]"
              style={{
                animationDelay: `${0.2 + i * 0.14}s`,
                display: 'inline-block',
                transformStyle: 'preserve-3d',
              }}
            >
              {word}&nbsp;
            </span>
          ))}
        </h1>

        {/* ✨ Animated gradient accent line */}
        <div className="mb-5" style={{ overflow: 'hidden', height: 3 }}>
          <div
            className="opacity-0 animate-[heroAccentLine_0.9s_ease_forwards]"
            style={{
              height: 2,
              background: 'linear-gradient(90deg, #6AB04C, rgba(74,190,214,0.7), transparent)',
              borderRadius: 2,
              animationDelay: `${0.2 + slide.title.split(' ').length * 0.14 + 0.15}s`,
            }}
          />
        </div>

        {/* Subtitle — per-word perspective slide-in from left */}
        <p
          className="text-lg md:text-xl font-light text-white mb-8"
          style={{
            fontFamily: "'Nunito', sans-serif",
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
            perspective: '600px',
          }}
        >
          {slide.subtitle.split(" ").map((word, i) => (
            <span
              key={i}
              className="inline-block opacity-0 animate-[heroWordIn_0.55s_ease_forwards]"
              style={{
                animationDelay: `${0.2 + slide.title.split(' ').length * 0.14 + 0.45 + i * 0.07}s`,
                transformStyle: 'preserve-3d',
              }}
            >
              {word}&nbsp;
            </span>
          ))}
        </p>

      </div>
      )} {/* end showText */}

      {/* Progress Bar — hidden */}
      <div key={`progress-${index}`} className="absolute bottom-0 left-0 h-[3px] w-full z-20" style={{ opacity: 0, pointerEvents: 'none' }}></div>
    </section>
  );
}
