import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthShell from '../../components/AuthShell.jsx';
import { PasswordInput } from '../../components/ui.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function StudentLogin() {
  const { studentLogin, sendLoginOtp, verifyLoginOtp } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [loginMode, setLoginMode] = useState('institute'); // 'institute', 'mobile', or 'email'
  
  // Institute Form
  const [instituteCode, setInstituteCode] = useState('DPS-DELHI-2026');
  const [enrollmentId, setEnrollmentId] = useState('2026-DPS-01');
  const [instPassword, setInstPassword] = useState('password123');

  // Mobile Form
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobilePassword, setMobilePassword] = useState('');

  // Email Form
  const [form, setForm] = useState({ email: '', password: '' });

  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Institute Login (Institute Code + Enrollment ID)
  const onInstituteSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError('');
    try {
      await studentLogin({ instituteCode, enrollmentId, password: instPassword });
      toast.success('AIETS Institutional Access Granted!');
      navigate(location.state?.from || '/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Institutional login failed. Check Code or Enrollment ID.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Mobile Login
  const onMobileSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError('');
    try {
      await studentLogin({ mobile: mobileNumber, phone: mobileNumber, password: mobilePassword });
      toast.success('Welcome back!');
      navigate(location.state?.from || '/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Mobile login failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle Email Submit
  const onEmailSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError('');
    try {
      await studentLogin(form);
      toast.success('Welcome back!');
      navigate(location.state?.from || '/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Email login failed');
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Access Handler
  const handleQuickStudentLogin = async (preset) => {
    setLoading(true);
    setError('');
    try {
      await studentLogin({
        instituteCode: preset.code,
        enrollmentId: preset.roll,
        email: preset.email,
        mobile: preset.phone,
      });
      toast.success(`Welcome, ${preset.name}! Auto-assigned ${preset.school} & eBooks.`);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Quick access failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Student AIETS Access Portal" subtitle="Access your assigned Test Series, eBooks, Institution Batch, and AIR Analytics.">
      
      {/* Auto-assignment Badge Banner */}
      <div className="mb-5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-xs text-cyan-300 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
        <span>Logging in automatically assigns your <strong>Institution, Batch, Test Series, and eBooks</strong>.</span>
      </div>

      {/* 3-Tab Login Mode Switcher */}
      <div className="grid grid-cols-3 border-b border-slate-700/80 mb-6 text-center">
        <button
          type="button"
          className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer truncate ${
            loginMode === 'institute'
              ? 'border-[#00F0FF] text-[#00F0FF]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
          onClick={() => {
            setLoginMode('institute');
            setError('');
          }}
        >
          🏫 Institute Code & ID
        </button>
        <button
          type="button"
          className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer truncate ${
            loginMode === 'mobile'
              ? 'border-[#00F0FF] text-[#00F0FF]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
          onClick={() => {
            setLoginMode('mobile');
            setError('');
          }}
        >
          📱 Mobile Number
        </button>
        <button
          type="button"
          className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer truncate ${
            loginMode === 'email'
              ? 'border-[#00F0FF] text-[#00F0FF]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
          onClick={() => {
            setLoginMode('email');
            setError('');
          }}
        >
          ✉️ Email Login
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-semibold text-red-400">
          {error}
        </div>
      )}

      {/* MODE 1: INSTITUTE CODE & ENROLLMENT ID */}
      {loginMode === 'institute' && (
        <form onSubmit={onInstituteSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              1. Institute Code *
            </label>
            <input
              className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none"
              type="text"
              required
              placeholder="e.g. DPS-DELHI-2026 or ALLEN-KOTA-2026"
              value={instituteCode}
              onChange={(e) => setInstituteCode(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              2. Student Enrollment ID / Roll No *
            </label>
            <input
              className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none"
              type="text"
              required
              placeholder="e.g. 2026-DPS-01 or KOTA-JEE-01"
              value={enrollmentId}
              onChange={(e) => setEnrollmentId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Access Password / PIN
            </label>
            <PasswordInput
              className="rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none"
              placeholder="••••••••"
              required
              value={instPassword}
              onChange={(e) => setInstPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:scale-[1.01] cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? 'Accessing Portal…' : 'Access Institutional AIETS →'}
          </button>
        </form>
      )}

      {/* MODE 2: REGISTERED MOBILE NUMBER */}
      {loginMode === 'mobile' && (
        <form onSubmit={onMobileSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Registered Mobile Number *
            </label>
            <input
              className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none"
              type="tel"
              required
              placeholder="e.g. +91 98765 43210"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Account Password
            </label>
            <PasswordInput
              className="rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none"
              placeholder="••••••••"
              required
              value={mobilePassword}
              onChange={(e) => setMobilePassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:scale-[1.01] cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? 'Signing in…' : 'Log in via Mobile Number →'}
          </button>
        </form>
      )}

      {/* MODE 3: EMAIL LOGIN */}
      {loginMode === 'email' && (
        <form onSubmit={onEmailSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Email Address *
            </label>
            <input
              className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none"
              type="email"
              placeholder="student@dps.ac.in"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
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
              className="rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none"
              placeholder="••••••••"
              required
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:scale-[1.01] cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? 'Signing in…' : 'Log in with Email →'}
          </button>
        </form>
      )}

      {/* QUICK MULTI-INSTITUTION DEMO STUDENT SELECTOR */}
      <div className="mt-6 border-t border-slate-800 pt-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            ⚡ Quick Sample Student Login (Test Auto-Assignment)
          </span>
          <span className="text-[10px] text-cyan-400 font-bold">1-Click</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleQuickStudentLogin({ name: 'Aarav Sharma', school: 'DPS Delhi', code: 'DPS-DELHI-2026', roll: '2026-DPS-01', phone: '9876543210' })}
            className="p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-center transition cursor-pointer"
          >
            <p className="font-extrabold text-xs">Aarav Sharma</p>
            <p className="text-[9px] text-slate-400 mt-0.5">DPS Delhi • JEE</p>
          </button>

          <button
            type="button"
            onClick={() => handleQuickStudentLogin({ name: 'Vikramaditya', school: 'Allen Kota', code: 'ALLEN-KOTA-2026', roll: 'KOTA-JEE-01', phone: '9123456789' })}
            className="p-2.5 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-center transition cursor-pointer"
          >
            <p className="font-extrabold text-xs">Vikramaditya</p>
            <p className="text-[9px] text-slate-400 mt-0.5">Allen Kota • JEE</p>
          </button>

          <button
            type="button"
            onClick={() => handleQuickStudentLogin({ name: 'Ishita Kapoor', school: "St. Xavier's", code: 'XAVIERS-2026', roll: 'SXS-2026-11', phone: '9988776655' })}
            className="p-2.5 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-center transition cursor-pointer"
          >
            <p className="font-extrabold text-xs">Ishita Kapoor</p>
            <p className="text-[9px] text-slate-400 mt-0.5">St. Xavier's • NEET</p>
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-3 border-t border-[#2A354A]/60 pt-4 text-center">
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

