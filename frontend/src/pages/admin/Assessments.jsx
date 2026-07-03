import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { assessmentService } from '../../lib/services.js';
import { PageHeader, LoadingScreen, ErrorState, EmptyState, Badge, Spinner } from '../../components/ui.jsx';
import Modal from '../../components/Modal.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { formatDate } from '../../lib/format.js';

const emptyForm = {
  title: '',
  description: '',
  instructions: '',
  duration_minutes: 30,
  passing_marks: 0,
  max_violations: 3,
  result_visible: true,
};

export default function AdminAssessments() {
  const toast = useToast();
  const [assessments, setAssessments] = useState([]);
  const [state, setState] = useState('loading');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    setState('loading');
    try {
      setAssessments(await assessmentService.listAll());
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : ['duration_minutes', 'passing_marks', 'max_violations'].includes(name) ? Number(value) : value,
    }));
  };

  const onCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await assessmentService.create(form);
      toast.success('Assessment created — add questions in the editor');
      setModalOpen(false);
      setForm(emptyForm);
      load();
    } catch (err) {
      toast.error(err.message || 'Failed to create assessment');
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (a) => {
    if (!a.is_published && a.question_count === 0) {
      toast.error('Add at least one question before publishing. Open the assessment editor.');
      return;
    }
    setBusyId(a.id);
    try {
      await assessmentService.togglePublish(a.id, !a.is_published);
      toast.success(a.is_published ? 'Assessment unpublished' : 'Assessment published');
      load();
    } catch (err) {
      toast.error(err.message || 'Action failed');
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (a) => {
    if (!window.confirm(`Delete "${a.title}"? This removes all its questions and attempts.`)) return;
    setBusyId(a.id);
    try {
      await assessmentService.remove(a.id);
      toast.success('Assessment deleted');
      load();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    } finally {
      setBusyId(null);
    }
  };

  if (state === 'loading') return <LoadingScreen label="Loading assessments…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  return (
    <div>
      <PageHeader
        title="Assessments"
        subtitle="Create assessments, add questions and control publishing."
        actions={
          <button className="btn-primary" onClick={() => setModalOpen(true)}>
            + New assessment
          </button>
        }
      />

      {assessments.length === 0 ? (
        <EmptyState
          title="No assessments yet"
          message="Create your first assessment to start adding questions."
          action={<button className="btn-primary" onClick={() => setModalOpen(true)}>Create assessment</button>}
        />
      ) : (
        <div className="card overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <Th>Title</Th>
                <Th>Questions</Th>
                <Th>Duration</Th>
                <Th>Pass mark</Th>
                <Th>Attempts</Th>
                <Th>Status</Th>
                <Th>Created</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assessments.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <Td>
                    <Link to={`/admin/assessments/${a.id}`} className="font-semibold text-brand-700 hover:underline">
                      {a.title}
                    </Link>
                  </Td>
                  <Td>{a.question_count}</Td>
                  <Td>{a.duration_minutes} min</Td>
                  <Td>{a.passing_marks}</Td>
                  <Td>{a.attempt_count}</Td>
                  <Td>{a.is_published ? <Badge color="green">Published</Badge> : <Badge color="slate">Draft</Badge>}</Td>
                  <Td className="text-slate-500">{formatDate(a.created_at)}</Td>
                  <Td className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/assessments/${a.id}`} className="text-sm font-medium text-slate-600 hover:text-brand-700">
                        Edit
                      </Link>
                      <button
                        className="text-sm font-medium text-slate-600 hover:text-brand-700 disabled:opacity-50"
                        onClick={() => togglePublish(a)}
                        disabled={busyId === a.id}
                      >
                        {a.is_published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                        onClick={() => remove(a)}
                        disabled={busyId === a.id}
                      >
                        Delete
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New assessment" size="lg">
        <form onSubmit={onCreate} className="space-y-4">
          <div>
            <label className="label">Title</label>
            <input name="title" required className="input" value={form.title} onChange={onChange} placeholder="e.g. Backend Engineer Screening" />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea name="description" rows={2} className="input" value={form.description} onChange={onChange} placeholder="Short summary shown to candidates" />
          </div>
          <div>
            <label className="label">Instructions</label>
            <textarea name="instructions" rows={3} className="input" value={form.instructions} onChange={onChange} placeholder="Rules / guidance shown before the test starts" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label">Duration (min)</label>
              <input name="duration_minutes" type="number" min={1} className="input" value={form.duration_minutes} onChange={onChange} />
            </div>
            <div>
              <label className="label">Passing marks</label>
              <input name="passing_marks" type="number" min={0} className="input" value={form.passing_marks} onChange={onChange} />
            </div>
            <div>
              <label className="label">Max violations</label>
              <input name="max_violations" type="number" min={0} className="input" value={form.max_violations} onChange={onChange} />
            </div>
          </div>
          <label className="flex items-center gap-2.5 text-sm text-slate-700">
            <input type="checkbox" name="result_visible" checked={form.result_visible} onChange={onChange} className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
            Allow candidates to view their result after submission
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? <Spinner className="h-4 w-4 text-white" /> : 'Create assessment'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const Th = ({ children, className = '' }) => (
  <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 ${className}`}>
    {children}
  </th>
);
const Td = ({ children, className = '' }) => (
  <td className={`whitespace-nowrap px-4 py-3 text-sm text-slate-700 ${className}`}>{children}</td>
);
