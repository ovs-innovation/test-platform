import {
  EdvedumSectionHeader,
  PlatformIcon,
  PLATFORM_PILLARS,
} from "../edvedum/EdvedumPlatformUI.jsx";

const STUDENT_IMAGE = "/edvedum/students-group.png";

function FeatureRow({ pillar }) {
  return (
    <div className="flex gap-4 rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md lg:p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1d4ed8] to-[#2563eb] text-white shadow-sm">
        <PlatformIcon type={pillar.icon} />
      </span>
      <div className="min-w-0">
        <h3 className="text-[15px] font-semibold text-slate-900">
          {pillar.title}
        </h3>
        <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
          {pillar.desc}
        </p>
      </div>
    </div>
  );
}

export default function EdvedumPlatformUnique() {
  return (
    <section className="edvedum-page-bg border-t border-slate-200/80 py-14 lg:py-16">
      <div className="edvedum-section-wrap">
        <EdvedumSectionHeader
          eyebrow="Platform"
          title="What makes EDVEDUM different?"
          description="Structured coaching backed by a serious mock-test platform — not generic quizzes or recorded lectures."
        />

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md">
              <img
                src={STUDENT_IMAGE}
                alt="EDVEDUM students preparing for JEE and NEET"
                className="aspect-[4/3] w-full object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-4 -right-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:-right-4">
              <p className="text-xl font-bold tabular-nums text-[#1d4ed8] lg:text-2xl">
                50,000+
              </p>
              <p className="text-[11px] font-medium text-slate-600">
                Students trained
              </p>
            </div>
          </div>

          <div className="space-y-3 lg:space-y-4">
            {PLATFORM_PILLARS.map((pillar) => (
              <FeatureRow key={pillar.title} pillar={pillar} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
