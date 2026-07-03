import { useEffect, useState, useRef } from 'react';
import { questionBankService } from '../../lib/services.js';
import { LoadingScreen, PageHeader, Spinner, DataTable } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import Modal from '../../components/Modal.jsx';
import { BANK_CSV_TEMPLATE, readFileAsText } from '../../lib/csv.js';

const CATEGORIES = ['Aptitude', 'JavaScript', 'React', 'HTML', 'CSS', 'Node.js'];

export default function AdminQuestionBank() {
  const toast = useToast();
  const [category, setCategory] = useState('JavaScript');
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({ question_text: '', options: 'A|B|C|D', correct_index: 0, marks: 1, solution: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);
  const [csvText, setCsvText] = useState(BANK_CSV_TEMPLATE);
  const [uploading, setUploading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const fileRef = useRef(null);

  const load = () => {
    setLoading(true);
    questionBankService.list(category).then(setQuestions).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [category]);

  const add = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await questionBankService.create({
        category,
        question_text: form.question_text,
        options: form.options.split('|').map((o) => o.trim()),
        correct_index: Number(form.correct_index),
        marks: Number(form.marks),
        solution: form.solution,
      });
      toast.success('Question added');
      setForm({ question_text: '', options: 'A|B|C|D', correct_index: 0, marks: 1, solution: '' });
      load();
    } catch (err) { toast.error(err.message); }
    finally { setSaving(false); }
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

      <form onSubmit={add} className="card mb-6 space-y-3 p-4">
        <textarea className="input" placeholder="Question text" value={form.question_text} onChange={(e) => setForm((f) => ({ ...f, question_text: e.target.value }))} required />
        <input className="input" placeholder="Options (pipe-separated)" value={form.options} onChange={(e) => setForm((f) => ({ ...f, options: e.target.value }))} />
        <div className="grid grid-cols-3 gap-3">
          <input className="input" type="number" placeholder="Correct index" value={form.correct_index} onChange={(e) => setForm((f) => ({ ...f, correct_index: e.target.value }))} />
          <input className="input" type="number" placeholder="Marks" value={form.marks} onChange={(e) => setForm((f) => ({ ...f, marks: e.target.value }))} />
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? <Spinner className="h-4 w-4" /> : 'Add question'}</button>
        </div>
        <input className="input" placeholder="Solution (optional)" value={form.solution} onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value }))} />
      </form>

      {loading ? <LoadingScreen /> : (
        <div className="card overflow-hidden">
          <DataTable
            columns={[
              { key: 'question_text', label: 'Question', render: (q) => (
                <span className="line-clamp-2 max-w-md">{q.question_text}</span>
              ) },
              { key: 'question_type', label: 'Type' },
              { key: 'marks', label: 'Marks' },
              { key: 'actions', label: '', render: (q) => (
                <button type="button" className="text-xs font-medium text-red-600 hover:underline" onClick={async () => { await questionBankService.remove(q.id); load(); }}>
                  Delete
                </button>
              ) },
            ]}
            rows={questions}
            emptyMessage={`No questions in ${category}. Import via CSV or add manually.`}
          />
        </div>
      )}

      <Modal open={csvOpen} onClose={() => setCsvOpen(false)} title="Bulk CSV import to question bank" size="lg">
        <p className="mb-3 text-sm text-muted">
          Columns: category, question_text, question_type, marks, options, correct_index, correct_indices, solution.
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
