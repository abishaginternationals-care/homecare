'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const SCENES = [
  {
    src: '/scene1.png',
    title: 'Compassionate Home Care',
    subtitle: 'Helping our elders walk through life with dignity',
    kenBurns: 'zoom-in-right',
    pos: 'center 20%',
  },
  {
    src: '/scene2.png',
    title: 'Advanced Home ICU',
    subtitle: 'Hospital-grade care in the comfort of your home',
    kenBurns: 'zoom-in-left',
    pos: 'center 25%',
  },
  {
    src: '/scene3.png',
    title: 'Physiotherapy & Rehabilitation',
    subtitle: 'Restoring movement, restoring confidence',
    kenBurns: 'zoom-in-top',
    pos: 'center 30%',
  },
  {
    src: '/scene5.png',
    title: 'Teleconsultation Services',
    subtitle: 'Expert doctors just a tap away',
    kenBurns: 'zoom-in-left',
    pos: 'center 25%',
  },
  {
    src: '/scene6.png',
    title: 'Home Lab & Diagnostics',
    subtitle: 'Precise diagnostics at your doorstep',
    kenBurns: 'zoom-in-right',
    pos: 'center 20%',
  },
  {
    src: '/scene7.png',
    title: 'Medicine Delivery',
    subtitle: 'Your prescriptions delivered, right on time',
    kenBurns: 'zoom-in-left',
    pos: 'center 30%',
  },
];

const SCENE_DURATION    = 4500;
const TRANSITION_DURATION = 900;
const CAPTION_FADE_MS   = 350;

export default function CinematicHero() {
  const [current, setCurrent]           = useState(0);
  const [next, setNext]                 = useState<number | null>(null);
  const [captionVisible, setCaptionVisible] = useState(true);
  const [progress, setProgress]         = useState(0);
  const [titleWords, setTitleWords]     = useState<string[]>([]);
  const [wordVisible, setWordVisible]   = useState<boolean[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Split title into words for staggered animation
  useEffect(() => {
    const words = SCENES[current].title.split(' ');
    setTitleWords(words);
    setWordVisible(Array(words.length).fill(false));
    // Stagger each word in
    words.forEach((_, i) => {
      setTimeout(() => {
        setWordVisible(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 140 + 60);
    });
  }, [current]);

  const startProgressBar = () => {
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    const step = 100 / (SCENE_DURATION / 40);
    progressRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { if (progressRef.current) clearInterval(progressRef.current); return 100; }
        return p + step;
      });
    }, 40);
  };

  const startCycle = (from: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const nextIdx = (from + 1) % SCENES.length;

      // 1. Fade caption out quickly
      setCaptionVisible(false);

      // 2. Start cross-fade to next image
      setTimeout(() => {
        setNext(nextIdx);
      }, CAPTION_FADE_MS + 50);

      // 3. Swap current, clear next, show caption
      setTimeout(() => {
        setCurrent(nextIdx);
        setNext(null);
        setTimeout(() => setCaptionVisible(true), 80);
        startProgressBar();
        startCycle(nextIdx);
      }, TRANSITION_DURATION);
    }, SCENE_DURATION);
  };

  useEffect(() => {
    startCycle(current);
    startProgressBar();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className="relative mx-auto overflow-hidden"
      style={{
        height: '80vh',
        minHeight: '460px',
        maxHeight: '720px',
        width: '98%',
        marginTop: '12px',
        borderRadius: '24px',
        boxShadow: '0 12px 48px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      {/* ── Scene layers ── */}
      {SCENES.map((scene, idx) => {
        const isCurrent = idx === current;
        const isNext    = idx === next;
        if (!isCurrent && !isNext) return null;

        return (
          <div
            key={idx}
            className="absolute inset-0"
            style={{
              zIndex: isNext ? 2 : 1,
              opacity: isNext ? 1 : 1,
              transition: isNext
                ? `opacity ${TRANSITION_DURATION}ms ease-in-out`
                : undefined,
            }}
          >
            <div
              className={`ken-burns-${scene.kenBurns}`}
              style={{
                position: 'absolute',
                inset: 0,
                animationDuration: `${SCENE_DURATION + TRANSITION_DURATION}ms`,
              }}
            >
              <Image
                src={scene.src}
                alt={scene.title}
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: scene.pos,
                }}
                priority={idx === 0 || idx === 1}
                sizes="100vw"
              />
            </div>
          </div>
        );
      })}

      {/* ── Rich gradient overlays ── */}
      {/* Bottom vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 30%, transparent 45%, rgba(0,0,0,0.82) 100%)',
        }}
      />
      {/* Left vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.42) 0%, transparent 60%)',
        }}
      />
      {/* Green accent glow at bottom left */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{
          bottom: 0,
          left: 0,
          width: '40%',
          height: '35%',
          background: 'radial-gradient(ellipse at bottom left, rgba(106,176,76,0.12) 0%, transparent 70%)',
        }}
      />

      {/* ── Caption — word-by-word stagger ── */}
      <div
        className="absolute z-30 left-0 right-0 px-8 sm:px-16 lg:px-28"
        style={{
          bottom: '16%',
          transition: `opacity ${CAPTION_FADE_MS}ms ease-in-out`,
          opacity: captionVisible ? 1 : 0,
          willChange: 'opacity',
        }}
      >
        {/* Scene label */}
        <div style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: '0.65rem',
          fontWeight: 800,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: '#6AB04C',
          marginBottom: '12px',
          opacity: captionVisible ? 1 : 0,
          transition: `opacity ${CAPTION_FADE_MS}ms ease-in-out 0.1s`,
        }}>
          Abishag Home Health Services
        </div>

        {/* Word-by-word title */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em', marginBottom: '0.5rem', perspective: '800px' }}>
          {titleWords.map((word, i) => (
            <span
              key={`${current}-${i}`}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.8rem, 4.2vw, 3.4rem)',
                fontWeight: 700,
                color: '#ffffff',
                textShadow: '0 2px 28px rgba(0,0,0,0.72)',
                lineHeight: 1.1,
                letterSpacing: '0.01em',
                display: 'inline-block',
                opacity: wordVisible[i] ? 1 : 0,
                transform: wordVisible[i] ? 'translateY(0) rotateX(0deg)' : 'translateY(24px) rotateX(40deg)',
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.55s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.1}s`,
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Subtitle slide-up */}
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: 'clamp(0.9rem, 1.7vw, 1.15rem)',
            color: 'rgba(255,255,255,0.88)',
            fontWeight: 400,
            textShadow: '0 1px 12px rgba(0,0,0,0.6)',
            letterSpacing: '0.02em',
            opacity: captionVisible ? 1 : 0,
            transform: captionVisible ? 'translateX(0)' : 'translateX(-16px)',
            transition: `opacity ${CAPTION_FADE_MS + 100}ms ease-in-out 0.35s, transform ${CAPTION_FADE_MS + 100}ms ease ${0.35}s`,
          }}
        >
          {SCENES[current].subtitle}
        </p>
      </div>

      {/* ── Animated progress bar ── */}
      <div
        className="absolute z-30"
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'rgba(255,255,255,0.12)',
          borderRadius: '0 0 24px 24px',
        }}
      >
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(to right, #6AB04C, #4ABED6)',
          borderRadius: '0 0 0 24px',
          transition: 'width 0.04s linear',
          boxShadow: '0 0 8px rgba(106,176,76,0.6)',
        }} />
      </div>

      {/* ── Dot indicators ── */}
      <div
        className="absolute z-30 flex items-center gap-2"
        style={{ bottom: '5.5%', right: '6%' }}
      >
        {SCENES.map((_, idx) => (
          <div
            key={idx}
            style={{
              width:  idx === current ? '28px' : '6px',
              height: '5px',
              borderRadius: '9999px',
              background: idx === current ? '#6AB04C' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.45s cubic-bezier(0.34,1.56,0.64,1)',
              boxShadow: idx === current ? '0 0 8px rgba(106,176,76,0.7)' : 'none',
            }}
          />
        ))}
      </div>


    </section>
  );
}
