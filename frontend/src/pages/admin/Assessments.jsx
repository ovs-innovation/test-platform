import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, CheckCircle2, PauseCircle, Trash2, MoreVertical } from 'lucide-react';
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
  const [activeDropdownId, setActiveDropdownId] = useState(null);

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
      toast.error(err.message || 'Creation failed');
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (item) => {
    if (!item.is_published && item.question_count === 0) {
      toast.error('Add at least one question before publishing.');
      return;
    }
    setBusyId(item.id);
    try {
      const updated = await assessmentService.togglePublish(item.id, !item.is_published);
      toast.success(item.is_published ? 'Unpublished' : 'Published');
      setAssessments((list) => list.map((a) => (a.id === item.id ? updated : a)));
    } catch (err) {
      toast.error(err.message || 'Action failed');
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete assessment "${item.title}"? This removes all questions and attempt logs.`)) return;
    setBusyId(item.id);
    try {
      await assessmentService.remove(item.id);
      toast.success('Assessment deleted');
      setAssessments((list) => list.filter((a) => a.id !== item.id));
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
        <div className="card overflow-hidden p-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-lg">
          <div className="w-full overflow-x-auto scrollbar-none">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-20 bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-[28%]">Title</th>
                  <th className="px-3 py-4 text-center text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-[8%]">Questions</th>
                  <th className="px-3 py-4 text-center text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-[10%]">Duration</th>
                  <th className="px-3 py-4 text-center text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-[8%]">Pass Mark</th>
                  <th className="px-3 py-4 text-center text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-[8%]">Attempts</th>
                  <th className="px-3 py-4 text-center text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-[10%]">Status</th>
                  <th className="px-4 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-[11%]">Created</th>
                  <th className="sticky right-0 z-20 bg-slate-100 dark:bg-slate-900 px-6 py-4 text-right text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 shadow-md">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-[#111827]">
                {assessments.map((a) => (
                  <tr key={a.id} className="group odd:bg-white even:bg-slate-50/50 dark:odd:bg-[#111827] dark:even:bg-slate-900/30 hover:bg-blue-50/40 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-5 py-4 min-w-[200px]">
                      <Link to={`/admin/assessments/${a.id}`} className="font-extrabold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition line-clamp-2">
                        {a.title}
                      </Link>
                    </td>
                    <td className="px-3 py-4 text-center text-xs font-bold text-slate-700 dark:text-slate-300">{a.question_count}</td>
                    <td className="px-3 py-4 text-center text-xs font-bold text-slate-700 dark:text-slate-300">{a.duration_minutes} min</td>
                    <td className="px-3 py-4 text-center text-xs font-bold text-slate-700 dark:text-slate-300">{a.passing_marks}</td>
                    <td className="px-3 py-4 text-center text-xs font-bold text-slate-700 dark:text-slate-300">{a.attempt_count}</td>
                    <td className="px-3 py-4 text-center">
                      {a.is_published ? <Badge color="green">Published</Badge> : <Badge color="slate">Draft</Badge>}
                    </td>
                    <td className="px-4 py-4 text-xs font-semibold text-slate-400 whitespace-nowrap">{formatDate(a.created_at)}</td>
                    <td className="sticky right-0 z-10 bg-white dark:bg-[#111827] group-hover:bg-slate-50 dark:group-hover:bg-slate-800/80 px-6 py-4 text-right whitespace-nowrap shadow-md">
                      {/* Desktop Inline Actions (md+) */}
                      <div className="hidden md:flex items-center justify-end gap-2">
                        {/* Edit Button */}
                        <Link
                          to={`/admin/assessments/${a.id}`}
                          className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-500/5 px-3 text-xs font-extrabold text-blue-600 dark:text-[#60A5FA] hover:bg-blue-500/15 hover:border-blue-500/50 transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-xs whitespace-nowrap"
                          title="Edit Assessment"
                        >
                          <Pencil className="h-3.5 w-3.5 shrink-0" />
                          <span>Edit</span>
                        </Link>

                        {/* Publish / Unpublish Button */}
                        <button
                          type="button"
                          disabled={busyId === a.id}
                          onClick={() => togglePublish(a)}
                          className={`inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-extrabold transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-xs whitespace-nowrap disabled:opacity-50 ${
                            a.is_published
                              ? 'border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/50'
                              : 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50'
                          }`}
                          title={a.is_published ? 'Unpublish Assessment' : 'Publish Assessment'}
                        >
                          {a.is_published ? (
                            <>
                              <PauseCircle className="h-3.5 w-3.5 shrink-0" />
                              <span>Unpublish</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                              <span>Publish</span>
                            </>
                          )}
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          disabled={busyId === a.id}
                          onClick={() => remove(a)}
                          className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 text-xs font-extrabold text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/50 transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-xs whitespace-nowrap disabled:opacity-50"
                          title="Delete Assessment"
                        >
                          <Trash2 className="h-3.5 w-3.5 shrink-0" />
                          <span>Delete</span>
                        </button>
                      </div>

                      {/* Mobile/Tablet Dropdown Menu (<md) */}
                      <div className="relative md:hidden flex justify-end">
                        <button
                          type="button"
                          onClick={() => setActiveDropdownId(activeDropdownId === a.id ? null : a.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition"
                          aria-label="More actions"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {activeDropdownId === a.id && (
                          <div className="absolute right-0 top-11 z-30 w-36 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl dark:border-slate-800 dark:bg-[#0f172a]">
                            <Link
                              to={`/admin/assessments/${a.id}`}
                              onClick={() => setActiveDropdownId(null)}
                              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-extrabold text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              <span>Edit</span>
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveDropdownId(null);
                                togglePublish(a);
                              }}
                              className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-extrabold transition ${
                                a.is_published
                                  ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-500/10'
                                  : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10'
                              }`}
                            >
                              {a.is_published ? <PauseCircle className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                              <span>{a.is_published ? 'Unpublish' : 'Publish'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveDropdownId(null);
                                remove(a);
                              }}
                              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-extrabold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Assessment" size="lg">
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
          <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
            <input type="checkbox" name="result_visible" checked={form.result_visible} onChange={onChange} className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-blue-600 focus:ring-blue-500" />
            Allow candidates to view their result after submission
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" className="btn-secondary text-xs" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary text-xs" disabled={saving}>
              {saving ? <Spinner className="h-4 w-4 text-white" /> : 'Create Assessment'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


const Th = ({ children, className = '' }) => (
  <th className={`px-4 py-3.5 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 ${className}`}>
    {children}
  </th>
);
const Td = ({ children, className = '' }) => (
  <td className={`whitespace-nowrap px-4 py-3.5 text-xs text-slate-700 dark:text-slate-300 font-medium ${className}`}>{children}</td>
);

