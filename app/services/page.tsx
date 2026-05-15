'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { servicesData } from '../data/services';
const highlights = [
  {
    title: "Flexible Scheduling",
    desc: "We offer flexible enrollment options including full-day, half-day, and customized schedules to meet the unique needs of each family.",
    points: ["Full-day programs", "Half-day programs", "Customized schedules", "Weekend services available"],
  },
  {
    title: "Qualified Staff",
    desc: "Our team consists of trained healthcare professionals and caregivers committed to providing excellent care and support.",
    points: ["Certified caregivers", "Healthcare professionals", "Regular training programs", "Background-verified staff"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

const imageRevealVariants = {
  hidden: { scale: 1.4, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

import Card3D from '../components/Card3D';
import MagneticButton from '../components/MagneticButton';
import { useScrollReveal } from '../hooks/useScrollReveal';
import EcgHeartbeatWidget from '../components/EcgHeartbeatWidget';
import ServiceRowReveal from '../components/ServiceRowReveal';
import AnimatedUnderline from '../components/AnimatedUnderline';

export default function Services() {
  useScrollReveal();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    setIsVisible(true);
  }, []);


  return (
    <div ref={containerRef} style={{ minHeight: '100vh', overflow: 'hidden', position: 'relative', background: 'transparent' }}>

      <div className="relative z-10">

      {/* ── Page Header ── */}
      <section
        className="py-8 md:py-12"
        style={{
          background: 'linear-gradient(135deg, rgba(61, 26, 10, 0.85) 0%, rgba(107, 48, 32, 0.85) 55%, rgba(74, 138, 48, 0.85) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated Background Elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 0.4 }}
          className="absolute inset-0 pointer-events-none"
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.03, 0.08, 0.03],
              x: [0, -40, 0],
              y: [0, 60, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-[#6AB04C] rounded-full filter blur-3xl" 
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Left: existing title + subtitle — untouched */}
            <div>
              <div style={{ overflow: 'hidden', paddingBottom: '10px' }}>
                <motion.h1
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.1,
                    marginBottom: '10px',
                  }}
                  className="text-raise"
                >
                  Our Services
                </motion.h1>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <motion.p
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.85)',
                    fontWeight: 300,
                    maxWidth: '600px',
                    lineHeight: 1.5,
                  }}
                >
                  Comprehensive care services designed to enhance the quality of life for our elderly residents with compassion and excellence.
                </motion.p>
              </div>
            </div>

            {/* Right: live ECG heartbeat + HandShake icon */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: '140px' }}
            >
              <EcgHeartbeatWidget direction="rtl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <div className="relative w-full" style={{ overflow: 'hidden' }}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          {/* Chunk services into rows of 3, each row gets its own ECG animation */}
          {(() => {
            const rows: (typeof servicesData)[] = [];
            for (let i = 0; i < servicesData.length; i += 3) {
              rows.push(servicesData.slice(i, i + 3));
            }
            return rows.map((row, rowIdx) => (
              <ServiceRowReveal key={rowIdx} rowIndex={rowIdx}>
                {row.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group block h-full"
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = (e.clientX - rect.left) / rect.width - 0.5;
                        const y = (e.clientY - rect.top) / rect.height - 0.5;
                        e.currentTarget.style.transform = `perspective(800px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) translateZ(12px) scale(1.02)`;
                        e.currentTarget.style.boxShadow = 'inset 0 0 0 1.5px rgba(106,176,76,0.4), 0 24px 52px rgba(61,26,10,0.18)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 10px 40px rgba(61,26,10,0.05)';
                      }}
                      style={{
                        background: 'rgba(255,255,255,0.72)',
                        backdropFilter: 'blur(14px)',
                        WebkitBackdropFilter: 'blur(14px)',
                        borderRadius: '24px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid rgba(255,255,255,0.60)',
                        boxShadow: '0 10px 40px rgba(61,26,10,0.08)',
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'transform 0.1s ease, box-shadow 0.3s ease',
                        willChange: 'transform',
                      }}
                    >
                      {/* Accent Line */}
                      <div style={{ height: '6px', width: '100%', background: 'linear-gradient(90deg, #6AB04C, #4ABED6)' }} />

                      {/* Service Image */}
                      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                        <motion.img
                          variants={imageRevealVariants}
                          src={service.image}
                          alt={service.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          className="transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Content */}
                      <div className="p-8 flex-grow flex flex-col" style={{ alignItems: 'center' }}>

                        {/* Centred title + animated underline */}
                        <div style={{ margin: '0 auto', width: 'fit-content', textAlign: 'center', marginBottom: '16px' }}>
                          <h3
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                              fontSize: '1.5rem',
                              fontWeight: 700,
                              color: '#3D1A0A',
                              marginBottom: '4px',
                              transition: 'color 0.3s ease',
                              textAlign: 'center',
                            }}
                            className="group-hover:text-[#6AB04C]"
                          >
                            {service.title}
                          </h3>
                          <AnimatedUnderline delay={0.25} height={2} />
                        </div>

                        <p
                          style={{
                            fontFamily: "'Nunito', sans-serif",
                            color: '#5C3D2A',
                            fontSize: '1rem',
                            lineHeight: 1.7,
                            marginBottom: '24px',
                            textAlign: 'center',
                          }}
                        >
                          {service.description}
                        </p>

                        {/* Glassmorphic "View Details" button */}
                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '10px 26px',
                              borderRadius: '50px',
                              background: 'linear-gradient(135deg, #6AB04C, #4A8A30)',
                              border: 'none',
                              boxShadow: '0 6px 20px rgba(106,176,76,0.35)',
                              color: '#ffffff',
                              fontFamily: "'Nunito', sans-serif",
                              fontWeight: 700,
                              fontSize: '0.95rem',
                              transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                            }}
                            onMouseEnter={e => {
                              const el = e.currentTarget as HTMLElement;
                              el.style.boxShadow = '0 10px 28px rgba(106,176,76,0.50)';
                              el.style.transform = 'translateY(-2px) scale(1.04)';
                            }}
                            onMouseLeave={e => {
                              const el = e.currentTarget as HTMLElement;
                              el.style.boxShadow = '0 6px 20px rgba(106,176,76,0.35)';
                              el.style.transform = 'translateY(0) scale(1)';
                            }}
                          >
                            View Details
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </ServiceRowReveal>
            ));
          })()}
        </section>
      </div>

      {/* ── Service Highlights ── */}
      {/* ── Service Highlights — CUBE BG OFF (plain wave) ── */}
      <section className="plain-section-wave" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3D1A0A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="text-center mb-16"
          >
            <div style={{ overflow: 'hidden', paddingBottom: '10px' }}>
              <motion.div
                variants={{
                  hidden: { y: "100%", opacity: 0 },
                  visible: { y: "0%", opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                style={{ margin: '0 auto', width: 'fit-content' }}
              >
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    fontWeight: 700,
                    color: '#3D1A0A',
                    marginBottom: '4px',
                  }}
                  className="text-raise"
                >
                  Why <span style={{ color: '#6AB04C' }}>Choose</span> Our Care?
                </h2>
                <AnimatedUnderline delay={0.5} />
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {highlights.map(({ title, desc, points }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: '#F4F1ED',
                  borderRadius: '24px',
                  padding: '48px',
                  borderLeft: '8px solid #3D1A0A',
                  boxShadow: '0 10px 30px rgba(61,26,10,0.04)',
                  position: 'relative',
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.85rem',
                    fontWeight: 700,
                    color: '#3D1A0A',
                    marginBottom: '16px',
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontFamily: "'Nunito', sans-serif", color: '#5C3D2A', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '24px' }}>
                  {desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {points.map(pt => (
                    <motion.li 
                      key={pt} 
                      whileHover={{ x: 5 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: "'Nunito', sans-serif", color: '#5C3D2A', fontSize: '1rem' }}
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#6AB04C]/10 flex items-center justify-center text-[#6AB04C] text-xs">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      {pt}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: 'linear-gradient(135deg, rgba(45, 40, 115, 0.85) 0%, rgba(61, 26, 10, 0.85) 100%)',
          padding: '56px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 pointer-events-none opacity-20"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6AB04C] rounded-full filter blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4ABED6] rounded-full filter blur-[100px] mix-blend-screen" />
        </motion.div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '14px',
              lineHeight: 1.15,
            }}
          >
            Ready to Experience <br /> the Abundance of Life?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontFamily: "'Nunito', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '28px', fontWeight: 300 }}
          >
            Join our community and let us provide the professional care your loved ones deserve.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MagneticButton>
              <Link
                href="/about"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-[#3D1A0A] transition-all duration-300 bg-white rounded-xl hover:bg-[#6AB04C] hover:text-white"
                style={{
                  textDecoration: 'none',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                  display: 'block'
                }}
              >
                <span className="relative z-10 text-lg">Schedule a Consultation</span>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
  );
}
