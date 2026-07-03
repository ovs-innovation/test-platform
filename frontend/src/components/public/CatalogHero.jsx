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
  },
  {
    label: 'NEET UG',
    desc: 'PCB · NTA pattern tests',
    src: '/test-series/neet.svg',
    to: '/test-series?filter=neet',
  },
  {
    label: 'NEET PG',
    desc: 'Clinical · post-grad prep',
    src: '/test-series/neet-pg.svg',
    to: '/test-series?filter=neetpg',
  },
];

export default function CatalogHero({ seriesCount = 0 }) {
  return (
    <section className="catalog-hero relative overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(96,165,250,0.35),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_90%,rgba(129,140,248,0.25),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
      </div>

      <div className="container-app relative z-10 pb-28 pt-14 lg:pb-36 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              NTA-style full-length mocks
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              Test series that feel like
              <span className="mt-1 block text-sky-200">the real exam hall</span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-blue-100/90 sm:text-lg">
              Enroll once, unlock every mock in the pack — proctored CBT, rank, and detailed solutions included.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm transition hover:bg-white/20"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {seriesCount > 0 && (
              <div className="mt-8 flex flex-wrap gap-6 border-t border-white/15 pt-6">
                <div>
                  <p className="text-2xl font-bold">{seriesCount}</p>
                  <p className="text-xs text-blue-200">Live series</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">₹0</p>
                  <p className="text-xs text-blue-200">Free tier available</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">CBT</p>
                  <p className="text-xs text-blue-200">NTA interface</p>
                </div>
              </div>
            )}
          </div>

          <div className="w-full max-w-md lg:max-w-lg lg:justify-self-end">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-200/90">
              Browse by exam
            </p>
            <div className="space-y-3">
              {EXAM_TRACKS.map((track) => (
                <Link
                  key={track.label}
                  to={track.to}
                  className="group flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-md transition hover:border-white/35 hover:bg-white/15 sm:p-4"
                >
                  <div className="h-14 w-24 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/25 sm:h-16 sm:w-28">
                    <img src={track.src} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white">{track.label}</p>
                    <p className="text-sm text-blue-100/75">{track.desc}</p>
                  </div>
                  <span
                    className="shrink-0 text-lg text-white/50 transition group-hover:translate-x-0.5 group-hover:text-white/90"
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

      <div className="absolute bottom-0 left-0 right-0 text-white" aria-hidden>
        <svg viewBox="0 0 1440 80" fill="currentColor" className="block w-full text-white">
          <path d="M0,40 C360,90 720,0 1440,50 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
