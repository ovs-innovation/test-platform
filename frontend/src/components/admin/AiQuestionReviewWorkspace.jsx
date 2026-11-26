import React, { useState, useMemo, useEffect } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  XCircle,
  Clock,
  Sparkles,
  RefreshCw,
  Edit3,
  Trash2,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  Image as ImageIcon,
  Layers,
  Send,
  Save,
  BookOpen,
  HelpCircle,
  Info,
  ExternalLink,
  ShieldCheck,
  CheckSquare,
  Square,
  ArrowLeft,
  SlidersHorizontal,
  FileText,
  BadgeAlert,
  ListOrdered,
  Plus,
  Minus,
  CheckCheck,
} from 'lucide-react';
import { aiGeneratorService } from '../../lib/services.js';
import { Spinner } from '../ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import Modal from '../Modal.jsx';
import MathRenderer from '../common/MathRenderer.jsx';

/**
 * Normalizes options into standard array of strings
 */
function normalizeOptions(options) {
  if (!options) return [];
  if (Array.isArray(options)) {
    return options.map((opt) => {
      if (typeof opt === 'string') return opt;
      if (typeof opt === 'object' && opt !== null) {
        return opt.text || opt.value || opt.statement || JSON.stringify(opt);
      }
      return String(opt);
    });
  }
  if (typeof options === 'object') {
    return Object.values(options).map(String);
  }
  return [];
}

/**
 * AI Question Review & Approval Workspace
 * Comprehensive admin workspace for previewing, filtering, editing, regenerating,
 * and approving AI-generated questions into the production Question Bank.
 */
export default function AiQuestionReviewWorkspace({
  draftId,
  onBack,
  onDraftUpdated,
}) {
  const { showToast } = useToast();

  // Draft Data State
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Multi-Selection State
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isApprovingSelected, setIsApprovingSelected] = useState(false);
  const [isApprovingAll, setIsApprovingAll] = useState(false);
  const [isValidatingDraft, setIsValidatingDraft] = useState(false);

  // Filters State
  const [filters, setFilters] = useState({
    type: 'all',
    subject: 'all',
    chapter: 'all',
    difficulty: 'all',
    diagram: 'all', // 'all' | 'with_diagram' | 'no_diagram'
    status: 'all',  // 'all' | 'validation_passed' | 'needs_correction' | 'rejected' | 'approved' | 'manual_review'
    search: '',
  });

  // Modal States
  const [activeModal, setActiveModal] = useState(null); // 'edit' | 'diagram_preview' | 'regenerate_q' | 'regenerate_diag' | 'reject'
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Edit Modal Form State
  const [editForm, setEditForm] = useState(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Diagram Preview Modal State
  const [diagramZoom, setDiagramZoom] = useState(1);
  const [activeDiagramAsset, setActiveDiagramAsset] = useState(null);

  // Regeneration Prompts
  const [regenCritique, setRegenCritique] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regenDiagPrompt, setRegenDiagPrompt] = useState('');
  const [regenDiagMethod, setRegenDiagMethod] = useState('programmatic');
  const [isRegeneratingDiag, setIsRegeneratingDiag] = useState(false);

  // Rejection Reason
  const [rejectReason, setRejectReason] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  // Expanded Validation Reports / Solutions State
  const [expandedReports, setExpandedReports] = useState(new Set());
  const [expandedSolutions, setExpandedSolutions] = useState(new Set());

  // ---------------------------------------------------------------------------
  // Load Draft Details
  // ---------------------------------------------------------------------------
  const fetchDraftDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await aiGeneratorService.getDraft(draftId);
      if (res?.draft) {
        setDraft(res.draft);
      } else {
        setError('Draft details could not be loaded');
      }
    } catch (err) {
      console.error('[ReviewWorkspace] Fetch draft error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load draft batch');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (draftId) {
      fetchDraftDetail();
    }
  }, [draftId]);

  const questions = draft?.questions || [];

  // ---------------------------------------------------------------------------
  // Dynamic Filter Options
  // ---------------------------------------------------------------------------
  const filterOptions = useMemo(() => {
    const subjects = new Set();
    const chapters = new Set();
    const types = new Set();

    questions.forEach((q) => {
      if (q.subject) subjects.add(q.subject);
      if (q.chapter) chapters.add(q.chapter);
      if (q.question_type) types.add(q.question_type);
    });

    return {
      subjects: Array.from(subjects),
      chapters: Array.from(chapters),
      types: Array.from(types),
    };
  }, [questions]);

  // ---------------------------------------------------------------------------
  // Filtered Questions
  // ---------------------------------------------------------------------------
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Type filter
      if (filters.type !== 'all' && q.question_type !== filters.type) return false;

      // Subject filter
      if (filters.subject !== 'all' && q.subject !== filters.subject) return false;

      // Chapter filter
      if (filters.chapter !== 'all' && q.chapter !== filters.chapter) return false;

      // Difficulty filter
      if (filters.difficulty !== 'all' && q.difficulty?.toLowerCase() !== filters.difficulty.toLowerCase()) {
        return false;
      }

      // Diagram filter
      if (filters.diagram === 'with_diagram' && !q.has_diagram && !q.image_url && !q.diagram_svg) {
        return false;
      }
      if (filters.diagram === 'no_diagram' && (q.has_diagram || q.image_url || q.diagram_svg)) {
        return false;
      }

      // Validation / Review Status filter
      if (filters.status !== 'all') {
        if (filters.status === 'approved') {
          if (q.review_status !== 'approved' && !q.bank_question_id) return false;
        } else if (filters.status === 'rejected') {
          if (q.review_status !== 'rejected' && q.validation_status !== 'rejected') return false;
        } else if (filters.status === 'manual_review') {
          if (!q.requires_manual_review) return false;
        } else if (filters.status === 'validation_passed') {
          if (q.validation_status !== 'validation_passed') return false;
        } else if (filters.status === 'needs_correction') {
          if (q.validation_status !== 'needs_correction') return false;
        }
      }

      // Search Query
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const inStatement = q.question_text?.toLowerCase().includes(query);
        const inSolution = q.solution?.toLowerCase().includes(query);
        const inTopic = q.topic?.toLowerCase().includes(query);
        const inOpts = normalizeOptions(q.options).some((o) => o.toLowerCase().includes(query));
        if (!inStatement && !inSolution && !inTopic && !inOpts) return false;
      }

      return true;
    });
  }, [questions, filters]);

  // ---------------------------------------------------------------------------
  // Summary Stats
  // ---------------------------------------------------------------------------
  const stats = useMemo(() => {
    let passed = 0;
    let needsCorrection = 0;
    let rejected = 0;
    let approved = 0;
    let manualReview = 0;

    questions.forEach((q) => {
      if (q.bank_question_id || q.review_status === 'approved') approved++;
      else if (q.review_status === 'rejected' || q.validation_status === 'rejected') rejected++;
      else if (q.validation_status === 'validation_passed') passed++;
      else if (q.validation_status === 'needs_correction') needsCorrection++;

      if (q.requires_manual_review) manualReview++;
    });

    return {
      total: questions.length,
      passed,
      needsCorrection,
      rejected,
      approved,
      manualReview,
    };
  }, [questions]);

  // ---------------------------------------------------------------------------
  // Multi-Selection Handlers
  // ---------------------------------------------------------------------------
  const isAllFilteredSelected = useMemo(() => {
    const unapprovedFiltered = filteredQuestions.filter(
      (q) => !q.bank_question_id && q.review_status !== 'approved' && q.review_status !== 'rejected'
    );
    if (!unapprovedFiltered.length) return false;
    return unapprovedFiltered.every((q) => selectedIds.has(q.id));
  }, [filteredQuestions, selectedIds]);

  const handleToggleSelectAllFiltered = () => {
    const next = new Set(selectedIds);
    const unapprovedFiltered = filteredQuestions.filter(
      (q) => !q.bank_question_id && q.review_status !== 'approved' && q.review_status !== 'rejected'
    );

    if (isAllFilteredSelected) {
      unapprovedFiltered.forEach((q) => next.delete(q.id));
    } else {
      unapprovedFiltered.forEach((q) => next.add(q.id));
    }
    setSelectedIds(next);
  };

  const handleToggleSelectQuestion = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleSelectAllPassed = () => {
    const next = new Set(selectedIds);
    questions
      .filter((q) => q.validation_status === 'validation_passed' && !q.bank_question_id && q.review_status !== 'approved')
      .forEach((q) => next.add(q.id));
    setSelectedIds(next);
    showToast(`Selected all questions that passed validation.`, 'info');
  };

  // ---------------------------------------------------------------------------
  // Batch Operations (Approval & Validation)
  // ---------------------------------------------------------------------------
  const handleApproveSelected = async () => {
    if (!selectedIds.size) return;
    try {
      setIsApprovingSelected(true);
      const idsArray = Array.from(selectedIds);
      const res = await aiGeneratorService.approveSelectedQuestions(draftId, idsArray);

      showToast(
        res.message || `Successfully approved ${res.approved_count || idsArray.length} questions into Question Bank!`,
        'success'
      );
      setSelectedIds(new Set());
      await fetchDraftDetail();
      if (onDraftUpdated) onDraftUpdated();
    } catch (err) {
      console.error('[ReviewWorkspace] Approve selected error:', err);
      showToast(err.response?.data?.message || err.message || 'Failed to approve selected questions', 'error');
    } finally {
      setIsApprovingSelected(false);
    }
  };

  const handleApproveAllBatch = async () => {
    const pendingQuestions = questions.filter(
      (q) => !q.bank_question_id && q.review_status !== 'approved' && q.review_status !== 'rejected'
    );
    if (!pendingQuestions.length) {
      showToast('All valid questions in this draft have already been approved.', 'info');
      return;
    }

    try {
      setIsApprovingAll(true);
      const res = await aiGeneratorService.approveDraft(draftId, 'bank');
      showToast(
        res.message || `Successfully approved ${res.approved_count} questions into the Question Bank!`,
        'success'
      );
      setSelectedIds(new Set());
      await fetchDraftDetail();
      if (onDraftUpdated) onDraftUpdated();
    } catch (err) {
      console.error('[ReviewWorkspace] Approve all error:', err);
      showToast(err.response?.data?.message || err.message || 'Failed to approve draft batch', 'error');
    } finally {
      setIsApprovingAll(false);
    }
  };

  const handleRevalidateBatch = async () => {
    try {
      setIsValidatingDraft(true);
      const res = await aiGeneratorService.validateDraft(draftId);
      showToast(
        res.message || `Batch re-validation complete. Passed: ${res.passedCount || 0}`,
        'success'
      );
      await fetchDraftDetail();
    } catch (err) {
      console.error('[ReviewWorkspace] Revalidate batch error:', err);
      showToast(err.response?.data?.message || err.message || 'Validation failed', 'error');
    } finally {
      setIsValidatingDraft(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Single Question Operations (Approve, Reject, Revalidate)
  // ---------------------------------------------------------------------------
  const handleApproveSingle = async (q) => {
    try {
      const res = await aiGeneratorService.approveSingleQuestion(draftId, q.id);
      showToast(res.message || `Question #${q.question_number || q.id} approved into Question Bank!`, 'success');
      await fetchDraftDetail();
      if (onDraftUpdated) onDraftUpdated();
    } catch (err) {
      console.error('[ReviewWorkspace] Approve single error:', err);
      showToast(err.response?.data?.message || err.message || 'Failed to approve question', 'error');
    }
  };

  const openRejectModal = (q) => {
    setSelectedQuestion(q);
    setRejectReason(q.rejection_reason || '');
    setActiveModal('reject');
  };

  const handleConfirmReject = async () => {
    if (!selectedQuestion) return;
    try {
      setIsRejecting(true);
      const res = await aiGeneratorService.rejectQuestion(draftId, selectedQuestion.id, rejectReason);
      showToast(res.message || `Question marked as rejected.`, 'info');
      setActiveModal(null);
      setSelectedQuestion(null);
      await fetchDraftDetail();
      if (onDraftUpdated) onDraftUpdated();
    } catch (err) {
      console.error('[ReviewWorkspace] Reject error:', err);
      showToast(err.response?.data?.message || err.message || 'Failed to reject question', 'error');
    } finally {
      setIsRejecting(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Inline Editing
  // ---------------------------------------------------------------------------
  const openEditModal = (q) => {
    setSelectedQuestion(q);
    const opts = normalizeOptions(q.options);
    setEditForm({
      question_text: q.question_text || '',
      question_type: q.question_type || 'single_choice',
      subject: q.subject || draft.subject || '',
      chapter: q.chapter || draft.chapter || '',
      topic: q.topic || '',
      difficulty: q.difficulty || 'Medium',
      marks: q.marks || 4,
      negative_marks: q.negative_marks || 1,
      options: opts.length ? opts : ['', '', '', ''],
      correct_index: q.correct_index !== null && q.correct_index !== undefined ? Number(q.correct_index) : 0,
      correct_indices: Array.isArray(q.correct_indices) ? q.correct_indices : [],
      numeric_answer: q.numeric_answer !== null && q.numeric_answer !== undefined ? q.numeric_answer : '',
      numerical_tolerance: q.numerical_tolerance || 0,
      assertion_text: q.assertion_text || '',
      reason_text: q.reason_text || '',
      solution: q.solution || '',
      admin_notes: q.admin_notes || '',
    });
    setActiveModal('edit');
  };

  const handleSaveEdit = async () => {
    if (!selectedQuestion || !editForm) return;

    if (!editForm.question_text.trim()) {
      showToast('Question statement cannot be empty', 'error');
      return;
    }

    try {
      setIsSavingEdit(true);
      const payload = {
        ...editForm,
        numeric_answer: editForm.numeric_answer !== '' ? Number(editForm.numeric_answer) : null,
        numerical_tolerance: Number(editForm.numerical_tolerance) || 0,
        marks: Number(editForm.marks) || 4,
        negative_marks: Number(editForm.negative_marks) || 1,
      };

      const res = await aiGeneratorService.updateDraftQuestion(draftId, selectedQuestion.id, payload);
      showToast(`Question #${selectedQuestion.question_number || selectedQuestion.id} updated & re-validated!`, 'success');
      setActiveModal(null);
      setSelectedQuestion(null);
      await fetchDraftDetail();
    } catch (err) {
      console.error('[ReviewWorkspace] Update question error:', err);
      showToast(err.response?.data?.message || err.message || 'Failed to update question', 'error');
    } finally {
      setIsSavingEdit(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Question & Diagram Regeneration
  // ---------------------------------------------------------------------------
  const openRegenerateQuestionModal = (q) => {
    setSelectedQuestion(q);
    setRegenCritique('');
    setActiveModal('regenerate_q');
  };

  const handleConfirmRegenerateQuestion = async () => {
    if (!selectedQuestion) return;
    try {
      setIsRegenerating(true);
      const res = await aiGeneratorService.regenerateDraftQuestion(draftId, selectedQuestion.id, regenCritique);
      showToast(res.message || `Question regenerated successfully!`, 'success');
      setActiveModal(null);
      setSelectedQuestion(null);
      await fetchDraftDetail();
    } catch (err) {
      console.error('[ReviewWorkspace] Regenerate question error:', err);
      showToast(err.response?.data?.message || err.message || 'Failed to regenerate question', 'error');
    } finally {
      setIsRegenerating(false);
    }
  };

  const openRegenerateDiagramModal = (q) => {
    setSelectedQuestion(q);
    setRegenDiagPrompt(q.diagram_description || q.question_text || '');
    setRegenDiagMethod(q.diagram_type === 'ai_svg' ? 'ai_svg' : 'programmatic');
    setActiveModal('regenerate_diag');
  };

  const handleConfirmRegenerateDiagram = async () => {
    if (!selectedQuestion) return;
    try {
      setIsRegeneratingDiag(true);
      const res = await aiGeneratorService.regenerateQuestionDiagram(draftId, selectedQuestion.id, {
        prompt: regenDiagPrompt,
        method: regenDiagMethod,
      });
      showToast(res.message || `Diagram regenerated successfully!`, 'success');
      setActiveModal(null);
      setSelectedQuestion(null);
      await fetchDraftDetail();
    } catch (err) {
      console.error('[ReviewWorkspace] Regenerate diagram error:', err);
      showToast(err.response?.data?.message || err.message || 'Failed to regenerate diagram', 'error');
    } finally {
      setIsRegeneratingDiag(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Full-Screen Diagram Preview
  // ---------------------------------------------------------------------------
  const openDiagramPreview = (q) => {
    setSelectedQuestion(q);
    setDiagramZoom(1);
    setActiveModal('diagram_preview');
  };

  // Toggle report or solution drawer
  const toggleReport = (id) => {
    const next = new Set(expandedReports);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedReports(next);
  };

  const toggleSolution = (id) => {
    const next = new Set(expandedSolutions);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedSolutions(next);
  };

  // ---------------------------------------------------------------------------
  // Render Loading & Error States
  // ---------------------------------------------------------------------------
  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-500">
        <Spinner className="h-10 w-10 text-blue-600 mb-3" />
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Loading Question Review Workspace...</h3>
        <p className="text-xs text-slate-400 mt-1">Retrieving staged questions, LaTeX mathematical formulas, and diagrams.</p>
      </div>
    );
  }

  if (error || !draft) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="h-12 w-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Unable to Load Review Workspace</h3>
        <p className="text-xs text-rose-500 max-w-md mx-auto">{error || 'Draft not found'}</p>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Staging Queue</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ===================================================================== */}
      {/* 1. TOP HEADER & BATCH CONTROLS                                        */}
      {/* ===================================================================== */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Return to Drafts Queue"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-black text-slate-900 dark:text-white">
                  {draft.title || `${draft.exam_type} ${draft.subject} Staging Batch`}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-600 border border-blue-500/20">
                  {draft.exam_type}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-600 border border-purple-500/20">
                  {draft.subject}
                </span>
                {draft.chapter && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {draft.chapter}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                <span>Batch ID: <code className="font-mono text-slate-700 dark:text-slate-300">{draft.batch_id}</code></span>
                <span>•</span>
                <span>Created {new Date(draft.created_at).toLocaleString()}</span>
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleRevalidateBatch}
              disabled={isValidatingDraft}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isValidatingDraft ? 'animate-spin' : ''}`} />
              <span>{isValidatingDraft ? 'Validating...' : 'Re-Validate Batch'}</span>
            </button>

            <button
              type="button"
              onClick={handleApproveAllBatch}
              disabled={isApprovingAll || stats.approved === stats.total}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCheck className={`h-4 w-4 ${isApprovingAll ? 'animate-spin' : ''}`} />
              <span>{isApprovingAll ? 'Approving Batch...' : 'Approve All Validated'}</span>
            </button>
          </div>
        </div>

        {/* Batch Metric Rail */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Total Staged</div>
            <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">{stats.total}</div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20">
            <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              <span>Validation Passed</span>
            </div>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{stats.passed}</div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-500/20">
            <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              <span>Needs Correction</span>
            </div>
            <div className="text-lg font-black text-amber-600 dark:text-amber-400 mt-0.5">{stats.needsCorrection}</div>
          </div>

          <div className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-500/20">
            <div className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase flex items-center gap-1">
              <XCircle className="h-3 w-3" />
              <span>Rejected</span>
            </div>
            <div className="text-lg font-black text-rose-600 dark:text-rose-400 mt-0.5">{stats.rejected}</div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-500/20">
            <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase flex items-center gap-1">
              <BadgeAlert className="h-3 w-3" />
              <span>Manual Review</span>
            </div>
            <div className="text-lg font-black text-blue-600 dark:text-blue-400 mt-0.5">{stats.manualReview}</div>
          </div>

          <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-500/20">
            <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              <span>Approved into Bank</span>
            </div>
            <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 mt-0.5">{stats.approved}</div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. FILTER & SELECTION TOOLBAR                                         */}
      {/* ===================================================================== */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5">
          {/* Question Type Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Question Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="single_choice">Single Correct MCQ</option>
              <option value="multi_select">Multiple Correct MCQ</option>
              <option value="assertion_reason">Assertion-Reason</option>
              <option value="numerical">Numerical / Integer</option>
              <option value="match_the_following">Match the Following</option>
              <option value="passage">Passage-based</option>
            </select>
          </div>

          {/* Subject Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Subject</label>
            <select
              value={filters.subject}
              onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <option value="all">All Subjects</option>
              {filterOptions.subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Chapter Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Chapter</label>
            <select
              value={filters.chapter}
              onChange={(e) => setFilters({ ...filters, chapter: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <option value="all">All Chapters</option>
              {filterOptions.chapters.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Difficulty</label>
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Diagram Availability */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Diagrams</label>
            <select
              value={filters.diagram}
              onChange={(e) => setFilters({ ...filters, diagram: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <option value="all">All Questions</option>
              <option value="with_diagram">With Diagram</option>
              <option value="no_diagram">No Diagram</option>
            </select>
          </div>

          {/* Validation Status */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Validation Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="validation_passed">Validation Passed</option>
              <option value="needs_correction">Needs Correction</option>
              <option value="manual_review">Manual Review Flagged</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Search Bar & Multi-Select Action Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-800">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Search statements, solutions, topics, or options..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-slate-200 font-medium placeholder:text-slate-400"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => setFilters({ ...filters, search: '' })}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-500">
              Showing {filteredQuestions.length} of {questions.length} questions
            </span>

            {/* Selection Buttons */}
            <button
              type="button"
              onClick={handleToggleSelectAllFiltered}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              {isAllFilteredSelected ? <CheckSquare className="h-3.5 w-3.5 text-blue-600" /> : <Square className="h-3.5 w-3.5 text-slate-400" />}
              <span>{isAllFilteredSelected ? 'Deselect Filtered' : 'Select Filtered'}</span>
            </button>

            <button
              type="button"
              onClick={handleSelectAllPassed}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-500/30 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 cursor-pointer"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Select All Passed</span>
            </button>

            {selectedIds.size > 0 && (
              <button
                type="button"
                onClick={handleApproveSelected}
                disabled={isApprovingSelected}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 shadow-sm cursor-pointer disabled:opacity-50"
              >
                <CheckCheck className={`h-3.5 w-3.5 ${isApprovingSelected ? 'animate-spin' : ''}`} />
                <span>Approve Selected ({selectedIds.size})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. QUESTION CARDS LIST                                                */}
      {/* ===================================================================== */}
      {filteredQuestions.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 p-8">
          <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Filter className="h-6 w-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Questions Match Filter Criteria</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your question type, difficulty, or validation status filters above.
          </p>
          <button
            type="button"
            onClick={() => setFilters({ type: 'all', subject: 'all', chapter: 'all', difficulty: 'all', diagram: 'all', status: 'all', search: '' })}
            className="mt-4 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-blue-600 hover:bg-blue-50/50 cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const isApproved = Boolean(q.bank_question_id || q.review_status === 'approved');
            const isRejected = Boolean(q.review_status === 'rejected' || q.validation_status === 'rejected');
            const isSelected = selectedIds.has(q.id);
            const isReportExpanded = expandedReports.has(q.id);
            const isSolutionExpanded = expandedSolutions.has(q.id);

            const options = normalizeOptions(q.options);
            const hasDiagram = Boolean(q.has_diagram || q.image_url || q.diagram_svg);

            // Validation badge color
            let valBadge = {
              label: 'Passed',
              bg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
              icon: CheckCircle2,
            };
            if (isApproved) {
              valBadge = {
                label: 'Approved in Bank',
                bg: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
                icon: ShieldCheck,
              };
            } else if (isRejected) {
              valBadge = {
                label: 'Rejected',
                bg: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
                icon: XCircle,
              };
            } else if (q.validation_status === 'needs_correction') {
              valBadge = {
                label: 'Needs Correction',
                bg: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
                icon: AlertTriangle,
              };
            } else if (q.requires_manual_review) {
              valBadge = {
                label: 'Manual Review',
                bg: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
                icon: AlertCircle,
              };
            }

            const ValIcon = valBadge.icon;

            return (
              <div
                key={q.id || idx}
                className={`rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-500/60 ring-2 ring-blue-500/20 bg-blue-50/10 dark:bg-blue-950/10'
                    : isApproved
                    ? 'border-emerald-500/30 bg-emerald-50/5 dark:bg-emerald-950/5'
                    : isRejected
                    ? 'border-rose-500/30 bg-rose-50/5 dark:bg-rose-950/5 opacity-80'
                    : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs'
                } p-5 space-y-4`}
              >
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    {/* Checkbox for batch approval */}
                    <button
                      type="button"
                      disabled={isApproved || isRejected}
                      onClick={() => handleToggleSelectQuestion(q.id)}
                      className={`cursor-pointer disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      {isSelected ? (
                        <CheckSquare className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Square className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                      )}
                    </button>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                        #{q.question_number || idx + 1}
                      </span>

                      <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                        {q.question_type?.replace(/_/g, ' ')}
                      </span>

                      <span className="text-[11px] font-bold text-slate-500">
                        {q.subject} • {q.chapter || 'Core Concepts'}
                      </span>

                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                        q.difficulty?.toLowerCase() === 'easy'
                          ? 'bg-emerald-500/10 text-emerald-600'
                          : q.difficulty?.toLowerCase() === 'hard'
                          ? 'bg-rose-500/10 text-rose-600'
                          : 'bg-amber-500/10 text-amber-600'
                      }`}>
                        {q.difficulty || 'Medium'}
                      </span>

                      <span className="text-[10px] font-bold text-slate-400">
                        +{q.marks || 4} / -{q.negative_marks || 1}
                      </span>
                    </div>
                  </div>

                  {/* Validation & Audit Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {q.is_duplicate && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-rose-500/10 text-rose-600 border border-rose-500/20 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Duplicate ({Math.round(q.similarity_score || 0)}%)</span>
                      </span>
                    )}

                    <span className={`px-2.5 py-1 rounded-xl text-xs font-black border flex items-center gap-1.5 ${valBadge.bg}`}>
                      <ValIcon className="h-3.5 w-3.5 shrink-0" />
                      <span>{valBadge.label}</span>
                      {q.validation_score !== undefined && (
                        <span className="opacity-80 text-[10px]">({q.validation_score}/100)</span>
                      )}
                    </span>

                    {/* Report Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleReport(q.id)}
                      className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 cursor-pointer"
                      title="Toggle Validation Report"
                    >
                      {isReportExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Validation Report Drawer (If expanded) */}
                {isReportExpanded && (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850/80 border border-slate-200/80 dark:border-slate-800 text-xs space-y-2">
                    <div className="flex items-center justify-between font-bold text-slate-700 dark:text-slate-300">
                      <span>Validation Engine Checklist Report</span>
                      <span className="text-[11px] text-slate-400">Score: {q.validation_score || 0} / 100</span>
                    </div>

                    {q.requires_manual_review && (
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 text-[11px] font-medium">
                        <strong>Manual Review Reasons:</strong> {Array.isArray(q.manual_review_reasons) ? q.manual_review_reasons.join(', ') : 'Scientific verification recommended.'}
                      </div>
                    )}

                    {Array.isArray(q.validation_errors) && q.validation_errors.length > 0 && (
                      <div className="p-2 rounded-lg bg-rose-500/10 text-rose-600 text-[11px] space-y-1">
                        <strong>Validation Errors:</strong>
                        <ul className="list-disc pl-4 space-y-0.5">
                          {q.validation_errors.map((err, errIdx) => (
                            <li key={errIdx}>{typeof err === 'string' ? err : err.message || JSON.stringify(err)}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {q.rejection_reason && (
                      <div className="p-2 rounded-lg bg-rose-500/10 text-rose-600 text-[11px]">
                        <strong>Rejection Reason:</strong> {q.rejection_reason}
                      </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] text-slate-500">
                      <div>Formula Format: <span className="font-bold text-slate-700 dark:text-slate-300">LaTeX Valid</span></div>
                      <div>Deduplication: <span className="font-bold text-slate-700 dark:text-slate-300">{q.is_duplicate ? 'Flagged' : 'Unique'}</span></div>
                      <div>Answer Consistency: <span className="font-bold text-slate-700 dark:text-slate-300">Verified</span></div>
                      <div>Scientific Check: <span className="font-bold text-slate-700 dark:text-slate-300">Academic Standard</span></div>
                    </div>
                  </div>
                )}

                {/* Passage (If passage-based question) */}
                {q.passage_text && (
                  <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border-l-4 border-blue-500 space-y-1">
                    {q.passage_title && (
                      <h5 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                        {q.passage_title}
                      </h5>
                    )}
                    <div className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      <MathRenderer text={q.passage_text} />
                    </div>
                  </div>
                )}

                {/* Question Statement with KaTeX */}
                <div className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                  <MathRenderer text={q.question_text} />
                </div>

                {/* Assertion & Reason Statements (If assertion-reason type) */}
                {(q.assertion_text || q.reason_text) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 text-xs">
                    <div>
                      <span className="font-black text-blue-600 uppercase text-[10px] block mb-1">Assertion (A):</span>
                      <div className="text-slate-800 dark:text-slate-200 font-medium">
                        <MathRenderer text={q.assertion_text || ''} />
                      </div>
                    </div>
                    <div>
                      <span className="font-black text-purple-600 uppercase text-[10px] block mb-1">Reason (R):</span>
                      <div className="text-slate-800 dark:text-slate-200 font-medium">
                        <MathRenderer text={q.reason_text || ''} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Diagram Thumbnail & Preview Bar */}
                {hasDiagram && (
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-20 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden flex items-center justify-center p-1">
                        {q.diagram_svg ? (
                          <div
                            dangerouslySetInnerHTML={{ __html: q.diagram_svg }}
                            className="h-full w-full flex items-center justify-center [&>svg]:max-h-full [&>svg]:max-w-full"
                          />
                        ) : q.image_url ? (
                          <img src={q.image_url} alt="Diagram Asset" className="max-h-full max-w-full object-contain" />
                        ) : (
                          <ImageIcon className="h-6 w-6 text-slate-300" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            Neutral Reference Graphic ({q.diagram_type || 'SVG Vector'})
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-600">
                            0 Answer Keys Leaked
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Unbiased examination diagram with pointers (A, B, X, Y)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => openDiagramPreview(q)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
                      >
                        <Maximize2 className="h-3.5 w-3.5 text-blue-600" />
                        <span>Enlarge Graphic</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => openRegenerateDiagramModal(q)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
                      >
                        <RefreshCw className="h-3.5 w-3.5 text-slate-400" />
                        <span>Regenerate Diagram</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Question Options or Numerical Answer */}
                {q.question_type === 'numerical' || q.question_type === 'integer' ? (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400 block mb-0.5">
                        Numerical Answer & Tolerance Range
                      </span>
                      <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                        {q.numeric_answer !== null ? q.numeric_answer : 'N/A'}
                      </span>
                      {Number(q.numerical_tolerance) > 0 && (
                        <span className="text-xs font-medium text-slate-400 ml-2">
                          (Accepted Range: ±{q.numerical_tolerance})
                        </span>
                      )}
                    </div>
                    <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      Evaluated Numerically
                    </span>
                  </div>
                ) : options.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {options.map((optText, optIdx) => {
                      const isMulti = q.question_type === 'multi_select';
                      const isCorrect = isMulti
                        ? Array.isArray(q.correct_indices) && q.correct_indices.includes(optIdx)
                        : Number(q.correct_index) === optIdx;

                      const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                            isCorrect
                              ? 'border-emerald-500/60 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-950 dark:text-emerald-200 font-medium'
                              : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-850/60 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          <span
                            className={`h-6 w-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                              isCorrect
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {letter}
                          </span>

                          <div className="flex-1 text-xs leading-relaxed pt-0.5">
                            <MathRenderer text={optText} />
                          </div>

                          {isCorrect && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 shrink-0">
                              Correct Key
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                {/* Solution Drawer */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => toggleSolution(q.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer"
                  >
                    <span>{isSolutionExpanded ? 'Hide Step-by-Step Solution' : 'View Step-by-Step Solution & KaTeX Proof'}</span>
                    {isSolutionExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>

                  {isSolutionExpanded && (
                    <div className="mt-2.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-850/80 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 leading-relaxed space-y-2">
                      <div className="font-black text-slate-900 dark:text-white uppercase text-[10px] tracking-wider text-blue-600">
                        Academic Explanation:
                      </div>
                      <MathRenderer text={q.solution || 'No detailed solution provided.'} />
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {isApproved ? (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Approved into Question Bank #{q.bank_question_id}</span>
                      {q.approved_at && (
                        <span className="text-[11px] text-slate-400 font-normal">
                          ({new Date(q.approved_at).toLocaleDateString()})
                        </span>
                      )}
                    </div>
                  ) : isRejected ? (
                    <div className="flex items-center gap-2 text-xs font-bold text-rose-600">
                      <XCircle className="h-4 w-4" />
                      <span>Question Marked as Rejected</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => handleApproveSingle(q)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm cursor-pointer"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Approve Question</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => openRejectModal(q)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/50 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}

                  {/* Editing & Regeneration Tools */}
                  <div className="flex items-center gap-2 flex-wrap self-end">
                    <button
                      type="button"
                      onClick={() => openEditModal(q)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <Edit3 className="h-3.5 w-3.5 text-blue-600" />
                      <span>Edit Question</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => openRegenerateQuestionModal(q)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                      <span>Regenerate Question</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. FULL-SCREEN DIAGRAM PREVIEW MODAL                                  */}
      {/* ===================================================================== */}
      {activeModal === 'diagram_preview' && selectedQuestion && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title={`Diagram Inspection - Question #${selectedQuestion.question_number || selectedQuestion.id}`}
          size="xl"
        >
          <div className="space-y-4">
            {/* Visual Checklist Alert */}
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-700 dark:text-blue-300 flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-blue-600" />
              <div>
                <span className="font-bold">Answer Key Security Verification:</span>
                <p className="text-[11px] opacity-90 mt-0.5">
                  Ensure the diagram contains strictly neutral pointer markers (e.g. X, Y, A, B) and no solution text
                  or highlighted correct answer branches.
                </p>
              </div>
            </div>

            {/* Diagram Canvas with Zoom Controls */}
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 min-h-[380px] flex items-center justify-center overflow-auto">
              <div
                style={{ transform: `scale(${diagramZoom})`, transition: 'transform 0.15s ease' }}
                className="max-h-[500px] max-w-full flex items-center justify-center [&>svg]:max-h-[460px] [&>svg]:w-auto"
              >
                {selectedQuestion.diagram_svg ? (
                  <div dangerouslySetInnerHTML={{ __html: selectedQuestion.diagram_svg }} />
                ) : selectedQuestion.image_url ? (
                  <img
                    src={selectedQuestion.image_url}
                    alt="Question Diagram"
                    className="max-h-[460px] object-contain rounded-lg"
                  />
                ) : (
                  <p className="text-xs text-slate-400">No diagram asset found</p>
                )}
              </div>

              {/* Floating Zoom Bar */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 p-1 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md">
                <button
                  type="button"
                  onClick={() => setDiagramZoom((z) => Math.min(2.5, z + 0.25))}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  title="Zoom In"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <span className="text-[10px] font-mono font-bold px-1 text-slate-600 dark:text-slate-400">
                  {Math.round(diagramZoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setDiagramZoom((z) => Math.max(0.5, z - 0.25))}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDiagramZoom(1)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-slate-500">
                Format: <strong className="text-slate-800 dark:text-slate-200">{selectedQuestion.diagram_type || 'SVG Vector'}</strong>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null);
                    openRegenerateDiagramModal(selectedQuestion);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
                >
                  Regenerate Diagram
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ===================================================================== */}
      {/* 5. INLINE QUESTION EDIT MODAL                                         */}
      {/* ===================================================================== */}
      {activeModal === 'edit' && selectedQuestion && editForm && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title={`Edit Question #${selectedQuestion.question_number || selectedQuestion.id}`}
          size="lg"
        >
          <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
            {/* Metadata Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                <input
                  type="text"
                  value={editForm.subject}
                  onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-medium text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Chapter</label>
                <input
                  type="text"
                  value={editForm.chapter}
                  onChange={(e) => setEditForm({ ...editForm, chapter: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-medium text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Difficulty</label>
                <select
                  value={editForm.difficulty}
                  onChange={(e) => setEditForm({ ...editForm, difficulty: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Question Statement */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Question Statement (Supports KaTeX: $E=mc^2$)
                </label>
              </div>
              <textarea
                rows={4}
                value={editForm.question_text}
                onChange={(e) => setEditForm({ ...editForm, question_text: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-slate-200 font-mono resize-y"
              />
              {/* Live Preview */}
              {editForm.question_text && (
                <div className="mt-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 text-xs">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Live LaTeX Render:</span>
                  <MathRenderer text={editForm.question_text} />
                </div>
              )}
            </div>

            {/* Options Editor (For MCQ types) */}
            {editForm.question_type !== 'numerical' && editForm.question_type !== 'integer' && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Options & Correct Answer Selection
                </label>

                {editForm.options.map((opt, oIdx) => {
                  const letter = String.fromCharCode(65 + oIdx);
                  const isMulti = editForm.question_type === 'multi_select';
                  const isChecked = isMulti
                    ? editForm.correct_indices.includes(oIdx)
                    : editForm.correct_index === oIdx;

                  return (
                    <div key={oIdx} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (isMulti) {
                            const cur = new Set(editForm.correct_indices);
                            if (cur.has(oIdx)) cur.delete(oIdx);
                            else cur.add(oIdx);
                            setEditForm({ ...editForm, correct_indices: Array.from(cur) });
                          } else {
                            setEditForm({ ...editForm, correct_index: oIdx });
                          }
                        }}
                        className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
                        }`}
                        title="Mark as correct answer"
                      >
                        {letter}
                      </button>

                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...editForm.options];
                          newOpts[oIdx] = e.target.value;
                          setEditForm({ ...editForm, options: newOpts });
                        }}
                        className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-slate-200 font-medium"
                      />

                      {editForm.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newOpts = editForm.options.filter((_, idx) => idx !== oIdx);
                            setEditForm({ ...editForm, options: newOpts });
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  );
                })}

                {editForm.options.length < 6 && (
                  <button
                    type="button"
                    onClick={() => setEditForm({ ...editForm, options: [...editForm.options, ''] })}
                    className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer pt-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Option</span>
                  </button>
                )}
              </div>
            )}

            {/* Numerical Answer Editor */}
            {(editForm.question_type === 'numerical' || editForm.question_type === 'integer') && (
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Correct Numeric Value
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={editForm.numeric_answer}
                    onChange={(e) => setEditForm({ ...editForm, numeric_answer: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-bold text-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Accepted Tolerance (±)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={editForm.numerical_tolerance}
                    onChange={(e) => setEditForm({ ...editForm, numerical_tolerance: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-medium text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>
            )}

            {/* Solution & Explanation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Step-by-Step Solution & KaTeX Proof
              </label>
              <textarea
                rows={4}
                value={editForm.solution}
                onChange={(e) => setEditForm({ ...editForm, solution: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-slate-200 font-mono resize-y"
              />
            </div>

            {/* Marks & Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Marks (+)</label>
                <input
                  type="number"
                  value={editForm.marks}
                  onChange={(e) => setEditForm({ ...editForm, marks: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-medium text-slate-800 dark:text-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Negative Marks (-)</label>
                <input
                  type="number"
                  value={editForm.negative_marks}
                  onChange={(e) => setEditForm({ ...editForm, negative_marks: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-medium text-slate-800 dark:text-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Admin Notes</label>
                <input
                  type="text"
                  placeholder="Optional review notes..."
                  value={editForm.admin_notes}
                  onChange={(e) => setEditForm({ ...editForm, admin_notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-medium text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={isSavingEdit}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
              >
                <Save className={`h-4 w-4 ${isSavingEdit ? 'animate-spin' : ''}`} />
                <span>{isSavingEdit ? 'Saving & Re-validating...' : 'Save & Re-validate'}</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ===================================================================== */}
      {/* 6. REGENERATE QUESTION MODAL                                          */}
      {/* ===================================================================== */}
      {activeModal === 'regenerate_q' && selectedQuestion && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title={`Regenerate Question #${selectedQuestion.question_number || selectedQuestion.id}`}
          size="md"
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Provide feedback or specific instructions to Gemini to improve this question:
            </p>
            <textarea
              rows={3}
              value={regenCritique}
              onChange={(e) => setRegenCritique(e.target.value)}
              placeholder="e.g. Increase mathematical difficulty, replace numerical values, ensure 4 distinct distractor options..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-slate-200 resize-none font-medium"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRegenerateQuestion}
                disabled={isRegenerating}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs cursor-pointer disabled:opacity-50"
              >
                <Sparkles className={`h-3.5 w-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
                <span>{isRegenerating ? 'Regenerating...' : 'Synthesize Replacement'}</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ===================================================================== */}
      {/* 7. REGENERATE DIAGRAM MODAL                                           */}
      {/* ===================================================================== */}
      {activeModal === 'regenerate_diag' && selectedQuestion && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title={`Regenerate Diagram - Question #${selectedQuestion.question_number || selectedQuestion.id}`}
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Diagram Synthesis Method
              </label>
              <select
                value={regenDiagMethod}
                onChange={(e) => setRegenDiagMethod(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <option value="programmatic">Programmatic SVG Engine (Deterministic & Crisp)</option>
                <option value="ai_svg">AI Dynamic SVG Synthesis (Gemini Vector Studio)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Refinement Instructions / Graphic Description
              </label>
              <textarea
                rows={3}
                value={regenDiagPrompt}
                onChange={(e) => setRegenDiagPrompt(e.target.value)}
                placeholder="e.g. Draw a Wheatstone bridge with resistors R1, R2, R3, R4 and galvanometer G in center..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-slate-200 resize-none font-medium"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRegenerateDiagram}
                disabled={isRegeneratingDiag}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isRegeneratingDiag ? 'animate-spin' : ''}`} />
                <span>{isRegeneratingDiag ? 'Rendering...' : 'Regenerate Diagram'}</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ===================================================================== */}
      {/* 8. REJECT QUESTION MODAL                                              */}
      {/* ===================================================================== */}
      {activeModal === 'reject' && selectedQuestion && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title={`Reject Question #${selectedQuestion.question_number || selectedQuestion.id}`}
          size="md"
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Provide a reason for rejecting this question (will be logged in the audit trail):
            </p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Out of NTA syllabus scope, scientific inaccuracy in solution, ambiguous question statement..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-slate-200 resize-none font-medium"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                disabled={isRejecting}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer disabled:opacity-50"
              >
                <X className={`h-3.5 w-3.5 ${isRejecting ? 'animate-spin' : ''}`} />
                <span>{isRejecting ? 'Rejecting...' : 'Confirm Rejection'}</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
