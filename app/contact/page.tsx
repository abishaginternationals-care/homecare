'use client';

import { useState } from 'react';
import { servicesData } from '../data/services';

export default function Contact() {
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

    // Validate
    if (!formData.name || !formData.phone || !formData.message) {
      alert("Please fill in at least your name, phone, and message.");
      return;
    }

    // Format the message for WhatsApp
    const whatsappNumber = "9345989699"; // Replace with actual number without +
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

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={{ background: '#F4F1ED', minHeight: '100vh', padding: '60px 20px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '1200px', width: '100%' }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Left Column: Contact Information */}
        <div style={{ padding: '20px 0', animation: 'fadeInLeft 0.8s ease-out forwards' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.4rem, 4vw, 3.2rem)', fontWeight: 700, color: '#3D1A0A', marginBottom: '16px', lineHeight: 1.1 }}>
            Get in Touch With Us
          </h2>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '1.05rem', color: '#5C3D2A', marginBottom: '48px', lineHeight: 1.7 }}>
            We're here to help and answer any questions you might have. Whether you need immediate care or want to plan for the future, we look forward to hearing from you.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {/* Address */}
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: '#EAF5E0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#6AB04C', boxShadow: '0 4px 12px rgba(106,176,76,0.15)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <h4 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '1.15rem', color: '#3D1A0A', marginBottom: '8px' }}>Our Location</h4>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.95rem', color: '#5C3D2A', lineHeight: 1.6 }}>
                  123 Healing Avenue, Wellness Block<br />
                  Chennai, Tamil Nadu 600001
                </p>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: '#EAF5E0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#6AB04C', boxShadow: '0 4px 12px rgba(106,176,76,0.15)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div>
                <h4 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '1.15rem', color: '#3D1A0A', marginBottom: '8px' }}>Call Us</h4>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.95rem', color: '#5C3D2A', lineHeight: 1.6 }}>
                  +91 9345989699<br />
                  <span style={{ fontSize: '0.85rem', color: '#8C7B6E' }}>Mon - Sat, 8:00 AM - 8:00 PM</span>
                </p>
              </div>
            </div>

            {/* Email */}
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: '#EAF5E0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#6AB04C', boxShadow: '0 4px 12px rgba(106,176,76,0.15)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <h4 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '1.15rem', color: '#3D1A0A', marginBottom: '8px' }}>Email Us</h4>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.95rem', color: '#5C3D2A', lineHeight: 1.6 }}>
                  info@abishag.com<br />
                  <span style={{ fontSize: '0.85rem', color: '#8C7B6E' }}>We aim to reply within 24 hours</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '40px', boxShadow: '0 12px 40px rgba(61,26,10,0.08)', border: '1px solid #EAE5DF', animation: 'fadeInRight 0.8s ease-out forwards' }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '8px' }}>
            Send Us A Message
          </h3>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.95rem', color: '#8C7B6E', marginBottom: '32px' }}>
            Give us a chance to serve You by writing to Us
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              {/* Full Name */}
              <div>
                <label style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#5C3D2A', display: 'block', marginBottom: '8px' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '15px', left: '16px', color: '#A09287' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.95rem', width: '100%', padding: '14px 16px 14px 46px', borderRadius: '12px', border: '1.5px solid #DDD5CC', outline: 'none', background: '#ffffff', color: '#3D1A0A', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                    onFocus={(e) => (e.target.style.borderColor = '#6AB04C')}
                    onBlur={(e) => (e.target.style.borderColor = '#DDD5CC')}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#5C3D2A', display: 'block', marginBottom: '8px' }}>
                  Your Email
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '15px', left: '16px', color: '#A09287' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="info@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.95rem', width: '100%', padding: '14px 16px 14px 46px', borderRadius: '12px', border: '1.5px solid #DDD5CC', outline: 'none', background: '#ffffff', color: '#3D1A0A', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                    onFocus={(e) => (e.target.style.borderColor = '#6AB04C')}
                    onBlur={(e) => (e.target.style.borderColor = '#DDD5CC')}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#5C3D2A', display: 'block', marginBottom: '8px' }}>
                  Your Phone
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '15px', left: '16px', color: '#A09287' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.95rem', width: '100%', padding: '14px 16px 14px 46px', borderRadius: '12px', border: '1.5px solid #DDD5CC', outline: 'none', background: '#ffffff', color: '#3D1A0A', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                    onFocus={(e) => (e.target.style.borderColor = '#6AB04C')}
                    onBlur={(e) => (e.target.style.borderColor = '#DDD5CC')}
                  />
                </div>
              </div>

              {/* Services Dropdown */}
              <div>
                <label style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#5C3D2A', display: 'block', marginBottom: '8px' }}>
                  Services
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '15px', left: '16px', color: '#A09287' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.95rem', width: '100%', padding: '14px 16px 14px 46px', borderRadius: '12px', border: '1.5px solid #DDD5CC', outline: 'none', background: '#ffffff', color: formData.service ? '#3D1A0A' : '#A09287', boxSizing: 'border-box', transition: 'border-color 0.2s', appearance: 'none' }}
                    onFocus={(e) => (e.target.style.borderColor = '#6AB04C')}
                    onBlur={(e) => (e.target.style.borderColor = '#DDD5CC')}
                  >
                    <option value="" disabled hidden>Choose Services</option>
                    {servicesData.map((service) => (
                      <option key={service.id} value={service.title}>{service.title}</option>
                    ))}
                  </select>
                  <div style={{ position: 'absolute', top: '15px', right: '16px', color: '#A09287', pointerEvents: 'none' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

            </div>

            {/* Message */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#5C3D2A', display: 'block', marginBottom: '8px' }}>
                Message
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '15px', left: '16px', color: '#A09287' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.95rem', width: '100%', padding: '14px 16px 14px 46px', borderRadius: '12px', border: '1.5px solid #DDD5CC', outline: 'none', background: '#ffffff', color: '#3D1A0A', resize: 'vertical', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={(e) => (e.target.style.borderColor = '#6AB04C')}
                  onBlur={(e) => (e.target.style.borderColor = '#DDD5CC')}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: '1rem',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #6AB04C, #3D7A28)',
                padding: '16px 40px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease',
                letterSpacing: '0.04em',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 6px 20px rgba(106,176,76,0.35)',
                willChange: 'transform',
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
                e.currentTarget.style.transform = `translate(${x}px, ${y}px) scale(1.04)`;
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(106,176,76,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(106,176,76,0.35)';
              }}
            >
              Send Message via WhatsApp
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}
