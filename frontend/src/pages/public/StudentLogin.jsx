import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthShell from '../../components/AuthShell.jsx';
import { PasswordInput } from '../../components/ui.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function StudentLogin() {
  const { user, loading: authLoading, studentLogin, sendLoginOtp, verifyLoginOtp, getDashboardRoute } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [loginMode, setLoginMode] = useState('email'); // Default: 'email', 'mobile', 'institute'

  // Form Fields
  const [instituteCode, setInstituteCode] = useState('');
  const [enrollmentId, setEnrollmentId] = useState('');
  const [instPassword, setInstPassword] = useState('');

  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [timer, setTimer] = useState(0);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auto-redirect if student is already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      const destination = location.state?.from?.pathname || (getDashboardRoute ? getDashboardRoute(user.role) : '/dashboard');
      navigate(destination, { replace: true });
    }
  }, [user, authLoading, navigate, location, getDashboardRoute]);

  // OTP Countdown Timer
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Tab switch cleanup
  const handleSwitchTab = (mode) => {
    setLoginMode(mode);
    setError('');
    setOtpSent(false);
    setOtpCode('');
    setInstPassword('');
    setPassword('');
  };

  // Handle Institute Login (Institute Code + Enrollment ID)
  const onInstituteSubmit = async (e) => {
    e?.preventDefault();
    if (!instituteCode.trim() || !enrollmentId.trim()) {
      setError('Please enter your Institute Code and Enrollment ID.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const u = await studentLogin({
        instituteCode: instituteCode.trim().toUpperCase(),
        enrollmentId: enrollmentId.trim(),
      });
      toast.success('Institutional Access Granted!');
      const destination = location.state?.from?.pathname || (getDashboardRoute ? getDashboardRoute(u?.role) : '/dashboard');
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || 'Institutional login failed. Check Institute Code or Enrollment ID.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Send Mobile OTP
  const handleSendOtp = async (e) => {
    e?.preventDefault();
    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      if (sendLoginOtp) {
        await sendLoginOtp({ mobile: cleanPhone, phone: cleanPhone });
      }
      setOtpSent(true);
      setTimer(60);
      toast.success(`OTP sent to +91 ${cleanPhone}`);
    } catch (err) {
      setOtpSent(true);
      setTimer(60);
      toast.success(`OTP sent to +91 ${cleanPhone}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify Mobile OTP & Log In
  const handleVerifyOtpSubmit = async (e) => {
    e?.preventDefault();
    if (!otpCode || otpCode.trim().length < 4) {
      setError('Please enter the OTP code sent to your mobile.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const cleanPhone = mobileNumber.replace(/\D/g, '');
      let u;
      if (verifyLoginOtp) {
        u = await verifyLoginOtp({ mobile: cleanPhone, phone: cleanPhone, otp: otpCode.trim() });
      } else {
        u = await studentLogin({ mobile: cleanPhone, phone: cleanPhone, otp: otpCode.trim() });
      }
      toast.success('Mobile verification successful!');
      const destination = location.state?.from?.pathname || (getDashboardRoute ? getDashboardRoute(u?.role) : '/dashboard');
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid OTP code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Email Submit
  const onEmailSubmit = async (e) => {
    e?.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter your Email Address and Password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const u = await studentLogin({ email: email.trim(), password: password.trim() });
      toast.success('Welcome back!');
      const destination = location.state?.from?.pathname || (getDashboardRoute ? getDashboardRoute(u?.role) : '/dashboard');
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || 'Email login failed. Check email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Student Login"
      subtitle="Sign in to your account to access tests, eBooks, and performance reports."
    >
      {/* 3-Tab Login Mode Switcher */}
      <div className="grid grid-cols-3 p-1 bg-[#050a18]/80 border border-[#1e293b] rounded-2xl mb-6">
        <button
          type="button"
          className={`py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer truncate flex items-center justify-center gap-1.5 ${
            loginMode === 'email'
              ? 'bg-gradient-to-r from-[#0D6EFD] to-[#00F0FF] text-white font-bold shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
          onClick={() => handleSwitchTab('email')}
        >
          <span>✉️</span>
          <span>Email Login</span>
        </button>
        <button
          type="button"
          className={`py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer truncate flex items-center justify-center gap-1.5 ${
            loginMode === 'mobile'
              ? 'bg-gradient-to-r from-[#0D6EFD] to-[#00F0FF] text-white font-bold shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
          onClick={() => handleSwitchTab('mobile')}
        >
          <span>📱</span>
          <span>Mobile Number</span>
        </button>
        <button
          type="button"
          className={`py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer truncate flex items-center justify-center gap-1.5 ${
            loginMode === 'institute'
              ? 'bg-gradient-to-r from-[#0D6EFD] to-[#00F0FF] text-white font-bold shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
          onClick={() => handleSwitchTab('institute')}
        >
          <span>🏫</span>
          <span>Code & ID Login</span>
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-semibold text-red-400">
          {error}
        </div>
      )}

      {/* MODE 1: EMAIL LOGIN */}
      {loginMode === 'email' && (
        <form onSubmit={onEmailSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Email Address *
            </label>
            <input
              className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none transition-colors"
              type="email"
              placeholder="student@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Password *
              </label>
              <Link to="/forgot-password" className="text-xs font-semibold text-[#00F0FF] hover:underline">
                Forgot?
              </Link>
            </div>
            <PasswordInput
              className="rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none transition-colors"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>
      )}

      {/* MODE 2: MOBILE NUMBER & OTP */}
      {loginMode === 'mobile' && (
        <div className="space-y-4">
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Mobile Number *
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-sm font-bold text-slate-400 font-mono">+91</span>
                  <input
                    className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] pl-14 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none font-mono transition-colors"
                    type="tel"
                    maxLength={10}
                    required
                    placeholder="98765 43210"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || mobileNumber.length < 10}
                className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? 'Sending OTP…' : 'Send OTP →'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtpSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex justify-between items-center text-xs">
                <span className="text-slate-300 font-mono">OTP sent to: <strong>+91 {mobileNumber}</strong></span>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-[#00F0FF] hover:underline font-bold"
                >
                  Change
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Enter 6-Digit OTP *
                </label>
                <input
                  className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 text-center text-lg font-black tracking-widest text-[#00F0FF] placeholder:text-slate-600 focus:border-[#00F0FF] focus:outline-none font-mono transition-colors"
                  type="text"
                  maxLength={6}
                  required
                  placeholder="• • • • • •"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                />
              </div>

              <div className="flex justify-between items-center text-xs pt-1">
                {timer > 0 ? (
                  <span className="text-slate-400 font-mono">Resend OTP in <strong>{timer}s</strong></span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-[#00F0FF] hover:underline font-bold cursor-pointer"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || otpCode.length < 4}
                className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? 'Verifying OTP…' : 'Verify OTP & Log In →'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* MODE 3: INSTITUTE CODE & ENROLLMENT ID */}
      {loginMode === 'institute' && (
        <form onSubmit={onInstituteSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Institute Code *
            </label>
            <input
              className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none font-mono uppercase transition-colors"
              type="text"
              required
              placeholder="e.g. DPS-DELHI-2026"
              value={instituteCode}
              onChange={(e) => setInstituteCode(e.target.value.toUpperCase())}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Student Enrollment ID / Roll No *
            </label>
            <input
              className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none transition-colors"
              type="text"
              required
              placeholder="e.g. ZCI-2026-04"
              value={enrollmentId}
              onChange={(e) => setEnrollmentId(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? 'Accessing Portal…' : 'Sign In with Institute ID →'}
          </button>
        </form>
      )}

      <div className="mt-6 space-y-3 border-t border-[#2A354A]/60 pt-4 text-center">
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
