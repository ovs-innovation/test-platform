import { useEffect, useRef, useState } from 'react';
import { testSeriesService, assessmentService } from '../../lib/services.js';
import { PageHeader, LoadingScreen, ErrorState, Spinner, Badge } from '../../components/ui.jsx';
import Modal from '../../components/Modal.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { getTestSeriesCover } from '../../lib/testSeriesCover.js';

const PDF_FORM_DEFAULT = {
  title: '',
  description: '',
  price: 0,
  exam_type: 'JEE Main',
  duration_minutes: 180,
  assessment_label: 'Mock 1',
  publish: true,
  image_url: '',
};

function readPdfAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminTestSeries() {
  const toast = useToast();
  const pdfInputRef = useRef(null);
  const [list, setList] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [state, setState] = useState('loading');
  const [modal, setModal] = useState(false);
  const [pdfModal, setPdfModal] = useState(false);
  const [linkModal, setLinkModal] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', price: 0, exam_type: 'JEE Main', test_count: 1, is_featured: false, is_active: true, validity_days: 365, image_url: '' });
  // Delete confirm modal states
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [seriesToDelete, setSeriesToDelete] = useState(null);
  const [pdfForm, setPdfForm] = useState(PDF_FORM_DEFAULT);
  const [pdfBase64, setPdfBase64] = useState('');
  const [pdfName, setPdfName] = useState('');
  const [pdfPreview, setPdfPreview] = useState(null);
  const [linkForm, setLinkForm] = useState({ assessment_id: '', label: '' });
  const [saving, setSaving] = useState(false);
  const [parsing, setParsing] = useState(false);

  const load = async () => {
    setState('loading');
    try {
      const [ts, a] = await Promise.all([testSeriesService.list(), assessmentService.listAll()]);
      setList(ts);
      setAssessments(a);
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => { load(); }, []);

  const resetPdfModal = () => {
    setPdfForm(PDF_FORM_DEFAULT);
    setPdfBase64('');
    setPdfName('');
    setPdfPreview(null);
  };

  const openPdfModal = () => {
    resetPdfModal();
    setPdfModal(true);
  };

  const handlePdfFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error('PDF must be under 8 MB');
      return;
    }
    const base64 = await readPdfAsBase64(file);
    setPdfBase64(base64);
    setPdfName(file.name);
    if (!pdfForm.title) {
      const titleGuess = file.name.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ').trim();
      setPdfForm((f) => ({ ...f, title: titleGuess }));
    }
  };

  const previewPdf = async () => {
    if (!pdfBase64) {
      toast.error('Choose a PDF first');
      return;
    }
    setParsing(true);
    try {
      const data = await testSeriesService.parsePdf(pdfBase64);
      setPdfPreview(data);
      if (!data.question_count) toast.error('No questions found in PDF — check format');
      else toast.success(`Found ${data.question_count} questions`);
    } catch (err) {
      toast.error(err.message || 'Could not parse PDF');
    } finally {
      setParsing(false);
    }
  };

  const importPdf = async (e) => {
    e.preventDefault();
    if (!pdfBase64) {
      toast.error('Choose a PDF first');
      return;
    }
    setSaving(true);
    try {
      const result = await testSeriesService.importFromPdf({ ...pdfForm, pdf_base64: pdfBase64 });
      toast.success(result.message || 'Test series created from PDF');
      setPdfModal(false);
      resetPdfModal();
      load();
    } catch (err) {
      toast.error(err.message || 'Import failed');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await testSeriesService.update(editing.id, form);
        toast.success('Test series updated');
      } else {
        await testSeriesService.create(form);
        toast.success('Test series created');
      }
      setModal(false);
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const linkTest = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await testSeriesService.link(linkModal.id, {
        assessment_id: Number(linkForm.assessment_id),
        label: linkForm.label,
      });
      toast.success('Test linked');
      setLinkModal(null);
      load();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (s) => {
    const newStatus = !s.is_active;
    try {
      await testSeriesService.toggleActive(s.id, newStatus);
      toast.success(newStatus ? `"${s.title}" activated successfully` : `"${s.title}" deactivated successfully`);
      setList((prev) => prev.map((item) => (item.id === s.id ? { ...item, is_active: newStatus } : item)));
    } catch (err) {
      toast.error(err.message || 'Failed to update test series status');
    }
  };

  if (state === 'loading') return <LoadingScreen />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  return (
    <div>
      <PageHeader
        title="Test Series"
        subtitle="Manage test packs, pricing, activation status, and linked assessments."
        actions={(
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-secondary" onClick={openPdfModal}>Import from PDF</button>
            <button type="button" className="btn-primary" onClick={() => {
              setEditing(null);
              setForm({ title: '', description: '', price: 0, exam_type: 'JEE Main', test_count: 1, is_featured: false, is_active: true, validity_days: 365, image_url: '' });
              setModal(true);
            }}>+ New series</button>
          </div>
        )}
      />

      <div className="space-y-4">
        {list.map((s) => (
          <div key={s.id} className="card flex flex-wrap items-center gap-4 p-5">
            <div className="h-16 w-28 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
              <img src={getTestSeriesCover(s)} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap gap-2 items-center">
                <Badge color="blue">{s.exam_type}</Badge>
                {s.is_featured && <Badge color="amber">Featured</Badge>}
                {s.is_active ? (
                  <Badge color="green">Active</Badge>
                ) : (
                  <Badge color="red">Inactive</Badge>
                )}
              </div>
              <h2 className="mt-2 font-semibold text-slate-900">{s.title}</h2>
              <p className="text-sm text-slate-500">{Number(s.price) === 0 ? 'FREE' : `₹${s.price}`} · {s.linked_tests} tests linked · {s.enrollment_count} enrollments</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={`btn-secondary text-sm font-medium ${
                  s.is_active
                    ? 'text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                    : 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                }`}
                onClick={() => handleToggleActive(s)}
              >
                {s.is_active ? 'Deactivate' : 'Activate'}
              </button>
              <button type="button" className="btn-secondary text-sm" onClick={() => {
                setEditing(s);
                setForm({
                  title: s.title,
                  description: s.description || '',
                  price: Number(s.price) || 0,
                  exam_type: s.exam_type || 'JEE Main',
                  test_count: s.test_count || 0,
                  is_featured: s.is_featured || false,
                  is_active: s.is_active !== false,
                  validity_days: s.validity_days || 365,
                  image_url: s.image_url || '',
                });
                setModal(true);
              }}>
                Edit
              </button>
              <button type="button" className="btn-secondary text-sm" onClick={() => { setLinkModal(s); setLinkForm({ assessment_id: '', label: '' }); }}>
                Link assessment
              </button>
              <button type="button" className="btn-secondary text-sm text-red-600 hover:text-red-800" onClick={() => {
                setSeriesToDelete(s);
                setDeleteConfirmOpen(true);
              }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={pdfModal} onClose={() => setPdfModal(false)} title="Import test series from PDF" size="lg">
        <p className="mb-4 text-sm text-slate-600">
          Upload a text-based PDF with questions in this format:
          <span className="mt-1 block rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">
            Q1. What is 2+2?<br />
            (A) 3<br />
            (B) 4<br />
            (C) 5<br />
            (D) 6<br />
            <br />
            Answer Key<br />
            1. B
          </span>
        </p>
        <form onSubmit={importPdf} className="space-y-4">
          <input ref={pdfInputRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={handlePdfFile} />
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="btn-secondary text-sm" onClick={() => pdfInputRef.current?.click()}>
              Choose PDF
            </button>
            {pdfName && <span className="text-sm text-slate-600">{pdfName}</span>}
            <button type="button" className="btn-secondary text-sm" onClick={previewPdf} disabled={!pdfBase64 || parsing}>
              {parsing ? <Spinner className="h-4 w-4" /> : 'Preview questions'}
            </button>
          </div>

          <input className="input" placeholder="Series title" required value={pdfForm.title} onChange={(e) => setPdfForm((f) => ({ ...f, title: e.target.value }))} />
          <textarea className="input" rows={2} placeholder="Description" value={pdfForm.description} onChange={(e) => setPdfForm((f) => ({ ...f, description: e.target.value }))} />
          <div className="grid grid-cols-2 gap-3">
            <input className="input" type="number" min={0} placeholder="Price ₹" value={pdfForm.price} onChange={(e) => setPdfForm((f) => ({ ...f, price: Number(e.target.value) }))} />
            <input className="input" placeholder="Exam type" value={pdfForm.exam_type} onChange={(e) => setPdfForm((f) => ({ ...f, exam_type: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input className="input" type="number" min={5} placeholder="Duration (mins)" value={pdfForm.duration_minutes} onChange={(e) => setPdfForm((f) => ({ ...f, duration_minutes: Number(e.target.value) }))} />
            <input className="input" placeholder="Mock label" value={pdfForm.assessment_label} onChange={(e) => setPdfForm((f) => ({ ...f, assessment_label: e.target.value }))} />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={pdfForm.publish} onChange={(e) => setPdfForm((f) => ({ ...f, publish: e.target.checked }))} />
            Publish mock immediately
          </label>

          {pdfPreview && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-sm font-medium text-slate-800">
                Preview: {pdfPreview.question_count} questions found
                {pdfPreview.errors?.length ? ` · ${pdfPreview.errors.length} skipped` : ''}
              </p>
              <ul className="mt-2 max-h-40 space-y-2 overflow-y-auto text-xs text-slate-600">
                {(pdfPreview.questions || []).slice(0, 5).map((q, i) => (
                  <li key={i}>
                    <span className="font-medium text-slate-800">Q{q.line}.</span> {q.question_text}
                    <span className="block text-slate-500">{q.options?.join(' · ')}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button type="submit" className="btn-primary w-full" disabled={saving || !pdfBase64}>
            {saving ? <Spinner className="h-4 w-4" /> : 'Create test series from PDF'}
          </button>
        </form>
      </Modal>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit test series' : 'Create test series'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="input" placeholder="Title" required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          <textarea className="input" rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Price (₹)</label>
              <input className="input" type="number" min={0} required value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Validity (Days)</label>
              <input className="input" type="number" min={1} max={730} required value={form.validity_days} onChange={(e) => setForm((f) => ({ ...f, validity_days: Number(e.target.value) }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Exam type</label>
              <input className="input" placeholder="Exam type" value={form.exam_type} onChange={(e) => setForm((f) => ({ ...f, exam_type: e.target.value }))} />
            </div>
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Cover image URL</label>
              <input className="input" placeholder="/test-series/jee.svg" value={form.image_url} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))} />
            </div>
          </div>
          <p className="text-xs text-slate-400">Leave cover image URL blank to auto-pick based on exam type.</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))} />
              Active
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))} />
              Featured
            </label>
          </div>
          <button type="submit" className="btn-primary w-full" disabled={saving}>
            {saving ? <Spinner className="h-4 w-4" /> : editing ? 'Save Changes' : 'Create'}
          </button>
        </form>
      </Modal>

      <Modal open={!!linkModal} onClose={() => setLinkModal(null)} title={`Link test — ${linkModal?.title}`}>
        <form onSubmit={linkTest} className="space-y-4">
          <select className="input" required value={linkForm.assessment_id} onChange={(e) => setLinkForm((f) => ({ ...f, assessment_id: e.target.value }))}>
            <option value="">Select assessment</option>
            {assessments.map((a) => <option key={a.id} value={a.id}>{a.title}</option>)}
          </select>
          <input className="input" placeholder="Label (e.g. Mock 1)" value={linkForm.label} onChange={(e) => setLinkForm((f) => ({ ...f, label: e.target.value }))} />
          <button type="submit" className="btn-primary w-full" disabled={saving}>{saving ? <Spinner className="h-4 w-4" /> : 'Link'}</button>
        </form>
      </Modal>

      <Modal
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Confirm Deletion"
        size="sm"
      >
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
            <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">Delete Test Series?</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Are you sure you want to delete test series <strong className="font-bold text-slate-800 dark:text-slate-200">"{seriesToDelete?.title}"</strong>?
          </p>
          <div className="mt-3 rounded-lg bg-red-50 p-3 text-left text-xs text-red-800 dark:bg-red-950/30 dark:text-red-300">
            <strong>Warning:</strong> Deleting this test series will revoke active subscriptions/enrollments for students and unlink associated tests. This action cannot be undone.
          </div>
          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              className="btn-secondary text-sm"
              onClick={() => setDeleteConfirmOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-primary border-transparent bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-sm px-4 py-2 rounded-lg transition"
              onClick={async () => {
                if (!seriesToDelete) return;
                try {
                  await testSeriesService.remove(seriesToDelete.id);
                  toast.success('Test series deleted successfully');
                  load();
                } catch (err) {
                  toast.error(err.message || 'Failed to delete test series');
                } finally {
                  setDeleteConfirmOpen(false);
                  setSeriesToDelete(null);
                }
              }}
            >
              Permanently Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
