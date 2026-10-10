import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  assessmentService,
  questionService,
  sectionService,
  adminService,
  questionBankService,
} from '../../lib/services.js';
import { LoadingScreen, ErrorState, Badge, Spinner, EmptyState } from '../../components/ui.jsx';
import Modal from '../../components/Modal.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { formatDate } from '../../lib/format.js';
import { CSV_TEMPLATE, readFileAsText } from '../../lib/csv.js';
import QuestionImageUploader from '../../components/common/QuestionImageUploader.jsx';
import DateTimePickerWithAmPm from '../../components/common/DateTimePickerWithAmPm.jsx';
import { ChevronDown, Check, Copy, Download, Code, Zap, Image as ImageIcon, Upload, X, ArrowUp, ArrowDown, Move, Plus } from 'lucide-react';
import MathRenderer from '../../components/common/MathRenderer.jsx';
import { getMediaUrl } from '../../lib/media.js';

const toDatetimeLocal = (isoString) => {
  if (!isoString) return '';
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const TABS = [
  { id: 'general', label: 'General Settings' },
  { id: 'questions', label: 'Questions' },
  { id: 'sections', label: 'Sections' },
  { id: 'candidates', label: 'Candidates' },
  { id: 'invitations', label: 'Invitations' },
];

const ASSERTION_REASON_OPTIONS = [
  'Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation of Assertion (A)',
  'Both Assertion (A) and Reason (R) are true but Reason (R) is NOT the correct explanation of Assertion (A)',
  'Assertion (A) is true but Reason (R) is false',
  'Assertion (A) is false but Reason (R) is true',
];

const QUESTION_TYPES = [
  { id: 'mcq', label: 'Single correct MCQ' },
  { id: 'multi_select', label: 'Multiple correct MCQ' },
  { id: 'integer', label: 'Integer type' },
  { id: 'numerical', label: 'Numerical answer type' },
  { id: 'assertion_reason', label: 'Assertion-reason type' },
  { id: 'coding', label: 'Coding' },
  { id: 'subjective', label: 'Subjective' },
];

const SECTION_TYPES = [
  { value: 'aptitude', label: 'Aptitude' },
  { value: 'technical_mcq', label: 'Technical MCQ' },
  { value: 'coding', label: 'Coding' },
  { value: 'subjective', label: 'Subjective' },
];

const normalizeOptions = (rawList, type) => {
  let list = Array.isArray(rawList) ? rawList : [];
  if (typeof rawList === 'string') {
    try {
      list = JSON.parse(rawList);
    } catch {
      list = [];
    }
  }
  if (!list.length) {
    list = type === 'assertion_reason' ? [...ASSERTION_REASON_OPTIONS] : ['', ''];
  }
  return list.map((opt, idx) => {
    if (typeof opt === 'object' && opt !== null) {
      const img = opt.image_url || (Array.isArray(opt.media) && opt.media[0]?.url) || '';
      return {
        key: opt.key || String.fromCharCode(65 + idx),
        text: opt.text != null ? String(opt.text) : '',
        image_url: img,
        media: Array.isArray(opt.media) && opt.media.length > 0 ? opt.media : (img ? [{ id: `opt-${idx}-img`, type: 'diagram', url: img }] : []),
      };
    }
    return {
      key: String.fromCharCode(65 + idx),
      text: String(opt ?? ''),
      image_url: '',
      media: [],
    };
  });
};

const emptyForm = (type) => ({
  question_type: type,
  question_text: '',
  options: normalizeOptions([], type),
  correct_index: 0,
  correct_indices: [],
  numeric_answer: type === 'integer' || type === 'numerical' ? 0 : null,
  numerical_tolerance: type === 'numerical' ? 0.01 : 0,
  assertion_text: '',
  reason_text: '',
  marks: type === 'coding' ? 4 : 4,
  negative_marks: 0,
  original_question_number: '',
  section_id: null,
  starter_code: 'function solution() {\n  \n}\n',
  test_cases: [{ input: '', expected: '' }],
  solution: '',
  image_url: '',
  solution_image_url: '',
  subject_id: null,
  chapter_id: null,
  difficulty: 'medium',
});

export default function AssessmentEditor() {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [tab, setTab] = useState('general');
  const [assessment, setAssessment] = useState(null);
  const [sections, setSections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [invites, setInvites] = useState([]);
  const [state, setState] = useState('loading');
  const [settings, setSettings] = useState(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [ebooks, setEbooks] = useState([]);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const [data, ebList] = await Promise.all([
        assessmentService.getAdmin(assessmentId),
        (adminService.ebooks ? adminService.ebooks() : adminService.getEbooks?.() || Promise.resolve([])).catch(() => [])
      ]);
      setAssessment(data.assessment);
      setSections(data.sections || []);
      setQuestions(data.questions || []);
      setInvites(data.invites || []);
      setEbooks(Array.isArray(ebList) ? ebList : (ebList?.ebooks || []));
      setSettings({
        title: data.assessment.title,
        description: data.assessment.description || '',
        instructions: data.assessment.instructions || '',
        duration_minutes: data.assessment.duration_minutes,
        passing_marks: data.assessment.passing_marks,
        max_violations: data.assessment.max_violations,
        result_visible: data.assessment.result_visible,
        negative_marking: data.assessment.negative_marking || false,
        negative_marks_per_wrong: Number(data.assessment.negative_marks_per_wrong) || 0.25,
        available_from: data.assessment.available_from ? toDatetimeLocal(data.assessment.available_from) : '',
        available_until: data.assessment.available_until ? toDatetimeLocal(data.assessment.available_until) : '',
        recommended_ebook_id: data.assessment.recommended_ebook_id || '',
      });
      setState('done');
    } catch (err) {
      console.error('[AssessmentEditor load error]', err);
      setState('error');
    }
  }, [assessmentId]);

  useEffect(() => { load(); }, [load]);

  const totalMarks = questions.reduce((s, q) => s + q.marks, 0);
  const canPublish = questions.length > 0;

  const handlePublish = async () => {
    if (!canPublish && !assessment.is_published) {
      toast.error('Add at least one question before publishing.');
      setTab('questions');
      return;
    }
    try {
      const updated = await assessmentService.togglePublish(assessmentId, !assessment.is_published);
      setAssessment(updated);
      toast.success(updated.is_published ? 'Assessment published' : 'Assessment unpublished');
    } catch (err) {
      toast.error(err.message || 'Publish failed');
    }
  };

  const openPreview = async () => {
    try {
      setPreviewData(await assessmentService.preview(assessmentId));
      setPreviewOpen(true);
    } catch (err) {
      toast.error(err.message || 'Preview failed');
    }
  };

  if (state === 'loading') return <LoadingScreen label="Loading assessment builder…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  return (
    <div>
      <Link to="/admin/assessments" className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
        ← Back to Assessments
      </Link>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{assessment.title}</h1>
            {assessment.is_published ? <Badge color="green">Published</Badge> : <Badge color="slate">Draft</Badge>}
          </div>
          <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
            {questions.length} questions · {totalMarks} marks · {invites.length} invitations
          </p>
          {!canPublish && !assessment.is_published && (
            <p className="mt-2 text-xs font-bold text-amber-500">Add at least one question to publish this assessment.</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-secondary" onClick={openPreview}>👁️ Preview</button>
          <button type="button" className={assessment.is_published ? 'btn-secondary text-amber-600 dark:text-amber-400' : 'btn-primary'} onClick={handlePublish}>
            {assessment.is_published ? 'Unpublish' : 'Publish'}
          </button>
        </div>
      </div>

      <nav className="mb-6 flex flex-wrap gap-1 border-b border-slate-200 dark:border-slate-800">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`border-b-2 px-4 py-2.5 text-xs sm:text-sm font-extrabold transition-all duration-150 ${
              tab === t.id
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === 'general' && (
        <GeneralTab settings={settings} setSettings={setSettings} saving={savingSettings} ebooks={ebooks}
          onSave={async (e) => {
            e.preventDefault();
            setSavingSettings(true);
            try {
              const payload = {
                title: settings.title,
                description: settings.description,
                instructions: settings.instructions,
                duration_minutes: settings.duration_minutes,
                passing_marks: settings.passing_marks === '' || settings.passing_marks === null || isNaN(Number(settings.passing_marks)) ? 0 : Number(settings.passing_marks),
                max_violations: settings.max_violations,
                negative_marks_per_wrong: settings.negative_marks_per_wrong,
                result_visible: settings.result_visible,
                available_from: settings.available_from ? new Date(settings.available_from).toISOString() : null,
                available_until: settings.available_until ? new Date(settings.available_until).toISOString() : null,
                recommended_ebook_id: settings.recommended_ebook_id ? Number(settings.recommended_ebook_id) : null,
              };
              setAssessment(await assessmentService.update(assessmentId, payload));
              toast.success('Settings saved');
            } catch (err) {
              toast.error(err.message || 'Save failed');
            } finally {
              setSavingSettings(false);
            }
          }}
          onChange={(e) => {
            const { name, value, type, checked } = e.target;
            setSettings((s) => ({
              ...s,
              [name]: type === 'checkbox' ? checked : ['duration_minutes', 'passing_marks', 'max_violations', 'negative_marks_per_wrong'].includes(name) ? Number(value) : value,
            }));
          }}
        />
      )}

      {tab === 'questions' && (
        <QuestionsTab assessmentId={assessmentId} assessment={assessment} questions={questions} sections={sections} onReload={load} toast={toast} />
      )}

      {tab === 'sections' && (
        <SectionsTab assessmentId={assessmentId} sections={sections} onReload={load} toast={toast} />
      )}

      {tab === 'candidates' && (
        <CandidatesTab invites={invites} />
      )}

      {tab === 'invitations' && (
        <InvitationsTab assessmentId={assessmentId} invites={invites} canInvite={canPublish || assessment.is_published}
          onReload={load} toast={toast} />
      )}

      <PreviewModal open={previewOpen} onClose={() => setPreviewOpen(false)} data={previewData} />
    </div>
  );
}

function GeneralTab({ settings, onChange, onSave, saving, ebooks = [] }) {
  return (
    <form onSubmit={onSave} className="card max-w-2xl space-y-5 p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
      <h2 className="text-base font-extrabold text-slate-900 dark:text-white">General Settings</h2>
      <div>
        <label className="label">Title</label>
        <input name="title" className="input" value={settings.title} onChange={onChange} required />
      </div>
      <div>
        <label className="label">Description</label>
        <textarea name="description" rows={3} className="input" value={settings.description} onChange={onChange} />
      </div>
      <div>
        <label className="label">Instructions (shown to candidates)</label>
        <textarea name="instructions" rows={4} className="input" value={settings.instructions} onChange={onChange} />
      </div>

      <div>
        <label className="label">Recommended Study eBook / Notes</label>
        <select
          name="recommended_ebook_id"
          className="input"
          value={settings.recommended_ebook_id || ''}
          onChange={onChange}
        >
          <option value="">None (No linked eBook)</option>
          {ebooks.map((eb) => (
            <option key={eb.id} value={eb.id}>
              {eb.title} {eb.subject ? `(${eb.subject})` : ''}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          Enrolled students will see this study material in their Study Library and directly linked with this test.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="label">Duration (min)</label>
          <input name="duration_minutes" type="number" min={1} className="input" value={settings.duration_minutes} onChange={onChange} />
        </div>
        <div>
          <label className="label">
            Passing Marks <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500">(Optional)</span>
          </label>
          <input
            name="passing_marks"
            type="number"
            min={0}
            className="input"
            value={settings.passing_marks ?? ''}
            onChange={onChange}
            placeholder="0 (None for JEE/NEET)"
          />
        </div>
        <div>
          <label className="label">Max violations</label>
          <input name="max_violations" type="number" min={0} className="input" value={settings.max_violations} onChange={onChange} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label">Available from (optional start time)</label>
          <DateTimePickerWithAmPm
            name="available_from"
            value={settings.available_from || ''}
            onChange={onChange}
          />
        </div>
        <div>
          <label className="label">Available until (optional end time)</label>
          <DateTimePickerWithAmPm
            name="available_until"
            value={settings.available_until || ''}
            onChange={onChange}
          />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="result_visible" checked={settings.result_visible} onChange={onChange} className="h-4 w-4 rounded" />
        Show results to candidates after submission
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="negative_marking" checked={settings.negative_marking} onChange={onChange} className="h-4 w-4 rounded" />
        Enable negative marking (Standard CBT style)
      </label>
      {settings.negative_marking && (
        <div className="max-w-xs">
          <label className="label">Marks deducted per wrong answer</label>
          <input name="negative_marks_per_wrong" type="number" min={0} max={10} step={0.25} className="input" value={settings.negative_marks_per_wrong} onChange={onChange} />
        </div>
      )}
      <button type="submit" className="btn-primary" disabled={saving}>
        {saving ? <Spinner className="h-4 w-4 text-white" /> : 'Save settings'}
      </button>
    </form>
  );
}

function QuestionsTab({ assessmentId, assessment, questions, sections, onReload, toast }) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [lastSubjectId, setLastSubjectId] = useState(null);
  const [lastChapterId, setLastChapterId] = useState(null);
  const [form, setForm] = useState(emptyForm('mcq'));
  const [saving, setSaving] = useState(false);
  const [highlightedQuestionId, setHighlightedQuestionId] = useState(null);
  const [reordering, setReordering] = useState(false);
  const [duplicating, setDuplicating] = useState(false);
  const [moveToPosModal, setMoveToPosModal] = useState({ open: false, question: null });
  const [insertMeta, setInsertMeta] = useState(null);
  const [bankOpen, setBankOpen] = useState(false);
  const [bankCategory, setBankCategory] = useState('Physics');
  const [bankQuestions, setBankQuestions] = useState([]);
  const [categories, setCategories] = useState(['Physics', 'Chemistry', 'Mathematics', 'Botany', 'Zoology']);
  const [csvOpen, setCsvOpen] = useState(false);
  const [csvText, setCsvText] = useState(CSV_TEMPLATE);
  const [uploading, setUploading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [includeAnswers, setIncludeAnswers] = useState(true);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [keyModalOpen, setKeyModalOpen] = useState(false);
  const [keyFile, setKeyFile] = useState(null);
  const [keyUploading, setKeyUploading] = useState(false);
  const [jsonModalOpen, setJsonModalOpen] = useState(false);
  const [jsonQuestionsData, setJsonQuestionsData] = useState(null);
  const [jsonLoading, setJsonLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkMarksOpen, setBulkMarksOpen] = useState(false);
  const [bulkMarksValue, setBulkMarksValue] = useState(4);
  const [bulkScope, setBulkScope] = useState('all');
  const [bulkSectionId, setBulkSectionId] = useState('all');
  const [bulkQuestionType, setBulkQuestionType] = useState('all');
  const [bulkUpdating, setBulkUpdating] = useState(false);
  const [inlineMarkInput, setInlineMarkInput] = useState(4);
  const [inlineUpdating, setInlineUpdating] = useState(false);

  const isLocked = Boolean(assessment?.attempt_count > 0 || assessment?.is_locked);
  const attemptCount = Number(assessment?.attempt_count || 0);

  useEffect(() => {
    if (!highlightedQuestionId) return;
    const el = document.getElementById(`question-card-${highlightedQuestionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    const timer = setTimeout(() => {
      setHighlightedQuestionId(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [highlightedQuestionId]);

  const handleDuplicateAsDraft = async () => {
    setDuplicating(true);
    try {
      const res = await assessmentService.duplicate(assessmentId);
      toast.success('Test duplicated into a new draft! Redirecting...');
      navigate(`/admin/assessments/${res.assessment.id}`);
    } catch (err) {
      toast.error(err.message || 'Failed to duplicate test');
    } finally {
      setDuplicating(false);
    }
  };

  const partitionHelper = useMemo(() => {
    const sorted = [...questions].sort((a, b) => (Number(a.position) || 0) - (Number(b.position) || 0) || a.id - b.id);
    const getPartKey = (q) => `${q.section_id || 'none'}::${(q.subject || 'General').trim().toLowerCase()}`;

    const partitionsMap = new Map();
    const partitionKeys = [];

    sorted.forEach((q) => {
      const key = getPartKey(q);
      if (!partitionsMap.has(key)) {
        partitionsMap.set(key, []);
        partitionKeys.push(key);
      }
      partitionsMap.get(key).push(q);
    });

    const questionMetaMap = new Map();

    sorted.forEach((q, globalIdx) => {
      const key = getPartKey(q);
      const partList = partitionsMap.get(key);
      const secIdx = partList.findIndex((item) => item.id === q.id);
      const secPos = secIdx + 1;
      const secTotal = partList.length;

      let secName = q.section_name || '';
      if (!secName && q.section_id) {
        const matchingSec = sections.find((s) => s.id === q.section_id);
        secName = matchingSec ? matchingSec.name : `Section ${q.section_id}`;
      }
      const subjectName = q.subject || 'General';
      const sectionLabel = secName ? `${subjectName} • ${secName}` : subjectName;

      questionMetaMap.set(q.id, {
        globalIndex: globalIdx,
        displayNumber: globalIdx + 1,
        partKey: key,
        secIndex: secIdx,
        secPosition: secPos,
        secTotal: secTotal,
        canMoveUp: secIdx > 0,
        canMoveDown: secIdx < secTotal - 1,
        sectionLabel,
        partQuestions: partList,
      });
    });

    return {
      sortedQuestions: sorted,
      partitionsMap,
      partitionKeys,
      questionMetaMap,
    };
  }, [questions, sections]);

  const toggleSelectQuestion = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === questions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(questions.map((q) => q.id));
    }
  };

  const handleApplyBulkMarks = async () => {
    const marksNum = Number(bulkMarksValue);
    if (isNaN(marksNum) || marksNum <= 0) {
      toast.error('Please enter a valid marks value (> 0)');
      return;
    }
    setBulkUpdating(true);
    try {
      const payload = { marks: marksNum };
      if (bulkScope === 'selected') {
        if (!selectedIds.length) {
          toast.error('No questions selected');
          setBulkUpdating(false);
          return;
        }
        payload.question_ids = selectedIds;
      } else if (bulkScope === 'section') {
        if (bulkSectionId !== 'all') {
          payload.section_id = bulkSectionId === 'none' ? null : Number(bulkSectionId);
        }
      } else if (bulkScope === 'type') {
        if (bulkQuestionType !== 'all') {
          payload.question_type = bulkQuestionType;
        }
      }

      const res = await questionService.bulkUpdateMarks(assessmentId, payload);
      toast.success(res.message || `Updated marks to ${marksNum} for ${res.updated_count} questions`);
      setBulkMarksOpen(false);
      setSelectedIds([]);
      onReload();
    } catch (err) {
      toast.error(err.message || 'Failed to bulk update marks');
    } finally {
      setBulkUpdating(false);
    }
  };

  const handleQuickInlineMarks = async (marksVal) => {
    const marksNum = Number(marksVal);
    if (isNaN(marksNum) || marksNum <= 0) {
      toast.error('Please enter a valid marks value (> 0)');
      return;
    }
    if (selectedIds.length === 0) {
      toast.error('Please select at least one question');
      return;
    }
    setInlineUpdating(true);
    try {
      const res = await questionService.bulkUpdateMarks(assessmentId, {
        marks: marksNum,
        question_ids: selectedIds,
      });
      toast.success(res.message || `Updated marks to ${marksNum} for ${selectedIds.length} questions`);
      setSelectedIds([]);
      onReload();
    } catch (err) {
      toast.error(err.message || 'Failed to update marks');
    } finally {
      setInlineUpdating(false);
    }
  };

  const handleKeyUpload = async (e) => {
    e.preventDefault();
    if (!keyFile) return toast.error('Please select an answer key PDF file');
    setKeyUploading(true);
    const reader = new FileReader();
    reader.onload = async (uploadEvent) => {
      try {
        const res = await adminService.uploadTestFile(assessmentId, {
          file_type: 'answer_key',
          file_name: keyFile.name,
          file_base64: uploadEvent.target.result,
        });
        toast.success(res.message || 'Answer key uploaded and applied successfully!');
        setKeyModalOpen(false);
        setKeyFile(null);
        onReload();
      } catch (err) {
        toast.error(err.message || 'Answer key upload failed');
      } finally {
        setKeyUploading(false);
      }
    };
    reader.readAsDataURL(keyFile);
  };

  const handlePdfUpload = async (e) => {
    e.preventDefault();
    if (!pdfFile) return toast.error('Please select a PDF file');
    if (!pdfFile.name.toLowerCase().endsWith('.pdf')) {
      return toast.error('Selected file is not a PDF (.pdf). Please upload a valid PDF file.');
    }

    setPdfUploading(true);
    const reader = new FileReader();
    reader.onload = async (uploadEvent) => {
      try {
        const res = await adminService.uploadTestFile(assessmentId, {
          file_type: 'question_paper',
          file_name: pdfFile.name,
          file_base64: uploadEvent.target.result,
          include_answers: includeAnswers,
        });

        toast.success(res.message || `Successfully extracted ${res.extractedCount || 0} questions with options!`);
        if (res.warnings && res.warnings.length > 0) {
          if (typeof toast.warning === 'function') {
            toast.warning(`Note: ${res.warnings.length} question(s) flagged for review.`);
          } else if (typeof toast.info === 'function') {
            toast.info(`Note: ${res.warnings.length} question(s) flagged for review.`);
          }
        }
        setPdfOpen(false);
        setPdfFile(null);
        if (res.extractedQuestions && res.extractedQuestions.length > 0) {
          setJsonQuestionsData(res.extractedQuestions);
        }
        await onReload();
      } catch (err) {
        const serverMsg = err?.response?.data?.message || err?.response?.data?.error;
        toast.error(serverMsg || err.message || 'PDF extraction failed. Please check the file format and try again.');
      } finally {
        setPdfUploading(false);
      }
    };
    reader.readAsDataURL(pdfFile);
  };

  const handleOpenExtractedJson = async () => {
    if (jsonQuestionsData && jsonQuestionsData.length > 0) {
      setJsonModalOpen(true);
      return;
    }
    setJsonLoading(true);
    try {
      const res = await adminService.getTestExtractedQuestions(assessmentId);
      if (res.questions && res.questions.length > 0) {
        setJsonQuestionsData(res.questions);
        setJsonModalOpen(true);
      } else {
        toast.error('No extracted questions found for this test yet. Please upload a PDF first.');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to fetch extracted JSON data');
    } finally {
      setJsonLoading(false);
    }
  };

  const handleCopyJson = () => {
    if (!jsonQuestionsData) return;
    const jsonStr = JSON.stringify(jsonQuestionsData, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    toast.success('Extracted JSON copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    if (!jsonQuestionsData) return;
    const jsonStr = JSON.stringify(jsonQuestionsData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assessment_${assessmentId}_extracted_questions.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded questions JSON file');
  };

  useEffect(() => {
    questionBankService.categories().then((res) => {
      if (res?.categories?.length) {
        setCategories(res.categories.map((c) => c.name));
      }
    }).catch(() => {});
  }, []);

  const openAdd = (type) => {
    setEditing(null);
    setInsertMeta(null);
    const f = emptyForm(type);
    const sec = sections.find((s) => s.section_type.includes(type === 'mcq' || type === 'multi_select' ? 'mcq' : type)) || sections[0];
    setForm({
      ...f,
      options: normalizeOptions(f.options, type),
      section_id: sec?.id || null,
      subject_id: lastSubjectId || form.subject_id || null,
      chapter_id: lastChapterId || form.chapter_id || null,
    });
    setModalOpen(true);
  };

  const openEdit = (q) => {
    setEditing(q);
    setInsertMeta(null);
    const opts = normalizeOptions(q.options, q.question_type);
    const indices = Array.isArray(q.correct_indices) ? q.correct_indices : [];
    const subjId = q.subject_id ? Number(q.subject_id) : null;
    const chapId = q.chapter_id ? Number(q.chapter_id) : null;
    if (subjId) setLastSubjectId(subjId);
    if (chapId) setLastChapterId(chapId);

    setForm({
      question_type: q.question_type || 'mcq',
      question_text: q.question_text,
      options: opts,
      correct_index: q.correct_index ?? 0,
      correct_indices: indices,
      numeric_answer: q.numeric_answer ?? (q.question_type === 'integer' || q.question_type === 'numerical' ? 0 : null),
      numerical_tolerance: q.numerical_tolerance ?? (q.question_type === 'numerical' ? 0.01 : 0),
      assertion_text: q.assertion_text || '',
      reason_text: q.reason_text || '',
      marks: q.marks ?? 4,
      section_id: q.section_id,
      starter_code: q.starter_code || '',
      test_cases: q.test_cases?.length ? q.test_cases : [{ input: '', expected: '' }],
      solution: q.solution || '',
      image_url: q.image_url || '',
      solution_image_url: q.solution_image_url || '',
      subject_id: subjId,
      subject: q.subject || '',
      chapter_id: chapId,
      topic: q.topic || '',
      difficulty: q.difficulty || 'medium',
      negative_marks: q.negative_marks ?? 0,
      original_question_number: q.original_question_number || '',
    });
    setModalOpen(true);
  };

  const handleInsertQuestionAt = (q, mode) => {
    if (isLocked) {
      toast.error('Question structure is locked because students have attempted this test. Duplicate to a draft to edit.');
      return;
    }
    const meta = partitionHelper.questionMetaMap.get(q.id);
    if (!meta) return;
    setEditing(null);

    const defaultType = q.question_type || 'mcq';
    const f = emptyForm(defaultType);

    const targetPos = mode === 'before' ? meta.displayNumber : meta.displayNumber + 1;
    const targetSecPos = mode === 'before' ? meta.secPosition : meta.secPosition + 1;

    setInsertMeta({
      mode,
      referenceQuestionId: q.id,
      targetPosition: targetPos,
      targetSecPosition: targetSecPos,
      displayNumber: targetPos,
      referenceDisplayNumber: meta.displayNumber,
      sectionLabel: meta.sectionLabel,
    });

    setForm({
      ...f,
      options: normalizeOptions([], defaultType),
      section_id: q.section_id || null,
      subject_id: q.subject_id || lastSubjectId || null,
      subject: q.subject || '',
      chapter_id: q.chapter_id || lastChapterId || null,
      topic: q.topic || '',
      marks: q.marks || 4,
      negative_marks: q.negative_marks ?? 0,
      original_question_number: '',
      target_position: targetPos,
      insert_mode: mode,
      reference_question_id: q.id,
    });

    setModalOpen(true);
  };

  const handleReorderWithinSection = async (q, targetSecPos) => {
    if (reordering) return;
    if (isLocked) {
      toast.error('Question ordering is locked because students have attempted this test. Duplicate to a draft to edit.');
      return;
    }
    const meta = partitionHelper.questionMetaMap.get(q.id);
    if (!meta || targetSecPos === meta.secPosition) return;
    if (targetSecPos < 1 || targetSecPos > meta.secTotal) return;

    setReordering(true);
    const key = meta.partKey;
    const partQuestions = [...partitionHelper.partitionsMap.get(key)];
    const currentSecIdx = meta.secIndex;
    const targetSecIdx = targetSecPos - 1;

    const [movedItem] = partQuestions.splice(currentSecIdx, 1);
    partQuestions.splice(targetSecIdx, 0, movedItem);

    const newFullList = [];
    for (const pKey of partitionHelper.partitionKeys) {
      if (pKey === key) {
        newFullList.push(...partQuestions);
      } else {
        newFullList.push(...partitionHelper.partitionsMap.get(pKey));
      }
    }

    const payload = newFullList.map((item, idx) => ({
      id: Number(item.id),
      position: idx + 1,
    }));

    try {
      await questionService.reorder(assessmentId, payload, assessment?.updated_at || null);
      setHighlightedQuestionId(q.id);
      const targetDisplay = meta.globalIndex - meta.secIndex + targetSecPos;
      toast.success(`Question moved to Position #${targetSecPos} (Displays as Q${targetDisplay})`);
      await onReload();
    } catch (err) {
      toast.error(err.message || 'Failed to reorder questions');
      await onReload();
    } finally {
      setReordering(false);
      setMoveToPosModal({ open: false, question: null });
    }
  };

  const handleDeleteQuestion = async (q) => {
    if (isLocked) {
      toast.error('Question structure is locked because students have attempted this test. Duplicate to a draft to edit.');
      return;
    }
    const meta = partitionHelper.questionMetaMap.get(q.id);
    const qNum = meta?.displayNumber || q.position;
    if (!window.confirm(`Delete Question Q${qNum}? All subsequent questions will shift back automatically.`)) return;
    try {
      await questionService.remove(q.id);
      toast.success(`Question Q${qNum} deleted. Subsequent questions renumbered.`);
      await onReload();
    } catch (err) {
      toast.error(err.message || 'Failed to delete question');
    }
  };

  const saveQuestion = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (form.subject_id) setLastSubjectId(form.subject_id);
      if (form.chapter_id) setLastChapterId(form.chapter_id);

      const isChoiceType = ['mcq', 'single_choice', 'multi_select', 'assertion_reason'].includes(form.question_type);

      const processedOptions = isChoiceType
        ? (form.options || []).map((o, idx) => {
            const text = typeof o === 'object' ? (o.text ?? '') : String(o ?? '');
            const imgUrl = typeof o === 'object' ? (o.image_url || (Array.isArray(o.media) && o.media[0]?.url) || '') : '';
            const key = (typeof o === 'object' && o.key) ? o.key : String.fromCharCode(65 + idx);
            const media = (typeof o === 'object' && Array.isArray(o.media) && o.media.length > 0)
              ? o.media.map((m) => (typeof m === 'object' ? { ...m, url: imgUrl || m.url } : { type: 'diagram', url: imgUrl }))
              : (imgUrl ? [{ id: `opt-${idx}-img`, type: 'diagram', url: imgUrl }] : []);

            return {
              key,
              text: String(text).trim(),
              image_url: imgUrl.trim() || null,
              media,
            };
          }).filter((o) => o.text || o.image_url)
        : [];

      const payload = {
        ...form,
        image_url: form.image_url || null,
        solution_image_url: form.solution_image_url || null,
        subject_id: form.subject_id || null,
        subject: form.subject || '',
        chapter_id: form.chapter_id || null,
        topic: form.topic || '',
        section_id: form.section_id || null,
        options: processedOptions,
        correct_index: isChoiceType ? (form.correct_index ?? 0) : null,
        correct_indices: isChoiceType ? (form.correct_indices || []) : [],
        numeric_answer: form.numeric_answer != null && form.numeric_answer !== '' ? Number(form.numeric_answer) : null,
        numerical_tolerance: form.numerical_tolerance != null && form.numerical_tolerance !== '' ? Number(form.numerical_tolerance) : 0,
        negative_marks: form.negative_marks != null && form.negative_marks !== '' ? Number(form.negative_marks) : 0,
        original_question_number: form.original_question_number ? String(form.original_question_number).trim() : null,
        target_position: insertMeta?.targetPosition || form.target_position || null,
        insert_mode: insertMeta?.mode || form.insert_mode || null,
        reference_question_id: insertMeta?.referenceQuestionId || form.reference_question_id || null,
        client_updated_at: assessment?.updated_at || null,
      };
      if (['mcq', 'single_choice', 'multi_select'].includes(payload.question_type) && payload.options.length < 2) {
        toast.error('Need at least 2 options');
        setSaving(false);
        return;
      }
      if (payload.question_type === 'multi_select' && (!payload.correct_indices?.length)) {
        toast.error('Select at least one correct answer');
        setSaving(false);
        return;
      }
      if ((payload.question_type === 'integer' || payload.question_type === 'numerical') && (payload.numeric_answer === null || Number.isNaN(payload.numeric_answer))) {
        toast.error('Please enter a valid numeric answer');
        setSaving(false);
        return;
      }
      if (editing) {
        await questionService.update(editing.id, payload);
        toast.success('Question updated');
        setHighlightedQuestionId(editing.id);
      } else {
        const res = await questionService.create(assessmentId, payload);
        if (res?.id) setHighlightedQuestionId(res.id);
        toast.success(
          insertMeta
            ? `Question inserted at Q${insertMeta.displayNumber} successfully`
            : 'Question added'
        );
      }
      setModalOpen(false);
      setInsertMeta(null);
      await onReload();
    } catch (err) {
      toast.error(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const loadBank = async (cat) => {
    setBankCategory(cat);
    try {
      const res = await questionBankService.categories();
      if (res?.categories?.length) {
        setCategories(res.categories.map((c) => c.name));
      }
      const questionsList = await questionBankService.list(cat);
      setBankQuestions(Array.isArray(questionsList) ? questionsList : (questionsList?.questions || []));
      setBankOpen(true);
    } catch (err) {
      toast.error(err.message || 'Could not load question bank');
    }
  };

  const importBank = async (bankId) => {
    try {
      await questionBankService.import(bankId, assessmentId, form.section_id || sections[0]?.id);
      toast.success('Question imported from bank');
      setBankOpen(false);
      onReload();
    } catch (err) {
      toast.error(err.message || 'Import failed');
    }
  };

  const uploadCsv = async () => {
    setUploading(true);
    try {
      const res = await questionService.bulkUpload(assessmentId, csvText);
      toast.success(`Imported ${res.created} questions${res.errors?.length ? ` (${res.errors.length} errors)` : ''}`);
      setCsvOpen(false);
      onReload();
    } catch (err) {
      toast.error(err.message || 'CSV upload failed');
    } finally {
      setUploading(false);
    }
  };

  const exportCsv = async () => {
    setExporting(true);
    try {
      await questionService.exportCsv(assessmentId);
      toast.success('Questions exported');
    } catch (err) {
      toast.error(err.message || 'Export failed');
    } finally {
      setExporting(false);
    }
  };

  const handleCsvFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setCsvText(await readFileAsText(file));
      toast.success(`Loaded ${file.name}`);
    } catch {
      toast.error('Could not read CSV file');
    }
    e.target.value = '';
  };

  const bulkImportCategory = async (cat) => {
    if (!window.confirm(`Import all "${cat}" questions from bank into this assessment?`)) return;
    try {
      const res = await questionBankService.bulkImportToAssessment(assessmentId, {
        category: cat,
        section_id: sections[0]?.id || null,
      });
      toast.success(`Imported ${res.imported} questions from ${cat}`);
      onReload();
    } catch (err) {
      toast.error(err.message || 'Bulk import failed');
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Question builder</h2>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="btn-secondary text-xs font-bold text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-900/40 flex items-center gap-1.5"
              onClick={() => {
                if (selectedIds.length > 0) {
                  setBulkScope('selected');
                } else {
                  setBulkScope('all');
                }
                setBulkMarksOpen(true);
              }}
            >
              <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500/20" />
              Bulk Update Marks
            </button>
            <button type="button" className="btn-secondary text-xs font-bold text-blue-600 dark:text-blue-400" onClick={() => setPdfOpen(true)}>
              📄 PDF Question Import
            </button>
            <button type="button" className="btn-secondary text-xs font-bold text-emerald-600 dark:text-emerald-400" onClick={() => setKeyModalOpen(true)}>
              🔑 Upload Answer Key PDF
            </button>
            <button
              type="button"
              className="btn-secondary text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5"
              onClick={handleOpenExtractedJson}
              disabled={jsonLoading}
            >
              {jsonLoading ? <Spinner className="h-3 w-3" /> : <Code className="h-3.5 w-3.5" />}
              View Extracted JSON
            </button>
            <button type="button" className="btn-secondary text-xs" onClick={() => setCsvOpen(true)}>CSV Import</button>
            <button type="button" className="btn-secondary text-xs" onClick={exportCsv} disabled={exporting || !questions.length}>
              {exporting ? <Spinner className="h-3 w-3" /> : 'CSV Export'}
            </button>
            {QUESTION_TYPES.map((t) => (
              <button key={t.id} type="button" className="btn-secondary text-xs" onClick={() => openAdd(t.id)}>+ {t.label}</button>
            ))}
          </div>
        </div>

        {isLocked && (
          <div className="mb-4 rounded-2xl border border-amber-300 dark:border-amber-700/70 bg-amber-50/90 dark:bg-amber-950/40 p-4 text-amber-900 dark:text-amber-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="text-xl">🔒</span>
              <div>
                <h4 className="font-extrabold text-sm">Question Structure & Ordering Locked</h4>
                <p className="text-xs text-amber-800 dark:text-amber-300 mt-0.5">
                  This test has {attemptCount} student attempt{attemptCount > 1 ? 's' : ''}.
                  Reordering, inserting, or deleting questions is locked to preserve student results, answers, and analytics integrity.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn-primary text-xs font-bold whitespace-nowrap bg-amber-600 hover:bg-amber-700 text-white border-0 shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
              onClick={handleDuplicateAsDraft}
              disabled={duplicating}
            >
              {duplicating ? <Spinner className="h-3 w-3" /> : '📋 Duplicate as Draft to Edit'}
            </button>
          </div>
        )}

        {questions.length === 0 ? (
          <EmptyState title="No questions yet" message="Add questions manually or import from the question bank."
            action={<button type="button" className="btn-primary" onClick={() => openAdd('mcq')}>Add first question</button>} />
        ) : (
          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 p-2.5 text-xs shadow-xs">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="select-all-questions"
                  checked={questions.length > 0 && selectedIds.length === questions.length}
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 cursor-pointer"
                />
                <label htmlFor="select-all-questions" className="cursor-pointer font-bold text-slate-700 dark:text-slate-200 select-none">
                  {selectedIds.length > 0
                    ? `${selectedIds.length} of ${questions.length} selected`
                    : `Select all (${questions.length} questions)`}
                </label>
                {selectedIds.length > 0 && (
                  <button
                    type="button"
                    className="ml-1 font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white underline cursor-pointer"
                    onClick={() => setSelectedIds([])}
                  >
                    Clear
                  </button>
                )}
              </div>

              {selectedIds.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-slate-600 dark:text-slate-300">Set marks:</span>
                  {[1, 2, 4, 5].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      disabled={inlineUpdating}
                      onClick={() => handleQuickInlineMarks(preset)}
                      className="rounded-lg px-2.5 py-1 text-xs font-extrabold border border-blue-300 dark:border-blue-800 bg-white dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition cursor-pointer"
                    >
                      {preset} mk
                    </button>
                  ))}
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0.25}
                      max={100}
                      step={0.25}
                      className="h-7 w-16 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-0.5 text-center text-xs font-bold"
                      value={inlineMarkInput}
                      onChange={(e) => setInlineMarkInput(e.target.value)}
                    />
                    <button
                      type="button"
                      disabled={inlineUpdating}
                      onClick={() => handleQuickInlineMarks(inlineMarkInput)}
                      className="btn-primary h-7 px-3 text-xs"
                    >
                      {inlineUpdating ? <Spinner className="h-3 w-3" /> : 'Apply'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
                    Want to change marks for all questions at once?
                  </span>
                  <button
                    type="button"
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1"
                    onClick={() => {
                      setBulkScope('all');
                      setBulkMarksOpen(true);
                    }}
                  >
                    ⚡ Change all marks
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {partitionHelper.sortedQuestions.map((q) => {
                const meta = partitionHelper.questionMetaMap.get(q.id);
                return (
                  <QuestionCard
                    key={q.id}
                    q={q}
                    meta={meta}
                    isSelected={selectedIds.includes(q.id)}
                    onToggleSelect={() => toggleSelectQuestion(q.id)}
                    onEdit={() => openEdit(q)}
                    onDelete={() => handleDeleteQuestion(q)}
                    onMoveUp={() => handleReorderWithinSection(q, meta.secPosition - 1)}
                    onMoveDown={() => handleReorderWithinSection(q, meta.secPosition + 1)}
                    onMoveToPosition={() => setMoveToPosModal({ open: true, question: q })}
                    onInsertBefore={() => handleInsertQuestionAt(q, 'before')}
                    onInsertAfter={() => handleInsertQuestionAt(q, 'after')}
                    isHighlighted={highlightedQuestionId === q.id}
                    isLocked={isLocked}
                    disabled={reordering}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="card p-5">
        <h3 className="mb-3 font-semibold text-slate-900">Question bank</h3>
        <p className="mb-4 text-sm text-slate-500">Import pre-built questions by category.</p>
        <div className="space-y-2">
          {(categories.length ? categories : ['Physics', 'Chemistry', 'Mathematics', 'Botany', 'Zoology']).map((cat) => (
            <div key={cat} className="flex gap-2">
              <button type="button" className="btn-secondary flex-1 justify-start text-sm" onClick={() => loadBank(cat)}>
                {cat}
              </button>
              <button type="button" className="btn-secondary shrink-0 px-2 text-xs" title={`Import all ${cat}`} onClick={() => bulkImportCategory(cat)}>
                All
              </button>
            </div>
          ))}
        </div>
      </div>

      <QuestionBuilderModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setInsertMeta(null); }}
        editing={editing}
        form={form}
        setForm={setForm}
        sections={sections}
        onSubmit={saveQuestion}
        saving={saving}
        insertMeta={insertMeta}
      />

      <MoveToPositionModal
        open={moveToPosModal.open}
        onClose={() => setMoveToPosModal({ open: false, question: null })}
        question={moveToPosModal.question}
        meta={moveToPosModal.question ? partitionHelper.questionMetaMap.get(moveToPosModal.question.id) : null}
        onMove={handleReorderWithinSection}
        loading={reordering}
      />

      <BulkMarksModal
        open={bulkMarksOpen}
        onClose={() => setBulkMarksOpen(false)}
        questions={questions}
        sections={sections}
        selectedIds={selectedIds}
        bulkMarksValue={bulkMarksValue}
        setBulkMarksValue={setBulkMarksValue}
        bulkScope={bulkScope}
        setBulkScope={setBulkScope}
        bulkSectionId={bulkSectionId}
        setBulkSectionId={setBulkSectionId}
        bulkQuestionType={bulkQuestionType}
        setBulkQuestionType={setBulkQuestionType}
        onApply={handleApplyBulkMarks}
        loading={bulkUpdating}
      />

      <Modal open={bankOpen} onClose={() => setBankOpen(false)} title={`Question bank — ${bankCategory}`} size="lg">
        {bankQuestions.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No questions in this category. Run db:seed to populate the bank.</p>
        ) : (
          <ul className="max-h-96 space-y-3 overflow-y-auto">
            {bankQuestions.map((bq) => (
              <li key={bq.id} className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
                <div className="min-w-0 flex-1">
                  <Badge color="blue">{bq.question_type}</Badge>
                  <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">{bq.question_text}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{bq.marks} marks</p>
                </div>
                <button type="button" className="btn-primary shrink-0 text-xs" onClick={() => importBank(bq.id)}>Import</button>
              </li>
            ))}
          </ul>
        )}
      </Modal>

      <Modal open={csvOpen} onClose={() => setCsvOpen(false)} title="Bulk CSV import" size="lg">
        <p className="mb-3 text-sm text-muted">
          Columns: question_text, question_type, marks, options (pipe-separated), correct_index, correct_indices, solution
        </p>
        <div className="mb-3 flex flex-wrap gap-2">
          <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={handleCsvFile} />
          <button type="button" className="btn-secondary text-xs" onClick={() => fileRef.current?.click()}>
            Choose CSV file
          </button>
          <button type="button" className="btn-secondary text-xs" onClick={() => setCsvText(CSV_TEMPLATE)}>
            Load template
          </button>
        </div>
        <textarea
          className="input font-mono text-xs"
          rows={12}
          value={csvText}
          onChange={(e) => setCsvText(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" className="btn-secondary" onClick={() => setCsvOpen(false)}>Cancel</button>
          <button type="button" className="btn-primary" onClick={uploadCsv} disabled={uploading}>
            {uploading ? <Spinner className="h-4 w-4" /> : 'Import questions'}
          </button>
        </div>
      </Modal>

      <Modal open={pdfOpen} onClose={() => setPdfOpen(false)} title="Gemini Vision PDF Question Import" size="md">
        <form onSubmit={handlePdfUpload} className="space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Upload a PDF question paper. Gemini Vision will analyze visual layouts, questions, options, diagrams, graphs, tables, equations, and answer keys, then automatically import them into this assessment.
          </p>
          <div>
            <label className="label">Select PDF Question Paper (.pdf)</label>
            <input
              type="file"
              accept=".pdf"
              className="input text-xs"
              onChange={(e) => setPdfFile(e.target.files[0] || null)}
              disabled={pdfUploading}
            />
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-900/60">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeAnswers}
                onChange={(e) => setIncludeAnswers(e.target.checked)}
                disabled={pdfUploading}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <div className="text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Detect & include answer key / correct options
                </span>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                  Uncheck if this PDF is a question paper without answers. The options will not highlight any answer in green.
                </p>
              </div>
            </label>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-secondary text-xs" onClick={() => setPdfOpen(false)} disabled={pdfUploading}>Cancel</button>
            <button type="submit" className="btn-primary text-xs" disabled={pdfUploading || !pdfFile}>
              {pdfUploading ? (
                <>
                  <Spinner className="mr-1.5 h-3 w-3 text-white" />
                  Analyzing PDF & Extracting Questions...
                </>
              ) : (
                'Start Gemini Vision Extraction'
              )}
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={keyModalOpen} onClose={() => setKeyModalOpen(false)} title="Upload Answer Key PDF" size="md">
        <form onSubmit={handleKeyUpload} className="space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Upload an Answer Key PDF containing question numbers and corresponding answers (e.g., 1. A, 2. B, 3. C, or key tables). The system will automatically map the correct answers to all questions in this assessment and update them.
          </p>
          <div>
            <label className="label">Select Answer Key PDF (.pdf)</label>
            <input
              type="file"
              accept=".pdf"
              className="input text-xs"
              onChange={(e) => setKeyFile(e.target.files[0] || null)}
              disabled={keyUploading}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-secondary text-xs" onClick={() => setKeyModalOpen(false)} disabled={keyUploading}>Cancel</button>
            <button type="submit" className="btn-primary text-xs" disabled={keyUploading || !keyFile}>
              {keyUploading ? (
                <>
                  <Spinner className="mr-1.5 h-3 w-3 text-white" />
                  Applying Answer Key...
                </>
              ) : (
                'Upload & Apply Answer Key'
              )}
            </button>
          </div>
        </form>
      </Modal>
      {/* Extracted JSON Data Modal */}
      <Modal open={jsonModalOpen} onClose={() => setJsonModalOpen(false)} title="Extracted Questions JSON" size="xl">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {Array.isArray(jsonQuestionsData) ? `${jsonQuestionsData.length} Question(s) Formatted in Standardized JSON` : 'Extracted JSON Data'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Includes questions, options with diagrams, explanations, and Gemini Vision extraction metadata.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                className="btn-secondary text-xs flex items-center gap-1.5"
                onClick={handleCopyJson}
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied!' : 'Copy JSON'}
              </button>
              <button
                type="button"
                className="btn-primary text-xs flex items-center gap-1.5"
                onClick={handleDownloadJson}
              >
                <Download className="h-3.5 w-3.5" />
                Download JSON
              </button>
            </div>
          </div>

          <pre className="max-h-[62vh] overflow-auto rounded-xl bg-slate-950 p-4 text-xs font-mono text-emerald-400 border border-slate-800 leading-relaxed select-text shadow-inner">
            {jsonQuestionsData ? JSON.stringify(jsonQuestionsData, null, 2) : 'No extracted JSON data loaded.'}
          </pre>
        </div>
      </Modal>
    </div>
  );
}

function MoveToPositionModal({ open, onClose, question, meta, onMove, loading }) {
  const [targetPos, setTargetPos] = useState(1);

  useEffect(() => {
    if (meta?.secPosition) {
      setTargetPos(meta.secPosition);
    }
  }, [meta?.secPosition, open]);

  if (!open || !question || !meta) return null;

  const totalPositions = meta.secTotal || 1;
  const positions = Array.from({ length: totalPositions }, (_, i) => i + 1);

  const sectionStartGlobal = meta.displayNumber - meta.secPosition + 1;
  const projectedGlobal = sectionStartGlobal + targetPos - 1;

  const handleApply = () => {
    if (targetPos === meta.secPosition) {
      onClose();
      return;
    }
    onMove(question, targetPos);
  };

  return (
    <Modal open={open} onClose={onClose} title={`Move Question Q${meta.displayNumber}`} size="md">
      <div className="space-y-4">
        <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3.5 dark:border-blue-900/50 dark:bg-blue-950/20 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white mb-2 pb-1.5 border-b border-blue-200/50 dark:border-blue-800/50">
            <span>Subject / Section:</span>
            <span className="text-blue-600 dark:text-blue-400">{meta.sectionLabel}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-500 dark:text-slate-400">Current Display:</span>{' '}
              <span className="font-bold text-slate-800 dark:text-slate-200">Q{meta.displayNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">Section Position:</span>{' '}
              <span className="font-bold text-slate-800 dark:text-slate-200">#{meta.secPosition} of {meta.secTotal}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="label text-xs font-bold text-slate-800 dark:text-slate-200">
            Target Position inside this Section
          </label>
          <div className="mt-1.5">
            <select
              className="input text-xs font-semibold"
              value={targetPos}
              onChange={(e) => setTargetPos(Number(e.target.value))}
            >
              {positions.map((p) => {
                const projNum = sectionStartGlobal + p - 1;
                const isCurrent = p === meta.secPosition;
                return (
                  <option key={p} value={p}>
                    Position #{p} {isCurrent ? '(Current)' : `→ Displays as Q${projNum}`}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            {targetPos === meta.secPosition
              ? 'Currently at this position.'
              : `Moving to position #${targetPos} will make this question display as Q${projectedGlobal}. Other questions in ${meta.sectionLabel} will shift to accommodate.`}
          </p>
        </div>

        {totalPositions <= 35 && (
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Quick Select:</span>
            <div className="mt-1.5 flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 border border-slate-100 dark:border-slate-800 rounded-lg">
              {positions.map((p) => {
                const isCurrent = p === meta.secPosition;
                const isSelected = p === targetPos;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setTargetPos(p)}
                    className={`h-7 min-w-7 px-1.5 rounded-md text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : isCurrent
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                        : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button type="button" className="btn-secondary text-xs" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary text-xs"
            onClick={handleApply}
            disabled={loading || targetPos === meta.secPosition}
          >
            {loading ? <Spinner className="h-3.5 w-3.5 mr-1" /> : null}
            {targetPos === meta.secPosition ? 'Choose a Different Position' : `Move to Position #${targetPos}`}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function BulkMarksModal({
  open,
  onClose,
  questions,
  sections,
  selectedIds,
  bulkMarksValue,
  setBulkMarksValue,
  bulkScope,
  setBulkScope,
  bulkSectionId,
  setBulkSectionId,
  bulkQuestionType,
  setBulkQuestionType,
  onApply,
  loading,
}) {
  const getAffectedQuestions = () => {
    if (bulkScope === 'selected') {
      return questions.filter((q) => selectedIds.includes(q.id));
    }
    if (bulkScope === 'section') {
      if (bulkSectionId === 'all') return questions;
      if (bulkSectionId === 'none') return questions.filter((q) => !q.section_id);
      return questions.filter((q) => String(q.section_id) === String(bulkSectionId));
    }
    if (bulkScope === 'type') {
      if (bulkQuestionType === 'all') return questions;
      return questions.filter((q) => q.question_type === bulkQuestionType);
    }
    return questions; // 'all'
  };

  const affectedQuestions = getAffectedQuestions();
  const affectedCount = affectedQuestions.length;
  const unaffectedQuestions = questions.filter((q) => !affectedQuestions.some((aq) => aq.id === q.id));
  const unaffectedMarksSum = unaffectedQuestions.reduce((sum, q) => sum + (Number(q.marks) || 0), 0);
  const targetMarkNum = Number(bulkMarksValue) || 0;
  const projectedTotalMarks = (affectedCount * targetMarkNum) + unaffectedMarksSum;
  const currentTotalMarks = questions.reduce((sum, q) => sum + (Number(q.marks) || 0), 0);

  return (
    <Modal open={open} onClose={onClose} title="⚡ Bulk Update Question Marks" size="md">
      <div className="space-y-4">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Update marks across multiple or all questions at once without having to edit each question individually.
        </p>

        <div>
          <label className="label">Target Questions</label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setBulkScope('all')}
              className={`rounded-xl border p-2.5 text-left font-bold transition cursor-pointer ${
                bulkScope === 'all'
                  ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/50 dark:text-blue-300 ring-1 ring-blue-500/40'
                  : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-850'
              }`}
            >
              <div>All Questions</div>
              <div className="text-[11px] font-normal text-slate-500 dark:text-slate-400">{questions.length} questions</div>
            </button>

            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={() => setBulkScope('selected')}
              className={`rounded-xl border p-2.5 text-left font-bold transition ${
                selectedIds.length === 0
                  ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800'
                  : bulkScope === 'selected'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/50 dark:text-blue-300 ring-1 ring-blue-500/40 cursor-pointer'
                    : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-850 cursor-pointer'
              }`}
            >
              <div>Selected Only</div>
              <div className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
                {selectedIds.length > 0 ? `${selectedIds.length} questions selected` : 'None selected'}
              </div>
            </button>

            {sections?.length > 0 && (
              <button
                type="button"
                onClick={() => setBulkScope('section')}
                className={`rounded-xl border p-2.5 text-left font-bold transition cursor-pointer ${
                  bulkScope === 'section'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/50 dark:text-blue-300 ring-1 ring-blue-500/40'
                    : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-850'
                }`}
              >
                <div>By Section</div>
                <div className="text-[11px] font-normal text-slate-500 dark:text-slate-400">Specific test section</div>
              </button>
            )}

            <button
              type="button"
              onClick={() => setBulkScope('type')}
              className={`rounded-xl border p-2.5 text-left font-bold transition cursor-pointer ${
                bulkScope === 'type'
                  ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/50 dark:text-blue-300 ring-1 ring-blue-500/40'
                  : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-850'
              }`}
            >
              <div>By Question Type</div>
              <div className="text-[11px] font-normal text-slate-500 dark:text-slate-400">MCQ, Numerical, etc.</div>
            </button>
          </div>
        </div>

        {bulkScope === 'section' && sections?.length > 0 && (
          <div>
            <label className="label">Select Section</label>
            <select
              className="input text-xs"
              value={bulkSectionId}
              onChange={(e) => setBulkSectionId(e.target.value)}
            >
              <option value="all">All Sections ({questions.length} questions)</option>
              {sections.map((sec) => {
                const count = questions.filter((q) => String(q.section_id) === String(sec.id)).length;
                return (
                  <option key={sec.id} value={sec.id}>
                    {sec.name} ({count} questions)
                  </option>
                );
              })}
              <option value="none">
                No Section Assigned ({questions.filter((q) => !q.section_id).length} questions)
              </option>
            </select>
          </div>
        )}

        {bulkScope === 'type' && (
          <div>
            <label className="label">Select Question Type</label>
            <select
              className="input text-xs"
              value={bulkQuestionType}
              onChange={(e) => setBulkQuestionType(e.target.value)}
            >
              <option value="all">All Types ({questions.length} questions)</option>
              {QUESTION_TYPES.map((t) => {
                const count = questions.filter((q) => q.question_type === t.id).length;
                return (
                  <option key={t.id} value={t.id}>
                    {t.label} ({count} questions)
                  </option>
                );
              })}
            </select>
          </div>
        )}

        <div>
          <label className="label">New Marks Per Question</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0.25}
              max={100}
              step={0.25}
              className="input text-sm font-bold w-28 text-center"
              value={bulkMarksValue}
              onChange={(e) => setBulkMarksValue(e.target.value)}
            />
            <div className="flex flex-wrap gap-1.5">
              {[1, 2, 4, 5].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setBulkMarksValue(preset)}
                  className={`rounded-xl px-3 py-2 text-xs font-bold transition border cursor-pointer ${
                    Number(bulkMarksValue) === preset
                      ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  +{preset} mk
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Questions affected:</span>
            <span className="font-extrabold text-blue-600 dark:text-blue-400">{affectedCount} of {questions.length}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Current total marks:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{currentTotalMarks} marks</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs border-t border-blue-200/60 dark:border-blue-800/60 pt-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">New total marks:</span>
            <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
              {projectedTotalMarks} marks
              {projectedTotalMarks !== currentTotalMarks && (
                <span className="ml-1 text-[11px] font-normal text-slate-500 dark:text-slate-400">
                  ({projectedTotalMarks > currentTotalMarks ? `+${projectedTotalMarks - currentTotalMarks}` : projectedTotalMarks - currentTotalMarks})
                </span>
              )}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={onApply}
            disabled={loading || affectedCount === 0}
          >
            {loading ? <Spinner className="h-4 w-4" /> : `Update ${affectedCount} Questions to ${bulkMarksValue} mk`}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function QuestionCard({
  q,
  meta,
  isSelected,
  onToggleSelect,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  onMoveToPosition,
  onInsertBefore,
  onInsertAfter,
  isHighlighted,
  isLocked,
  disabled,
}) {
  const opts = Array.isArray(q.options) ? q.options : [];
  const typeLabel = QUESTION_TYPES.find((t) => t.id === q.question_type)?.label || q.question_type;

  const isInteger = q.question_type === 'integer' || q.question_type === 'numerical';
  const hasAnswerKey = Boolean(
    q.question_type === 'multi_select'
      ? Array.isArray(q.correct_indices) && q.correct_indices.length > 0
      : (isInteger
          ? (q.numeric_answer !== null && q.numeric_answer !== undefined && q.numeric_answer !== '')
          : (q.correct_index !== null && q.correct_index !== undefined && q.correct_index !== ''))
  );

  const displayNumber = meta?.displayNumber ?? q.position;
  const secPos = meta?.secPosition ?? 1;
  const secTotal = meta?.secTotal ?? 1;
  const canMoveUp = meta ? meta.canMoveUp : false;
  const canMoveDown = meta ? meta.canMoveDown : false;

  return (
    <div
      id={`question-card-${q.id}`}
      className={`card p-4 transition-all duration-300 border ${
        isHighlighted
          ? 'ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-950/40 border-blue-400 dark:border-blue-600 shadow-md'
          : isSelected
          ? 'bg-blue-50/40 dark:bg-blue-950/30 border-blue-400 dark:border-blue-600 ring-1 ring-blue-400/40 shadow-sm'
          : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800'
      }`}
    >
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-1 pt-0.5 shrink-0">
          <input
            type="checkbox"
            checked={Boolean(isSelected)}
            onChange={onToggleSelect}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 cursor-pointer"
            title="Select question"
          />
          <button
            type="button"
            className="rounded p-1 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition"
            onClick={onMoveUp}
            disabled={isLocked || disabled || !canMoveUp}
            title={!canMoveUp ? 'First question in this section' : 'Move up'}
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
          <span className="text-center text-xs font-bold text-slate-700 dark:text-slate-300" title={`Question #${displayNumber}`}>
            {displayNumber}
          </span>
          <button
            type="button"
            className="rounded p-1 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition"
            onClick={onMoveDown}
            disabled={isLocked || disabled || !canMoveDown}
            title={!canMoveDown ? 'Last question in this section' : 'Move down'}
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono" title={`Section position ${secPos} of ${secTotal}`}>
            {secPos}/{secTotal}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-2 mb-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-extrabold text-xs">
                Q{displayNumber}
              </span>
              <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium" title="Position in current subject/section">
                Sec #{secPos}
              </span>
              <Badge color="blue">{typeLabel}</Badge>
              {q.section_name && <Badge color="slate">{q.section_name}</Badge>}
              <Badge color="green">{q.marks} mk</Badge>
              {Number(q.negative_marks) > 0 && (
                <Badge color="red">-{q.negative_marks} mk</Badge>
              )}
              {q.original_question_number && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 text-xs font-semibold" title="Original question number from source document/PDF">
                  PDF Q{q.original_question_number}
                </span>
              )}
              {!hasAnswerKey && (
                <Badge color="slate">No Answer Key</Badge>
              )}
              {q.needs_review && (
                <Badge color="amber">⚠️ Review Answer Key</Badge>
              )}
              {(q.topic || q.subject) && (
                <Badge color="amber">
                  {q.subject ? `${q.subject} • ` : ''}{q.topic || 'General'}
                </Badge>
              )}
              {q.image_url && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  🖼️ Diagram
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                disabled={isLocked || disabled || secTotal <= 1}
                onClick={onMoveToPosition}
                className="btn-secondary py-1 px-2 text-xs flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                title="Move to specific position inside this section"
              >
                <Move className="h-3 w-3" />
                <span className="hidden sm:inline">Move Pos</span>
              </button>
              <button
                type="button"
                disabled={isLocked || disabled}
                onClick={onInsertBefore}
                className="btn-secondary py-1 px-2 text-xs flex items-center gap-1 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                title={`Insert new question before Q${displayNumber}`}
              >
                <Plus className="h-3 w-3" />
                <span>Before</span>
              </button>
              <button
                type="button"
                disabled={isLocked || disabled}
                onClick={onInsertAfter}
                className="btn-secondary py-1 px-2 text-xs flex items-center gap-1 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                title={`Insert new question after Q${displayNumber}`}
              >
                <Plus className="h-3 w-3" />
                <span>After</span>
              </button>
              <div className="flex items-center gap-1 pl-1 border-l border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline px-1.5 py-1 cursor-pointer"
                  onClick={onEdit}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline px-1.5 py-1 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  disabled={isLocked || disabled}
                  onClick={onDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-100 whitespace-pre-line leading-relaxed">
            <MathRenderer text={q.question_text} />
          </div>
          
          {(() => {
            let mediaList = [];
            if (Array.isArray(q.media) && q.media.length > 0) {
              mediaList = q.media;
            } else if (typeof q.media === 'string') {
              try { mediaList = JSON.parse(q.media); } catch (_) { mediaList = []; }
            }
            if (!mediaList.length && q.image_url) {
              mediaList = [{ url: q.image_url }];
            }
            if (!mediaList.length) return null;

            return (
              <div className="mt-2 flex flex-wrap gap-2.5">
                {mediaList.map((m, mIdx) => {
                  const mUrl = typeof m === 'string' ? m : m.url;
                  if (!mUrl) return null;
                  return (
                    <div key={mIdx} className="max-w-xs">
                      <img
                        src={getMediaUrl(mUrl)}
                        alt={m.description || `Question Diagram ${mIdx + 1}`}
                        className="max-h-40 rounded-lg border border-slate-200 dark:border-slate-700 object-contain bg-white dark:bg-slate-950 p-1 cursor-pointer hover:opacity-90 shadow-xs"
                        onClick={() => window.open(getMediaUrl(mUrl), '_blank')}
                        title="Click to view full diagram"
                      />
                      {m.description && <p className="text-[10px] text-slate-500 mt-0.5 truncate">{m.description}</p>}
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {isInteger && (
            <div className="mt-2.5 flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Integer / Numerical Answer:
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 font-mono text-sm font-bold text-emerald-700 dark:text-emerald-300 shadow-sm">
                <span>🎯</span>
                <span>{q.numeric_answer !== null && q.numeric_answer !== undefined ? q.numeric_answer : (hasAnswerKey ? q.correct_index : 'Not specified')}</span>
                {q.numerical_tolerance > 0 && (
                  <span className="text-xs font-normal text-emerald-600 dark:text-emerald-400">
                    (±{q.numerical_tolerance})
                  </span>
                )}
              </span>
            </div>
          )}

          {(q.question_type === 'mcq' || q.question_type === 'multi_select') && (
            <ul className="mt-2 space-y-1 text-sm">
              {opts.map((opt, i) => {
                const rawOptText = typeof opt === 'object' && opt !== null ? (opt.text ?? '') : String(opt ?? '');
                const isMatchMapping = /(?:\(?[a-eA-E1-4ivx]+\)?\s*[-–—>:=]\s*\(?[a-zA-Z0-9ivxlcdmIVXLCDM]+\)?.*[,;]|[,;].*\(?[b-eB-E2-4ivx]+\)?\s*[-–—>:=]|(?:^|,)\s*\(?[a-eA-E1-4]\)\s*[-–—>:=]|^\([a-z]\)\s*[-–—]|\([iIvVxX]+\)[^,\n]+,\s*\([iIvVxX]+\))/i.test(rawOptText);
                const optText = isMatchMapping ? rawOptText : rawOptText.replace(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\.\)]|[A-Za-z0-9]:)\s*/, '').trim();
                const optMedia = (typeof opt === 'object' && Array.isArray(opt.media))
                  ? opt.media
                  : ((typeof opt === 'object' && opt.image_url) ? [{ url: opt.image_url }] : []);
                const optImg = (typeof opt === 'object' && opt.image_url) ? opt.image_url : (optMedia[0]?.url || '');
                const isCorrect = (
                  q.question_type === 'multi_select'
                    ? (q.correct_indices || []).includes(i)
                    : (q.correct_index !== null && q.correct_index !== undefined && q.correct_index !== '' && i === Number(q.correct_index))
                );
                return (
                  <li
                    key={i}
                    className={
                      isCorrect
                        ? 'font-medium text-emerald-600 dark:text-emerald-400 flex flex-col gap-1'
                        : 'text-slate-600 dark:text-slate-300 flex flex-col gap-1'
                    }
                  >
                    <div className="flex items-center gap-1.5">
                      {isCorrect && <span className="text-xs font-bold">✓</span>}
                      <span className="font-semibold text-slate-500 dark:text-slate-400">({String.fromCharCode(65 + i)})</span>
                      {optText || rawOptText ? (
                        <MathRenderer text={optText || rawOptText} />
                      ) : (
                        optImg ? (
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                            [Image Option]
                          </span>
                        ) : (
                          <span className="italic text-slate-400">Empty option</span>
                        )
                      )}
                    </div>
                    {optImg && (
                      <div className="ml-5 mt-0.5">
                        <img
                          src={getMediaUrl(optImg)}
                          alt={`Option ${String.fromCharCode(65 + i)} diagram`}
                          className="max-h-24 rounded border border-slate-300 dark:border-slate-700 object-contain bg-white dark:bg-slate-950 p-0.5 cursor-pointer hover:opacity-90"
                          onClick={() => window.open(getMediaUrl(optImg), '_blank')}
                          title="Click to view full image"
                        />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          {q.solution && (
            <div className="mt-3 rounded-xl border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/25 p-3 text-xs text-slate-800 dark:text-slate-200">
              <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-400 mb-1">
                <span>💡</span>
                <span>Explanation / Solution:</span>
              </div>
              <div className="whitespace-pre-line leading-relaxed pl-5 font-normal">
                <MathRenderer text={q.solution} />
              </div>
              {q.solution_image_url && (
                <div className="mt-2 pl-5 max-w-sm">
                  <img
                    src={getMediaUrl(q.solution_image_url)}
                    alt="Solution diagram"
                    className="max-h-36 rounded-lg border border-amber-200 dark:border-amber-800 object-contain bg-white dark:bg-slate-950 p-1 cursor-pointer hover:opacity-90"
                    onClick={() => window.open(getMediaUrl(q.solution_image_url), '_blank')}
                    title="Click to view full diagram"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CustomSelectDropdown({ value, onChange, options, placeholder = 'Select option', disabled = false }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getOptVal = (o) => (o.id !== undefined ? o.id : (o.value !== undefined ? o.value : o.name));

  const isMatchingOpt = (opt, targetVal) => {
    if (targetVal === '' || targetVal === null || targetVal === undefined) {
      const optVal = getOptVal(opt);
      return optVal === '' || optVal === null || optVal === undefined;
    }
    const optVal = getOptVal(opt);
    if (optVal !== undefined && optVal !== null && String(optVal) === String(targetVal)) {
      return true;
    }
    if (opt.name && String(opt.name).toLowerCase() === String(targetVal).toLowerCase()) {
      return true;
    }
    if (opt.label && String(opt.label).toLowerCase() === String(targetVal).toLowerCase()) {
      return true;
    }
    return false;
  };

  const selected = options.find((o) => isMatchingOpt(o, value));
  const displayLabel = selected ? (selected.label || selected.name) : (typeof value === 'string' && isNaN(Number(value)) && value !== '' ? value : placeholder);

  if (placeholder === 'Select chapter') {
    console.log('[CHAPTER DROPDOWN DEBUG]', {
      value,
      resolvedSelected: selected ? { id: selected.id, name: selected.name } : null,
      displayLabel
    });
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2.5 px-3.5 text-xs font-bold text-slate-800 dark:text-slate-100 hover:border-blue-500/80 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <span className="truncate">{displayLabel}</span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ${open ? 'rotate-180 text-blue-500' : ''}`} />
      </button>

      {open && !disabled && (
        <div className="absolute left-0 top-full mt-1.5 w-full z-50 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-2xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150 max-h-60 overflow-y-auto">
          {options.map((opt, idx) => {
            const optVal = getOptVal(opt);
            const isSelected = isMatchingOpt(opt, value);
            return (
              <button
                key={optVal ?? opt.name ?? idx}
                type="button"
                onClick={() => {
                  onChange(optVal, opt);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white font-extrabold shadow-sm'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold'
                }`}
              >
                <span>{opt.label || opt.name}</span>
                {isSelected && <Check className="h-4 w-4 text-white shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function QuestionBuilderModal({ open, onClose, editing, form, setForm, sections, onSubmit, saving, insertMeta }) {
  const isChoice = form.question_type === 'mcq' || form.question_type === 'multi_select';
  const [subjectsList, setSubjectsList] = useState([]);
  const [chaptersList, setChaptersList] = useState([]);

  useEffect(() => {
    if (!open) return;
    adminService.subjects().then((list) => {
      const fetched = list || [];
      const defaultSubjects = [
        { name: 'Physics' },
        { name: 'Chemistry' },
        { name: 'Mathematics' },
        { name: 'Botany' },
        { name: 'Zoology' }
      ];

      const map = new Map();
      fetched.forEach(s => {
        if (s && s.name) map.set(s.name.toLowerCase(), s);
      });
      defaultSubjects.forEach((ds, idx) => {
        if (!map.has(ds.name.toLowerCase())) {
          map.set(ds.name.toLowerCase(), { id: 1000 + idx, name: ds.name });
        }
      });

      const unified = Array.from(map.values());
      setSubjectsList(unified);

      if (unified.length && !form.subject_id && form.subject) {
        const match = unified.find(s => s.name.toLowerCase() === String(form.subject).toLowerCase());
        if (match) {
          setForm(f => ({ ...f, subject_id: match.id, subject: match.name }));
        }
      }
    }).catch(() => {
      setSubjectsList([
        { id: 1, name: 'Physics' },
        { id: 2, name: 'Chemistry' },
        { id: 3, name: 'Mathematics' },
        { id: 4, name: 'Botany' },
        { id: 5, name: 'Zoology' }
      ]);
    });
  }, [open]);

  useEffect(() => {
    if (!form.subject_id && !form.subject) {
      setChaptersList([]);
      return;
    }

    const targetSubj = subjectsList.find(s => String(s.id) === String(form.subject_id) || s.name.toLowerCase() === String(form.subject_id).toLowerCase() || s.name.toLowerCase() === String(form.subject).toLowerCase());
    const queryParam = targetSubj ? targetSubj.name : (form.subject_id || form.subject);

    adminService.chapters(queryParam).then((list) => {
      const fetchedChapters = list || [];
      if (fetchedChapters.length > 0) {
        setChaptersList(fetchedChapters);
      } else if (targetSubj && targetSubj.id) {
        adminService.chapters(targetSubj.id).then((l) => {
          setChaptersList(l || []);
        }).catch(() => setChaptersList([]));
      } else {
        setChaptersList([]);
      }
    }).catch(() => {
      setChaptersList([]);
    });
  }, [form.subject_id, form.subject, subjectsList]);

  const toggleMulti = (i) => {
    setForm((f) => {
      const set = new Set(f.correct_indices || []);
      if (set.has(i)) set.delete(i); else set.add(i);
      return { ...f, correct_indices: [...set].sort((a, b) => a - b) };
    });
  };

  const handleOptionImageUpload = async (index, file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP)');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size should be under 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUri = reader.result;
      let finalUrl = dataUri;
      try {
        const res = await adminService.uploadImage(dataUri, 'edvedum/options');
        if (res?.url) {
          finalUrl = res.url;
        }
      } catch (err) {
        console.warn('Option image upload fallback to data URI:', err);
      }
      setForm((f) => ({
        ...f,
        options: f.options.map((o, j) => {
          if (j !== index) return o;
          const optObj = typeof o === 'object' && o !== null ? o : { text: String(o ?? '') };
          return {
            ...optObj,
            key: optObj.key || String.fromCharCode(65 + j),
            image_url: finalUrl,
            media: [{ id: `opt-${j}-img`, type: 'diagram', url: finalUrl }],
          };
        }),
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveOptionImage = (index) => {
    setForm((f) => ({
      ...f,
      options: f.options.map((o, j) => {
        if (j !== index) return o;
        const optObj = typeof o === 'object' && o !== null ? o : { text: String(o ?? '') };
        return {
          ...optObj,
          image_url: '',
          media: [],
        };
      }),
    }));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        editing
          ? 'Edit question'
          : insertMeta
          ? `Insert Question ${insertMeta.mode === 'before' ? 'Before' : 'After'} Q${insertMeta.referenceDisplayNumber}`
          : 'Add question'
      }
      size="lg"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {insertMeta && (
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30 p-3.5 text-xs text-emerald-900 dark:text-emerald-200 flex items-start justify-between gap-3 shadow-xs">
            <div>
              <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-600 text-white text-[11px] font-black">
                  +
                </span>
                <span>
                  Inserting {insertMeta.mode === 'before' ? 'Before' : 'After'} Question Q{insertMeta.referenceDisplayNumber}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-emerald-700 dark:text-emerald-300/80 leading-relaxed">
                Will be placed at <strong>Position #{insertMeta.targetSecPosition}</strong> in <strong>{insertMeta.sectionLabel}</strong> and display as <strong>Q{insertMeta.displayNumber}</strong>. Subsequent questions will shift automatically.
              </p>
            </div>
            <span className="shrink-0 rounded-md bg-emerald-600 text-white font-extrabold px-2.5 py-1 text-xs shadow-xs">
              Target: Q{insertMeta.displayNumber}
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Question type</label>
            <CustomSelectDropdown
              value={form.question_type}
              options={QUESTION_TYPES}
              onChange={(val) => setForm((f) => ({
                ...emptyForm(val),
                question_text: f.question_text,
                section_id: f.section_id,
                subject_id: f.subject_id,
                subject: f.subject,
                chapter_id: f.chapter_id,
                topic: f.topic,
                difficulty: f.difficulty,
                marks: f.marks,
                image_url: f.image_url,
                solution_image_url: f.solution_image_url,
                solution: f.solution,
                explanation: f.explanation
              }))}
            />
          </div>
          <div>
            <label className="label">Section</label>
            <CustomSelectDropdown
              value={form.section_id || ''}
              options={[{ id: '', name: 'None' }, ...sections]}
              onChange={(val) => setForm((f) => ({ ...f, section_id: Number(val) || null }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="label">Subject</label>
            <CustomSelectDropdown
              value={form.subject_id || form.subject || ''}
              placeholder="Select subject"
              options={[{ id: '', name: 'Select subject' }, ...subjectsList]}
              onChange={(val, opt) => {
                const subjObj = opt || subjectsList.find(s => (s.id !== undefined && String(s.id) === String(val)) || (s.name && s.name.toLowerCase() === String(val).toLowerCase()));
                const nextSubjId = (subjObj && subjObj.id !== undefined && subjObj.id !== '' && !isNaN(Number(subjObj.id))) ? Number(subjObj.id) : (val !== '' && val !== null && !isNaN(Number(val)) ? Number(val) : val);
                const nextSubjName = (subjObj && (subjObj.name || subjObj.label)) ? (subjObj.name || subjObj.label) : String(val || '');
                setForm((f) => ({
                  ...f,
                  subject_id: nextSubjId || null,
                  subject: nextSubjName,
                  chapter_id: null,
                  topic: ''
                }));
              }}
            />
          </div>
          <div>
            <label className="label">Chapter</label>
            <CustomSelectDropdown
              value={form.chapter_id || form.topic || ''}
              placeholder="Select chapter"
              disabled={!form.subject_id && !form.subject}
              options={[{ id: '', name: 'Select chapter' }, ...chaptersList]}
              onChange={(val, opt) => {
                const chapObj = opt || chaptersList.find(c => (c.id !== undefined && String(c.id) === String(val)) || (c.name && c.name.toLowerCase() === String(val).toLowerCase()));
                const nextChapId = (chapObj && chapObj.id !== undefined && chapObj.id !== '' && !isNaN(Number(chapObj.id))) ? Number(chapObj.id) : (val !== '' && val !== null && !isNaN(Number(val)) ? Number(val) : null);
                const nextTopicName = (chapObj && (chapObj.name || chapObj.label)) ? (chapObj.name || chapObj.label) : String(val || '');
                setForm((f) => ({
                  ...f,
                  chapter_id: nextChapId || null,
                  topic: nextTopicName
                }));
              }}
            />
          </div>
          <div>
            <label className="label">Difficulty</label>
            <CustomSelectDropdown
              value={form.difficulty || 'medium'}
              options={[
                { value: 'easy', label: 'Easy' },
                { value: 'medium', label: 'Medium' },
                { value: 'hard', label: 'Hard' },
              ]}
              onChange={(val) => setForm((f) => ({ ...f, difficulty: val }))}
            />
          </div>
        </div>

        <div>
          <label className="label">Question text</label>
          <textarea rows={3} className="input" required value={form.question_text}
            onChange={(e) => setForm((f) => ({ ...f, question_text: e.target.value }))} />
        </div>

        {isChoice && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="label mb-0">
                {form.question_type === 'multi_select'
                  ? 'Options (check all correct; diagram/image upload available per option)'
                  : 'Options (select one correct; diagram/image upload available per option)'}
              </label>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                LaTeX math & Option diagrams supported
              </span>
            </div>
            <div className="space-y-3">
              {form.options.map((opt, i) => {
                const optObj = typeof opt === 'object' && opt !== null ? opt : { key: String.fromCharCode(65 + i), text: String(opt ?? ''), image_url: '', media: [] };
                const optText = optObj.text ?? '';
                const optImg = optObj.image_url || (Array.isArray(optObj.media) && optObj.media[0]?.url) || '';
                const optKey = optObj.key || String.fromCharCode(65 + i);

                return (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 p-3 space-y-2 transition-all hover:border-slate-300 dark:hover:border-slate-700"
                  >
                    <div className="flex items-center gap-2.5">
                      {form.question_type === 'multi_select' ? (
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                          checked={(form.correct_indices || []).includes(i)}
                          onChange={() => toggleMulti(i)}
                        />
                      ) : (
                        <input
                          type="radio"
                          name="correct"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                          checked={form.correct_index === i}
                          onChange={() => setForm((f) => ({ ...f, correct_index: i }))}
                        />
                      )}
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-black text-slate-700 dark:text-slate-300 shrink-0">
                        {optKey}
                      </span>
                      <input
                        className="input flex-1 text-sm py-1.5"
                        placeholder={`Option ${optKey} text (optional if diagram only)...`}
                        value={optText}
                        onChange={(e) => {
                          const val = e.target.value;
                          setForm((f) => ({
                            ...f,
                            options: f.options.map((o, j) =>
                              j === i
                                ? {
                                    ...(typeof o === 'object' ? o : { key: optKey }),
                                    text: val,
                                  }
                                : o
                            ),
                          }));
                        }}
                      />
                      {form.options.length > 2 && (
                        <button
                          type="button"
                          className="text-slate-400 hover:text-red-500 p-1 text-lg leading-none cursor-pointer"
                          title="Remove option"
                          onClick={() => setForm((f) => ({ ...f, options: f.options.filter((_, j) => j !== i) }))}
                        >
                          ×
                        </button>
                      )}
                    </div>

                    {/* Option Diagram uploader & preview */}
                    <div className="flex flex-wrap items-center gap-2 pl-9 text-xs">
                      {optImg ? (
                        <div className="flex items-center gap-2.5 bg-white dark:bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xs">
                          <img
                            src={getMediaUrl(optImg)}
                            alt={`Option ${optKey} Diagram`}
                            className="h-10 max-w-[120px] object-contain rounded border border-slate-200 dark:border-slate-700 cursor-pointer"
                            onClick={() => window.open(getMediaUrl(optImg), '_blank')}
                            title="Click to view full image"
                          />
                          <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              Diagram attached
                            </span>
                            <div className="flex items-center gap-2">
                              <label className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium">
                                Change
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleOptionImageUpload(i, e.target.files?.[0])}
                                />
                              </label>
                              <span className="text-slate-300 dark:text-slate-700">•</span>
                              <button
                                type="button"
                                className="text-red-500 hover:underline font-medium cursor-pointer"
                                onClick={() => handleRemoveOptionImage(i)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                            <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
                            <span>Upload diagram for Option {optKey}</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleOptionImageUpload(i, e.target.files?.[0])}
                            />
                          </label>
                          <span className="text-slate-400">or URL:</span>
                          <input
                            type="text"
                            placeholder="https://... or /uploads/..."
                            className="text-xs py-1 px-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-950 w-44 text-slate-700 dark:text-slate-300"
                            value={optImg}
                            onChange={(e) => {
                              const urlVal = e.target.value;
                              setForm((f) => ({
                                ...f,
                                options: f.options.map((o, j) =>
                                  j === i
                                    ? {
                                        ...(typeof o === 'object' ? o : { key: optKey, text: String(o ?? '') }),
                                        image_url: urlVal,
                                        media: urlVal ? [{ id: `opt-${i}-img`, type: 'diagram', url: urlVal }] : [],
                                      }
                                    : o
                                ),
                              }));
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {form.options.length < 6 && (
              <button
                type="button"
                className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    options: [
                      ...f.options,
                      {
                        key: String.fromCharCode(65 + f.options.length),
                        text: '',
                        image_url: '',
                        media: [],
                      },
                    ],
                  }))
                }
              >
                + Add option ({String.fromCharCode(65 + form.options.length)})
              </button>
            )}
          </div>
        )}

        {form.question_type === 'assertion_reason' && (
          <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div>
              <label className="label">Assertion (A)</label>
              <textarea rows={2} className="input" placeholder="e.g. Work done in a closed path in a conservative field is zero." value={form.assertion_text || ''} onChange={(e) => setForm((f) => ({ ...f, assertion_text: e.target.value }))} />
            </div>
            <div>
              <label className="label">Reason (R)</label>
              <textarea rows={2} className="input" placeholder="e.g. Electrostatic force is a conservative force." value={form.reason_text || ''} onChange={(e) => setForm((f) => ({ ...f, reason_text: e.target.value }))} />
            </div>
            <div>
              <label className="label">Correct Option</label>
              <div className="space-y-1.5 pt-1">
                {ASSERTION_REASON_OPTIONS.map((opt, i) => (
                  <label key={i} className="flex items-start gap-2 rounded p-1.5 hover:bg-white text-xs text-slate-800 cursor-pointer border border-transparent hover:border-slate-200">
                    <input type="radio" name="ar_correct" checked={form.correct_index === i} onChange={() => setForm((f) => ({ ...f, correct_index: i, options: normalizeOptions(ASSERTION_REASON_OPTIONS, 'assertion_reason') }))} />
                    <span><strong>({String.fromCharCode(65 + i)})</strong> {opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {form.question_type === 'integer' && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <label className="label">Correct Integer Answer</label>
            <input type="number" step="1" className="input max-w-xs font-mono text-base" placeholder="e.g. 4" required value={form.numeric_answer ?? ''} onChange={(e) => setForm((f) => ({ ...f, numeric_answer: e.target.value !== '' ? parseInt(e.target.value, 10) : '' }))} />
            <p className="mt-1 text-xs text-slate-500">Candidate will type a whole integer during the test.</p>
          </div>
        )}

        {form.question_type === 'numerical' && (
          <div className="grid grid-cols-2 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div>
              <label className="label">Correct Numerical Answer</label>
              <input type="number" step="any" className="input font-mono text-base" placeholder="e.g. 12.5" required value={form.numeric_answer ?? ''} onChange={(e) => setForm((f) => ({ ...f, numeric_answer: e.target.value !== '' ? parseFloat(e.target.value) : '' }))} />
            </div>
            <div>
              <label className="label">Allowed Tolerance (±)</label>
              <input type="number" step="any" min="0" className="input font-mono text-base" placeholder="e.g. 0.01" value={form.numerical_tolerance ?? 0.01} onChange={(e) => setForm((f) => ({ ...f, numerical_tolerance: parseFloat(e.target.value) || 0 }))} />
            </div>
          </div>
        )}

        {form.question_type === 'coding' && (
          <>
            <div>
              <label className="label">Starter code (JavaScript)</label>
              <textarea rows={8} className="input font-mono text-sm" value={form.starter_code}
                onChange={(e) => setForm((f) => ({ ...f, starter_code: e.target.value }))} />
            </div>
            <div>
              <label className="label">Test cases (input / expected)</label>
              {form.test_cases.map((tc, i) => (
                <div key={i} className="mb-2 grid grid-cols-2 gap-2">
                  <input className="input font-mono text-xs" placeholder="add(2,3)" value={tc.input}
                    onChange={(e) => setForm((f) => ({ ...f, test_cases: f.test_cases.map((t, j) => j === i ? { ...t, input: e.target.value } : t) }))} />
                  <input className="input font-mono text-xs" placeholder="5" value={tc.expected}
                    onChange={(e) => setForm((f) => ({ ...f, test_cases: f.test_cases.map((t, j) => j === i ? { ...t, expected: e.target.value } : t) }))} />
                </div>
              ))}
              <button type="button" className="text-sm text-brand-600" onClick={() => setForm((f) => ({ ...f, test_cases: [...f.test_cases, { input: '', expected: '' }] }))}>+ Test case</button>
            </div>
          </>
        )}

        {form.question_type === 'subjective' && (
          <p className="text-sm text-slate-500">Candidates will provide a written answer. Graded when answer meets minimum length.</p>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Marks</label>
            <input
              type="number"
              min={0.25}
              step="any"
              className="input"
              value={form.marks}
              onChange={(e) => setForm((f) => ({ ...f, marks: Number(e.target.value) }))}
            />
          </div>
          <div>
            <label className="label">Negative Marks (Optional)</label>
            <input
              type="number"
              min={0}
              step="any"
              className="input"
              placeholder="0"
              value={form.negative_marks ?? 0}
              onChange={(e) => setForm((f) => ({ ...f, negative_marks: e.target.value !== '' ? Number(e.target.value) : 0 }))}
            />
          </div>
        </div>

        <div>
          <label className="label">Original PDF / Paper Question Number (Optional reference)</label>
          <input
            type="text"
            className="input text-xs"
            placeholder="e.g. 14, 25(b), Q9"
            value={form.original_question_number || ''}
            onChange={(e) => setForm((f) => ({ ...f, original_question_number: e.target.value }))}
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Preserved for historical reference and document cross-checking. Does not alter system numbering.
          </p>
        </div>

        <QuestionImageUploader
          value={form.image_url || ''}
          onChange={(url) => setForm((f) => ({ ...f, image_url: url }))}
        />

        <div>
          <label className="label">Detailed Solution Explanation (optional)</label>
          <textarea rows={3} className="input" placeholder="Explain the step-by-step solution..." value={form.solution || ''} onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value }))} />
        </div>

        <QuestionImageUploader
          label="Solution Diagram / Step-by-Step Image (Optional)"
          value={form.solution_image_url || ''}
          onChange={(url) => setForm((f) => ({ ...f, solution_image_url: url }))}
        />

        <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 mt-4">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? <Spinner className="h-4 w-4" /> : 'Save question'}</button>
        </div>
      </form>
    </Modal>
  );
}

function SectionsTab({ assessmentId, sections, onReload, toast }) {
  const [form, setForm] = useState({ name: '', section_type: 'technical_mcq', description: '' });
  const [saving, setSaving] = useState(false);

  const addSection = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await sectionService.create(assessmentId, form);
      toast.success('Section added');
      setForm({ name: '', section_type: 'technical_mcq', description: '' });
      onReload();
    } catch (err) {
      toast.error(err.message || 'Failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card p-5">
        <h2 className="mb-4 font-semibold">Sections ({sections.length})</h2>
        {sections.length === 0 ? (
          <EmptyState title="No sections" message="Default sections are created with new assessments." />
        ) : (
          <ul className="space-y-3">
            {sections.map((s) => (
              <li key={s.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <div>
                  <p className="font-medium text-slate-900">{s.name}</p>
                  <p className="text-xs text-slate-500">{s.section_type} · position {s.position}</p>
                </div>
                <button type="button" className="text-sm text-red-600" onClick={async () => {
                  if (!window.confirm('Delete section? Questions will be unlinked.')) return;
                  await sectionService.remove(s.id);
                  onReload();
                }}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <form onSubmit={addSection} className="card space-y-4 p-5">
        <h2 className="font-semibold">Add section</h2>
        <input className="input" placeholder="Section name" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        <select className="input" value={form.section_type} onChange={(e) => setForm((f) => ({ ...f, section_type: e.target.value }))}>
          {SECTION_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <textarea className="input" rows={2} placeholder="Description (optional)" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
        <button type="submit" className="btn-primary w-full" disabled={saving}>{saving ? <Spinner className="h-4 w-4" /> : 'Add section'}</button>
      </form>
    </div>
  );
}

function CandidatesTab({ invites }) {
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="font-semibold text-slate-900">Invited candidates</h2>
        <p className="text-sm text-slate-500">Candidates invited to this assessment and their progress.</p>
      </div>
      {invites.length === 0 ? (
        <div className="p-8"><EmptyState title="No candidates yet" message="Send invitations from the Invitations tab." /></div>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Invited</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invites.map((inv) => (
              <tr key={inv.id}>
                <td className="px-4 py-3 font-medium">{inv.candidate_name}</td>
                <td className="px-4 py-3 text-slate-600">{inv.candidate_email}</td>
                <td className="px-4 py-3"><Badge color={inv.status === 'completed' ? 'green' : inv.status === 'accessed' ? 'amber' : 'blue'}>{inv.status}</Badge></td>
                <td className="px-4 py-3">{inv.percentage != null ? `${inv.percentage}%` : '—'}</td>
                <td className="px-4 py-3 text-slate-500">{formatDate(inv.invited_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function InvitationsTab({ assessmentId, invites, canInvite, onReload, toast }) {
  const [form, setForm] = useState({ candidate_name: '', candidate_email: '' });
  const [sending, setSending] = useState(false);
  const [resending, setResending] = useState(null);

  const send = async (e) => {
    e.preventDefault();
    if (!canInvite) {
      toast.error('Add at least one question before sending invitations.');
      return;
    }
    setSending(true);
    try {
      const result = await adminService.createInvite({ assessment_id: Number(assessmentId), ...form });
      toast.success(result.resent ? 'Invitation resent' : 'Invitation sent via email');
      setForm({ candidate_name: '', candidate_email: '' });
      onReload();
    } catch (err) {
      toast.error(err.message || 'Failed to send');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <form onSubmit={send} className="card space-y-4 p-5">
        <h2 className="font-semibold">Invite candidate</h2>
        {!canInvite && (
          <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">Add questions before inviting candidates.</p>
        )}
        <div>
          <label className="label">Candidate name</label>
          <input className="input" required value={form.candidate_name} onChange={(e) => setForm((f) => ({ ...f, candidate_name: e.target.value }))} />
        </div>
        <div>
          <label className="label">Candidate email</label>
          <input className="input" type="email" required value={form.candidate_email} onChange={(e) => setForm((f) => ({ ...f, candidate_email: e.target.value }))} />
        </div>
        <button type="submit" className="btn-primary w-full" disabled={sending || !canInvite}>
          {sending ? <Spinner className="h-4 w-4 text-white" /> : 'Send invitation email'}
        </button>
      </form>

      <div className="card p-5">
        <h2 className="mb-4 font-semibold">Invitation history</h2>
        {invites.length === 0 ? (
          <EmptyState title="No invitations sent" />
        ) : (
          <ul className="space-y-3">
            {invites.map((inv) => (
              <li key={inv.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 p-3">
                <div>
                  <p className="font-medium">{inv.candidate_name}</p>
                  <p className="text-sm text-slate-500">{inv.candidate_email}</p>
                  <p className="text-xs text-slate-400">Sent {formatDate(inv.invited_at)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge color={inv.status === 'completed' ? 'green' : 'blue'}>{inv.status}</Badge>
                  {inv.status !== 'completed' && (
                    <button type="button" className="btn-secondary text-xs" disabled={resending === inv.id}
                      onClick={async () => {
                        setResending(inv.id);
                        try {
                          await adminService.resendInvite(inv.id);
                          toast.success('Invitation resent');
                        } catch (err) {
                          toast.error(err.message);
                        } finally {
                          setResending(null);
                        }
                      }}>
                      {resending === inv.id ? '…' : 'Resend'}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function PreviewModal({ open, onClose, data }) {
  if (!data) return null;
  const { assessment, sections, questions, summary } = data;

  return (
    <Modal open={open} onClose={onClose} title="Assessment preview" size="xl">
      <div className="max-h-[70vh] space-y-6 overflow-y-auto">
        <div className="rounded-lg bg-slate-50 p-4">
          <h3 className="text-lg font-bold text-slate-900">{assessment.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{assessment.description}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <span><strong>{assessment.duration_minutes}</strong> min</span>
            <span><strong>{summary.question_count}</strong> questions</span>
            <span><strong>{summary.total_marks}</strong> marks</span>
            <span>Pass: <strong>{assessment.passing_marks}</strong></span>
          </div>
          {assessment.instructions && (
            <p className="mt-3 rounded bg-brand-50 p-3 text-sm text-brand-900">{assessment.instructions}</p>
          )}
        </div>

        {sections.length > 0 && (
          <div>
            <h4 className="mb-2 font-semibold text-slate-800">Sections</h4>
            <div className="flex flex-wrap gap-2">
              {sections.map((s) => <Badge key={s.id} color="slate">{s.name}</Badge>)}
            </div>
          </div>
        )}

        <div>
          <h4 className="mb-3 font-semibold text-slate-800">Questions (admin view with answers)</h4>
          <ol className="space-y-4">
            {questions.map((q, i) => {
              const opts = Array.isArray(q.options) ? q.options : [];
              return (
                <li key={q.id} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex gap-2">
                    <Badge color="blue">{q.question_type}</Badge>
                    <Badge color="green">{q.marks} mk</Badge>
                  </div>
                  <p className="mt-2 font-medium">Q{i + 1}. {q.question_text}</p>
                  {(q.question_type === 'mcq' || q.question_type === 'multi_select') && (
                    <ul className="mt-2 text-sm">
                      {opts.map((o, j) => {
                        const hasAnswerKey = Boolean(
                          q.question_type === 'multi_select'
                            ? Array.isArray(q.correct_indices) && q.correct_indices.length > 0
                            : (q.correct_index !== null && q.correct_index !== undefined && q.correct_index !== '')
                        );
                        const isCorrect = (
                          q.question_type === 'multi_select'
                            ? (q.correct_indices || []).includes(j)
                            : (q.correct_index !== null && q.correct_index !== undefined && q.correct_index !== '' && j === Number(q.correct_index))
                        );
                        const optText = typeof o === 'object' ? (o.text || JSON.stringify(o)) : o;
                        return (
                          <li
                            key={j}
                            className={isCorrect ? 'text-emerald-700 font-medium' : 'text-slate-600'}
                          >
                            {isCorrect && '✓ '}
                            {optText}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {(q.question_type === 'integer' || q.question_type === 'numerical') && (
                    <div className="mt-2 text-sm text-emerald-700 font-medium">
                      Integer / Numerical Answer: <strong>{q.numeric_answer !== null && q.numeric_answer !== undefined ? q.numeric_answer : (q.correct_index ?? 'Not specified')}</strong>
                    </div>
                  )}
                  {q.question_type === 'coding' && (
                    <pre className="mt-2 overflow-x-auto rounded bg-slate-900 p-3 text-xs text-slate-100">{q.starter_code}</pre>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Modal>
  );
}
