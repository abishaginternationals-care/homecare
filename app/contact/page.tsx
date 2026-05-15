'use client';

import { useState, useEffect } from 'react';
import { servicesData } from '../data/services';
import Card3D from '../components/Card3D';
import { useScrollReveal } from '../hooks/useScrollReveal';
import PremiumEmoji from '../components/PremiumEmoji';

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

    const whatsappNumber = "9940216863"; 
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
    <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden', background: 'transparent' }}>

      <div className="relative z-10 py-20 px-4 md:px-8">
        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

          {/* Left Column: Contact Information */}
          <div className="reveal flex flex-col justify-center" style={{
            height: '100%',
            background: 'rgba(255, 255, 255, 0.70)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '48px',
            borderRadius: '32px',
            boxShadow: '0 20px 50px rgba(61,26,10,0.06)',
            border: '1px solid rgba(255, 255, 255, 0.6)'
          }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 700, color: '#3D1A0A', marginBottom: '24px', lineHeight: 1.1 }}>
              Get in Touch <br /><span className="text-[#6AB04C]">With Us</span>
            </h2>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '1.2rem', color: '#5C3D2A', marginBottom: '56px', lineHeight: 1.7, maxWidth: '500px' }}>
              We're here to help and answer any questions you might have. Whether you need immediate care or want to plan for the future, we look forward to hearing from you.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {/* Address */}
              <div className="flex gap-6 items-center">
                <PremiumEmoji name="location" size="lg" className="flex-shrink-0 w-16 h-16 rounded-2xl shadow-lg" />
                <div>
                  <h4 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#3D1A0A', marginBottom: '4px' }}>Our Location</h4>
                  <p style={{ fontFamily: "'Nunito', sans-serif", color: '#5C3D2A' }}>123 Healing Avenue, Wellness Block, Chennai</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-6 items-center">
                <PremiumEmoji name="phone" size="lg" className="flex-shrink-0 w-16 h-16 rounded-2xl shadow-lg" />
                <div>
                  <h4 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#3D1A0A', marginBottom: '4px' }}>Call Us</h4>
                  <p style={{ fontFamily: "'Nunito', sans-serif", color: '#5C3D2A' }}>+91 99402 16863</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-6 items-center">
                <PremiumEmoji name="mail" size="lg" className="flex-shrink-0 w-16 h-16 rounded-2xl shadow-lg" />
                <div>
                  <h4 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#3D1A0A', marginBottom: '4px' }}>Email Us</h4>
                  <p style={{ fontFamily: "'Nunito', sans-serif", color: '#5C3D2A' }}>info@abishag.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="reveal reveal-delay-2 h-full">
            <Card3D style={{ borderRadius: '32px', height: '100%' }}>
              <div style={{
                height: '100%',
                background: 'rgba(255,255,255,0.78)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                padding: '48px',
                borderRadius: '32px',
                boxShadow: '0 25px 70px rgba(61,26,10,0.09)',
                border: '1px solid rgba(255,255,255,0.65)',
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
