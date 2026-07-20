import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  EdvedumCtaStrip,
  EdvedumSectionHeader,
} from '../../components/edvedum/EdvedumPlatformUI.jsx';
import {
  EdvedumComingSoon,
  EdvedumServices,
  EdvedumWhyChoose,
} from '../../components/landing/EdvedumContentSections.jsx';
import EdvedumPlatformUnique from '../../components/landing/EdvedumPlatformUnique.jsx';
import {
  ACADEMY_PROMISE,
  COMPANY,
  CORE_VALUES,
  INTRO,
  LEADERSHIP,
  MISSION,
  PHILOSOPHY,
  TARGET_AUDIENCE,
  VISION,
} from '../../data/edvedumContent.js';

function LeaderTile({ leader }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="edvedum-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 p-5 text-left"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-[#1d4ed8]">
          {leader.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-medium text-slate-500">{leader.role}</p>
          <h3 className="mt-0.5 text-[15px] font-semibold text-slate-900">{leader.name}</h3>
        </div>
        <svg className={`h-4 w-4 shrink-0 text-slate-400 transition ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">
          <p className="text-[14px] leading-relaxed text-slate-600">{leader.bio.join(' ')}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {leader.expertise.slice(0, 4).map((e) => (
              <span key={e} className="rounded border border-slate-200 bg-white px-2 py-0.5 text-[11px] text-slate-600">
                {e}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default function About() {
  return (
    <div>
      <section className="edvedum-platform-band border-b border-white/10 py-14 lg:py-16">
        <div className="edvedum-section-wrap">
          <p className="edvedum-section-eyebrow text-cyan-400">About EDVEDUM Academy</p>
          <h1 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-white lg:text-4xl">
            Coaching and mock tests for JEE, NEET and Foundation
          </h1>
          <div className="edvedum-title-accent mt-3 !from-cyan-400 !to-blue-400" aria-hidden />
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/65">
            {COMPANY.tagline}. We combine classroom expertise with an NTA-style CBT platform so students practice under real exam conditions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/test-series" className="edvedum-btn-gradient rounded-lg px-6 py-2.5 text-sm font-semibold text-white shadow-lg">
              Browse test series
            </Link>
            <Link to="/contact" className="rounded-lg border border-white/25 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/15">
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-16">
        <div className="edvedum-section-wrap">
          <EdvedumSectionHeader eyebrow="About us" title="About EDVEDUM" />
          <div className="max-w-3xl space-y-4">
            {INTRO.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-[14px] leading-relaxed text-slate-600">{p}</p>
            ))}
          </div>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'High-quality CBT examinations',
              'AI-powered performance analysis',
              'Structured learning resources',
              'Personalized guidance',
              'Data-driven insights',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-[13px] text-slate-700">
                <span className="font-bold text-[#1d4ed8]" aria-hidden>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="edvedum-page-bg py-14 lg:py-16">
        <div className="edvedum-section-wrap">
          <EdvedumSectionHeader eyebrow="Purpose" title="Vision & mission" />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="edvedum-card-elevated p-6">
              <h3 className="text-sm font-semibold text-slate-900">Vision</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-slate-600">{VISION}</p>
            </div>
            <div className="edvedum-card-elevated p-6">
              <h3 className="text-sm font-semibold text-slate-900">Mission</h3>
              <ul className="mt-3 space-y-2">
                {MISSION.map((m) => (
                  <li key={m} className="flex gap-2 text-[14px] text-slate-600">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#1d4ed8]" aria-hidden />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {TARGET_AUDIENCE.map((a) => (
              <span key={a} className="rounded border border-slate-200 bg-slate-50 px-3 py-1 text-[12px] text-slate-600">
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      <EdvedumWhyChoose />
      <EdvedumPlatformUnique />

      <section className="bg-white py-14 lg:py-16">
        <div className="edvedum-section-wrap">
          <EdvedumSectionHeader eyebrow="Values" title="Core values" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_VALUES.map((v) => (
              <div key={v.title} className="edvedum-card-elevated p-4">
                <h3 className="text-[14px] font-semibold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="edvedum-page-bg border-y border-slate-200/80 py-10">
        <div className="edvedum-section-wrap max-w-3xl">
          <blockquote className="rounded-2xl border border-slate-200/80 bg-white px-6 py-8 shadow-sm">
            <p className="edvedum-tagline text-[17px] leading-relaxed text-slate-700">&ldquo;{ACADEMY_PROMISE}&rdquo;</p>
          </blockquote>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-16">
        <div className="edvedum-section-wrap">
          <EdvedumSectionHeader eyebrow="Team" title="Leadership" description="Tap a profile for details." />
          <div className="grid gap-4 lg:grid-cols-3">
            {LEADERSHIP.map((leader) => (
              <LeaderTile key={leader.name} leader={leader} />
            ))}
          </div>
        </div>
      </section>

      <EdvedumServices />
      <EdvedumComingSoon />

      <section className="edvedum-page-bg py-10">
        <div className="edvedum-section-wrap max-w-3xl">
          <p className="text-[14px] leading-relaxed text-slate-600">{PHILOSOPHY}</p>
          <p className="mt-2 text-[13px] text-slate-500">{COMPANY.headquarters} · {COMPANY.website}</p>
        </div>
      </section>

      <EdvedumCtaStrip
        title="Start with a mock test"
        desc="Enroll in a series or try the free diagnostic mock."
        primary={{ to: '/test-series', label: 'Browse test series' }}
        secondary={{ to: '/signup', label: 'Create account' }}
      />
    </div>
  );
}
