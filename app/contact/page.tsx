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

    const whatsappNumber = "917397390266"; 
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
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.6rem, 5vw, 4rem)', fontWeight: 700, color: '#3D1A0A', marginBottom: '20px', lineHeight: 1.1 }}>
              Get in Touch <br /><span className="text-[#6AB04C]">With Us</span>
            </h2>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '1.1rem', color: '#5C3D2A', marginBottom: '40px', lineHeight: 1.7, maxWidth: '500px' }}>
              We're here to help and answer any questions you might have. Whether you need immediate care or want to plan for the future, we look forward to hearing from you.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {/* Address */}
              <div className="flex gap-5 items-start">
                <PremiumEmoji name="location" size="lg" className="flex-shrink-0 w-14 h-14 rounded-2xl shadow-lg" />
                <div>
                  <h4 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: '#3D1A0A', marginBottom: '4px' }}>Office Address</h4>
                  <p style={{ fontFamily: "'Nunito', sans-serif", color: '#5C3D2A', lineHeight: 1.7 }}>
                    Abishag Office<br />
                    9/860, Nallathambi Nagar,<br />
                    Natesan 2nd Street,<br />
                    Medavakam, Chennai – 600100
                  </p>
                </div>
              </div>

              {/* Office Phone */}
              <div className="flex gap-5 items-center">
                <PremiumEmoji name="phone" size="lg" className="flex-shrink-0 w-14 h-14 rounded-2xl shadow-lg" />
                <div>
                  <h4 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: '#3D1A0A', marginBottom: '4px' }}>Office Contact</h4>
                  <a href="tel:+919940179079" style={{ fontFamily: "'Nunito', sans-serif", color: '#5C3D2A', textDecoration: 'none', display: 'block' }}>+91 99401 79079</a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex gap-5 items-start">
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(37,211,102,0.12)', color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 14px rgba(37,211,102,0.1)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: '#3D1A0A', marginBottom: '4px' }}>WhatsApp & Enquiry</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <a href="https://wa.me/917397390266" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Nunito', sans-serif", color: '#25D366', fontWeight: 700, textDecoration: 'none', display: 'block' }}>+91 73973 90266</a>
                    <a href="https://wa.me/917397390288" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Nunito', sans-serif", color: '#25D366', fontWeight: 700, textDecoration: 'none', display: 'block' }}>+91 73973 90288</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div style={{ marginTop: '36px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 28px rgba(61,26,10,0.12)', border: '1px solid rgba(255,255,255,0.6)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d80.197!3d12.916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d0e3e3e3e3e%3A0x0!2sMedavakam%2C%20Chennai%2C%20Tamil%20Nadu%20600100!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Abishag Office Location - Medavakam, Chennai"
              />
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
