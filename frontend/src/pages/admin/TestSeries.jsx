import { useEffect, useState } from 'react';
import { testSeriesService, assessmentService } from '../../lib/services.js';
import { PageHeader, LoadingScreen, ErrorState, Spinner, Badge } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { getTestSeriesCover } from '../../lib/testSeriesCover.js';

export default function AdminTestSeries() {
  const toast = useToast();
  const [list, setList] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [state, setState] = useState('loading');
  const [modal, setModal] = useState(false);
  const [linkModal, setLinkModal] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', price: 0, exam_type: 'JEE Main', test_count: 1, is_featured: false, image_url: '' });
  const [linkForm, setLinkForm] = useState({ assessment_id: '', label: '' });
  const [saving, setSaving] = useState(false);

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

  const create = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await testSeriesService.create(form);
      toast.success('Test series created');
      setModal(false);
      load();
    } catch (err) {
      toast.error(err.message);
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

  if (state === 'loading') return <LoadingScreen />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  return (
    <div>
      <PageHeader title="Test Series" subtitle="Manage test packs, pricing and linked assessments."
        actions={<button type="button" className="btn-primary" onClick={() => setModal(true)}>+ New series</button>} />

      <div className="space-y-4">
        {list.map((s) => (
          <div key={s.id} className="card flex flex-wrap items-center gap-4 p-5">
            <div className="h-16 w-28 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
              <img src={getTestSeriesCover(s)} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex gap-2">
                <Badge color="blue">{s.exam_type}</Badge>
                {s.is_featured && <Badge color="amber">Featured</Badge>}
                {!s.is_active && <Badge color="slate">Inactive</Badge>}
              </div>
              <h2 className="mt-2 font-semibold text-slate-900">{s.title}</h2>
              <p className="text-sm text-slate-500">{Number(s.price) === 0 ? 'FREE' : `₹${s.price}`} · {s.linked_tests} tests linked · {s.enrollment_count} enrollments</p>
            </div>
            <button type="button" className="btn-secondary text-sm" onClick={() => { setLinkModal(s); setLinkForm({ assessment_id: '', label: '' }); }}>
              Link assessment
            </button>
          </div>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Create test series">
        <form onSubmit={create} className="space-y-4">
          <input className="input" placeholder="Title" required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          <textarea className="input" rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          <div className="grid grid-cols-2 gap-3">
            <input className="input" type="number" min={0} placeholder="Price ₹" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))} />
            <input className="input" placeholder="Exam type" value={form.exam_type} onChange={(e) => setForm((f) => ({ ...f, exam_type: e.target.value }))} />
          </div>
          <input
            className="input"
            placeholder="Cover image URL (e.g. /test-series/jee.svg)"
            value={form.image_url}
            onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
          />
          <p className="text-xs text-slate-500">Leave blank to auto-pick cover: jee.svg, neet.svg, neet-pg.svg, general.svg</p>
          <button type="submit" className="btn-primary w-full" disabled={saving}>{saving ? <Spinner className="h-4 w-4" /> : 'Create'}</button>
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
    </div>
  );
}
