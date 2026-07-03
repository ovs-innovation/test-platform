import { Skeleton } from '../ui.jsx';

export default function TestSeriesCardSkeleton() {
  return (
    <div className="card overflow-hidden shadow-soft">
      <Skeleton className="aspect-[16/9] w-full rounded-none bg-slate-100 dark:bg-slate-800" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-4 w-14" />
        </div>
      </div>
    </div>
  );
}
