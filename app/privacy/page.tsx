import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Abishag Home Health Services privacy policy. Learn how we collect, use, and protect your personal information.',
  alternates: { canonical: 'https://abishaginternationals.com/privacy' },
};

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: 'transparent' }}>
      <div className="relative z-10">
        {/* Header */}
        <section
          className="py-8 md:py-12"
          style={{
            background: 'linear-gradient(135deg, rgba(61, 26, 10, 0.85) 0%, rgba(45, 40, 115, 0.85) 100%)',
            position: 'relative',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.1,
              }}
            >
              Privacy Policy
            </h1>
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.7)',
                marginTop: '8px',
              }}
            >
              Last updated: June 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div
            style={{
              fontFamily: "'Nunito', sans-serif",
              color: '#5C3D2A',
              fontSize: '1rem',
              lineHeight: 1.9,
            }}
            className="space-y-8"
          >
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '12px' }}>
                Information We Collect
              </h2>
              <p>When you use our website or request our home wellness support, we may collect the following information:</p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginTop: '12px' }} className="space-y-2">
                <li>Personal details such as your name, phone number, and email address</li>
                <li>Medical information relevant to providing appropriate support</li>
                <li>Address and location data for home visit scheduling</li>
                <li>Website usage data through cookies and analytics</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '12px' }}>
                How We Use Your Information
              </h2>
              <p>We use your personal information to:</p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginTop: '12px' }} className="space-y-2">
                <li>Deliver and coordinate home wellness solutions tailored to your needs</li>
                <li>Communicate about appointments, follow-ups, and new offerings</li>
                <li>Improve our website and user experience through analytics</li>
                <li>Comply with legal and regulatory obligations</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '12px' }}>
                Data Protection & Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access,
                alteration, disclosure, or destruction. All patient-related information is stored securely and accessible only to authorized personnel.
              </p>
            </section>

            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '12px' }}>
                Third-Party Sharing
              </h2>
              <p>
                We do not sell, trade, or share your personal information with third parties except as necessary to deliver our support
                (e.g., coordinating with healthcare professionals) or as required by law.
              </p>
            </section>

            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '12px' }}>
                Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginTop: '12px' }} className="space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction or deletion of your data</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Lodge a complaint with a data protection authority</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '12px' }}>
                Contact Us
              </h2>
              <p>
                For questions about this Privacy Policy, contact us at{' '}
                <a href="tel:+919940179079" style={{ color: '#6AB04C', fontWeight: 700 }}>+91 99401 79079</a> or visit our{' '}
                <a href="/contact" style={{ color: '#6AB04C', fontWeight: 700 }}>Contact page</a>.
              </p>
              <p style={{ marginTop: '8px' }}>
                <strong>Office:</strong> 9/860, Nallathambi Nagar, Natesan 2nd Street, Medavakam, Chennai – 600100
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
