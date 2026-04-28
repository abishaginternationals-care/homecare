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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  },
};

import Card3D from '../components/Card3D';
import MagneticButton from '../components/MagneticButton';
import { useScrollReveal } from '../hooks/useScrollReveal';

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
        className="py-24 md:py-32"
        style={{
          background: 'linear-gradient(135deg, #3D1A0A 0%, #6B3020 55%, #4A8A30 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated Background Elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
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
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(3rem, 7vw, 4.5rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: '20px',
            }}
            className="text-raise"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: '1.15rem',
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 300,
              maxWidth: '600px',
              lineHeight: 1.6,
            }}
          >
            Comprehensive care services designed to enhance the quality of life for our elderly residents with compassion and excellence.
          </motion.p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
            {servicesData.map((service, index) => (
              <motion.div key={service.id} variants={itemVariants}>
                <Link
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
                      background: '#ffffff',
                      borderRadius: '24px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      border: '1px solid rgba(221, 213, 204, 0.5)',
                      boxShadow: '0 10px 40px rgba(61,26,10,0.05)',
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
                      <img
                        src={service.image}
                        alt={service.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.6s ease',
                        }}
                        className="group-hover:[transform:scale(1.06)]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-8 flex-grow flex flex-col">
                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: '#3D1A0A',
                          marginBottom: '14px',
                          transition: 'color 0.3s ease',
                        }}
                        className="group-hover:text-[#6AB04C]"
                      >
                        {service.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Nunito', sans-serif",
                          color: '#5C3D2A',
                          fontSize: '1rem',
                          lineHeight: 1.7,
                          marginBottom: '24px',
                        }}
                      >
                        {service.description}
                      </p>

                      {/* More Details Button */}
                      <div style={{ marginTop: 'auto' }}>
                        <span className="inline-flex items-center gap-2 font-bold text-[#6AB04C] transition-all duration-300 group-hover:gap-3">
                          <span style={{ fontSize: '0.95rem' }}>View Details</span>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
        </motion.div>
      </section>

      {/* ── Service Highlights ── */}
      <section style={{ background: '#ffffff', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3D1A0A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 700,
                color: '#3D1A0A',
              }}
              className="text-raise"
            >
              Why Choose Our Care?
            </h2>
            <div className="w-24 h-1 bg-[#6AB04C] mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {highlights.map(({ title, desc, points }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
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
          background: 'linear-gradient(135deg, #2D2873 0%, #3D1A0A 100%)',
          padding: '100px 0',
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
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '24px',
              lineHeight: 1.1,
            }}
          >
            Ready to Experience <br /> the Abundance of Life?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontFamily: "'Nunito', sans-serif", fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginBottom: '48px', fontWeight: 300 }}
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
                className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-[#3D1A0A] transition-all duration-300 bg-white rounded-xl hover:bg-[#6AB04C] hover:text-white"
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
