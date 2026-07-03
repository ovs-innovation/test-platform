import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthShell from '../components/AuthShell.jsx';
import { Spinner } from '../components/ui.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const user = await login(form);
      toast.success(`Welcome back, ${user.name.split(' ')[0]}!`);
      const dest = location.state?.from?.pathname;
      navigate(dest || '/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell title="Admin sign in" subtitle="Sign in to manage test series, assessments and candidates.">
      <form onSubmit={onSubmit} className="space-y-5">
        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>
        )}
        <div>
          <label className="label" htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" required
            className="input" placeholder="admin@company.com" value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required
            className="input" placeholder="••••••••" value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
        </div>
        <button type="submit" className="btn-primary w-full" disabled={submitting}>
          {submitting ? <Spinner className="h-4 w-4 text-white" /> : 'Sign in'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Candidates access assessments via their unique invitation link.
      </p>
    </AuthShell>
  );
}
