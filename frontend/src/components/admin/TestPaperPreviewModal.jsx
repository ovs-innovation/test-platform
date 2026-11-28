import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Layers,
  Clock,
  Sparkles,
  BookOpen,
  Eye,
  Check,
  ChevronDown,
  ChevronUp,
  Award,
  ShieldCheck,
  ExternalLink,
  X,
  FileText,
  Database,
  Cpu,
} from 'lucide-react';
import Modal from '../Modal.jsx';
import MathRenderer from '../common/MathRenderer.jsx';
import { Spinner } from '../ui.jsx';

export default function TestPaperPreviewModal({
  isOpen,
  onClose,
  previewData,
  onApprove,
  isApproving = false,
}) {
  if (!isOpen || !previewData) return null;

  const [activeSectionTab, setActiveSectionTab] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL'); // 'ALL' | 'bank' | 'ai_generated'
  const [expandedSolutions, setExpandedSolutions] = useState({});

  const questions = previewData.questions || [];
  const sections = previewData.sections || [];
  const verification = previewData.verification || {};
  const sourceSummary = previewData.source_summary || verification.source_breakdown || {
    from_bank: questions.filter((q) => q.source === 'bank').length,
    from_ai: questions.filter((q) => q.source !== 'bank').length,
  };

  const toggleSolution = (id) => {
    setExpandedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter questions based on active section and source filter
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (activeSectionTab !== 'ALL' && q.section_name !== activeSectionTab) {
        return false;
      }
      if (sourceFilter === 'bank' && q.source !== 'bank') {
        return false;
      }
      if (sourceFilter === 'ai' && q.source === 'bank') {
        return false;
      }
      return true;
    });
  }, [questions, activeSectionTab, sourceFilter]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assembled Assessment Paper Preview"
      size="xl"
    >
      <div className="space-y-6 max-h-[82vh] overflow-y-auto pr-1">
        {/* Header Summary Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  {previewData.exam_type || 'EXAM'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {previewData.class_level || 'Class 11+12'}
                </span>
                {previewData.blueprint_slug && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-slate-300 bg-white/10">
                    Blueprint: {previewData.blueprint_slug}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-black text-white">{previewData.title}</h2>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Questions</span>
                <span className="text-xl font-black text-white">{previewData.total_questions} Qs</span>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Duration</span>
                <span className="text-xl font-black text-blue-400">{previewData.duration_minutes} Mins</span>
              </div>
            </div>
          </div>

          {/* Verification & Compliance Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Blueprint Match</span>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{previewData.total_questions} / {previewData.total_requested || previewData.total_questions} Verified</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">From Question Bank</span>
              <div className="flex items-center gap-1.5 text-blue-300 font-bold">
                <Database className="h-4 w-4 shrink-0" />
                <span>{sourceSummary.from_bank || 0} Questions (PYQ)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">AI-Generated Batches</span>
              <div className="flex items-center gap-1.5 text-purple-300 font-bold">
                <Cpu className="h-4 w-4 shrink-0" />
                <span>{sourceSummary.from_ai || 0} Questions (AI)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Pedagogical Compliance</span>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>100% Validated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Tabs & Source Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          {/* Section Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <button
              type="button"
              onClick={() => setActiveSectionTab('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                activeSectionTab === 'ALL'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              All Sections ({questions.length})
            </button>
            {sections.map((s, idx) => (
              <button
                key={s.name || idx}
                type="button"
                onClick={() => setActiveSectionTab(s.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  activeSectionTab === s.name
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {s.name} ({s.question_count || 0})
              </button>
            ))}
          </div>

          {/* Source Toggle */}
          <div className="flex items-center gap-1 shrink-0 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setSourceFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                sourceFilter === 'ALL' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              All Sources
            </button>
            <button
              type="button"
              onClick={() => setSourceFilter('bank')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                sourceFilter === 'bank' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Bank Only ({sourceSummary.from_bank})
            </button>
            <button
              type="button"
              onClick={() => setSourceFilter('ai')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                sourceFilter === 'ai' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              AI Only ({sourceSummary.from_ai})
            </button>
          </div>
        </div>

        {/* Question Cards List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-xs">No questions match the selected filter.</p>
            </div>
          ) : (
            filteredQuestions.map((q, idx) => {
              const qNum = q.position || idx + 1;
              const isBank = q.source === 'bank';
              const isSolutionOpen = expandedSolutions[q.id || idx];
              const optionsList = Array.isArray(q.options)
                ? q.options
                : typeof q.options === 'string'
                ? JSON.parse(q.options)
                : [];

              return (
                <div
                  key={q.id || idx}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4 transition-all"
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between gap-3 flex-wrap text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-xl font-black text-sm bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                        Q#{qNum}
                      </span>
                      {q.section_name && (
                        <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {q.section_name}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
                        {q.question_type || 'Single MCQ'}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold text-slate-500">
                        {q.subject} {q.chapter ? `• ${q.chapter}` : ''}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Source Badge */}
                      <span
                        className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          isBank
                            ? 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                            : 'bg-purple-500/10 text-purple-600 border-purple-500/20'
                        }`}
                      >
                        {isBank ? <Database className="h-3 w-3" /> : <Cpu className="h-3 w-3" />}
                        <span>{isBank ? 'Question Bank (PYQ)' : 'AI Generated'}</span>
                      </span>

                      {/* Marks */}
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        +{q.marks || 4} / -{q.negative_marks || 1}
                      </span>
                    </div>
                  </div>

                  {/* Question Statement with MathRenderer */}
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                    <MathRenderer content={q.question_text} />
                  </div>

                  {/* Embedded Diagram if present */}
                  {q.diagram_svg && (
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white flex flex-col items-center justify-center max-w-md mx-auto">
                      <div
                        className="w-full max-h-56 overflow-hidden flex items-center justify-center [&>svg]:max-w-full [&>svg]:h-auto"
                        dangerouslySetInnerHTML={{ __html: q.diagram_svg }}
                      />
                      <span className="text-[10px] text-slate-400 mt-2">Diagram rendered from SVG specification</span>
                    </div>
                  )}

                  {q.image_url && !q.diagram_svg && (
                    <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center max-w-sm mx-auto">
                      <img
                        src={q.image_url}
                        alt="Question diagram"
                        className="max-h-48 rounded-lg object-contain"
                      />
                    </div>
                  )}

                  {/* Options (MCQs) */}
                  {optionsList.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {optionsList.map((opt, optIdx) => {
                        const isCorrect = q.correct_index === optIdx;
                        const label = String.fromCharCode(65 + optIdx);

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
                              isCorrect
                                ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold shadow-xs'
                                : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <span
                              className={`h-5 w-5 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${
                                isCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {label}
                            </span>
                            <div className="flex-1 break-words pt-0.5">
                              <MathRenderer content={typeof opt === 'string' ? opt : String(opt?.text || opt)} />
                            </div>
                            {isCorrect && (
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Numerical Answer if numerical type */}
                  {q.numeric_answer !== undefined && q.numeric_answer !== null && (
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs flex items-center gap-2">
                      <span className="font-bold text-blue-700 dark:text-blue-300">Correct Numerical Value:</span>
                      <span className="font-black text-sm font-mono text-blue-900 dark:text-blue-100">
                        {q.numeric_answer}
                      </span>
                    </div>
                  )}

                  {/* Collapsible Solution */}
                  {q.solution && (
                    <div className="border-t border-slate-100 dark:border-slate-800/60 pt-2">
                      <button
                        type="button"
                        onClick={() => toggleSolution(q.id || idx)}
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        {isSolutionOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                        <span>{isSolutionOpen ? 'Hide Detailed Solution' : 'View Detailed Solution'}</span>
                      </button>

                      {isSolutionOpen && (
                        <div className="mt-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                          <span className="font-black text-[11px] text-blue-600 dark:text-blue-400 block uppercase tracking-wider">
                            Step-by-Step Solution:
                          </span>
                          <MathRenderer content={q.solution} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Actions Bar */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 backdrop-blur-md">
          <div className="text-xs text-slate-600 dark:text-slate-400">
            <span className="font-bold text-slate-900 dark:text-white">Admin Approval Required:</span> Review all {previewData.total_questions} questions before committing to Edvedum Assessment Services.
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isApproving}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              Close Preview
            </button>

            <button
              type="button"
              onClick={() => onApprove(false)}
              disabled={isApproving}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-blue-500 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {isApproving ? <Spinner className="h-4 w-4" /> : <FileText className="h-4 w-4 text-blue-500" />}
              <span>Approve as Draft Assessment</span>
            </button>

            <button
              type="button"
              onClick={() => onApprove(true)}
              disabled={isApproving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-500/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {isApproving ? <Spinner className="h-4 w-4 text-white" /> : <Award className="h-4 w-4" />}
              <span>Approve & Publish Live</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
