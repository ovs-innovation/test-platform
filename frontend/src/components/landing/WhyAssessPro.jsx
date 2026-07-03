const WRONG = [
  'Phone quiz layouts',
  'PDFs & photo scans',
  'No timer pressure',
  'Surprise on exam day',
];

const RIGHT = [
  'NTA white-screen CBT',
  'Fullscreen + proctoring',
  'Section tabs & palette',
  'Rank after every mock',
];

export default function WhyAssessPro() {
  return (
    <section className="border-y border-slate-200 bg-white py-20 lg:py-24">
      <div className="container-app">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-red-500">The problem</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-900">Coaching tests ≠ NTA exam day</h2>
          <p className="mt-4 text-slate-600">
            Students practice one way and write the exam another. That gap costs marks — and confidence.
          </p>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-2xl border border-slate-200 shadow-elevated lg:grid-cols-[1fr_auto_1fr]">
          <div className="p-8 lg:p-10">
            <p className="text-caption font-bold uppercase tracking-widest text-slate-400">What most students use</p>
            <ul className="mt-6 space-y-3">
              {WRONG.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="text-slate-300">×</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center border-y border-slate-200/80 bg-white px-6 py-4 lg:border-x lg:border-y-0 lg:px-8">
            <span className="text-2xl font-light text-brand-600">→</span>
          </div>

          <div className="bg-brand-600 p-8 text-white lg:p-10">
            <p className="text-caption font-bold uppercase tracking-widest text-brand-200">What AssessPro gives you</p>
            <ul className="mt-6 space-y-3">
              {RIGHT.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium">
                  <span className="text-brand-200">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
