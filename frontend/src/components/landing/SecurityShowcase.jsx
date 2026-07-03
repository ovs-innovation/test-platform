import { SecurityLineArt } from './LineArtIllustrations.jsx';

const LAYERS = [
  { label: 'JWT authentication', detail: 'Signed tokens, bcrypt passwords, role-based routes' },
  { label: 'API protection', detail: 'Helmet headers, rate limiting, CORS' },
  { label: 'Live proctoring', detail: 'Fullscreen lock, tab/blur/copy detection' },
  { label: 'Violation audit', detail: 'Every event logged per attempt for admin review' },
  { label: 'Secure payments', detail: 'Razorpay checkout with signature verification' },
  { label: 'Session integrity', detail: 'Auto logout on expired or invalid tokens' },
];

export default function SecurityShowcase() {
  return (
    <section id="security" className="border-y border-slate-200/80 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="container-app py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="badge border border-brand-200 bg-white text-brand-700 shadow-sm dark:border-brand-800 dark:bg-slate-900 dark:text-brand-300">
              Trust &amp; security
            </span>
            <h2 className="text-h2 mt-4">Built to protect every attempt</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Visible security on exam and payment flows. Institutes get full violation visibility.
            </p>
            <ul className="mt-8 space-y-3">
              {LAYERS.map((layer) => (
                <li key={layer.label} className="flex gap-3 rounded-[12px] border border-slate-200/80 bg-white p-4 shadow-soft dark:border-slate-700/80 dark:bg-slate-900">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{layer.label}</p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{layer.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center">
            <SecurityLineArt className="w-full max-w-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
