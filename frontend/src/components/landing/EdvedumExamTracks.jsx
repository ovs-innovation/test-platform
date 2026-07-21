import { Link } from 'react-router-dom';
import { EdvedumSectionHeader } from '../edvedum/EdvedumPlatformUI.jsx';

const TRACKS = [
  {
    title: 'JEE Main & Advanced',
    subtitle: 'PCM Track',
    desc: 'Full-length mocks in Physics, Chemistry and Mathematics with All India Rank.',
    image: '/edvedum/student-jee.png',
    imageAlt: 'JEE aspirant',
    to: '/test-series?filter=jee',
    glassStyle: 'border-[#0D6EFD]/40 bg-[#0c1427]/85 backdrop-blur-xl shadow-[0_8px_30px_rgba(13,110,253,0.18)] hover:-translate-y-1.5 hover:border-[#0D6EFD] hover:shadow-[0_16px_40px_rgba(13,110,253,0.35)]',
    badge: 'bg-blue-500/20 text-[#38bdf8] border border-blue-400/40',
    accent: 'text-[#38bdf8]',
    links: [
      { label: 'Class 11', to: '/test-series?filter=jee&class=11' },
      { label: 'Class 12', to: '/test-series?filter=jee&class=12' },
      { label: 'Dropper', to: '/test-series?filter=jee&class=passed-12' },
    ],
  },
  {
    title: 'NEET UG Medical',
    subtitle: 'PCB Track',
    desc: 'NCERT-aligned Biology, Physics and Chemistry tests with detailed solutions.',
    image: '/edvedum/student-neet.png',
    imageAlt: 'NEET aspirant',
    to: '/test-series?filter=neet',
    glassStyle: 'border-[#00F0FF]/40 bg-[#0c1427]/85 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,240,255,0.18)] hover:-translate-y-1.5 hover:border-[#00F0FF] hover:shadow-[0_16px_40px_rgba(0,240,255,0.35)]',
    badge: 'bg-cyan-500/20 text-[#00F0FF] border border-cyan-400/40',
    accent: 'text-[#00F0FF]',
    links: [
      { label: 'Class 11', to: '/test-series?filter=neet&class=11' },
      { label: 'Class 12', to: '/test-series?filter=neet&class=12' },
      { label: 'Dropper', to: '/test-series?filter=neet&class=passed-12' },
    ],
  },
  {
    title: 'Foundation Program',
    subtitle: 'Class 6 – 10',
    desc: 'Structured basics for students planning JEE or NEET in senior classes.',
    image: '/edvedum/student-foundation.png',
    imageAlt: 'Foundation student',
    to: '/test-series?filter=foundation',
    glassStyle: 'border-[#7C3AED]/40 bg-[#0c1427]/85 backdrop-blur-xl shadow-[0_8px_30px_rgba(124,58,237,0.18)] hover:-translate-y-1.5 hover:border-[#7C3AED] hover:shadow-[0_16px_40px_rgba(124,58,237,0.35)]',
    badge: 'bg-purple-500/20 text-[#c084fc] border border-purple-400/40',
    accent: 'text-[#c084fc]',
    links: [
      { label: 'Class 8', to: '/test-series?filter=foundation&class=8' },
      { label: 'Class 9', to: '/test-series?filter=foundation&class=9' },
      { label: 'Class 10', to: '/test-series?filter=foundation&class=10' },
    ],
  },
];

export default function EdvedumExamTracks() {
  return (
    <section className="bg-[#090d16] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] text-[#F5F6FA] py-14 lg:py-18 border-t border-slate-800/80">
      <div className="edvedum-section-wrap">
        <EdvedumSectionHeader
          eyebrow="Programs"
          title="Choose Your Program"
          description="Browse test series structured for your exam and grade level."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {TRACKS.map((track) => (
            <article
              key={track.title}
              className={`group overflow-hidden rounded-2xl transition-all duration-300 ${track.glassStyle}`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={track.image}
                  alt={track.imageAlt}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1427] via-[#0c1427]/50 to-transparent" />
                
                <div className="absolute inset-x-0 bottom-0 px-5 pb-3">
                  <span className={`inline-flex rounded-lg px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md ${track.badge}`}>
                    {track.subtitle}
                  </span>
                  <h3 className="mt-1 text-xl font-extrabold text-[#F5F6FA]">{track.title}</h3>
                </div>
              </div>

              <div className="p-5">
                <p className="text-[13px] leading-relaxed text-[#94A3B8]">{track.desc}</p>
                
                <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-800/80 pt-4">
                  {track.links.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="rounded-full border border-slate-700/80 bg-[#070c18] px-3 py-1 text-xs font-semibold text-slate-300 transition-all hover:border-slate-500 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>

                <Link
                  to={track.to}
                  className={`mt-5 inline-flex items-center gap-1.5 text-xs font-bold ${track.accent} hover:underline`}
                >
                  Explore all {track.title} series
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
