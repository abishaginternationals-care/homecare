'use client';

import { motion } from 'framer-motion';

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" />
  </svg>
);

export default function Footer() {
  return (
    <footer style={{ background: '#200D05', color: '#EDE8E2', overflow: 'hidden' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                style={{ width: '60px', height: '60px', borderRadius: '16px', overflow: 'hidden', background: '#ffffff', flexShrink: 0, boxShadow: '0 8px 20px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <img src="/logo-transparent.png" alt="Abishag" style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
              </motion.div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 700, color: '#ffffff' }}>
                  Abishag
                </div>
                <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.6rem', fontWeight: 800, color: '#6AB04C', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                  Home Health Services
                </div>
              </div>
            </div>
            <p style={{ fontFamily: "'Nunito', sans-serif", color: 'rgba(237,232,226,0.5)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '280px' }}>
              Redefining home health with compassionate care, professional excellence, and the "Abundance of Life" philosophy.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '24px' }} className="text-raise">
              Explore
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { href: '/', label: 'Home' },
                { href: '/services', label: 'Services' },
                { href: '/blog', label: 'Blog' },
                { href: '/about', label: 'About Us' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <motion.a
                    href={href}
                    whileHover={{ x: 5, color: '#6AB04C' }}
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      color: 'rgba(237,232,226,0.6)',
                      fontSize: '0.95rem',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      display: 'inline-block'
                    }}
                  >
                    {label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '24px' }} className="text-raise">
              Connect
            </h3>
            <div style={{ fontFamily: "'Nunito', sans-serif", color: 'rgba(237,232,226,0.6)', fontSize: '0.95rem', lineHeight: 2.2 }}>
              <p>Email: <a href="mailto:contact@abishag.com" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-[#6AB04C] transition-colors">contact@abishag.com</a></p>
              <p>Phone: +91 99402 16863</p>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '24px' }} className="text-raise">
              Follow
            </h3>
            <div style={{ display: 'flex', gap: '16px' }}>
              {[
                { icon: <InstagramIcon size={22} />, href: 'https://instagram.com' },
                { icon: <XIcon size={20} />, href: 'https://x.com' }
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, background: 'rgba(106, 176, 76, 0.2)', color: '#6AB04C' }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    color: 'rgba(237,232,226,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'rgba(255,255,255,0.05)',
                    textDecoration: 'none'
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '60px', paddingTop: '32px', textAlign: 'center' }}
        >
          <p style={{ fontFamily: "'Nunito', sans-serif", color: 'rgba(237,232,226,0.3)', fontSize: '0.85rem' }}>
            © 2026 Abishag — Home Health Services. Carefully crafted for comfort.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
