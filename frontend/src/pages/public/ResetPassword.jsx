import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthShell from '../../components/AuthShell.jsx';
import { authService } from '../../lib/services.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();

  const urlEmail = params.get('email') || '';
  const urlToken = params.get('token') || '';
  const isShortCode = urlToken.length > 0 && urlToken.length <= 10;
  const isLongHash = urlToken.length > 10;

  const [form, setForm] = useState({
    email: urlEmail,
    code: isShortCode ? urlToken : '',
    password: '',
    confirm: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email) {
      setError('Email address is required.');
      return;
    }
    const tokenToSubmit = form.code.trim() || urlToken;
    if (!tokenToSubmit) {
      setError('6-digit reset code is required.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await authService.resetPassword({
        email: form.email,
        token: tokenToSubmit,
        password: form.password,
      });
      toast.success('Password updated successfully! Please log in.');
      navigate('/student-login', { replace: true });
    } catch (err) {
      setError(err.message || 'Password reset failed. Check your reset code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Set New Password" subtitle="Enter your 6-digit reset code and choose a new password.">
      <form onSubmit={onSubmit} className="space-y-4">
        {urlToken && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs font-semibold text-emerald-400 flex items-center gap-2">
            <span>✓</span> {isShortCode ? '6-Digit reset code loaded from email link.' : 'Security verification link loaded from email.'}
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-semibold text-red-400">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Email Address
          </label>
          <input
            className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-[#0D6EFD] focus:bg-[#0a1224] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/35"
            type="email"
            required
            placeholder="name@example.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            6-Digit Reset Code {isLongHash && <span className="text-slate-500 font-normal lowercase">(or leave blank to use email link)</span>}
          </label>
          <input
            className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-[#0D6EFD] focus:bg-[#0a1224] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/35 font-bold tracking-wider text-center text-lg"
            required={!isLongHash}
            placeholder={isLongHash ? 'Link verified (or enter 6-digit code)' : '000000'}
            maxLength={10}
            value={form.code}
            onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            New Password
          </label>
          <input
            className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-[#0D6EFD] focus:bg-[#0a1224] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/35"
            type="password"
            required
            minLength={6}
            placeholder="At least 6 characters"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Confirm New Password
          </label>
          <input
            className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-[#0D6EFD] focus:bg-[#0a1224] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/35"
            type="password"
            required
            placeholder="Re-enter new password"
            value={form.confirm}
            onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.01] hover:shadow-cyan-500/30 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Updating Password…' : 'Update Password & Log in'}
          </button>
        </div>

        <div className="border-t border-[#2A354A]/60 pt-4 text-center">
          <Link to="/student-login" className="text-xs font-semibold text-slate-400 hover:text-[#00F0FF] hover:underline">
            ← Back to Student Login
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
