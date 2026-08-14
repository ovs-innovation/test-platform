import { useState, useEffect, useMemo } from 'react';
import {
  Target,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Brain,
  Zap,
  ChevronRight,
  Loader2,
  Calendar,
  Award,
} from 'lucide-react';
import { studentReportService } from '../../lib/services.js';

export default function AIInsightsCard({ isDarkMode = false, testId = null, testData = null }) {
  const [aiPlan, setAiPlan] = useState(null);
  const [loading, setLoading] = useState(!testData);
  const [activeTab, setActiveTab] = useState('plan'); // 'plan' | 'causes' | 'strategy'

  const fetchAIPlan = async () => {
    setLoading(true);
    try {
      const params = testId ? { test_id: testId } : undefined;
      const res = await studentReportService.getAIPlan(params);
      if (res?.data || res?.plan) {
        setAiPlan(res.data || res.plan);
      }
    } catch (err) {
      console.error('Error fetching Gemini AI plan:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!testData) {
      fetchAIPlan();
    } else {
      setLoading(false);
    }
  }, [testId, testData]);

  const mentorData = useMemo(() => {
    const dataObj = testData?.exam_mentor_strategy || testData || aiPlan || {};

    let rawExamType = dataObj.examType || dataObj.exam_type || testData?.test_info?.test_type || 'JEE / NEET CBT';
    const examType = String(rawExamType).replace(/_/g, ' ').trim();

    let rawSummary = dataObj.performanceSummary || dataObj.performance_summary || dataObj.summary_observation || '';
    let performanceSummary = rawSummary
      .replace(/UNIT_TEST/gi, 'Unit Test')
      .replace(/\s*\([^)]*covering[^)]*\)/gi, '')
      .replace(/This reflects a promising foundation in [^.]*\./gi, '')
      .replace(/^In this [^,]*,?\s*you scored/gi, 'You scored')
      .trim();

    if (!performanceSummary) {
      performanceSummary = testData?.summary
        ? `Scored ${testData.summary.total_score}/${testData.summary.max_marks} marks (${testData.summary.percentage || testData.summary.overall_accuracy || 0}% accuracy).`
        : 'Complete test analysis and personalized strategic roadmap.';
    }

    let rawNote = dataObj.motivationalNote || dataObj.motivational_note || '';
    let motivationalNote = rawNote
      .replace(/Your performance in [^proves]*proves your analytical potential[—-]*/gi, '')
      .replace(/UNIT_TEST/gi, 'Unit Test')
      .trim();

    if (!motivationalNote) {
      motivationalNote = 'Focusing on your priority revision plan over the next few days will unlock your target score!';
    }

    // Priority Topics
    let priorityTopics = dataObj.priorityTopics || dataObj.priority_topics || [];
    if (!Array.isArray(priorityTopics)) priorityTopics = [];

    // Root Cause Analysis
    let rca = dataObj.rootCauseAnalysis || dataObj.root_cause_analysis || [];
    if (!Array.isArray(rca) || rca.length === 0) {
      const rawWeak = testData?.weak_topics || testData?.strong_and_weak_topics?.weak_topics || testData?.strong_and_weak_topics?.weak || [];
      rca = (Array.isArray(rawWeak) ? rawWeak : []).map(t => {
        const topicName = typeof t === 'string' ? t : (t.chapter_name || t.topic || 'Weak Topic');
        const issueText = typeof t === 'object' ? (t.reason || t.suggestion || t.concept_gap || `Accuracy gap identified in ${topicName}.`) : `Revision needed in ${topicName}.`;
        return { topic: topicName, issue: issueText };
      });
    }

    if (priorityTopics.length === 0 && rca.length > 0) {
      priorityTopics = rca.map(r => r.topic);
    }

    // Daily Plan
    let rawPlan = dataObj.dailyPlan || dataObj.daily_plan || dataObj.seven_day_revision_plan || dataObj.personalized_improvement_plan || dataObj.improvement_plan || testData?.seven_day_revision_plan || testData?.personalized_improvement_plan || [];
    if (!Array.isArray(rawPlan)) rawPlan = [];

    const dailyPlan = rawPlan.map((item, idx) => {
      const dayNum = typeof item.day === 'number' ? item.day : (parseInt(String(item.day).replace(/\D/g, '')) || idx + 1);

      let focusStr = item.focus || item.focus_area || item.focus_subject || item.chapter || item.focus_chapter || item.chapter_name || item.topic;
      if (!focusStr && Array.isArray(item.focus_chapters)) {
        focusStr = item.focus_chapters.join(', ');
      } else if (typeof item.focus_chapters === 'string') {
        focusStr = item.focus_chapters;
      }
      if (!focusStr) focusStr = `Day ${dayNum} Core Revision`;

      let acts = item.activities;
      if (!Array.isArray(acts) || acts.length === 0) {
        const actStr = item.task || item.recommended_action || item.suggestion || item.rule || 'Revise core concepts and practice PYQs.';
        acts = [actStr];
      }

      const estHours = item.estimatedHours || item.estimated_hours || (item.target_time_minutes ? Math.round(item.target_time_minutes / 60) : 4);

      return {
        day: dayNum,
        focus: focusStr,
        activities: acts,
        estimatedHours: estHours
      };
    });

    // Exam Strategy Tips
    let tips = dataObj.examStrategyTips || dataObj.exam_strategy_tips || dataObj.revision_strategy || [];
    if (Array.isArray(tips) && tips.length > 0) {
      tips = tips.map(s => typeof s === 'string' ? s : `${s.title ? s.title + ': ' : ''}${s.rule || s.suggestion || ''}`);
    } else {
      tips = [
        'Strict 2-Pass Question Selection: Direct formula questions first, complex calculations second.',
        'Time Trap Control: Bookmark questions taking longer than 2.5 minutes without progress.',
        'Negative Marking Protection: Avoid 50-50 random guesses without eliminating at least 2 options.'
      ];
    }

    return {
      examType,
      performanceSummary,
      rootCauseAnalysis: rca,
      priorityTopics,
      dailyPlan,
      examStrategyTips: tips,
      motivationalNote
    };
  }, [testData, aiPlan]);

  return (
    <div
      className={`rounded-3xl border p-6 sm:p-7 space-y-6 shadow-sm relative overflow-hidden transition ${
        isDarkMode
          ? 'bg-[#0B1730] border-slate-800 text-white'
          : 'bg-white border-slate-200/90 text-slate-900'
      }`}
    >
      {/* Background Accent Mesh */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 dark:bg-cyan-500/10 blur-3xl"
        aria-hidden="true"
      />

      {/* HEADER */}
      <div className="border-b pb-5 border-slate-100 dark:border-slate-800/80 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Brain className="h-6 w-6 text-indigo-600 dark:text-cyan-400" />
            <span>AI Diagnostic & Personalised Revision Hub</span>
          </h2>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100 dark:border-slate-800/60">
        {[
          { id: 'plan', label: 'Day-by-Day Study Plan', icon: Calendar },
          { id: 'causes', label: 'Root Cause & Priority Topics', icon: Target },
          { id: 'strategy', label: 'Exam Strategy Tips', icon: Zap },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md font-extrabold dark:bg-cyan-500 dark:text-slate-950'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CONTENT AREA */}
      {loading ? (
        <div className="py-12 text-center space-y-3">
          <Loader2 className="h-8 w-8 text-indigo-600 dark:text-cyan-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            AI is analyzing your test metrics and crafting your custom strategy...
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* TAB 1: DAY-BY-DAY STUDY PLAN */}
          {activeTab === 'plan' && (
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Target className="h-4 w-4 text-indigo-600 dark:text-cyan-400" />
                <span>Personalized Revision Roadmap</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(mentorData.dailyPlan || []).map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between transition hover:border-indigo-300 dark:hover:border-cyan-500/40 ${
                      isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/80 border-slate-200/90'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-100 text-indigo-800 border border-indigo-200 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20">
                          {typeof item.day === 'number' ? `Day ${item.day}` : item.day}
                        </span>
                        {item.estimatedHours && (
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-bold">
                            <Clock className="h-3 w-3" /> {item.estimatedHours}h study
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{item.focus || item.focus_area}</h4>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                        {(item.activities || [item.recommended_action]).map((act, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-1.5">
                            <span className="text-indigo-500 dark:text-cyan-400 font-bold">•</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800/60 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Recommended Focus
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ROOT CAUSE ANALYSIS & PRIORITY TOPICS */}
          {activeTab === 'causes' && (
            <div className="space-y-5">
              {/* Priority Topics Ranking */}
              {mentorData.priorityTopics?.length > 0 && (
                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/80 border-slate-200/90'} space-y-2`}>
                  <h4 className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-cyan-400 flex items-center gap-1.5">
                    <Award className="h-4 w-4" /> Priority Topic Ranking (What to Fix First)
                  </h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {mentorData.priorityTopics.map((pt, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl text-xs font-extrabold bg-indigo-500/10 text-indigo-700 dark:bg-cyan-500/10 dark:text-cyan-300 border border-indigo-500/20 flex items-center gap-1.5"
                      >
                        <span className="w-4 h-4 rounded-full bg-indigo-600 text-white dark:bg-cyan-500 dark:text-slate-950 flex items-center justify-center text-[10px] font-black">
                          {idx + 1}
                        </span>
                        {pt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Root Cause Cards */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-500" />
                  <span>Topic Root Cause Analysis</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(mentorData.rootCauseAnalysis || []).map((rc, idx) => (
                    <div
                      key={idx}
                      className={`p-4 sm:p-5 rounded-2xl border space-y-2 ${
                        isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/80 border-slate-200/90'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                          {rc.topic}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                          Weak Area
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{rc.issue}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EXAM STRATEGY TIPS */}
          {activeTab === 'strategy' && (
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span>Tactical CBT Test-Taking Tips ({mentorData.examType})</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(mentorData.examStrategyTips || []).map((tip, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border flex items-start gap-3 ${
                      isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/80 border-slate-200/90'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
