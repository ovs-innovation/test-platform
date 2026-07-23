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
<<<<<<< HEAD
  const [identifier, setIdentifier] = useState('');
=======
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [phone, setPhone] = useState('');
>>>>>>> 7ea9fced40604bf0fa31347aa07bbbdcfa2424d9
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
<<<<<<< HEAD
      setSentToEmail(res.message || 'OTP sent to your email address!');
      toast.success(res.message || 'OTP sent to your email address!');
      if (res.devOtp) {
=======
      toast.success('OTP sent to your mobile number!');
      if (res?.devOtp) {
>>>>>>> 7ea9fced40604bf0fa31347aa07bbbdcfa2424d9
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
    <AuthShell title="Student Login" subtitle="Access your online test series, mock test results, and rank analytics.">
      {/* Login Mode Switcher */}
      <div className="flex border-b border-slate-700/80 mb-6">
        <button
          type="button"
          className={`flex-1 pb-3 text-xs sm:text-sm font-semibold border-b-2 text-center transition-all cursor-pointer ${
            loginMode === 'email'
              ? 'border-[#00F0FF] text-[#00F0FF]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
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
<<<<<<< HEAD
          className={`flex-1 pb-3 text-sm font-semibold border-b-2 text-center transition-all ${loginMode === 'otp'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
=======
          className={`flex-1 pb-3 text-xs sm:text-sm font-semibold border-b-2 text-center transition-all cursor-pointer ${
            loginMode === 'mobile'
              ? 'border-[#00F0FF] text-[#00F0FF]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
>>>>>>> 7ea9fced40604bf0fa31347aa07bbbdcfa2424d9
          onClick={() => {
            setLoginMode('otp');
            setError('');
          }}
        >
          OTP Login
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-semibold text-red-400">
          {error}
        </div>
      )}

      {loginMode === 'email' ? (
        <form onSubmit={onEmailSubmit} className="space-y-6">
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
      ) : (
        <div className="space-y-5">
          {!otpSent ? (
            <form onSubmit={onSendOtp} className="space-y-5">
              <div>
<<<<<<< HEAD
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

=======
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2.5">
                  Mobile Number
                </label>
                <input
                  className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-[#0D6EFD] focus:bg-[#0a1224] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/35"
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  minLength={10}
                  maxLength={15}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.01] hover:shadow-cyan-500/30 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Sending OTP…' : 'Send Login OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={onVerifyOtp} className="space-y-5">
>>>>>>> 7ea9fced40604bf0fa31347aa07bbbdcfa2424d9
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2.5">
                  Enter 6-Digit OTP
                </label>
                <input
                  className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-3 text-center tracking-widest text-lg font-bold text-white placeholder:text-slate-600 transition-all duration-200 focus:border-[#0D6EFD] focus:bg-[#0a1224] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/35"
                  type="text"
                  required
                  placeholder="000000"
                  minLength={6}
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

<<<<<<< HEAD
              <button type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? 'Verifying OTP…' : 'Verify & Log in'}
              </button>

              <div className="text-center">
                <button type="button" className="text-xs text-slate-500 hover:text-brand-600 hover:underline" onClick={() => { setOtpSent(false); setOtp(''); setSentToEmail(''); }}>
                  Change Email or Mobile
=======
              {devOtp && (
                <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-xs text-blue-300">
                  <span className="font-bold text-blue-400">Testing code:</span> {devOtp}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.01] hover:shadow-cyan-500/30 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Verifying OTP…' : 'Verify & Log in'}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  className="text-xs font-semibold text-slate-400 hover:text-[#00F0FF] hover:underline cursor-pointer"
                  onClick={() => {
                    setOtpSent(false);
                    setDevOtp('');
                    setOtp('');
                  }}
                >
                  ← Change mobile number
>>>>>>> 7ea9fced40604bf0fa31347aa07bbbdcfa2424d9
                </button>
              </div>
            </form>
          )}
        </div>
      )}

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
