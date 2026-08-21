import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthShell from '../components/AuthShell.jsx';
import { Spinner, PasswordInput } from '../components/ui.jsx';
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
      const greetingName = (user.role === 'admin' || user.role === 'superadmin' || user.name?.toLowerCase().includes('platform'))
        ? 'Admin'
        : (user.name ? user.name.split(' ')[0] : 'Admin');
      toast.success(`Welcome back, ${greetingName}!`);
      const dest = location.state?.from?.pathname;
      const defaultDest = user.redirectTo || (user.role === 'institution_admin' ? '/for-schools' : '/admin');
      navigate(dest || defaultDest, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell variant="admin" title="Admin & Center Sign In" subtitle="Sign in to manage test series, assessments, and candidates.">
      <form onSubmit={onSubmit} className="space-y-5">
        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm font-medium text-red-300">{error}</div>
        )}
        <div>
          <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2" htmlFor="email">Email Address / Center ID</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full min-h-[52px] sm:min-h-[54px] rounded-xl border border-slate-300/80 bg-[#EAF0FA] px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-500 focus:border-[#2563eb] focus:bg-white focus:outline-none transition shadow-sm"
            placeholder="admin@company.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2" htmlFor="password">Password</label>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="current-password"
            required
            className="w-full min-h-[52px] sm:min-h-[54px] rounded-xl border border-slate-300/80 bg-[#EAF0FA] px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-500 focus:border-[#2563eb] focus:bg-white focus:outline-none transition shadow-sm"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          />
        </div>
        <div className="pt-1">
          <button
            type="submit"
            className="w-full min-h-[52px] sm:min-h-[56px] rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] py-3.5 px-4 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            disabled={submitting}
          >
            {submitting ? <Spinner className="h-4 w-4 text-white mx-auto" /> : 'Sign In as Administrator / Center'}
          </button>
        </div>
      </form>
      <p className="mt-3.5 text-center text-xs text-slate-400 leading-relaxed px-2">
        Candidates access assessments via their unique invitation link or student portal login.
      </p>
    </AuthShell>
  );
}
