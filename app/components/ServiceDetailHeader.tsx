'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import EcgHeartbeatWidget from './EcgHeartbeatWidget';

interface Props {
  title: string;
  /** Emoji or text icon from servicesData */
  icon: string;
  /** Optional ECG label, defaults to title */
  label?: string;
}

export default function ServiceDetailHeader({ title, icon, label }: Props) {
  // Render the service emoji as the ECG centre icon
  const ecgIcon = (
    <span
      style={{
        fontSize: '2.2rem',
        lineHeight: 1,
        filter: 'drop-shadow(0 0 10px rgba(106,176,76,0.75))',
      }}
      aria-hidden="true"
    >
      {icon}
    </span>
  );

  return (
    <section
      className="py-8 md:py-12"
      style={{
        background: 'linear-gradient(135deg, #3D1A0A 0%, #6B3020 55%, #4A8A30 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '20px' }}
        >
          <Link
            href="/services"
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              fontSize: '0.85rem',
              color: '#6AB04C',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Services
          </Link>
        </motion.div>

        {/* Two-column: title left · ECG right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

          {/* Left — Service title */}
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {title}
            </motion.h1>
          </div>

          {/* Right — Live ECG with service icon in centre */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: '140px' }}
          >
            <EcgHeartbeatWidget
              direction="rtl"
              icon={ecgIcon}
              label={label ?? title}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
