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
    }, 8000);
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
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${s.image})` }}
        />
      ))}

      {/* 🎨 Gradient Overlays - Layered for maximum text legibility */}
      <div className="absolute inset-0 bg-black/30 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />

      {/* 🧡 Content (Bottom Left) */}
      <div 
        key={`content-${index}`} 
        className="absolute bottom-14 left-12 z-20 max-w-3xl text-left pl-8 py-6 pr-12" 
        style={{ 
          borderLeft: '5px solid #6AB04C',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)',
          backdropFilter: 'blur(4px)',
          borderRadius: '0 24px 24px 0',
        }}
      >
        
        <h1
          className="text-4xl md:text-5xl md:text-[4.2rem] mb-4 leading-tight font-serif text-white font-bold"
          style={{ 
            textShadow: '0 4px 12px rgba(0,0,0,0.8), 0 8px 32px rgba(0,0,0,0.4)',
            letterSpacing: '-0.02em'
          }}
        >
          {slide.title}
        </h1>

        <p
          className="text-lg md:text-2xl font-medium text-white/95 mb-10 font-sans max-w-2xl"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
        >
          {slide.subtitle}
        </p>

        <div className="flex gap-4">
          <MagneticButton>
            <button 
              onClick={() => router.push('/services')}
              className="px-8 py-4 bg-[#6AB04C] text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              Our Services
            </button>
          </MagneticButton>
          <MagneticButton>
            <button 
              onClick={() => router.push('/about')}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
            >
              Learn More
            </button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
