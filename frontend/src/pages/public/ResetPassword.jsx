import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthShell from '../../components/AuthShell.jsx';
import { Spinner } from '../../components/ui.jsx';
import { authService } from '../../lib/services.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({
    email: params.get('email') || '',
    token: params.get('token') || '',
    password: '',
    confirm: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await authService.resetPassword({ email: form.email, token: form.token, password: form.password });
      toast.success('Password updated! Please login.');
      navigate('/student-login', { replace: true });
    } catch (err) {
      setError(err.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Reset password" subtitle="Choose a new password for your account.">
      <form onSubmit={onSubmit} className="space-y-4">
        {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
        </div>
        <div>
          <label className="label">Reset token</label>
          <input className="input" required value={form.token} onChange={(e) => setForm((f) => ({ ...f, token: e.target.value }))} />
        </div>
        <div>
          <label className="label">New password</label>
          <input className="input" type="password" required minLength={6} value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
        </div>
        <div>
          <label className="label">Confirm password</label>
          <input className="input" type="password" required value={form.confirm} onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))} />
        </div>
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? <Spinner className="h-4 w-4" /> : 'Update password'}
        </button>
        <p className="text-center text-sm text-slate-500">
          <Link to="/student-login" className="text-brand-600 hover:underline">Back to login</Link>
        </p>
      </form>
    </AuthShell>
  );
}
