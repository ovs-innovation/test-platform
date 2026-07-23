import { useState, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthShell from '../../components/AuthShell.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

const REMEMBERED_KEY = 'edvedum_remembered_student';

export default function StudentLogin() {
  const { studentLogin, sendLoginOtp, verifyLoginOtp } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [savedUser, setSavedUser] = useState(() => {
    try {
      const raw = localStorage.getItem(REMEMBERED_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [loginMode, setLoginMode] = useState('email'); // 'email' or 'mobile'
  const [form, setForm] = useState(() => ({
    email: savedUser?.email || '',
    password: '',
  }));
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [devOtp, setDevOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Dynamically calculate days until upcoming NEET exam (e.g. NEET 2027 if 2026 passed)
  const countdownInfo = useMemo(() => {
    const now = new Date();
    let targetYear = now.getFullYear();
    let target = new Date(`${targetYear}-05-03`); // Traditionally 1st Sunday of May

    // If current year's May exam date has passed, target next year's exam
    if (now > target) {
      targetYear += 1;
      target = new Date(`${targetYear}-05-02`);
    }

    const diff = target - now;
    const days = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    return { examLabel: `NEET ${targetYear}`, days };
  }, []);

  const onSwitchAccount = () => {
    try {
      localStorage.removeItem(REMEMBERED_KEY);
    } catch {
      // ignore
    }
    setSavedUser(null);
    setForm({ email: '', password: '' });
  };

  const onEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await studentLogin(form);

      // Save user to localStorage if rememberMe is checked
      if (rememberMe && form.email) {
        const cleanName = form.email
          .split('@')[0]
          .replace(/[._-]/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
        localStorage.setItem(
          REMEMBERED_KEY,
          JSON.stringify({ email: form.email, name: cleanName })
        );
      } else if (!rememberMe) {
        localStorage.removeItem(REMEMBERED_KEY);
      }

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
      const res = await sendLoginOtp({ phone });
      setOtpSent(true);
      toast.success('OTP sent to your mobile number!');
      if (res?.devOtp) {
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
      await verifyLoginOtp({ phone, otp });
      toast.success('Welcome back!');
      navigate(location.state?.from || '/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const pageTitle = savedUser
    ? `Welcome back, ${savedUser.name || savedUser.email.split('@')[0]} 👋`
    : 'Student Login';

  const pageSubtitle = savedUser
    ? `Saved login found for ${savedUser.email}. Enter password to continue.`
    : 'Access your online test series, mock test results, and rank analytics.';

  return (
    <AuthShell title={pageTitle} subtitle={pageSubtitle}>
      {/* Login Mode Switcher */}
      <div className="grid grid-cols-2 gap-1 rounded-xl border border-slate-700/80 bg-[#070c18] p-1 mb-4">
        <button
          type="button"
          className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
            loginMode === 'email'
              ? 'bg-[#2563eb] text-white shadow-md shadow-blue-500/25 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
          onClick={() => {
            setLoginMode('email');
            setError('');
          }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Email & Password</span>
        </button>
        <button
          type="button"
          className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
            loginMode === 'mobile'
              ? 'bg-[#2563eb] text-white shadow-md shadow-blue-500/25 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
          onClick={() => {
            setLoginMode('mobile');
            setError('');
          }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span>Mobile & OTP</span>
        </button>
      </div>

      {error && (
        <div className="mb-3.5 rounded-xl border border-[#EF4444]/40 bg-[#EF4444]/10 px-3.5 py-2.5 text-xs font-semibold text-[#EF4444]">
          {error}
        </div>
      )}

      {loginMode === 'email' ? (
        <form onSubmit={onEmailSubmit} className="space-y-4">
          {savedUser && (
            <div className="flex items-center justify-between rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs">
              <span className="text-blue-300 font-medium truncate">
                Saved account: <strong className="text-white">{savedUser.email}</strong>
              </span>
              <button
                type="button"
                onClick={onSwitchAccount}
                className="shrink-0 text-xs font-bold text-[#60a5fa] hover:text-[#2563eb] hover:underline cursor-pointer ml-2"
              >
                Switch account
              </button>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Email Address
            </label>
            <input
              className="w-full rounded-xl border border-slate-700/90 bg-[#070c18] px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-[#2563eb] focus:bg-[#0a1224] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/35"
              type="email"
              placeholder="student@example.com"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs font-semibold text-[#60a5fa] hover:text-[#2563eb] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                className="w-full rounded-xl border border-slate-700/90 bg-[#070c18] pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-[#2563eb] focus:bg-[#0a1224] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/35"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-200 cursor-pointer p-1"
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
          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-slate-700 bg-[#070c18] text-[#2563eb] focus:ring-[#2563eb]/40 accent-[#2563eb]"
              />
              <span>Remember me on this device</span>
            </label>
          </div>

          <div className="mt-4 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e40af] py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.005] hover:shadow-blue-500/40 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Signing in…' : 'Log in to Account'}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {!otpSent ? (
            <form onSubmit={onSendOtp} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Registered Mobile Number
                </label>
                <div className="flex items-center rounded-xl border border-slate-700/90 bg-[#070c18] transition-all duration-200 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/35 overflow-hidden">
                  <span className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-2.5 text-xs font-bold text-slate-300 border-r border-slate-700/80 select-none shrink-0">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </span>
                  <input
                    className="w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                    type="tel"
                    required
                    placeholder="Enter 10-digit mobile number"
                    minLength={10}
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-slate-400">
                  Instant passwordless login via 6-digit SMS verification.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e40af] py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.005] hover:shadow-blue-500/40 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Sending OTP…' : 'Send Login OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={onVerifyOtp} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                    Enter 6-Digit OTP
                  </label>
                  <span className="text-xs font-semibold text-[#60a5fa]">
                    Sent to +91 {phone}
                  </span>
                </div>
                <input
                  className="w-full rounded-xl border border-[#2563eb]/60 bg-[#070c18] px-3.5 py-2.5 text-center tracking-widest text-base font-extrabold text-white placeholder:text-slate-600 transition-all duration-200 focus:border-[#2563eb] focus:bg-[#0a1224] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/40"
                  type="text"
                  required
                  placeholder="000000"
                  minLength={6}
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                />
              </div>

              {devOtp && (
                <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-3.5 py-2 text-xs text-blue-300">
                  <span className="font-bold text-blue-400">Testing code:</span> {devOtp}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e40af] py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.005] hover:shadow-blue-500/40 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Verifying OTP…' : 'Verify & Log in'}
              </button>

              <div className="text-center pt-0.5">
                <button
                  type="button"
                  className="text-xs font-semibold text-slate-400 hover:text-[#60a5fa] hover:underline cursor-pointer"
                  onClick={() => {
                    setOtpSent(false);
                    setDevOtp('');
                    setOtp('');
                  }}
                >
                  ← Change mobile number
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* EXAM COUNTDOWN WIDGET (DYNAMIC & CORRECTED) */}
      <div className="mt-4 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 rounded-xl border border-blue-500/30 bg-[#070c18] px-3 py-1.5 text-xs font-medium text-slate-300 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb] animate-pulse" />
          <span className="text-slate-400">Target Exam:</span>
          <span className="font-bold text-[#60a5fa]">{countdownInfo.examLabel}</span>
          <span className="text-slate-500">in</span>
          <span className="rounded-md bg-blue-500/15 px-2 py-0.5 text-xs font-extrabold text-[#60a5fa] border border-blue-500/30">
            {countdownInfo.days} Days
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2 border-t border-slate-800/80 pt-3.5 text-center">
        <p className="text-xs text-slate-400">
          New aspirant?{' '}
          <Link to="/signup" className="font-bold text-[#60a5fa] hover:text-[#2563eb] hover:underline">
            Create free account
          </Link>
        </p>

        <p className="text-xs text-slate-500">
          Are you an Administrator?{' '}
          <Link to="/admin-login" className="font-semibold text-[#60a5fa] hover:text-[#2563eb] hover:underline">
            Center Login →
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
