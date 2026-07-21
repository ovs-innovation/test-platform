import { useEffect, useState, useRef } from 'react';
import { questionBankService, adminService } from '../../lib/services.js';
import { LoadingScreen, PageHeader, Spinner, DataTable, Badge } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import Modal from '../../components/Modal.jsx';
import { BANK_CSV_TEMPLATE, readFileAsText } from '../../lib/csv.js';

const CATEGORIES = ['Aptitude', 'JavaScript', 'React', 'HTML', 'CSS', 'Node.js'];

export default function AdminQuestionBank() {
  const toast = useToast();
  const [category, setCategory] = useState('JavaScript');
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
    correct_index: 0,
    marks: 1,
    solution: '',
    image_url: '',
    subject_id: null,
    chapter_id: null,
    difficulty: 'medium',
  });

  const [subjectsList, setSubjectsList] = useState([]);
  const [chaptersList, setChaptersList] = useState([]);

  const load = () => {
    setLoading(true);
    questionBankService.list(category).then(setQuestions).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [category]);

  useEffect(() => {
    adminService.subjects().then((list) => {
      setSubjectsList(list || []);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (form.subject_id) {
      adminService.chapters(form.subject_id).then((list) => {
        setChaptersList(list || []);
      }).catch(() => {});
    } else {
      setChaptersList([]);
    }
  }, [form.subject_id]);

  const openAdd = () => {
    setEditing(null);
    setForm({
      question_type: 'mcq',
      question_text: '',
      options: 'A|B|C|D',
      correct_index: 0,
      marks: 1,
      solution: '',
      image_url: '',
      subject_id: null,
      chapter_id: null,
      difficulty: 'medium',
    });
    setModalOpen(true);
  };

  const openEdit = (q) => {
    setEditing(q);
    const opts = Array.isArray(q.options) ? q.options.join('|') : (q.options || 'A|B|C|D');
    setForm({
      question_type: q.question_type || 'mcq',
      question_text: q.question_text || '',
      options: opts,
      correct_index: q.correct_index ?? 0,
      marks: q.marks ?? 1,
      solution: q.solution || '',
      image_url: q.image_url || '',
      subject_id: q.subject_id || null,
      chapter_id: q.chapter_id || null,
      difficulty: q.difficulty || 'medium',
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        options: form.options.split('|').map((o) => o.trim()).filter(Boolean),
        correct_index: Number(form.correct_index),
        marks: Number(form.marks),
      };
      if (editing) {
        await questionBankService.update(editing.id, payload);
        toast.success('Question updated');
      } else {
        await questionBankService.create({
          category,
          ...payload,
        });
        toast.success('Question added');
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
    <div>
      <PageHeader
        title="Question bank"
        subtitle="Manage reusable questions — bulk import, export, and organize by category."
        actions={(
          <>
            <button type="button" className="btn-primary text-sm" onClick={openAdd}>+ Add question</button>
            <button type="button" className="btn-secondary text-sm" onClick={() => setCsvOpen(true)}>CSV Import</button>
            <button type="button" className="btn-secondary text-sm" onClick={() => exportCsv(false)} disabled={exporting}>
              Export {category}
            </button>
            <button type="button" className="btn-secondary text-sm" onClick={() => exportCsv(true)} disabled={exporting}>
              Export all
            </button>
          </>
        )}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button key={c} type="button" className={category === c ? 'btn-primary' : 'btn-secondary'} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>

      {loading ? <LoadingScreen /> : (
        <div className="card overflow-hidden">
          <DataTable
            columns={[
              { key: 'question_text', label: 'Question', render: (q) => (
                <div className="flex flex-col gap-1 max-w-md">
                  <span className="line-clamp-2 text-slate-800 font-medium">{q.question_text}</span>
                  {q.solution && <span className="text-[11px] text-slate-400 truncate">Sol: {q.solution}</span>}
                </div>
              ) },
              { key: 'question_type', label: 'Type', render: (q) => (
                <span className="uppercase text-xs font-semibold tracking-wider text-slate-500">{q.question_type}</span>
              ) },
              { key: 'difficulty', label: 'Difficulty', render: (q) => (
                <Badge color={q.difficulty === 'hard' ? 'red' : q.difficulty === 'medium' ? 'amber' : 'green'}>
                  {q.difficulty || 'medium'}
                </Badge>
              ) },
              { key: 'marks', label: 'Marks' },
              { key: 'actions', label: '', render: (q) => (
                <div className="flex gap-2">
                  <button type="button" className="text-xs font-medium text-brand-600 hover:underline" onClick={() => openEdit(q)}>
                    Edit
                  </button>
                  <button type="button" className="text-xs font-medium text-red-600 hover:underline" onClick={async () => {
                    if (confirm('Are you sure you want to delete this question?')) {
                      await questionBankService.remove(q.id);
                      load();
                    }
                  }}>
                    Delete
                  </button>
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
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Question type</label>
              <select className="input" value={form.question_type} disabled={!!editing}
                onChange={(e) => setForm((f) => ({ ...f, question_type: e.target.value }))}>
                <option value="mcq">MCQ</option>
                <option value="multi_select">Multiple Select</option>
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

          {(form.question_type === 'mcq' || form.question_type === 'multi_select') && (
            <>
              <div>
                <label className="label">Options (pipe-separated e.g. Option A|Option B|Option C|Option D)</label>
                <input className="input" required value={form.options} onChange={(e) => setForm((f) => ({ ...f, options: e.target.value }))} />
              </div>
              <div>
                <label className="label">Correct Option Index (0-based, e.g. 0 for A, 1 for B)</label>
                <input className="input" type="number" min={0} required value={form.correct_index} onChange={(e) => setForm((f) => ({ ...f, correct_index: Number(e.target.value) }))} />
              </div>
            </>
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
