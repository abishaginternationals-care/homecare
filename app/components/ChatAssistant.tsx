'use client';

import { useState, useRef, useEffect } from 'react';

// ── Types ────────────────────────────────────────────────────────────────────
interface Message {
  from: 'bot' | 'user';
  text: string;
}

interface Option {
  label: string;
  next: string;
}

interface Node {
  text: string;
  options?: Option[];
  link?: string;
}

// ── Conversation flow ────────────────────────────────────────────────────────
const flow: Record<string, Node> = {
  start: {
    text: "Hello! I'm the Abishag Care Guide. I'm here to help you find the right service for your loved one. What best describes your situation?",
    options: [
      { label: 'I need daily care support at home', next: 'daily_care' },
      { label: 'My loved one has a specific condition', next: 'condition' },
      { label: 'Looking for medical/clinical services', next: 'medical' },
      { label: 'End-of-life or comfort care', next: 'end_of_life' },
      { label: 'I need help with logistics & support', next: 'logistics' },
    ],
  },
  daily_care: {
    text: 'Great. For day-to-day home care, what kind of support is needed most?',
    options: [
      { label: 'Companionship, meals, hygiene (Caregiver)', next: 'rec_caregiver' },
      { label: 'Medication & wound care (Nurse)', next: 'rec_nursing' },
      { label: 'Specialist therapy (Physio / OT / Speech)', next: 'rec_allied' },
      { label: 'Elderly-focused comprehensive care', next: 'rec_geriatric' },
    ],
  },
  condition: {
    text: 'Which condition are you managing?',
    options: [
      { label: 'Dementia / Alzheimer\'s', next: 'rec_dementia' },
      { label: 'Serious / terminal illness', next: 'rec_palliative' },
      { label: 'Post-surgery / acute recovery', next: 'rec_nursing' },
      { label: 'Mental health concerns', next: 'rec_mental' },
      { label: 'General elderly / frailty', next: 'rec_geriatric' },
    ],
  },
  medical: {
    text: 'Which medical service are you looking for?',
    options: [
      { label: 'Lab tests at home', next: 'rec_lab' },
      { label: 'Medication delivery', next: 'rec_pharmacy' },
      { label: 'Medical equipment setup', next: 'rec_equipment' },
      { label: 'Home ICU setup', next: 'rec_icu' },
      { label: 'Dietician / nutrition advice', next: 'rec_dietician' },
    ],
  },
  end_of_life: {
    text: 'We understand this is a difficult time. What kind of support are you looking for?',
    options: [
      { label: 'Comfort & dignity care (Hospice)', next: 'rec_hospice' },
      { label: 'Pain & symptom relief (Palliative)', next: 'rec_palliative' },
      { label: 'Emotional & mental health support', next: 'rec_mental' },
    ],
  },
  logistics: {
    text: 'How can we help with coordination and support?',
    options: [
      { label: 'Scheduling multiple services', next: 'rec_coordination' },
      { label: 'Quick on-demand nurse visit', next: 'rec_nursevisit' },
      { label: 'Not sure — show me all services', next: 'rec_all' },
    ],
  },

  // ── Recommendations ──────────────────────────────────────────────────────
  rec_caregiver: {
    text: '✦ We recommend: Caregiver Services\n\nOur trained caregivers assist with daily activities, personal hygiene, meal prep, and companionship — helping your loved one stay comfortable at home.',
    link: '/services',
    options: [{ label: 'View all services', next: 'rec_all' }, { label: 'Start over', next: 'start' }],
  },
  rec_nursing: {
    text: '✦ We recommend: Nursing Services\n\nLicensed nurses provide wound care, medication management, health monitoring, and post-operative support directly at home.',
    link: '/services',
    options: [{ label: 'View all services', next: 'rec_all' }, { label: 'Start over', next: 'start' }],
  },
  rec_allied: {
    text: '✦ We recommend: Allied Health Visit\n\nOur allied health team — physiotherapists, occupational therapists, and speech therapists — provide specialist rehabilitation at home.',
    link: '/services',
    options: [{ label: 'View all services', next: 'rec_all' }, { label: 'Start over', next: 'start' }],
  },
  rec_geriatric: {
    text: '✦ We recommend: Geriatric Care\n\nComprehensive, personalised care for the elderly covering chronic disease management, wellness monitoring, and fall prevention.',
    link: '/services',
    options: [{ label: 'View all services', next: 'rec_all' }, { label: 'Start over', next: 'start' }],
  },
  rec_dementia: {
    text: '✦ We recommend: Dementia Care\n\nOur dementia specialists create safe, structured environments with memory activities and behavioural support to improve quality of life.',
    link: '/services',
    options: [{ label: 'View all services', next: 'rec_all' }, { label: 'Start over', next: 'start' }],
  },
  rec_palliative: {
    text: '✦ We recommend: Palliative Care\n\nFocused on comfort and quality of life, our palliative team manages pain, symptoms, and emotional needs alongside any ongoing treatment.',
    link: '/services',
    options: [{ label: 'View all services', next: 'rec_all' }, { label: 'Start over', next: 'start' }],
  },
  rec_mental: {
    text: '✦ We recommend: Mental Health Counseling\n\nProfessional counsellors provide individual therapy, grief support, and stress management for seniors and their families.',
    link: '/services',
    options: [{ label: 'View all services', next: 'rec_all' }, { label: 'Start over', next: 'start' }],
  },
  rec_hospice: {
    text: '✦ We recommend: Hospice Care\n\nCompassionate end-of-life care focused on comfort, dignity, spiritual support, and family guidance during the most difficult times.',
    link: '/services',
    options: [{ label: 'View all services', next: 'rec_all' }, { label: 'Start over', next: 'start' }],
  },
  rec_lab: {
    text: '✦ We recommend: Lab Sample Collection\n\nWe collect blood samples, urine tests, and more at home — results delivered directly to you, no hospital visit needed.',
    link: '/services',
    options: [{ label: 'View all services', next: 'rec_all' }, { label: 'Start over', next: 'start' }],
  },
  rec_pharmacy: {
    text: '✦ We recommend: Pharmacy Delivery\n\nTimely delivery of prescribed medications and medical supplies directly to your doorstep, with refill reminders.',
    link: '/services',
    options: [{ label: 'View all services', next: 'rec_all' }, { label: 'Start over', next: 'start' }],
  },
  rec_equipment: {
    text: '✦ We recommend: Medical Equipment Setup\n\nProfessional setup and training for home medical equipment — oxygen systems, hospital beds, wheelchairs, and monitoring devices.',
    link: '/services',
    options: [{ label: 'View all services', next: 'rec_all' }, { label: 'Start over', next: 'start' }],
  },
  rec_icu: {
    text: '✦ We recommend: ICU Setup at Home\n\nFor critically ill patients — we replicate hospital-grade ICU care at home with ventilator support, cardiac monitoring, and 24/7 specialist nursing.',
    link: '/services',
    options: [{ label: 'View all services', next: 'rec_all' }, { label: 'Start over', next: 'start' }],
  },
  rec_dietician: {
    text: '✦ We recommend: Dietician Consultation\n\nCertified dieticians create personalised meal plans and nutritional strategies tailored to your loved one\'s health conditions.',
    link: '/services',
    options: [{ label: 'View all services', next: 'rec_all' }, { label: 'Start over', next: 'start' }],
  },
  rec_coordination: {
    text: '✦ We recommend: Care Coordination\n\nOur care coordinators manage all your services — scheduling, doctor communication, family updates, and progress tracking — in one place.',
    link: '/services',
    options: [{ label: 'View all services', next: 'rec_all' }, { label: 'Start over', next: 'start' }],
  },
  rec_nursevisit: {
    text: '✦ We recommend: Nurse Visit (On-demand)\n\nBook an on-call nurse visit for urgent health checks, medication, or monitoring — scheduled or on-demand.',
    link: '/services',
    options: [{ label: 'View all services', next: 'rec_all' }, { label: 'Start over', next: 'start' }],
  },
  rec_all: {
    text: 'You can explore our full range of 15 services on the Services page. Our team can also help you put together a personalised care plan.',
    link: '/services',
    options: [{ label: 'Start over', next: 'start' }],
  },
};

// ── Component ────────────────────────────────────────────────────────────────
export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentNode, setCurrentNode] = useState('start');
  const [showOptions, setShowOptions] = useState(true);
  const [showBot, setShowBot] = useState(false);
  const [chatHovered, setChatHovered] = useState(false);
  const [waHovered, setWaHovered] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Deferred bot entrance after load and intro animation complete
  useEffect(() => {
    const isHomepage = window.location.pathname === '/';
    
    const checkConditions = () => {
      const hasSeenIntro = sessionStorage.getItem('hasSeenIntro') === 'true';
      if (isHomepage && !hasSeenIntro) return false;
      if (typeof document !== 'undefined' && document.readyState !== 'complete') return false;
      return true;
    };

    const tryShowingBot = () => {
      if (checkConditions()) {
        setTimeout(() => setShowBot(true), 1200);
        return true;
      }
      return false;
    };

    if (tryShowingBot()) return;

    const handleLoad = () => tryShowingBot();
    const handleIntroComplete = () => tryShowingBot();

    window.addEventListener('load', handleLoad);
    window.addEventListener('introComplete', handleIntroComplete);

    const intervalId = setInterval(() => {
      if (tryShowingBot()) {
        clearInterval(intervalId);
      }
    }, 200);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('introComplete', handleIntroComplete);
      clearInterval(intervalId);
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const openChat = () => {
    if (!open && messages.length === 0) {
      const node = flow['start'];
      setMessages([{ from: 'bot', text: node.text }]);
    }
    setOpen(true);
  };

  const handleOption = (option: Option) => {
    const userMsg: Message = { from: 'user', text: option.label };
    const nextNode = flow[option.next];
    const botMsg: Message = { from: 'bot', text: nextNode.text };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setCurrentNode(option.next);
    setShowOptions(true);
  };

  const node = flow[currentNode];

  return (
    <>
      {/* ── Floating AI Chat Button ── */}
      <div 
        style={{ 
          position: 'fixed', 
          bottom: '24px', 
          right: '24px', 
          zIndex: 9999,
          opacity: showBot ? 1 : 0,
          transform: showBot ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.8)',
          transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
          pointerEvents: showBot ? 'auto' : 'none',
        }}
      >
        {/* Tooltip */}
        <div style={{
          position: 'absolute',
          right: '66px',
          top: '50%',
          background: 'rgba(61,26,10,0.92)',
          color: '#ffffff',
          fontFamily: "'Nunito', sans-serif",
          fontSize: '0.75rem',
          fontWeight: 700,
          padding: '6px 12px',
          borderRadius: '8px',
          whiteSpace: 'nowrap',
          opacity: chatHovered && !open ? 1 : 0,
          transform: chatHovered && !open ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(8px)',
          transition: 'all 0.2s ease',
          pointerEvents: 'none',
        }}
        className="chat-tooltip"
        >
          Care Guide
        </div>
        {/* Button */}
        <button
          onClick={openChat}
          aria-label="Open care guide chat"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6AB04C, #3D7A28)',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 6px 28px rgba(61,26,10,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
            position: 'relative',
          }}
          onMouseEnter={(e) => {
            setChatHovered(true);
            (e.currentTarget as HTMLElement).style.transform = 'scale(1.12) translateY(-2px)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px rgba(61,26,10,0.4)';
          }}
          onMouseLeave={(e) => {
            setChatHovered(false);
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(61,26,10,0.35)';
          }}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>
      </div>

      {/* ── WhatsApp Floating Button ── */}
      <div style={{
        position: 'fixed',
        bottom: '96px',
        right: '24px',
        zIndex: 9997,
        opacity: !showBot ? 0 : (open ? 0 : 1),
        pointerEvents: (showBot && !open) ? 'auto' : 'none',
        transform: !showBot ? 'translateY(40px) scale(0.8)' : (open ? 'translateY(20px) scale(0.8)' : 'translateY(0) scale(1)'),
        transition: 'all 0.45s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        {/* Tooltip */}
        <div style={{
          position: 'absolute',
          right: '66px',
          top: '50%',
          background: 'rgba(61,26,10,0.92)',
          color: '#ffffff',
          fontFamily: "'Nunito', sans-serif",
          fontSize: '0.75rem',
          fontWeight: 700,
          padding: '6px 12px',
          borderRadius: '8px',
          whiteSpace: 'nowrap',
          opacity: waHovered ? 1 : 0,
          transform: waHovered ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(8px)',
          transition: 'all 0.2s ease',
          pointerEvents: 'none',
        }}
        className="whatsapp-tooltip"
        >
          Chat on WhatsApp
        </div>
        <a
          href="https://wa.me/917397390266?text=Hello!%20I%20have%20an%20inquiry%20about%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#25D366',
            color: '#ffffff',
            boxShadow: '0 6px 28px rgba(61,26,10,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease',
            position: 'relative',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            setWaHovered(true);
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.12)';
            e.currentTarget.style.boxShadow = '0 12px 36px rgba(37,211,102,0.65)';
          }}
          onMouseLeave={(e) => {
            setWaHovered(false);
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 6px 28px rgba(61,26,10,0.25)';
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
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </a>
      </div>

      {/* ── Chat panel ── */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '88px',
            right: '10px',
            zIndex: 9998,
            width: 'min(360px, calc(100vw - 20px))',
            maxHeight: 'min(540px, calc(100vh - 110px))',
            background: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(61,26,10,0.22)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'chatSlideUp 0.3s ease-out',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #3D1A0A 0%, #6B3020 55%, #4A8A30 100%)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6AB04C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                Abishag Care Guide
              </div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.7rem', color: '#6AB04C', fontWeight: 600 }}>
                Online — here to help
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', padding: '4px' }}
              aria-label="Close chat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              background: '#F9F7F4',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '10px 14px',
                    borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.from === 'user' ? '#6AB04C' : '#ffffff',
                    color: msg.from === 'user' ? '#ffffff' : '#3D1A0A',
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: '0.85rem',
                    lineHeight: 1.6,
                    boxShadow: '0 2px 8px rgba(61,26,10,0.08)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Options */}
            {showOptions && node.options && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                {node.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOption(opt)}
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#3D1A0A',
                      background: '#ffffff',
                      border: '2px solid #DDD5CC',
                      borderRadius: '12px',
                      padding: '9px 14px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'border-color 0.2s, background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = '#6AB04C';
                      el.style.background = '#EAF5E0';
                      el.style.color = '#2D5A1A';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = '#DDD5CC';
                      el.style.background = '#ffffff';
                      el.style.color = '#3D1A0A';
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {/* Service link */}
            {node.link && (
              <a
                href={node.link}
                style={{
                  display: 'inline-block',
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  color: '#ffffff',
                  background: '#3D1A0A',
                  padding: '9px 18px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  marginTop: '4px',
                  transition: 'background 0.2s',
                  alignSelf: 'flex-start',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#6AB04C')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#3D1A0A')}
              >
                View Services Page →
              </a>
            )}

            <div ref={bottomRef} />
          </div>
        </div>
      )}

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes wpPulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(2.0); opacity: 0; }
        }
      `}</style>
    </>
  );
}
