import React, { useState, useEffect } from 'react';
import {
  X,
  FileText,
  Clock,
  Layers,
  Award,
  Users,
  CheckCircle2,
  Trash2,
  Send,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Pencil,
  Upload,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import { institutionDashboardService } from '../../../lib/services.js';
import { useToast } from '../../../context/ToastContext.jsx';
import { getMediaUrl } from '../../../lib/media.js';
import MathRenderer from '../../common/MathRenderer.jsx';

export default function ViewCustomTestModal({
  isOpen,
  onClose,
  testId,
  instId,
  batches = [],
  onTestDeleted,
  onOpenAssign,
  isDarkMode = true,
}) {
  const toast = useToast();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('questions'); // 'questions' | 'attempts' | 'assignments'
  const [deleting, setDeleting] = useState(false);
  const [zoomedDiagram, setZoomedDiagram] = useState(null);

  // Edit Question State
  const [editQuestionModalOpen, setEditQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    question_text: '',
    options: ['', '', '', ''],
    correct_index: 0,
    marks: 4,
    solution: '',
    image_url: null,
    subject: '',
    topic: '',
  });
  const [pendingDiagramFile, setPendingDiagramFile] = useState(null);
  const [diagramPreviewUrl, setDiagramPreviewUrl] = useState(null);
  const [savingQuestion, setSavingQuestion] = useState(false);

  useEffect(() => {
    if (isOpen && testId && instId) {
      setLoading(true);
      institutionDashboardService
        .getCustomTest(instId, testId)
        .then((res) => {
          if (res?.test) setTest(res.test);
        })
        .catch((err) => {
          toast.error(err.message || 'Failed to load test details.');
          onClose();
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, testId, instId]);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${test?.title}"? This cannot be undone.`)) {
      return;
    }
    setDeleting(true);
    try {
      await institutionDashboardService.deleteCustomTest(instId, testId);
      toast.success('Custom test deleted successfully.');
      if (onTestDeleted) onTestDeleted(testId);
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to delete custom test.');
    } finally {
      setDeleting(false);
    }
  };

  // Open Edit Question Modal
  const handleOpenEditQuestion = (q, idx) => {
    setEditingQuestion(q);
    setEditIndex(idx);

    let opts = [];
    try {
      const parsed = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
      if (Array.isArray(parsed) && parsed.length > 0) {
        opts = parsed.map((o, i) => {
          if (typeof o === 'object' && o !== null) {
            return {
              key: o.key || String.fromCharCode(65 + i),
              text: o.text !== undefined ? String(o.text) : '',
              image_url: o.image_url || o.image || o.diagram_url || (Array.isArray(o.media) && (typeof o.media[0] === 'string' ? o.media[0] : o.media[0]?.url)) || null,
              pendingFile: null,
              previewUrl: null,
            };
          }
          return {
            key: String.fromCharCode(65 + i),
            text: String(o ?? ''),
            image_url: null,
            pendingFile: null,
            previewUrl: null,
          };
        });
      }
    } catch (_) {}
    while (opts.length < 4) {
      const i = opts.length;
      opts.push({
        key: String.fromCharCode(65 + i),
        text: '',
        image_url: null,
        pendingFile: null,
        previewUrl: null,
      });
    }

    let mediaArr = [];
    try {
      mediaArr = typeof q.media === 'string' ? JSON.parse(q.media) : (Array.isArray(q.media) ? q.media : []);
    } catch (_) {}
    const initialDiagram = q.image_url || mediaArr[0]?.url || (typeof mediaArr[0] === 'string' ? mediaArr[0] : null);

    setEditForm({
      question_text: q.question_text || '',
      options: opts,
      correct_index: typeof q.correct_index === 'number' ? q.correct_index : 0,
      marks: q.marks || 4,
      solution: q.solution || '',
      image_url: initialDiagram || null,
      subject: q.subject || test?.target_exam || 'Physics',
      topic: q.topic || q.chapter || '',
    });

    setPendingDiagramFile(null);
    setDiagramPreviewUrl(initialDiagram ? getMediaUrl(initialDiagram) : null);
    setEditQuestionModalOpen(true);
  };

  // Select diagram file from local disk
  const handleDiagramFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (PNG, JPG, SVG, WebP).');
      return;
    }
    setPendingDiagramFile(file);
    const localPreview = URL.createObjectURL(file);
    setDiagramPreviewUrl(localPreview);
    e.target.value = '';
  };

  // Remove diagram from question
  const handleRemoveDiagram = () => {
    setPendingDiagramFile(null);
    setDiagramPreviewUrl(null);
    setEditForm((prev) => ({ ...prev, image_url: null }));
  };

  // Handle option graph / circuit file selection
  const handleOptionFileSelect = (optIdx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (PNG, JPG, SVG, WebP).');
      return;
    }
    const localPreview = URL.createObjectURL(file);
    setEditForm((prev) => {
      const nextOpts = [...prev.options];
      nextOpts[optIdx] = {
        ...nextOpts[optIdx],
        pendingFile: file,
        previewUrl: localPreview,
      };
      return { ...prev, options: nextOpts };
    });
    e.target.value = '';
  };

  // Remove option graph / circuit image
  const handleRemoveOptionImage = (optIdx) => {
    setEditForm((prev) => {
      const nextOpts = [...prev.options];
      nextOpts[optIdx] = {
        ...nextOpts[optIdx],
        pendingFile: null,
        previewUrl: null,
        image_url: null,
      };
      return { ...prev, options: nextOpts };
    });
  };

  // Save edited question
  const handleSaveEditedQuestion = async (e) => {
    e?.preventDefault();
    if (!editingQuestion) return;

    setSavingQuestion(true);
    try {
      let finalImageUrl = editForm.image_url;

      // 1. Upload new question diagram file if selected
      if (pendingDiagramFile) {
        const formData = new FormData();
        formData.append('file', pendingDiagramFile);
        const uploadRes = await institutionDashboardService.uploadCustomTestDiagram(instId, testId, formData);
        if (uploadRes?.url) {
          finalImageUrl = uploadRes.url;
        }
      }

      // 2. Upload any pending option graph/circuit images
      const resolvedOptions = [];
      for (let i = 0; i < editForm.options.length; i++) {
        const opt = editForm.options[i];
        let optImg = opt.image_url || null;

        if (opt.pendingFile) {
          const formData = new FormData();
          formData.append('file', opt.pendingFile);
          const uploadRes = await institutionDashboardService.uploadCustomTestDiagram(instId, testId, formData);
          if (uploadRes?.url) {
            optImg = uploadRes.url;
          }
        }

        resolvedOptions.push({
          key: String.fromCharCode(65 + i),
          text: (opt.text || '').trim(),
          image_url: optImg,
        });
      }

      // 3. Prepare payload
      const payload = {
        question_text: editForm.question_text,
        options: resolvedOptions,
        correct_index: Number(editForm.correct_index),
        marks: Number(editForm.marks) || 4,
        solution: editForm.solution,
        image_url: finalImageUrl,
        subject: editForm.subject,
        topic: editForm.topic,
      };

      // 4. Send update request
      const updateRes = await institutionDashboardService.updateCustomTestQuestion(
        instId,
        testId,
        editingQuestion.id,
        payload
      );

      const savedQ = updateRes?.question || { ...editingQuestion, ...payload };

      // 5. Update local test questions state
      setTest((prev) => {
        if (!prev) return prev;
        const updatedQuestions = prev.questions.map((item, i) =>
          i === editIndex ? { ...item, ...savedQ, id: editingQuestion.id } : item
        );
        const newTotalMarks = updatedQuestions.reduce((sum, item) => sum + (Number(item.marks) || 4), 0);
        return {
          ...prev,
          questions: updatedQuestions,
          total_marks: newTotalMarks,
        };
      });

      toast.success(`Question Q${editIndex + 1} updated successfully!`);
      setEditQuestionModalOpen(false);
      setEditingQuestion(null);
      setPendingDiagramFile(null);
      setDiagramPreviewUrl(null);
    } catch (err) {
      toast.error(err.message || 'Failed to save question changes.');
    } finally {
      setSavingQuestion(false);
    }
  };

  // Delete individual question
  const handleDeleteQuestion = async (q, idx) => {
    if (
      !window.confirm(
        `Are you sure you want to delete Question Q${idx + 1}? All remaining questions will automatically shift position.`
      )
    ) {
      return;
    }

    try {
      await institutionDashboardService.deleteCustomTestQuestion(instId, testId, q.id);
      toast.success(`Question Q${idx + 1} deleted successfully.`);
      setTest((prev) => {
        if (!prev) return prev;
        const remainingQuestions = prev.questions.filter((item) => item.id !== q.id);
        const renumberedQuestions = remainingQuestions.map((item, i) => ({
          ...item,
          position: i + 1,
        }));
        const newTotalMarks = renumberedQuestions.reduce((sum, item) => sum + (Number(item.marks) || 4), 0);
        return {
          ...prev,
          questions: renumberedQuestions,
          total_marks: newTotalMarks,
        };
      });
    } catch (err) {
      toast.error(err.message || 'Failed to delete question.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          isDarkMode ? 'bg-[#0B1528] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* HEADER */}
        <div className="p-5 sm:p-6 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                {test?.test_type || 'Custom Test'}
              </span>
              <span className="text-xs text-slate-400">
                Created: {test?.created_at ? new Date(test.created_at).toLocaleDateString() : 'Recent'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black tracking-tight">{test?.title || 'Loading Test...'}</h2>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>⏱ {test?.duration_minutes || 180} Mins</span>
              <span>•</span>
              <span>📝 {test?.questions?.length || 0} Questions</span>
              <span>•</span>
              <span>🎯 {test?.total_marks || 0} Total Marks</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              disabled={deleting}
              title="Delete this custom test"
              className="p-2 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex border-b border-slate-800/80 px-6 bg-slate-950 text-xs font-bold gap-6">
          <button
            onClick={() => setActiveTab('questions')}
            className={`py-3 border-b-2 transition cursor-pointer ${
              activeTab === 'questions' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Questions & Answer Key ({test?.questions?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('attempts')}
            className={`py-3 border-b-2 transition cursor-pointer ${
              activeTab === 'attempts' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Student Attempts ({test?.attempts?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`py-3 border-b-2 transition cursor-pointer ${
              activeTab === 'assignments' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Assigned Batches ({test?.assignments?.length || 0})
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 custom-scrollbar">
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-400 font-bold">Loading test details...</div>
          ) : activeTab === 'questions' ? (
            <div className="space-y-3">
              {test?.questions?.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8">No individual questions stored.</p>
              ) : (
                test?.questions?.map((q, idx) => {
                  let opts = [];
                  try {
                    opts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options || [];
                  } catch (_) {
                    opts = [];
                  }

                  let mediaArr = [];
                  try {
                    mediaArr = typeof q.media === 'string' ? JSON.parse(q.media) : (Array.isArray(q.media) ? q.media : []);
                  } catch (_) {
                    mediaArr = [];
                  }
                  const diagramUrl = q.image_url || mediaArr[0]?.url || (typeof mediaArr[0] === 'string' ? mediaArr[0] : null);

                  const isQCorrect = (i) => i === Number(q.correct_index);

                  return (
                    <div
                      key={q.id || idx}
                      className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xs space-y-3 transition hover:border-slate-300 dark:hover:border-slate-700"
                    >
                      {/* Top Badges Bar matching Admin Assessment Page */}
                      <div className="flex items-center justify-between gap-2 flex-wrap pb-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-extrabold text-xs shadow-2xs">
                            Q{idx + 1}
                          </span>
                          <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700">
                            Sec #{idx + 1}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            Single correct MCQ
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            Section-A: {q.subject || test?.target_exam || 'Physics'}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            • {q.marks || 4} mk
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                            PDF Q{q.original_question_number || (idx + 1)}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            • {q.subject || 'Physics'} • {q.topic || q.chapter || test?.syllabus || 'Practice Set'}
                          </span>
                          {diagramUrl && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 px-2.5 py-0.5 text-xs font-semibold text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                              🖼️ Diagram
                            </span>
                          )}
                        </div>

                        {/* Actions: Edit & Delete buttons */}
                        <div className="flex items-center gap-2 shrink-0 ml-auto">
                          <button
                            type="button"
                            onClick={() => handleOpenEditQuestion(q, idx)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-bold transition cursor-pointer shadow-xs"
                            title="Edit question text, options, diagram, marks, or explanation"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteQuestion(q, idx)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold transition cursor-pointer shadow-xs"
                            title="Delete this question"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>

                      {/* Question Text with KaTeX Math Rendering */}
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100 whitespace-pre-line leading-relaxed">
                        <MathRenderer text={q.question_text} />
                      </div>

                      {/* Question Diagram / Image - Small, Compact & Left-Aligned matching Admin Page */}
                      {diagramUrl && (
                        <div className="flex flex-wrap gap-2.5 pt-1">
                          <div className="max-w-xs sm:max-w-sm">
                            <img
                              src={getMediaUrl(diagramUrl)}
                              alt={`Diagram for Question ${idx + 1}`}
                              className="max-h-36 sm:max-h-40 max-w-full w-auto rounded-lg border border-slate-200 dark:border-slate-700 object-contain bg-white p-1.5 cursor-pointer hover:opacity-95 shadow-xs transition"
                              loading="lazy"
                              onClick={() => setZoomedDiagram(getMediaUrl(diagramUrl))}
                              title="Click to view full diagram"
                              onError={(e) => {
                                if (!e.target.dataset.triedFallback && !diagramUrl.startsWith('http')) {
                                  e.target.dataset.triedFallback = 'true';
                                  e.target.src = `http://127.0.0.1:5000${diagramUrl.startsWith('/') ? '' : '/'}${diagramUrl}`;
                                }
                              }}
                            />
                            <p
                              className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 cursor-pointer hover:text-indigo-400"
                              onClick={() => setZoomedDiagram(getMediaUrl(diagramUrl))}
                            >
                              <span>🔍 Click diagram to enlarge</span>
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Options - Vertical Stack matching Admin Page */}
                      <ul className="mt-2 space-y-2 text-sm pt-1">
                        {opts.map((opt, optIdx) => {
                          const rawOptText = typeof opt === 'object' && opt !== null ? (opt.text ?? '') : String(opt ?? '');
                          const rawOptImg = typeof opt === 'object' && opt !== null
                            ? (opt.image_url || opt.image || (Array.isArray(opt.media) && opt.media[0]?.url) || '')
                            : '';
                          const isMatchMapping = /(?:\(?[a-eA-E1-4ivx]+\)?\s*[-–—>:=]\s*\(?[a-zA-Z0-9ivxlcdmIVXLCDM]+\)?.*[,;]|[,;].*\(?[b-eB-E2-4ivx]+\)?\s*[-–—>:=]|(?:^|,)\s*\(?[a-eA-E1-4]\)\s*[-–—>:=]|^\([a-z]\)\s*[-–—]|\([iIvVxX]+\)[^,\n]+,\s*\([iIvVxX]+\))/i.test(rawOptText);
                          const optText = isMatchMapping ? rawOptText : rawOptText.replace(/^(?:\([a-eA-E1-4]\)\s*|[a-eA-E][\.\:\)]\s+|[1-4]\)\s*|[1-4]\.(?!\d)\s+)/, '').trim();
                          const isCorrect = isQCorrect(optIdx);

                          return (
                            <li
                              key={optIdx}
                              className={
                                isCorrect
                                  ? 'font-medium text-emerald-600 dark:text-emerald-400 space-y-1'
                                  : 'text-slate-600 dark:text-slate-300 space-y-1'
                              }
                            >
                              <div className="flex items-start gap-1.5">
                                <span className="w-3.5 shrink-0 font-bold text-center text-emerald-600 dark:text-emerald-400">
                                  {isCorrect ? '✓' : ''}
                                </span>
                                <span className="font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                                  ({String.fromCharCode(65 + optIdx)})
                                </span>
                                <span className="flex-1">
                                  <MathRenderer text={optText || rawOptText} />
                                </span>
                              </div>

                              {/* Option Graph / Circuit Diagram */}
                              {rawOptImg && (
                                <div className="pl-6 pt-0.5">
                                  <img
                                    src={getMediaUrl(rawOptImg)}
                                    alt={`Option (${String.fromCharCode(65 + optIdx)}) graph/circuit`}
                                    className="max-h-28 sm:max-h-36 max-w-xs sm:max-w-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white p-1.5 object-contain cursor-pointer hover:opacity-95 shadow-xs transition"
                                    onClick={() => setZoomedDiagram(getMediaUrl(rawOptImg))}
                                    title="Click to zoom graph/circuit"
                                    loading="lazy"
                                  />
                                  <p
                                    className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 cursor-pointer hover:text-indigo-400"
                                    onClick={() => setZoomedDiagram(getMediaUrl(rawOptImg))}
                                  >
                                    <span>🔍 Click graph/circuit to enlarge</span>
                                  </p>
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>

                      {/* Solution / Explanation */}
                      {q.solution && (
                        <div className="mt-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          <strong className="text-slate-900 dark:text-slate-200 font-bold mr-1.5">Explanation: </strong>
                          <MathRenderer text={q.solution} />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          ) : activeTab === 'attempts' ? (
            <div className="space-y-2">
              {test?.attempts?.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400 font-bold">
                  No students have attempted this test yet.
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-800 overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-900 text-[10px] font-extrabold uppercase text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3">Student Name</th>
                        <th className="px-4 py-3">Batch</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Score</th>
                        <th className="px-4 py-3">Percentage</th>
                        <th className="px-4 py-3">Submitted At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-semibold">
                      {test.attempts.map((att) => (
                        <tr key={att.id} className="hover:bg-slate-900/50">
                          <td className="px-4 py-3 font-bold text-white">
                            {att.candidate_name}
                            <span className="block text-[10px] font-normal text-slate-500">{att.candidate_email}</span>
                          </td>
                          <td className="px-4 py-3 text-slate-400">{att.batch_name || 'N/A'}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                att.status === 'completed' || att.status === 'submitted'
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-amber-500/20 text-amber-400'
                              }`}
                            >
                              {att.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-mono font-bold text-white">
                            {att.marks_obtained !== null ? `${att.marks_obtained}/${att.total_marks}` : '—'}
                          </td>
                          <td className="px-4 py-3 font-mono text-indigo-400 font-black">
                            {att.percentage !== null ? `${att.percentage}%` : '—'}
                          </td>
                          <td className="px-4 py-3 text-slate-500 text-[11px]">
                            {att.submitted_at ? new Date(att.submitted_at).toLocaleString() : 'In Progress'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">
                  Batches that currently have access to this custom test:
                </span>
                <button
                  onClick={() => onOpenAssign && onOpenAssign(test)}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Update Assignments</span>
                </button>
              </div>

              {test?.assignments?.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl">
                  <p className="text-xs text-amber-400 font-bold mb-2">This test is not currently assigned to any batch.</p>
                  <button
                    onClick={() => onOpenAssign && onOpenAssign(test)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold cursor-pointer"
                  >
                    Assign to Batches Now
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {test?.assignments?.map((a, i) => (
                    <div key={i} className="p-3.5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                          <Layers className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">
                            {a.assigned_to_type === 'institution'
                              ? 'All Students in Institution'
                              : a.batch_name || a.student_name || 'Academic Batch'}
                          </div>
                          <span className="text-[10px] text-slate-500 uppercase font-bold">
                            Type: {a.assigned_to_type}
                          </span>
                        </div>
                      </div>
                      <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Active</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* EDIT QUESTION MODAL */}
      {editQuestionModalOpen && editingQuestion && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => !savingQuestion && setEditQuestionModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] bg-white dark:bg-[#0B1528] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-extrabold text-xs shadow-2xs">
                    Q{editIndex + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    PDF Q{editingQuestion.original_question_number || (editIndex + 1)}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black tracking-tight">
                  Edit Question & Answer Key
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Update question statement, options, diagram, correct key, and solution.
                </p>
              </div>
              <button
                type="button"
                onClick={() => !savingQuestion && setEditQuestionModalOpen(false)}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveEditedQuestion} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 custom-scrollbar">
              {/* Question Text */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                    Question Statement <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-medium">Supports LaTeX ($...$ or $$...$$)</span>
                </div>
                <textarea
                  rows={4}
                  required
                  value={editForm.question_text}
                  onChange={(e) => setEditForm({ ...editForm, question_text: e.target.value })}
                  placeholder="Enter the question text here..."
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-y font-mono text-xs"
                />
                {/* Live Math Preview Box */}
                {editForm.question_text && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-black uppercase text-indigo-500 dark:text-indigo-400">
                      Live Statement Preview:
                    </span>
                    <div className="text-sm font-medium leading-relaxed">
                      <MathRenderer text={editForm.question_text} />
                    </div>
                  </div>
                )}
              </div>

              {/* Diagram / Visual Asset */}
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <ImageIcon className="h-4 w-4 text-indigo-400" />
                      <span>Question Diagram / Visual Asset</span>
                    </label>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Attach or update a diagram for this question (PNG, JPG, SVG, WebP)
                    </p>
                  </div>
                  {diagramPreviewUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveDiagram}
                      className="px-2.5 py-1 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove Diagram</span>
                    </button>
                  )}
                </div>

                {diagramPreviewUrl ? (
                  <div className="flex items-center gap-4 pt-1 flex-wrap">
                    <div className="relative group">
                      <img
                        src={diagramPreviewUrl}
                        alt="Question diagram preview"
                        className="max-h-32 sm:max-h-36 max-w-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white p-2 object-contain shadow-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-bold cursor-pointer transition">
                        <Upload className="h-3.5 w-3.5" />
                        <span>Change Diagram Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleDiagramFileSelect}
                          className="hidden"
                        />
                      </label>
                      <p className="text-[11px] text-slate-400">
                        {pendingDiagramFile ? `Selected: ${pendingDiagramFile.name}` : 'Using current diagram'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl hover:border-indigo-500/60 dark:hover:border-indigo-500/60 cursor-pointer transition bg-white dark:bg-slate-900/30">
                    <Upload className="h-6 w-6 text-slate-400 mb-1" />
                    <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400">
                      Click to upload a diagram image
                    </span>
                    <span className="text-[10px] text-slate-400">Supports PNG, JPG, JPEG, SVG, WebP up to 20MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleDiagramFileSelect}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Options & Correct Answer Radio Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                      Options & Correct Answer <span className="text-rose-500">*</span>
                    </label>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Select the radio button (✓) next to the correct answer. You can attach graphs/circuit images to any option.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {editForm.options.map((opt, optIdx) => {
                    const isSelectedCorrect = Number(editForm.correct_index) === optIdx;
                    const optImgUrl = opt.previewUrl || opt.image_url;

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-2xl border transition space-y-2.5 ${
                          isSelectedCorrect
                            ? 'border-emerald-500/60 bg-emerald-500/5 dark:bg-emerald-950/20'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Radio Selector */}
                          <label className="flex items-center gap-2 cursor-pointer shrink-0">
                            <input
                              type="radio"
                              name="correct_answer_radio"
                              checked={isSelectedCorrect}
                              onChange={() => setEditForm({ ...editForm, correct_index: optIdx })}
                              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-500"
                            />
                            <span
                              className={`px-2 py-0.5 rounded-md font-bold text-xs ${
                                isSelectedCorrect
                                  ? 'bg-emerald-500 text-white shadow-2xs'
                                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              ({String.fromCharCode(65 + optIdx)})
                            </span>
                          </label>

                          {/* Option Input */}
                          <div className="flex-1 space-y-1">
                            <input
                              type="text"
                              value={opt.text}
                              onChange={(e) => {
                                const nextOpts = [...editForm.options];
                                nextOpts[optIdx] = { ...nextOpts[optIdx], text: e.target.value };
                                setEditForm({ ...editForm, options: nextOpts });
                              }}
                              placeholder={`Option (${String.fromCharCode(65 + optIdx)}) text, formula, or graph title (optional if image attached)...`}
                              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                            />
                          </div>

                          {/* Action: Attach Graph / Circuit Button */}
                          {!optImgUrl ? (
                            <label className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-bold transition cursor-pointer shrink-0">
                              <ImageIcon className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Attach Graph / Circuit</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleOptionFileSelect(optIdx, e)}
                              />
                            </label>
                          ) : null}

                          {isSelectedCorrect && (
                            <span className="text-[11px] font-bold text-emerald-500 shrink-0 hidden sm:inline">
                              ✓ Correct Key
                            </span>
                          )}
                        </div>

                        {/* Live preview for formulas in options */}
                        {opt.text && (opt.text.includes('$') || opt.text.includes('\\') || opt.text.includes('^')) && (
                          <div className="text-[11px] text-slate-400 pl-8">
                            Preview: <MathRenderer text={opt.text} />
                          </div>
                        )}

                        {/* Option Graph / Circuit Preview */}
                        {optImgUrl && (
                          <div className="pl-8 flex items-center gap-3 pt-1">
                            <div className="relative group">
                              <img
                                src={opt.previewUrl || getMediaUrl(opt.image_url)}
                                alt={`Option (${String.fromCharCode(65 + optIdx)}) graph/circuit`}
                                className="max-h-24 sm:max-h-28 max-w-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white p-1.5 object-contain shadow-xs cursor-pointer hover:opacity-95"
                                onClick={() => setZoomedDiagram(opt.previewUrl || getMediaUrl(opt.image_url))}
                                title="Click to zoom graph"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-bold cursor-pointer transition">
                                <Upload className="h-3 w-3" />
                                <span>Change Graph/Circuit</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleOptionFileSelect(optIdx, e)}
                                />
                              </label>
                              <button
                                type="button"
                                onClick={() => handleRemoveOptionImage(optIdx)}
                                className="block px-2 py-0.5 rounded text-[11px] text-rose-400 hover:text-rose-300 transition cursor-pointer"
                              >
                                Remove Graph
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Marks, Subject & Topic */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                    Marks per Correct Answer
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={editForm.marks}
                    onChange={(e) => setEditForm({ ...editForm, marks: Number(e.target.value) || 4 })}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={editForm.subject}
                    onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                    placeholder="e.g. Physics, Chemistry"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                    Topic / Chapter
                  </label>
                  <input
                    type="text"
                    value={editForm.topic}
                    onChange={(e) => setEditForm({ ...editForm, topic: e.target.value })}
                    placeholder="e.g. Laws of Motion"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
              </div>

              {/* Explanation / Solution */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                    Step-by-Step Solution / Explanation
                  </label>
                  <span className="text-[11px] text-slate-400 font-medium">LaTeX supported</span>
                </div>
                <textarea
                  rows={3}
                  value={editForm.solution}
                  onChange={(e) => setEditForm({ ...editForm, solution: e.target.value })}
                  placeholder="Enter detailed explanation or derivation shown to students after submitting..."
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-y font-mono"
                />
                {editForm.solution && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-black uppercase text-indigo-500 dark:text-indigo-400">
                      Live Explanation Preview:
                    </span>
                    <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                      <MathRenderer text={editForm.solution} />
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Actions Footer */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3 sticky bottom-0 bg-white dark:bg-[#0B1528] pb-1">
                <button
                  type="button"
                  disabled={savingQuestion}
                  onClick={() => setEditQuestionModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingQuestion}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
                >
                  {savingQuestion ? (
                    <>
                      <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Save Question Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LIGHTBOX FOR ZOOMED DIAGRAM */}
      {zoomedDiagram && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setZoomedDiagram(null)}
        >
          <div
            className="relative max-w-4xl max-h-[85vh] p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomedDiagram(null)}
              className="absolute -top-3 -right-3 p-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-md border border-slate-700 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={zoomedDiagram}
              alt="Zoomed diagram"
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg bg-white p-2"
            />
          </div>
        </div>
      )}
    </div>
  );
}

