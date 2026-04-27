'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/blog', label: 'Blog' },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      style={{
        background: '#ffffff',
        borderBottom: '1.5px solid #DDD5CC',
        boxShadow: '0 2px 14px rgba(61,26,10,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="px-2 sm:px-4 lg:px-6">
        {/* Top bar */}
        <div className="flex justify-between items-center" style={{ height: '84px' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group py-1" onClick={() => setMenuOpen(false)}>
            <div
              className="transition-transform duration-300 group-hover:scale-105"
              style={{ height: '62px', width: '62px', flexShrink: 0 }}
            >
              <img
                src="/logo-transparent.png"
                alt="Abishag Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginTop: '4px' }}>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: '#3D1A0A',
                  lineHeight: 0.9,
                  letterSpacing: '-0.01em',
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
                    color: isActive ? '#3D1A0A' : '#5C3D2A',
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    padding: '5px 0',
                    borderBottom: isActive ? '2px solid #6AB04C' : '2px solid transparent',
                    transition: 'color 0.2s, border-color 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => {
                    (e.target as HTMLElement).style.color = '#3D1A0A';
                    (e.target as HTMLElement).style.borderBottomColor = '#6AB04C';
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLElement).style.color = isActive ? '#3D1A0A' : '#5C3D2A';
                    (e.target as HTMLElement).style.borderBottomColor = isActive ? '#6AB04C' : 'transparent';
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
                background: '#6AB04C',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                padding: '8px 18px',
                borderRadius: '8px',
                transition: 'background 0.2s, transform 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.background = '#3D1A0A';
                (e.target as HTMLElement).style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.background = '#6AB04C';
                (e.target as HTMLElement).style.transform = 'scale(1)';
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
                  if (!isActive) {
                    (e.target as HTMLElement).style.background = '#F9F7F4';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.background = 'transparent';
                  }
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
              background: '#6AB04C',
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
