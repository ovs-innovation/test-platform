import { EdvedumSectionHeader } from '../edvedum/EdvedumPlatformUI.jsx';

const STATS = [
  { value: '150+', label: 'Expert faculty' },
  { value: '50,000+', label: 'Students trained' },
  { value: '1,000+', label: 'NEET 2024 selections' },
  { value: '800+', label: 'JEE 2024 selections' },
  { value: '100+', label: 'Study centers' },
];

export default function EdvedumHomeSections() {
  return (
    <section className="edvedum-page-bg border-t border-slate-200/80 py-14 lg:py-16">
      <div className="edvedum-section-wrap">
        <EdvedumSectionHeader
          eyebrow="Trusted by"
          title="Our achievements"
          description="Selections and structured preparation across JEE, NEET and Foundation programs."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-xl border border-slate-200 bg-white px-4 py-5 text-center shadow-sm">
              <p className="text-xl font-bold tabular-nums text-slate-900 lg:text-2xl">{s.value}</p>
              <p className="mt-1.5 text-[12px] leading-snug text-slate-600">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
