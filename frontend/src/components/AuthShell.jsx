import { Link } from 'react-router-dom';
import { EDVEDUM_LOGO, EDVEDUM_LOGO_ALT } from '../data/edvedumContent.js';
import HomeHeroVisual from './landing/HomeHeroVisual.jsx';

const POINTS = [
  { text: 'Structured mocks for JEE, NEET and Foundation', badgeCls: 'bg-blue-500/20 text-[#38bdf8] border-blue-400/30' },
  { text: 'Real NTA CBT timer, palette & step solutions', badgeCls: 'bg-cyan-500/20 text-[#00F0FF] border-cyan-400/30' },
  { text: 'Instant All India Ranks & performance analytics', badgeCls: 'bg-purple-500/20 text-[#c084fc] border-purple-400/30' },
];

export default function AuthShell({ children, title, subtitle }) {
  return (
    <div className="flex min-h-screen bg-[#090d16]">
      {/* LEFT PANEL: Dark Navy Branding (#010d1f) */}
      <div className="relative hidden w-[44%] flex-col justify-between overflow-hidden border-r border-slate-800/80 bg-[#010d1f] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] p-8 lg:flex xl:p-10">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_35%,rgba(13,110,253,0.14),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_15%_85%,rgba(0,240,255,0.1),transparent)]" />
        </div>

        <Link to="/" className="relative z-10 inline-flex items-center gap-3">
          <img src={EDVEDUM_LOGO} alt={EDVEDUM_LOGO_ALT} className="h-12 w-auto object-contain edvedum-logo-glow" />
          <div className="text-left leading-tight">
            <span className="block font-extrabold tracking-wide text-white text-base">EDVEDUM</span>
            <span className="block text-[10px] font-semibold tracking-[0.25em] text-slate-400">— ACADEMY —</span>
          </div>
        </Link>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-2">
          <div className="w-full max-w-sm">
            <HomeHeroVisual />
          </div>
          <ul className="mt-4 w-full max-w-sm space-y-3">
            {POINTS.map((p) => (
              <li key={p.text} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-[#94A3B8]">
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${p.badgeCls}`}>
                  ✓
                </span>
                {p.text}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-slate-500">© {new Date().getFullYear()} EDVEDUM Academy · All rights reserved</p>
      </div>

      {/* RIGHT PANEL: Form Card Container */}
      <div className="relative flex flex-1 flex-col justify-center bg-[#090d16] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] px-6 py-12 sm:px-10">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(0,240,255,0.07),transparent)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-md">
          <div className="mb-6 flex justify-center lg:hidden">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img src={EDVEDUM_LOGO} alt={EDVEDUM_LOGO_ALT} className="h-10 w-auto object-contain edvedum-logo-glow" />
              <div className="text-left leading-tight">
                <span className="block font-extrabold tracking-wide text-white text-sm">EDVEDUM</span>
                <span className="block text-[9px] font-semibold tracking-[0.2em] text-slate-400">— ACADEMY —</span>
              </div>
            </Link>
          </div>

          <div className="rounded-2xl border border-[#2A354A] bg-[#121c30] p-8 shadow-[0_20px_50px_rgba(5,10,24,0.8),0_0_35px_rgba(13,110,253,0.12)] backdrop-blur-xl">
            <h1 className="text-2xl font-extrabold tracking-tight text-[#F5F6FA]">{title}</h1>
            {subtitle && <p className="mt-1.5 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{subtitle}</p>}
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
