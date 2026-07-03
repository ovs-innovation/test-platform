export function ProgressRing({ value = 0, size = 120, stroke = 10, label, sublabel }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, value));
  const offset = c - (pct / 100) * c;

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-slate-100 dark:text-slate-800" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="text-brand-600 transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-2xl font-bold text-slate-900 dark:text-white">{Math.round(pct)}%</span>
        {sublabel && <span className="text-[10px] uppercase tracking-wide text-slate-500">{sublabel}</span>}
      </div>
      {label && <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>}
    </div>
  );
}

export function FilterChips({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            value === opt.id
              ? 'bg-brand-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function StepTimeline({ steps, current = 0 }) {
  return (
    <ol className="flex flex-col gap-0 sm:flex-row sm:items-center sm:justify-between">
      {steps.map((step, i) => (
        <li key={step} className="flex flex-1 items-center gap-3 sm:flex-col sm:text-center">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
              i <= current ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-500 dark:bg-slate-700'
            }`}
          >
            {i < current ? '✓' : i + 1}
          </span>
          <span className={`text-xs font-medium sm:mt-2 ${i <= current ? 'text-brand-700 dark:text-brand-400' : 'text-slate-500'}`}>
            {step}
          </span>
          {i < steps.length - 1 && <span className="hidden h-px flex-1 bg-slate-200 sm:block dark:bg-slate-700" />}
        </li>
      ))}
    </ol>
  );
}

export function AnimatedScore({ value, suffix = '%', className = '' }) {
  return (
    <span className={`animate-[scorePop_0.8s_ease-out] text-5xl font-extrabold tracking-tight ${className}`}>
      {value}{suffix}
    </span>
  );
}

export function SubjectBar({ label, value, variant = 'default' }) {
  const bar = variant === 'weak' ? 'bg-amber-600' : variant === 'strong' ? 'bg-emerald-600' : 'bg-slate-500';
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="mt-1 h-1.5 bg-slate-200 dark:bg-slate-700">
        <div className={`h-full ${bar}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function TrustBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300">
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
      {children}
    </span>
  );
}
