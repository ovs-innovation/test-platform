import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '../../components/AuthShell.jsx';
import { authService } from '../../lib/services.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [devResetUrl, setDevResetUrl] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      const res = await authService.forgotPassword({ email });
      setSent(true);
      const msg = res.message || 'If an account exists with that email, a password reset code has been sent.';
      setMessage(msg);
      toast.success(msg);
      setDevOtp(res.devOtp || '');
      setDevResetUrl(res.devResetUrl || '');
    } catch (err) {
      setError(err.message || 'Failed to request password reset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Forgot Password" subtitle="We will send a 6-digit reset OTP code and direct link to your registered email.">
      {sent ? (
        <div className="space-y-5 text-center">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-medium text-emerald-400 leading-relaxed">
            {message}
          </div>

          {devOtp && (
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-left text-xs text-blue-300">
              <p className="font-bold text-blue-400 mb-1">Testing reset OTP code:</p>
              <p className="text-lg font-bold text-white tracking-widest">{devOtp}</p>
            </div>
          )}

          {devResetUrl && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-left text-xs text-amber-300">
              <p className="font-bold text-amber-400 mb-1">Dev reset link:</p>
              <a href={devResetUrl} className="break-all text-[#00F0FF] underline">
                {devResetUrl}
              </a>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(`/reset-password?email=${encodeURIComponent(email)}`)}
              className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.01] hover:shadow-cyan-500/30 cursor-pointer"
            >
              Enter Reset Code & Set Password →
            </button>

            <Link
              to="/student-login"
              className="block text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
            >
              Back to Login
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
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
              required
              placeholder="student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.01] hover:shadow-cyan-500/30 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Sending Reset Code…' : 'Send Reset Link & Code'}
            </button>
          </div>

          <div className="border-t border-[#2A354A]/60 pt-4 text-center">
            <Link to="/student-login" className="text-xs font-semibold text-slate-400 hover:text-[#00F0FF] hover:underline">
              ← Back to Student Login
            </Link>
          </div>
        </form>
      )}
    </AuthShell>
  );
}
