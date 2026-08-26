import { useState } from 'react';
import { TrendingUp, CheckCircle2, XCircle, HelpCircle, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';

export default function AiTestResultsCard({ beforeAfterComparison = [], questionsWithExplanations = [] }) {
  const [showAllExplanations, setShowAllExplanations] = useState(false);

  const wrongQuestions = questionsWithExplanations.filter((q) => q.isAttempted && !q.isCorrect);

  return (
    <div className="space-y-5">
      {/* 1. BEFORE VS AFTER ACCURACY COMPARISON CARD */}
      {beforeAfterComparison && beforeAfterComparison.length > 0 && (
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Topic Accuracy Progress (Before vs After)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Accuracy score before AI generation compared to after completing this booster test
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {beforeAfterComparison.map((item, idx) => {
              const before = Math.round(item.beforeAccuracy || item.before_accuracy || 0);
              const after = Math.round(item.afterAccuracy || item.after_accuracy || 0);
              const gain = after - before;

              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{item.topic}</span>
                      {item.subtopic && (
                        <span className="ml-1.5 text-slate-500 dark:text-slate-400 text-[11px]">({item.subtopic})</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 font-mono font-bold">
                      <span className="text-slate-500 dark:text-slate-400">Before: {before}%</span>
                      <span className="text-slate-400">➔</span>
                      <span className="text-emerald-600 dark:text-emerald-400">After: {after}%</span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                          gain >= 0
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                        }`}
                      >
                        {gain >= 0 ? `+${gain}%` : `${gain}%`}
                      </span>
                    </div>
                  </div>

                  {/* Dual Progress Bars */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="w-12 text-slate-400 font-medium">Before:</span>
                      <div className="flex-1 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-rose-500 h-full rounded-full"
                          style={{ width: `${Math.min(100, Math.max(4, before))}%` }}
                        />
                      </div>
                      <span className="w-8 text-right font-semibold text-slate-500">{before}%</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="w-12 text-emerald-600 dark:text-emerald-400 font-medium">After:</span>
                      <div className="flex-1 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${Math.min(100, Math.max(4, after))}%` }}
                        />
                      </div>
                      <span className="w-8 text-right font-bold text-emerald-600 dark:text-emerald-400">{after}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. INLINE EXPLANATIONS */}
      {questionsWithExplanations && questionsWithExplanations.length > 0 && (
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Question Explanations</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Step-by-step solutions for incorrect answer choices
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAllExplanations((prev) => !prev)}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>{showAllExplanations ? 'Show Only Wrong' : 'Show All Questions'}</span>
              {showAllExplanations ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>

          <div className="space-y-3">
            {(showAllExplanations ? questionsWithExplanations : wrongQuestions).map((q, idx) => {
              const opts = Array.isArray(q.options) ? q.options : [];
              const isWrong = q.isAttempted && !q.isCorrect;

              return (
                <div
                  key={q.questionId || idx}
                  className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-relaxed">
                      Q{idx + 1}. {q.questionText}
                    </p>
                    <span
                      className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold ${
                        q.isCorrect
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : isWrong
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {q.isCorrect ? <CheckCircle2 className="h-3 w-3" /> : isWrong ? <XCircle className="h-3 w-3" /> : <HelpCircle className="h-3 w-3" />}
                      {q.isCorrect ? 'Correct' : isWrong ? 'Incorrect' : 'Unattempted'}
                    </span>
                  </div>

                  {/* Options */}
                  {opts.length > 0 && (
                    <div className="space-y-1.5 text-xs">
                      {opts.map((opt, oi) => {
                        const isCorrectOpt = q.correctOptionIndex != null && Number(q.correctOptionIndex) === oi;
                        const isSelectedOpt = q.selectedOption != null && Number(q.selectedOption) === oi;

                        return (
                          <div
                            key={oi}
                            className={`rounded-lg px-3 py-2 flex items-center justify-between gap-2 ${
                              isCorrectOpt
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/60 font-bold'
                                : isSelectedOpt
                                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200 border border-rose-200 dark:border-rose-800/60 font-bold'
                                : 'text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="inline-flex h-4.5 w-4.5 items-center justify-center rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-bold">
                                {String.fromCharCode(65 + oi)}
                              </span>
                              <span>{opt}</span>
                            </span>
                            <span className="shrink-0 font-bold text-[11px]">
                              {isCorrectOpt && <span className="text-emerald-600 dark:text-emerald-400">✓ Correct</span>}
                              {isSelectedOpt && !isCorrectOpt && <span className="text-rose-600 dark:text-rose-400">Your Answer</span>}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Explanation */}
                  {q.explanation && (
                    <div className="p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-xs text-blue-950 dark:text-blue-200 space-y-1">
                      <div className="flex items-center gap-1 font-bold text-blue-700 dark:text-blue-400">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Explanation:</span>
                      </div>
                      <p className="leading-relaxed text-slate-700 dark:text-slate-300">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
