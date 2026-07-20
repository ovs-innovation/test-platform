import { Link } from 'react-router-dom';
import { EdvedumCtaStrip, EdvedumSectionHeader } from '../../components/edvedum/EdvedumPlatformUI.jsx';
import { COMPANY, CONTACT } from '../../data/edvedumContent.js';

const CONTACT_ROWS = [
  {
    label: 'Helpline',
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
    note: 'Admissions and general enquiries',
  },
  {
    label: 'Student support',
    value: CONTACT.supportEmail,
    href: `mailto:${CONTACT.supportEmail}`,
    note: 'Login, exams and technical issues',
  },
  {
    label: 'Business inquiries',
    value: CONTACT.businessEmail,
    href: `mailto:${CONTACT.businessEmail}`,
    note: 'Institutes and partnerships',
  },
  {
    label: 'Head office',
    value: COMPANY.headquarters,
    href: null,
    note: COMPANY.legalName,
  },
];

const SHORTCUTS = [
  { to: '/test-series', label: 'Test series' },
  { to: '/free-mock', label: 'Free mock' },
  { to: '/student-login', label: 'Student login' },
  { to: '/faqs', label: 'Customer care' },
];

export default function Contact() {
  return (
    <div>
      <section className="edvedum-platform-band border-b border-white/10 py-14 lg:py-16">
        <div className="edvedum-section-wrap">
          <p className="edvedum-section-eyebrow text-cyan-400">Our contacts</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white lg:text-4xl">
            Get in touch
          </h1>
          <div className="edvedum-title-accent mt-3 !from-cyan-400 !to-blue-400" aria-hidden />
          <p className="mt-4 max-w-xl text-[15px] text-white/65">
            For mock test access, payments or account issues — reach us by phone or email.
          </p>
        </div>
      </section>

      <section className="edvedum-page-bg py-14 lg:py-16">
        <div className="edvedum-section-wrap">
          <EdvedumSectionHeader eyebrow="Reach us" title="Contact details" />
          <div className="grid gap-4 sm:grid-cols-2">
            {CONTACT_ROWS.map((row) => {
              const Tag = row.href ? 'a' : 'div';
              return (
                <Tag
                  key={row.label}
                  href={row.href || undefined}
                  className="edvedum-card-elevated flex flex-col gap-2 p-5"
                >
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#2563eb]">{row.label}</p>
                  <p className="text-[16px] font-semibold text-slate-900">{row.value}</p>
                  <p className="text-[13px] text-slate-500">{row.note}</p>
                  {row.href && (
                    <span className="mt-auto pt-2 text-[13px] font-medium text-[#2563eb]">Contact →</span>
                  )}
                </Tag>
              );
            })}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SHORTCUTS.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="edvedum-card-elevated px-4 py-3.5 text-center text-[13px] font-semibold text-slate-700"
              >
                {s.label}
              </Link>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_300px]">
            <div className="edvedum-card-elevated p-6">
              <h2 className="text-base font-semibold text-slate-900">Before you write to us</h2>
              <ol className="mt-4 space-y-3 text-[14px] text-slate-600">
                <li className="flex gap-3">
                  <span className="font-semibold text-slate-400">1.</span>
                  Check Customer Care for login and payment FAQs.
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-slate-400">2.</span>
                  Include your registered email and roll number.
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-slate-400">3.</span>
                  Attach a screenshot if the CBT screen shows an error.
                </li>
              </ol>
            </div>
            <aside className="edvedum-cta-panel flex flex-col justify-center !py-8">
              <p className="edvedum-section-eyebrow text-cyan-400">Support hours</p>
              <p className="mt-2 text-[14px] text-white/60">Mon–Sat · 9 AM – 8 PM IST</p>
              <a href={CONTACT.phoneHref} className="mt-4 block text-xl font-bold text-white">
                {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.supportEmail}`} className="mt-1 block text-[14px] text-cyan-300 hover:underline">
                {CONTACT.supportEmail}
              </a>
              <Link to="/faqs" className="edvedum-btn-gradient mt-6 rounded-lg py-2.5 text-center text-sm font-semibold text-white">
                Customer care
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <EdvedumCtaStrip
        title="Need help during a mock?"
        desc="Our platform follows the NTA CBT pattern. Contact support if anything does not work as expected."
        primary={{ to: '/faqs', label: 'View FAQs' }}
        secondary={{ to: '/free-mock', label: 'Try free mock' }}
      />
    </div>
  );
}
