export default function AuthDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0" aria-hidden="true">
      {/* Curved Glowing Connector Lines (fading before reaching center login container) */}
      <svg className="absolute inset-0 h-full w-full stroke-blue-500/20 fill-none hidden lg:block" aria-hidden="true">
        <defs>
          <linearGradient id="connector-fade-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
            <stop offset="40%" stopColor="#2563eb" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="connector-fade-right" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
            <stop offset="40%" stopColor="#2563eb" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Top-Left to Center Curve */}
        <path d="M 160 120 C 260 140, 320 220, 380 300" stroke="url(#connector-fade-left)" strokeWidth="1.5" strokeDasharray="4 4" />
        {/* Top-Right to Center Curve */}
        <path d="M 85% 130 C 78% 180, 70% 240, 62% 320" stroke="url(#connector-fade-right)" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>

      {/* ========================================================================= */}
      {/* 1. TOP LEFT — CBT QUESTION SHEET (TEST)                                  */}
      {/* ========================================================================= */}
      <div className="absolute top-[5%] left-[2%] sm:left-[3%] xl:left-[5%] hidden sm:block">
        <div 
          className="w-[140px] sm:w-[165px] xl:w-[185px] rounded-2xl border border-slate-300/80 bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e2e8f0] p-3.5 shadow-[0_20px_45px_rgba(0,0,0,0.55),0_0_20px_rgba(37,99,235,0.18)] text-slate-800 backdrop-blur-sm"
          style={{
            transform: 'perspective(800px) rotateX(14deg) rotateY(-18deg) rotateZ(-5deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Question Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
              <span className="text-[10px] font-extrabold tracking-wider text-slate-700 uppercase">Question 01</span>
            </div>
            <span className="rounded bg-[#2563EB]/10 px-1.5 py-0.5 text-[8.5px] font-bold text-[#2563EB] border border-[#2563EB]/20">
              MCQ
            </span>
          </div>

          {/* Question Lines */}
          <div className="space-y-1.5 mb-3">
            <div className="h-1.5 w-full rounded bg-slate-300/80" />
            <div className="h-1.5 w-3/4 rounded bg-slate-200" />
          </div>

          {/* Answer Options */}
          <div className="space-y-1.5 text-[9px]">
            <div className="flex items-center gap-2 rounded-lg bg-slate-100/90 px-2 py-1 border border-slate-200/80">
              <span className="font-bold text-slate-500">A.</span>
              <div className="h-1 w-12 rounded bg-slate-300" />
            </div>
            {/* Option B - Selected in Brand Blue */}
            <div className="flex items-center justify-between rounded-lg bg-[#2563EB] px-2 py-1 text-white shadow-md shadow-[#2563EB]/30">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">B.</span>
                <div className="h-1 w-12 rounded bg-blue-100" />
              </div>
              <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-slate-100/90 px-2 py-1 border border-slate-200/80">
              <span className="font-bold text-slate-500">C.</span>
              <div className="h-1 w-10 rounded bg-slate-300" />
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-slate-100/90 px-2 py-1 border border-slate-200/80">
              <span className="font-bold text-slate-500">D.</span>
              <div className="h-1 w-14 rounded bg-slate-300" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BOTTOM LEFT — STUDY BOOK STACK                                         */}
      {/* ========================================================================= */}
      <div className="absolute bottom-[6%] left-[2%] sm:left-[3%] xl:left-[4%] hidden lg:block">
        <div 
          className="relative w-[140px] sm:w-[160px] xl:w-[175px] h-[105px]"
          style={{
            transform: 'perspective(800px) rotateX(22deg) rotateY(16deg) rotateZ(3deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Bottom Book (Navy Cover) */}
          <div className="absolute bottom-0 left-0 w-full h-[28px] rounded-r-md border border-slate-700 bg-gradient-to-r from-[#0a1a36] via-[#112750] to-[#0a1a36] shadow-[0_14px_35px_rgba(0,0,0,0.65)] flex items-center px-3 justify-between">
            <div className="w-full h-full border-r-4 border-slate-200 flex items-center pr-2">
              <span className="text-[8.5px] font-black text-slate-300 tracking-widest uppercase">PHYSICS</span>
            </div>
          </div>
          {/* Middle Book (Brand Blue `#2563EB`) */}
          <div className="absolute bottom-[20px] left-2 w-[92%] h-[26px] rounded-r-md border border-blue-600 bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#1e40af] shadow-md flex items-center px-3 justify-between">
            <div className="w-full h-full border-r-4 border-slate-100 flex items-center pr-2">
              <span className="text-[8.5px] font-black text-white tracking-widest uppercase">CHEMISTRY</span>
            </div>
          </div>
          {/* Top Book (Deep Navy with Gold Accent Spine) */}
          <div className="absolute bottom-[38px] left-4 w-[85%] h-[26px] rounded-r-md border border-slate-600 bg-gradient-to-r from-[#09152a] via-[#0f2142] to-[#09152a] shadow-lg flex items-center px-3 justify-between">
            <div className="w-full h-full border-r-4 border-[#C5A059] flex items-center pr-2">
              <span className="text-[8.5px] font-black text-[#C5A059] tracking-widest uppercase">MATHEMATICS</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. TOP RIGHT — VERIFIED / SECURE EXAM OBJECT                             */}
      {/* ========================================================================= */}
      <div className="absolute top-[6%] right-[2%] sm:right-[3%] xl:right-[4%] hidden sm:block">
        <div 
          className="w-[110px] sm:w-[130px] xl:w-[145px] rounded-2xl border border-slate-700/80 bg-gradient-to-b from-[#0f2246]/95 to-[#0a1730]/95 p-3 shadow-[0_20px_45px_rgba(0,0,0,0.6),0_0_25px_rgba(37,99,235,0.2)] backdrop-blur-md text-center"
          style={{
            transform: 'perspective(800px) rotateX(15deg) rotateY(12deg) rotateZ(3deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Shield Icon Graphic */}
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] shadow-md shadow-[#2563EB]/40 mb-2 border border-blue-400/40">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <p className="text-[9.5px] font-black tracking-wider text-slate-200 uppercase">CBT VERIFIED</p>
          <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 px-2 py-0.5 text-[8px] font-bold text-[#22C55E]">
            <span>● Protected</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM RIGHT — ANALYTICS OBJECT                                       */}
      {/* ========================================================================= */}
      <div className="absolute bottom-[6%] right-[2%] sm:right-[3%] xl:right-[4%] hidden lg:block">
        <div 
          className="w-[120px] sm:w-[140px] xl:w-[155px] rounded-2xl border border-slate-700/80 bg-gradient-to-b from-[#0f2246]/95 to-[#0a1730]/95 p-3 shadow-[0_20px_45px_rgba(0,0,0,0.6),0_0_20px_rgba(37,99,235,0.18)] backdrop-blur-md"
          style={{
            transform: 'perspective(800px) rotateX(18deg) rotateY(-14deg) rotateZ(-4deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-1.5 mb-2">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-300">Analytics</span>
            <span className="text-[8px] font-bold text-[#22C55E] bg-[#22C55E]/10 px-1.5 py-0.5 rounded border border-[#22C55E]/30">+14%</span>
          </div>
          {/* 3 Vertical Bars */}
          <div className="flex items-end justify-between h-14 pt-2 px-1 gap-2">
            <div className="w-1/3 flex flex-col items-center gap-1 h-full justify-end">
              <div className="w-full rounded-t-md bg-gradient-to-t from-[#1d4ed8] to-[#2563EB] h-[60%]" />
              <span className="text-[7.5px] font-bold text-slate-400">PHY</span>
            </div>
            <div className="w-1/3 flex flex-col items-center gap-1 h-full justify-end">
              <div className="w-full rounded-t-md bg-gradient-to-t from-[#15803d] to-[#22C55E] h-[90%]" />
              <span className="text-[7.5px] font-bold text-slate-400">CHM</span>
            </div>
            <div className="w-1/3 flex flex-col items-center gap-1 h-full justify-end">
              <div className="w-full rounded-t-md bg-gradient-to-t from-[#0284c7] to-[#38bdf8] h-[75%]" />
              <span className="text-[7.5px] font-bold text-slate-400">MTH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
