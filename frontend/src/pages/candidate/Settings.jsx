import { useState } from 'react';
import { studentService } from '../../lib/services.js';
import { PageHeader, Spinner } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function Settings() {
  const toast = useToast();
  const [form, setForm] = useState({ current_password: '', new_password: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (form.new_password !== form.confirm) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      await studentService.changePassword({ current_password: form.current_password, new_password: form.new_password });
      toast.success('Password updated');
      setForm({ current_password: '', new_password: '', confirm: '' });
    } catch (err) {
      toast.error(err.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Settings" subtitle="Security and account preferences." />
      <form onSubmit={submit} className="card max-w-md space-y-4 p-6">
        <div><label className="label">Current password</label><input type="password" className="input" required value={form.current_password} onChange={(e) => setForm((f) => ({ ...f, current_password: e.target.value }))} /></div>
        <div><label className="label">New password</label><input type="password" className="input" required minLength={6} value={form.new_password} onChange={(e) => setForm((f) => ({ ...f, new_password: e.target.value }))} /></div>
        <div><label className="label">Confirm password</label><input type="password" className="input" required value={form.confirm} onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))} /></div>
        <button type="submit" className="btn-primary" disabled={loading}>{loading ? <Spinner className="h-4 w-4" /> : 'Change password'}</button>
      </form>
    </div>
  );
}
