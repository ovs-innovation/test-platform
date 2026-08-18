import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthShell from '../../components/AuthShell.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function StudentLogin() {
  const { user, loading: authLoading, studentLogin, sendLoginOtp, verifyLoginOtp, getDashboardRoute } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Mode can be: 'email_otp' (default), 'mobile', 'institute'
  const [loginMode, setLoginMode] = useState('email_otp');

  // Form Fields
  const [instituteCode, setInstituteCode] = useState('');
  const [enrollmentId, setEnrollmentId] = useState('');

  // Mobile OTP Fields
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtpCode, setMobileOtpCode] = useState('');
  const [mobileTimer, setMobileTimer] = useState(0);

  // Email OTP Fields
  const [emailOtp, setEmailOtp] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpDigits, setEmailOtpDigits] = useState(['', '', '', '', '', '']);
  const [emailTimer, setEmailTimer] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const otpBoxRefs = useRef([]);

  const getDestination = (role) => {
    const searchParams = new URLSearchParams(location.search);
    const returnUrl = searchParams.get('returnUrl');
    const fromState = typeof location.state?.from === 'string' ? location.state.from : location.state?.from?.pathname;
    const target = returnUrl || fromState;
    if (target && !target.includes('/login') && !target.includes('/signup')) {
      return target;
    }
    return getDashboardRoute ? getDashboardRoute(role) : '/dashboard';
  };

  // Auto-redirect if student is already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      navigate(getDestination(user.role), { replace: true });
    }
  }, [user, authLoading, navigate, location, getDashboardRoute]);

  // Email OTP Resend Countdown Timer
  useEffect(() => {
    let interval = null;
    if (emailTimer > 0) {
      interval = setInterval(() => setEmailTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [emailTimer]);

  // Mobile OTP Resend Countdown Timer
  useEffect(() => {
    let interval = null;
    if (mobileTimer > 0) {
      interval = setInterval(() => setMobileTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [mobileTimer]);

  // Auto-focus first OTP digit box when Email OTP is sent
  useEffect(() => {
    if (emailOtpSent) {
      const timer = setTimeout(() => {
        otpBoxRefs.current[0]?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [emailOtpSent]);

  // Tab switch cleanup
  const handleSwitchTab = (mode) => {
    setLoginMode(mode);
    setError('');
    setEmailOtpSent(false);
    setEmailOtpDigits(['', '', '', '', '', '']);
    setEmailTimer(0);
    setMobileOtpSent(false);
    setMobileOtpCode('');
    setMobileTimer(0);
  };

  // Handle Send Email OTP
  const handleSendEmailOtp = async (e) => {
    e?.preventDefault();
    const cleanEmail = emailOtp.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setError('Please enter a valid Gmail or Email address.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      if (sendLoginOtp) {
        await sendLoginOtp({ email: cleanEmail, identifier: cleanEmail });
      }
      setEmailOtpSent(true);
      setEmailTimer(30);
      setEmailOtpDigits(['', '', '', '', '', '']);
      toast.success(`Verification OTP sent to ${cleanEmail}`);
    } catch (err) {
      setError(err.message || 'Failed to send OTP code. Please verify your email.');
    } finally {
      setLoading(false);
    }
  };

  // OTP Box Handlers (Typing, Paste, Backspace, Arrow keys)
  const handleOtpDigitChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);

    setEmailOtpDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });

    if (digit && index < 5) {
      setTimeout(() => {
        otpBoxRefs.current[index + 1]?.focus();
      }, 0);
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!emailOtpDigits[index] && index > 0) {
        e.preventDefault();
        otpBoxRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      otpBoxRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault();
      otpBoxRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (index, e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    setEmailOtpDigits((prev) => {
      const next = [...prev];
      for (let i = 0; i < pasted.length && index + i < 6; i++) {
        next[index + i] = pasted[i];
      }
      return next;
    });

    const targetIndex = Math.min(index + pasted.length, 5);
    setTimeout(() => {
      otpBoxRefs.current[targetIndex]?.focus();
    }, 0);
  };

  // Handle Verify Email OTP Submit
  const handleVerifyEmailOtpSubmit = async (e) => {
    e?.preventDefault();
    const fullCode = emailOtpDigits.join('').trim();
    if (fullCode.length !== 6) {
      setError('Please enter the full 6-digit OTP code sent to your email.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const cleanEmail = emailOtp.trim().toLowerCase();
      let u;
      if (verifyLoginOtp) {
        u = await verifyLoginOtp({ email: cleanEmail, identifier: cleanEmail, otp: fullCode });
      } else {
        u = await studentLogin({ email: cleanEmail, otp: fullCode });
      }
      toast.success('Email verification successful!');
      navigate(getDestination(u?.role), { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid or expired OTP code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Send Mobile OTP
  const handleSendMobileOtp = async (e) => {
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
        await sendLoginOtp({ mobile: cleanPhone, phone: cleanPhone, identifier: cleanPhone });
      }
      setMobileOtpSent(true);
      setMobileTimer(30);
      toast.success(`OTP sent to +91 ${cleanPhone}`);
    } catch (err) {
      setError(err.message || 'Failed to send OTP to mobile number.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify Mobile OTP Submit
  const handleVerifyMobileOtpSubmit = async (e) => {
    e?.preventDefault();
    const cleanCode = mobileOtpCode.trim();
    if (cleanCode.length < 4) {
      setError('Please enter the verification OTP code sent to your mobile.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const cleanPhone = mobileNumber.replace(/\D/g, '');
      let u;
      if (verifyLoginOtp) {
        u = await verifyLoginOtp({ mobile: cleanPhone, phone: cleanPhone, identifier: cleanPhone, otp: cleanCode });
      } else {
        u = await studentLogin({ mobile: cleanPhone, phone: cleanPhone, otp: cleanCode });
      }
      toast.success('Mobile verification successful!');
      navigate(getDestination(u?.role), { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid OTP code. Please try again.');
    } finally {
      setLoading(false);
    }
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
      navigate(getDestination(u?.role), { replace: true });
    } catch (err) {
      setError(err.message || 'Institutional login failed. Check Institute Code or Enrollment ID.');
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
      <div className="grid grid-cols-3 p-1 bg-[#050a18]/80 border border-[#1e293b] rounded-2xl mb-6 gap-1">
        <button
          type="button"
          className={`py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer truncate flex items-center justify-center gap-1.5 ${
            loginMode === 'email_otp'
              ? 'bg-gradient-to-r from-[#0D6EFD] to-[#00F0FF] text-white font-bold shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
          onClick={() => handleSwitchTab('email_otp')}
        >
          <span>✉️</span>
          <span>Email OTP</span>
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
          <span>Mobile OTP</span>
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
          <span>Code & ID</span>
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-semibold text-red-400">
          {error}
        </div>
      )}

      {/* MODE 1: EMAIL OTP LOGIN */}
      {loginMode === 'email_otp' && (
        <div className="space-y-4">
          {!emailOtpSent ? (
            <form onSubmit={handleSendEmailOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Gmail / Registered Email Address *
                </label>
                <input
                  className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none transition-colors"
                  type="email"
                  required
                  placeholder="student@gmail.com"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !emailOtp.trim()}
                className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? 'Sending OTP…' : 'Send OTP →'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyEmailOtpSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex justify-between items-center text-xs">
                <span className="text-slate-300 font-mono">
                  OTP sent to: <strong>{emailOtp}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setEmailOtpSent(false);
                    setEmailOtpDigits(['', '', '', '', '', '']);
                    setError('');
                  }}
                  className="text-[#00F0FF] hover:underline font-bold cursor-pointer"
                >
                  Change Email
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Enter 6-Digit Verification Code *
                </label>

                {/* 6-Box OTP Input */}
                <div className="grid grid-cols-6 gap-2 sm:gap-3 my-3">
                  {emailOtpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpBoxRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      onPaste={(e) => handleOtpPaste(idx, e)}
                      className="w-full h-12 sm:h-14 rounded-xl border border-[#2A354A] bg-[#070c18] text-center text-lg sm:text-xl font-bold text-[#00F0FF] font-mono transition-all outline-none focus:border-[#00F0FF] focus:bg-[#00F0FF]/10 focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] focus:ring-1 focus:ring-[#00F0FF]"
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-xs pt-1">
                {emailTimer > 0 ? (
                  <span className="text-slate-400 font-mono">
                    Resend OTP in <strong>{emailTimer}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleSendEmailOtp}
                    className="text-[#00F0FF] hover:underline font-bold cursor-pointer disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || emailOtpDigits.join('').trim().length < 6}
                className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? 'Verifying OTP…' : 'Verify OTP & Log In →'}
              </button>
            </form>
          )}
        </div>
      )}



      {/* MODE 3: MOBILE NUMBER & OTP */}
      {loginMode === 'mobile' && (
        <div className="space-y-4">
          {!mobileOtpSent ? (
            <form onSubmit={handleSendMobileOtp} className="space-y-4">
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
            <form onSubmit={handleVerifyMobileOtpSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex justify-between items-center text-xs">
                <span className="text-slate-300 font-mono">
                  OTP sent to: <strong>+91 {mobileNumber}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOtpSent(false)}
                  className="text-[#00F0FF] hover:underline font-bold cursor-pointer"
                >
                  Change
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Enter Verification OTP *
                </label>
                <input
                  className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 text-center text-lg font-black tracking-widest text-[#00F0FF] placeholder:text-slate-600 focus:border-[#00F0FF] focus:outline-none font-mono transition-colors"
                  type="text"
                  maxLength={6}
                  required
                  placeholder="• • • • • •"
                  value={mobileOtpCode}
                  onChange={(e) => setMobileOtpCode(e.target.value.replace(/\D/g, ''))}
                />
              </div>

              <div className="flex justify-between items-center text-xs pt-1">
                {mobileTimer > 0 ? (
                  <span className="text-slate-400 font-mono">
                    Resend OTP in <strong>{mobileTimer}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendMobileOtp}
                    className="text-[#00F0FF] hover:underline font-bold cursor-pointer"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || mobileOtpCode.length < 4}
                className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? 'Verifying OTP…' : 'Verify OTP & Log In →'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* MODE 4: INSTITUTE CODE & ENROLLMENT ID */}
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
