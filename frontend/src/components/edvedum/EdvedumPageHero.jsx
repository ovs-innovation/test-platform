export default function EdvedumPageHero({ title, subtitle, accent }) {
  return (
    <div className="relative overflow-hidden bg-[#010d1f]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(124,58,237,0.35) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(37,99,235,0.25) 0%, transparent 55%)',
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-cyan-400">EDVEDUM ACADEMY</p>
        <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl lg:text-[2.6rem]">
          {accent ? (
            <>
              {title.split(accent)[0]}
              <span className="text-[#a855f7]">{accent}</span>
              {title.split(accent)[1] || ''}
            </>
          ) : (
            title
          )}
        </h1>
        {subtitle && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">{subtitle}</p>}
      </div>
    </div>
  );
}
