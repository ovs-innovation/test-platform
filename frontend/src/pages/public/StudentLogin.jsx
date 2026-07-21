import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthShell from '../../components/AuthShell.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function StudentLogin() {
  const { studentLogin } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await studentLogin(form);
      toast.success('Welcome back!');
      navigate(location.state?.from || '/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Student Login" subtitle="Access your online test series, mock test results, and rank analytics.">
      <form onSubmit={onSubmit} className="space-y-6">
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-semibold text-red-400">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2.5">
            Email Address
          </label>
          <input
            className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-[#0D6EFD] focus:bg-[#0a1224] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/35"
            type="email"
            placeholder="student@example.com"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Password
            </label>
            <Link to="/forgot-password" className="text-xs font-semibold text-[#00F0FF] hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] pl-4 pr-11 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-[#0D6EFD] focus:bg-[#0a1224] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/35"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              required
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-200 cursor-pointer p-1"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.038 10.038 0 014.122-.963c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between pt-1.5">
          <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs font-semibold text-slate-300">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-[#2A354A] bg-[#070c18] text-[#0D6EFD] focus:ring-[#0D6EFD]/40 accent-[#0D6EFD]"
            />
            <span>Remember me on this device</span>
          </label>
        </div>

        <div className="mt-6 pt-1">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.01] hover:shadow-cyan-500/30 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Log in to Account'}
          </button>
        </div>
      </form>

      <div className="mt-6 space-y-3 border-t border-[#2A354A]/60 pt-5 text-center">
        <p className="text-xs sm:text-sm text-slate-400">
          New aspirant?{' '}
          <Link to="/signup" className="font-bold text-[#00F0FF] hover:underline">
            Create free account
          </Link>
        </p>

        <p className="text-xs text-slate-500">
          Are you an Institute / Center Administrator?{' '}
          <Link to="/admin-login" className="font-semibold text-[#38bdf8] hover:underline">
            Center Login →
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
