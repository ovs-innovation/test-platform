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
  const [activeTab, setActiveTab] = useState('plan'); // 'plan' | 'strategy' | 'ebooks' | 'topics' | 'pacing'

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

  const planData = useMemo(() => {
    if (testData) {
      const planArray = (testData.seven_day_revision_plan?.length > 0
        ? testData.seven_day_revision_plan
        : testData.personalized_improvement_plan) || [];
      
      const mappedPlan = planArray.map((item, idx) => ({
        day: item.day ? (typeof item.day === 'number' ? `Day ${item.day}` : item.day) : `Day ${idx + 1}`,
        focus_area: item.focus_chapter || item.chapter ? `${item.chapter || item.focus_chapter}${item.subject ? ` (${item.subject})` : ''}` : (item.focus_area || `Day ${idx + 1} Revision`),
        recommended_action: item.task || item.suggestion || item.recommended_action || 'Review core chapter concepts and PYQs.',
        target_time_minutes: item.target_time_minutes || item.revision_duration_minutes || 60,
      }));

      const ebooks = (testData.recommended_ebooks || []).map(b => ({
        title: b.title || `Master Module: ${b.subject || 'Core Concepts'}`,
        chapter: b.chapter || b.description || 'NTA PYQs & Theory Notes',
        priority: b.priority || 'High Priority',
        reason: b.reason || 'Targeted practice module based on your test performance.',
      }));

      const rawWeak = testData.weak_topics || testData.strong_and_weak_topics?.weak || [];
      const weakTopicsMapped = rawWeak.map(t => ({
        topic: typeof t === 'string' ? t : (t.chapter_name || t.topic || 'Weak Topic'),
        status: 'Needs Focused Revision',
        concept_gap: typeof t === 'object' ? (t.reason || t.suggestion || `Accuracy gap identified in test attempt.`) : `Focus needed on this chapter.`,
        suggested_action: 'Practice 20 PYQs and review formula notes.',
      }));

      const rawStrong = testData.strong_topics || testData.strong_and_weak_topics?.strong || [];
      const strongTopicsMapped = rawStrong.map(t => ({
        topic: typeof t === 'string' ? t : (t.chapter_name || t.topic || 'Strong Topic'),
        status: 'Mastered',
        accuracy: typeof t === 'object' && t.accuracy_percent ? `${t.accuracy_percent}%` : '80%+',
        recommendation: 'Maintain accuracy with weekly timed practice.',
      }));

      let mappedStrategy = [];
      if (Array.isArray(testData.revision_strategy)) {
        mappedStrategy = testData.revision_strategy;
      } else if (testData.revision_strategy && typeof testData.revision_strategy === 'object') {
        mappedStrategy = [
          { title: 'Suggested Daily Allocation', rule: testData.revision_strategy.suggested_daily_plan || 'Spend 40% time on weak chapters, 30% on medium chapters, 30% on strong chapters for retention.' },
          { title: 'High Priority Chapters', rule: `Focus revision on: ${(testData.revision_strategy.priority_topics || []).join(', ') || 'Identified test weak chapters'}` }
        ];
      }

      return {
        summary_observation: `AI Performance Diagnostic for ${testData.test_info?.test_name || 'Exam Attempt'}: Scored ${testData.summary?.total_score || 0}/${testData.summary?.max_marks || 0} (${testData.summary?.overall_accuracy || 0}% accuracy) across ${testData.chapter_performance?.length || 0} evaluated chapters.`,
        improvement_plan: mappedPlan,
        revision_strategy: mappedStrategy.length > 0 ? mappedStrategy : [
          { title: 'Strict 2-Pass Question Selection', rule: 'First pass: Answer direct formula-based questions. Second pass: Attempt complex calculations.' },
          { title: 'Time Trap Control', rule: 'If a question takes >2.5 minutes without progress, mark for review and move forward.' },
        ],
        recommended_ebooks: ebooks,
        weak_topics: weakTopicsMapped,
        strong_topics: strongTopicsMapped,
        time_management_advice: {
          observation: `Total time spent: ${Math.round((testData.summary?.time_spent_seconds || 0) / 60)} minutes across ${testData.question_wise_analysis?.length || 0} questions.`,
          pacing_tip: testData.time_management_report?.pacing_advice || 'Focus on maintaining consistent speed and avoiding negative marks on doubtful questions.',
        }
      };
    }
    return aiPlan || {};
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
      <div className="border-b pb-5 border-slate-100 dark:border-slate-800/80">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>AI Diagnostic & Personalised Revision Hub</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          {planData.summary_observation ||
            'Real-time AI diagnostic analysis of your test attempts, generating personalized 7-day revision roadmaps and topic mastery guides.'}
        </p>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100 dark:border-slate-800/60">
        {[
          { id: 'plan', label: '7-Day Improvement Plan', icon: Calendar },
          { id: 'strategy', label: 'Revision Strategy', icon: Zap },
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
            AI is analyzing your performance metrics and crafting your custom roadmap...
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* TAB 1: 7-DAY IMPROVEMENT PLAN */}
          {activeTab === 'plan' && (
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Target className="h-4 w-4 text-indigo-600 dark:text-cyan-400" />
                <span>7-Day Personalised Action Roadmap</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(planData.improvement_plan || []).map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between transition hover:border-indigo-300 dark:hover:border-cyan-500/40 ${
                      isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/80 border-slate-200/90'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-100 text-indigo-800 border border-indigo-200 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20">
                          {item.day || `Day ${idx + 1}`}
                        </span>
                        {item.target_time_minutes && (
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-bold">
                            <Clock className="h-3 w-3" /> {item.target_time_minutes}m
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{item.focus_area}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.recommended_action}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800/60 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> High Priority
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: REVISION STRATEGY */}
          {activeTab === 'strategy' && (
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span>Custom CBT Test-Taking Rules & Revision Protocols</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(planData.revision_strategy || []).map((strat, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border space-y-2 ${
                      isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/80 border-slate-200/90'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-extrabold text-sm">
                      <Award className="h-4 w-4" />
                      <span>{strat.title}</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{strat.rule}</p>
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
