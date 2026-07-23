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
    <AuthShell variant="admin" title="Admin sign in" subtitle="Sign in to manage test series, assessments and candidates.">
      <form onSubmit={onSubmit} className="space-y-5">
        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm font-medium text-red-300">{error}</div>
        )}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5" htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-xl border border-slate-700/90 bg-[#070c18] px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#2563eb] focus:bg-[#0a1224] focus:outline-none"
            placeholder="admin@company.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-xl border border-slate-700/90 bg-[#070c18] px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#2563eb] focus:bg-[#0a1224] focus:outline-none"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:scale-[1.02] disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? <Spinner className="h-4 w-4 text-white" /> : 'Sign In as Administrator'}
        </button>
      </form>
      <p className="mt-6 text-center text-xs text-slate-400">
        Candidates access assessments via their unique invitation link or student portal login.
      </p>
    </AuthShell>
  );
}
