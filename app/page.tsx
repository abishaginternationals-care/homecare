'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import CinematicHero from './components/CinematicHero';
import IntroAnimation from './components/IntroAnimation';
import AnimatedBackground from './components/AnimatedBackground';
import { getReviews, addReview, type Review } from './actions';
import { UserCheck, ClipboardCheck, ShieldCheck, HeartHandshake, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

import Card3D from './components/Card3D';
import MagneticButton from './components/MagneticButton';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function Home() {
  useScrollReveal();
  // ... (rest of the component state remains same)
  // ── Intro animation state ──
  const [introDone, setIntroDone] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // ── Review state ──
  const [reviews, setReviews] = useState<Review[]>([]);
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(0);
  const [formText, setFormText] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [dbStatus, setDbStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');

  useEffect(() => {
    // Fetch reviews on mount
    getReviews().then((data) => {
      if (data && 'error' in data && data.error === 'no_connection_string') {
        setDbStatus('disconnected');
        // Fallback data
        setReviews([
          { name: 'Priya Ramachandran', rating: 5, text: 'Abishag transformed my mother\'s daily life. The caregiver assigned was patient, professional, and treated her like family. We are truly grateful.', date: 'April 2026' },
          { name: 'Karthik Sundaram', rating: 5, text: 'The nursing team is exceptional. Their attention to detail with medication management gave our entire family peace of mind. Highly recommended.', date: 'March 2026' },
        ]);
      } else if (Array.isArray(data) && data.length > 0) {
        setDbStatus('connected');
        setReviews(data);
      } else {
        setDbStatus('connected');
        if (Array.isArray(data) && data.length === 0) {
           setReviews([
            { name: 'Priya Ramachandran', rating: 5, text: 'Abishag transformed my mother\'s daily life. The caregiver assigned was patient, professional, and treated her like family. We are truly grateful.', date: 'April 2026' },
            { name: 'Karthik Sundaram', rating: 5, text: 'The nursing team is exceptional. Their attention to detail with medication management gave our entire family peace of mind. Highly recommended.', date: 'March 2026' },
          ]);
        }
      }
    });
  }, []);

  const handleReviewSubmit = async () => {
    if (!formName.trim() || formRating === 0 || !formText.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const today = new Date();
      const dateStr = today.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
      
      const newReview = { name: formName.trim(), rating: formRating, text: formText.trim(), date: dateStr };
      
      setReviews((prev) => [newReview, ...prev]);
      
      const result = await addReview(newReview);
      if (!result.success) {
        console.error('Failed to save review:', result.error);
      }
      
      setFormName('');
      setFormRating(0);
      setFormText('');
      setHoveredStar(0);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowReviewForm(false);
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
  };

  const whyUs = [
    { title: "Professional & Trained Staff", desc: "All team members are trained, certified, and dedicated to providing exceptional care.", icon: <UserCheck size={28} /> },
    { title: "Personalized Care Plans", desc: "We develop individualized care plans tailored to each resident's specific needs and preferences.", icon: <ClipboardCheck size={28} /> },
    { title: "Safe & Comfortable Facility", desc: "Our center is equipped with modern amenities and safety features designed for elderly care.", icon: <ShieldCheck size={28} /> },
    { title: "Family-Centric Approach", desc: "We maintain open communication with families and involve them in care decisions.", icon: <HeartHandshake size={28} /> },
  ];

  const previewServices = [
    {
      id: 1,
      title: 'Caregiver Services',
      desc: 'Professional caregiver support for daily living activities, companionship, and personal care.',
      image: '/images/Abishag_img/1. Caregiver Services.png',
    },
    {
      id: 2,
      title: 'Nursing Services',
      desc: 'Skilled nursing care at home including wound care, medication management, and post-operative support.',
      image: '/images/Abishag_img/11. Care Coordination.png',
    },
    {
      id: 3,
      title: 'Hospice Care',
      desc: 'Compassionate end-of-life care focused on comfort, dignity, and emotional support.',
      image: '/images/Abishag_img/9. Medical Equipment Setup.png',
    },
    {
      id: 4,
      title: 'Dementia Care',
      desc: 'Specialized memory and cognitive care for patients with dementia or Alzheimer\'s.',
      image: '/images/Abishag_img/13. Pharmacy Delivery.png',
    },
    {
      id: 5,
      title: 'Allied Health Visit',
      desc: 'Home visits by allied health professionals including physiotherapists and occupational therapists.',
      image: '/images/Abishag_img/12. Lab Sample Collection.png',
    },
    {
      id: 6,
      title: 'Nurse Visit (On-demand)',
      desc: 'On-call and scheduled nurse visits for health monitoring, medication administration, and emergency assessments.',
      image: '/images/Abishag_img/3. Hospice Care.png',
    },
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <>
      {/* ── GLOBAL ANIMATED BACKGROUND ── */}
      <AnimatedBackground />

      {/* ── INTRO ANIMATION ── */}
      {isMounted && !introDone && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}

      {/* ── PREMIUM HERO ── */}
      <CinematicHero />

      {/* ── EXISTING SECTIONS BELOW ── */}
      <div ref={containerRef} style={{ position: 'relative' }}>
      <section className="py-24 md:py-32" style={{ background: '#ffffff', position: 'relative' }}>
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
                src="/images/welcome_caregiver_new.png" 
                alt="Compassionate elderly care" 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              
              {/* Floating badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: 'absolute', bottom: '32px', left: '32px',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '16px 24px',
                  boxShadow: '0 10px 30px rgba(61,26,10,0.2)',
                  display: 'flex', alignItems: 'center', gap: '12px',
                  zIndex: 20
                }}
              >
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#6AB04C', boxShadow: '0 0 12px rgba(106,176,76,0.6)' }} />
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.9rem', fontWeight: 800, color: '#3D1A0A' }}>Trusted Home Care</span>
              </motion.div>
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
                  className="px-10 py-5 rounded-xl font-bold transition-all duration-300 hover:bg-[#3D1A0A] hover:text-white"
                  style={{
                    border: '2px solid #3D1A0A',
                    color: '#3D1A0A',
                    textDecoration: 'none',
                    display: 'block'
                  }}
                >
                  About Us
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>



      {/* ── SERVICES PREVIEW ── */}
      <section className="py-24 md:py-32" style={{ background: 'linear-gradient(180deg, #F4F1ED 0%, #ffffff 50%, #F4F1ED 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 reveal"
          >
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6AB04C', marginBottom: '12px' }}>What We Offer</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 700,
                color: '#3D1A0A',
                marginBottom: '16px',
              }}
              className="text-raise"
            >
              Our Specialized Care
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {previewServices.map((svc) => (
              <motion.div
                key={svc.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                <Link
                  href="/services"
                  className="group block h-full"
                  style={{ textDecoration: 'none' }}
                >
                <Card3D style={{ borderRadius: '24px', height: '100%' }}>
                    <div
                      style={{
                        background: '#ffffff',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        borderTop: '6px solid #6AB04C',
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
              </motion.div>
            ))}
          </motion.div>

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

      {/* ── FEATURES ── */}
      <section className="py-24 md:py-32" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6AB04C', marginBottom: '12px' }}>Our Promise</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 700,
                color: '#3D1A0A',
                marginBottom: '16px',
              }}
              className="text-raise"
            >
              Why Choose Abishag?
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {whyUs.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
                }}
              >
                <Card3D className="h-full" style={{ borderRadius: '24px', height: '100%' }}>
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── REVIEWS SECTION ── */}
      <section className="py-24 md:py-32" style={{ background: '#F4F1ED', position: 'relative', overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, color: '#3D1A0A', marginBottom: '16px' }} className="text-raise">
                Kind Words from Families
              </h2>
              {dbStatus === 'disconnected' && (
                <div className="inline-block px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                  Demo Mode: Connection pending
                </div>
              )}
            </motion.div>

            {!showReviewForm && (
              <motion.button
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                onClick={() => setShowReviewForm(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#6AB04C] text-white font-bold rounded-xl shadow-lg shadow-[#6AB04C]/30 transition-all"
              >
                + Share Your Story
              </motion.button>
            )}
          </div>

          <AnimatePresence>
            {showReviewForm && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-20 overflow-hidden"
              >
                <div className="bg-white p-10 rounded-3xl shadow-2xl border border-[#EAE5DF] max-w-2xl mx-auto relative">
                  <button 
                    onClick={() => setShowReviewForm(false)}
                    className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ArrowRight className="rotate-[-45deg] text-gray-400" />
                  </button>
                  <h3 className="text-2xl font-bold mb-8 font-serif text-[#3D1A0A]">Tell us your experience</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-[#5C3D2A] mb-2">Your Full Name</label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-5 py-4 rounded-xl border border-[#DDD5CC] focus:border-[#6AB04C] focus:ring-0 outline-none transition-colors"
                        placeholder="e.g. Sarah Jenkins"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#5C3D2A] mb-3">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setFormRating(star)}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                            className="p-1 transition-transform hover:scale-110"
                          >
                            <Star 
                              size={32} 
                              fill={star <= (hoveredStar || formRating) ? '#F4A720' : 'none'} 
                              color={star <= (hoveredStar || formRating) ? '#F4A720' : '#DDD5CC'} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#5C3D2A] mb-2">Message</label>
                      <textarea
                        value={formText}
                        onChange={(e) => setFormText(e.target.value)}
                        rows={4}
                        className="w-full px-5 py-4 rounded-xl border border-[#DDD5CC] focus:border-[#6AB04C] focus:ring-0 outline-none transition-colors resize-none"
                        placeholder="How did Abishag help your family?"
                      />
                    </div>

                    <button
                      onClick={handleReviewSubmit}
                      disabled={!formName.trim() || formRating === 0 || !formText.trim() || isSubmitting}
                      className="w-full py-5 rounded-xl font-bold text-white bg-[#6AB04C] disabled:bg-gray-300 disabled:cursor-not-allowed shadow-xl shadow-[#6AB04C]/20 transition-all hover:brightness-110"
                    >
                      {isSubmitting ? 'Sending...' : submitted ? 'Success!' : 'Submit Feedback'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Marquee Reviews */}
          <div className="relative py-10">
            <div className="flex gap-8 animate-marquee hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
              {[...reviews, ...reviews].map((rev, i) => (
                <Card3D key={i}>
                  <div
                    className="w-[400px] p-10 bg-white rounded-3xl shadow-xl shadow-[#611A0A]/5 border border-[#EAE5DF] flex flex-col h-full"
                  >
                    <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={18} fill={s <= rev.rating ? '#F4A720' : 'none'} color={s <= rev.rating ? '#F4A720' : '#DDD5CC'} />
                      ))}
                    </div>
                    <p className="text-[#5C3D2A] text-lg leading-relaxed mb-8 italic flex-grow">
                      "{rev.text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6AB04C] to-[#3D1A0A] flex items-center justify-center text-white font-bold">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-[#3D1A0A]">{rev.name}</div>
                        <div className="text-sm text-gray-500">{rev.date}</div>
                      </div>
                    </div>
                  </div>
                </Card3D>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 md:py-48 relative overflow-hidden">
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
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '32px',
              lineHeight: 1.1,
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
              fontSize: '1.25rem',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '56px',
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
                className="px-12 py-6 bg-white text-[#3D1A0A] font-extrabold text-xl rounded-2xl shadow-2xl hover:bg-[#6AB04C] hover:text-white transition-all duration-300 hover:scale-105 inline-block"
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
