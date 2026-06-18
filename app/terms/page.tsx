import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Abishag Home Health Services terms and conditions. Understand the terms governing our home wellness support.',
  alternates: { canonical: 'https://abishaginternationals.com/terms' },
};

export default function TermsAndConditions() {
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
              Terms &amp; Conditions
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
                Acceptance of Terms
              </h2>
              <p>
                By accessing and using the Abishag Home Health Services website (abishaginternationals.com), you accept and agree
                to be bound by these Terms and Conditions. If you do not agree with any part, please do not use our website.
              </p>
            </section>

            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '12px' }}>
                Our Solutions
              </h2>
              <p>
                Abishag provides professional home nursing, caregiver assistance, physiotherapy, elder wellness support, and related
                medical coordination across Chennai and Tamil Nadu. All medical support is delivered by qualified, certified professionals.
              </p>
              <p style={{ marginTop: '8px' }}>
                Our support does not replace emergency medical attention. In case of a medical emergency, please call emergency
                services immediately.
              </p>
            </section>

            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '12px' }}>
                User Responsibilities
              </h2>
              <ul style={{ listStyleType: 'disc', paddingLeft: '24px' }} className="space-y-2">
                <li>Provide accurate and complete information when booking a session</li>
                <li>Maintain a safe environment for our professionals during home visits</li>
                <li>Communicate any changes in patient condition promptly</li>
                <li>Settle payments as per the agreed schedule</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '12px' }}>
                Intellectual Property
              </h2>
              <p>
                All content on this website — including text, images, logos, and design — is the property of Abishag Home Health Services
                and is protected by applicable intellectual property laws. Unauthorized use is prohibited.
              </p>
            </section>

            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '12px' }}>
                Limitation of Liability
              </h2>
              <p>
                While we strive to deliver the highest standard of support, Abishag shall not be held liable for any indirect, incidental,
                or consequential damages arising from the use of our website or solutions. Our total liability shall be limited to the
                fees paid for the specific solution in question.
              </p>
            </section>

            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '12px' }}>
                Governing Law
              </h2>
              <p>
                These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction
                of the courts in Chennai, Tamil Nadu.
              </p>
            </section>

            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '12px' }}>
                Contact
              </h2>
              <p>
                For questions about these Terms, contact us at{' '}
                <a href="tel:+919940179079" style={{ color: '#6AB04C', fontWeight: 700 }}>+91 99401 79079</a> or visit our{' '}
                <a href="/contact" style={{ color: '#6AB04C', fontWeight: 700 }}>Contact page</a>.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
