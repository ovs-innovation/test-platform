import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Building2,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  School,
  RefreshCw,
  ExternalLink,
  Check,
  X,
} from 'lucide-react';
import AuthShell from '../../components/AuthShell.jsx';
import SelectInstituteModal from '../../components/public/SelectInstituteModal.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { authService } from '../../lib/services.js';

export default function StudentLogin() {
  const { user, loading: authLoading, studentLogin, sendLoginOtp, verifyLoginOtp, getDashboardRoute } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { code: routeCode, instituteCode: routeInstCode } = useParams();
  const [searchParams] = useSearchParams();

  // Read institute from route path or query param
  const activeCodeParam = routeCode || routeInstCode || searchParams.get('institute') || searchParams.get('code') || searchParams.get('inst');

  // Institution State
  const [institution, setInstitution] = useState(null);
  const [loadingInstitution, setLoadingInstitution] = useState(Boolean(activeCodeParam));
  const [institutionNotFound, setInstitutionNotFound] = useState(false);
  const [allInstitutions, setAllInstitutions] = useState([]);
  const [institutionsSearch, setInstitutionsSearch] = useState('');

  // Dropdown & Selection State for Institute Tab
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedInst, setSelectedInst] = useState(null);
  const [isCustomCode, setIsCustomCode] = useState(false);
  const [isInstituteModalOpen, setIsInstituteModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Mode can be: 'id_password' (default), 'email_otp', 'mobile'
  const [loginMode, setLoginMode] = useState('id_password');

  // ID & Password Fields
  const [studentIdentifier, setStudentIdentifier] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
  const [emailOtpCode, setEmailOtpCode] = useState('');
  const [emailOtpFocused, setEmailOtpFocused] = useState(false);
  const [emailTimer, setEmailTimer] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [devOtp, setDevOtp] = useState('');

  const emailOtpInputRef = useRef(null);

  // Load Institution Data if activeCodeParam is present
  useEffect(() => {
    let isMounted = true;
    if (activeCodeParam) {
      setLoadingInstitution(true);
      setInstitutionNotFound(false);
      setError('');
      authService
        .getPublicInstitution(activeCodeParam)
        .then((res) => {
          if (isMounted && res?.institution) {
            setInstitution(res.institution);
            setInstituteCode(res.institution.code);
            setLoginMode('id_password');
            document.title = `${res.institution.name} — Student Login Portal | EDVEDUM`;
          }
        })
        .catch((err) => {
          if (isMounted) {
            console.warn('Institution lookup failed:', err);
            setInstitutionNotFound(true);
            setInstitution(null);
          }
        })
        .finally(() => {
          if (isMounted) setLoadingInstitution(false);
        });
    } else {
      setInstitution(null);
      setLoadingInstitution(false);
      setInstitutionNotFound(false);
      document.title = 'Student Login | EDVEDUM Academy';
    }
    return () => {
      isMounted = false;
    };
  }, [activeCodeParam]);

  // Load all public partner institutions for quick switcher/explorer
  useEffect(() => {
    authService
      .getPublicInstitutions()
      .then((res) => {
        if (res?.institutions) {
          setAllInstitutions(res.institutions);
        }
      })
      .catch((err) => console.warn('Could not fetch institutions list:', err));
  }, []);

  // Sync selectedInst when instituteCode or allInstitutions change
  useEffect(() => {
    if (instituteCode && allInstitutions.length > 0) {
      const match = allInstitutions.find((i) => i.code?.toUpperCase() === instituteCode.toUpperCase());
      if (match) {
        setSelectedInst(match);
      }
    }
  }, [instituteCode, allInstitutions]);

  // Click outside listener for the dropdown menu
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 50);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dropdownOpen]);

  const getDestination = (role) => {
    const sParams = new URLSearchParams(location.search);
    const returnUrl = sParams.get('returnUrl');
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

  // Auto-focus single OTP input when Email OTP is sent
  useEffect(() => {
    if (emailOtpSent) {
      const timer = setTimeout(() => {
        emailOtpInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [emailOtpSent]);

  // Tab switch cleanup
  const handleSwitchTab = (mode) => {
    setLoginMode(mode);
    setError('');
    setShowPassword(false);
    setEmailOtpSent(false);
    setEmailOtpCode('');
    setEmailOtpFocused(false);
    setEmailTimer(0);
    setMobileOtpSent(false);
    setMobileOtpCode('');
    setMobileTimer(0);
    setDropdownOpen(false);
  };

  // Handle ID & Password Login
  const handleIdPasswordSubmit = async (e) => {
    e?.preventDefault();
    const cleanId = studentIdentifier.trim();
    if (!cleanId) {
      setError(institution ? 'Please enter your Student Roll Number or Enrollment ID.' : 'Please enter your Student ID.');
      return;
    }
    if (!institution && cleanId.includes('@')) {
      setError('Please enter your Student ID (e.g. EDV26-10023). To log in using your registered email, please switch to the Email OTP tab above.');
      return;
    }
    if (!studentPassword) {
      setError('Please enter your account password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const payload = institution
        ? {
            instituteCode: institution.code,
            enrollmentId: cleanId,
            studentId: cleanId,
            identifier: cleanId,
            password: studentPassword,
          }
        : {
            identifier: cleanId,
            studentId: cleanId,
            password: studentPassword,
          };

      const u = await studentLogin(payload);
      toast.success(institution ? `Welcome to ${institution.name}, ${u?.name || 'Student'}!` : `Welcome back, ${u?.name || 'Student'}!`);
      navigate(getDestination(u?.role), { replace: true });
    } catch (err) {
      setError(err.message || (institution ? `Invalid credentials for ${institution.name}. Please verify your Roll Number and password.` : 'Invalid Student ID or password. Please verify your credentials.'));
    } finally {
      setLoading(false);
    }
  };

  const EMAIL_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Handle Send Email OTP
  const handleSendEmailOtp = async (e) => {
    e?.preventDefault();
    const cleanEmail = emailOtp.trim().toLowerCase();

    if (!cleanEmail) {
      setError('Please enter your registered Email address.');
      return;
    }
    if (/^[._%+-]/.test(cleanEmail)) {
      setError('Email address cannot start with special characters like ., -, _, or +.');
      return;
    }
    if (/^\d+$/.test(cleanEmail)) {
      setError('It looks like you entered a numeric code or phone number. Please switch to Mobile OTP or Roll No tab.');
      return;
    }
    if (!EMAIL_REGEX.test(cleanEmail)) {
      setError('Please enter a valid Email address format (e.g. student@gmail.com).');
      return;
    }
    setLoading(true);
    setError('');
    try {
      if (sendLoginOtp) {
        const res = await sendLoginOtp({ email: cleanEmail, identifier: cleanEmail, channel: 'email' });
        if (res?.devOtp) {
          setDevOtp(res.devOtp);
          setEmailOtpCode(res.devOtp);
        }
      }
      setEmailOtpSent(true);
      setEmailTimer(60);
      toast.success(`Verification OTP sent to ${cleanEmail}`);
    } catch (err) {
      setError(err.message || 'Failed to send OTP code. Please verify your email.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify Email OTP Submit
  const handleVerifyEmailOtpSubmit = async (e) => {
    e?.preventDefault();
    if (emailTimer <= 0) {
      setError('Verification OTP has expired. Please click "Resend OTP" to request a new code.');
      return;
    }
    const fullCode = emailOtpCode.trim();
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
        u = await studentLogin({ email: cleanEmail, otp: fullCode, instituteCode: institution?.code });
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
      let otpMsg = `OTP sent to +91 ${cleanPhone}`;
      if (sendLoginOtp) {
        const res = await sendLoginOtp({ mobile: cleanPhone, phone: cleanPhone, identifier: cleanPhone, channel: 'sms' });
        if (res?.message) {
          otpMsg = res.message;
        }
        if (res?.devOtp) {
          setDevOtp(res.devOtp);
          setMobileOtpCode(res.devOtp);
        }
      }
      setMobileOtpSent(true);
      setMobileTimer(60);
      toast.success(otpMsg);
    } catch (err) {
      setError(err.message || 'Failed to send OTP to mobile number.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify Mobile OTP Submit
  const handleVerifyMobileOtpSubmit = async (e) => {
    e?.preventDefault();
    if (mobileTimer <= 0) {
      setError('Verification OTP has expired. Please click "Resend OTP" to request a new code.');
      return;
    }
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
        u = await studentLogin({ mobile: cleanPhone, phone: cleanPhone, otp: cleanCode, instituteCode: institution?.code });
      }
      toast.success('Mobile verification successful!');
      navigate(getDestination(u?.role), { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid OTP code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle General Institute Login (Institute Code + Enrollment ID + Mandatory Password)
  const onInstituteSubmit = async (e) => {
    e?.preventDefault();
    const finalCode = (instituteCode || selectedInst?.code || '').trim().toUpperCase();
    const finalEnrollment = enrollmentId.trim();
    const cleanPassword = (studentPassword || '').trim();

    if (!finalCode) {
      setError('Please select your School / Coaching Institute or enter an Institute Code.');
      return;
    }
    if (!finalEnrollment) {
      setError('Please enter your Student Enrollment ID or Roll Number.');
      return;
    }
    if (!cleanPassword) {
      setError('Password is required. Please enter your account password.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const u = await studentLogin({
        instituteCode: finalCode,
        enrollmentId: finalEnrollment,
        password: cleanPassword,
      });
      toast.success(
        selectedInst ? `Welcome to ${selectedInst.name}, ${u?.name || 'Student'}!` : 'Institutional Access Granted!'
      );
      navigate(getDestination(u?.role), { replace: true });
    } catch (err) {
      setError(err.message || 'Institutional login failed. Check Institute Code, Roll Number or Password.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectInstitution = (inst) => {
    if (!inst) return;
    setSelectedInst(inst);
    setInstituteCode(inst.code);
    setIsCustomCode(false);
    setDropdownOpen(false);
    setInstitutionsSearch('');
    if (error) setError('');
  };

  const handleSelectCustomCode = () => {
    setIsCustomCode(true);
    setDropdownOpen(false);
    setInstitutionsSearch('');
  };

  // Filtered institutions for search picker
  const filteredInstitutions = allInstitutions.filter(
    (inst) =>
      inst.name?.toLowerCase().includes(institutionsSearch.toLowerCase()) ||
      inst.code?.toLowerCase().includes(institutionsSearch.toLowerCase()) ||
      inst.city?.toLowerCase().includes(institutionsSearch.toLowerCase())
  );

  // Institution Loading Skeleton View
  if (loadingInstitution) {
    return (
      <AuthShell title="Loading Portal" subtitle="Connecting to institution assessment server...">
        <div className="py-12 flex flex-col items-center justify-center space-y-4">
          <div className="h-10 w-10 border-4 border-[#0D6EFD] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-slate-300">Loading dedicated student portal...</p>
        </div>
      </AuthShell>
    );
  }

  // Institution Not Found State
  if (institutionNotFound && activeCodeParam) {
    return (
      <AuthShell title="Portal Not Found" subtitle={`We couldn't find an active institute matching "${activeCodeParam}".`}>
        <div className="space-y-5">
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-center space-y-2">
            <span className="text-3xl block">🏫</span>
            <h2 className="text-base font-bold text-white">Institute Code Not Recognized</h2>
            <p className="text-xs text-amber-200/90 leading-relaxed max-w-sm mx-auto">
              Please check the institute code in your link, or select your partner institution from the list below.
            </p>
          </div>

          {/* Quick Select Partner Institute */}
          <div className="space-y-2.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Select Your Partner Institute
            </label>
            <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
              {allInstitutions.map((inst) => (
                <Link
                  key={inst.id}
                  to={`/institute/${inst.code}/login`}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-[#070c18] hover:border-blue-500/50 hover:bg-slate-800/60 transition group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {inst.logo_url ? (
                      <img src={inst.logo_url} alt={inst.name} className="h-7 w-7 object-contain rounded-lg bg-white/5 p-0.5" />
                    ) : (
                      <div
                        className="h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs text-white"
                        style={{ backgroundColor: inst.accent_color || '#4f46e5' }}
                      >
                        {inst.logo_badge || inst.name.slice(0, 3)}
                      </div>
                    )}
                    <div className="text-left">
                      <p className="text-xs font-bold text-white group-hover:text-[#00F0FF] transition-colors">{inst.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{inst.code} {inst.city ? `· ${inst.city}` : ''}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-[#00F0FF] group-hover:translate-x-0.5 transition" />
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-center">
            <Link
              to="/student-login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00F0FF] hover:underline"
            >
              <span>← Go to General EDVEDUM Login</span>
            </Link>
          </div>
        </div>
      </AuthShell>
    );
  }

  // Effective active institution: route institution
  const activeInstitution = institution;
  const pageTitle = activeInstitution ? `${activeInstitution.name} Student Login` : 'Student Login';
  const pageSubtitle = activeInstitution
    ? `Sign in with your enrollment credentials to access exams and mocks for ${activeInstitution.name}.`
    : 'Sign in to your account to access tests, eBooks, and performance reports.';

  return (
    <AuthShell
      title={pageTitle}
      subtitle={pageSubtitle}
      institution={activeInstitution}
    >
      {/* INSTITUTION DEDICATED BADGE & BANNER (when institution is active) */}
      {institution && (
        <div className="mb-5 rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900/90 via-[#0b1530] to-slate-900/90 p-3.5 shadow-lg flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {institution.logo_url ? (
              <img
                src={institution.logo_url}
                alt={institution.name}
                className="h-10 w-10 object-contain rounded-xl bg-white/10 p-1 border border-white/15 shadow-sm"
              />
            ) : (
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md"
                style={{ backgroundColor: institution.accent_color || '#4f46e5' }}
              >
                {institution.logo_badge || institution.name.slice(0, 3).toUpperCase()}
              </div>
            )}
            <div className="text-left leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">{institution.name}</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  VERIFIED
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                Code: <strong className="text-slate-200">{institution.code}</strong> {institution.city ? `· ${institution.city}` : ''}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsInstituteModalOpen(true)}
            className="text-[11px] font-semibold text-slate-400 hover:text-cyan-300 transition-colors shrink-0 underline cursor-pointer"
            title="Switch to another institute"
          >
            Switch Institute
          </button>
        </div>
      )}

      {/* Login Mode Switcher - shown ONLY for Direct Students. Institute students login directly with Roll No & Password */}
      {!institution && (
        <div className="grid grid-cols-3 p-1 bg-[#050a18]/80 border border-[#1e293b] rounded-2xl mb-6 gap-1">
          <button
            type="button"
            className={`py-2.5 px-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer truncate flex items-center justify-center gap-1.5 ${
              loginMode === 'id_password'
                ? 'bg-gradient-to-r from-[#0D6EFD] to-[#00F0FF] text-white font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
            onClick={() => handleSwitchTab('id_password')}
          >
            <span>🔑</span>
            <span>ID & Password</span>
          </button>
          <button
            type="button"
            className={`py-2.5 px-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer truncate flex items-center justify-center gap-1.5 ${
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
            className={`py-2.5 px-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer truncate flex items-center justify-center gap-1.5 ${
              loginMode === 'mobile'
                ? 'bg-gradient-to-r from-[#0D6EFD] to-[#00F0FF] text-white font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
            onClick={() => handleSwitchTab('mobile')}
          >
            <span>📱</span>
            <span>Mobile OTP</span>
          </button>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-semibold text-red-400">
          {error}
        </div>
      )}

      {/* MODE 1: ID & PASSWORD LOGIN (For institution students, this is the only form) */}
      {(institution || loginMode === 'id_password') && (
        <form onSubmit={handleIdPasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              {institution ? 'Roll No / Enrollment ID *' : 'Student ID *'}
            </label>
            <input
              className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none font-mono uppercase transition-colors"
              type="text"
              required
              placeholder={institution ? `e.g. ${institution.code}-001 or 001` : 'e.g. EDV26-10023'}
              value={studentIdentifier}
              onChange={(e) => {
                setStudentIdentifier(e.target.value.toUpperCase());
                if (error) setError('');
              }}
            />
            <p className="mt-1 text-[11px] text-slate-400">
              {institution
                ? `Enter your official Roll Number or Enrollment ID registered with ${institution.name}.`
                : 'Enter the unique Student ID provided by your institute administrator or sent to your email.'}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Password *
              </label>
              <Link to="/forgot-password" className="text-[11px] text-[#00F0FF] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 pr-10 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none transition-colors"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter your password"
                value={studentPassword}
                onChange={(e) => {
                  setStudentPassword(e.target.value);
                  if (error) setError('');
                }}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {institution ? (
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-3 text-xs text-blue-300 flex items-start gap-2">
              <span className="text-sm">🛡️</span>
              <span>
                Authorized assessment session for <strong>{institution.name}</strong> students. Your institute code is applied automatically.
              </span>
            </div>
          ) : (
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-3 text-xs text-blue-300 flex items-start gap-2">
              <span className="text-sm">💡</span>
              <span>
                Don't have your Student ID or password? Check your registered email inbox or ask your administrator to email your credentials.
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !studentIdentifier.trim() || !studentPassword}
            className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating…' : institution ? `Sign In to ${institution.name} →` : 'Log In with Student ID →'}
          </button>
        </form>
      )}

      {/* MODE 2: EMAIL OTP LOGIN (Direct Students Only) */}
      {!institution && loginMode === 'email_otp' && (
        <div className="space-y-4">
          {!emailOtpSent ? (
            <form onSubmit={handleSendEmailOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Gmail / Registered Email Address *
                </label>
                <input
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-colors ${
                    emailOtp.trim() && !EMAIL_REGEX.test(emailOtp.trim().toLowerCase())
                      ? 'border-amber-500/60 bg-[#0c101d] focus:border-amber-400'
                      : 'border-[#2A354A] bg-[#070c18] focus:border-[#00F0FF]'
                  }`}
                  type="email"
                  required
                  placeholder="student@gmail.com"
                  value={emailOtp}
                  onChange={(e) => {
                    const sanitized = e.target.value.trimStart().replace(/^[._%+-]+/, '');
                    setEmailOtp(sanitized);
                    if (error) setError('');
                  }}
                />
                {emailOtp.trim().length > 0 && !EMAIL_REGEX.test(emailOtp.trim().toLowerCase()) && (
                  <p className="mt-1.5 text-xs text-rose-400 font-medium flex items-center gap-1">
                    <span>⚠️</span>
                    <span>Please enter a valid email address format (e.g. student@gmail.com).</span>
                  </p>
                )}
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
                    setEmailOtpCode('');
                    setDevOtp('');
                    setError('');
                  }}
                  className="text-[#00F0FF] hover:underline font-bold cursor-pointer"
                >
                  Change Email
                </button>
              </div>

              {devOtp && (
                <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-center">
                  <span className="text-[11px] font-semibold text-cyan-300 uppercase tracking-wider">Testing OTP (Dev Mode):</span>
                  <p className="font-mono text-xl font-bold tracking-widest text-[#00F0FF] mt-0.5">{devOtp}</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Enter 6-Digit Verification Code *
                </label>

                <div
                  className="relative w-full my-3 cursor-text"
                  onClick={() => emailOtpInputRef.current?.focus()}
                >
                  <input
                    ref={emailOtpInputRef}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={emailOtpCode}
                    onChange={(e) => {
                      const cleanVal = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setEmailOtpCode(cleanVal);
                    }}
                    onFocus={() => setEmailOtpFocused(true)}
                    onBlur={() => setEmailOtpFocused(false)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-text z-10 font-mono"
                  />

                  <div className="grid grid-cols-6 gap-2 sm:gap-3 pointer-events-none">
                    {Array.from({ length: 6 }).map((_, idx) => {
                      const digit = emailOtpCode[idx] || '';
                      const activeIndex = Math.min(emailOtpCode.length, 5);
                      const isActive = emailOtpFocused && idx === activeIndex;

                      return (
                        <div
                          key={idx}
                          className={`w-full h-12 sm:h-14 rounded-xl border flex items-center justify-center text-lg sm:text-xl font-bold text-[#00F0FF] font-mono transition-all ${
                            isActive
                              ? 'border-[#00F0FF] bg-[#00F0FF]/10 shadow-[0_0_15px_rgba(0,240,255,0.3)] ring-1 ring-[#00F0FF]'
                              : 'border-[#2A354A] bg-[#070c18]'
                          }`}
                        >
                          {digit}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs pt-1">
                {emailTimer > 0 ? (
                  <span className="text-slate-400 font-mono">
                    Resend OTP in <strong>{emailTimer}s</strong>
                  </span>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-amber-400 text-[11px] font-semibold flex items-center gap-1">
                      <span>⏰</span>
                      <span>OTP expired. Request a new code.</span>
                    </span>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleSendEmailOtp}
                      className="text-[#00F0FF] hover:underline font-bold cursor-pointer disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || emailOtpCode.trim().length < 6}
                className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? 'Verifying OTP…' : 'Verify OTP & Log In →'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* MODE 3: MOBILE NUMBER & OTP (Direct Students Only) */}
      {!institution && loginMode === 'mobile' && (
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
                  onClick={() => {
                    setMobileOtpSent(false);
                    setDevOtp('');
                  }}
                  className="text-[#00F0FF] hover:underline font-bold cursor-pointer"
                >
                  Change
                </button>
              </div>

              {devOtp && (
                <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-center">
                  <span className="text-[11px] font-semibold text-cyan-300 uppercase tracking-wider">Testing OTP (Dev Mode):</span>
                  <p className="font-mono text-xl font-bold tracking-widest text-[#00F0FF] mt-0.5">{devOtp}</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Enter 4 or 6 Digit Mobile OTP *
                </label>
                <input
                  className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 text-center text-lg font-bold tracking-widest text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none font-mono transition-colors"
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
                  <div className="flex items-center justify-between w-full">
                    <span className="text-amber-400 text-[11px] font-semibold flex items-center gap-1">
                      <span>⏰</span>
                      <span>OTP expired</span>
                    </span>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleSendMobileOtp}
                      className="text-[#00F0FF] hover:underline font-bold cursor-pointer disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  </div>
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

      {/* MODE 4: INSTITUTE ACCESS (Handled via Dedicated Portal / Modal) */}
      {!institution && false && (
        <form onSubmit={onInstituteSubmit} className="space-y-4">
          {/* Institute Selection Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                School / Coaching Institute *
              </label>
              {!isCustomCode ? (
                <button
                  type="button"
                  onClick={handleSelectCustomCode}
                  className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Enter Code Manually →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsCustomCode(false)}
                  className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  ← Choose from Dropdown
                </button>
              )}
            </div>

            {!isCustomCode ? (
              <>
                {/* Modern Dropdown Trigger Button */}
                <button
                  type="button"
                  id="institute-select-dropdown"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDropdownOpen((prev) => !prev);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all text-left cursor-pointer ${
                    dropdownOpen
                      ? 'border-cyan-400 ring-2 ring-cyan-500/20 bg-[#0a1128]'
                      : 'border-[#2A354A] bg-[#070c18] hover:border-cyan-500/50 hover:bg-[#070e24]/70'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    {selectedInst ? (
                      <>
                        {selectedInst.logo_url ? (
                          <img
                            src={selectedInst.logo_url}
                            alt={selectedInst.name}
                            className="h-8 w-8 object-contain rounded-lg bg-white/10 p-0.5 border border-white/10 shrink-0"
                          />
                        ) : (
                          <div
                            className="h-8 w-8 rounded-lg flex items-center justify-center font-black text-xs text-white shrink-0 shadow-sm"
                            style={{ backgroundColor: selectedInst.accent_color || '#4f46e5' }}
                          >
                            {selectedInst.logo_badge || selectedInst.name.slice(0, 3).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0 truncate">
                          <p className="text-sm font-bold text-white truncate">{selectedInst.name}</p>
                          <div className="flex items-center gap-2 text-[11px]">
                            <span className="font-mono text-cyan-400 font-semibold">{selectedInst.code}</span>
                            {selectedInst.city && <span className="text-slate-400">· {selectedInst.city}</span>}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="h-8 w-8 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 shrink-0">
                          <School className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-300 font-medium">Select your Institute / School...</p>
                          <p className="text-[10px] text-slate-500">Tap to search & pick from registered partners</p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {selectedInst && (
                      <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        Selected
                      </span>
                    )}
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                        dropdownOpen ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Floating Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border border-cyan-500/30 bg-[#09112a] shadow-2xl shadow-cyan-950/70 backdrop-blur-xl p-2 animate-in fade-in zoom-in-95 duration-150"
                  >
                    {/* Search inside Dropdown */}
                    <div className="relative mb-2">
                      <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-cyan-400 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search institute name, code, or city..."
                        value={institutionsSearch}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        onChange={(e) => setInstitutionsSearch(e.target.value)}
                        className="w-full pl-9 pr-8 py-2 bg-[#040816] border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                      {institutionsSearch && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setInstitutionsSearch('');
                          }}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-white text-xs cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* Scrollable Institutes List */}
                    <div className="max-h-56 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                      {filteredInstitutions.length === 0 ? (
                        <div className="py-6 text-center text-xs text-slate-400">
                          <p>No partner institutes found matching "{institutionsSearch}".</p>
                          <button
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleSelectCustomCode();
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleSelectCustomCode();
                            }}
                            className="mt-2 inline-flex items-center gap-1 text-cyan-400 hover:underline font-semibold cursor-pointer"
                          >
                            <span>Enter custom institute code →</span>
                          </button>
                        </div>
                      ) : (
                        filteredInstitutions.map((inst) => {
                          const isCurrent = (selectedInst?.code || instituteCode) === inst.code;
                          return (
                            <button
                              key={inst.id || inst.code}
                              type="button"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleSelectInstitution(inst);
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleSelectInstitution(inst);
                              }}
                              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all group cursor-pointer ${
                                isCurrent
                                  ? 'border-cyan-500/50 bg-cyan-950/50 text-white shadow-sm'
                                  : 'border-transparent hover:border-slate-700 hover:bg-slate-800/60 text-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0 pr-2 pointer-events-none">
                                {inst.logo_url ? (
                                  <img
                                    src={inst.logo_url}
                                    alt={inst.name}
                                    className="h-7 w-7 object-contain rounded-lg bg-white/10 p-0.5 shrink-0"
                                  />
                                ) : (
                                  <div
                                    className="h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs text-white shrink-0"
                                    style={{ backgroundColor: inst.accent_color || '#4f46e5' }}
                                  >
                                    {inst.logo_badge || inst.name.slice(0, 3).toUpperCase()}
                                  </div>
                                )}
                                <div className="min-w-0 truncate">
                                  <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                                    {inst.name}
                                  </p>
                                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                                    <span className="text-cyan-400 font-semibold">{inst.code}</span>
                                    {inst.city ? ` · ${inst.city}` : ''}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 pointer-events-none">
                                {isCurrent && <CheckCircle2 className="h-4 w-4 text-cyan-400" />}
                              </div>
                            </button>
                          );
                        })
                      )}
                    </div>

                    {/* Footer option for custom code */}
                    <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs px-2">
                      <span className="text-[11px] text-slate-400">Can't find your institute?</span>
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSelectCustomCode();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSelectCustomCode();
                        }}
                        className="text-[11px] font-bold text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Enter Code Manually</span>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Custom Code Manual Input */
              <div className="space-y-1.5">
                <input
                  className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none font-mono uppercase transition-colors"
                  type="text"
                  required
                  placeholder="e.g. DRON-2026 or AADA-2026"
                  value={instituteCode}
                  onChange={(e) => {
                    const code = e.target.value.toUpperCase();
                    setInstituteCode(code);
                    const match = allInstitutions.find((i) => i.code?.toUpperCase() === code);
                    setSelectedInst(match || null);
                  }}
                />
                <p className="text-[11px] text-slate-400">
                  Enter the unique code provided by your institute administrator.
                </p>
              </div>
            )}
          </div>

          {/* When an institute is selected, show a sleek verified badge with portal quick link */}
          {selectedInst && !isCustomCode && (
            <div className="rounded-xl border border-cyan-500/25 bg-cyan-950/20 p-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                  VERIFIED PARTNER
                </span>
                <span className="text-slate-300 text-[11px] truncate">
                  Portal for <strong>{selectedInst.name}</strong>
                </span>
              </div>
              <Link
                to={`/institute/${selectedInst.code}/login`}
                className="text-[11px] font-bold text-cyan-400 hover:underline inline-flex items-center gap-1 shrink-0"
              >
                <span>Dedicated View</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          )}

          {/* Student Roll No / Enrollment ID */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Student Enrollment ID / Roll No *
            </label>
            <input
              className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none font-mono uppercase transition-colors"
              type="text"
              required
              placeholder={
                selectedInst
                  ? `e.g. ${selectedInst.code}-001 or 001`
                  : 'e.g. DRON-2026-001 or 001'
              }
              value={enrollmentId}
              onChange={(e) => setEnrollmentId(e.target.value)}
            />
            <p className="mt-1 text-[11px] text-slate-400">
              {selectedInst
                ? `Enter your official roll number or enrollment ID under ${selectedInst.name}.`
                : 'Enter your roll number or enrollment code.'}
            </p>
          </div>

          {/* Mandatory Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Password *
              </label>
              <Link to="/forgot-password" className="text-[11px] text-[#00F0FF] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                className="w-full rounded-xl border border-[#2A354A] bg-[#070c18] px-4 py-2.5 pr-10 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none transition-colors"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter your student password"
                value={studentPassword}
                onChange={(e) => {
                  setStudentPassword(e.target.value);
                  if (error) setError('');
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              Password is required to authenticate your institutional student account.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || (!instituteCode && !selectedInst) || !enrollmentId.trim() || !studentPassword.trim()}
            className="w-full rounded-xl bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading
              ? 'Accessing Portal…'
              : selectedInst
              ? `Sign In to ${selectedInst.name} →`
              : 'Sign In with Institute ID →'}
          </button>
        </form>
      )}

      {/* For Direct Students: Quick link to access partner institute portal */}
      {!institution && (
        <div className="mt-5 p-3 rounded-2xl border border-slate-800/90 bg-[#070e24]/70 flex items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-8 w-8 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <School className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Studying at a partner institute?</p>
              <p className="text-[11px] text-slate-400 truncate">Login via your school or coaching portal</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsInstituteModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/35 border border-indigo-500/40 text-indigo-300 hover:text-white transition text-xs font-bold shrink-0 cursor-pointer"
          >
            Via Institute →
          </button>
        </div>
      )}

      {/* FOOTER & LINKS */}
      <div className="mt-6 space-y-3 border-t border-[#2A354A]/60 pt-4 text-center">
        {institution ? (
          <>
            <p className="text-xs text-slate-300">
              Need help accessing your <strong>{institution.name}</strong> account?{' '}
              <span className="text-slate-400 block sm:inline mt-0.5">Please contact your institute teacher or center administrator.</span>
            </p>
            <div className="pt-1 flex items-center justify-center gap-4 text-xs">
              <button
                type="button"
                onClick={() => setIsInstituteModalOpen(true)}
                className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer"
              >
                Switch Institute
              </button>
              <span className="text-slate-600">•</span>
              <Link to="/student-login" className="font-semibold text-[#00F0FF] hover:underline flex items-center gap-1">
                <span>Direct Student Login →</span>
              </Link>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* Select Institute Modal */}
      <SelectInstituteModal
        isOpen={isInstituteModalOpen}
        onClose={() => setIsInstituteModalOpen(false)}
      />
    </AuthShell>
  );
}
