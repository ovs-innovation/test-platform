import { Link } from 'react-router-dom';

const QUICK_LINKS = [
  { label: 'JEE Main', to: '/test-series?filter=jee' },
  { label: 'NEET UG', to: '/test-series?filter=neet' },
  { label: 'NEET PG', to: '/test-series?filter=neetpg' },
  { label: 'Free mocks', to: '/test-series?filter=free' },
];

const EXAM_TRACKS = [
  {
    label: 'JEE Main',
    desc: 'PCM · full-length CBT mocks',
    src: '/test-series/jee.svg',
    to: '/test-series?filter=jee',
    borderStyle: 'border-[#0D6EFD]/35 hover:border-[#0D6EFD] hover:shadow-lg hover:shadow-blue-500/10',
    tagBg: 'bg-blue-500/15 text-[#38bdf8] border-blue-400/30',
  },
  {
    label: 'NEET UG',
    desc: 'PCB · NTA pattern tests',
    src: '/test-series/neet.svg',
    to: '/test-series?filter=neet',
    borderStyle: 'border-[#00F0FF]/40 hover:border-[#00F0FF] hover:shadow-lg hover:shadow-cyan-500/10',
    tagBg: 'bg-cyan-500/15 text-[#00F0FF] border-cyan-400/30',
  },
  {
    label: 'NEET PG',
    desc: 'Clinical · post-grad prep',
    src: '/test-series/neet-pg.svg',
    to: '/test-series?filter=neetpg',
    borderStyle: 'border-[#7C3AED]/35 hover:border-[#7C3AED] hover:shadow-lg hover:shadow-purple-500/10',
    tagBg: 'bg-purple-500/15 text-[#c084fc] border-purple-400/30',
  },
];

export default function CatalogHero({ seriesCount = 0 }) {
  return (
    <section className="relative overflow-hidden bg-[#010d1f] text-white">
      {/* Background Ambient Glow Effects */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_75%_25%,rgba(0,240,255,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_15%_85%,rgba(124,58,237,0.25),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
      </div>

      <div className="container-app relative z-10 pb-16 pt-10 lg:pb-20 lg:pt-14">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#00F0FF] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
              NTA-Style Full-Length Mocks
            </div>

            <h1 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-4xl text-[#F5F6FA]">
              Test series that feel like
              <span className="mt-1 block text-transparent bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#a855f7] bg-clip-text">
                the real exam hall
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#94A3B8]">
              Enroll once, unlock every mock in the pack — proctored CBT, rank prediction, and detailed solution explanations included.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="rounded-full border border-white/20 bg-slate-900/80 px-4 py-2 text-xs sm:text-sm font-semibold text-[#F5F6FA] backdrop-blur-md transition-all duration-200 hover:border-[#00F0FF]/60 hover:bg-slate-800 hover:text-[#00F0FF] hover:shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {seriesCount > 0 && (
              <div className="mt-8 flex flex-wrap gap-6 border-t border-slate-800/80 pt-6">
                <div>
                  <p className="text-2xl font-extrabold text-white">{seriesCount}</p>
                  <p className="text-xs font-medium text-[#94A3B8]">Live series</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#00F0FF]">₹0</p>
                  <p className="text-xs font-medium text-[#94A3B8]">Free tier available</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">CBT</p>
                  <p className="text-xs font-medium text-[#94A3B8]">NTA interface</p>
                </div>
              </div>
            )}
          </div>

          <div className="w-full max-w-md lg:max-w-lg lg:justify-self-end">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              Browse by Exam
            </p>
            <div className="space-y-3">
              {EXAM_TRACKS.map((track) => (
                <Link
                  key={track.label}
                  to={track.to}
                  className={`group flex items-center gap-4 rounded-2xl border bg-slate-900/80 p-3.5 backdrop-blur-xl transition-all duration-300 ${track.borderStyle}`}
                >
                  <div className="h-14 w-24 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/15 sm:h-16 sm:w-28 bg-slate-950 flex items-center justify-center">
                    <img src={track.src} alt={track.label} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-white text-base">{track.label}</p>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${track.tagBg}`}>
                        Exam
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-[#94A3B8]">{track.desc}</p>
                  </div>
                  <span
                    className="shrink-0 text-lg text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
