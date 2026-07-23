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
      <PageHeader title="Subjects & chapters" subtitle="Organize content hierarchy for JEE, NEET & Foundation exams." />
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <form onSubmit={addSubject} className="card mb-4 flex gap-2.5 p-4 border border-slate-800/90 bg-[#0b1430]">
            <input className="input flex-1" placeholder="Subject name" value={subForm.name} onChange={(e) => setSubForm((f) => ({ ...f, name: e.target.value }))} required />
            <select className="input w-32" value={subForm.exam_type} onChange={(e) => setSubForm((f) => ({ ...f, exam_type: e.target.value }))}>
              <option value="JEE">JEE</option>
              <option value="NEET">NEET</option>
              <option value="Foundation">Foundation</option>
            </select>
            <button type="submit" className="btn-primary">Add</button>
          </form>
          <div className="space-y-2.5">
            {subjects.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => loadChapters(s.id)}
                className={`w-full rounded-2xl p-4 text-left border transition-all duration-200 ${
                  selected === s.id
                    ? 'border-[#00F0FF] bg-blue-950/40 text-white shadow-lg shadow-cyan-500/10 ring-1 ring-[#00F0FF]'
                    : 'border-slate-800/80 bg-[#0b1430] hover:border-slate-700/80 hover:bg-[#0d1838]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-extrabold text-white text-base">{s.name}</p>
                  <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs font-black text-cyan-300 border border-blue-500/30">
                    {s.exam_type}
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-400">{s.chapter_count} chapters organized</p>
              </button>
            ))}
          </div>
        </div>
        <div>
          {selected && (
            <form onSubmit={addChapter} className="card mb-4 flex gap-2.5 p-4 border border-slate-800/90 bg-[#0b1430]">
              <input className="input flex-1" placeholder="Chapter name" value={chForm.name} onChange={(e) => setChForm({ name: e.target.value })} required />
              <button type="submit" className="btn-primary">Add chapter</button>
            </form>
          )}
          <div className="space-y-2">
            {chapters.map((c) => (
              <div key={c.id} className="rounded-2xl border border-slate-800/80 bg-[#0b1430] p-3.5 text-sm font-bold text-white flex items-center justify-between">
                <span>{c.name}</span>
                <span className="text-xs font-medium text-slate-400">({c.topic_count} topics)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
