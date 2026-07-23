import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  {
    id: 'jee',
    label: 'JEE Main & Advanced',
    shortBadge: 'JEE',
    image: '/edvedum/jee-student-ai.png',
    fallbackImage: '/edvedum/student-jee.png',
    alt: 'JEE aspirant preparing with EDVEDUM CBT mocks',
    badgeStyle: 'bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white border-blue-300/60 shadow-blue-500/35',
    accentText: 'text-[#60a5fa]',
    sub: 'Physics, Chemistry & Maths CBT Track',
  },
  {
    id: 'neet',
    label: 'NEET UG Medical',
    shortBadge: 'NEET',
    image: '/edvedum/neet-student-ai.png',
    fallbackImage: '/edvedum/student-neet.png',
    alt: 'NEET aspirant preparing with EDVEDUM NTA mocks',
    badgeStyle: 'bg-gradient-to-r from-[#1d4ed8] to-[#1e40af] text-white border-blue-300/60 shadow-blue-500/35',
    accentText: 'text-[#93c5fd]',
    sub: 'NCERT-Aligned Biology & Physics Track',
  },
  {
    id: 'foundation',
    label: 'Foundation Class 6–10',
    shortBadge: 'Foundation',
    image: '/edvedum/foundation-student-ai.png',
    fallbackImage: '/edvedum/student-foundation.png',
    alt: 'Foundation student preparing with EDVEDUM Academy',
    badgeStyle: 'bg-gradient-to-r from-[#7C3AED] to-purple-700 text-white border-purple-300/60 shadow-purple-500/35',
    accentText: 'text-[#c084fc]',
    sub: 'Early Entrance & Concept Building Track',
  },
];

export default function HomeHeroVisual() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = SLIDES[currentIndex];

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <p className="mb-2 text-center text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#94A3B8]">
        JEE · NEET · Foundation
      </p>

      {/* Main Image Frame with Balanced Aspect Ratio */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-700/80 shadow-2xl shadow-slate-950/70 bg-slate-950">
        <div className="relative h-52 sm:h-56 xl:h-64 w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="absolute inset-0 h-full w-full"
            >
              <img
                src={activeSlide.image}
                alt={activeSlide.alt}
                className="h-full w-full object-cover object-top"
                onError={(e) => {
                  e.currentTarget.src = activeSlide.fallbackImage;
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#010d1f] via-[#010d1f]/30 to-transparent"
                aria-hidden
              />
            </motion.div>
          </AnimatePresence>

          {/* Active Synced Badge Top-Left Overlay */}
          <div className="absolute left-3 top-3 z-10">
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider shadow-md backdrop-blur-md transition-all duration-300 ${activeSlide.badgeStyle}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span>{activeSlide.shortBadge}</span>
            </span>
          </div>

          {/* Target Track Caption Overlay Bottom */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 pt-8 bg-gradient-to-t from-[#010d1f] via-[#010d1f]/80 to-transparent">
            <p className={`text-xs font-extrabold uppercase tracking-wider ${activeSlide.accentText}`}>
              {activeSlide.label}
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-slate-300 leading-snug">
              {activeSlide.sub}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Carousel Dot Indicators */}
      <div className="mt-2.5 flex items-center justify-center gap-2">
        {SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'w-6 bg-[#2563eb] shadow-[0_0_10px_rgba(37,99,235,0.7)]'
                  : 'w-1.5 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Go to ${slide.label} slide`}
            />
          );
        })}
      </div>
    </div>
  );
}
