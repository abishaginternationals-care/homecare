import { servicesData } from '@/app/data/services';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData.find(s => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>
      {/* ── Page Header ── */}
      <section
        className="py-16 md:py-20"
        style={{
          background: 'linear-gradient(135deg, #3D1A0A 0%, #6B3020 55%, #4A8A30 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.08 }}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/services" style={{ 
            fontFamily: "'Nunito', sans-serif", 
            fontWeight: 700, 
            fontSize: '0.85rem', 
            color: '#6AB04C', 
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '20px'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Services
          </Link>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <span style={{ color: '#FFD700' }}>{service.icon}</span>
            {service.title}
          </h1>
        </div>
      </section>

      {/* ── Service Details ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div style={{
          background: 'rgba(255,255,255,0.78)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.60)',
          borderRadius: '24px',
          padding: '32px 48px',
          boxShadow: '0 12px 48px rgba(61,26,10,0.08)',
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Image */}
            <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
              <img 
                src={service.image} 
                alt={service.title} 
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', aspectRatio: '4/3' }} 
              />
            </div>

            {/* Content */}
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 700, color: '#3D1A0A', marginBottom: '24px' }}>
                About this Service
              </h2>
              
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '1.05rem', color: '#5C3D2A', lineHeight: 1.8, marginBottom: '30px' }}>
                {service.fullDetails || service.description}
              </p>

              <div style={{ background: '#F9F7F4', padding: '24px', borderRadius: '16px', borderLeft: '4px solid #6AB04C' }}>
                <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: '1rem', fontWeight: 800, color: '#3D1A0A', marginBottom: '12px' }}>
                  What's Included:
                </h3>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.95rem', color: '#5C3D2A', lineHeight: 1.6 }}>
                  {service.details}
                </p>
              </div>

              <div style={{ marginTop: '40px' }}>
                <Link 
                  href="/contact"
                  className="bg-[#6AB04C] hover:bg-[#3D7A28]"
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 800,
                    fontSize: '1rem',
                    color: '#ffffff',
                    padding: '14px 32px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s, transform 0.2s',
                    letterSpacing: '0.04em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 18px rgba(106,176,76,0.35)',
                  }}
                >
                  Book an Appointment
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
