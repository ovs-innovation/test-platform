import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Award,
  ArrowRight,
  Play,
  Star,
  CheckCircle2,
  BrainCircuit,
  Target,
  TrendingUp,
  Clock,
  Zap,
  BookOpen,
  Lightbulb,
  Trophy,
  GraduationCap,
  ShieldCheck,
  Check
} from 'lucide-react';
import { EDVEDUM_LOGO, EDVEDUM_LOGO_ALT } from '../../data/edvedumContent.js';

// Ambient stars/particles overlay - RESTRICTED TO LEFT SIDE ONLY (x: 0% to 45%)
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 45, // Strictly left side only
  y: Math.random() * 88 + 5,
  size: Math.random() * 2.8 + 2.2,
  duration: Math.random() * 7 + 7,
  delay: Math.random() * 5,
  glowType: i % 3 === 0 ? 'purple' : i % 2 === 0 ? 'cyan' : 'sky',
  isTwinkle: i % 4 === 0,
}));

export default function EdvedumHero() {
  return (
    <section className="relative overflow-hidden bg-[#010d1f] text-white selection:bg-cyan-500 selection:text-slate-900 min-h-[640px] lg:min-h-[690px] pb-14 sm:pb-16 lg:pb-24">

      {/* 1. EDVEDUM BRANDED STUDENT HERO BACKGROUND (Desktop Only - lg:block) */}
      <div
        className="hidden lg:block absolute inset-0 bg-no-repeat opacity-95 transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: "url('/edvedum/fullwidth-hero-bg.png?v=12')",
          backgroundPosition: 'right center',
          backgroundSize: 'contain',
          filter: 'drop-shadow(0 20px 35px rgba(1,13,31,0.95)) drop-shadow(0 0 30px rgba(0,240,255,0.18))',
          maskImage: 'linear-gradient(to right, transparent 35%, black 65%), linear-gradient(to top, transparent 0%, black 25%)',
          WebkitMaskImage: '-webkit-linear-gradient(left, transparent 35%, black 65%), -webkit-linear-gradient(bottom, transparent 0%, black 25%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'destination-in',
        }}
        aria-hidden="true"
      />

      {/* 2. MAIN LEFT-TO-RIGHT GRADIENT OVERLAY FOR ABSOLUTE SMOOTH TEXT BLENDING */}
      <div
        className="hidden lg:block absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#010d1f] via-[#010d1f]/95 to-transparent pointer-events-none z-[2]"
        aria-hidden="true"
      />

      {/* 3. SOFT BOTTOM GRADIENT MASK FOR SMOOTH PHOTO BLENDING */}
      <div
        className="hidden lg:block absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#010d1f] via-[#010d1f]/85 to-transparent pointer-events-none z-[2]"
        aria-hidden="true"
      />

      {/* 4. SOFT RIGHT EDGE GRADIENT MASK */}
      <div
        className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#010d1f] via-[#010d1f]/40 to-transparent pointer-events-none z-[2]"
        aria-hidden="true"
      />

      {/* Aurora Lighting Streaks (Left side emphasis) */}
      <motion.div
        animate={{
          opacity: [0.3, 0.45, 0.3],
          scale: [1, 1.12, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-20 h-[460px] w-[460px] rounded-full bg-cyan-500/15 blur-[130px] pointer-events-none"
      />

      {/* Floating Star Particles (Left Side Only) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {PARTICLES.map((p) => {
          let glowClass = 'bg-cyan-300 shadow-[0_0_12px_#38bdf8]';
          if (p.glowType === 'purple') glowClass = 'bg-purple-300 shadow-[0_0_14px_#c084fc]';
          if (p.glowType === 'sky') glowClass = 'bg-sky-200 shadow-[0_0_10px_#7dd3fc]';

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0.2, y: 0, scale: 1 }}
              animate={{
                opacity: p.isTwinkle ? [0.2, 0.85, 0.3, 0.9, 0.2] : [0.2, 0.85, 0.2],
                scale: p.isTwinkle ? [1, 1.35, 1, 1.2, 1] : [1, 1.15, 1],
                y: [-10, -90],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
              className={`absolute rounded-full ${glowClass}`}
            />
          );
        })}
      </div>

      {/* ================= HERO OVERLAY CONTENT ================= */}
      <div className="relative mx-auto max-w-[1400px] px-4 pt-8 pb-12 sm:px-6 lg:px-8 lg:pt-14 lg:pb-20">

        {/* Main Content Area */}
        <div className="relative z-10 max-w-2xl lg:max-w-3xl">

          {/* 1. BADGE ROW - Split into 2 Separate Pill Elements */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3"
          >
            {/* Badge 1: AI-Powered CBT Ecosystem 2026 */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00F0FF]/40 bg-slate-950/80 px-3.5 py-1.5 sm:px-4 backdrop-blur-xl shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#00F0FF] uppercase">
                AI-POWERED CBT ECOSYSTEM 2026
              </span>
            </div>

            {/* Badge 2: NTA Pattern Live */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#7C3AED]/40 bg-slate-950/80 px-3.5 py-1.5 sm:px-4 backdrop-blur-xl shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" />
              <span className="text-[10px] sm:text-[11px] font-semibold text-purple-300">
                NTA Pattern Live
              </span>
            </div>
          </motion.div>

          {/* 2. MOBILE HERO VISUAL - Tight Circular Mask (100% Corner Elimination) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 mb-2 block lg:hidden w-full max-w-sm sm:max-w-md mx-auto"
          >
            <div
              className="relative overflow-hidden"
              style={{
                maskImage: 'radial-gradient(circle 50% at 50% 50%, black 10%, transparent 62%)',
                WebkitMaskImage: 'radial-gradient(circle 50% at 50% 50%, black 10%, transparent 62%)',
              }}
            >
              <img
                src="/edvedum/fullwidth-hero-bg.png?v=12"
                alt="Edvedum NTA CBT Mock Exam Interface & Mobile App"
                className="w-full h-auto max-h-[300px] object-contain mx-auto scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#010d1f] via-[#010d1f]/80 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#010d1f] via-[#010d1f]/80 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-[#010d1f] via-[#010d1f]/80 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[#010d1f] via-[#010d1f]/80 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* 2. HEADLINE - Snug Underline Offset & Bottom Margin */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 sm:mt-6 text-2xl xs:text-3xl font-extrabold tracking-tight text-[#F5F6FA] sm:text-4xl lg:text-[2.85rem] xl:text-[3.1rem] leading-[1.25] sm:leading-[1.22]"
          >
            Where Future <br />
            <span className="whitespace-nowrap inline-block mt-1 mb-2 sm:mb-2.5">
              <span className="relative inline-block font-extrabold text-[#0D6EFD] after:absolute after:-bottom-0.5 after:left-0 after:h-[3px] after:w-full after:bg-[#0D6EFD]">
                Doctors
              </span>{' '}
              <span className="text-[#F5F6FA]">&amp;</span>{' '}
              <span className="relative inline-block font-extrabold text-[#7C3AED] after:absolute after:-bottom-0.5 after:left-0 after:h-[3px] after:w-full after:bg-[#7C3AED]">
                Engineers
              </span>
            </span>
            <br />
            Master Rank Success.
          </motion.h1>

          {/* 3. SUBHEADING PARAGRAPH */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-[#94A3B8]"
          >
            Not just another coaching platform — the future of competitive learning.
          </motion.p>

          {/* 4. CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 sm:mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            {/* Primary Button */}
            <Link
              to="/free-mock"
              className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-6 py-3.5 sm:px-8 sm:py-3.5 text-base sm:text-lg font-bold text-white shadow-[0_0_28px_rgba(37,99,235,0.45)] transition-all duration-300 hover:shadow-[0_0_38px_rgba(6,182,212,0.65)] hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Start Free Mock Test</span>
              <ArrowRight className="h-4.5 w-4.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary Button */}
            <Link
              to="/test-series"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-[#00F0FF]/60 bg-slate-900/70 px-6 py-3.5 sm:px-8 sm:py-3.5 text-base sm:text-lg font-bold text-[#F5F6FA] backdrop-blur-xl shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all duration-300 hover:border-[#00F0FF] hover:bg-slate-800/90 hover:shadow-[0_0_30px_rgba(0,240,255,0.45)] hover:scale-[1.03]"
            >
              <Play className="h-4.5 w-4.5 fill-[#00F0FF] text-[#00F0FF] shrink-0 transition-transform group-hover:scale-110" />
              <span>Explore Test Series</span>
            </Link>
          </motion.div>

          {/* 5. ICON ROW */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-xl mx-auto sm:mx-0"
          >
            {/* Subtle Clean Slate Divider Line */}
            <div className="h-[1px] w-full bg-slate-800/80 mt-4 mb-3.5 sm:mt-5 sm:mb-4 lg:mt-6 lg:mb-4" aria-hidden="true" />

            {/* 4 Equally Spaced Brand Items (Centered 2x2 Grid on Mobile) */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 sm:grid-cols-4">
              {/* LEARN */}
              <div className="group flex flex-col items-center text-center sm:items-start sm:text-left gap-1.5 sm:gap-2 cursor-default transition-all duration-250">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.15)] transition-all duration-250 group-hover:scale-[1.08]">
                  <BookOpen className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-cyan-300" strokeWidth={1.8} />
                </div>
                <div>
                  <span className="block text-[11px] sm:text-xs font-bold tracking-wider text-slate-100 uppercase transition-colors duration-250 group-hover:text-white">
                    LEARN
                  </span>
                  <p className="text-[10px] sm:text-[11px] text-[#94A3B8] font-medium leading-tight mt-0.5 transition-colors duration-250 group-hover:text-slate-300">
                    Build Strong Concepts
                  </p>
                </div>
              </div>

              {/* PRACTICE */}
              <div className="group flex flex-col items-center text-center sm:items-start sm:text-left gap-1.5 sm:gap-2 cursor-default transition-all duration-250">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-500/10 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.15)] transition-all duration-250 group-hover:scale-[1.08]">
                  <Zap className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-sky-300" strokeWidth={1.8} />
                </div>
                <div>
                  <span className="block text-[11px] sm:text-xs font-bold tracking-wider text-slate-100 uppercase transition-colors duration-250 group-hover:text-white">
                    PRACTICE
                  </span>
                  <p className="text-[10px] sm:text-[11px] text-[#94A3B8] font-medium leading-tight mt-0.5 transition-colors duration-250 group-hover:text-slate-300">
                    Daily CBT Tests
                  </p>
                </div>
              </div>

              {/* INNOVATE */}
              <div className="group flex flex-col items-center text-center sm:items-start sm:text-left gap-1.5 sm:gap-2 cursor-default transition-all duration-250">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-purple-400/30 bg-purple-500/10 text-purple-300 shadow-[0_0_15px_rgba(192,132,252,0.15)] transition-all duration-250 group-hover:scale-[1.08]">
                  <Lightbulb className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-purple-300" strokeWidth={1.8} />
                </div>
                <div>
                  <span className="block text-[11px] sm:text-xs font-bold tracking-wider text-slate-100 uppercase transition-colors duration-250 group-hover:text-white">
                    INNOVATE
                  </span>
                  <p className="text-[10px] sm:text-[11px] text-[#94A3B8] font-medium leading-tight mt-0.5 transition-colors duration-250 group-hover:text-slate-300">
                    AI Performance Analytics
                  </p>
                </div>
              </div>

              {/* SUCCEED */}
              <div className="group flex flex-col items-center text-center sm:items-start sm:text-left gap-1.5 sm:gap-2 cursor-default transition-all duration-250">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-500/10 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.15)] transition-all duration-250 group-hover:scale-[1.08]">
                  <Trophy className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-amber-300" strokeWidth={1.8} />
                </div>
                <div>
                  <span className="block text-[11px] sm:text-xs font-bold tracking-wider text-slate-100 uppercase transition-colors duration-250 group-hover:text-white">
                    SUCCEED
                  </span>
                  <p className="text-[10px] sm:text-[11px] text-[#94A3B8] font-medium leading-tight mt-0.5 transition-colors duration-250 group-hover:text-slate-300">
                    Achieve Top Ranks
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
