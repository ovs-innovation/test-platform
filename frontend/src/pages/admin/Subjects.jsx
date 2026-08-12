import { useEffect, useState, useRef } from 'react';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, Spinner } from '../../components/ui.jsx';
import { AdminHeader } from '../../components/admin/AdminUI.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import Modal from '../../components/Modal.jsx';
import { ChevronDown, Check, GraduationCap, Plus, BookOpen, Layers, Trash2, X, Tag, AlertTriangle } from 'lucide-react';

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
  const [topicInputs, setTopicInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingChapters, setLoadingChapters] = useState(false);

  // Custom Modal Delete State
  const [deleteTarget, setDeleteTarget] = useState(null); // { type: 'subject' | 'chapter', id, name }
  const [deleting, setDeleting] = useState(false);

  const loadSubjects = async () => {
    try {
      const data = await adminService.subjects();
      setSubjects(data || []);
      if (data && data.length > 0 && !selected) {
        setSelected(data[0].id);
        loadChapters(data[0].id);
      }
    } catch (err) {
      toast.error('Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadSubjects(); }, []);

  const loadChapters = async (id) => {
    setSelected(id);
    setLoadingChapters(true);
    try {
      const data = await adminService.chapters(id);
      setChapters(data || []);
    } catch (err) {
      console.error('Failed to load chapters:', err);
      toast.error('Failed to load chapters for this subject');
      setChapters([]);
    } finally {
      setLoadingChapters(false);
    }
  };

  const addSubject = async (e) => {
    e.preventDefault();
    try {
      await adminService.createSubject(subForm);
      toast.success('Subject added');
      setSubForm({ name: '', exam_type: 'JEE' });
      loadSubjects();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to add subject');
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      if (deleteTarget.type === 'subject') {
        await adminService.deleteSubject(deleteTarget.id);
        toast.success('Subject deleted successfully');
        if (selected === deleteTarget.id) {
          setSelected(null);
          setChapters([]);
        }
        loadSubjects();
      } else if (deleteTarget.type === 'chapter') {
        await adminService.deleteChapter(deleteTarget.id);
        toast.success('Chapter deleted successfully');
        loadChapters(selected);
        loadSubjects();
      }
    } catch (err) {
      toast.error(`Failed to delete ${deleteTarget.type}`);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const addChapter = async (e) => {
    e.preventDefault();
    if (!selected) return;
    try {
      await adminService.createChapter({ subject_id: selected, name: chForm.name });
      toast.success('Chapter added');
      setChForm({ name: '' });
      loadChapters(selected);
      loadSubjects();
    } catch (err) {
      toast.error('Failed to add chapter');
    }
  };

  const deleteChapter = async (id, name) => {
    if (!window.confirm(`Delete chapter "${name}" and all its topics?`)) return;
    try {
      await adminService.deleteChapter(id);
      toast.success('Chapter deleted');
      loadChapters(selected);
      loadSubjects();
    } catch (err) {
      toast.error('Failed to delete chapter');
    }
  };

  const addTopic = async (chapterId) => {
    const name = (topicInputs[chapterId] || '').trim();
    if (!name) return;
    try {
      await adminService.createTopic({ chapter_id: chapterId, name });
      toast.success('Topic added');
      setTopicInputs((prev) => ({ ...prev, [chapterId]: '' }));
      loadChapters(selected);
    } catch (err) {
      toast.error('Failed to add topic');
    }
  };

  const deleteTopic = async (topicId) => {
    try {
      await adminService.deleteTopic(topicId);
      toast.success('Topic deleted');
      loadChapters(selected);
    } catch (err) {
      toast.error('Failed to delete topic');
    }
  };

  if (loading) return <LoadingScreen label="Loading academic subjects & topics..." />;

  const activeSubject = subjects.find((s) => s.id === selected);

  return (
    <div className="w-full max-w-full space-y-6">
      <AdminHeader
        title="Subjects & Academic Topics"
        subtitle="Organize curriculum content hierarchy for JEE, NEET & Foundation national mock exams."
        breadcrumbs={['Subjects & Topics']}
      />
      <div className="grid gap-6 lg:grid-cols-12">
        {/* LEFT COLUMN: SUBJECTS MANAGEMENT (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <form onSubmit={addSubject} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-3.5 sm:p-4 space-y-2.5 sm:space-y-0 sm:flex sm:items-center sm:gap-2.5 shadow-xs">
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
            {subjects.map((s) => {
              const isSelected = selected === s.id;
              const count = isSelected ? chapters.length : (s.chapter_count || 0);
              return (
                <div
                  key={s.id}
                  onClick={() => loadChapters(s.id)}
                  className={`group relative w-full rounded-2xl p-4 text-left border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-600/20 text-blue-900 dark:text-white shadow-md shadow-blue-500/10 ring-1 ring-blue-500'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] hover:border-blue-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">{s.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-blue-500/10 dark:bg-blue-500/20 px-2.5 py-0.5 text-xs font-black text-blue-600 dark:text-blue-400 border border-blue-500/30">
                        {s.exam_type}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setDeleteTarget({ type: 'subject', id: s.id, name: s.name }); }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 transition-opacity"
                        title="Delete Subject"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {count} {count === 1 ? 'chapter' : 'chapters'} organized
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: CHAPTERS & TOPICS MANAGEMENT (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {selected ? (
            <>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-4 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      {activeSubject?.name || 'Subject'} Chapters & Topics
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Add chapters and sub-topics to build curriculum structure.</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {chapters.length} Chapters
                  </span>
                </div>

                <form onSubmit={addChapter} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    className="w-full flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3.5 py-2.5 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                    placeholder="New chapter name..."
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
              </div>

              {loadingChapters ? (
                <div className="p-8 text-center"><Spinner className="h-6 w-6 text-blue-500 mx-auto" /></div>
              ) : chapters.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8 text-center text-xs font-semibold text-slate-400">
                  No chapters added for {activeSubject?.name} yet. Type a chapter name above to create one.
                </div>
              ) : (
                <div className="space-y-3.5">
                  {chapters.map((c) => (
                    <div key={c.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-4 shadow-xs space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80">
                        <div className="flex items-center gap-2">
                          <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                          <span className="font-extrabold text-slate-900 dark:text-white text-sm">{c.name}</span>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                            {(c.topics || []).length} topics
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget({ type: 'chapter', id: c.id, name: c.name })}
                          className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete Chapter"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Topics List */}
                      <div className="space-y-2">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Topics in this chapter:</p>
                        {(!c.topics || c.topics.length === 0) ? (
                          <p className="text-xs italic text-slate-400 dark:text-slate-500">No topics added yet.</p>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {c.topics.map((top) => (
                              <div
                                key={top.id}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700/60"
                              >
                                <Tag className="h-3 w-3 text-blue-500 shrink-0" />
                                <span>{top.name}</span>
                                <button
                                  type="button"
                                  onClick={() => deleteTopic(top.id)}
                                  className="text-slate-400 hover:text-red-500 ml-1 transition-colors"
                                  title="Delete Topic"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Add Topic Inline Form */}
                      <div className="pt-2 flex items-center gap-2">
                        <input
                          type="text"
                          className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                          placeholder="Add topic name (e.g. Kinematics in 1D)..."
                          value={topicInputs[c.id] || ''}
                          onChange={(e) => setTopicInputs((prev) => ({ ...prev, [c.id]: e.target.value }))}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTopic(c.id); } }}
                        />
                        <button
                          type="button"
                          onClick={() => addTopic(c.id)}
                          className="rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-3 py-1.5 text-xs font-bold hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition-colors cursor-pointer shrink-0"
                        >
                          + Add Topic
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8 text-center text-xs font-semibold text-slate-400">
              Select a subject on the left to view and manage its chapters and topics.
            </div>
          )}
        </div>
      </div>

      {/* STYLED DELETE CONFIRMATION MODAL */}
      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title={`Delete ${deleteTarget?.type === 'subject' ? 'Academic Subject' : 'Curriculum Chapter'}`}
        size="sm"
      >
        <div className="space-y-4 pt-1">
          <div className="flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-2xl bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 shadow-2xs">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                Delete "{deleteTarget?.name}"?
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                This action is permanent and cannot be undone. All associated {deleteTarget?.type === 'subject' ? 'chapters and topics' : 'sub-topics'} under this section will be removed.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="rounded-xl px-4 py-2.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
              disabled={deleting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              className="rounded-xl px-4 py-2.5 text-xs font-extrabold bg-red-600 hover:bg-red-700 text-white transition flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm shadow-red-500/20"
              disabled={deleting}
            >
              {deleting ? <Spinner className="h-4 w-4 text-white" /> : <Trash2 className="h-4 w-4" />}
              <span>Delete Permanently</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


