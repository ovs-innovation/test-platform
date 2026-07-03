import { useEffect, useState } from 'react';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, PageHeader, Spinner } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function AdminSubjects() {
  const toast = useToast();
  const [subjects, setSubjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [subForm, setSubForm] = useState({ name: '', exam_type: 'JEE' });
  const [chForm, setChForm] = useState({ name: '' });
  const [loading, setLoading] = useState(true);

  const loadSubjects = () => adminService.subjects().then((d) => setSubjects(d)).finally(() => setLoading(false));
  useEffect(() => { loadSubjects(); }, []);

  const loadChapters = async (id) => {
    setSelected(id);
    setChapters(await adminService.chapters(id));
  };

  const addSubject = async (e) => {
    e.preventDefault();
    await adminService.createSubject(subForm);
    toast.success('Subject added');
    setSubForm({ name: '', exam_type: 'JEE' });
    loadSubjects();
  };

  const addChapter = async (e) => {
    e.preventDefault();
    if (!selected) return;
    await adminService.createChapter({ subject_id: selected, name: chForm.name });
    toast.success('Chapter added');
    setChForm({ name: '' });
    loadChapters(selected);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div>
      <PageHeader title="Subjects & chapters" subtitle="Organize content hierarchy." />
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <form onSubmit={addSubject} className="card mb-4 flex gap-2 p-4">
            <input className="input flex-1" placeholder="Subject name" value={subForm.name} onChange={(e) => setSubForm((f) => ({ ...f, name: e.target.value }))} required />
            <input className="input w-24" placeholder="Exam" value={subForm.exam_type} onChange={(e) => setSubForm((f) => ({ ...f, exam_type: e.target.value }))} />
            <button type="submit" className="btn-primary">Add</button>
          </form>
          <div className="space-y-2">
            {subjects.map((s) => (
              <button key={s.id} type="button" onClick={() => loadChapters(s.id)}
                className={`card w-full p-4 text-left ${selected === s.id ? 'ring-2 ring-brand-500' : ''}`}>
                <p className="font-medium">{s.name}</p>
                <p className="text-xs text-slate-500">{s.exam_type} · {s.chapter_count} chapters</p>
              </button>
            ))}
          </div>
        </div>
        <div>
          {selected && (
            <form onSubmit={addChapter} className="card mb-4 flex gap-2 p-4">
              <input className="input flex-1" placeholder="Chapter name" value={chForm.name} onChange={(e) => setChForm({ name: e.target.value })} required />
              <button type="submit" className="btn-primary">Add chapter</button>
            </form>
          )}
          <div className="space-y-2">
            {chapters.map((c) => (
              <div key={c.id} className="card p-3 text-sm">{c.name} <span className="text-slate-400">({c.topic_count} topics)</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
