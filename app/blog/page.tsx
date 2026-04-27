'use client';

import { useState, useEffect } from 'react';

const blogPosts = [
  {
    id: 1,
    category: 'Caregiver Tips',
    title: 'Understanding the 5 Stages of Dementia: A Family Guide',
    excerpt:
      'Navigating dementia care can feel overwhelming. This guide walks you through each stage, what to expect, and how Abishag\'s specialists can help your family stay prepared and compassionate throughout the journey.',
    date: 'April 18, 2026',
    readTime: '6 min read',
    author: 'Dr. Meena Krishnamurthy',
    authorRole: 'Senior Geriatric Specialist',
    tag: 'Dementia',
    color: '#6AB04C',
  },
  {
    id: 2,
    category: 'Home Health',
    title: 'Why Home-Based ICU Care Is Changing Elder Healthcare',
    excerpt:
      'For critically ill patients, hospital stays can be disruptive and stressful. Learn how Abishag\'s Home ICU setup delivers hospital-grade critical care in the comfort of the patient\'s own home—without compromising quality.',
    date: 'April 14, 2026',
    readTime: '5 min read',
    author: 'Rajan Pillai',
    authorRole: 'Head of Home ICU Services',
    tag: 'ICU Care',
    color: '#3D1A0A',
  },
  {
    id: 3,
    category: 'Wellness',
    title: '10 Nutrition Tips for Seniors: Eating Well at Every Age',
    excerpt:
      'Proper nutrition is the foundation of healthy aging. Our certified dietician shares ten practical, easy-to-follow tips tailored for seniors—covering hydration, nutrient-dense foods, and meal scheduling strategies.',
    date: 'April 10, 2026',
    readTime: '4 min read',
    author: 'Priya Sundaram',
    authorRole: 'Certified Dietician',
    tag: 'Nutrition',
    color: '#4ABED6',
  },
  {
    id: 4,
    category: 'Mental Health',
    title: 'Combating Loneliness in Elderly Patients: What Families Can Do',
    excerpt:
      'Social isolation is a silent epidemic among seniors. Our mental health counselors explain the warning signs of loneliness in elderly patients and offer actionable advice for families and caregivers to foster connection.',
    date: 'April 6, 2026',
    readTime: '5 min read',
    author: 'Ananya Bose',
    authorRole: 'Mental Health Counselor',
    tag: 'Mental Health',
    color: '#6AB04C',
  },
  {
    id: 5,
    category: 'Palliative Care',
    title: 'What Is Palliative Care? Myths vs. Reality',
    excerpt:
      'Many families hesitate to consider palliative care due to misconceptions. This article clarifies what palliative care truly means—how it focuses on comfort, quality of life, and can be received alongside curative treatment.',
    date: 'April 2, 2026',
    readTime: '7 min read',
    author: 'Dr. Suresh Anand',
    authorRole: 'Palliative Care Physician',
    tag: 'Palliative Care',
    color: '#3D1A0A',
  },
  {
    id: 6,
    category: 'Caregiver Tips',
    title: 'How to Talk to Your Parents About Accepting Home Health Care',
    excerpt:
      'Convincing an elderly parent to accept help at home can be a sensitive conversation. This guide offers empathetic, practical communication strategies to ensure your loved ones feel heard, respected, and empowered.',
    date: 'March 28, 2026',
    readTime: '5 min read',
    author: 'Kavitha Ramesh',
    authorRole: 'Care Coordinator',
    tag: 'Family',
    color: '#4ABED6',
  },
];

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const openPost = (post: any) => {
    console.log("Opening post:", post.title);
    setSelectedPost(post);
    setIsModalVisible(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closePost = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedPost(null);
      document.body.style.overflow = 'auto';
    }, 300);
  };

  const categories = ['All', 'Caregiver Tips', 'Home Health', 'Wellness', 'Mental Health', 'Palliative Care'];

  const filtered =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div style={{ background: '#F4F1ED', minHeight: '100vh' }}>

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
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              fontSize: '0.7rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#6AB04C',
              marginBottom: '12px',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
          >
            Knowledge & Insights
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: '16px',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
            }}
          >
            Our Blog
          </h1>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.78)',
              fontWeight: 300,
              maxWidth: '560px',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
            }}
          >
            Expert insights, care guidance, and stories to help families navigate elderly home health with confidence.
          </p>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <section className="py-6 md:py-8" style={{ background: '#ffffff', borderBottom: '1px solid #DDD5CC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  letterSpacing: '0.04em',
                  padding: '8px 22px',
                  borderRadius: '24px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.25s, color 0.25s, transform 0.2s, box-shadow 0.25s',
                  background: activeCategory === cat ? '#6AB04C' : '#F4F1ED',
                  color: activeCategory === cat ? '#ffffff' : '#5C3D2A',
                  boxShadow: activeCategory === cat ? '0 4px 14px rgba(106,176,76,0.35)' : 'none',
                  transform: activeCategory === cat ? 'translateY(-1px)' : 'translateY(0)',
                }}
                onMouseEnter={e => {
                  if (activeCategory !== cat) {
                    (e.currentTarget as HTMLElement).style.background = '#EAF5E0';
                    (e.currentTarget as HTMLElement).style.color = '#3D1A0A';
                  }
                }}
                onMouseLeave={e => {
                  if (activeCategory !== cat) {
                    (e.currentTarget as HTMLElement).style.background = '#F4F1ED';
                    (e.currentTarget as HTMLElement).style.color = '#5C3D2A';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post, index) => (
            <article
              key={post.id}
              onClick={() => openPost(post)}
              style={{
                background: '#ffffff',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 4px 22px rgba(61,26,10,0.07)',
                cursor: 'pointer',
                transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                display: 'flex',
                flexDirection: 'column',
                opacity: isVisible ? 1 : 0,
                animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.08}s both` : 'none',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-7px)';
                el.style.boxShadow = '0 22px 52px rgba(61,26,10,0.14)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 4px 22px rgba(61,26,10,0.07)';
              }}
            >
              {/* Coloured top accent bar */}
              <div style={{ height: '5px', background: post.color, flexShrink: 0 }} />

              {/* Card Body */}
              <div className="p-6 md:p-8" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

                {/* Category + Tag */}
                <div className="flex items-center gap-3" style={{ marginBottom: '16px' }}>
                  <span
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.68rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: post.color,
                    }}
                  >
                    {post.category}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      background: '#F4F1ED',
                      color: '#5C3D2A',
                      padding: '3px 10px',
                      borderRadius: '20px',
                    }}
                  >
                    {post.tag}
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: '#3D1A0A',
                    lineHeight: 1.3,
                    marginBottom: '14px',
                  }}
                >
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    color: '#5C3D2A',
                    fontSize: '0.92rem',
                    lineHeight: 1.8,
                    flex: 1,
                    marginBottom: '24px',
                  }}
                >
                  {post.excerpt}
                </p>

                {/* Divider */}
                <div style={{ borderTop: '1px solid #EAE5DF', paddingTop: '18px' }}>
                  {/* Author */}
                  <div className="flex items-center gap-3" style={{ marginBottom: '14px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${post.color}, #3D1A0A)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ color: '#fff', fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '0.9rem' }}>
                        {post.author.charAt(post.author.indexOf(' ') + 1)}
                      </span>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#3D1A0A' }}>
                        {post.author}
                      </div>
                      <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.75rem', color: '#8C7B6E' }}>
                        {post.authorRole}
                      </div>
                    </div>
                  </div>

                  {/* Date + Read time + Read More */}
                  <div className="flex items-center justify-between">
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.78rem', color: '#8C7B6E' }}>
                      {post.date} · {post.readTime}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openPost(post);
                      }}
                      style={{
                        background: post.color,
                        border: 'none',
                        fontFamily: "'Nunito', sans-serif",
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        color: '#ffffff',
                        letterSpacing: '0.04em',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                        padding: '8px 18px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: `0 4px 12px ${post.color}44`,
                      }}
                      onMouseEnter={e => { 
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 16px ${post.color}66`;
                      }}
                      onMouseLeave={e => { 
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 12px ${post.color}44`;
                      }}
                      aria-label={`Read more about ${post.title}`}
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Blog Modal ── */}
      {selectedPost && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'rgba(61, 26, 10, 0.4)',
            backdropFilter: 'blur(8px)',
            opacity: isModalVisible ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
          onClick={closePost}
        >
          <div
            style={{
              background: '#ffffff',
              width: '100%',
              maxWidth: '800px',
              maxHeight: '90vh',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              transform: isModalVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ height: '6px', background: selectedPost.color }} />
            <div style={{ padding: '30px 40px', position: 'relative' }}>
              <button
                onClick={closePost}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: '#F4F1ED',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3D1A0A',
                  fontSize: '18px',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#EAE5DF')}
                onMouseLeave={e => (e.currentTarget.style.background = '#F4F1ED')}
              >
                ✕
              </button>

              <div className="flex items-center gap-3" style={{ marginBottom: '16px' }}>
                <span
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: selectedPost.color,
                  }}
                >
                  {selectedPost.category}
                </span>
                <span
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    background: '#F4F1ED',
                    color: '#5C3D2A',
                    padding: '3px 12px',
                    borderRadius: '20px',
                  }}
                >
                  {selectedPost.tag}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2.4rem',
                  fontWeight: 700,
                  color: '#3D1A0A',
                  lineHeight: 1.1,
                  marginBottom: '20px',
                }}
              >
                {selectedPost.title}
              </h2>

              <div className="flex items-center gap-4" style={{ marginBottom: '30px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${selectedPost.color}, #3D1A0A)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ color: '#fff', fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '1.2rem' }}>
                    {selectedPost.author.charAt(selectedPost.author.indexOf(' ') + 1)}
                  </span>
                </div>
                <div>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#3D1A0A' }}>
                    {selectedPost.author}
                  </div>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.85rem', color: '#8C7B6E' }}>
                    {selectedPost.authorRole} · {selectedPost.date}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '0 40px 40px', overflowY: 'auto', flex: 1 }}>
              <div
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: '1.1rem',
                  color: '#5C3D2A',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-line',
                }}
              >
                {selectedPost.excerpt}
                {"\n\n"}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                {"\n\n"}
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                {"\n\n"}
                At Abishag Home Health Services, we believe that personalized care is the foundation of wellness. Our team of specialists works tirelessly to ensure that every patient receives the highest quality of care in the comfort of their own home.
                {"\n\n"}
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '20px 40px', background: '#F9F7F4', borderTop: '1px solid #EAE5DF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.9rem', color: '#8C7B6E' }}>
                Estimated reading time: {selectedPost.readTime}
              </span>
              <button
                onClick={() => {
                  window.location.href = '/contact';
                  closePost();
                }}
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: '#ffffff',
                  background: '#6AB04C',
                  padding: '10px 24px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#3D7A28')}
                onMouseLeave={e => (e.currentTarget.style.background = '#6AB04C')}
              >
                Get More Information
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Newsletter CTA ── */}
      <section
        className="py-16 md:py-24"
        style={{
          background: 'linear-gradient(135deg, #3D1A0A 0%, #6B3020 48%, #4A8A30 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.08 }}>
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '18px',
              lineHeight: 1.18,
            }}
          >
            Stay Informed. Stay Caring.
          </h2>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.80)',
              marginBottom: '40px',
              fontWeight: 300,
            }}
          >
            Subscribe to our newsletter for the latest eldercare tips, health guides, and Abishag updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email address"
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: '0.95rem',
                padding: '14px 22px',
                borderRadius: '10px',
                border: 'none',
                outline: 'none',
                width: '100%',
                maxWidth: '340px',
                color: '#3D1A0A',
                boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              }}
            />
            <button
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: '0.95rem',
                color: '#3D1A0A',
                background: '#ffffff',
                padding: '14px 30px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                transition: 'transform 0.25s, box-shadow 0.25s',
                boxShadow: '0 6px 22px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px) scale(1.04)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 34px rgba(0,0,0,0.22)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 22px rgba(0,0,0,0.15)';
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
