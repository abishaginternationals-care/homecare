'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MagneticButton from './MagneticButton';
import {
  ShieldCheck, Clock, Users, Star, HeartHandshake,
  Stethoscope, ChevronDown, ArrowRight, CheckCircle2, Ambulance, Home
} from 'lucide-react';

// ── Data ─────────────────────────────────────────────────────────────────────

const slides = [
  { image: '/scene1.png', accent: 'rgba(106,176,76,0.15)' },
  { image: '/scene2.png', accent: 'rgba(61,26,10,0.15)' },
  { image: '/scene3.png', accent: 'rgba(106,176,76,0.12)' },
  { image: '/scene5.png', accent: 'rgba(74,138,48,0.18)' },
  { image: '/scene6.png', accent: 'rgba(61,26,10,0.12)' },
  { image: '/scene7.png', accent: 'rgba(106,176,76,0.10)' },
];

const trustBadges = [
  { icon: <ShieldCheck size={16} />, label: 'Certified Nurses' },
  { icon: <Clock size={16} />, label: '24/7 Support' },
  { icon: <HeartHandshake size={16} />, label: 'Trusted by Families' },
];

// ── Main Component ────────────────────────────────────────────────────────────

export default function CinematicHero() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const router = useRouter();

  // Slide cycling
  useEffect(() => {
    const t = setInterval(() => setSlideIndex(i => (i + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);

  // Parallax mouse tracking
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  }, []);

  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const smoothX = useSpring(parallaxX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(parallaxY, { stiffness: 50, damping: 20 });
  // Derived parallax for the right image panel
  const imgPanelX = useTransform(smoothX, v => -v * 0.4);
  const imgPanelY = useTransform(smoothY, v => -v * 0.4);

  useEffect(() => {
    parallaxX.set(mousePos.x * 8);
    parallaxY.set(mousePos.y * 8);
  }, [mousePos]);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
    >
      {/* ── Background Slides ── */}
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          animate={{ opacity: i === slideIndex ? 1 : 0 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* ── Layered Dark Overlays for Readability ── */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(20,8,2,0.88) 0%, rgba(30,12,4,0.75) 40%, rgba(10,5,2,0.45) 70%, rgba(0,0,0,0.2) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)', zIndex: 1 }} />

      {/* ── Warm Green Ambient Orbs ── */}
      <motion.div
        style={{ x: smoothX, y: smoothY, position: 'absolute', top: '10%', left: '3%', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(106,176,76,0.18) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 1, pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '5%', left: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,167,32,0.10) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 1, pointerEvents: 'none' }}
      />

      {/* ── Content Grid ── */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', paddingTop: '80px' }}>

        {/* ── LEFT: Copy ── */}
        <div>
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.08,
              marginBottom: '24px',
              textShadow: '0 4px 24px rgba(0,0,0,0.5)',
              letterSpacing: '-0.02em',
            }}
          >
            Compassionate Healthcare,{' '}
            <span style={{ color: '#6AB04C', display: 'block' }}>Delivered to Your Home</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: '1.15rem',
              color: 'rgba(255,255,255,0.80)',
              lineHeight: 1.75,
              marginBottom: '40px',
              fontWeight: 400,
              maxWidth: '520px',
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
            }}
          >
            Professional nurses, elder care, physiotherapy, and medical support designed around comfort, dignity, and trust.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}
          >
            <MagneticButton>
              <button
                onClick={() => router.push('/contact')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '16px 32px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #6AB04C, #4A8A30)',
                  color: '#fff', fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer',
                  boxShadow: '0 8px 28px rgba(106,176,76,0.45)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 40px rgba(106,176,76,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 8px 28px rgba(106,176,76,0.45)')}
              >
                Book Appointment <ArrowRight size={18} />
              </button>
            </MagneticButton>

            <MagneticButton>
              <button
                onClick={() => router.push('/services')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '16px 32px', borderRadius: '14px',
                  background: 'rgba(255,255,255,0.10)', border: '1.5px solid rgba(255,255,255,0.30)',
                  color: '#fff', fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.30)'; }}
              >
                Explore Services
              </button>
            </MagneticButton>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}
          >
            {trustBadges.map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '7px',
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '100px', padding: '7px 14px',
                  color: 'rgba(255,255,255,0.88)',
                  fontFamily: "'Nunito', sans-serif", fontSize: '0.78rem', fontWeight: 600,
                }}
              >
                <span style={{ color: '#6AB04C' }}>{badge.icon}</span>
                {badge.label}
              </motion.div>
            ))}
          </motion.div>


        </div>

        {/* ── RIGHT: Floating Visual ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          style={{ position: 'relative', height: '560px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {/* Central Image Frame */}
          <motion.div
            style={{ x: imgPanelX, y: imgPanelY }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div style={{ position: 'relative', width: '340px', height: '420px' }}>
              {/* Background glow */}
              <div style={{ position: 'absolute', inset: '-24px', borderRadius: '40px', background: 'radial-gradient(circle, rgba(106,176,76,0.25) 0%, transparent 70%)', filter: 'blur(30px)' }} />

              {/* Main image card */}
              <div style={{ width: '100%', height: '100%', borderRadius: '32px', overflow: 'hidden', border: '1.5px solid rgba(255,255,255,0.18)', boxShadow: '0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(106,176,76,0.2)' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slideIndex}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 1.6, ease: 'easeInOut' }}
                    style={{ width: '100%', height: '100%', backgroundImage: `url(${slides[slideIndex].image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  />
                </AnimatePresence>
              </div>

              {/* Slide indicator dots */}
              <div style={{ position: 'absolute', bottom: '-28px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
                {slides.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    animate={{ width: i === slideIndex ? 24 : 8, background: i === slideIndex ? '#6AB04C' : 'rgba(255,255,255,0.3)' }}
                    transition={{ duration: 0.4 }}
                    style={{ height: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer', padding: 0 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>


        </motion.div>
      </div>



      {/* ── Responsive CSS ── */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right { display: none !important; }
        }
      `}</style>
    </section>
  );
}