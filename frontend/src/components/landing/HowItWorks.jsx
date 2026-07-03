import { DoodleBook, DoodlePencil, DoodleShield, DoodleStar } from './Doodles.jsx';

const STEPS = [
  { n: '01', title: 'Sign up & enroll', desc: 'Create account and pick a test series.', Icon: DoodleStar },
  { n: '02', title: 'Read instructions', desc: 'Review rules and proctoring policy.', Icon: DoodleBook },
  { n: '03', title: 'Take the CBT', desc: 'Fullscreen exam with timer and palette.', Icon: DoodlePencil },
  { n: '04', title: 'Results & rank', desc: 'Score, percentile, and solutions.', Icon: DoodleShield },
];

export default function HowItWorks() {
  return (
    <section className="container-app py-16">
      <div className="text-center">
        <h2 className="text-h2">How it works</h2>
        <p className="mt-2 text-sm text-muted">Four steps from registration to your result</p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ n, title, desc, Icon }) => (
          <div key={n} className="card relative p-6 text-center shadow-soft">
            <span className="absolute right-4 top-4 text-xs font-bold text-slate-200 dark:text-slate-700">{n}</span>
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800/60">
              <Icon className="h-14 w-14 text-slate-800 dark:text-slate-200" />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
