'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Card3D from '../components/Card3D';
import AnimatedUnderline from '../components/AnimatedUnderline';
import {
  Stethoscope, Activity, MessageCircle, Monitor, UserCheck, Package,
  HeartPulse, Upload, CheckCircle2, Briefcase, Users, Star,
} from 'lucide-react';

const positions = [
  'Patient Care Assistant',
  'Staff Nurse (RN / GNM)',
  'Physiotherapist',
  'Speech Therapist',
  'ICU Technician / Critical Care Nurse',
  'Home Visit Doctor',
  'Medical Equipment Technician',
  'Other',
];

const perks = [
  { icon: <Briefcase size={22} />, title: 'Flexible Hours', desc: 'Day, evening & weekend shifts to suit your lifestyle.' },
  { icon: <Users size={22} />, title: 'Supportive Team', desc: 'Work alongside compassionate, experienced professionals.' },
  { icon: <Star size={22} />, title: 'Growth Opportunities', desc: 'Training, certifications & career advancement support.' },
  { icon: <HeartPulse size={22} />, title: 'Meaningful Work', desc: 'Make a real difference in patients\' and families\' lives.' },
];

export default function CareersPage() {
  useScrollReveal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    experienceDetails: '',
  });
  const [resumeName, setResumeName] = useState('');
  const [certName, setCertName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (name: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) setter(file.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.position) {
      alert('Please fill in your name, phone, and the position you are applying for.');
      return;
    }
    setIsSubmitting(true);

    const whatsappNumber = '917397390266';
    const text = `\uD83C\uDFAF *Career Application — Abishag Home Health Services*

\uD83D\uDC64 *Name:* ${formData.name}
\uD83D\uDCDE *Phone:* ${formData.phone}
\u2709\uFE0F *Email:* ${formData.email || 'Not provided'}

\uD83C\uDFE5 *Position Applied For:* ${formData.position}
\uD83D\uDCC5 *Years of Experience:* ${formData.experience || 'Not specified'}

\uD83D\uDCCB *Experience Details:*
"${formData.experienceDetails || 'Not provided'}"

\uD83D\uDCCE *Resume:* ${resumeName || 'Will be shared separately'}
\uD83D\uDCCE *Certificate:* ${certName || 'Will be shared separately'}

_Please share resume & certificates directly on WhatsApp if not yet attached._`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

      {/* ── Hero Banner ── */}
      <section
        style={{
          background: 'linear-gradient(135deg, rgba(61,26,10,0.92) 0%, rgba(74,138,48,0.85) 100%)',
          padding: '80px 24px 60px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative orbs */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(106,176,76,0.25) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', zIndex: 10 }}
        >
          <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '0.8rem', color: '#A8E07A', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Join Our Team
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.6rem, 6vw, 4.2rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: '20px' }}>
            Build a Career That<br />
            <span style={{ color: '#A8E07A' }}>Changes Lives</span>
          </h1>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '1.1rem', color: 'rgba(255,255,255,0.80)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.75 }}>
            We're always looking for compassionate, skilled healthcare professionals to join the Abishag family and deliver exceptional home health services across Tamil Nadu.
          </p>
        </motion.div>
      </section>

      {/* ── Why Work With Us ── */}
      <section className="py-16 md:py-20 plain-section-wave" style={{ position: 'relative' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14 reveal"
          >
            <div style={{ margin: '0 auto', width: 'fit-content' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#3D1A0A', marginBottom: '4px' }}>
                Why Work with <span style={{ color: '#6AB04C' }}>Abishag?</span>
              </h2>
              <AnimatedUnderline delay={0.3} />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <Card3D style={{ borderRadius: '20px', height: '100%' }}>
                  <div style={{ background: 'rgba(255,255,255,0.80)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderRadius: '20px', padding: '28px 24px', borderTop: '4px solid #6AB04C', height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #EAF5E0, #C8E6B0)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A8A30' }}>
                      {perk.icon}
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 700, color: '#3D1A0A', margin: 0 }}>{perk.title}</h3>
                    <p style={{ fontFamily: "'Nunito', sans-serif", color: '#5C3D2A', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{perk.desc}</p>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Form ── */}
      <section className="py-16 md:py-20" style={{ background: 'rgba(255,255,255,0.42)', position: 'relative' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 reveal"
          >
            <div style={{ margin: '0 auto', width: 'fit-content' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#3D1A0A', marginBottom: '4px' }}>
                Apply <span style={{ color: '#6AB04C' }}>Now</span>
              </h2>
              <AnimatedUnderline delay={0.3} />
            </div>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '1rem', color: '#5C3D2A', marginTop: '16px', lineHeight: 1.7 }}>
              Fill in your details below. Your application will be sent directly to our HR team via WhatsApp.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRadius: '28px', padding: '60px 40px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 20px 60px rgba(61,26,10,0.10)' }}
            >
              <CheckCircle2 size={64} color="#6AB04C" style={{ margin: '0 auto 20px' }} />
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '12px' }}>Application Sent!</h3>
              <p style={{ fontFamily: "'Nunito', sans-serif", color: '#5C3D2A', fontSize: '1rem', lineHeight: 1.7, maxWidth: '400px', margin: '0 auto 28px' }}>
                Thank you for your interest in joining Abishag. Please also send your resume and certificates directly on WhatsApp: <strong style={{ color: '#25D366' }}>+91 73973 90266</strong>
              </p>
              <a
                href="https://wa.me/917397390266"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '14px', background: '#25D366', color: '#fff', fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 8px 24px rgba(37,211,102,0.4)' }}
              >
                💬 Send Documents on WhatsApp
              </a>
            </motion.div>
          ) : (
            <Card3D style={{ borderRadius: '28px' }}>
              <div style={{ background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRadius: '28px', padding: '48px', border: '1px solid rgba(255,255,255,0.65)', boxShadow: '0 25px 70px rgba(61,26,10,0.09)' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="car-name" style={labelStyle}>Full Name *</label>
                      <input id="car-name" type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Priya Sharma" style={inputStyle} />
                    </div>
                    <div>
                      <label htmlFor="car-phone" style={labelStyle}>Phone Number *</label>
                      <input id="car-phone" type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="e.g. +91 98765 43210" style={inputStyle} />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="car-email" style={labelStyle}>Email Address (Optional)</label>
                    <input id="car-email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. priya@email.com" style={inputStyle} />
                  </div>

                  {/* Position */}
                  <div>
                    <label htmlFor="car-position" style={labelStyle}>Position Applying For *</label>
                    <select id="car-position" name="position" required value={formData.position} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="">Select a position</option>
                      {positions.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>

                  {/* Experience */}
                  <div>
                    <label htmlFor="car-exp" style={labelStyle}>Years of Experience</label>
                    <select id="car-exp" name="experience" value={formData.experience} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="">Select experience level</option>
                      <option value="Fresher (0 years)">Fresher (0 years)</option>
                      <option value="1–2 years">1–2 years</option>
                      <option value="3–5 years">3–5 years</option>
                      <option value="5–10 years">5–10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>

                  {/* Experience Details */}
                  <div>
                    <label htmlFor="car-expdetail" style={labelStyle}>Experience Details</label>
                    <textarea id="car-expdetail" name="experienceDetails" rows={4} value={formData.experienceDetails} onChange={handleChange} placeholder="Briefly describe your relevant experience, skills, and previous employers..." style={{ ...inputStyle, resize: 'none' }} />
                  </div>

                  {/* File Uploads */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Resume */}
                    <div>
                      <label style={labelStyle}>Resume Upload</label>
                      <label htmlFor="resume-upload" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 18px', border: '1.5px dashed #6AB04C', borderRadius: '14px', cursor: 'pointer', background: 'rgba(106,176,76,0.05)', fontFamily: "'Nunito', sans-serif", fontSize: '0.9rem', color: '#4A8A30', fontWeight: 600, transition: 'background 0.2s' }}>
                        <Upload size={18} />
                        <span>{resumeName || 'Choose Resume (PDF/DOC)'}</span>
                      </label>
                      <input id="resume-upload" type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => handleFileChange(e, setResumeName)} />
                      {resumeName && <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.8rem', color: '#6AB04C', marginTop: '6px' }}>✓ {resumeName}</p>}
                    </div>

                    {/* Certificate */}
                    <div>
                      <label style={labelStyle}>Certificate Upload</label>
                      <label htmlFor="cert-upload" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 18px', border: '1.5px dashed #6AB04C', borderRadius: '14px', cursor: 'pointer', background: 'rgba(106,176,76,0.05)', fontFamily: "'Nunito', sans-serif", fontSize: '0.9rem', color: '#4A8A30', fontWeight: 600, transition: 'background 0.2s' }}>
                        <Upload size={18} />
                        <span>{certName || 'Choose Certificate (PDF/IMG)'}</span>
                      </label>
                      <input id="cert-upload" type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={e => handleFileChange(e, setCertName)} />
                      {certName && <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.8rem', color: '#6AB04C', marginTop: '6px' }}>✓ {certName}</p>}
                    </div>
                  </div>

                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.82rem', color: '#8A7060', lineHeight: 1.6, background: 'rgba(106,176,76,0.06)', borderLeft: '3px solid #6AB04C', paddingLeft: '14px', borderRadius: '4px' }}>
                    📎 Please also send your resume and certificates directly on WhatsApp (+91 73973 90266) for faster processing.
                  </p>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ background: isSubmitting ? '#aaa' : '#25D366', color: '#fff', border: 'none', padding: '18px 32px', borderRadius: '16px', fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '1.05rem', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'all 0.25s', boxShadow: '0 10px 28px rgba(37,211,102,0.35)', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                  >
                    {isSubmitting ? 'Submitting…' : <><span>💬 Submit via WhatsApp</span></>}
                  </button>
                </form>
              </div>
            </Card3D>
          )}
        </div>
      </section>
    </div>
  );
}

// Shared styles
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: "'Nunito', sans-serif",
  fontWeight: 700,
  fontSize: '0.88rem',
  color: '#5C3D2A',
  marginBottom: '8px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 18px',
  borderRadius: '14px',
  border: '1.5px solid #DDD5CC',
  fontFamily: "'Nunito', sans-serif",
  fontSize: '0.95rem',
  color: '#3D1A0A',
  outline: 'none',
  background: '#fff',
  transition: 'border-color 0.25s',
  boxSizing: 'border-box',
};
