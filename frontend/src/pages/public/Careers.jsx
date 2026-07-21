import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Users,
  Target,
  Zap,
  HeartHandshake,
  Mail,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Code2,
  Megaphone,
  Layers
} from 'lucide-react';
import { CONTACT } from '../../data/edvedumContent.js';

const WHY_JOIN = [
  {
    icon: Target,
    title: 'Mission-Driven EdTech Team',
    description: 'Work alongside educators and engineers focused on democratizing top NEET & JEE exam prep.',
    glowColor: 'border-cyan-500/30 bg-cyan-50 text-[#0088A8]',
  },
  {
    icon: Users,
    title: 'Impact Thousands of Aspirants',
    description: 'Your work directly helps students across India master CBT mock exams and achieve dream medical/engineering ranks.',
    glowColor: 'border-purple-500/30 bg-purple-50 text-[#7C3AED]',
  },
  {
    icon: Zap,
    title: 'Innovation & AI First',
    description: 'Build and leverage real-time diagnostic AI, authentic NTA CBT simulators, and high-scale analytics.',
    glowColor: 'border-blue-500/30 bg-blue-50 text-[#0D6EFD]',
  },
  {
    icon: HeartHandshake,
    title: 'Student-First Growth Culture',
    description: 'We prioritize continuous learning, open collaboration, ownership, and student-centric problem solving.',
    glowColor: 'border-emerald-500/30 bg-emerald-50 text-emerald-700',
  },
];

const DEPARTMENTS = [
  { name: 'Teaching Faculty', icon: GraduationCap },
  { name: 'Technology & AI', icon: Code2 },
  { name: 'Growth & Marketing', icon: Megaphone },
  { name: 'Operations & Support', icon: Layers },
];

export default function Careers() {
  const careersEmail = CONTACT?.businessEmail || 'careers@edvedum.com';

  return (
    <div className="min-h-screen bg-[#010d1f] text-[#F5F6FA] selection:bg-[#00F0FF] selection:text-slate-900">
      
      {/* 1. DARK HERO SECTION */}
      <section className="relative overflow-hidden bg-[#010d1f] pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        {/* Ambient background aura lights */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-32 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-[#0D6EFD]/20 via-[#7C3AED]/20 to-[#00F0FF]/15 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#00F0FF]/40 bg-slate-950/80 px-4 py-1.5 backdrop-blur-xl shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] animate-pulse" />
            <span className="text-[11px] font-bold tracking-wider text-[#00F0FF] uppercase">
              JOIN OUR MISSION
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-[#F5F6FA] sm:text-5xl lg:text-6xl leading-tight"
          >
            Careers at <span className="text-[#0D6EFD]">EDVEDUM</span> <span className="text-[#7C3AED]">Academy</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 mx-auto max-w-2xl text-lg sm:text-xl leading-relaxed text-[#94A3B8]"
          >
            Join the team building India’s future doctors &amp; engineers with AI-powered CBT test analytics and authentic NTA mock exam preparation.
          </motion.p>
        </div>
      </section>

      {/* 2. LIGHT MIDDLE SECTION (Off-White #F5F6FA Background with Sharp Crisp Border) */}
      <main className="bg-[#F5F6FA] text-[#1A1F2E] border-t border-slate-200">
        
        {/* WHY JOIN US */}
        <section className="relative py-14 sm:py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#0D6EFD]">
                WHY WORK WITH US
              </h2>
              <p className="mt-2 text-2xl font-extrabold text-[#1A1F2E] sm:text-3xl lg:text-4xl">
                Empowering Minds, Shaping Rank Success
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {WHY_JOIN.map((item, index) => {
                const IconComp = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${item.glowColor} mb-4`}>
                      <IconComp className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1F2E]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* OPEN POSITIONS - FRIENDLY EMPTY STATE (Light Theme) */}
        <section className="relative py-14 sm:py-20 border-t border-slate-200/80">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 text-center shadow-lg">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-[#0D6EFD]">
                <Briefcase className="h-7 w-7" />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-[#1A1F2E] sm:text-3xl">
                Open Positions
              </h2>

              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                No current openings — but we’re always looking for passionate educators, developers, and marketers who want to make a difference in competitive exam prep.
              </p>

              {/* Department Tags (Non-clickable Reference Badges) */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {DEPARTMENTS.map((dept) => {
                  const Icon = dept.icon;
                  return (
                    <div
                      key={dept.name}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs"
                    >
                      <Icon className="h-3.5 w-3.5 text-[#0D6EFD]" />
                      <span>{dept.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* APPLY / CONTACT SECTION */}
        <section className="relative py-16 sm:py-20 border-t border-slate-200/80">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#1A1F2E] sm:text-4xl">
              Interested in Joining Us?
            </h2>

            <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
              Send your resume and a brief intro to <span className="font-semibold text-[#0D6EFD]">{careersEmail}</span> — we’d love to hear from you!
            </p>

            <div className="mt-8 flex justify-center">
              <a
                href={`mailto:${careersEmail}?subject=Career%20Inquiry%20-%20EDVEDUM%20Academy`}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#0D6EFD] to-[#00F0FF] px-8 py-3.5 text-base font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]"
              >
                <Mail className="h-4.5 w-4.5" />
                <span>Send Your Resume</span>
                <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}
