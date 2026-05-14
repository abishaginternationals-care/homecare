'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/blog', label: 'Blog' },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial check
    onScroll();
    
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle: React.CSSProperties = {
    background: scrolled ? 'rgba(255,255,255,0.92)' : '#ffffff',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: '1.5px solid #DDD5CC',
    boxShadow: scrolled
      ? '0 2px 24px rgba(61,26,10,0.12)'
      : '0 2px 14px rgba(61,26,10,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    transition: 'all 0.35s ease',
  };

  const logoSize = scrolled ? '52px' : '62px';
  const navHeight = scrolled ? '68px' : '84px';

  return (
    <nav style={navStyle}>
      <div className="px-2 sm:px-4 lg:px-6">
        {/* Top bar */}
        <div
          className="flex justify-between items-center"
          style={{ height: navHeight, transition: 'height 0.35s ease' }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group py-1" onClick={() => setMenuOpen(false)}>
            <div
              className="transition-all duration-300 group-hover:scale-105"
              style={{ height: logoSize, width: logoSize, flexShrink: 0, transition: 'all 0.35s ease', overflow: 'visible', position: 'relative' }}
            >
              <img
                src="/logo-transparent.png"
                alt="Abishag Logo"
                style={{ width: '140%', height: '140%', objectFit: 'contain', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginTop: '4px' }}>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: scrolled ? '1.65rem' : '1.95rem',
                  fontWeight: 800,
                  color: '#2A1005',
                  lineHeight: 0.9,
                  letterSpacing: '-0.01em',
                  transition: 'font-size 0.35s ease',
                  textShadow: '0 1px 3px rgba(61,26,10,0.15)',
                }}
                className="text-raise"
              >
                Abishag
              </span>
              <span
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  color: '#6AB04C',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginTop: '4px',
                  opacity: scrolled ? 0 : 1,
                  transition: 'opacity 0.35s ease',
                }}
              >
                Home Health Services
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.93rem',
                    color: isActive ? '#ffffff' : '#5C3D2A',
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    padding: '7px 18px',
                    borderRadius: '100px',
                    background: isActive
                      ? 'linear-gradient(135deg, #6AB04C, #4A8A30)'
                      : 'transparent',
                    boxShadow: isActive ? '0 4px 14px rgba(106,176,76,0.35)' : 'none',
                    transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'rgba(255, 255, 255, 0.45)';
                      el.style.backdropFilter = 'blur(16px)';
                      el.style.setProperty('-webkit-backdrop-filter', 'blur(16px)');
                      el.style.color = '#3D1A0A';
                      el.style.transform = 'translateY(-2px) scale(1.04)';
                      el.style.boxShadow = '0 10px 24px rgba(106, 176, 76, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.8)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'transparent';
                      el.style.backdropFilter = 'none';
                      el.style.setProperty('-webkit-backdrop-filter', 'none');
                      el.style.color = '#5C3D2A';
                      el.style.transform = 'translateY(0) scale(1)';
                      el.style.boxShadow = 'none';
                    }
                  }}
                >
                  {label}
                </Link>
              );
            })}
            <a
              href="/contact"
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: '0.85rem',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #6AB04C, #4A8A30)',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                padding: '8px 18px',
                borderRadius: '8px',
                transition: 'transform 0.2s, box-shadow 0.2s',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 14px rgba(106,176,76,0.3)',
              }}
              onMouseEnter={e => {
                const el = e.target as HTMLElement;
                el.style.transform = 'scale(1.05) translateY(-1px)';
                el.style.boxShadow = '0 8px 20px rgba(106,176,76,0.4)';
              }}
              onMouseLeave={e => {
                const el = e.target as HTMLElement;
                el.style.transform = 'scale(1)';
                el.style.boxShadow = '0 4px 14px rgba(106,176,76,0.3)';
              }}
            >
              Contact Us
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              color: '#3D1A0A',
            }}
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            background: '#ffffff',
            borderTop: '1px solid #EAE5DF',
            padding: '16px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            boxShadow: '0 8px 24px rgba(61,26,10,0.12)',
          }}
        >
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: isActive ? '#6AB04C' : '#3D1A0A',
                  textDecoration: 'none',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: isActive ? '#EAF5E0' : 'transparent',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  if (!isActive) (e.target as HTMLElement).style.background = '#F9F7F4';
                }}
                onMouseLeave={e => {
                  if (!isActive) (e.target as HTMLElement).style.background = 'transparent';
                }}
              >
                {label}
              </Link>
            );
          })}
          <a
            href="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: '0.95rem',
              color: '#ffffff',
              background: 'linear-gradient(135deg, #6AB04C, #4A8A30)',
              textDecoration: 'none',
              padding: '13px 16px',
              borderRadius: '10px',
              marginTop: '8px',
              textAlign: 'center',
              display: 'block',
              letterSpacing: '0.04em',
            }}
          >
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
}
