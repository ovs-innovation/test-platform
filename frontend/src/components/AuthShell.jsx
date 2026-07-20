import { Link } from 'react-router-dom';
import { EDVEDUM_LOGO, EDVEDUM_LOGO_ALT } from '../data/edvedumContent.js';
import HomeHeroVisual from './landing/HomeHeroVisual.jsx';

const POINTS = [
  'Structured mocks for JEE, NEET and Foundation',
  'Scores, ranks, and solution review',
  'Secure proctoring on every attempt',
];

export default function AuthShell({ children, title, subtitle }) {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-[44%] flex-col justify-between overflow-hidden bg-[#f0f6ff] p-10 lg:flex xl:p-12 dark:bg-slate-900">
        <Link to="/" className="relative inline-flex items-center gap-2.5">
          <img src={EDVEDUM_LOGO} alt={EDVEDUM_LOGO_ALT} className="h-11 w-auto object-contain" />
        </Link>

        <div className="relative flex flex-1 flex-col items-center justify-center py-6">
          <div className="w-full max-w-sm scale-90">
            <HomeHeroVisual />
          </div>
          <ul className="mt-8 w-full max-w-sm space-y-3">
            {POINTS.map((p) => (
              <li key={p} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-slate-400">© {new Date().getFullYear()} EDVEDUM Academy</p>
      </div>

      <div className="flex flex-1 flex-col justify-center bg-white px-6 py-12 dark:bg-slate-950 sm:px-10">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 lg:hidden">
            <Link to="/">
              <img src={EDVEDUM_LOGO} alt={EDVEDUM_LOGO_ALT} className="h-10 w-auto object-contain" />
            </Link>
          </div>
          <div className="card border-slate-200/80 p-8 shadow-elevated">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h1>
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
