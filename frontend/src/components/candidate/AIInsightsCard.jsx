import { useState, useEffect } from 'react';
import {
  Sparkles,
  Target,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  Brain,
  Zap,
  ChevronRight,
  Loader2,
  Calendar,
  Award,
} from 'lucide-react';
import { studentReportService } from '../../lib/services.js';

export default function AIInsightsCard({ isDarkMode = true }) {
  const [aiPlan, setAiPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('plan'); // 'plan' | 'strategy' | 'ebooks' | 'topics' | 'pacing'

  const fetchAIPlan = async () => {
    setLoading(true);
    try {
      const res = await studentReportService.getAIPlan();
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
    fetchAIPlan();
  }, []);

  const planData = aiPlan || {};

  return (
    <div
      className={`rounded-3xl border p-6 space-y-6 shadow-sm relative overflow-hidden backdrop-blur-xl transition ${
        isDarkMode
          ? 'bg-[#0B1730] border-slate-800 text-white'
          : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      {/* Background Accent Mesh */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden="true"
      />

      {/* HEADER WITH GEMINI AI BADGE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 border-slate-200 dark:border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>Powered by Gemini 2.5 AI Engine</span>
          </div>
          <h2 className="text-xl font-black flex items-center gap-2">
            <span>AI Diagnostic & Personalised Revision Hub</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {planData.summary_observation ||
              'Real-time AI diagnostic analysis of your test attempts, generating personalized 7-day revision roadmaps and topic mastery guides.'}
          </p>
        </div>

        <button
          onClick={fetchAIPlan}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition cursor-pointer self-start sm:self-center"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Analyzing...' : 'Refresh AI Analysis'}</span>
        </button>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800/60">
        {[
          { id: 'plan', label: '7-Day Improvement Plan', icon: Calendar },
          { id: 'strategy', label: 'Revision Strategy', icon: Zap },
          { id: 'ebooks', label: 'Recommended eBooks', icon: BookOpen },
          { id: 'topics', label: 'Strong vs Weak Topics', icon: Brain },
          { id: 'pacing', label: 'Time & Pacing Advice', icon: Clock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
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
          <Loader2 className="h-8 w-8 text-cyan-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-medium">
            Gemini AI is analyzing your performance metrics and crafting your custom roadmap...
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* TAB 1: 7-DAY IMPROVEMENT PLAN */}
          {activeTab === 'plan' && (
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Target className="h-4 w-4 text-cyan-400" />
                <span>7-Day Personalised Action Roadmap</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(planData.improvement_plan || []).map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border flex flex-col justify-between transition hover:border-cyan-500/40 ${
                      isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {item.day || `Day ${idx + 1}`}
                        </span>
                        {item.target_time_minutes && (
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-bold">
                            <Clock className="h-3 w-3" /> {item.target_time_minutes}m
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1.5">{item.focus_area}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.recommended_action}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
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
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-400" />
                <span>Custom CBT Test-Taking Rules & Revision Protocols</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(planData.revision_strategy || []).map((strat, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border space-y-2 ${
                      isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-purple-400 font-extrabold text-sm">
                      <Award className="h-4 w-4" />
                      <span>{strat.title}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{strat.rule}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: RECOMMENDED EBOOKS */}
          {activeTab === 'ebooks' && (
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-emerald-400" />
                <span>AI-Recommended eBooks & Study Material</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(planData.recommended_ebooks || []).map((book, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border flex flex-col justify-between ${
                      isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2 inline-block">
                        {book.priority || 'Recommended'}
                      </span>
                      <h4 className="text-sm font-bold text-white mb-1">{book.title}</h4>
                      <p className="text-xs font-mono text-cyan-400 mb-2">{book.chapter}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{book.reason}</p>
                    </div>

                    <button className="mt-4 w-full py-2 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition flex items-center justify-center gap-1 cursor-pointer">
                      <span>Open eBook Module</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: STRONG VS WEAK TOPICS */}
          {activeTab === 'topics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weak Topics */}
              <div
                className={`p-5 rounded-2xl border space-y-3 ${
                  isDarkMode ? 'bg-rose-950/20 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                }`}
              >
                <h4 className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Weak Topics Requiring Attention</span>
                </h4>
                <div className="space-y-3">
                  {(planData.weak_topics || []).map((wt, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-rose-950/40 border border-rose-900/50 space-y-1">
                      <span className="text-xs font-bold text-white block">{wt.topic}</span>
                      <p className="text-[11px] text-rose-300">{wt.concept_gap}</p>
                      <p className="text-[11px] font-semibold text-slate-400">{wt.suggested_action}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strong Topics */}
              <div
                className={`p-5 rounded-2xl border space-y-3 ${
                  isDarkMode ? 'bg-emerald-950/20 border-emerald-900/40' : 'bg-emerald-50 border-emerald-200'
                }`}
              >
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Mastered Strong Topics</span>
                </h4>
                <div className="space-y-3">
                  {(planData.strong_topics || []).map((st, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/50 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-white">{st.topic}</span>
                        <span className="text-[10px] font-mono text-emerald-400">{st.accuracy}</span>
                      </div>
                      <p className="text-[11px] text-emerald-300">{st.recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: TIME & PACING ADVICE */}
          {activeTab === 'pacing' && (
            <div
              className={`p-6 rounded-2xl border space-y-4 ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-sm">
                <Clock className="h-5 w-5" />
                <span>AI Time Management & Pacing Diagnostic</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {planData.time_management_advice?.observation ||
                  'Your current solving speed shows consistent pacing, but numerical sections require strategic skipping of 3-minute time traps.'}
              </p>

              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-cyan-400 block">
                  Recommended Time Allocation Tip
                </span>
                <p className="text-xs text-slate-200 font-medium">
                  {planData.time_management_advice?.pacing_tip ||
                    'Allocate 45 minutes for Physics, 40 minutes for Chemistry, and 80 minutes for Math/Biology in full NTA CBT papers.'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
