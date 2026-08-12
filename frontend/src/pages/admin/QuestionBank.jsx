import { useEffect, useState, useRef } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { questionBankService, adminService } from '../../lib/services.js';
import { LoadingScreen, Spinner, DataTable, Badge } from '../../components/ui.jsx';
import { AdminHeader } from '../../components/admin/AdminUI.jsx';
import ActionDropdown from '../../components/ActionDropdown.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import Modal from '../../components/Modal.jsx';
import { BANK_CSV_TEMPLATE, readFileAsText } from '../../lib/csv.js';

const tryParseArray = (val) => {
  if (Array.isArray(val)) return val;
  try {
    const parsed = JSON.parse(val);
    if (Array.isArray(parsed)) return parsed;
  } catch { /* ignore */ }
  return [];
};

const DEFAULT_CATEGORIES = ['Physics', 'Chemistry', 'Mathematics', 'Botany', 'Zoology'];

export default function AdminQuestionBank() {
  const toast = useToast();
  const [category, setCategory] = useState('Physics');
  const [categoriesList, setCategoriesList] = useState(DEFAULT_CATEGORIES);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);
  const [csvText, setCsvText] = useState(BANK_CSV_TEMPLATE);
  const [uploading, setUploading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const fileRef = useRef(null);

  // Modal & Form States
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    question_type: 'mcq',
    question_text: '',
    options: 'A|B|C|D',
    correct_option: 0,
    solution_text: '',
    explanation_url: '',
  });

  const [subjectsList, setSubjectsList] = useState([]);
  const [chaptersList, setChaptersList] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const [data, subjects] = await Promise.all([
        questionBankService.byCategory(category),
        adminService.subjects().catch(() => []),
      ]);
      setQuestions(data || []);

      const subNames = (subjects || []).map((s) => s.name).filter(Boolean);
      const combined = Array.from(new Set([...DEFAULT_CATEGORIES, ...subNames]));
      setCategoriesList(combined);
    } catch {
      toast.error('Could not load questions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [category]);

  const openAdd = () => {
    setEditing(null);
    setForm({
      question_type: 'mcq',
      question_text: '',
      options: 'A|B|C|D',
      correct_option: 0,
      solution_text: '',
      explanation_url: '',
    });
    setModalOpen(true);
  };

  const openEdit = (q) => {
    setEditing(q);
    const opts = tryParseArray(q.options);
    setForm({
      question_type: q.question_type || 'mcq',
      question_text: q.question_text || '',
      options: opts.length ? opts.join('|') : (typeof q.options === 'string' ? q.options : 'A|B|C|D'),
      correct_option: q.correct_option ?? 0,
      solution_text: q.solution_text || '',
      explanation_url: q.explanation_url || '',
    });
    setModalOpen(true);
  };

  const removeQuestion = async (id) => {
    if (!window.confirm('Delete this question permanently?')) return;
    try {
      await questionBankService.delete(id);
      toast.success('Question deleted');
      load();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const saveQuestion = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        subject: category,
        correct_option: Number(form.correct_option),
      };

      if (editing) {
        await questionBankService.update(editing.id, payload);
        toast.success('Question updated');
      } else {
        await questionBankService.create(payload);
        toast.success('Question created');
      }
      setModalOpen(false);
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const uploadCsv = async () => {
    setUploading(true);
    try {
      const res = await questionBankService.bulkUpload(csvText, category);
      toast.success(`Imported ${res.created} questions${res.errors?.length ? ` (${res.errors.length} errors)` : ''}`);
      setCsvOpen(false);
      load();
    } catch (err) {
      toast.error(err.message || 'Import failed');
    } finally {
      setUploading(false);
    }
  };

  const exportCsv = async (all = false) => {
    setExporting(true);
    try {
      await questionBankService.exportCsv(all ? null : category);
      toast.success('Export downloaded');
    } catch (err) {
      toast.error(err.message || 'Export failed');
    } finally {
      setExporting(false);
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setCsvText(await readFileAsText(file));
      toast.success(`Loaded ${file.name}`);
    } catch {
      toast.error('Could not read file');
    }
    e.target.value = '';
  };

  return (
    <div className="w-full max-w-full space-y-6">
      <AdminHeader
        title="Question Repository & Bank"
        subtitle={`Managing reusable exam questions — bulk import, export, and subject organization (${questions.length} in ${category}).`}
        breadcrumbs={['Question Repository']}
        actions={(
          <>
            <button type="button" className="btn btn-primary" onClick={openAdd}>+ Add Question</button>
            <button type="button" className="btn btn-secondary" onClick={() => setCsvOpen(true)}>CSV Import</button>
            <button type="button" className="btn btn-secondary" onClick={() => exportCsv(false)} disabled={exporting}>
              Export {category}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => exportCsv(true)} disabled={exporting}>
              Export All
            </button>
          </>
        )}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {categoriesList.map((c) => (
          <button
            key={c}
            type="button"
            className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-extrabold transition-all duration-200 ${
              category === c
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
            }`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? <LoadingScreen /> : (
        <div className="card overflow-hidden p-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
          <DataTable
            columns={[
              { key: 'question_text', label: 'Question', render: (q) => (
                <div className="flex flex-col gap-1 max-w-md">
                  <span className="line-clamp-2 text-slate-900 dark:text-slate-100 font-extrabold leading-snug">{q.question_text}</span>
                  {q.solution && <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">Sol: {q.solution}</span>}
                </div>
              ) },
              { key: 'question_type', label: 'Type', render: (q) => (
                <span className="uppercase text-[10px] font-black tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">{q.question_type}</span>
              ) },
              { key: 'difficulty', label: 'Difficulty', render: (q) => (
                <Badge color={q.difficulty === 'hard' ? 'red' : q.difficulty === 'medium' ? 'amber' : 'green'}>
                  {q.difficulty || 'medium'}
                </Badge>
              ) },
              { key: 'marks', label: 'Marks', render: (q) => <span className="font-black text-slate-900 dark:text-white text-xs">{q.marks}</span> },
              { key: 'actions', label: '', render: (q) => (
                <div className="flex justify-end pr-2">
                  <ActionDropdown
                    items={[
                      {
                        label: 'Edit Question',
                        icon: Pencil,
                        onClick: () => openEdit(q),
                        color: 'text-blue-600 dark:text-blue-400',
                      },
                      {
                        label: 'Delete Question',
                        icon: Trash2,
                        onClick: () => removeQuestion(q.id),
                        danger: true,
                      },
                    ]}
                  />
                </div>
              ) },
            ]}
            rows={questions}
            emptyMessage={`No questions in ${category}. Import via CSV or add manually.`}
          />
        </div>
      )}

      {/* Add / Edit Question Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit question' : 'Add question'} size="lg">
        <form onSubmit={saveQuestion} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Question type</label>
              <select className="input" value={form.question_type} disabled={!!editing}
                onChange={(e) => setForm((f) => ({ ...f, question_type: e.target.value }))}>
                <option value="mcq">Single correct MCQ</option>
                <option value="multi_select">Multiple correct MCQ</option>
                <option value="integer">Integer type</option>
                <option value="numerical">Numerical answer type</option>
                <option value="assertion_reason">Assertion-reason type</option>
                <option value="coding">Coding</option>
                <option value="subjective">Subjective</option>
              </select>
            </div>
            <div>
              <label className="label">Marks</label>
              <input type="number" min={1} className="input" value={form.marks} onChange={(e) => setForm((f) => ({ ...f, marks: Number(e.target.value) }))} />
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
            <textarea rows={3} className="input" required value={form.question_text} onChange={(e) => setForm((f) => ({ ...f, question_text: e.target.value }))} />
          </div>

          {form.question_type === 'assertion_reason' && (
            <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div>
                <label className="label">Assertion (A)</label>
                <textarea rows={2} className="input" placeholder="Statement 1" value={form.assertion_text || ''} onChange={(e) => setForm((f) => ({ ...f, assertion_text: e.target.value }))} />
              </div>
              <div>
                <label className="label">Reason (R)</label>
                <textarea rows={2} className="input" placeholder="Statement 2" value={form.reason_text || ''} onChange={(e) => setForm((f) => ({ ...f, reason_text: e.target.value }))} />
              </div>
            </div>
          )}

          {(form.question_type === 'mcq' || form.question_type === 'single_choice' || form.question_type === 'multi_select' || form.question_type === 'assertion_reason') && (
            <>
              <div>
                <label className="label">Options (pipe-separated e.g. Option A|Option B|Option C|Option D)</label>
                <input className="input" required value={form.options} onChange={(e) => setForm((f) => ({ ...f, options: e.target.value }))} />
              </div>
              {form.question_type === 'multi_select' ? (
                <div>
                  <label className="label">Correct Option Indices (0-based, comma-separated e.g. 0,2 for A and C)</label>
                  <input
                    className="input"
                    placeholder="e.g. 0,2"
                    required
                    value={form.correct_indices_str || ''}
                    onChange={(e) => setForm((f) => ({ ...f, correct_indices_str: e.target.value }))}
                  />
                </div>
              ) : (
                <div>
                  <label className="label">Correct Option Index (0-based, e.g. 0 for A, 1 for B)</label>
                  <input className="input" type="number" min={0} required value={form.correct_index} onChange={(e) => setForm((f) => ({ ...f, correct_index: Number(e.target.value) }))} />
                </div>
              )}
            </>
          )}

          {(form.question_type === 'integer' || form.question_type === 'numerical') && (
            <div className="grid grid-cols-2 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div>
                <label className="label">Correct Numeric Answer</label>
                <input className="input font-mono" type="number" step="any" required value={form.numeric_answer ?? ''} onChange={(e) => setForm((f) => ({ ...f, numeric_answer: e.target.value !== '' ? Number(e.target.value) : '' }))} />
              </div>
              {form.question_type === 'numerical' && (
                <div>
                  <label className="label">Tolerance (±)</label>
                  <input className="input font-mono" type="number" step="any" min={0} value={form.numerical_tolerance ?? 0.01} onChange={(e) => setForm((f) => ({ ...f, numerical_tolerance: Number(e.target.value) || 0 }))} />
                </div>
              )}
            </div>
          )}

          <div>
            <label className="label">Image URL (optional)</label>
            <input className="input" placeholder="e.g. /images/q1.png" value={form.image_url || ''} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))} />
          </div>

          <div>
            <label className="label">Detailed Solution Explanation (optional)</label>
            <textarea rows={3} className="input" placeholder="Explain the step-by-step solution..." value={form.solution || ''} onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value }))} />
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 mt-4">
            <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? <Spinner className="h-4 w-4" /> : 'Save Question'}</button>
          </div>
        </form>
      </Modal>

      <Modal open={csvOpen} onClose={() => setCsvOpen(false)} title="Bulk CSV import to question bank" size="lg">
        <p className="mb-3 text-sm text-muted">
          Columns: category, question_text, question_type, marks, options, correct_index, correct_indices, solution, subject_id, chapter_id, difficulty, image_url.
          If CSV has no category column, questions go to <strong>{category}</strong>.
        </p>
        <div className="mb-3 flex flex-wrap gap-2">
          <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={handleFile} />
          <button type="button" className="btn-secondary text-xs" onClick={() => fileRef.current?.click()}>Choose CSV file</button>
          <button type="button" className="btn-secondary text-xs" onClick={() => setCsvText(BANK_CSV_TEMPLATE)}>Load template</button>
        </div>
        <textarea className="input font-mono text-xs" rows={12} value={csvText} onChange={(e) => setCsvText(e.target.value)} />
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" className="btn-secondary" onClick={() => setCsvOpen(false)}>Cancel</button>
          <button type="button" className="btn-primary" onClick={uploadCsv} disabled={uploading}>
            {uploading ? <Spinner className="h-4 w-4" /> : 'Import to bank'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
