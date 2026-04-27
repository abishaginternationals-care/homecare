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
                background: '#2A3B45', // The dark blue/gray from the screenshot
                padding: '14px 32px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.25s, transform 0.2s, box-shadow 0.2s',
                letterSpacing: '0.03em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(42,59,69,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1e2b33';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(42,59,69,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2A3B45';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(42,59,69,0.3)';
              }}
            >
              Send Message
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}
