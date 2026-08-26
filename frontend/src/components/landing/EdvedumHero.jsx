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

// Ambient stars/particles overlay spread seamlessly across the entire hero width
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: Math.random() * 92 + 3, // Full canvas width (3% to 95%)
  y: Math.random() * 88 + 5,
  size: Math.random() * 2.8 + 2.2,
  duration: Math.random() * 7 + 7,
  delay: Math.random() * 5,
  glowType: i % 3 === 0 ? 'purple' : i % 2 === 0 ? 'cyan' : 'sky',
  isTwinkle: i % 4 === 0,
}));

export default function EdvedumHero() {
  return (
    <section
      className="relative overflow-hidden text-white selection:bg-cyan-500 selection:text-slate-900 min-h-0 lg:min-h-[690px] pb-8 sm:pb-10 lg:pb-24 border-t border-transparent m-0"
      style={{
        background: `
          radial-gradient(circle at 75% 45%, rgba(6, 182, 212, 0.14), transparent 38%),
          radial-gradient(circle at 88% 70%, rgba(124, 58, 237, 0.14), transparent 40%),
          radial-gradient(circle at 30% 50%, rgba(37, 99, 235, 0.09), transparent 45%),
          linear-gradient(110deg, #020b18 0%, #020b18 45%, #010915 100%)
        `,
      }}
    >
      {/* 1. EDVEDUM BRANDED STUDENT HERO ARTWORK LAYER (Preserved for screens 768px+ - md:block) */}
      {/* Spans 100% full width (inset-0) with ultra-wide mask transition (35% to 78%) for 0% visible seam */}
      <div
        className="hidden md:block absolute inset-0 bg-no-repeat opacity-95 transition-all duration-700 pointer-events-none z-[1]"
        style={{
          backgroundImage: "url('/edvedum/opt.png')",
          backgroundPosition: 'right center',
          backgroundSize: 'contain',
          filter: 'drop-shadow(0 20px 35px rgba(2,11,24,0.95)) drop-shadow(0 0 30px rgba(0,240,255,0.14))',
          maskImage: 'linear-gradient(to right, transparent 0%, transparent 35%, rgba(0,0,0,0.12) 48%, rgba(0,0,0,0.65) 65%, black 82%, black 100%), linear-gradient(to top, transparent 0%, black 20%)',
          WebkitMaskImage: '-webkit-linear-gradient(left, transparent 0%, transparent 35%, rgba(0,0,0,0.12) 48%, rgba(0,0,0,0.65) 65%, black 82%, black 100%), -webkit-linear-gradient(bottom, transparent 0%, black 20%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'destination-in',
        }}
        aria-hidden="true"
      />

      {/* 2. SOFT BOTTOM & RIGHT EDGE MASKS FOR SMOOTH SEAMLESS BOUNDARIES */}
      <div
        className="hidden md:block absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#020b18] via-[#020b18]/85 to-transparent pointer-events-none z-[2]"
        aria-hidden="true"
      />
      <div
        className="hidden md:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#010915] via-[#010915]/40 to-transparent pointer-events-none z-[2]"
        aria-hidden="true"
      />

      {/* 3. AURORA LIGHTING STREAKS (Ambient Glows) */}
      <motion.div
        animate={{
          opacity: [0.3, 0.45, 0.3],
          scale: [1, 1.12, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-20 h-[460px] w-[460px] rounded-full bg-cyan-500/15 blur-[130px] pointer-events-none z-0"
      />

      {/* 4. FLOATING STAR PARTICLES (Spread across full canvas) */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
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
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-1 sm:pt-10 lg:pt-14 pb-6 sm:pb-8 lg:pb-16">

        {/* Main Content Area */}
        <div className="relative z-10 max-w-2xl lg:max-w-3xl">

          {/* MOBILE-ONLY HERO VISUAL (Order #1 on Mobile, Uncropped Full-Width, Smooth Bottom Fade) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mobile-hero-visual block md:hidden relative w-[calc(100%+32px)] -ml-4 -mr-4 -mt-1 mb-2 h-auto overflow-hidden bg-transparent border-none p-0 shadow-none pointer-events-none select-none"
            style={{
              maskImage: 'linear-gradient(to bottom, black 0%, black 60%, rgba(0,0,0,0.6) 80%, transparent 100%)',
              WebkitMaskImage: '-webkit-linear-gradient(top, black 0%, black 60%, rgba(0,0,0,0.6) 80%, transparent 100%)',
            }}
          >
            <img
              src="/edvedum/opt.png"
              alt="EDVEDUM student using CBT mock tests on laptop and mobile"
              className="w-full h-auto block object-contain object-center border-none rounded-none"
            />
            {/* Seamless multi-stop bottom fade blending 100% smoothly into #020b18 */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#020b18]/60 via-[#020b18]/90 to-[#020b18] pointer-events-none" />
          </motion.div>

          {/* 1. BADGE ROW */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-2.5"
          >
            {/* Badge 1: AI-Powered CBT Ecosystem 2026 */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00F0FF]/40 bg-slate-950/80 px-3.5 py-1 sm:px-4 sm:py-1.5 backdrop-blur-xl shadow-sm">
              <Zap className="h-3 w-3 text-[#00F0FF] fill-[#00F0FF] animate-pulse" />
              <span className="text-[10.5px] sm:text-[11px] font-extrabold tracking-wider text-[#00F0FF] uppercase">
                AI-POWERED CBT ECOSYSTEM 2026
              </span>
            </div>

            {/* Badge 2: NEET / JEE Pattern Live (Desktop/Tablet only, hidden on mobile per specs) */}
            <div className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-[#7C3AED]/40 bg-slate-950/80 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-xl shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" />
              <span className="text-[10px] sm:text-[11px] font-semibold text-purple-300">
                NEET / JEE Pattern Live
              </span>
            </div>
          </motion.div>

          {/* 2. MAIN HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 sm:mt-6 text-center md:text-left text-[clamp(28px,7.8vw,34px)] sm:text-4xl lg:text-[2.85rem] xl:text-[3.1rem] font-extrabold tracking-tight text-[#F5F6FA] leading-[1.15] sm:leading-[1.18] lg:leading-[1.22]"
          >
            Where Future <br className="hidden md:inline" />
            <span className="inline-block mt-1 mb-1 sm:mb-2.5">
              <span className="font-extrabold text-[#0D6EFD]">
                Doctors
              </span>{' '}
              <span className="text-[#F5F6FA]">&amp;</span>{' '}
              <span className="font-extrabold text-[#7C3AED]">
                Engineers
              </span>
            </span>{' '}
            <br />
            Master Rank Success.
          </motion.h1>

          {/* 3. SUPPORTING DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3.5 sm:mt-5 max-w-[320px] md:max-w-xl mx-auto md:mx-0 text-center md:text-left text-[14px] sm:text-base md:text-lg leading-[21px] sm:leading-[1.6] text-[#94A3B8]"
          >
            Not just another coaching platform — the future of competitive learning.
          </motion.p>

          {/* 4. CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 sm:mt-6 flex flex-col min-[480px]:flex-row items-center justify-center md:justify-start gap-2.5 sm:gap-3 max-w-[330px] md:max-w-none mx-auto md:mx-0"
          >
            {/* Primary Button */}
            <Link
              to="/free-mock"
              className="group relative inline-flex h-[52px] w-full min-[480px]:w-auto items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-6 sm:px-8 text-base sm:text-lg font-bold text-white shadow-[0_0_28px_rgba(37,99,235,0.45)] transition-all duration-300 hover:shadow-[0_0_38px_rgba(6,182,212,0.65)] hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:ring-offset-2 focus:ring-offset-[#020b18]"
            >
              <span className="whitespace-nowrap">Start Free Mock Test</span>
              <ArrowRight className="h-4.5 w-4.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary Button */}
            <Link
              to="/test-series"
              className="group inline-flex h-[50px] sm:h-[52px] w-full min-[480px]:w-auto items-center justify-center gap-2.5 rounded-full border-2 border-[#00F0FF]/60 bg-slate-900/70 px-6 sm:px-8 text-base sm:text-lg font-bold text-[#F5F6FA] backdrop-blur-xl shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all duration-300 hover:border-[#00F0FF] hover:bg-slate-800/90 hover:shadow-[0_0_30px_rgba(0,240,255,0.45)] hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:ring-offset-2 focus:ring-offset-[#020b18]"
            >
              <Play className="h-4.5 w-4.5 fill-[#00F0FF] text-[#00F0FF] shrink-0 transition-transform group-hover:scale-110" />
              <span className="whitespace-nowrap">Explore Test Series</span>
            </Link>
          </motion.div>

          {/* 5. BENEFIT ITEMS (Exact original design matching user reference image) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 sm:mt-8 max-w-xl mx-auto sm:mx-0"
          >
            {/* Subtle Clean Slate Divider Line */}
            <div className="h-[1px] w-full bg-slate-800/80 mt-2 mb-3.5 sm:mt-4 sm:mb-4 lg:mt-6 lg:mb-4" aria-hidden="true" />

            {/* 4 Equally Spaced Brand Items (Clean 2x2 Grid on Mobile with 12px column gap and 18px row gap) */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-[18px] sm:gap-4 sm:grid-cols-4">
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

