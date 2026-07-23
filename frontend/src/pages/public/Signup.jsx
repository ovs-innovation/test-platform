import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '../../components/AuthShell.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function Signup() {
  const { register, sendSignupOtp } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', phone: '', class: '', target_exam: '' });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [sentMessage, setSentMessage] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Send OTP to Email for registration
  const onSendOtp = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.class || !form.target_exam) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError('');
    setDevOtp('');
    try {
      const res = await sendSignupOtp({ email: form.email, phone: form.phone });
      setOtpSent(true);
      const msg = res?.message || 'Verification OTP code sent to your email!';
      setSentMessage(msg);
      toast.success(msg);
      if (res?.devOtp && !res?.emailSent) {
        setDevOtp(res.devOtp);
      }
    } catch (err) {
      setError(err.message || 'Failed to send verification OTP');
    } finally {
      setLoading(false);
    }
  };

  // Complete registration with OTP
  const onVerifyAndRegister = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError('Please enter the 6-digit OTP sent to your email.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await register({ ...form, otp });
      toast.success('Account created and verified successfully!');
      navigate('/free-mock', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed. Invalid or expired OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Create Student Account" subtitle="Register via Email OTP to access online test series, rank analytics, and step solutions.">
      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-semibold text-red-400">
          {error}
        </div>
      )}

      {!otpSent ? (
        <form onSubmit={onSendOtp} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Full Name
            </label>
            <input
              className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-[#0D6EFD] focus:bg-[#0a1224] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/35"
              required
              placeholder="e.g. John Doe"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                Mobile Number
              </label>
              <input
                className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-[#0D6EFD] focus:bg-[#0a1224] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/35"
                type="tel"
                required
                placeholder="e.g. 9876543210"
                minLength={10}
                maxLength={15}
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Class
              </label>
              <select
                className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-3.5 py-3 text-sm text-slate-100 transition-all duration-200 focus:border-[#0D6EFD] focus:bg-[#0a1224] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/35"
                required
                value={form.class}
                onChange={(e) => setForm((f) => ({ ...f, class: e.target.value }))}
              >
                <option value="">Select class</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
                <option value="Dropper (12th Pass)">Dropper (12th Pass)</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 9">Class 9</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Target Exam
              </label>
              <select
                className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-3.5 py-3 text-sm text-slate-100 transition-all duration-200 focus:border-[#0D6EFD] focus:bg-[#0a1224] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/35"
                required
                value={form.target_exam}
                onChange={(e) => setForm((f) => ({ ...f, target_exam: e.target.value }))}
              >
                <option value="">Select exam</option>
                <option value="JEE">JEE</option>
                <option value="NEET">NEET</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.01] hover:shadow-cyan-500/30 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Sending Verification OTP…' : 'Send Email OTP to Register'}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={onVerifyAndRegister} className="space-y-5">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-400 leading-relaxed">
            {sentMessage || `Verification OTP sent to ${form.email}`}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2.5">
              Enter 6-Digit OTP Code
            </label>
            <input
              className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-3 text-center tracking-widest text-lg font-bold text-white placeholder:text-slate-600 transition-all duration-200 focus:border-[#0D6EFD] focus:bg-[#0a1224] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/35 font-mono"
              type="text"
              required
              placeholder="000000"
              minLength={6}
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

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
            {loading ? 'Creating & Verifying Account…' : 'Verify OTP & Complete Sign up'}
          </button>

          <div className="text-center pt-1">
            <button
              type="button"
              className="text-xs font-semibold text-slate-400 hover:text-[#00F0FF] hover:underline cursor-pointer"
              onClick={() => {
                setOtpSent(false);
                setDevOtp('');
                setOtp('');
                setSentMessage('');
              }}
            >
              ← Edit registration details
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 border-t border-[#2A354A]/60 pt-5 text-center">
        <p className="text-xs sm:text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/student-login" className="font-bold text-[#00F0FF] hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
