import { useState } from 'react';
import { Link } from 'react-router-dom';

const GOALS = [
  {
    id: 'neet',
    label: 'Doctor',
    title: 'NEET (UG)',
    desc: 'Medical entrance preparation',
    filter: 'neet',
    accent: 'border-emerald-500 bg-emerald-50/80',
    activeRing: 'ring-emerald-500/30',
    iconBg: 'bg-emerald-500 text-white',
    icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
    classes: [
      { label: 'Class 11', value: '11' },
      { label: 'Class 12', value: '12' },
      { label: 'Dropper / Passed 12', value: 'passed-12' },
    ],
  },
  {
    id: 'jee',
    label: 'Engineer',
    title: 'JEE',
    desc: 'Main + Advanced preparation',
    filter: 'jee',
    accent: 'border-blue-500 bg-blue-50/80',
    activeRing: 'ring-blue-500/30',
    iconBg: 'bg-blue-600 text-white',
    icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
    classes: [
      { label: 'Class 11', value: '11' },
      { label: 'Class 12', value: '12' },
      { label: 'Dropper / Passed 12', value: 'passed-12' },
    ],
  },
  {
    id: 'foundation',
    label: 'Foundation',
    title: 'Class 5 – 10',
    desc: 'Strong basics for future goals',
    filter: 'foundation',
    accent: 'border-violet-500 bg-violet-50/80',
    activeRing: 'ring-violet-500/30',
    iconBg: 'bg-violet-600 text-white',
    icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
    classes: [5, 6, 7, 8, 9, 10].map((n) => ({ label: `Class ${n}`, value: String(n) })),
  },
];

function seriesLink(goal, classValue) {
  const params = new URLSearchParams({ filter: goal.filter });
  if (classValue) params.set('class', classValue);
  return `/test-series?${params.toString()}`;
}

export default function EdvedumGoalSelector() {
  const [active, setActive] = useState('neet');
  const selected = GOALS.find((g) => g.id === active) || GOALS[0];

  return (
    <section className="edvedum-page-bg pb-14 pt-6 lg:pb-16 lg:pt-8">
      <div className="edvedum-section-wrap">
        <div className="text-center">
          <p className="edvedum-section-eyebrow">Get started</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 lg:text-[1.75rem]">Select your goal</h2>
          <p className="mx-auto mt-2 max-w-lg text-[14px] text-slate-600">
            Choose NEET, JEE or Foundation — then pick your class to view matching test series.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {GOALS.map((goal) => {
            const isActive = active === goal.id;
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => setActive(goal.id)}
                className={`rounded-2xl border-2 p-5 text-left transition ${
                  isActive
                    ? `${goal.accent} shadow-lg ring-4 ${goal.activeRing}`
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl shadow-sm ${goal.iconBg}`}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={goal.icon} />
                  </svg>
                </span>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">{goal.label}</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{goal.title}</p>
                <p className="mt-1 text-[13px] text-slate-600">{goal.desc}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
          <p className="text-[13px] font-semibold text-slate-900">
            Select class for <span className="text-[#2563eb]">{selected.title}</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {selected.classes.map((cls) => (
              <Link
                key={cls.value}
                to={seriesLink(selected, cls.value)}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[13px] font-semibold text-slate-700 transition hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white"
              >
                {cls.label}
              </Link>
            ))}
            <Link
              to={`/test-series?filter=${selected.filter}`}
              className="rounded-full border border-dashed border-slate-300 px-4 py-2 text-[13px] font-medium text-slate-500 hover:border-[#2563eb] hover:text-[#2563eb]"
            >
              View all {selected.title} series →
            </Link>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[13px]">
          <span className="text-slate-500">Also explore:</span>
          <Link to="/test-series?filter=jee" className="font-semibold text-[#2563eb] hover:underline">JEE Test Series</Link>
          <span className="text-slate-300">|</span>
          <Link to="/test-series?filter=neet" className="font-semibold text-[#2563eb] hover:underline">NEET Test Series</Link>
          <span className="text-slate-300">|</span>
          <Link to="/free-mock" className="font-semibold text-emerald-600 hover:underline">Free diagnostic mock</Link>
        </div>
      </div>
    </section>
  );
}
