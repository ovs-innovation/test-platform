/** Product mockup chrome — makes CBT preview feel like real software */
export default function BrowserFrame({ children, label = 'assesspro.io/exam' }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-slate-100/90 p-2 shadow-elevated">
      <div className="flex items-center gap-3 border-b border-slate-200/80 px-3 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="min-w-0 flex-1 rounded-md bg-white px-3 py-1 text-center text-[11px] text-slate-400">
          {label}
        </div>
      </div>
      <div className="overflow-hidden rounded-lg bg-white">{children}</div>
    </div>
  );
}
