import BrowserFrame from './BrowserFrame.jsx';
import HeroExamPreview from './HeroExamPreview.jsx';

const EXAM_COVERS = [
  { src: '/test-series/jee.svg', label: 'JEE', rotate: '-rotate-6', x: 'left-0 top-6', z: 'z-0' },
  { src: '/test-series/neet.svg', label: 'NEET', rotate: 'rotate-3', x: 'left-14 top-0', z: 'z-[1]' },
  { src: '/test-series/neet-pg.svg', label: 'NEET PG', rotate: '-rotate-3', x: 'right-2 top-10', z: 'z-0' },
];

/** Home hero — fanned series covers + live CBT product shot */
export default function HomeHeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-xl">
      <div
        className="pointer-events-none absolute -right-6 top-1/4 h-48 w-48 rounded-full bg-brand-200/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-4 bottom-1/4 h-36 w-36 rounded-full bg-sky-200/40 blur-2xl"
        aria-hidden
      />

      <p className="mb-4 text-right text-caption font-semibold uppercase tracking-wide text-slate-500">
        Live exam interface
      </p>

      <div className="relative h-[300px] sm:h-[340px]">
        {EXAM_COVERS.map((cover) => (
          <div
            key={cover.label}
            className={`absolute ${cover.x} ${cover.z} w-[40%] ${cover.rotate} overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-lg ring-1 ring-white/80`}
          >
            <img src={cover.src} alt="" className="aspect-[16/10] w-full object-cover" />
            <span className="absolute bottom-2 left-2 rounded-md bg-slate-900/55 px-2 py-0.5 text-[10px] font-bold uppercase text-white backdrop-blur-sm">
              {cover.label}
            </span>
          </div>
        ))}

        <div className="absolute bottom-0 left-1/2 z-20 w-[90%] -translate-x-1/2 sm:w-[88%]">
          <BrowserFrame>
            <HeroExamPreview />
          </BrowserFrame>
        </div>
      </div>
    </div>
  );
}
