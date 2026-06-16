'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import CinematicHero from './components/CinematicHero';
import IntroAnimation from './components/IntroAnimation';
import { UserCheck, ShieldCheck, HeartHandshake, ArrowRight,
  Stethoscope, HeartPulse } from 'lucide-react';
import Link from 'next/link';

import Card3D from './components/Card3D';
import MagneticButton from './components/MagneticButton';
import { useScrollReveal } from './hooks/useScrollReveal';
import ServiceRowReveal from './components/ServiceRowReveal';
import AnimatedUnderline from './components/AnimatedUnderline';

export default function Home() {
  useScrollReveal();
  // ... (rest of the component state remains same)
  // ── Intro animation state ──
  const [introDone, setIntroDone] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setIntroDone(true);
    }
    const t = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  const handleIntroComplete = () => {
    setIntroDone(true);
    sessionStorage.setItem('hasSeenIntro', 'true');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('introComplete'));
    }
  };

  const whyUs = [
    { title: 'Verified & Trained Staff', desc: 'All caregivers are background-verified, certified, and trained to deliver exceptional home healthcare.', icon: <UserCheck size={28} /> },
    { title: 'Experienced Nurses', desc: 'Our nursing team brings years of clinical expertise to your doorstep, ensuring safe, skilled care.', icon: <Stethoscope size={28} /> },
    { title: 'Emergency Support', desc: '24/7 emergency assistance and rapid response to ensure your family is never alone in a crisis.', icon: <HeartPulse size={28} /> },
    { title: 'Services Across Tamil Nadu', desc: 'Serving families across Chennai and Tamil Nadu with reliable, consistent home health services.', icon: <ShieldCheck size={28} /> },
    { title: 'Home Visit Support', desc: 'Doctor and nurse home visits designed for comfort and convenience — care comes to you, every time.', icon: <HeartHandshake size={28} /> },
  ];

  const previewServices = [
    {
      id: 1,
      title: 'Patient Care Assistant',
      desc: 'Trained assistants for daily care, hygiene, mobility support, and compassionate companionship at home.',
      image: '/images/Abishag_img/1. Caregiver Services.webp',
    },
    {
      id: 2,
      title: 'Nursing Care',
      desc: 'Skilled nurses for wound care, medication management, IV therapy, and post-operative home recovery.',
      image: '/images/Abishag_img/2. Nursing Services.webp',
    },
    {
      id: 3,
      title: 'Doctor Visit at Home',
      desc: 'Qualified doctors visiting your home for consultations, health assessments, and treatment plans.',
      image: '/images/Abishag_img/6. Nurse Visit (On-demand).webp',
    },
    {
      id: 4,
      title: 'Physiotherapy at Home',
      desc: 'Expert physiotherapists for rehabilitation, pain management, stroke recovery, and mobility training.',
      image: '/images/Abishag_img/5. Allied Health Visit.webp',
    },
    {
      id: 5,
      title: 'Speech Therapy',
      desc: 'Professional speech therapists helping patients recover communication and swallowing abilities at home.',
      image: '/images/Abishag_img/16. Mental Health Counseling.webp',
    },
    {
      id: 6,
      title: 'ICU Setup at Home',
      desc: 'Full ICU-grade equipment setup and trained ICU nurses for critical care patients in the comfort of home.',
      image: '/images/Abishag_img/10. ICU Setup at Home.webp',
    },
    {
      id: 7,
      title: 'Equipment Rental & Sales',
      desc: 'Hospital beds, wheelchairs, oxygen concentrators, suction machines and more — rented or purchased.',
      image: '/images/Abishag_img/9. Medical Equipment Setup.webp',
    },
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    if (introDone && typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash;
      const id = decodeURIComponent(hash.replace('#', ''));
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, [introDone]);

  return (
    <>

      {/* â”€â”€ INTRO ANIMATION â”€â”€ */}
      {isMounted && !introDone && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}

      {/* â”€â”€ PREMIUM HERO â”€â”€ */}
      <CinematicHero />

      {/* â”€â”€ EXISTING SECTIONS BELOW â”€â”€ */}
      <div ref={containerRef} style={{ position: 'relative' }}>
      {/* ── SECTION 1: Welcome to Abishag — CUBE BG ON (canvas shows through) ── */}
      <section className="py-24 md:py-32" style={{ background: 'rgba(255,255,255,0.4)', position: 'relative' }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image with float effect */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div style={{ borderRadius: '32px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(61,26,10,0.15)', position: 'relative' }}>
              <motion.img 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6 }}
                src="/images/welcome_caregiver_new.webp" 
                alt="Compassionate elderly care" 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </motion.div>

          {/* Right Column: Text & Buttons */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 700,
                color: '#3D1A0A',
                lineHeight: 1.1,
                marginBottom: '28px',
              }}
              className="text-raise"
            >
              Welcome to{' '}
              <span style={{ color: '#6AB04C' }}>Abishag</span>
            </h2>
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: '1.1rem',
                color: '#5C3D2A',
                lineHeight: 1.8,
                marginBottom: '40px',
                fontWeight: 400,
              }}
            >
              At Abishag, we believe that every senior deserves to age with dignity, comfort, and joy. Our dedicated team of healthcare professionals and caregivers provides personalized, compassionate home health services tailored to your loved ones' unique needs.
            </p>
            <div className="flex flex-wrap gap-5">
              <MagneticButton>
                <Link
                  href="/services"
                  className="px-10 py-5 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: '#6AB04C',
                    boxShadow: '0 10px 25px rgba(106,176,76,0.3)',
                    textDecoration: 'none',
                    display: 'block'
                  }}
                >
                  Our Services
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/about"
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 700,
                    display: 'block',
                    padding: '20px 40px',
                    borderRadius: '12px',
                    border: '2px solid #3D1A0A',
                    color: '#3D1A0A',
                    background: 'transparent',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    transition: 'background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = '#3D1A0A';
                    el.style.color = '#ffffff';
                    el.style.boxShadow = '0 10px 25px rgba(61,26,10,0.25)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'transparent';
                    el.style.color = '#3D1A0A';
                    el.style.boxShadow = 'none';
                  }}
                >
                  About Us
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>



      {/* ── SECTION 2: Our Specialized Care — CUBE BG OFF (plain wave) ── */}
      <section className="py-24 md:py-32 plain-section-wave" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 reveal"
          >
            <div style={{ margin: '0 auto', width: 'fit-content' }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                  fontWeight: 700,
                  color: '#3D1A0A',
                  marginBottom: '4px',
                }}
                className="text-raise"
              >
                Our <span style={{ color: '#6AB04C' }}>Specialized</span> Care
              </h2>
              <AnimatedUnderline delay={0.4} />
            </div>
          </motion.div>

          <ServiceRowReveal rowIndex={0} cols={3}>
            {previewServices.map((svc) => (
              <Link
                key={svc.id}
                href="/services"
                className="group block h-full"
                style={{ textDecoration: 'none' }}
              >
              <Card3D style={{ borderRadius: '24px', height: '100%' }}>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.75)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      borderTop: '6px solid #6AB04C',
                      border: '1px solid rgba(255,255,255,0.60)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={svc.image}
                        alt={svc.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                      />
                    </div>
                    <div className="p-8 flex-grow">
                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '1.6rem',
                          fontWeight: 700,
                          color: '#3D1A0A',
                          marginBottom: '12px',
                          transition: 'color 0.3s',
                        }}
                      >
                        {svc.title}
                      </h3>
                      <p style={{ fontFamily: "'Nunito', sans-serif", color: '#5C3D2A', fontSize: '1rem', lineHeight: 1.7 }}>
                        {svc.desc}
                      </p>
                    </div>
                  </div>
                </Card3D>
              </Link>
            ))}
          </ServiceRowReveal>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-3 font-bold text-[#3D1A0A] hover:text-[#6AB04C] transition-all duration-300 group"
              style={{ fontSize: '1.1rem', textDecoration: 'none' }}
            >
              <span>View All Services</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: Why Choose Abishag? ── */}
      <section id="why-choose-us" className="py-24 md:py-32" style={{ background: 'rgba(255,255,255,0.4)', position: 'relative' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div style={{ margin: '0 auto', width: 'fit-content' }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                  fontWeight: 700,
                  color: '#3D1A0A',
                  marginBottom: '4px',
                }}
                className="text-raise"
              >
                Why <span style={{ color: '#6AB04C' }}>Choose</span> Abishag?
              </h2>
              <AnimatedUnderline delay={0.4} />
            </div>
          </motion.div>

          {/* Row 1: 3 cards */}
          <ServiceRowReveal rowIndex={0} cols={3}>
            {whyUs.slice(0, 3).map((feature, index) => (
              <Card3D key={index} className="h-full" style={{ borderRadius: '24px', height: '100%' }}>
                <div
                  style={{
                    background: '#F9F7F4',
                    borderRadius: '24px',
                    padding: '40px 32px',
                    borderTop: '6px solid #6AB04C',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    height: '100%',
                  }}
                >
                  <div style={{ 
                    background: 'linear-gradient(135deg, #EAF5E0, #D5EDCA)', 
                    width: '68px', 
                    height: '68px', 
                    borderRadius: '20px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#4A8A30',
                    boxShadow: '0 8px 20px rgba(106,176,76,0.2)',
                  }}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '12px', lineHeight: 1.2 }}>{feature.title}</h3>
                    <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '1rem', color: '#5C3D2A', lineHeight: 1.7 }}>{feature.desc}</p>
                  </div>
                </div>
              </Card3D>
            ))}
          </ServiceRowReveal>

          {/* Row 2: 2 cards centered on desktop */}
          <div className="lg:max-w-[66%] mx-auto w-full">
            <ServiceRowReveal rowIndex={1} cols={2}>
              {whyUs.slice(3).map((feature, index) => (
                <Card3D key={index} className="h-full" style={{ borderRadius: '24px', height: '100%' }}>
                  <div
                    style={{
                      background: '#F9F7F4',
                      borderRadius: '24px',
                      padding: '40px 32px',
                      borderTop: '6px solid #6AB04C',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '24px',
                      height: '100%',
                    }}
                  >
                    <div style={{ 
                      background: 'linear-gradient(135deg, #EAF5E0, #D5EDCA)', 
                      width: '68px', 
                      height: '68px', 
                      borderRadius: '20px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#4A8A30',
                      boxShadow: '0 8px 20px rgba(106,176,76,0.2)',
                    }}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '12px', lineHeight: 1.2 }}>{feature.title}</h3>
                      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '1rem', color: '#5C3D2A', lineHeight: 1.7 }}>{feature.desc}</p>
                    </div>
                  </div>
                </Card3D>
              ))}
            </ServiceRowReveal>
          </div>
        </div>
      </section>


      {/* â”€â”€ CTA â”€â”€ */}
      <section className="py-10 md:py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3D1A0A] via-[#6B3020] to-[#4A8A30]" />
        
        {/* Animated Background Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full filter blur-[150px] pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#6AB04C] rounded-full filter blur-[120px] pointer-events-none" 
        />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-raise"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '16px',
              lineHeight: 1.15,
            }}
          >
            Ready to Join Our <br /> Caring Community?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '28px',
              fontWeight: 300,
            }}
          >
            Contact us today to learn more about our services and schedule a personalized visit for your family.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <MagneticButton>
              <Link
                href="/about"
                className="px-8 py-4 bg-white text-[#3D1A0A] font-extrabold text-base rounded-xl shadow-2xl hover:bg-[#6AB04C] hover:text-white transition-all duration-300 hover:scale-105 inline-block"
                style={{ textDecoration: 'none' }}
              >
                Get Started Today
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
}

