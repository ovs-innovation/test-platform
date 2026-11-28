import React, { useState, useEffect, useMemo } from 'react';
import {
  FileSpreadsheet,
  Plus,
  Copy,
  Edit3,
  Trash2,
  History,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Clock,
  Award,
  Layers,
  Search,
  RefreshCw,
  Sliders,
  Check,
  X,
  ExternalLink,
  Info,
} from 'lucide-react';
import { blueprintService } from '../../lib/services.js';
import { AdminCard } from './AdminUI.jsx';
import { Spinner } from '../ui.jsx';
import Modal from '../Modal.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function BlueprintManager({ onSelectBlueprint }) {
  const { push: showToast } = useToast();

  const [blueprints, setBlueprints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterExamType, setFilterExamType] = useState('ALL');
  const [filterYear, setFilterYear] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [editorModalOpen, setEditorModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedBlueprintHistory, setSelectedBlueprintHistory] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Form State for Create / Edit
  const initialForm = {
    id: null,
    title: '',
    slug: '',
    description: '',
    exam_type: 'NEET',
    exam_year: '2026',
    class_level: 'Class 11+12',
    total_questions: 180,
    duration_minutes: 180,
    marks_per_question: 4,
    negative_marking: 1,
    partial_marking: { enabled: false, description: 'Strict binary marking: +4 correct, -1 incorrect' },
    subject_distribution: { Physics: 45, Chemistry: 45, Botany: 45, Zoology: 45 },
    chapter_distribution: { scope: 'Full Syllabus' },
    question_type_distribution: { 'Single MCQ': 140, 'Assertion-Reason': 40 },
    difficulty_distribution: { easy: 30, medium: 50, hard: 20 },
    section_rules: {
      sections: [
        { name: 'Section A', count: 35, mandatory: 35, marks: 140 },
        { name: 'Section B', count: 15, attempt_max: 10, marks: 40 },
      ],
    },
    optional_question_rules: {
      rule: 'Attempt any 10 out of 15 questions in Section B.',
      choice_allowed: true,
      questions_to_attempt: 180,
      total_marks: 720,
    },
    is_default: false,
    change_summary: '',
  };

  const [formData, setFormData] = useState(initialForm);
  const [validationResult, setValidationResult] = useState(null);
  const [saving, setSaving] = useState(false);

  // Load Blueprints
  const fetchBlueprints = async () => {
    try {
      setLoading(true);
      const res = await blueprintService.list();
      if (res.success) {
        setBlueprints(res.blueprints || []);
      }
    } catch (err) {
      console.error('[BlueprintManager] fetch error:', err);
      showToast('Failed to load blueprints from database.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlueprints();
  }, []);

  // Filtered List
  const filteredBlueprints = useMemo(() => {
    return blueprints.filter((bp) => {
      if (filterExamType !== 'ALL' && bp.exam_type !== filterExamType) return false;
      if (filterYear !== 'ALL' && bp.exam_year && !bp.exam_year.includes(filterYear)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = bp.title?.toLowerCase().includes(q);
        const matchesSlug = bp.slug?.toLowerCase().includes(q);
        const matchesDesc = bp.description?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSlug && !matchesDesc) return false;
      }
      return true;
    });
  }, [blueprints, filterExamType, filterYear, searchQuery]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setFormData(initialForm);
    setValidationResult(null);
    setIsEditing(false);
    setEditorModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (bp) => {
    setFormData({
      id: bp.id,
      title: bp.title,
      slug: bp.slug,
      description: bp.description || '',
      exam_type: bp.exam_type,
      exam_year: bp.exam_year || '2026',
      class_level: bp.class_level || 'Class 11+12',
      total_questions: bp.total_questions,
      duration_minutes: bp.duration_minutes,
      marks_per_question: Number(bp.marks_per_question) || 4,
      negative_marking: Number(bp.negative_marking) || 1,
      partial_marking: bp.partial_marking || { enabled: false },
      subject_distribution: bp.subject_distribution || {},
      chapter_distribution: bp.chapter_distribution || {},
      question_type_distribution: bp.question_type_distribution || {},
      difficulty_distribution: bp.difficulty_distribution || { easy: 30, medium: 50, hard: 20 },
      section_rules: bp.section_rules || {},
      optional_question_rules: bp.optional_question_rules || {},
      is_default: Boolean(bp.is_default),
      change_summary: '',
    });
    setValidationResult(null);
    setIsEditing(true);
    setEditorModalOpen(true);
  };

  // Open Version History Modal
  const handleOpenHistory = async (bp) => {
    try {
      setLoadingHistory(true);
      setHistoryModalOpen(true);
      const res = await blueprintService.get(bp.id);
      if (res.success) {
        setSelectedBlueprintHistory({
          blueprint: res.blueprint,
          history: res.history || [],
        });
      }
    } catch (err) {
      console.error('[BlueprintManager] history fetch error:', err);
      showToast('Failed to load blueprint history.', 'error');
    } finally {
      setLoadingHistory(false);
    }
  };

  // Duplicate Blueprint
  const handleDuplicate = async (bp) => {
    try {
      const res = await blueprintService.duplicate(bp.id, {
        new_title: `${bp.title} (Custom Clone)`,
      });
      if (res.success) {
        showToast(`Cloned blueprint: "${res.blueprint.title}"`, 'success');
        fetchBlueprints();
      }
    } catch (err) {
      console.error('[BlueprintManager] duplicate error:', err);
      showToast('Failed to duplicate blueprint.', 'error');
    }
  };

  // Deactivate Blueprint
  const handleDelete = async (bp) => {
    if (bp.is_default) {
      showToast('Default system blueprints cannot be deleted.', 'error');
      return;
    }
    if (!window.confirm(`Are you sure you want to deactivate blueprint "${bp.title}"?`)) return;

    try {
      const res = await blueprintService.remove(bp.id);
      if (res.success) {
        showToast(res.message || 'Blueprint deactivated.', 'success');
        fetchBlueprints();
      }
    } catch (err) {
      console.error('[BlueprintManager] delete error:', err);
      showToast('Failed to deactivate blueprint.', 'error');
    }
  };

  // Live Validate Payload
  const handleValidatePayload = async () => {
    try {
      const res = await blueprintService.validate(formData);
      setValidationResult(res);
      if (res.valid) {
        showToast('Blueprint configuration is valid!', 'success');
      } else {
        showToast('Validation errors detected in configuration.', 'error');
      }
    } catch (err) {
      console.error('[BlueprintManager] validate error:', err);
      showToast('Failed to validate blueprint.', 'error');
    }
  };

  // Save Blueprint
  const handleSaveBlueprint = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (isEditing && formData.id) {
        const res = await blueprintService.update(formData.id, formData);
        if (res.success) {
          showToast(`Blueprint updated to v${res.blueprint.version}`, 'success');
          setEditorModalOpen(false);
          fetchBlueprints();
        }
      } else {
        const res = await blueprintService.create(formData);
        if (res.success) {
          showToast(`Created blueprint "${res.blueprint.title}"`, 'success');
          setEditorModalOpen(false);
          fetchBlueprints();
        }
      }
    } catch (err) {
      console.error('[BlueprintManager] save error:', err);
      const errMsg = err?.response?.data?.errors?.[0] || err?.response?.data?.message || err.message;
      showToast(`Save failed: ${errMsg}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Subject question count total calculator
  const calculatedSubjectSum = useMemo(() => {
    if (!formData.subject_distribution) return 0;
    return Object.values(formData.subject_distribution).reduce((acc, v) => {
      const n = typeof v === 'object' ? Number(v.count || v.total || 0) : Number(v || 0);
      return acc + (isNaN(n) ? 0 : n);
    }, 0);
  }, [formData.subject_distribution]);

  return (
    <div className="space-y-6">
      {/* Top Action & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#0F172A] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-indigo-500" />
            Configurable Exam Blueprints
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Database-stored exam patterns. AI generators strictly follow these blueprints with zero prompt hardcoding.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={fetchBlueprints}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
            title="Refresh blueprints"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Create Blueprint</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Exam Type Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
          {['ALL', 'NEET', 'JEE', 'CUSTOM'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilterExamType(type)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterExamType === type
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {type === 'ALL' ? 'All Types' : type}
            </button>
          ))}
        </div>

        {/* Year Filter */}
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] py-2 px-3 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
        >
          <option value="ALL">All Exam Years</option>
          <option value="2026">2026 Pattern</option>
          <option value="2025">2025 Pattern</option>
          <option value="2024">2024 Pattern</option>
        </select>

        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blueprints by title, code, description..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Blueprints Grid */}
      {loading ? (
        <div className="py-16 text-center">
          <Spinner size="lg" className="mx-auto mb-3 text-blue-500" />
          <p className="text-xs font-bold text-slate-500">Loading exam blueprints from database...</p>
        </div>
      ) : filteredBlueprints.length === 0 ? (
        <div className="py-16 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-[#0F172A]">
          <FileSpreadsheet className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No exam blueprints found</p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting filters or create a new blueprint configuration template.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
          {filteredBlueprints.map((bp) => {
            const subjects = bp.subject_distribution || {};
            const isNeet = bp.exam_type === 'NEET';
            const isJee = bp.exam_type === 'JEE';

            return (
              <div
                key={bp.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-5 shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all"
              >
                <div>
                  {/* Header Badges */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg ${
                          isNeet
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : isJee
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                            : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                        }`}
                      >
                        {bp.exam_type}
                      </span>

                      {bp.exam_year && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {bp.exam_year}
                        </span>
                      )}

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {bp.class_level || 'Class 11+12'}
                      </span>

                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                        v{bp.version || 1}
                      </span>

                      {bp.is_default && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          Official Default
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-slate-400 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => handleOpenHistory(bp)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                        title="View Version History"
                      >
                        <History className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDuplicate(bp)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                        title="Duplicate Blueprint"
                      >
                        <Copy className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenEdit(bp)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-500 transition-colors cursor-pointer"
                        title="Edit Blueprint"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      {!bp.is_default && (
                        <button
                          type="button"
                          onClick={() => handleDelete(bp)}
                          className="p-1.5 rounded-lg hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 transition-colors cursor-pointer"
                          title="Deactivate Blueprint"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-sm font-black text-slate-900 dark:text-white mb-1">{bp.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                    {bp.description || 'Configured assessment blueprint with automated section allocation.'}
                  </p>

                  {/* Metrics Badges */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 mb-3 text-center">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Questions</p>
                      <p className="text-xs font-black text-slate-800 dark:text-slate-200">
                        {bp.total_questions} Qs
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Duration</p>
                      <p className="text-xs font-black text-slate-800 dark:text-slate-200">
                        {bp.duration_minutes} Mins
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Marking</p>
                      <p className="text-xs font-black text-slate-800 dark:text-slate-200">
                        +{bp.marks_per_question} / -{bp.negative_marking}
                      </p>
                    </div>
                  </div>

                  {/* Subject Distribution Pills */}
                  <div className="mb-3">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1.5 flex items-center gap-1">
                      <Layers className="h-3 w-3" />
                      Subject Allocation:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {typeof subjects === 'object' &&
                        Object.entries(subjects).map(([sub, count]) => {
                          const cnt = typeof count === 'object' ? count.count || count.total : count;
                          return (
                            <span
                              key={sub}
                              className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                            >
                              {sub}: <span className="text-blue-600 dark:text-blue-400 font-black">{cnt}</span>
                            </span>
                          );
                        })}
                    </div>
                  </div>

                  {/* Partial Marking / Optional rules note */}
                  {bp.optional_question_rules?.rule && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/40 p-2 rounded-lg border border-slate-100 dark:border-slate-800/60 mb-3 flex items-start gap-1.5">
                      <Info className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{bp.optional_question_rules.rule}</span>
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-400 font-mono">slug: {bp.slug}</span>
                  {onSelectBlueprint && (
                    <button
                      type="button"
                      onClick={() => onSelectBlueprint(bp)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-sm transition-all cursor-pointer"
                    >
                      <span>Load into Generator</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL: CREATE / EDIT BLUEPRINT                                        */}
      {/* ===================================================================== */}
      <Modal
        isOpen={editorModalOpen}
        onClose={() => setEditorModalOpen(false)}
        title={isEditing ? `Edit Exam Blueprint (v${formData.id ? 'new' : '1'})` : 'Create Exam Blueprint'}
        size="2xl"
      >
        <form onSubmit={handleSaveBlueprint} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Blueprint Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. NEET UG Official 2026 Blueprint"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2 px-3 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Slug / Code */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Unique Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="e.g. neet-ug-2026-official"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2 px-3 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Description & Pedagogical Scope
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe syllabus coverage, evaluation rules, and paper structure..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2 px-3 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Exam Type, Year, Class */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Exam Stream
              </label>
              <select
                value={formData.exam_type}
                onChange={(e) => setFormData((prev) => ({ ...prev, exam_type: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2 px-3 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="NEET">NEET UG</option>
                <option value="JEE">JEE Main</option>
                <option value="CUSTOM">Custom Institute Test</option>
                <option value="FOUNDATION">Foundation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Exam Year
              </label>
              <input
                type="text"
                value={formData.exam_year}
                onChange={(e) => setFormData((prev) => ({ ...prev, exam_year: e.target.value }))}
                placeholder="2026 or 2024-2026"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2 px-3 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Class Level
              </label>
              <select
                value={formData.class_level}
                onChange={(e) => setFormData((prev) => ({ ...prev, class_level: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2 px-3 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Class 11+12">Class 11+12 (Full)</option>
                <option value="Class 11">Class 11 Only</option>
                <option value="Class 12">Class 12 Only</option>
              </select>
            </div>
          </div>

          {/* Counts, Duration & Marking */}
          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Total Questions <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.total_questions}
                onChange={(e) => setFormData((prev) => ({ ...prev, total_questions: Number(e.target.value) || 0 }))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2 px-3 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Duration (Mins) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.duration_minutes}
                onChange={(e) => setFormData((prev) => ({ ...prev, duration_minutes: Number(e.target.value) || 0 }))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2 px-3 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Marks / Correct
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={formData.marks_per_question}
                onChange={(e) => setFormData((prev) => ({ ...prev, marks_per_question: Number(e.target.value) || 4 }))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2 px-3 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Negative / Wrong
              </label>
              <input
                type="number"
                step="0.25"
                min="0"
                value={formData.negative_marking}
                onChange={(e) => setFormData((prev) => ({ ...prev, negative_marking: Number(e.target.value) || 0 }))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2 px-3 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Subject Distribution */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-slate-800 dark:text-slate-200">
                Subject Question Distribution
              </label>
              <span
                className={`text-xs font-black ${
                  calculatedSubjectSum === Number(formData.total_questions)
                    ? 'text-emerald-500'
                    : 'text-amber-500'
                }`}
              >
                Sum: {calculatedSubjectSum} / {formData.total_questions} Qs
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {Object.keys(formData.subject_distribution || {}).map((sub) => (
                <div key={sub}>
                  <span className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    {sub}
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={formData.subject_distribution[sub] || 0}
                    onChange={(e) => {
                      const val = Number(e.target.value) || 0;
                      setFormData((prev) => ({
                        ...prev,
                        subject_distribution: {
                          ...prev.subject_distribution,
                          [sub]: val,
                        },
                      }));
                    }}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-1.5 px-2 text-xs font-bold text-slate-900 dark:text-white text-center focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Partial Marking Configuration */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Enable Partial Marking</p>
              <p className="text-[11px] text-slate-500">Allow fractional marks (+1, +2) on multi-select or multi-part questions.</p>
            </div>
            <input
              type="checkbox"
              checked={Boolean(formData.partial_marking?.enabled)}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  partial_marking: {
                    ...prev.partial_marking,
                    enabled: e.target.checked,
                  },
                }))
              }
              className="h-4 w-4 rounded text-blue-600 cursor-pointer"
            />
          </div>

          {/* Change Summary note for audit versioning */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Version Change Summary / Audit Note
            </label>
            <input
              type="text"
              value={formData.change_summary}
              onChange={(e) => setFormData((prev) => ({ ...prev, change_summary: e.target.value }))}
              placeholder="e.g. Adjusted Section B optional bounds for 2026 session"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2 px-3 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Validation Feedback */}
          {validationResult && (
            <div
              className={`p-3 rounded-xl text-xs ${
                validationResult.valid
                  ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold mb-1">
                {validationResult.valid ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                <span>{validationResult.valid ? 'Valid Blueprint' : 'Blueprint Validation Issues'}</span>
              </div>
              {validationResult.errors?.map((err, i) => (
                <p key={i}>• {err}</p>
              ))}
              {validationResult.warnings?.map((w, i) => (
                <p key={i} className="text-amber-500">• Warning: {w}</p>
              ))}
            </div>
          )}

          {/* Modal Actions */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleValidatePayload}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Validate Rules
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditorModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                {saving && <Spinner size="sm" />}
                <span>{isEditing ? 'Save as New Version' : 'Create Blueprint'}</span>
              </button>
            </div>
          </div>
        </form>
      </Modal>

      {/* ===================================================================== */}
      {/* MODAL: VERSION HISTORY & AUDIT TRAIL                                  */}
      {/* ===================================================================== */}
      <Modal
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        title={`Version History: ${selectedBlueprintHistory?.blueprint?.title || 'Exam Blueprint'}`}
        size="lg"
      >
        {loadingHistory ? (
          <div className="py-12 text-center">
            <Spinner size="md" className="mx-auto mb-2 text-blue-500" />
            <p className="text-xs font-bold text-slate-500">Loading audit trail...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span>Current Live Version: <strong className="text-slate-800 dark:text-slate-200 font-black">v{selectedBlueprintHistory?.blueprint?.version || 1}</strong></span>
              <span>Total Snapshots: {selectedBlueprintHistory?.history?.length || 0}</span>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {selectedBlueprintHistory?.history?.map((h) => (
                <div
                  key={h.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                      Version {h.version}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(h.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {h.change_summary || 'Snapshot recorded'}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Changed by: <span className="font-mono">{h.changed_by || 'system'}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
