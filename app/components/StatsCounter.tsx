'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  label: string;
  suffix?: string;
  duration?: number;
  delay?: number;
}

const CountUp = ({ end, label, suffix = '', duration = 2000, delay = 0 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;
    let hasStarted = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          hasStarted = true;
          setTimeout(() => {
            const step = (timestamp: number) => {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / duration, 1);
              // easeOutQuart
              const easeProgress = 1 - Math.pow(1 - progress, 4);
              setCount(Math.floor(easeProgress * end));
              if (progress < 1) {
                animationFrame = requestAnimationFrame(step);
              } else {
                setCount(end);
              }
            };
            animationFrame = requestAnimationFrame(step);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, delay]);

  return (
    <div 
      ref={ref} 
      className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl shadow-[#3D1A0A]/5 border-t-[6px] border-[#6AB04C]"
      style={{ animation: `floatY ${3 + Math.random() * 2}s ease-in-out infinite` }}
    >
      <div className="text-4xl md:text-5xl font-bold text-[#3D1A0A] mb-2 font-serif">
        {count}{suffix}
      </div>
      <div className="text-[#5C3D2A] font-semibold tracking-wide text-sm uppercase">
        {label}
      </div>
    </div>
  );
};

export default function StatsCounter() {
  return (
    <section className="py-16 bg-[#F4F1ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <CountUp end={2000} suffix="+" label="Families Served" delay={0} />
          <CountUp end={15} suffix="+" label="Services" delay={150} />
          <CountUp end={8} suffix="+" label="Years Experience" delay={300} />
          <CountUp end={100} suffix="%" label="Trusted Care" delay={450} />
        </div>
      </div>
    </section>
  );
}
