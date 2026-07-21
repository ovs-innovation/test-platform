import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import TestSeriesCard from '../public/TestSeriesCard.jsx';
import TestSeriesCardSkeleton from '../public/TestSeriesCardSkeleton.jsx';
import { EdvedumSectionHeader } from '../edvedum/EdvedumPlatformUI.jsx';
import { publicService } from '../../lib/services.js';

const STEPS = [
  { title: 'Create account', desc: 'Register with your email. No payment required to explore.' },
  { title: 'Enroll in a series', desc: 'Choose JEE, NEET or Foundation based on your class and exam.' },
  { title: 'Attempt the mock', desc: 'Full-screen CBT with section timer and question palette.' },
  { title: 'Review performance', desc: 'Score, rank, solutions and subject-wise breakdown.' },
];

const MINI_FAQ = [
  {
    q: 'Does the interface match NTA CBT?',
    a: 'Yes. Navigation, timer, palette colors, mark-for-review and submit flow strictly follow the official NTA exam pattern.',
  },
  {
    q: 'Can I attempt a free mock first?',
    a: 'Yes. Use the free diagnostic mock before purchasing a full test series to experience our real exam environment.',
  },
  {
    q: 'How is rank calculated?',
    a: 'Rank is predicted based on all students who attempted the same mock examination within the active test window.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept all major UPI applications (GPay, PhonePe, Paytm), credit & debit cards, net banking, and wallets via secure gateways.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'Yes. Refunds are available within 7 days of purchase if no test has been attempted. Please check our Refund Policy for full terms.',
  },
];

const STEP_THEMES = [
  {
    badge: 'bg-gradient-to-br from-[#0D6EFD] to-[#2563eb] text-white shadow-blue-500/30',
    border: 'hover:border-[#0D6EFD]/60',
  },
  {
    badge: 'bg-gradient-to-br from-[#7C3AED] to-purple-600 text-white shadow-purple-500/30',
    border: 'hover:border-[#7C3AED]/60',
  },
  {
    badge: 'bg-gradient-to-br from-[#00F0FF] to-[#06b6d4] text-slate-950 shadow-cyan-500/30 font-extrabold',
    border: 'hover:border-[#00F0FF]/70',
  },
  {
    badge: 'bg-gradient-to-br from-[#0D6EFD] to-[#7C3AED] text-white shadow-blue-500/30',
    border: 'hover:border-[#7C3AED]/60',
  },
];

export function EdvedumHowItWorks() {
  return (
    <section className="bg-[#F5F6FA] text-[#1A1F2E] py-16 lg:py-20 border-t border-slate-200/80">
      <div className="edvedum-section-wrap">
        <EdvedumSectionHeader
          eyebrow="Process"
          title="How it works"
          description="Four steps from registration to your first performance report."
        />
        <div className="relative">
          {/* Continuous Smooth Brand Gradient Connector Line Across Center of Step Circles */}
          <div
            className="pointer-events-none absolute left-[12%] right-[12%] top-5 hidden h-[2.5px] bg-gradient-to-r from-[#0D6EFD] via-[#7C3AED] to-[#00F0FF] opacity-40 lg:block"
            aria-hidden="true"
          />

          <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => {
              const theme = STEP_THEMES[i % STEP_THEMES.length];
              return (
                <li
                  key={step.title}
                  className={`group relative flex flex-col items-start rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 ${theme.border} hover:shadow-xl hover:shadow-slate-200/80`}
                >
                  <span
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-md transition-transform duration-300 group-hover:scale-110 ${theme.badge}`}
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-[16px] font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{step.desc}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function EdvedumFeaturedSeries() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicService.testSeries()
      .then((d) => setSeries((d.test_series || []).slice(0, 6)))
      .catch(() => setSeries([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-[#F5F6FA] text-[#1A1F2E] border-y border-slate-200/80 py-16 lg:py-20">
      <div className="edvedum-section-wrap">
        <EdvedumSectionHeader
          eyebrow="Enroll now"
          title="Popular test series"
          description="Series currently open for enrollment."
          action={(
            <Link to="/test-series" className="edvedum-btn-outline shrink-0">
              View all
            </Link>
          )}
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <TestSeriesCardSkeleton key={i} />)
            : series.map((s) => <TestSeriesCard key={s.id} series={s} />)}
        </div>
        {!loading && series.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-500">No test series published yet.</p>
        )}
      </div>
    </section>
  );
}

function FaqAccordionItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? 'border-[#0D6EFD]/50 bg-white shadow-md shadow-blue-500/5'
          : 'border-slate-200/90 bg-white hover:border-[#0D6EFD]/40 hover:bg-slate-50/70 hover:shadow-xs'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-[15px] font-bold text-slate-900 transition-colors group-hover:text-[#0D6EFD]">
          {faq.q}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? 'border-[#0D6EFD] bg-blue-50 text-[#0D6EFD] rotate-45'
              : 'border-slate-200 bg-slate-50 text-slate-500 group-hover:border-[#0D6EFD]/40 group-hover:text-[#0D6EFD]'
          }`}
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="border-t border-slate-100 px-6 py-4">
              <p className="text-[14px] leading-relaxed text-slate-600">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function EdvedumMiniFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="relative bg-[#F5F6FA] text-[#1A1F2E]">
      <section className="py-16 lg:py-20 border-t border-slate-200/80">
        <div className="edvedum-section-wrap max-w-3xl">
          <EdvedumSectionHeader
            eyebrow="Support"
            title="Common questions"
            description={(
              <>
                Visit{' '}
                <Link to="/faqs" className="font-medium text-[#0D6EFD] hover:underline">
                  Customer Care
                </Link>{' '}
                or{' '}
                <Link to="/contact" className="font-medium text-[#0D6EFD] hover:underline">
                  contact us
                </Link>{' '}
                for account and payment help.
              </>
            )}
          />
          <div className="space-y-3">
            {MINI_FAQ.map((faq, idx) => (
              <FaqAccordionItem
                key={faq.q}
                faq={faq}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
              />
            ))}
          </div>

          {/* VIEW ALL FAQS BUTTON */}
          <div className="mt-9 flex justify-center">
            <Link
              to="/faqs"
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#0D6EFD]/40 bg-white px-7 py-3 text-sm font-bold text-[#0D6EFD] shadow-xs transition-all duration-300 hover:border-[#0D6EFD] hover:bg-blue-50 hover:shadow-md hover:scale-[1.02]"
            >
              <span>View All FAQs</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
