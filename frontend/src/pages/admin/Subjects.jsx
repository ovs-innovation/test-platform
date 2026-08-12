import { useEffect, useState, useRef } from 'react';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, Spinner } from '../../components/ui.jsx';
import { AdminHeader } from '../../components/admin/AdminUI.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { ChevronDown, Check, GraduationCap, Plus, BookOpen, Layers } from 'lucide-react';

function CustomExamTypeDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: 'JEE', label: 'JEE', desc: 'Joint Entrance Examination' },
    { value: 'NEET', label: 'NEET', desc: 'National Eligibility Entrance Test' },
    { value: 'Foundation', label: 'Foundation', desc: 'Class 8-10 Foundation' },
  ];

  const selected = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-44 shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2.5 px-3.5 text-xs font-extrabold text-slate-800 dark:text-slate-100 hover:border-blue-500/80 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <div className="flex items-center gap-2 min-w-0">
          <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="truncate">{selected.label}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ${open ? 'rotate-180 text-blue-600' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1.5 w-auto min-w-[200px] max-w-[260px] sm:max-w-[280px] z-50 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-2xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-extrabold border border-blue-200 dark:border-blue-800/80 shadow-2xs'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold'
                }`}
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <p className="text-xs font-bold leading-tight">{opt.label}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight whitespace-normal">{opt.desc}</p>
                </div>
                {isSelected && <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

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

  if (loading) return <LoadingScreen label="Loading academic subjects..." />;

  return (
    <div className="w-full max-w-full space-y-6">
      <AdminHeader
        title="Subjects & Academic Topics"
        subtitle="Organize curriculum content hierarchy for JEE, NEET & Foundation national mock exams."
        breadcrumbs={['Subjects & Topics']}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT COLUMN: SUBJECTS MANAGEMENT */}
        <div>
          <form onSubmit={addSubject} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-3.5 sm:p-4 mb-4 space-y-2.5 sm:space-y-0 sm:flex sm:items-center sm:gap-2.5 shadow-xs">
            <input
              className="w-full sm:flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3.5 py-2.5 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
              placeholder="Subject name..."
              value={subForm.name}
              onChange={(e) => setSubForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2.5 w-full sm:w-auto shrink-0">
              <CustomExamTypeDropdown
                value={subForm.exam_type}
                onChange={(val) => setSubForm((f) => ({ ...f, exam_type: val }))}
              />
              <button
                type="submit"
                className="btn-primary rounded-xl px-3.5 py-2.5 text-xs font-extrabold flex items-center justify-center gap-1.5 w-full sm:w-auto shrink-0 cursor-pointer"
              >
                <Plus className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">Add Subject</span>
              </button>
            </div>
          </form>

          <div className="space-y-2.5">
            {subjects.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => loadChapters(s.id)}
                className={`w-full rounded-2xl p-4 text-left border transition-all duration-200 cursor-pointer ${
                  selected === s.id
                    ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-600/20 text-blue-900 dark:text-white shadow-md shadow-blue-500/10 ring-1 ring-blue-500'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] hover:border-blue-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">{s.name}</p>
                  <span className="rounded-full bg-blue-500/10 dark:bg-blue-500/20 px-2.5 py-0.5 text-xs font-black text-blue-600 dark:text-blue-400 border border-blue-500/30">
                    {s.exam_type}
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{s.chapter_count} chapters organized</p>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: CHAPTERS MANAGEMENT */}
        <div>
          {selected ? (
            <>
              <form onSubmit={addChapter} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-3.5 sm:p-4 mb-4 flex flex-col sm:flex-row gap-2.5 shadow-xs">
                <input
                  className="w-full flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3.5 py-2.5 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Chapter name..."
                  value={chForm.name}
                  onChange={(e) => setChForm({ name: e.target.value })}
                  required
                />
                <button
                  type="submit"
                  className="btn-primary rounded-xl px-4 py-2.5 text-xs font-extrabold flex items-center justify-center gap-1.5 w-full sm:w-auto shrink-0 cursor-pointer"
                >
                  <Plus className="h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">Add Chapter</span>
                </button>
              </form>

              <div className="space-y-2">
                {chapters.map((c) => (
                  <div key={c.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-3.5 text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>{c.name}</span>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">({c.topic_count} topics)</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8 text-center text-xs font-semibold text-slate-400">
              Select a subject on the left to view and add chapters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


