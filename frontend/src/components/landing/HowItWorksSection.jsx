import { Link } from 'react-router-dom';

const STEPS = [
  { title: 'Create account', desc: 'Free signup. No card needed for your first mock.' },
  { title: 'Enroll in a series', desc: 'JEE, NEET UG, NEET PG packs — or start with a free test.' },
  { title: 'Sit the NTA mock', desc: 'Fullscreen CBT with timer, palette and proctoring.' },
  { title: 'Review & improve', desc: 'Score, rank, solutions and topic-wise breakdown.' },
];

export default function HowItWorksSection() {
  return (
    <section className="overflow-hidden bg-white py-20 lg:py-24">
      <div className="container-app">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand-600">Your path</p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              From signup to score report
            </h2>
          </div>
          <Link to="/signup" className="btn-primary shrink-0">
            Get started
          </Link>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-slate-200 md:block" aria-hidden />
          <ol className="grid gap-8 md:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white shadow-md">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
