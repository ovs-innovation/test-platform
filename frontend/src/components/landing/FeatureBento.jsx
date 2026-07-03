import { Link } from 'react-router-dom';

const TILES = [
  {
    title: 'NTA-style CBT',
    desc: 'Sections, timer, palette, mark for review — same patterns as the real exam.',
    to: '/free-mock',
    label: 'Try free mock',
    className: 'bg-brand-600 text-white sm:col-span-2',
    light: true,
  },
  {
    title: 'Live proctoring',
    desc: 'Fullscreen lock, tab detection, copy/paste blocked.',
    to: '/#security',
    label: 'Security',
    className: 'bg-white dark:bg-slate-900',
  },
  {
    title: 'Rank & analytics',
    desc: 'Percentile, leaderboard, and solution review.',
    to: '/signup',
    label: 'Sign up',
    className: 'bg-slate-50 dark:bg-slate-900/60',
  },
  {
    title: 'For institutes',
    desc: 'CSV questions, test series, invites, and exportable reports.',
    to: '/admin-login',
    label: 'Admin login',
    className: 'bg-white dark:bg-slate-900 sm:col-span-2',
  },
];

export default function FeatureBento() {
  return (
    <section className="container-app py-16">
      <h2 className="text-h2">Everything you need to prepare</h2>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Practice like exam day. Institutes run tests at scale — students get a fair, focused environment.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TILES.map((t) => (
          <div
            key={t.title}
            className={`card flex flex-col justify-between p-6 shadow-soft ${t.className}`}
          >
            <div>
              <h3 className={`text-lg font-bold ${t.light ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {t.title}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${t.light ? 'text-brand-100' : 'text-slate-600 dark:text-slate-400'}`}>
                {t.desc}
              </p>
            </div>
            <Link
              to={t.to}
              className={`mt-5 inline-flex w-fit text-sm font-semibold ${
                t.light ? 'text-white underline decoration-white/50' : 'text-brand-600 hover:underline'
              }`}
            >
              {t.label} →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
