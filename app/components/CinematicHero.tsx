'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MagneticButton from "./MagneticButton";

const slides = [
  {
    title: "Compassionate Care at Home",
    subtitle: "Trusted healthcare services for families across Tamil Nadu",
    image: "/scene1.png",
  },
  {
    title: "Advanced Home ICU",
    subtitle: "Hospital-grade care in the comfort of your home",
    image: "/scene2.png",
  },
  {
    title: "Physiotherapy & Rehabilitation",
    subtitle: "Restoring movement, restoring confidence",
    image: "/scene3.png",
  },
  {
    title: "Teleconsultation Services",
    subtitle: "Expert doctors just a tap away",
    image: "/scene5.png",
  },
  {
    title: "Home Lab & Diagnostics",
    subtitle: "Precise diagnostics at your doorstep",
    image: "/scene6.png",
  },
  {
    title: "Medicine Delivery",
    subtitle: "Your prescriptions delivered, right on time",
    image: "/scene7.png",
  },
];

export default function CinematicHero() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const i = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(i);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative flex items-center justify-center overflow-hidden"
      style={{
        height: 'calc(100vh - 85px)',
        minHeight: '600px',
        width: '100%',
        marginTop: '0',
        borderRadius: '0',
        boxShadow: '0 12px 48px rgba(0,0,0,0.18)',
      }}
    >
      {/* 🌄 Background Images with smooth crossfade */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-in-out ${i === index ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
          style={{ backgroundImage: `url(${s.image})` }}
        />
      ))}

      {/* 🎨 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3D1A0A]/60 via-black/40 to-black/70" />

      {/* 🌿 Decorative Traditional Pattern */}
      {/* Removed kolam-pattern since we might not have the image, using CSS pattern instead */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
        backgroundSize: `20px 20px`
      }} />

      {/* 🌞 Soft Warm Glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#6AB04C]/20 blur-[120px]" />

      {/* 🧡 Content (Bottom Left) */}
      <div key={`content-${index}`} className="absolute bottom-14 left-12 z-20 max-w-3xl text-left pl-6" style={{ borderLeft: '4px solid #6AB04C' }}>
        {/* Title */}
        <h1 className="text-4xl md:text-5xl md:text-[4rem] mb-4 leading-tight" style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          color: '#ffffff',
          textShadow: '0 4px 24px rgba(0,0,0,0.5)', 
          perspective: '600px', 
          perspectiveOrigin: 'left center' 
        }}>
          {slide.title.split(" ").map((word, i) => (
            <span
              key={i}
              className="inline-block opacity-0 animate-[wordFade_0.6s_forwards]"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {word}&nbsp;
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p 
          className="text-lg md:text-xl font-light opacity-0 animate-[fadeInUp_0.8s_forwards] text-white mb-8" 
          style={{ 
            fontFamily: "'Nunito', sans-serif", 
            animationDelay: '0.7s',
            textShadow: '0 2px 12px rgba(0,0,0,0.6)'
          }}
        >
          {slide.subtitle}
        </p>

      </div>

      {/* Progress Bar — hidden */}
      <div key={`progress-${index}`} className="absolute bottom-0 left-0 h-[3px] w-full z-20" style={{ opacity: 0, pointerEvents: 'none' }}></div>
    </section>
  );
}
