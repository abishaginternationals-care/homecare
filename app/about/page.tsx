'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { UserCheck, ClipboardCheck, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

const coreValues = [
  { id: 1, title: "Compassion", icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/></svg>, description: "We care for our residents with empathy and genuine concern for their wellbeing.", color: "#6AB04C" },
  { id: 2, title: "Excellence", icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, description: "We maintain high standards in all aspects of our care delivery.", color: "#4ABED6" },
  { id: 3, title: "Respect", icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>, description: "We honor the dignity and autonomy of every individual in our care.", color: "#3D1A0A" },
  { id: 4, title: "Growth", icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>, description: "We foster continuous improvement and personal development.", color: "#2D2873" },
];

const whyUs = [
  { title: "Professional & Trained Staff", desc: "All team members are trained, certified, and dedicated to providing exceptional care.", icon: <UserCheck size={28} /> },
  { title: "Personalized Care Plans", desc: "We develop individualized care plans tailored to each resident's specific needs and preferences.", icon: <ClipboardCheck size={28} /> },
  { title: "Safe & Comfortable Facility", desc: "Our center is equipped with modern amenities and safety features designed for elderly care.", icon: <ShieldCheck size={28} /> },
  { title: "Family-Centric Approach", desc: "We maintain open communication with families and involve them in care decisions.", icon: <HeartHandshake size={28} /> },
];

import Card3D from '../components/Card3D';
import MagneticButton from '../components/MagneticButton';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ServiceRowReveal from '../components/ServiceRowReveal';
import EcgHeartbeatWidget from '../components/EcgHeartbeatWidget';

export default function About() {
  useScrollReveal();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Medical Heart + cross icon for the About ECG widget
  const medicalHeartIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="46"
      height="46"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6AB04C"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: 'drop-shadow(0 0 8px rgba(106,176,76,0.7))' }}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <line x1="12" y1="7" x2="12" y2="13" />
      <line x1="9" y1="10" x2="15" y2="10" />
    </svg>
  );

  return (
    <div ref={containerRef} style={{ minHeight: '100vh', overflow: 'hidden', position: 'relative', background: 'transparent' }}>

      <div className="relative z-10">

      {/* ── Page Header ── */}
      <section
        className="py-24 md:py-32"
        style={{
          background: 'linear-gradient(135deg, #2D2873 0%, #3D1A0A 55%, #6B3020 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2, delay: 0.4 }}
          className="absolute inset-0 pointer-events-none"
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
              x: [0, 30, 0],
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute top-0 left-0 w-[500px] h-[500px] bg-white rounded-full filter blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.1, 0.05],
              x: [0, -40, 0],
            }}
            transition={{ duration: 18, repeat: Infinity }}
            className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#6AB04C] rounded-full filter blur-[100px]" 
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: existing text */}
            <div>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                style={{
                  fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '0.8rem',
                  letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6AB04C',
                  marginBottom: '16px',
                }}
              >
                Abundance of Life
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(3rem, 7vw, 4.5rem)', fontWeight: 700,
                  color: '#ffffff', lineHeight: 1.1, marginBottom: '24px',
                }}
                className="text-raise"
              >
                About Abishag
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                style={{
                  fontFamily: "'Nunito', sans-serif", fontSize: '1.2rem',
                  color: 'rgba(255,255,255,0.85)', fontWeight: 300, maxWidth: '600px',
                  lineHeight: 1.6
                }}
              >
                Our journey, values, and unwavering commitment to providing the highest quality of home health services.
              </motion.p>
            </div>

            {/* Right: ECG Widget */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: '220px' }}
            >
              <EcgHeartbeatWidget icon={medicalHeartIcon} label="Health · Dignity · Life" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Image with reveal effect */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Card3D>
              <div style={{
                position: 'relative',
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(61,26,10,0.12)',
              }}>
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src="/images/elderly-care-about.png"
                  alt="Compassionate elderly care"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </div>
            </Card3D>
            {/* Decorative element */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'absolute',
                top: '-30px',
                left: '-30px',
                width: '150px',
                height: '150px',
                border: '2px dashed #6AB04C',
                opacity: 0.3,
                borderRadius: '50%',
                zIndex: -1
              }} 
            />
          </motion.div>

          {/* Right Side: Text */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#3D1A0A',
              marginBottom: '32px',
              lineHeight: 1.1
            }} className="text-raise">
              Our Mission to <br /> <span className="text-[#6AB04C]">Transform Lives</span>
            </h2>
            <div className="space-y-6">
              {[
                "Abishag was founded with a simple yet powerful mission: to provide compassionate, professional care for elderly individuals while preserving their dignity and independence.",
                "We believe that aging is a natural part of life, and every senior deserves to live with respect, comfort, and access to quality healthcare services.",
                "Our team works tirelessly to create an environment where our residents can thrive, maintain meaningful relationships, and enjoy their daily lives to the fullest.",
              ].map((text, i) => (
                <p key={i} style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: '1.1rem',
                  color: '#5C3D2A',
                  lineHeight: 1.8,
                  fontWeight: 400
                }}>
                  {text}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-24 md:py-32" style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(10px)', position: 'relative', overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ServiceRowReveal rowIndex={0} cols={2}>
            {[
              { title: "Our Mission", text: "To provide exceptional, compassionate daycare services that enhance the quality of life for elderly individuals through professional care, engaging activities, and a supportive community.", accent: '#6AB04C' },
              { title: "Our Vision", text: "To be the most trusted and respected elderly daycare center in the community, known for our commitment to excellence, innovation in care delivery, and genuine love for our residents.", accent: '#2D2873' },
            ].map(({ title, text, accent }) => (
              <div
                key={title}
                style={{
                  background: '#F4F1ED',
                  borderRadius: '24px',
                  padding: '48px',
                  borderTop: `8px solid ${accent}`,
                  boxShadow: '0 10px 30px rgba(61,26,10,0.04)',
                }}
              >
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '20px' }}>
                  {title}
                </h3>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '1.1rem', color: '#5C3D2A', lineHeight: 1.8 }}>
                  {text}
                </p>
              </div>
            ))}
          </ServiceRowReveal>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 text-raise"
        >
          <h2 style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            fontWeight: 700, 
            color: '#3D1A0A' 
          }}>
            Our Core Values
          </h2>
          <div className="w-24 h-1 bg-[#6AB04C] mx-auto mt-4 rounded-full" />
        </motion.div>

        <ServiceRowReveal rowIndex={0} cols={4}>
          {coreValues.map((value) => (
            <Card3D key={value.id}>
              <div
                style={{
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  borderRadius: '24px',
                  padding: '40px 32px',
                  textAlign: 'center',
                  borderTop: `6px solid ${value.color}`,
                  boxShadow: '0 15px 40px rgba(61,26,10,0.07)',
                  border: '1px solid rgba(255,255,255,0.60)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <div style={{ marginBottom: '24px', background: `${value.color}10`, width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: value.color }}>
                  {value.icon}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '14px' }}>{value.title}</h3>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.95rem', color: '#5C3D2A', lineHeight: 1.7 }}>
                  {value.description}
                </p>
              </div>
            </Card3D>
          ))}
        </ServiceRowReveal>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            fontWeight: 700, 
            color: '#3D1A0A' 
          }}>
            Why Families Trust Us
          </h2>
        </motion.div>

        <ServiceRowReveal rowIndex={1} cols={4}>
          {whyUs.map((feature, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                borderRadius: '24px',
                padding: '40px 32px',
                borderTop: '6px solid #6AB04C',
                border: '1px solid rgba(255,255,255,0.60)',
                boxShadow: '0 10px 30px rgba(61,26,10,0.07)',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                height: '100%',
              }}
            >
              <div style={{ background: '#EAF5E0', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6AB04C' }}>
                {feature.icon}
              </div>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '12px' }}>{feature.title}</h3>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.95rem', color: '#5C3D2A', lineHeight: 1.7 }}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </ServiceRowReveal>
      </section>

      {/* ── Contact CTA ── */}
      <section className="py-24 md:py-32" style={{ background: 'linear-gradient(135deg, #3D1A0A 0%, #2D2873 100%)', position: 'relative', overflow: 'hidden' }}>
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 pointer-events-none opacity-20"
        >
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full filter blur-[120px]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6AB04C] rounded-full filter blur-[100px]" />
        </motion.div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
              fontWeight: 700, 
              color: '#ffffff', 
              marginBottom: '24px',
              lineHeight: 1.1
            }}
          >
            Experience the <br /> <span className="text-[#6AB04C]">Abundance of Life</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ 
              fontFamily: "'Nunito', sans-serif", 
              fontSize: '1.25rem', 
              color: 'rgba(255,255,255,0.85)', 
              marginBottom: '48px', 
              fontWeight: 300 
            }}
          >
            We are here to support you and your loved ones every step of the way.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <MagneticButton>
              <a
                href="mailto:contact@abishag.com"
                className="px-12 py-6 bg-white text-[#3D1A0A] font-extrabold text-xl rounded-2xl shadow-2xl hover:bg-[#6AB04C] hover:text-white transition-all duration-300 hover:scale-105 inline-block"
                style={{ textDecoration: 'none' }}
              >
                Contact Us Today
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
  );
}
