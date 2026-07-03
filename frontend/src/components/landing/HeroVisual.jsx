import { HeroLineArt } from './LineArtIllustrations.jsx';

/** Hero — line-art student + mock test paper (reference style) */
export default function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 rounded-[12px] bg-gradient-to-br from-brand-50/40 to-transparent dark:from-brand-950/20" aria-hidden />
      <HeroLineArt className="relative w-full max-w-lg drop-shadow-sm" />
      <div className="absolute bottom-4 right-2 rounded-[12px] border border-slate-200/80 bg-white px-3 py-2 shadow-soft dark:border-slate-700 dark:bg-slate-900">
        <p className="text-[10px] font-bold uppercase tracking-wide text-brand-600">NTA-style CBT</p>
        <p className="text-xs font-medium text-slate-700 dark:text-slate-200">Timer · Palette · Sections</p>
      </div>
    </div>
  );
}
