import { useEffect, useState } from 'react';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, PageHeader, Spinner } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';

function initials(name) {
  return (name || 'U').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

export default function Profile() {
  const toast = useToast();
  const [form, setForm] = useState({ name: '', phone: '', city: '', state: '', target_exam: '' });
  const [email, setEmail] = useState('');
  const [state, setState] = useState('loading');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    studentService.profile().then((d) => {
      setEmail(d.user.email);
      setForm({
        name: d.user.name || '',
        phone: d.profile?.phone || '',
        city: d.profile?.city || '',
        state: d.profile?.state || '',
        target_exam: d.profile?.target_exam || '',
      });
      setState('done');
    }).catch(() => setState('error'));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await studentService.updateProfile(form);
      toast.success('Profile saved');
    } catch (err) {
      toast.error(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (state === 'loading') return <LoadingScreen />;
  if (state === 'error') return <ErrorState onRetry={() => window.location.reload()} />;

  return (
    <div>
      <PageHeader title="Profile" subtitle="Name, phone, and target exam — keep these accurate for certificates." />

      <div className="mb-6 flex items-center gap-4 border border-slate-200 px-4 py-4 dark:border-slate-700">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-slate-200 text-sm font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
          {initials(form.name)}
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">{form.name || 'Student'}</p>
          <p className="text-sm text-muted">{email}</p>
          {form.target_exam && <p className="mt-1 text-xs font-medium text-brand-600">Preparing for {form.target_exam}</p>}
        </div>
      </div>

      <form onSubmit={save} className="card max-w-xl space-y-4 p-6">
        <div><label className="label">Email</label><input className="input bg-slate-50 dark:bg-slate-800/50" value={email} disabled /></div>
        <div><label className="label">Full name</label><input className="input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required /></div>
        <div><label className="label">Phone</label><input className="input" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="label">City</label><input className="input" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} /></div>
          <div><label className="label">State</label><input className="input" value={form.state} onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))} /></div>
        </div>
        <div><label className="label">Target exam</label><input className="input" placeholder="JEE Main, NEET UG, NEET PG…" value={form.target_exam} onChange={(e) => setForm((f) => ({ ...f, target_exam: e.target.value }))} /></div>
        <button type="submit" className="btn-primary" disabled={saving}>{saving ? <Spinner className="h-4 w-4" /> : 'Save profile'}</button>
      </form>
    </div>
  );
}
