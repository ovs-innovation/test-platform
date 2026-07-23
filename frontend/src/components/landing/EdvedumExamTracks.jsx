import { Link } from 'react-router-dom';
import { EdvedumSectionHeader } from '../edvedum/EdvedumPlatformUI.jsx';

const TRACKS = [
  {
    title: 'JEE',
    subtitle: 'Main + Advanced',
    desc: 'Full-length mocks in Physics, Chemistry and Mathematics with All India Rank.',
    image: '/edvedum/student-jee.png',
    imageAlt: 'JEE aspirant',
    to: '/test-series?filter=jee',
    border: 'border-t-blue-600',
    links: [
      { label: 'Class 11', to: '/test-series?filter=jee&class=11' },
      { label: 'Class 12', to: '/test-series?filter=jee&class=12' },
      { label: 'Dropper', to: '/test-series?filter=jee&class=passed-12' },
    ],
  },
  {
    title: 'NEET',
    subtitle: 'UG Medical',
    desc: 'NCERT-aligned Biology, Physics and Chemistry tests with detailed solutions.',
    image: '/edvedum/student-neet.png',
    imageAlt: 'NEET aspirant',
    to: '/test-series?filter=neet',
    border: 'border-t-emerald-600',
    links: [
      { label: 'Class 11', to: '/test-series?filter=neet&class=11' },
      { label: 'Class 12', to: '/test-series?filter=neet&class=12' },
      { label: 'Dropper', to: '/test-series?filter=neet&class=passed-12' },
    ],
  },
  {
    title: 'Foundation',
    subtitle: 'Class 6 – 10',
    desc: 'Structured basics for students planning JEE or NEET in senior classes.',
    image: '/edvedum/student-foundation.png',
    imageAlt: 'Foundation student',
    to: '/test-series?filter=foundation',
    border: 'border-t-amber-500',
    disabled: true,
    links: [
      { label: 'Class 8', to: '#' },
      { label: 'Class 9', to: '#' },
      { label: 'Class 10', to: '#' },
    ],
  },
];

export default function EdvedumExamTracks() {
  return (
    <section className="bg-white py-14 lg:py-16">
      <div className="edvedum-section-wrap">
        <EdvedumSectionHeader
          eyebrow="Programs"
          title="Courses by exam"
          description="Browse test series for your exam and class. Program selection is available above."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {TRACKS.map((track) => (
            <article
              key={track.title}
              className={`overflow-hidden rounded-xl border border-slate-200 bg-white ${track.border} border-t-[3px] shadow-sm ${track.disabled ? 'opacity-85' : ''}`}
            >
              <div className="relative h-44 bg-slate-100">
                <img
                  src={track.image}
                  alt={track.imageAlt}
                  className="h-full w-full object-cover object-top"
                />
                {track.disabled && (
                  <span className="absolute top-3 right-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-2.5 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider text-white shadow-md">
                    Coming Soon
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-4 pb-3 pt-10">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-white/80">{track.subtitle}</p>
                  <h3 className="text-lg font-bold text-white">{track.title}</h3>
                </div>
              </div>

              <div className="p-5">
                <p className="text-[13px] leading-relaxed text-slate-600">{track.desc}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-slate-100 pt-4">
                  {track.links.map((l) =>
                    track.disabled ? (
                      <span key={l.label} className="text-[13px] font-medium text-slate-400 cursor-not-allowed select-none">
                        {l.label}
                      </span>
                    ) : (
                      <Link
                        key={l.to}
                        to={l.to}
                        className="text-[13px] font-medium text-slate-700 hover:text-[#2563eb]"
                      >
                        {l.label}
                      </Link>
                    )
                  )}
                </div>
                {track.disabled ? (
                  <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-amber-600 cursor-not-allowed select-none">
                    Coming Soon
                  </span>
                ) : (
                  <Link
                    to={track.to}
                    className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#2563eb] hover:underline"
                  >
                    All {track.title} series
                    <span aria-hidden>→</span>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
