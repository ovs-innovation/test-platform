import { Link } from 'react-router-dom';
import HomeHeroVisual from './HomeHeroVisual.jsx';

const TAGS = ['Fullscreen CBT', 'Proctored', 'Rank & solutions'];

export default function HeroSection({ seriesCount = 0 }) {
  return (
    <section className="hero-wash relative overflow-hidden">
      <div className="container-app relative flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-center py-16 lg:py-20">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <p className="text-caption font-bold uppercase tracking-widest text-brand-600">
              NTA mock tests · JEE · NEET UG · NEET PG
            </p>

            <h1 className="text-display mt-4 text-balance">
              Train on the exam screen.
              <span className="block text-brand-600">Not a quiz app.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              AssessPro is built for one job: put you inside the real NTA computer-based test —
              white canvas, timer, palette, sections — before exam day.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/free-mock" className="btn-primary px-7 py-3 text-base">
                Start free mock
              </Link>
              <Link to="/test-series" className="btn-secondary px-7 py-3 text-base">
                Browse test series →
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            {seriesCount > 0 && (
              <p className="mt-6 text-sm text-slate-500">
                {seriesCount} test series enrolling now · from ₹0
              </p>
            )}
          </div>

          <div className="w-full lg:justify-self-end">
            <HomeHeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
