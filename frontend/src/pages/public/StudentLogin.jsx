import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthShell from '../../components/AuthShell.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function StudentLogin() {
  const { studentLogin, sendLoginOtp, verifyLoginOtp } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginMode, setLoginMode] = useState('email'); // 'email' or 'otp'
  const [form, setForm] = useState({ email: '', password: '' });
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [sentToEmail, setSentToEmail] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onEmailSubmit = async (e) => {
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

  const onSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDevOtp('');
    try {
      const res = await sendLoginOtp({ identifier });
      setOtpSent(true);
      setSentToEmail(res.message || 'OTP sent to your email address!');
      toast.success(res.message || 'OTP sent to your email address!');
      if (res.devOtp) {
        setDevOtp(res.devOtp);
      }
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const onVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await verifyLoginOtp({ identifier, otp });
      toast.success('Welcome back!');
      navigate(location.state?.from || '/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Student login" subtitle="Access your tests, results and analytics.">
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6">
        <button
          type="button"
          className={`flex-1 pb-3 text-sm font-semibold border-b-2 text-center transition-all ${loginMode === 'email'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          onClick={() => {
            setLoginMode('email');
            setError('');
          }}
        >
          Email & Password
        </button>
        <button
          type="button"
          className={`flex-1 pb-3 text-sm font-semibold border-b-2 text-center transition-all ${loginMode === 'otp'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          onClick={() => {
            setLoginMode('otp');
            setError('');
          }}
        >
          OTP Login
        </button>
      </div>

      {error && <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/20 dark:text-red-400">{error}</div>}

      {loginMode === 'email' ? (
        <form onSubmit={onEmailSubmit} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" required placeholder="name@example.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label className="label">Password</label>
              <Link to="/forgot-password" className="text-xs text-brand-600 hover:underline">Forgot password?</Link>
            </div>
            <input className="input" type="password" required placeholder="••••••••" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Signing in…' : 'Log in'}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          {!otpSent ? (
            <form onSubmit={onSendOtp} className="space-y-4">
              <div>
                <label className="label">Mobile number or Email</label>
                <input className="input" type="text" required placeholder="e.g. 9876543210 or name@example.com" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">An OTP code will be sent to your registered email address.</p>
              </div>
              <button type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? 'Sending OTP…' : 'Send OTP to Email'}
              </button>
            </form>
          ) : (
            <form onSubmit={onVerifyOtp} className="space-y-4">
              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 px-4 py-3 text-xs text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40">
                {sentToEmail || 'OTP code sent to your registered email address.'}
              </div>

              <div>
                <label className="label">Enter 6-digit OTP</label>
                <input className="input text-center tracking-widest text-lg font-bold" type="text" required placeholder="000000" minLength={6} maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} />
              </div>

              <button type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? 'Verifying OTP…' : 'Verify & Log in'}
              </button>

              <div className="text-center">
                <button type="button" className="text-xs text-slate-500 hover:text-brand-600 hover:underline" onClick={() => { setOtpSent(false); setOtp(''); setSentToEmail(''); }}>
                  Change Email or Mobile
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <p className="mt-6 text-center text-sm text-slate-500">
        New here? <Link to="/signup" className="font-semibold text-brand-600">Create account</Link>
        {' · '}
        <Link to="/admin-login" className="text-slate-500 hover:text-brand-600">Admin</Link>
      </p>
    </AuthShell>
  );
}
