import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
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

const QUESTION_TYPES = [
  { id: 'mcq', label: 'MCQ' },
  { id: 'multi_select', label: 'Multiple Select' },
  { id: 'coding', label: 'Coding' },
  { id: 'subjective', label: 'Subjective' },
];

const SECTION_TYPES = [
  { value: 'aptitude', label: 'Aptitude' },
  { value: 'technical_mcq', label: 'Technical MCQ' },
  { value: 'coding', label: 'Coding' },
  { value: 'subjective', label: 'Subjective' },
];

const emptyForm = (type) => ({
  question_type: type,
  question_text: '',
  options: ['', ''],
  correct_index: 0,
  correct_indices: [],
  marks: type === 'coding' ? 4 : type === 'subjective' ? 2 : 1,
  section_id: null,
  starter_code: 'function solution() {\n  \n}\n',
  test_cases: [{ input: '', expected: '' }],
  solution: '',
  image_url: '',
  subject_id: null,
  chapter_id: null,
  difficulty: 'medium',
});

export default function AssessmentEditor() {
  const { assessmentId } = useParams();
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

  const load = useCallback(async () => {
    setState('loading');
    try {
      const data = await assessmentService.getAdmin(assessmentId);
      setAssessment(data.assessment);
      setSections(data.sections || []);
      setQuestions(data.questions || []);
      setInvites(data.invites || []);
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
      });
      setState('done');
    } catch {
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
      <Link to="/admin/assessments" className="mb-4 inline-flex text-sm text-slate-500 hover:text-slate-700">← Back to assessments</Link>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{assessment.title}</h1>
            {assessment.is_published ? <Badge color="green">Published</Badge> : <Badge color="slate">Draft</Badge>}
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {questions.length} questions · {totalMarks} marks · {invites.length} invitations
          </p>
          {!canPublish && !assessment.is_published && (
            <p className="mt-2 text-sm font-medium text-amber-600">Add at least one question to publish this assessment.</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-secondary" onClick={openPreview}>Preview</button>
          <button type="button" className={assessment.is_published ? 'btn-secondary' : 'btn-primary'} onClick={handlePublish}>
            {assessment.is_published ? 'Unpublish' : 'Publish'}
          </button>
        </div>
      </div>

      <nav className="mb-6 flex flex-wrap gap-1 border-b border-slate-200">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition ${
              tab === t.id ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === 'general' && (
        <GeneralTab settings={settings} setSettings={setSettings} saving={savingSettings}
          onSave={async (e) => {
            e.preventDefault();
            setSavingSettings(true);
            try {
              const payload = {
                ...settings,
                available_from: settings.available_from ? new Date(settings.available_from).toISOString() : null,
                available_until: settings.available_until ? new Date(settings.available_until).toISOString() : null,
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
        <QuestionsTab assessmentId={assessmentId} questions={questions} sections={sections} onReload={load} toast={toast} />
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

function GeneralTab({ settings, onChange, onSave, saving }) {
  return (
    <form onSubmit={onSave} className="card max-w-2xl space-y-5 p-6">
      <h2 className="text-lg font-semibold text-slate-900">General settings</h2>
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
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="label">Duration (min)</label>
          <input name="duration_minutes" type="number" min={1} className="input" value={settings.duration_minutes} onChange={onChange} />
        </div>
        <div>
          <label className="label">Passing marks</label>
          <input name="passing_marks" type="number" min={0} className="input" value={settings.passing_marks} onChange={onChange} />
        </div>
        <div>
          <label className="label">Max violations</label>
          <input name="max_violations" type="number" min={0} className="input" value={settings.max_violations} onChange={onChange} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Available from (optional start time)</label>
          <input name="available_from" type="datetime-local" className="input" value={settings.available_from || ''} onChange={onChange} />
        </div>
        <div>
          <label className="label">Available until (optional end time)</label>
          <input name="available_until" type="datetime-local" className="input" value={settings.available_until || ''} onChange={onChange} />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="result_visible" checked={settings.result_visible} onChange={onChange} className="h-4 w-4 rounded" />
        Show results to candidates after submission
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="negative_marking" checked={settings.negative_marking} onChange={onChange} className="h-4 w-4 rounded" />
        Enable negative marking (NTA-style)
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

function QuestionsTab({ assessmentId, questions, sections, onReload, toast }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm('mcq'));
  const [saving, setSaving] = useState(false);
  const [bankOpen, setBankOpen] = useState(false);
  const [bankCategory, setBankCategory] = useState('JavaScript');
  const [bankQuestions, setBankQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [csvOpen, setCsvOpen] = useState(false);
  const [csvText, setCsvText] = useState(CSV_TEMPLATE);
  const [uploading, setUploading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const fileRef = useRef(null);

  const openAdd = (type) => {
    setEditing(null);
    const f = emptyForm(type);
    const sec = sections.find((s) => s.section_type.includes(type === 'mcq' || type === 'multi_select' ? 'mcq' : type)) || sections[0];
    setForm({ ...f, section_id: sec?.id || null });
    setModalOpen(true);
  };

  const openEdit = (q) => {
    setEditing(q);
    const opts = Array.isArray(q.options) ? q.options : (typeof q.options === 'string' ? JSON.parse(q.options) : []);
    const indices = Array.isArray(q.correct_indices) ? q.correct_indices : [];
    setForm({
      question_type: q.question_type || 'mcq',
      question_text: q.question_text,
      options: opts.length ? [...opts] : ['', ''],
      correct_index: q.correct_index ?? 0,
      correct_indices: indices,
      marks: q.marks,
      section_id: q.section_id,
      starter_code: q.starter_code || '',
      test_cases: q.test_cases?.length ? q.test_cases : [{ input: '', expected: '' }],
      solution: q.solution || '',
      image_url: q.image_url || '',
      subject_id: q.subject_id || null,
      chapter_id: q.chapter_id || null,
      difficulty: q.difficulty || 'medium',
    });
    setModalOpen(true);
  };

  const saveQuestion = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        section_id: form.section_id || null,
        options: form.options.map((o) => o.trim()).filter(Boolean),
      };
      if (['mcq', 'multi_select'].includes(payload.question_type) && payload.options.length < 2) {
        toast.error('Need at least 2 options');
        setSaving(false);
        return;
      }
      if (payload.question_type === 'multi_select' && (!payload.correct_indices?.length)) {
        toast.error('Select at least one correct answer');
        setSaving(false);
        return;
      }
      if (editing) {
        await questionService.update(editing.id, payload);
        toast.success('Question updated');
      } else {
        await questionService.create(assessmentId, payload);
        toast.success('Question added');
      }
      setModalOpen(false);
      onReload();
    } catch (err) {
      toast.error(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const moveQuestion = async (idx, dir) => {
    const sorted = [...questions].sort((a, b) => a.position - b.position);
    const swap = idx + dir;
    if (swap < 0 || swap >= sorted.length) return;
    [sorted[idx], sorted[swap]] = [sorted[swap], sorted[idx]];
    await questionService.reorder(assessmentId, sorted.map((q, i) => ({ id: q.id, position: i + 1 })));
    onReload();
  };

  const loadBank = async (cat) => {
    setBankCategory(cat);
    setCategories(await questionBankService.categories());
    setBankQuestions(await questionBankService.list(cat));
    setBankOpen(true);
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
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-secondary text-xs" onClick={() => setCsvOpen(true)}>CSV Import</button>
            <button type="button" className="btn-secondary text-xs" onClick={exportCsv} disabled={exporting || !questions.length}>
              {exporting ? <Spinner className="h-3 w-3" /> : 'CSV Export'}
            </button>
            {QUESTION_TYPES.map((t) => (
              <button key={t.id} type="button" className="btn-secondary text-xs" onClick={() => openAdd(t.id)}>+ {t.label}</button>
            ))}
          </div>
        </div>

        {questions.length === 0 ? (
          <EmptyState title="No questions yet" message="Add questions manually or import from the question bank."
            action={<button type="button" className="btn-primary" onClick={() => openAdd('mcq')}>Add first question</button>} />
        ) : (
          <div className="space-y-3">
            {[...questions].sort((a, b) => a.position - b.position).map((q, idx) => (
              <QuestionCard key={q.id} q={q} idx={idx} total={questions.length}
                onEdit={() => openEdit(q)}
                onDelete={async () => {
                  if (!window.confirm('Delete this question?')) return;
                  await questionService.remove(q.id);
                  toast.success('Deleted');
                  onReload();
                }}
                onMoveUp={() => moveQuestion(idx, -1)}
                onMoveDown={() => moveQuestion(idx, 1)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="card p-5">
        <h3 className="mb-3 font-semibold text-slate-900">Question bank</h3>
        <p className="mb-4 text-sm text-slate-500">Import pre-built questions by category.</p>
        <div className="space-y-2">
          {['Aptitude', 'JavaScript', 'React', 'HTML', 'CSS', 'Node.js'].map((cat) => (
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

      <QuestionBuilderModal open={modalOpen} onClose={() => setModalOpen(false)} editing={!!editing}
        form={form} setForm={setForm} sections={sections} onSubmit={saveQuestion} saving={saving} />

      <Modal open={bankOpen} onClose={() => setBankOpen(false)} title={`Question bank — ${bankCategory}`} size="lg">
        {bankQuestions.length === 0 ? (
          <p className="text-sm text-slate-500">No questions in this category. Run db:seed to populate the bank.</p>
        ) : (
          <ul className="max-h-96 space-y-3 overflow-y-auto">
            {bankQuestions.map((bq) => (
              <li key={bq.id} className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 p-3">
                <div className="min-w-0 flex-1">
                  <Badge color="blue">{bq.question_type}</Badge>
                  <p className="mt-1 text-sm text-slate-800">{bq.question_text}</p>
                  <p className="text-xs text-slate-500">{bq.marks} marks</p>
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
    </div>
  );
}

function QuestionCard({ q, idx, total, onEdit, onDelete, onMoveUp, onMoveDown }) {
  const opts = Array.isArray(q.options) ? q.options : [];
  const typeLabel = QUESTION_TYPES.find((t) => t.id === q.question_type)?.label || q.question_type;

  return (
    <div className="card p-4">
      <div className="flex gap-3">
        <div className="flex flex-col gap-1">
          <button type="button" className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-30" onClick={onMoveUp} disabled={idx === 0} title="Move up">↑</button>
          <span className="text-center text-xs font-bold text-slate-400">{idx + 1}</span>
          <button type="button" className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-30" onClick={onMoveDown} disabled={idx === total - 1} title="Move down">↓</button>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-2">
            <Badge color="blue">{typeLabel}</Badge>
            {q.section_name && <Badge color="slate">{q.section_name}</Badge>}
            <Badge color="green">{q.marks} mk</Badge>
          </div>
          <p className="mt-2 text-sm font-medium text-slate-900">{q.question_text}</p>
          {(q.question_type === 'mcq' || q.question_type === 'multi_select') && (
            <ul className="mt-2 space-y-0.5 text-sm text-slate-600">
              {opts.map((opt, i) => {
                const correct = q.question_type === 'multi_select'
                  ? (q.correct_indices || []).includes(i)
                  : i === q.correct_index;
                return <li key={i} className={correct ? 'font-medium text-emerald-700' : ''}>{opt}</li>;
              })}
            </ul>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-1">
          <button type="button" className="text-sm text-brand-600 hover:underline" onClick={onEdit}>Edit</button>
          <button type="button" className="text-sm text-red-600 hover:underline" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function QuestionBuilderModal({ open, onClose, editing, form, setForm, sections, onSubmit, saving }) {
  const isChoice = form.question_type === 'mcq' || form.question_type === 'multi_select';
  const [subjectsList, setSubjectsList] = useState([]);
  const [chaptersList, setChaptersList] = useState([]);

  useEffect(() => {
    if (open) {
      adminService.subjects().then((list) => {
        setSubjectsList(list || []);
      }).catch(() => {});
    }
  }, [open]);

  useEffect(() => {
    if (form.subject_id) {
      adminService.chapters(form.subject_id).then((list) => {
        setChaptersList(list || []);
      }).catch(() => {});
    } else {
      setChaptersList([]);
    }
  }, [form.subject_id]);

  const toggleMulti = (i) => {
    setForm((f) => {
      const set = new Set(f.correct_indices || []);
      if (set.has(i)) set.delete(i); else set.add(i);
      return { ...f, correct_indices: [...set].sort((a, b) => a - b) };
    });
  };

  return (
    <Modal open={open} onClose={onClose} title={editing ? 'Edit question' : 'Add question'} size="lg">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Question type</label>
            <select className="input" value={form.question_type} disabled={!!editing}
              onChange={(e) => setForm((f) => ({ ...emptyForm(e.target.value), question_text: f.question_text, section_id: f.section_id }))}>
              {QUESTION_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Section</label>
            <select className="input" value={form.section_id || ''} onChange={(e) => setForm((f) => ({ ...f, section_id: Number(e.target.value) || null }))}>
              <option value="">None</option>
              {sections.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="label">Subject</label>
            <select className="input" value={form.subject_id || ''} onChange={(e) => setForm((f) => ({ ...f, subject_id: Number(e.target.value) || null, chapter_id: null }))}>
              <option value="">Select subject</option>
              {subjectsList.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Chapter</label>
            <select className="input" value={form.chapter_id || ''} onChange={(e) => setForm((f) => ({ ...f, chapter_id: Number(e.target.value) || null }))} disabled={!form.subject_id}>
              <option value="">Select chapter</option>
              {chaptersList.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Difficulty</label>
            <select className="input" value={form.difficulty || 'medium'} onChange={(e) => setForm((f) => ({ ...f, difficulty: e.target.value }))}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <div>
          <label className="label">Question text</label>
          <textarea rows={3} className="input" required value={form.question_text}
            onChange={(e) => setForm((f) => ({ ...f, question_text: e.target.value }))} />
        </div>

        {isChoice && (
          <div>
            <label className="label">{form.question_type === 'multi_select' ? 'Options (check all correct)' : 'Options (select one correct)'}</label>
            <div className="space-y-2">
              {form.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  {form.question_type === 'multi_select' ? (
                    <input type="checkbox" checked={(form.correct_indices || []).includes(i)} onChange={() => toggleMulti(i)} />
                  ) : (
                    <input type="radio" name="correct" checked={form.correct_index === i} onChange={() => setForm((f) => ({ ...f, correct_index: i }))} />
                  )}
                  <input className="input flex-1" value={opt}
                    onChange={(e) => setForm((f) => ({ ...f, options: f.options.map((o, j) => (j === i ? e.target.value : o)) }))} />
                  {form.options.length > 2 && (
                    <button type="button" className="text-red-500" onClick={() => setForm((f) => ({ ...f, options: f.options.filter((_, j) => j !== i) }))}>×</button>
                  )}
                </div>
              ))}
            </div>
            {form.options.length < 6 && (
              <button type="button" className="mt-2 text-sm text-brand-600" onClick={() => setForm((f) => ({ ...f, options: [...f.options, ''] }))}>+ Add option</button>
            )}
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
            <input type="number" min={1} className="input" value={form.marks} onChange={(e) => setForm((f) => ({ ...f, marks: Number(e.target.value) }))} />
          </div>
          <div>
            <label className="label">Image URL (optional)</label>
            <input className="input" placeholder="e.g. /images/q1.png" value={form.image_url || ''} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))} />
          </div>
        </div>

        <div>
          <label className="label">Detailed Solution Explanation (optional)</label>
          <textarea rows={3} className="input" placeholder="Explain the step-by-step solution..." value={form.solution || ''} onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value }))} />
        </div>

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
                      {opts.map((o, j) => (
                        <li key={j} className={
                          q.question_type === 'multi_select'
                            ? (q.correct_indices || []).includes(j) ? 'text-emerald-700 font-medium' : 'text-slate-600'
                            : j === q.correct_index ? 'text-emerald-700 font-medium' : 'text-slate-600'
                        }>{o}</li>
                      ))}
                    </ul>
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
