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
      <PageHeader title="Faculty" subtitle="Manage faculty accounts." />
      <form onSubmit={create} className="card mb-6 grid gap-3 p-4 sm:grid-cols-4">
        <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required />
        <input className="input" placeholder="Department" value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} />
        <button type="submit" className="btn-primary">Add faculty</button>
      </form>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Department</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {faculty.map((f) => (
              <tr key={f.id}><td className="px-4 py-3">{f.name}</td><td className="px-4 py-3">{f.email}</td><td className="px-4 py-3">{f.department}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
