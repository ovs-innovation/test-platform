import { useEffect, useState } from 'react';
import { Link2 as LinkIcon, Search, Clock, Award, Calendar } from 'lucide-react';
import { testSeriesService, adminService } from '../../lib/services.js';
import { PageHeader, LoadingScreen, ErrorState, Spinner, Badge } from '../../components/ui.jsx';
import Modal from '../../components/Modal.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { getTestSeriesCover } from '../../lib/testSeriesCover.js';

export default function AdminTestSeries() {
  const toast = useToast();
  const [list, setList] = useState([]);
  const [availableTests, setAvailableTests] = useState([]);
  const [state, setState] = useState('loading');
  
  // Series Modal
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: 0,
    exam_type: 'JEE Main',
    is_featured: false,
    is_active: true,
    validity_days: 365,
    image_url: '',
    is_free: false,
    display_order: 0,
  });

  // Link Test Modal
  const [linkModal, setLinkModal] = useState(null);
  const [testSearch, setTestSearch] = useState('');
  const [selectedTestId, setSelectedTestId] = useState('');

  // Delete confirm modal states
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [seriesToDelete, setSeriesToDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setState('loading');
    try {
      const [ts, tests] = await Promise.all([
        testSeriesService.list(),
        adminService.tests().catch(() => []),
      ]);
      setList(ts || []);
      setAvailableTests(tests || []);
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => {
    load();
  }, []);

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

  const handleLinkTest = async (e) => {
    e.preventDefault();
    if (!selectedTestId) {
      toast.error('Please select an existing test to link');
      return;
    }
    setSaving(true);
    try {
      await testSeriesService.link(linkModal.id, Number(selectedTestId));
      toast.success('Test linked to series successfully');
      setLinkModal(null);
      setSelectedTestId('');
      setTestSearch('');
      load();
    } catch (err) {
      toast.error(err.message || 'Failed to link test');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (s) => {
    const newStatus = !s.is_active;
    try {
      await testSeriesService.toggleActive(s.id, newStatus);
      toast.success(newStatus ? `"${s.title}" activated` : `"${s.title}" deactivated`);
      setList((prev) => prev.map((item) => (item.id === s.id ? { ...item, is_active: newStatus } : item)));
    } catch (err) {
      toast.error(err.message || 'Failed to update test series status');
    }
  };

  const handleDeleteSeriesClick = (s) => {
    setSeriesToDelete(s);
    setDeleteConfirmOpen(true);
  };

  if (state === 'loading') return <LoadingScreen />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  // Filter available tests for picker search
  const filteredTests = availableTests.filter((t) => {
    if (!testSearch.trim()) return true;
    const q = testSearch.toLowerCase();
    const name = (t.test_name || t.title || '').toLowerCase();
    const type = (t.test_type || '').toLowerCase();
    const syllabus = (t.syllabus || '').toLowerCase();
    return name.includes(q) || type.includes(q) || syllabus.includes(q);
  });

  const handleSyncCatalogue = async () => {
    try {
      setSaving(true);
      const res = await testSeriesService.sync();
      setList(res || []);
      toast.success('Catalogue dataset successfully synced to 9 paid + 3 free series!');
    } catch {
      toast.error('Failed to sync catalogue dataset');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Test series catalogue"
        subtitle="Manage test packages, category tags, pricing, and link existing tests from the tests repository."
        actions={(
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs flex items-center gap-1.5"
              onClick={handleSyncCatalogue}
              disabled={saving}
            >
              {saving ? <Spinner size="sm" /> : '⚡ Sync Catalogue Dataset'}
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setEditing(null);
                setForm({
                  title: '',
                  description: '',
                  price: 0,
                  exam_type: 'JEE Main',
                  is_featured: false,
                  is_active: true,
                  validity_days: 365,
                  image_url: '',
                  is_free: false,
                  display_order: 0,
                });
                setModal(true);
              }}
            >
              + New series
            </button>
          </div>
        )}
      />

      <div className="space-y-4">
        {list.map((s) => (
          <div
            key={s.id}
            className="card flex flex-wrap items-center gap-4 p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] hover:border-blue-500/30 transition-all"
          >
            <div className="h-16 w-28 shrink-0 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
              <img src={getTestSeriesCover(s)} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap gap-2 items-center">
                <Badge color="blue">{s.exam_type}</Badge>
                {s.is_free || Number(s.price) === 0 ? <Badge color="cyan">Free Mock</Badge> : <Badge color="indigo">Paid</Badge>}
                {s.is_featured && <Badge color="amber">Featured</Badge>}
                {s.is_active ? (
                  <Badge color="green">Active</Badge>
                ) : (
                  <Badge color="red">Inactive</Badge>
                )}
                {s.is_active && Number(s.linked_tests || 0) === 0 && (
                  <span className="rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    ⚠️ Active package — 0 tests linked
                  </span>
                )}
              </div>
              <h2 className="mt-2 font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight">
                {s.title}
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                <span className="text-blue-600 dark:text-blue-400 font-black">
                  {Number(s.price) === 0 || s.is_free ? 'FREE' : `₹${s.price}`}
                </span>
                {' · '}
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {s.planned_tests || 0} planned
                </span>
                {' · '}
                <span>{s.linked_tests || 0} linked</span>
                {' · '}
                {s.enrollment_count || 0} enrollments
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={`btn-secondary !py-1.5 !px-3 text-xs ${
                  s.is_active
                    ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/20'
                    : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/20'
                }`}
                onClick={() => handleToggleActive(s)}
              >
                {s.is_active ? 'Deactivate' : 'Activate'}
              </button>
              <button
                type="button"
                className="btn-secondary !py-1.5 !px-3 text-xs text-slate-700 dark:text-slate-200"
                onClick={() => {
                  setEditing(s);
                  setForm({
                    title: s.title,
                    description: s.description || '',
                    price: Number(s.price) || 0,
                    exam_type: s.exam_type || 'JEE Main',
                    is_featured: s.is_featured || false,
                    is_active: s.is_active !== false,
                    validity_days: s.validity_days || 365,
                    image_url: s.image_url || '',
                    is_free: s.is_free || Number(s.price) === 0,
                    display_order: s.display_order || 0,
                  });
                  setModal(true);
                }}
              >
                Edit ✏️
              </button>
              <button
                type="button"
                className="btn-secondary !py-1.5 !px-3 text-xs text-blue-600 dark:text-blue-400 font-bold"
                onClick={() => {
                  setLinkModal(s);
                  setSelectedTestId('');
                  setTestSearch('');
                }}
              >
                Link Test 🔗
              </button>
              <button
                type="button"
                className="btn-secondary !py-1.5 !px-3 text-xs text-rose-600 dark:text-rose-400"
                onClick={() => handleDeleteSeriesClick(s)}
              >
                Delete 🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* NEW / EDIT TEST SERIES MODAL (No Test Creation/Schedule Fields) */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={editing ? 'Edit Test Series' : 'Create New Test Series'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Series Name / Title</label>
            <input
              className="input"
              placeholder="e.g. NEET UG 2027 Comprehensive Test Series"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
          </div>
          <div>
            <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Description</label>
            <textarea
              className="input"
              rows={3}
              placeholder="Provide an overview of this series..."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Price (₹)</label>
              <input
                className="input"
                type="number"
                min={0}
                required
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Validity (Days)</label>
              <input
                className="input"
                type="number"
                min={1}
                max={730}
                required
                value={form.validity_days}
                onChange={(e) => setForm((f) => ({ ...f, validity_days: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Display Order</label>
              <input
                className="input"
                type="number"
                min={0}
                value={form.display_order}
                onChange={(e) => setForm((f) => ({ ...f, display_order: Number(e.target.value) }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Category Tag / Exam Type</label>
              <input
                className="input"
                placeholder="e.g. NEET UG, JEE Main, NEET PG"
                value={form.exam_type}
                onChange={(e) => setForm((f) => ({ ...f, exam_type: e.target.value }))}
              />
            </div>
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Cover Image URL</label>
              <input
                className="input"
                placeholder="/edvedum/banners/banner-jee-full.png"
                value={form.image_url}
                onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 pt-1">
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
              />
              Active Status
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))}
              />
              Featured Series
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={form.is_free}
                onChange={(e) => setForm((f) => ({ ...f, is_free: e.target.checked, price: e.target.checked ? 0 : f.price }))}
              />
              Free Tier Mock
            </label>
          </div>
          <button type="submit" className="btn-primary w-full mt-2" disabled={saving}>
            {saving ? <Spinner className="h-4 w-4" /> : editing ? 'Save Changes' : 'Create Series'}
          </button>
        </form>
      </Modal>

      {/* LINK TEST MODAL (Searchable Picker of Existing Tests from tests table) */}
      <Modal
        open={!!linkModal}
        onClose={() => setLinkModal(null)}
        title={`Link Existing Test to "${linkModal?.title}"`}
        size="lg"
      >
        <form onSubmit={handleLinkTest} className="space-y-4">
          <div className="rounded-2xl p-3.5 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0 shadow-xs">
              <LinkIcon className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-blue-900 dark:text-cyan-300">Link Assessment to Series</h4>
              <p className="text-[11.5px] text-slate-600 dark:text-slate-400">
                Select an existing test created in the <strong>Assessments</strong> repository to attach to <strong>{linkModal?.title}</strong>.
              </p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#071126] pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition shadow-2xs"
              placeholder="Search available tests by title, category, or syllabus..."
              value={testSearch}
              onChange={(e) => setTestSearch(e.target.value)}
            />
          </div>

          <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
            {filteredTests.length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-500">
                No matching tests found. Create tests in <strong>Assessments</strong> repository first.
              </div>
            ) : (
              filteredTests.map((t) => {
                const testTitle = t.test_name || t.title;
                const isSelected = String(selectedTestId) === String(t.id);
                const typeBadgeColor = t.test_type === 'AIETS'
                  ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30'
                  : t.test_type === 'Full Syllabus Mock'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : t.test_type === 'Part Test'
                  ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border-cyan-500/30'
                  : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';

                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTestId(String(t.id))}
                    className={`group p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/50 shadow-md scale-[1.005]'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071126] hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        <div
                          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition ${
                            isSelected
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-slate-300 dark:border-slate-700 group-hover:border-blue-400'
                          }`}
                        >
                          {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                            {testTitle}
                          </h4>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase border shrink-0 ${typeBadgeColor}`}>
                            {t.test_type || 'AIETS'}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {t.syllabus ? `Syllabus: ${t.syllabus}` : 'No specific syllabus listed'}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 pt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-blue-500" />
                            {t.duration_minutes || t.duration || 180} mins
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="h-3 w-3 text-amber-500" />
                            {t.max_marks || t.total_marks || 300} marks
                          </span>
                          {t.test_date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-purple-500" />
                              {String(t.test_date).split('T')[0]}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              onClick={() => setLinkModal(null)}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !selectedTestId}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shadow-lg shadow-blue-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
            >
              {saving ? <Spinner className="h-4 w-4 text-white" /> : (
                <>
                  <span>Link Selected Test</span>
                  <LinkIcon className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* CONFIRM DELETE MODAL */}
      <Modal
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Confirm Deletion"
        size="sm"
      >
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
            <svg
              className="h-6 w-6 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
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
