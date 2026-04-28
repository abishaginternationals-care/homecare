'use client';

import { useState, useEffect } from 'react';
import Card3D from '../components/Card3D';
import { useScrollReveal } from '../hooks/useScrollReveal';

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
  useScrollReveal();
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const openPost = (post: any) => {
    setSelectedPost(post);
    setIsModalVisible(true);
    document.body.style.overflow = 'hidden';
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
    <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden', background: 'transparent' }}>

      <div className="relative z-10">
        {/* Page Header */}
        <section
          className="py-16 md:py-24"
          style={{
            background: 'linear-gradient(135deg, #3D1A0A 0%, #6B3020 55%, #4A8A30 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.1 }}>
             <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <p className="reveal" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6AB04C', marginBottom: '12px' }}>
              Knowledge & Insights
            </p>
            <h1 className="reveal reveal-delay-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem, 7vw, 4.5rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: '20px' }}>
              Our Blog
            </h1>
            <p className="reveal reveal-delay-2" style={{ fontFamily: "'Nunito', sans-serif", fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', fontWeight: 300, maxWidth: '600px', lineHeight: 1.6 }}>
              Expert insights, care guidance, and stories to help families navigate elderly home health with confidence.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 md:py-10" style={{ background: '#ffffff', borderBottom: '1px solid #DDD5CC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    padding: '10px 24px',
                    borderRadius: '30px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    background: activeCategory === cat ? '#6AB04C' : '#F4F1ED',
                    color: activeCategory === cat ? '#ffffff' : '#5C3D2A',
                    boxShadow: activeCategory === cat ? '0 8px 20px rgba(106, 176, 76, 0.3)' : 'none',
                    transform: activeCategory === cat ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {filtered.map((post, idx) => (
              <Card3D 
                key={post.id} 
                className={`reveal reveal-delay-${(idx % 3) + 1}`}
                style={{ borderRadius: '24px', height: '100%' }}
                glowColor={`${post.color}44`}
              >
                <article
                  style={{
                    background: '#ffffff',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    borderTop: `6px solid ${post.color}`,
                    boxShadow: '0 15px 45px rgba(61, 26, 10, 0.04)',
                  }}
                >
                  <div style={{ padding: '40px' }}>
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: post.color, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: post.color }} />
                      {post.category}
                    </div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.85rem', fontWeight: 700, color: '#3D1A0A', lineHeight: 1.25, marginBottom: '18px' }}>
                      {post.title}
                    </h2>
                    <p style={{ fontFamily: "'Nunito', sans-serif", color: '#5C3D2A', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '32px' }}>
                      {post.excerpt}
                    </p>
                    <div style={{ borderTop: '1px solid #EAE5DF', paddingTop: '24px' }}>
                      <div className="flex items-center gap-4 mb-5">
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, ${post.color}, #3D1A0A)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>
                          <span className="m-auto">{post.author.charAt(0)}</span>
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#3D1A0A' }}>{post.author}</div>
                          <div style={{ fontSize: '0.75rem', color: '#8C7B6E' }}>{post.authorRole}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div style={{ fontSize: '0.8rem', color: '#8C7B6E' }}>{post.date} · {post.readTime}</div>
                        <button
                          onClick={(e) => { e.stopPropagation(); openPost(post); }}
                          style={{ background: post.color, border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '10px', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.3s' }}
                          onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
                          onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </Card3D>
            ))}
          </div>
        </section>

        {/* Blog Modal */}
        {selectedPost && (
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(61, 26, 10, 0.4)', backdropFilter: 'blur(12px)', opacity: isModalVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
            onClick={closePost}
          >
            <div
              style={{ background: '#ffffff', width: '100%', maxWidth: '850px', maxHeight: '90vh', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 30px 70px rgba(0, 0, 0, 0.3)', display: 'flex', flexDirection: 'column', transform: isModalVisible ? 'scale(1)' : 'scale(0.95)', transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ height: '8px', background: selectedPost.color }} />
              <div style={{ padding: '40px 50px', overflowY: 'auto' }}>
                <div style={{ color: selectedPost.color, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', marginBottom: '16px' }}>{selectedPost.category}</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 700, color: '#3D1A0A', lineHeight: 1.2, marginBottom: '24px' }}>{selectedPost.title}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px', padding: '20px', background: '#F9F7F4', borderRadius: '16px' }}>
                   <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: selectedPost.color, display: 'flex', color: '#fff', fontWeight: 800 }}><span className="m-auto">{selectedPost.author.charAt(0)}</span></div>
                   <div>
                     <div style={{ fontWeight: 800, color: '#3D1A0A' }}>{selectedPost.author}</div>
                     <div style={{ fontSize: '0.85rem', color: '#8C7B6E' }}>{selectedPost.authorRole}</div>
                   </div>
                   <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                     <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#3D1A0A' }}>{selectedPost.date}</div>
                     <div style={{ fontSize: '0.8rem', color: '#8C7B6E' }}>{selectedPost.readTime}</div>
                   </div>
                </div>
                <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: '1.1rem', color: '#3D1A0A', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                  {selectedPost.excerpt}
                  {"\n\n"}
                  Caregiving is not just a service; it's a commitment to the dignity and comfort of our loved ones. At Abishag Home Health Services, we believe that every individual deserves to age with grace in the environment they love most—their home. 
                  {"\n\n"}
                  In this detailed exploration, we dive deep into the practicalities and emotional nuances of home healthcare. From managing complex medical needs like Home ICU setups to providing the simple but vital comfort of companionship, our team of experts is dedicated to setting the gold standard in elder care.
                  {"\n\n"}
                  Stay tuned for more updates, and remember that our Care Guides are always just a click away to help you navigate this journey.
                </div>
                <button onClick={closePost} style={{ marginTop: '50px', background: '#3D1A0A', color: '#fff', border: 'none', padding: '16px 40px', borderRadius: '15px', fontWeight: 800, cursor: 'pointer', width: '100%' }}>Close Article</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
