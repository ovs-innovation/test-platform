import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicService } from '../../lib/services.js';
import { Skeleton } from '../../components/ui.jsx';

const TOPICS = [
  { id: 'all', label: 'All questions' },
  { id: 'exam', label: 'Exam & CBT' },
  { id: 'payment', label: 'Payments' },
  { id: 'account', label: 'Account' },
];

function guessTopic(title = '') {
  const t = title.toLowerCase();
  if (/pay|refund|price|₹/.test(t)) return 'payment';
  if (/login|account|signup|password/.test(t)) return 'account';
  if (/exam|cbt|mock|nta|timer|proctor/.test(t)) return 'exam';
  return 'all';
}

export default function FAQs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState('all');

  useEffect(() => {
    publicService.cmsList('faq')
      .then(setFaqs)
      .catch(() => setFaqs([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = topic === 'all' ? faqs : faqs.filter((f) => guessTopic(f.title) === topic);

  return (
    <div className="bg-white">
      <div className="border-b border-slate-200 bg-slate-100">
        <div className="container-app py-12 lg:py-14">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Help centre</h1>
          <p className="mt-3 max-w-lg text-slate-600">
            Answers about mocks, payments, and the NTA exam interface.
          </p>
        </div>
      </div>

      <div className="container-app grid gap-10 py-12 lg:grid-cols-[220px_1fr] lg:py-16">
        <aside className="hidden lg:block">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Topics</p>
          <nav className="mt-4 space-y-1">
            {TOPICS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTopic(t.id)}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                  topic === t.id
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <div className="mt-8 rounded-xl bg-brand-600 p-4 text-white">
            <p className="text-sm font-semibold">Still stuck?</p>
            <Link to="/contact" className="mt-2 inline-block text-sm text-brand-100 underline">
              Contact support
            </Link>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap gap-2 lg:hidden">
            {TOPICS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTopic(t.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                  topic === t.id ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-slate-200 p-5">
                  <Skeleton className="h-5 w-3/4" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-slate-500">No FAQs in this topic yet.</p>
          ) : (
            <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
              {filtered.map((f) => (
                <details key={f.id} className="group">
                  <summary className="cursor-pointer list-none px-5 py-4 font-medium text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {f.title}
                      <span className="text-slate-400 transition group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-slate-600">
                    {f.content}
                  </p>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
