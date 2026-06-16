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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
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
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }} className="text-raise">
              Explore
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/services', label: 'Services' },
                { href: '/blog', label: 'Blog' },
                { href: '/careers', label: 'Careers' },
                { href: '/contact', label: 'Contact Us' },
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
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }} className="text-raise">
              Connect
            </h3>
            <div style={{ fontFamily: "'Nunito', sans-serif", color: 'rgba(237,232,226,0.7)', fontSize: '0.93rem', lineHeight: 2.1 }}>
              <p style={{ marginBottom: '14px' }}>
                <span style={{ color: 'rgba(237,232,226,0.45)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Office</span><br />
                9/860, Nallathambi Nagar,<br />
                Natesan 2nd Street,<br />
                Medavakam, Chennai – 600100
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a 
                  href="tel:+919940179079" 
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'inherit', textDecoration: 'none' }} 
                  className="hover:text-[#6AB04C] transition-colors group"
                >
                  <span style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(237,232,226,0.7)',
                    transition: 'all 0.3s'
                  }} className="group-hover:bg-[rgba(106,176,76,0.2)] group-hover:text-[#6AB04C]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </span>
                  <span>+91 99401 79079</span>
                </a>
                
                <a 
                  href="https://wa.me/917397390266" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#25D366', textDecoration: 'none', fontWeight: 700 }} 
                  className="group"
                >
                  <span style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#25D366',
                    transition: 'all 0.3s'
                  }} className="group-hover:bg-[rgba(37,211,102,0.2)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </span>
                  <span>+91 73973 90266</span>
                </a>

                <a 
                  href="https://wa.me/917397390288" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#25D366', textDecoration: 'none', fontWeight: 700 }} 
                  className="group"
                >
                  <span style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#25D366',
                    transition: 'all 0.3s'
                  }} className="group-hover:bg-[rgba(37,211,102,0.2)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </span>
                  <span>+91 73973 90288</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }} className="text-raise">
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
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '40px', paddingTop: '20px', textAlign: 'center' }}
        >
          <p style={{ fontFamily: "'Nunito', sans-serif", color: 'rgba(237,232,226,0.3)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
            <span>© 2026 Abishag — Home Health Services. Carefully crafted for comfort.</span>
            <span style={{ fontSize: '0.8rem' }}>
              Developed by{' '}
              <a 
                href="https://www.creinx.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: '#6AB04C', textDecoration: 'none', fontWeight: 700, transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6AB04C'}
              >
                Creinx
              </a>
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
