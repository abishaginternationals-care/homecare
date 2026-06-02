'use client';

import { useState } from 'react';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '96px',
        right: '24px',
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexDirection: 'row-reverse',
      }}
    >
      {/* Tooltip label */}
      <a
        href="https://wa.me/917397390266"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: hovered
            ? '0 12px 36px rgba(37,211,102,0.65)'
            : '0 8px 24px rgba(37,211,102,0.45)',
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
          transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
          textDecoration: 'none',
          flexShrink: 0,
        }}
      >
        {/* Pulse ring */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid rgba(37,211,102,0.5)',
            animation: 'wpPulse 2s cubic-bezier(0,0,0.2,1) infinite',
            pointerEvents: 'none',
          }}
        />
        {/* WhatsApp SVG */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Tooltip */}
      <div
        style={{
          background: '#1a1a1a',
          color: '#fff',
          fontSize: '0.82rem',
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 700,
          padding: '8px 14px',
          borderRadius: '10px',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(8px)',
          transition: 'all 0.2s ease',
          pointerEvents: 'none',
        }}
      >
        Chat on WhatsApp
        {/* Arrow */}
        <span
          style={{
            position: 'absolute',
            right: '-6px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 0,
            height: 0,
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderLeft: '6px solid #1a1a1a',
          }}
        />
      </div>

      <style>{`
        @keyframes wpPulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(2.0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
