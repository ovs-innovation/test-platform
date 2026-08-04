import { useState } from 'react';
import { Layers, Plus, Users, TrendingUp, Calendar, UserCheck, Archive, Edit, ArrowRight, CheckCircle2, Search } from 'lucide-react';
import { Spinner } from '../../ui.jsx';

export default function BatchesTab({
  batches = [],
  onCreateBatch,
  onUpdateBatch,
  onArchiveBatch,
  onNavigateTab,
  isDarkMode = true,
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    batch_name: '',
    academic_year: '2026-2027',
    class_level: 'Class 12',
    target_exam: 'NEET',
    faculty_name: '',
    max_capacity: 100,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const filteredBatches = batches.filter((b) =>
    (b.batch_name || b.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (b.target_exam || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.batch_name.trim()) {
      setError('Please enter a batch name.');
      return;
    }

    setSubmitting(true);
    try {
      if (editingBatch) {
        await onUpdateBatch(editingBatch.id, form);
      } else {
        await onCreateBatch(form);
      }
      setShowCreateModal(false);
      setEditingBatch(null);
      setForm({ batch_name: '', academic_year: '2026-2027', class_level: 'Class 12', target_exam: 'NEET', faculty_name: '', max_capacity: 100 });
    } catch (err) {
      setError(err.message || 'Failed to save batch details.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenEdit = (batch) => {
    setEditingBatch(batch);
    setForm({
      batch_name: batch.batch_name || batch.name || '',
      academic_year: batch.academic_year || '2026-2027',
      class_level: batch.class_level || 'Class 12',
      target_exam: batch.target_exam || 'NEET',
      faculty_name: batch.faculty_name || '',
      max_capacity: batch.max_capacity || 100,
    });
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* HEADER & CONTROLS */}
      <div className={`rounded-3xl border p-5 sm:p-6 backdrop-blur-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <Layers className="h-3.5 w-3.5" />
            <span>Academic Management</span>
          </div>
          <h2 className={`text-lg sm:text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Academic Batches ({batches.length})
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Organize students into class sections, assign AIETS packages, scheduled tests, and compare performance.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search batch..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full py-2.5 pl-10 pr-3 text-xs font-semibold rounded-2xl border transition ${
                isDarkMode ? 'border-slate-800 bg-slate-900 text-white placeholder-slate-500' : 'border-slate-200 bg-slate-100 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          <button
            onClick={() => {
              setEditingBatch(null);
              setForm({ batch_name: '', academic_year: '2026-2027', class_level: 'Class 12', target_exam: 'NEET', faculty_name: '', max_capacity: 100 });
              setShowCreateModal(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-md hover:scale-105 transition cursor-pointer shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Create Batch</span>
          </button>
        </div>
      </div>

      {/* BATCH CARDS GRID */}
      {filteredBatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBatches.map((batch) => (
            <div
              key={batch.id}
              className={`rounded-3xl border p-6 space-y-4 shadow-sm relative overflow-hidden transition hover:-translate-y-1 flex flex-col justify-between ${
                isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 text-[10px] font-bold text-purple-400 uppercase">
                    {batch.target_exam || 'NEET'} • {batch.class_level || 'Class 12'}
                  </span>
                  <h3 className={`text-lg font-black mt-1.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {batch.batch_name || batch.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">Faculty: {batch.faculty_name || 'Unassigned Coordinator'}</p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(batch)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                    title="Edit Batch"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onArchiveBatch(batch.id)}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10"
                    title="Archive Batch"
                  >
                    <Archive className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Enrolled Students</span>
                  <span className="text-lg font-black text-cyan-400">{batch.student_count || 0}</span>
                  <span className="text-[10px] text-slate-500 block">/ {batch.max_capacity || 100} seats</span>
                </div>
                <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Batch Avg Score</span>
                  <span className="text-lg font-black text-emerald-400">{batch.average_score || 0}%</span>
                  <span className="text-[10px] text-slate-500 block">Accuracy mean</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/40 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Academic Year: {batch.academic_year || '2026-2027'}</span>
                <button
                  onClick={() => onNavigateTab('students')}
                  className="inline-flex items-center gap-1 font-bold text-cyan-400 hover:text-cyan-300"
                >
                  <span>View Roster</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`rounded-3xl border p-12 text-center space-y-3 ${
          isDarkMode ? 'bg-[#0B1730] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
        }`}>
          <Layers className="h-10 w-10 text-purple-400 mx-auto" />
          <h3 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No batches created yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">Create academic batches to group your students and track performance.</p>
        </div>
      )}

      {/* CREATE / EDIT BATCH MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 space-y-5 ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{editingBatch ? 'Edit Batch' : 'Create New Academic Batch'}</h3>

            {error && <p className="text-xs font-bold text-rose-400">{error}</p>}

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">Batch Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NEET 2027 Achievers Batch A"
                  value={form.batch_name}
                  onChange={(e) => setForm({ ...form, batch_name: e.target.value })}
                  className={`w-full py-2.5 px-3 rounded-xl border transition ${
                    isDarkMode ? 'border-slate-800 bg-slate-900 text-white' : 'border-slate-200 bg-slate-100 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">Target Exam</label>
                  <select
                    value={form.target_exam}
                    onChange={(e) => setForm({ ...form, target_exam: e.target.value })}
                    className={`w-full py-2.5 px-3 rounded-xl border transition cursor-pointer ${
                      isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-slate-100 text-slate-800'
                    }`}
                  >
                    <option value="NEET">NEET UG</option>
                    <option value="JEE Main & Advanced">JEE Main & Advanced</option>
                    <option value="Foundation">Class 9-10</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">Class Level</label>
                  <select
                    value={form.class_level}
                    onChange={(e) => setForm({ ...form, class_level: e.target.value })}
                    className={`w-full py-2.5 px-3 rounded-xl border transition cursor-pointer ${
                      isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-slate-100 text-slate-800'
                    }`}
                  >
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                    <option value="Class 12 Pass">Class 12 Pass</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">Faculty / Coordinator</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. V. K. Sharma (Physics Lead)"
                  value={form.faculty_name}
                  onChange={(e) => setForm({ ...form, faculty_name: e.target.value })}
                  className={`w-full py-2.5 px-3 rounded-xl border transition ${
                    isDarkMode ? 'border-slate-800 bg-slate-900 text-white' : 'border-slate-200 bg-slate-100 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold ${
                    isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 font-bold text-xs text-white hover:bg-purple-500 shadow-md"
                >
                  {submitting ? 'Saving...' : editingBatch ? 'Update Batch' : 'Create Batch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
