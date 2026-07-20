import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EdvedumSectionHeader } from '../../components/edvedum/EdvedumPlatformUI.jsx';
import { CONTACT, CUSTOMER_CARE_FAQS } from '../../data/edvedumContent.js';
import { publicService } from '../../lib/services.js';
import { Skeleton } from '../../components/ui.jsx';

const TOPICS = [
  { id: 'all', label: 'All' },
  { id: 'exam', label: 'CBT & exam' },
  { id: 'payment', label: 'Payments' },
  { id: 'account', label: 'Account' },
];

const QUICK_HELP = [
  { id: 'exam', label: 'Exam not loading?', desc: 'CBT and browser fixes' },
  { id: 'payment', label: 'Payment failed?', desc: 'Refund and retry help' },
  { id: 'account', label: "Can't login?", desc: 'Password and signup' },
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

  const cmsFiltered = topic === 'all' ? faqs : faqs.filter((f) => guessTopic(f.title) === topic);
  const displayFaqs = cmsFiltered.length > 0 ? cmsFiltered : CUSTOMER_CARE_FAQS;

  return (
    <div>
      <section className="edvedum-platform-band border-b border-white/10 py-14 lg:py-16">
        <div className="edvedum-section-wrap">
          <p className="edvedum-section-eyebrow text-cyan-400">Customer care</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white lg:text-4xl">
            Help & FAQs
          </h1>
          <div className="edvedum-title-accent mt-3 !from-cyan-400 !to-blue-400" aria-hidden />
          <p className="mt-4 max-w-xl text-[15px] text-white/65">
            Answers for mock tests, payments and login. Still stuck?{' '}
            <Link to="/contact" className="font-medium text-cyan-300 hover:underline">Contact us</Link>.
          </p>
        </div>
      </section>

      <section className="edvedum-page-bg py-14 lg:py-16">
        <div className="edvedum-section-wrap">
          <div className="grid gap-3 sm:grid-cols-3">
            {QUICK_HELP.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => setTopic(q.id)}
                className={`edvedum-card-elevated p-4 text-left transition ${
                  topic === q.id ? 'ring-2 ring-[#2563eb]/25' : ''
                }`}
              >
                <p className="text-[14px] font-semibold text-slate-900">{q.label}</p>
                <p className="mt-1 text-[13px] text-slate-500">{q.desc}</p>
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_260px]">
            <div>
              <div className="mb-6 flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTopic(t.id)}
                    className={`rounded border px-3 py-1.5 text-[13px] font-medium transition ${
                      topic === t.id
                        ? 'border-[#1d4ed8] bg-[#1d4ed8] text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="edvedum-card p-5">
                      <Skeleton className="h-5 w-3/4" />
                    </div>
                  ))}
                </div>
              ) : displayFaqs.length === 0 ? (
                <div className="edvedum-card border-dashed p-10 text-center">
                  <p className="text-sm text-slate-500">No FAQs in this topic yet.</p>
                  <Link to="/contact" className="mt-3 inline-block text-sm font-medium text-[#1d4ed8]">
                    Contact support
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg">
                  {displayFaqs.map((f, i) => (
                    <details key={f.id || i} className="group bg-white first:rounded-t-lg last:rounded-b-lg">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 marker:content-none [&::-webkit-details-marker]:hidden">
                        <span className="text-[14px] font-medium text-slate-900">{f.title}</span>
                        <span className="text-lg font-light text-slate-400 transition group-open:rotate-45">+</span>
                      </summary>
                      <p className="border-t border-slate-100 px-5 py-4 text-[14px] leading-relaxed text-slate-600">
                        {f.content}
                      </p>
                    </details>
                  ))}
                </div>
              )}
            </div>

            <aside className="space-y-4">
              <div className="edvedum-cta-panel !py-8">
                <h3 className="text-sm font-semibold text-white">Direct support</h3>
                <a href={CONTACT.phoneHref} className="mt-3 block text-xl font-bold text-white">
                  {CONTACT.phone}
                </a>
                <a href={`mailto:${CONTACT.supportEmail}`} className="mt-1 block text-[14px] text-cyan-300 hover:underline">
                  {CONTACT.supportEmail}
                </a>
                <Link to="/contact" className="mt-5 block rounded-lg border border-white/25 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/10">
                  All contacts
                </Link>
              </div>
              <div className="edvedum-card-elevated p-5">
                <p className="text-sm font-semibold text-slate-900">Continue practicing</p>
                <p className="mt-1 text-[13px] text-slate-500">Browse live test series while you wait.</p>
                <Link to="/test-series" className="edvedum-btn-primary mt-4 w-full">
                  Test series
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
