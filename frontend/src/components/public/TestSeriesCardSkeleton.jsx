import { Skeleton } from '../ui.jsx';

export default function TestSeriesCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
      <Skeleton className="h-[108px] w-full rounded-none bg-slate-200" />
      <div className="space-y-4 p-5">
        <Skeleton className="h-6 w-4/5" />
        <div className="grid grid-cols-2 gap-2.5">
          <Skeleton className="h-14 rounded-lg" />
          <Skeleton className="h-14 rounded-lg" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-11/12" />
          <Skeleton className="h-3.5 w-10/12" />
        </div>
        <Skeleton className="h-16 w-full rounded-xl" />
      </div>
    </div>
  );
}
