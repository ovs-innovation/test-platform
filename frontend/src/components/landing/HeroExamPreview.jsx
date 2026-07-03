/** NTA CBT screen miniature — hero product shot */
export default function HeroExamPreview() {
  const palette = [
    'bg-[#27ae60]', 'bg-[#27ae60]', 'bg-[#d9d9d9]', 'bg-[#e74c3c]',
    'bg-[#8e44ad]', 'bg-[#d9d9d9]', 'bg-[#27ae60]', 'bg-[#d9d9d9]',
    'bg-[#d9d9d9]', 'bg-[#27ae60]', 'bg-[#e74c3c]', 'bg-[#d9d9d9]',
  ];

  return (
    <div className="w-full text-left">
      <div className="flex items-center justify-between bg-[#1a4480] px-4 py-2.5 text-xs text-white">
        <div className="min-w-0">
          <p className="truncate font-semibold">JEE Main Full Mock · Series 2026</p>
          <p className="truncate text-[10px] text-blue-100">Roll 240518 · Physics Section</p>
        </div>
        <span className="shrink-0 rounded bg-red-600 px-2 py-1 font-mono text-xs font-bold">01:24:08</span>
      </div>
      <div className="flex">
        <div className="min-w-0 flex-1 p-4">
          <p className="text-[11px] font-bold uppercase text-[#1a4480]">Question 12 of 90 · +4 −1</p>
          <p className="mt-2 text-sm leading-snug text-slate-800">
            If the velocity of a particle is v = at + bt², the acceleration at time t is —
          </p>
          <div className="mt-4 space-y-2">
            {['a + 2bt', 'a + bt²', '2bt', 'a + 2bt²'].map((opt, i) => (
              <div
                key={opt}
                className={`flex items-center gap-2 rounded border px-3 py-2 text-xs ${
                  i === 0 ? 'border-[#1a4480] bg-[#eef4fc] font-medium text-slate-900' : 'border-slate-200 text-slate-600'
                }`}
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold ${
                  i === 0 ? 'border-[#1a4480] bg-[#1a4480] text-white' : 'border-slate-300'
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </div>
            ))}
          </div>
        </div>
        <div className="w-24 shrink-0 border-l border-slate-200 bg-[#f3f6fb] p-3">
          <p className="text-center text-[9px] font-bold uppercase text-slate-600">Palette</p>
          <div className="mt-2 grid grid-cols-3 gap-1">
            {palette.map((c, i) => (
              <div
                key={i}
                className={`flex aspect-square items-center justify-center text-[9px] font-bold text-white ${c} ${i === 2 ? 'ring-2 ring-[#1a4480] ring-offset-1' : ''}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-slate-200 bg-[#e8ecf1] px-3 py-2">
        {['Back', 'Clear', 'Save & Next', 'Submit'].map((btn) => (
          <span
            key={btn}
            className={`rounded border px-2 py-1 text-[9px] font-bold uppercase ${
              btn === 'Submit' ? 'border-red-700 bg-red-700 text-white' : 'border-slate-400 bg-white text-slate-700'
            }`}
          >
            {btn}
          </span>
        ))}
      </div>
    </div>
  );
}
