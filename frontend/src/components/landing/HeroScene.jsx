import { HeroLineArt } from './LineArtIllustrations.jsx';
import HeroExamPreview from './HeroExamPreview.jsx';

/** Hero visual — illustration + live CBT mockup */
export default function HeroScene() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-xl">
      <div
        className="absolute left-1/2 top-1/2 h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-200/40 blur-3xl"
        aria-hidden
      />

      <div className="relative grid items-end gap-6 sm:grid-cols-[1fr_auto] sm:gap-4">
        <div className="order-2 sm:order-1 sm:-mr-8 sm:pb-6">
          <HeroLineArt className="w-full max-w-[280px] drop-shadow-md sm:max-w-xs" />
        </div>
        <div className="order-1 sm:order-2 sm:pt-4">
          <HeroExamPreview />
        </div>
      </div>

      <div className="absolute -left-2 top-4 hidden rounded-lg border border-slate-200/90 bg-white/95 px-3 py-2 shadow-card backdrop-blur-sm sm:block">
        <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">Proctored</p>
        <p className="text-xs font-medium text-slate-700">Fullscreen · Tab watch</p>
      </div>

      <div className="absolute -right-1 bottom-16 hidden rounded-lg border border-slate-200/90 bg-white/95 px-3 py-2 shadow-card backdrop-blur-sm lg:block">
        <p className="text-[10px] font-bold uppercase tracking-wide text-brand-600">Auto-saved</p>
        <p className="text-xs font-medium text-slate-700">Answers sync live</p>
      </div>
    </div>
  );
}
