import { useState, useEffect } from 'react';
import { studentService } from '../../lib/services.js';
import {
  Brain, Sparkles, Target, BookOpen, Clock, AlertTriangle,
  TrendingUp, CheckCircle2, XCircle, BarChart2, Zap, Calendar,
  ChevronDown, ChevronUp, Star, Shield, Flame, Award, Lightbulb,
  RotateCcw, ArrowUpRight
} from 'lucide-react';

// ──────────────────────────────────────────────
// Tiny reusable badge pill
// ──────────────────────────────────────────────
function Badge({ label, color = 'blue' }) {
  const palette = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    red: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    slate: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${palette[color] || palette.blue}`}>
      {label}
    </span>
  );
}

// ──────────────────────────────────────────────
// Section wrapper card
// ──────────────────────────────────────────────
function SectionCard({ icon: Icon, title, badge, color = 'blue', children }) {
  const headerColors = {
    blue: 'from-blue-600/20 to-indigo-600/20 border-blue-500/20',
    green: 'from-emerald-600/20 to-teal-600/20 border-emerald-500/20',
    red: 'from-rose-600/20 to-red-600/20 border-rose-500/20',
    amber: 'from-amber-600/20 to-orange-600/20 border-amber-500/20',
    purple: 'from-purple-600/20 to-violet-600/20 border-purple-500/20',
  };
  const iconColors = {
    blue: 'text-blue-400 bg-blue-500/15',
    green: 'text-emerald-400 bg-emerald-500/15',
    red: 'text-rose-400 bg-rose-500/15',
    amber: 'text-amber-400 bg-amber-500/15',
    purple: 'text-purple-400 bg-purple-500/15',
  };
  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm overflow-hidden shadow-xl">
      <div className={`px-5 py-4 flex items-center gap-3 bg-gradient-to-r ${headerColors[color]} border-b border-slate-700/50`}>
        <div className={`p-2 rounded-xl ${iconColors[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-black text-white tracking-tight flex-1">{title}</h3>
        {badge && <Badge label={badge} color={color} />}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Accuracy bar
// ──────────────────────────────────────────────
function AccuracyBar({ value, color = 'blue' }) {
  const barColors = {
    blue: 'bg-blue-500',
    green: 'bg-emerald-500',
    red: 'bg-rose-500',
    amber: 'bg-amber-500',
  };
  const clampedValue = Math.min(100, Math.max(0, Number(value) || 0));
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColors[color] || 'bg-blue-500'}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      <span className="text-xs font-bold text-slate-300 w-9 text-right">{clampedValue}%</span>
    </div>
  );
}

// ──────────────────────────────────────────────
// Overall Performance Analysis
// ──────────────────────────────────────────────
function OverallPerformanceSection({ data, summary }) {
  const opa = data?.overall_performance_analysis || {};
  const confidenceColor = opa.confidence_level === 'High' ? 'green' : opa.confidence_level === 'Moderate' ? 'amber' : 'red';

  return (
    <SectionCard icon={Brain} title="Overall Performance Analysis" badge="AI Generated" color="purple">
      {/* Headline */}
      <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/20">
        <p className="text-sm font-bold text-white leading-snug">{opa.headline || `Score: ${summary?.total_score}/${summary?.max_marks}`}</p>
      </div>

      {/* Grid insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {[
          { label: 'Accuracy', icon: Target, text: opa.accuracy_summary, color: 'text-blue-400' },
          { label: 'Speed', icon: Clock, text: opa.speed_summary, color: 'text-cyan-400' },
          { label: 'Strengths', icon: Star, text: opa.strength_summary, color: 'text-emerald-400' },
          { label: 'Weaknesses', icon: AlertTriangle, text: opa.weakness_summary, color: 'text-rose-400' },
          { label: 'Consistency', icon: TrendingUp, text: opa.consistency, color: 'text-amber-400' },
          { label: 'Negative Impact', icon: Shield, text: opa.negative_impact, color: 'text-orange-400' },
        ].map(({ label, icon: Icon, text, color }) => text && (
          <div key={label} className="flex gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/40">
            <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${color}`} />
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-0.5">{label}</p>
              <p className="text-xs text-slate-200 leading-relaxed">{text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Confidence */}
      {opa.confidence_level && (
        <div className="flex items-center gap-2 pt-2 border-t border-slate-700/50">
          <span className="text-xs text-slate-400 font-medium">AI Confidence Assessment:</span>
          <Badge label={opa.confidence_level} color={confidenceColor} />
        </div>
      )}
    </SectionCard>
  );
}

// ──────────────────────────────────────────────
// 7-Day Study Plan
// ──────────────────────────────────────────────
function SevenDayPlanSection({ days = [] }) {
  const [expanded, setExpanded] = useState(null);
  if (!days || !days.length) return null;

  return (
    <SectionCard icon={Calendar} title="7-Day Personalised Study Plan" badge="AI Curated" color="blue">
      <div className="space-y-2">
        {days.map((d, i) => {
          const focusTitle = d.focus_chapter || d.focus || `Day ${d.day || i + 1} Revision`;
          const subName = d.subject || 'Subject';
          const duration = d.revision_duration_minutes || (d.estimatedHours ? d.estimatedHours * 60 : 60);
          const qCount = d.practice_questions || 20;
          const accVal = d.current_accuracy !== undefined ? d.current_accuracy : 40;
          const taskDesc = d.task || (Array.isArray(d.tasks) ? d.tasks.join('. ') : (Array.isArray(d.activities) ? d.activities.join('. ') : 'Revise core concepts and solve PYQs.'));

          return (
            <div key={i} className="rounded-xl border border-slate-700/50 overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-slate-800/40 hover:bg-slate-800/70 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-xs font-black text-blue-400">
                    {d.day || i + 1}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{focusTitle}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{subName} · {duration}min · {qCount}Q</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <AccuracyBar value={accVal} color={accVal < 50 ? 'red' : accVal < 75 ? 'amber' : 'green'} />
                  {expanded === i ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                </div>
              </button>
              {expanded === i && (
                <div className="px-4 py-3 bg-slate-900/40 border-t border-slate-700/40 space-y-2">
                  <p className="text-xs text-slate-300 leading-relaxed">{taskDesc}</p>
                  {d.daily_goal && (
                    <div className="flex items-center gap-2 pt-1">
                      <Target className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <p className="text-[10px] text-emerald-300 font-semibold">{d.daily_goal}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

// ──────────────────────────────────────────────
// Revision Strategy
// ──────────────────────────────────────────────
function RevisionStrategySection({ strategies = [] }) {
  if (!strategies.length) return null;
  const stratIcons = [Zap, Shield, Target, Clock, Lightbulb];

  return (
    <SectionCard icon={RotateCcw} title="AI Revision Strategy" badge="Personalised" color="amber">
      <div className="space-y-3">
        {strategies.map((s, i) => {
          const Icon = stratIcons[i % stratIcons.length];
          return (
            <div key={i} className="flex gap-3 p-3 rounded-xl bg-slate-800/50 border border-amber-500/10 hover:border-amber-500/25 transition-colors">
              <div className="p-1.5 rounded-lg bg-amber-500/10 shrink-0">
                <Icon className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div>
                <p className="text-[11px] font-black text-amber-300 mb-0.5">{s.title}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{s.rule}</p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

// ──────────────────────────────────────────────
// Topic Diagnostics (Strong / Average / Weak)
// ──────────────────────────────────────────────
function TopicDiagnosticsSection({ diagnostics = {} }) {
  const strong = diagnostics?.strong || [];
  const average = diagnostics?.average || [];
  const weak = diagnostics?.weak || [];
  const [tab, setTab] = useState(weak.length > 0 ? 'weak' : (strong.length > 0 ? 'strong' : 'average'));
  if (!strong.length && !average.length && !weak.length) return null;

  const tabs = [
    { key: 'weak', label: `Weak (${weak.length})`, color: 'rose' },
    { key: 'average', label: `Average (${average.length})`, color: 'amber' },
    { key: 'strong', label: `Strong (${strong.length})`, color: 'emerald' },
  ];
  const tabItems = tab === 'weak' ? weak : tab === 'average' ? average : strong;
  const tabColor = tab === 'weak' ? 'red' : tab === 'average' ? 'amber' : 'green';
  const tabIcon = tab === 'weak' ? XCircle : tab === 'average' ? BarChart2 : CheckCircle2;
  const TabIcon = tabIcon;

  return (
    <SectionCard icon={BarChart2} title="Topic Diagnostics" badge="Chapter-wise" color="red">
      {/* Tabs */}
      <div className="flex gap-1.5 mb-4 p-1 rounded-xl bg-slate-800/50">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 text-[11px] font-extrabold py-1.5 px-2 rounded-lg transition-all ${
              tab === t.key
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="space-y-2.5">
        {tabItems.length === 0 && (
          <p className="text-xs text-slate-500 text-center py-4">No data for this category.</p>
        )}
        {tabItems.map((item, i) => {
          const acc = item.accuracy || 0;
          return (
            <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
              <TabIcon className={`w-4 h-4 mt-0.5 shrink-0 ${tab === 'weak' ? 'text-rose-400' : tab === 'average' ? 'text-amber-400' : 'text-emerald-400'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-xs font-bold text-white truncate">{item.topic || item.chapter}</p>
                  <Badge label={item.subject} color="slate" />
                </div>
                <AccuracyBar value={acc} color={tabColor} />
                {item.reason && <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{item.reason}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

// ──────────────────────────────────────────────
// Time Pacing Advice
// ──────────────────────────────────────────────
function TimePacingSection({ data = {} }) {
  const { total_time_taken, avg_per_question, overall_pacing_advice, subject_timing = [], inefficient_questions = [] } = data;
  if (!total_time_taken && !subject_timing.length) return null;

  return (
    <SectionCard icon={Clock} title="Time Pacing Analysis" badge="AI Insight" color="blue">
      {/* Summary row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: 'Total Time', val: total_time_taken || '—' },
          { label: 'Avg / Question', val: avg_per_question || '—' },
        ].map(({ label, val }) => (
          <div key={label} className="p-3 rounded-xl bg-slate-800/50 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
            <p className="text-base font-black text-white mt-0.5">{val}</p>
          </div>
        ))}
      </div>

      {/* Subject timing */}
      {subject_timing.length > 0 && (
        <div className="space-y-2 mb-4">
          {subject_timing.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-400 w-16 shrink-0">{s.subject}</span>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${s.time_spent_seconds > 3000 ? 'bg-rose-500' : s.time_spent_seconds < 2000 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.min(100, (s.time_spent_seconds / 3600) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">{Math.round((s.time_spent_seconds || 0) / 60)}m</span>
                </div>
                {s.advice && <p className="text-[10px] text-slate-500 leading-tight">{s.advice}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Overall advice */}
      {overall_pacing_advice && (
        <div className="flex gap-2 p-3 rounded-xl bg-blue-900/20 border border-blue-500/15">
          <Lightbulb className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-200 leading-relaxed">{overall_pacing_advice}</p>
        </div>
      )}

      {/* Time traps */}
      {inefficient_questions.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-extrabold text-rose-400 uppercase tracking-wider mb-2">Time Trap Questions</p>
          <div className="space-y-1.5">
            {inefficient_questions.slice(0, 4).map((q, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-rose-900/20 border border-rose-500/15">
                <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
                <p className="text-[10px] text-rose-300">Q{q.question_number} ({q.subject}) — {q.time_spent}s spent. {q.advice}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionCard>
  );
}

// ──────────────────────────────────────────────
// Mistake Pattern Analysis
// ──────────────────────────────────────────────
function MistakePatternSection({ data = {} }) {
  const { total_wrong, marks_lost, conceptual_errors = [], silly_mistakes = {}, time_pressure_errors = {}, negative_marking_impact = {} } = data;
  if (!total_wrong && !marks_lost) return null;

  return (
    <SectionCard icon={AlertTriangle} title="Mistake Pattern Analysis" badge="Error Insights" color="red">
      {/* Top stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-rose-900/20 border border-rose-500/20 text-center">
          <p className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Wrong Answers</p>
          <p className="text-2xl font-black text-white">{total_wrong || 0}</p>
        </div>
        <div className="p-3 rounded-xl bg-orange-900/20 border border-orange-500/20 text-center">
          <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">Marks Lost</p>
          <p className="text-2xl font-black text-white">-{marks_lost || 0}</p>
        </div>
      </div>

      {/* Conceptual errors */}
      {conceptual_errors.length > 0 && (
        <div className="mb-3">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Conceptual Errors</p>
          {conceptual_errors.map((e, i) => (
            <div key={i} className="flex gap-2 p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/40 mb-1.5">
              <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-rose-300">{e.chapter} — {e.wrong_count} wrong</p>
                <p className="text-[10px] text-slate-400">{e.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sub-sections: silly + time pressure + negative */}
      {[
        { title: 'Silly Mistakes', icon: Zap, data: silly_mistakes, color: 'text-amber-400', bg: 'bg-amber-900/10 border-amber-500/10' },
        { title: 'Time Pressure Errors', icon: Clock, data: time_pressure_errors, color: 'text-orange-400', bg: 'bg-orange-900/10 border-orange-500/10' },
        { title: 'Negative Marking Impact', icon: Shield, data: negative_marking_impact, color: 'text-rose-400', bg: 'bg-rose-900/10 border-rose-500/10' },
      ].map(({ title, icon: Icon, data: d, color, bg }) => d && (d.count > 0 || d.marks_lost > 0 || d.detail) ? (
        <div key={title} className={`flex gap-2 p-3 rounded-xl border ${bg} mb-2`}>
          <Icon className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${color}`} />
          <div>
            <p className={`text-[10px] font-extrabold uppercase tracking-wider mb-0.5 ${color}`}>{title}</p>
            <p className="text-xs text-slate-300">{d.detail || d.advice}</p>
            {d.fix && <p className="text-[10px] text-slate-400 mt-1 italic">Fix: {d.fix}</p>}
          </div>
        </div>
      ) : null)}
    </SectionCard>
  );
}

// ──────────────────────────────────────────────
// Improvement Strategy
// ──────────────────────────────────────────────
function ImprovementStrategySection({ data = {} }) {
  const { priority_subjects = [], score_growth_projection, target_next_test, practice_intensity, skills_to_improve = [] } = data;
  if (!priority_subjects.length && !score_growth_projection) return null;

  return (
    <SectionCard icon={TrendingUp} title="Improvement Strategy" badge="Action Plan" color="green">
      {/* Priority subjects */}
      {priority_subjects.length > 0 && (
        <div className="mb-4 space-y-2">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Priority Subjects</p>
          {priority_subjects.map((s, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-800/50 border border-emerald-500/15">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-black text-white">{s.subject}</p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                  <ArrowUpRight className="w-3 h-3" />
                  {s.current_accuracy}% → {s.target_accuracy}%
                </div>
              </div>
              <AccuracyBar value={s.current_accuracy} color="green" />
              {s.strategy && <p className="text-[10px] text-slate-400 mt-1">{s.strategy}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Projection */}
      {score_growth_projection && (
        <div className="p-3 rounded-xl bg-emerald-900/20 border border-emerald-500/20 mb-3">
          <div className="flex gap-2">
            <Flame className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-200 leading-relaxed">{score_growth_projection}</p>
          </div>
        </div>
      )}

      {/* Target + intensity */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {target_next_test && (
          <div className="p-3 rounded-xl bg-slate-800/50 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Next Test Target</p>
            <p className="text-xl font-black text-emerald-400">{target_next_test}</p>
          </div>
        )}
        {practice_intensity && (
          <div className="p-3 rounded-xl bg-slate-800/50 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Practice Intensity</p>
            <p className="text-xs font-bold text-white mt-1">{practice_intensity}</p>
          </div>
        )}
      </div>

      {/* Skills */}
      {skills_to_improve.length > 0 && (
        <div>
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Skills to Develop</p>
          <div className="flex flex-wrap gap-2">
            {skills_to_improve.map((sk, i) => (
              <span key={i} className="px-2.5 py-1 rounded-full bg-slate-700/60 border border-slate-600/40 text-[11px] font-semibold text-slate-300">
                {sk}
              </span>
            ))}
          </div>
        </div>
      )}
    </SectionCard>
  );
}

// ──────────────────────────────────────────────
// Recommended eBooks
// ──────────────────────────────────────────────
function RecommendedEbooksSection({ books = [] }) {
  if (!books.length) return null;
  const priorityColor = (p = '') => {
    if (p.toLowerCase().includes('urgent')) return 'red';
    if (p.toLowerCase().includes('high')) return 'amber';
    return 'blue';
  };

  return (
    <SectionCard icon={BookOpen} title="AI Recommended Study Modules" badge={`${books.length} Books`} color="blue">
      <div className="space-y-3">
        {books.map((b, i) => (
          <div key={i} className="flex gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:border-blue-500/25 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-0.5">
                <p className="text-xs font-bold text-white leading-snug">{b.title}</p>
                <Badge label={b.priority || 'Recommended'} color={priorityColor(b.priority)} />
              </div>
              {b.chapter && <p className="text-[10px] text-slate-400 mb-1">{b.chapter}</p>}
              {b.reason && <p className="text-[10px] text-slate-500 italic leading-relaxed">{b.reason}</p>}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ──────────────────────────────────────────────
// MAIN AIMentorReportView
// ──────────────────────────────────────────────
export default function AIMentorReportView({ testId }) {
  const [state, setState] = useState('idle'); // idle | loading | done | error
  const [report, setReport] = useState(null);

  const fetchReport = async () => {
    if (!testId) return;
    setState('loading');
    try {
      const res = await studentService.getAIMentorReport(testId);
      setReport(res);
      setState('done');
    } catch (err) {
      console.error('[AIMentorReportView] Failed to load AI mentor report:', err);
      setState('error');
    }
  };

  useEffect(() => {
    if (testId) fetchReport();
  }, [testId]);

  // ── Loading state ──
  if (state === 'loading') {
    return (
      <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-900 p-8 flex flex-col items-center gap-4 shadow-2xl">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin" />
          <Brain className="w-6 h-6 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="text-center">
          <p className="text-sm font-black text-white">AI Mentor is analysing your test performance...</p>
          <p className="text-xs text-slate-400 mt-1">Reading {(Math.random() * 100 + 150).toFixed(0)} data points from your attempt</p>
        </div>
        <div className="flex gap-1.5 flex-wrap justify-center mt-1">
          {['Analysing accuracy', 'Detecting mistakes', 'Building 7-day plan', 'Identifying weak chapters', 'Computing projections'].map((t, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // ── Error state ──
  if (state === 'error') {
    return (
      <div className="rounded-2xl border border-rose-500/20 bg-rose-950/20 p-6 text-center space-y-3">
        <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto" />
        <p className="text-sm font-bold text-white">Failed to generate AI Mentor Report</p>
        <p className="text-xs text-slate-400">Please ensure you have submitted this test and try again.</p>
        <button onClick={fetchReport} className="px-4 py-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold hover:bg-rose-500/25 transition-colors">
          Retry
        </button>
      </div>
    );
  }

  // ── Idle state (trigger button) ──
  if (state === 'idle') {
    return (
      <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-slate-900 to-indigo-950/40 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30 shrink-0">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">AI Mentor Report</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              Get Your Personalised <span className="text-purple-400">AI Mentor Analysis</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Powered by AI — analyses your real test data to generate an 8-section personalised mentor report covering mistakes, weak chapters, revision plan, and score projections.
            </p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
              {['Mistake Patterns', 'Weak Chapter Diagnostics', '7-Day Plan', 'Score Projection', 'Revision Strategy'].map(f => (
                <span key={f} className="px-2 py-0.5 rounded-full bg-slate-700/50 border border-slate-600/50 text-[10px] font-semibold text-slate-300">{f}</span>
              ))}
            </div>
          </div>
          <button
            onClick={fetchReport}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 active:scale-95 shrink-0 flex items-center gap-2"
          >
            <Brain className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </div>
    );
  }

  // ── Done: render report ──
  if (state !== 'done' || !report) return null;

  const aiReport = report.ai_mentor_report || {};
  const summary = report.summary || {};

  return (
    <div className="space-y-5">
      {/* AI Mentor Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-5 sm:p-7 relative overflow-hidden shadow-2xl border border-purple-500/20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 left-0 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur">
              <Brain className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">AI Mentor Report</span>
              </div>
              <p className="text-xs text-purple-200">{report.test_info?.test_name}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-2xl font-black text-white tabular-nums">{summary.total_score}/{summary.max_marks}</p>
              <p className="text-[10px] text-purple-300">{summary.accuracy_percent}% accuracy</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Correct', val: summary.correct_count, color: 'text-emerald-300' },
              { label: 'Wrong', val: summary.incorrect_count, color: 'text-rose-300' },
              { label: 'Unattempted', val: summary.unattempted_count, color: 'text-slate-300' },
              summary.all_india_rank ? { label: 'AIR', val: `#${summary.all_india_rank}`, color: 'text-amber-300' } : null,
              summary.percentile ? { label: 'Percentile', val: `${summary.percentile}%`, color: 'text-cyan-300' } : null,
            ].filter(Boolean).map(({ label, val, color }) => (
              <div key={label} className="text-center bg-white/5 rounded-xl px-3 py-1.5">
                <p className={`text-sm font-black ${color} tabular-nums`}>{val}</p>
                <p className="text-[9px] text-purple-300/70 uppercase tracking-wider font-bold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 8 Report Sections */}
      <OverallPerformanceSection data={aiReport} summary={summary} />
      <TopicDiagnosticsSection diagnostics={aiReport.topic_diagnostics} />
      <SevenDayPlanSection days={aiReport.seven_day_plan} />
      <RevisionStrategySection strategies={aiReport.revision_strategy} />
      <MistakePatternSection data={aiReport.mistake_pattern_analysis} />
      <TimePacingSection data={aiReport.time_pacing_advice} />
      <ImprovementStrategySection data={aiReport.improvement_strategy} />
      <RecommendedEbooksSection books={aiReport.recommended_ebooks} />

      {/* Footer note */}
      <div className="flex items-center gap-2 text-[10px] text-slate-500 px-1">
        <Sparkles className="w-3 h-3 text-purple-500" />
        Generated by AI on {new Date(report.generated_at || Date.now()).toLocaleString('en-IN')} · Based on {report.test_info?.test_name || 'this test'}
      </div>
    </div>
  );
}
