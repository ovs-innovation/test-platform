import { useEffect, useState } from 'react';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, PageHeader } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function AdminFaculty() {
  const toast = useToast();
  const [faculty, setFaculty] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: 'Faculty@123', department: '' });
  const [loading, setLoading] = useState(true);

  const load = () => adminService.faculty().then((d) => setFaculty(d)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await adminService.createFaculty(form);
      toast.success('Faculty added');
      load();
    } catch (err) { toast.error(err.message); }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div>
      <PageHeader title="Faculty Members" subtitle="Manage faculty accounts and department permissions." />
      <form onSubmit={create} className="card mb-6 grid gap-3 p-4 sm:grid-cols-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
        <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required />
        <input className="input" placeholder="Department" value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} />
        <button type="submit" className="btn-primary">Add Faculty</button>
      </form>
      <div className="card overflow-hidden p-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
        <table className="w-full text-xs">
          <thead className="bg-slate-100/80 dark:bg-slate-900/80 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-4 py-3.5">Name</th>
              <th className="px-4 py-3.5">Email</th>
              <th className="px-4 py-3.5">Department</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-[#111827]">
            {faculty.map((f) => (
              <tr key={f.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                <td className="px-4 py-3.5 font-extrabold text-slate-900 dark:text-white">{f.name}</td>
                <td className="px-4 py-3.5 font-semibold text-slate-700 dark:text-slate-300">{f.email}</td>
                <td className="px-4 py-3.5 font-semibold text-slate-500 dark:text-slate-400">{f.department || 'General'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

