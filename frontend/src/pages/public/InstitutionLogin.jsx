import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Building2,
  Users,
  BarChart3,
  FileText,
  Mail,
  ArrowRight,
  LogOut,
} from 'lucide-react';
import { Spinner, PasswordInput } from '../../components/ui.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { getPartnerSchools, findPartnerSchool } from '../../lib/schoolStore.js';
import { institutionDashboardService } from '../../lib/services.js';
import { tokenStore } from '../../lib/api.js';

export default function InstitutionLogin() {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [institutionId, setInstitutionId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [activeSession, setActiveSession] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('edvedum_active_institution') || localStorage.getItem('edvedum_active_school');
      if (saved) {
        setActiveSession(JSON.parse(saved));
      }
    } catch (_) {}
  }, []);

  const handleSignOut = () => {
    tokenStore.clear();
    setActiveSession(null);
    toast.info('Signed out of institution session.');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const input = institutionId.trim().toLowerCase();
    const pass = password.trim();

    if (!input || !pass) {
      setError('Please enter your Institution ID / Email and password.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // 1. Attempt backend institution admin login
      try {
        const res = await institutionDashboardService.login({
          email: input,
          identifier: input,
          institutionId: input,
          code: input,
          schoolId: input,
          password: pass,
        });

        if (res?.token) {
          const instObj = res.institution || {
            id: res.user?.institution_id || 1,
            name: res.user?.institution_name || 'Partner Institution',
            schoolId: input.toUpperCase(),
            email: res.user?.email || input,
          };

          tokenStore.set(res.token);
          localStorage.setItem('edvedum_active_institution', JSON.stringify(instObj));
          localStorage.setItem('edvedum_active_school', JSON.stringify(instObj));

          toast.success(`Welcome back, ${instObj.name}!`);
          navigate('/institution/dashboard', { replace: true });
          return;
        }
      } catch (backendErr) {
        if (backendErr?.status === 401 || backendErr?.status === 400) {
          throw new Error(backendErr.message || 'Invalid Institution ID or Password. Please check your credentials.');
        }
      }

      // 2. Check multi-tenant institution store fallback
      const matched = findPartnerSchool(input, pass);

      if (matched) {
        tokenStore.set(`token_inst_${matched.schoolId}`);
        localStorage.setItem('edvedum_active_institution', JSON.stringify(matched));
        localStorage.setItem('edvedum_active_school', JSON.stringify(matched));

        toast.success(`Welcome back, ${matched.name}!`);
        navigate('/institution/dashboard', { state: { loggedInSchool: matched }, replace: true });
        return;
      }

      // 3. Fallback: Standard auth login
      const user = await login({ email: input, password: pass });
      toast.success(`Welcome back, ${user.name.split(' ')[0]}!`);
      const dest = location.state?.from?.pathname;
      navigate(dest && dest.startsWith('/institution') ? dest : '/institution/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid Institution ID or Password. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-140px)] bg-gradient-to-br from-[#061224] via-[#0B1E38] to-[#040C1A] text-slate-100 selection:bg-[#2563eb] selection:text-white flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Soft Ambient Depth Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-3/5 h-full bg-[radial-gradient(ellipse_at_top_left,rgba(14,165,233,0.06)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-3/5 h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
      </div>

      {/* Container */}
      <div className="relative z-10 w-full max-w-[1280px] grid lg:grid-cols-12 gap-8 items-center">
        {/* LEFT COLUMN: VALUE & BRANDING */}
        <div className="lg:col-span-7 space-y-6 lg:pr-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-extrabold tracking-wider text-cyan-300 uppercase">
              AIETS Institution Portal
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]">
            Manage Students, Tests & Performance from One Secure Dashboard
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            Access your institution’s student roster, batches, AIETS test series assignments, performance analytics, reports, eBooks, payments, and GST invoices.
          </p>

          <div className="space-y-3.5 pt-2">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#071126] border border-slate-800/80">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white">Centralized Student & Batch Management</h4>
                <p className="text-xs text-slate-400">Bulk upload student rosters via CSV, issue license credentials, and assign test series.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#071126] border border-slate-800/80">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white">Complete Test & Performance Analytics</h4>
                <p className="text-xs text-slate-400">Track student completion rates, average scores, speed, accuracy, and topic mastery.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#071126] border border-slate-800/80">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white">Downloadable Institutional Reports</h4>
                <p className="text-xs text-slate-400">Export student scorecards, batch summary reports, and All India rank benchmarking data.</p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/for-schools#enquiry-form"
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-white transition"
            >
              <span>Not a partner yet? Request a Demo</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: LOGIN OR ACTIVE SESSION CARD */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-[460px] rounded-[24px] border border-[#38BDF8]/25 bg-gradient-to-b from-[#0F213D]/95 via-[#0B1A32]/98 to-[#071224]/98 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.45)] text-white p-7 sm:p-9 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-80" />

            {/* IF ACTIVE SESSION EXISTS: DISPLAY ACTIVE SESSION PANEL */}
            {activeSession ? (
              <div className="space-y-6 text-left">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-extrabold text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ACTIVE INSTITUTION SESSION FOUND</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    {activeSession.name}
                  </h2>
                  <p className="text-xs text-slate-300">
                    Logged in as Institutional Administrator • <span className="font-mono text-cyan-300 font-bold">ID: {activeSession.schoolId || activeSession.id}</span>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Contact Email:</span>
                    <strong className="text-white font-mono">{activeSession.email || 'admin@institution.edu'}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Assigned Licenses:</span>
                    <strong className="text-emerald-400">{activeSession.totalLicenses || 200} Enrolled Seats</strong>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => navigate('/institution/dashboard', { replace: true })}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Continue to Institution Portal</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="w-full rounded-xl border border-rose-500/30 bg-rose-500/10 py-3 text-xs font-bold text-rose-300 hover:bg-rose-500/20 transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out & Switch Account</span>
                  </button>
                </div>
              </div>
            ) : (
              /* OTHERWISE: DISPLAY NORMAL LOGIN FORM */
              <>
                <div className="space-y-1.5">
                  <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] text-white flex items-center justify-center shadow-md mb-3">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    Institution Portal Login
                  </h2>
                  <p className="text-xs text-slate-300">
                    For authorized institutional partners
                  </p>
                </div>

                {error && (
                  <div className="rounded-2xl border border-rose-500/30 bg-rose-500/15 p-3.5 text-xs font-semibold text-rose-200 text-center animate-in fade-in">
                    {error}
                  </div>
                )}

                <form onSubmit={onSubmit} autoComplete="off" className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-200 mb-1.5" htmlFor="inst-id">
                      Institution ID or Registered Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400/80" />
                      <input
                        id="inst-id"
                        name="institution_login_id_no_fill"
                        type="text"
                        required
                        autoComplete="off"
                        placeholder="Enter institution ID or registered email"
                        value={institutionId}
                        onChange={(e) => setInstitutionId(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-3 pl-10 pr-4 text-xs sm:text-sm text-white placeholder:text-slate-400 hover:border-cyan-400/40 focus:border-[#38BDF8] focus:ring-4 focus:ring-[#38BDF8]/15 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-200" htmlFor="inst-password">
                        Admin Password
                      </label>
                      <Link to="/forgot-password" className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 hover:underline">
                        Forgot Password?
                      </Link>
                    </div>
                    <PasswordInput
                      id="inst-password"
                      name="institution_login_pass_no_fill"
                      required
                      autoComplete="new-password"
                      className="rounded-xl border border-white/10 bg-white/[0.05] py-3 pl-10 pr-4 text-xs sm:text-sm text-white placeholder:text-slate-400 hover:border-cyan-400/40 focus:border-[#38BDF8] focus:ring-4 focus:ring-[#38BDF8]/15 focus:outline-none transition"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-white/10 text-cyan-400 focus:ring-cyan-400/30"
                      />
                      <span>Remember me</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-xl bg-gradient-to-r from-[#0284C7] via-[#2563EB] to-[#7C3AED] py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_6px_16px_rgba(37,99,235,0.20)] hover:-translate-y-[1.5px] hover:shadow-[0_8px_25px_rgba(37,99,235,0.30)] transition cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Spinner className="h-4 w-4 text-white" />
                        <span>Accessing Portal...</span>
                      </span>
                    ) : (
                      'Access Institution Dashboard →'
                    )}
                  </button>
                </form>

                <div className="pt-4 border-t border-white/10 space-y-2 text-center text-xs text-slate-300">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Protected 256-bit Encrypted Sign-In</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Need account assistance? Email{' '}
                    <a href="mailto:support@edvedum.com" className="text-cyan-400 font-medium hover:underline">
                      support@edvedum.com
                    </a>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
