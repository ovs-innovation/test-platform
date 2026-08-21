import { useEffect, useState } from 'react';
import { adminService } from '../../lib/services.js';
import { LoadingScreen } from '../../components/ui.jsx';
import { AdminHeader } from '../../components/admin/AdminUI.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { Trash2, AlertTriangle, X } from 'lucide-react';

export default function AdminFaculty() {
  const toast = useToast();
  const [faculty, setFaculty] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: 'Faculty@123', department: '' });
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => adminService.faculty().then((d) => setFaculty(d)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await adminService.createFaculty(form);
      toast.success('Faculty member added successfully');
      setForm({ name: '', email: '', password: 'Faculty@123', department: '' });
      load();
    } catch (err) { toast.error(err.message); }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminService.deleteFaculty(deleteTarget.id);
      toast.success(`Faculty "${deleteTarget.name}" deleted successfully`);
      setDeleteTarget(null);
      load();
    } catch (err) {
      toast.error(err.message || 'Failed to delete faculty member');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <LoadingScreen label="Loading faculty directory..." />;

  return (
    <div className="w-full max-w-full space-y-6">
      <AdminHeader
        title="Faculty Directory & Instructors"
        subtitle="Manage faculty accounts, teacher credentials, and department assignments."
        breadcrumbs={['Faculty Directory']}
      />

      <form onSubmit={create} className="card p-4 sm:p-5 grid gap-3 sm:grid-cols-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
        <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required />
        <input className="input" placeholder="Department" value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} />
        <button type="submit" className="btn btn-primary">+ Add Faculty</button>
      </form>

      <div className="card overflow-hidden p-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
        <table className="w-full text-xs">
          <thead className="bg-slate-100/80 dark:bg-slate-900/80 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-4 py-3.5">Name</th>
              <th className="px-4 py-3.5">Email</th>
              <th className="px-4 py-3.5">Department</th>
              <th className="px-4 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-[#111827]">
            {faculty.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400 font-semibold">
                  No faculty members registered yet.
                </td>
              </tr>
            ) : (
              faculty.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="px-4 py-3.5 font-extrabold text-slate-900 dark:text-white">{f.name}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-700 dark:text-slate-300">{f.email}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-500 dark:text-slate-400">{f.department || 'General'}</td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => setDeleteTarget(f)}
                      className="p-1.5 rounded-lg text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 dark:hover:border-rose-900/50 transition cursor-pointer"
                      title="Delete Teacher"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* CONFIRM DELETE MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1726] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Delete Teacher Account</h3>
              </div>
              <button
                onClick={() => setDeleteTarget(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to delete teacher account <strong className="text-slate-900 dark:text-white font-bold">{deleteTarget.name}</strong> ({deleteTarget.email})? This action cannot be undone.
            </p>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 disabled:opacity-50 rounded-xl transition shadow-sm cursor-pointer"
              >
                {deleting ? 'Deleting...' : 'Delete Teacher'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
