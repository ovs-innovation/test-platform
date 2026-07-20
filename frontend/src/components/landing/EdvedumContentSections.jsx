import { Link } from 'react-router-dom';
import { EdvedumSectionHeader } from '../edvedum/EdvedumPlatformUI.jsx';
import { FUTURE_SERVICES, SERVICES, WHY_CHOOSE } from '../../data/edvedumContent.js';

export function EdvedumWhyChoose({ showMoreLink = false }) {
  return (
    <section className="bg-white py-14 lg:py-16">
      <div className="edvedum-section-wrap">
        <EdvedumSectionHeader
          eyebrow="Why EDVEDUM"
          title="Why choose EDVEDUM?"
          description="Technology-driven preparation built around real exam practice and measurable improvement."
          action={
            showMoreLink ? (
              <Link to="/about" className="edvedum-btn-outline shrink-0 text-sm">
                Learn more
              </Link>
            ) : null
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((item) => (
            <div key={item.title} className="edvedum-card-elevated p-5">
              <h3 className="text-[15px] font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EdvedumServices() {
  return (
    <section className="edvedum-page-bg border-y border-slate-200/80 py-14 lg:py-16">
      <div className="edvedum-section-wrap">
        <EdvedumSectionHeader
          eyebrow="Offerings"
          title="Our services"
          description="Everything you need for structured JEE, NEET and Foundation preparation — on one platform."
        />
        <div className="flex flex-wrap gap-2.5">
          {SERVICES.map((service) => (
            <span
              key={service}
              className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-700 shadow-sm"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EdvedumComingSoon() {
  return (
    <section className="bg-white py-14 lg:py-16">
      <div className="edvedum-section-wrap">
        <EdvedumSectionHeader
          eyebrow="Roadmap"
          title="Coming soon"
          description="We are actively building the next generation of learning tools for students and institutes."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FUTURE_SERVICES.map((item) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50/80 px-4 py-3.5"
            >
              <span className="text-[14px] font-medium text-slate-700">{item}</span>
              <span className="rounded-md bg-slate-200/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600">
                Soon
              </span>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-r from-[#0a1628] to-[#1e3a8a] px-6 py-8 text-center text-white lg:px-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">Mobile app</p>
          <h3 className="mt-2 text-xl font-bold">Download app — coming soon</h3>
          <p className="mx-auto mt-2 max-w-lg text-[14px] text-white/70">
            Practice mocks, track rank and review performance from your phone. Launching soon on Android and iOS.
          </p>
        </div>
      </div>
    </section>
  );
}
