'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MagneticButton from './MagneticButton';
import {
  ShieldCheck, Clock, Users, Star, HeartHandshake,
  Stethoscope, ChevronDown, ArrowRight, CheckCircle2, Ambulance, Home
} from 'lucide-react';

// ── Data ─────────────────────────────────────────────────────────────────────

const slides = [
  { image: '/scene1.webp', accent: 'rgba(106,176,76,0.15)' },
  { image: '/scene2.webp', accent: 'rgba(61,26,10,0.15)' },
  { image: '/scene3.webp', accent: 'rgba(106,176,76,0.12)' },
  { image: '/scene5.webp', accent: 'rgba(74,138,48,0.18)' },
  { image: '/scene6.webp', accent: 'rgba(61,26,10,0.12)' },
  { image: '/scene7.webp', accent: 'rgba(106,176,76,0.10)' },
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
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const router = useRouter();

  // Slide cycling
  useEffect(() => {
    const t = setInterval(() => {
      setHasTransitioned(true);
      setSlideIndex(i => (i + 1) % slides.length);
    }, 4500);
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
    setIsMounted(true);
    setIsMobileDevice(window.innerWidth < 900);
    const handleResize = () => {
      setIsMobileDevice(window.innerWidth < 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    parallaxX.set(mousePos.x * 8);
    parallaxY.set(mousePos.y * 8);
  }, [mousePos]);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      role="region"
      aria-label="Hero banner — Abishag Home Health Services"
      style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
    >
      {/* ── Background Slides ── */}
      {slides.map((slide, i) => {
        const isActive = i === slideIndex;
        const isPrev = hasTransitioned && i === (slideIndex - 1 + slides.length) % slides.length;
        if (!isActive && !isPrev) return null;

        return (
          <motion.div
            key={i}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
            style={{
              position: 'absolute', inset: 0,
              zIndex: 0
            }}
          >
            <Image
              src={slide.image}
              alt={`Abishag Home Health Services and Elderly Care in Chennai - Slide ${i + 1}`}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority={i === 0}
            />
          </motion.div>
        );
      })}

      {/* ── Layered Dark Overlays for Readability ── */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(20,8,2,0.88) 0%, rgba(30,12,4,0.75) 40%, rgba(10,5,2,0.45) 70%, rgba(0,0,0,0.2) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)', zIndex: 1 }} />

      {/* ── Warm Green Ambient Orbs ── */}
      <motion.div
        style={{ x: smoothX, y: smoothY, position: 'absolute', top: '10%', left: '3%', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(106,176,76,0.18) 0%, transparent 70%)', zIndex: 1, pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '5%', left: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,167,32,0.10) 0%, transparent 70%)', zIndex: 1, pointerEvents: 'none' }}
      />

      {/* ── Content Grid ── */}
      <div className="hero-grid" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', paddingTop: '80px' }}>

        {/* ── LEFT: Copy ── */}
        <div>
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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
            <span className="sr-only">Abishag Home Health Services and Elderly Care - </span>
            Care That Feels{' '}
            <span style={{ color: '#6AB04C', display: 'block' }}>Like Family</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.82)',
              lineHeight: 1.75,
              marginBottom: '36px',
              fontWeight: 400,
              maxWidth: '520px',
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
            }}
          >
            Expert <strong style={{ color: '#A8E07A' }}>Nursing Care</strong>, <strong style={{ color: '#A8E07A' }}>Patient Care</strong>, <strong style={{ color: '#A8E07A' }}>ICU Setup</strong>, <strong style={{ color: '#A8E07A' }}>Doctor Visits</strong> &amp; <strong style={{ color: '#A8E07A' }}>Physiotherapy</strong> — delivered with compassion, right at your doorstep.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '36px' }}
          >
            {/* Call Now */}
            <MagneticButton>
              <a
                href="tel:+919940179079"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '15px 28px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #6AB04C, #4A8A30)',
                  color: '#fff', fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800, fontSize: '1rem', textDecoration: 'none',
                  boxShadow: '0 8px 28px rgba(106,176,76,0.45)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 40px rgba(106,176,76,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 8px 28px rgba(106,176,76,0.45)')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Call Now
              </a>
            </MagneticButton>

            {/* WhatsApp */}
            <MagneticButton>
              <a
                href="https://wa.me/917397390266"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '15px 28px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #6AB04C, #4A8A30)',
                  color: '#fff', fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800, fontSize: '1rem', textDecoration: 'none',
                  boxShadow: '0 8px 28px rgba(106,176,76,0.45)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 40px rgba(106,176,76,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 8px 28px rgba(106,176,76,0.45)')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </MagneticButton>

            {/* Explore Services */}
            <MagneticButton>
              <button
                onClick={() => router.push('/services')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '15px 28px', borderRadius: '14px',
                  background: 'rgba(255,255,255,0.10)', border: '1.5px solid rgba(255,255,255,0.30)',
                  color: '#fff', fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.30)'; }}
              >
                Explore Services <ArrowRight size={16} />
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
        {isMounted && !isMobileDevice && (
          <motion.div
            className="hero-right"
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
                <div style={{ width: '100%', height: '100%', borderRadius: '32px', overflow: 'hidden', border: '1.5px solid rgba(255,255,255,0.18)', boxShadow: '0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(106,176,76,0.2)', position: 'relative' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slideIndex}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 1.6, ease: 'easeInOut' }}
                      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
                    >
                      <Image
                        src={slides[slideIndex].image}
                        alt="Compassionate Home Nursing and Elderly Care Professional"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Slide indicator dots */}
                <div style={{ position: 'absolute', bottom: '-28px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
                  {slides.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      animate={{ width: i === slideIndex ? 24 : 8, background: i === slideIndex ? '#6AB04C' : 'rgba(255,255,255,0.3)' }}
                      transition={{ duration: 0.4 }}
                      style={{ height: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer', padding: 0 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
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