'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MagneticButton from "./MagneticButton";
import EcgDoodleTransition from "./EcgDoodleTransition";

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

      {/* 🎨 Gradient Overlay - Simplified */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3D1A0A]/40 via-black/20 to-black/60" />

      {/* 🧡 Content (Bottom Left) */}
      <div key={`content-${index}`} className="absolute bottom-14 left-12 z-20 max-w-3xl text-left pl-6" style={{ borderLeft: '4px solid #6AB04C' }}>
        
        <h1
          className="text-4xl md:text-5xl md:text-[4rem] mb-3 leading-tight font-serif text-white"
        >
          {slide.title}
        </h1>

        <p
          className="text-lg md:text-xl font-light text-white mb-8 font-sans"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
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
