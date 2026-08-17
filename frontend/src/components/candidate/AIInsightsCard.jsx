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
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'detailed'

  const fetchAIPlan = async () => {
    setLoading(true);
    try {
      const params = testId ? { test_id: testId } : undefined;
      const res = await studentReportService.getAIPlan(params);
      if (res?.data || res?.plan || res?.ai_mentor_report || res?.analysis) {
        setAiPlan(res.data || res.plan || res.ai_mentor_report || res.analysis || res);
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

  const schema = useMemo(() => {
    const rawObj = testData?.analysis || testData?.ai_mentor_report?.analysis || testData?.ai_mentor_report || testData?.exam_mentor_strategy?.analysis || testData?.exam_mentor_strategy || testData?.data?.analysis || testData?.data || testData?.plan?.analysis || testData?.plan || aiPlan?.analysis || aiPlan || {};
    const dataObj = rawObj.analysis || rawObj;

    const overall = dataObj.overallAssessment || {};
    const summaryText = overall.summary || dataObj.performanceSummary || dataObj.performance_summary || 'Your accuracy is strong, but your attempt rate needs improvement.';
    const performanceLevel = overall.performanceLevel || dataObj.confidence_level || 'Needs Improvement';
    const keyObservation = overall.keyObservation || dataObj.key_observation || '';

    let strengths = dataObj.strengths;
    if (!Array.isArray(strengths) || strengths.length === 0) {
      const strongItems = dataObj.strong_topics || dataObj.strongTopics || dataObj.topic_diagnostics?.strong || [];
      strengths = strongItems.map(s => typeof s === 'string' ? s : `${s.topic || s.chapter_name || s.chapter} (${s.accuracy || s.accuracy_percent || 100}% accuracy)`);
    }
    strengths = (strengths || []).map(s => typeof s === 'string' ? s.replace(/\s*\(\d+%.*?\)/g, '').trim() : s);

    let weaknesses = dataObj.weaknesses;
    if (!Array.isArray(weaknesses) || weaknesses.length === 0) {
      const weakItems = dataObj.weak_topics || dataObj.weakTopics || dataObj.topic_diagnostics?.weak || dataObj.rootCauseAnalysis || [];
      weaknesses = weakItems.map(w => typeof w === 'string' ? (w.topic ? `${w.topic}: ${w.issue}` : w) : `${w.topic || w.chapter_name || w.chapter} (${w.accuracy || w.accuracy_percent || 0}% accuracy)`);
    }
    weaknesses = (weaknesses || []).map(w => typeof w === 'string' ? w.replace(/\s*\(\d+%.*?\)/g, '').trim() : w);

    let subjectAnalysis = dataObj.subjectAnalysis;
    if (!Array.isArray(subjectAnalysis)) subjectAnalysis = dataObj.subject_analysis || [];

    let topicAnalysis = dataObj.topicAnalysis;
    if (!Array.isArray(topicAnalysis)) topicAnalysis = dataObj.topic_diagnostics?.weak || [];

    let mistakeAnalysis = dataObj.mistakeAnalysis;
    if (!Array.isArray(mistakeAnalysis)) mistakeAnalysis = [];

    const timeMgmt = dataObj.timeManagement || {};
    const timeAssessment = timeMgmt.assessment || dataObj.time_pacing_advice?.overall_pacing_advice || '';
    const timeProblems = Array.isArray(timeMgmt.problems) ? timeMgmt.problems : [];
    const timeRecommendations = Array.isArray(timeMgmt.recommendations) ? timeMgmt.recommendations : [];

    let upcomingStrategy = dataObj.upcomingTestStrategy;
    if (!Array.isArray(upcomingStrategy) || upcomingStrategy.length === 0) {
      upcomingStrategy = (dataObj.examStrategyTips || dataObj.revision_strategy || []).map(s => typeof s === 'string' ? s : `${s.title ? s.title + ': ' : ''}${s.rule || ''}`);
    }

    let priorityTopics = dataObj.priorityTopics;
    if (!Array.isArray(priorityTopics) || priorityTopics.length === 0) {
      priorityTopics = dataObj.priority_topics || (dataObj.rootCauseAnalysis || []).map(r => r.topic);
    }

    let sevenDayPlan = dataObj.sevenDayPlan;
    if (!Array.isArray(sevenDayPlan) || sevenDayPlan.length === 0) {
      sevenDayPlan = (dataObj.dailyPlan || dataObj.seven_day_plan || []).map((item, idx) => ({
        day: item.day || idx + 1,
        focus: item.focus || item.focus_chapter || `Day ${idx + 1} Revision`,
        tasks: Array.isArray(item.tasks) ? item.tasks : (Array.isArray(item.activities) ? item.activities : [item.task || 'Revise core concepts']),
        activities: Array.isArray(item.activities) ? item.activities : (Array.isArray(item.tasks) ? item.tasks : [item.task || 'Revise core concepts']),
        recommendedMinutes: item.recommendedMinutes || (item.estimatedHours ? item.estimatedHours * 60 : 60),
        estimatedHours: item.estimatedHours || 4
      }));
    }

    const finalAdvice = dataObj.finalAdvice || dataObj.motivationalNote || 'Focus on your priority topics to boost your test score!';

    return {
      overallAssessment: {
        summary: summaryText,
        performanceLevel,
        keyObservation
      },
      strengths: Array.isArray(strengths) ? strengths : [],
      weaknesses: Array.isArray(weaknesses) ? weaknesses : [],
      subjectAnalysis: Array.isArray(subjectAnalysis) ? subjectAnalysis : [],
      topicAnalysis: Array.isArray(topicAnalysis) ? topicAnalysis : [],
      mistakeAnalysis: Array.isArray(mistakeAnalysis) ? mistakeAnalysis : [],
      timeManagement: {
        assessment: timeAssessment,
        problems: timeProblems,
        recommendations: timeRecommendations
      },
      upcomingTestStrategy: Array.isArray(upcomingStrategy) ? upcomingStrategy : [],
      priorityTopics: Array.isArray(priorityTopics) ? priorityTopics : [],
      sevenDayPlan: Array.isArray(sevenDayPlan) ? sevenDayPlan : [],
      finalAdvice
    };
  }, [testData, aiPlan]);

  const { overallAssessment, strengths, weaknesses, subjectAnalysis, topicAnalysis, mistakeAnalysis, timeManagement, upcomingTestStrategy, priorityTopics, sevenDayPlan, finalAdvice } = schema;

  return (
    <div className="space-y-6">
      {loading ? (
        <div className={`p-8 rounded-3xl border text-center space-y-3 ${isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
          <Loader2 className="h-8 w-8 text-indigo-600 dark:text-cyan-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            AI is analyzing your performance metrics...
          </p>
        </div>
      ) : (
        <div className="space-y-6">

          {/* 1. AI PERFORMANCE SUMMARY CARD */}
          <div className={`rounded-3xl border p-6 sm:p-7 space-y-4 shadow-sm relative overflow-hidden transition ${isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4 border-slate-100 dark:border-slate-800/80">
              <h2 className="text-base sm:text-lg font-black tracking-wide text-slate-900 dark:text-white flex items-center gap-2.5 uppercase">
                <Brain className="h-5 w-5 text-indigo-600 dark:text-cyan-400" />
                <span>AI Performance Summary</span>
              </h2>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800 dark:bg-cyan-500/20 dark:text-cyan-300 border border-indigo-200 dark:border-cyan-500/30">
                {overallAssessment.performanceLevel}
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                {overallAssessment.summary}
              </p>
              {overallAssessment.keyObservation && (
                <div className={`p-3.5 rounded-2xl border text-xs font-medium ${isDarkMode ? 'bg-indigo-950/40 border-indigo-800/50 text-indigo-200' : 'bg-indigo-50 border-indigo-200/80 text-indigo-900'}`}>
                  <span className="font-bold uppercase tracking-wider text-[10px] block text-indigo-600 dark:text-indigo-400 mb-1">Key Observation</span>
                  {overallAssessment.keyObservation}
                </div>
              )}
            </div>
          </div>

          {/* 2. STRENGTHS & WEAKNESSES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* STRENGTHS CARD */}
            <div className={`rounded-3xl border p-6 space-y-4 shadow-sm ${isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
              <h3 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2 border-b pb-3 border-slate-100 dark:border-slate-800/80">
                <CheckCircle2 className="h-4 w-4" /> STRENGTHS
              </h3>
              {strengths.length > 0 ? (
                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                  {strengths.map((str, idx) => {
                    let content = '';
                    if (typeof str === 'string') {
                      content = str;
                    } else if (str.area || str.reason) {
                      content = `${str.area ? str.area + ': ' : ''}${str.reason || ''}`;
                    } else {
                      content = `${str.topic || str.subject || 'Strength'}: ${str.observation || str.detail || ''}`;
                    }
                    return (
                      <li key={idx} className="flex items-start gap-2.5 font-medium">
                        <span className="text-emerald-500 font-bold text-sm leading-none">•</span>
                        <span>{content}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-xs text-slate-400">No major strengths recorded.</p>
              )}
            </div>

            {/* WEAKNESSES CARD */}
            <div className={`rounded-3xl border p-6 space-y-4 shadow-sm ${isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
              <h3 className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-2 border-b pb-3 border-slate-100 dark:border-slate-800/80">
                <AlertTriangle className="h-4 w-4" /> WEAKNESSES
              </h3>
              {weaknesses.length > 0 ? (
                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                  {weaknesses.map((wk, idx) => {
                    let content = '';
                    if (typeof wk === 'string') {
                      content = wk;
                    } else if (wk.area || wk.reason) {
                      content = `${wk.area ? wk.area + ': ' : ''}${wk.reason || ''}${wk.priority ? ` [${wk.priority.toUpperCase()} PRIORITY]` : ''}`;
                    } else {
                      content = `${wk.topic || wk.subject || 'Weakness'}: ${wk.observation || wk.detail || ''}`;
                    }
                    return (
                      <li key={idx} className="flex items-start gap-2.5 font-medium">
                        <span className="text-rose-500 font-bold text-sm leading-none">•</span>
                        <span>{content}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-xs text-slate-400">No severe weaknesses identified.</p>
              )}
            </div>
          </div>

          {/* 3. NEXT TEST STRATEGY CARD */}
          <div className={`rounded-3xl border p-6 sm:p-7 space-y-4 shadow-sm ${isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <h3 className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-2 border-b pb-3 border-slate-100 dark:border-slate-800/80">
              <Zap className="h-4 w-4" /> NEXT TEST STRATEGY
            </h3>
            {upcomingTestStrategy.length > 0 ? (
              <ol className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                {upcomingTestStrategy.map((strat, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed font-medium">
                      {typeof strat === 'string' ? strat : `${strat.title ? strat.title + ': ' : ''}${strat.rule || ''}`}
                    </span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-xs text-slate-400">No test strategy rules specified.</p>
            )}
          </div>

          {/* 4. YOUR 7-DAY PLAN CARD */}
          <div className={`rounded-3xl border p-6 sm:p-7 space-y-4 shadow-sm ${isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <h3 className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-cyan-400 flex items-center gap-2 border-b pb-3 border-slate-100 dark:border-slate-800/80">
              <Calendar className="h-4 w-4" /> YOUR 7-DAY PLAN
            </h3>
            {sevenDayPlan.length > 0 ? (
              <div className="space-y-3">
                {sevenDayPlan.map((item, idx) => {
                  const tasksList = item.tasks || item.activities || [item.task || 'Revise core concepts'];
                  const durationStr = item.recommendedMinutes ? `${item.recommendedMinutes}m` : (item.estimatedHours ? `${item.estimatedHours}h` : '60m');

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-start justify-between gap-3 transition ${
                        isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/80 border-slate-200/80'
                      }`}
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-100 text-indigo-800 border border-indigo-200 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20">
                            Day {item.day || idx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {item.focus}
                          </span>
                        </div>
                        <ul className="space-y-1 pl-1 text-xs text-slate-600 dark:text-slate-400">
                          {tasksList.map((task, aIdx) => (
                            <li key={aIdx} className="flex items-start gap-1.5">
                              <span className="text-indigo-500 dark:text-cyan-400 font-bold">•</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="shrink-0 text-[11px] text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {durationStr}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No 7-day study plan generated.</p>
            )}
          </div>

          {/* FINAL ADVICE BANNER */}
          {finalAdvice && (
            <div className={`p-4 rounded-2xl border text-center ${isDarkMode ? 'bg-[#0B1730] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}>
              <p className="text-xs font-bold">💡 {finalAdvice}</p>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
