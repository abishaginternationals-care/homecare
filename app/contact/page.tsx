'use client';

import { useState, useEffect } from 'react';
import { servicesData } from '../data/services';
import Card3D from '../components/Card3D';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Contact() {
  useScrollReveal();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { setIsVisible(true); }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.message) {
      alert("Please fill in at least your name, phone, and message.");
      return;
    }

    const whatsappNumber = "9345989699"; 
    const text = `✨ *New Inquiry from Abishag Website* ✨
    
👤 *Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
✉️ *Email:* ${formData.email || 'Not provided'}
🏥 *Service Requested:* ${formData.service || 'General Inquiry'}

💬 *Message:*
"${formData.message}"

_Please reply to this message to start the conversation._`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="mesh-bg" style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      
      {/* ── Living Animated Background System ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="orb orb-green" style={{ position: 'absolute', top: '15%',  left: '5%',   width: '550px', height: '550px' }} />
        <div className="orb orb-brown" style={{ position: 'absolute', bottom: '10%', right: '5%',  width: '450px', height: '450px' }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.4, mixBlendMode: 'multiply',
        }} />
      </div>

      <div className="relative z-10 py-20 px-4 md:px-8">
        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left Column: Contact Information */}
          <div className="reveal">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 700, color: '#3D1A0A', marginBottom: '24px', lineHeight: 1.1 }}>
              Get in Touch <br /><span className="text-[#6AB04C]">With Us</span>
            </h2>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '1.2rem', color: '#5C3D2A', marginBottom: '56px', lineHeight: 1.7, maxWidth: '500px' }}>
              We're here to help and answer any questions you might have. Whether you need immediate care or want to plan for the future, we look forward to hearing from you.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {/* Address */}
              <div className="flex gap-6 items-center">
                <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'linear-gradient(135deg, #EAF5E0, #D5EDCA)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#4A8A30', boxShadow: '0 8px 20px rgba(106,176,76,0.2)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#3D1A0A', marginBottom: '4px' }}>Our Location</h4>
                  <p style={{ fontFamily: "'Nunito', sans-serif", color: '#5C3D2A' }}>123 Healing Avenue, Wellness Block, Chennai</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-6 items-center">
                <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'linear-gradient(135deg, #EAF5E0, #D5EDCA)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#4A8A30', boxShadow: '0 8px 20px rgba(106,176,76,0.2)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#3D1A0A', marginBottom: '4px' }}>Call Us</h4>
                  <p style={{ fontFamily: "'Nunito', sans-serif", color: '#5C3D2A' }}>+91 9345989699</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-6 items-center">
                <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'linear-gradient(135deg, #EAF5E0, #D5EDCA)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#4A8A30', boxShadow: '0 8px 20px rgba(106,176,76,0.2)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#3D1A0A', marginBottom: '4px' }}>Email Us</h4>
                  <p style={{ fontFamily: "'Nunito', sans-serif", color: '#5C3D2A' }}>info@abishag.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="reveal reveal-delay-2">
            <Card3D style={{ borderRadius: '32px' }}>
              <div style={{
                background: '#ffffff',
                padding: '48px',
                borderRadius: '32px',
                boxShadow: '0 25px 70px rgba(61,26,10,0.08)',
                border: '1px solid rgba(61,26,10,0.05)',
              }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '32px' }}>
                  Send us a Message
                </h3>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" style={{ display: 'block', fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#5C3D2A', marginBottom: '8px' }}>Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', border: '1.5px solid #DDD5CC', fontFamily: "'Nunito', sans-serif", outline: 'none', transition: 'border-color 0.3s' }}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" style={{ display: 'block', fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#5C3D2A', marginBottom: '8px' }}>Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210"
                        style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', border: '1.5px solid #DDD5CC', fontFamily: "'Nunito', sans-serif", outline: 'none', transition: 'border-color 0.3s' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" style={{ display: 'block', fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#5C3D2A', marginBottom: '8px' }}>Email Address (Optional)</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', border: '1.5px solid #DDD5CC', fontFamily: "'Nunito', sans-serif", outline: 'none', transition: 'border-color 0.3s' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="service" style={{ display: 'block', fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#5C3D2A', marginBottom: '8px' }}>Service Interested In</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', border: '1.5px solid #DDD5CC', fontFamily: "'Nunito', sans-serif", outline: 'none', background: '#fff', cursor: 'pointer' }}
                    >
                      <option value="">Select a service</option>
                      {servicesData.map(s => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" style={{ display: 'block', fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#5C3D2A', marginBottom: '8px' }}>Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', border: '1.5px solid #DDD5CC', fontFamily: "'Nunito', sans-serif", outline: 'none', resize: 'none', transition: 'border-color 0.3s' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: '#6AB04C',
                      color: '#fff',
                      border: 'none',
                      padding: '18px 32px',
                      borderRadius: '16px',
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      boxShadow: '0 10px 25px rgba(106,176,76,0.3)',
                      marginTop: '12px'
                    }}
                  >
                    Connect on WhatsApp
                  </button>
                </form>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </div>
  );
}
