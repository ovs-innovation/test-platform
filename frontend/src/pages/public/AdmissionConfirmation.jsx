import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  Printer,
  Copy,
  ArrowLeft,
  User,
  Check,
  Search,
  FileText,
  AlertCircle,
  Clock,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { EDVEDUM_LOGO, EDVEDUM_LOGO_ALT } from '../../data/edvedumContent.js';
import { admissionService } from '../../lib/services.js';
import { Spinner } from '../../components/ui.jsx';

export default function AdmissionConfirmation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const printAreaRef = useRef(null);

  const [data, setData] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [copied, setCopied] = useState(false);

  // Clean up any stale unsubmitted draft keys from legacy sessions
  useEffect(() => {
    try {
      sessionStorage.removeItem('edvedum_admission_draft');
      sessionStorage.removeItem('edvedum_admission_id');
    } catch (e) {}
  }, []);

  // Fetch application from database by application number
  const loadApplication = async (appNo) => {
    if (!appNo || !appNo.trim()) {
      setData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');
      const cleanAppNo = appNo.trim().toUpperCase();
      const sub = await admissionService.getApplication(cleanAppNo);

      if (sub && sub.application_no) {
        const fData = sub.form_data || {};
        const combined = {
          ...fData,
          applicationNo: sub.application_no,
          fullName: sub.student_name || fData.fullName,
          parentName: sub.father_name || fData.parentName,
          studentMobile: sub.contact_number || fData.studentMobile,
          email: sub.email || fData.email,
          courseName: sub.course_name || fData.courseName,
          applicationDate: sub.created_at
            ? new Date(sub.created_at).toISOString().split('T')[0]
            : fData.applicationDate || new Date().toISOString().split('T')[0],
        };
        setData(combined);
        setSubmissionStatus(sub.status || 'pending');
        sessionStorage.setItem('edvedum_submitted_application_no', sub.application_no);
        return;
      } else {
        throw new Error('Application record not found');
      }
    } catch (err) {
      console.warn('API lookup returned error:', err);
      setErrorMessage(`No admission application found with Application Number: "${appNo}". Please verify the number or submit a new admission form.`);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlAppNo = searchParams.get('appNo');
    const sessionSubmittedNo = sessionStorage.getItem('edvedum_submitted_application_no');
    const targetNo = urlAppNo || sessionSubmittedNo;

    if (targetNo && targetNo.trim()) {
      loadApplication(targetNo.trim());
    } else {
      setData(null);
      setLoading(false);
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const clean = searchInput.trim().toUpperCase();
    setSearchParams({ appNo: clean });
    loadApplication(clean);
  };

  const handleCopyId = () => {
    if (data?.applicationNo) {
      navigator.clipboard.writeText(data.applicationNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Render Status Badge
  const renderStatusBadge = () => {
    const st = String(submissionStatus || 'pending').toLowerCase();
    if (st === 'verified' || st === 'admitted') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
          Status: Verified &amp; Approved
        </span>
      );
    }
    if (st === 'rejected') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300">
          <span className="h-2 w-2 rounded-full bg-rose-600" />
          Status: Needs Attention
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300">
        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
        Status: Application Under Verification
      </span>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 gap-3">
        <Spinner size="lg" />
        <p className="text-slate-600 font-bold text-sm tracking-wide">
          Retrieving admission application details...
        </p>
      </div>
    );
  }

  // Not filled yet or not found screen
  if (!data) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 text-center space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-600">
            <FileText className="h-10 w-10 text-amber-600" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              Not Submitted Yet
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              You Haven't Filled the Admission Form Yet
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
              No active or submitted admission application was found for your session. Complete the 2-step online application to apply for enrollment at EDVEDUM Academy.
            </p>
          </div>

          {/* Primary Action Button to Fill the Form */}
          <div className="pt-2">
            <Link
              to="/admission"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-2xl bg-gradient-to-r from-[#002B49] via-[#083e66] to-[#002B49] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#002B49]/20 hover:from-[#002038] hover:to-[#0b4d7c] transition active:scale-[0.99] border border-[#C5A059]/40"
            >
              <Sparkles className="h-4 w-4 text-[#C5A059]" />
              <span>Fill Admission Form Now</span>
            </Link>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5 text-left">
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Secondary Option: Look up with an Application Number */}
          <div className="pt-6 border-t border-slate-100 text-left space-y-3">
            <div>
              <p className="text-xs font-bold text-slate-800">
                Already submitted on another device or offline center?
              </p>
              <p className="text-[11px] text-slate-500">
                Enter your official Application Number below to retrieve and print your submitted form:
              </p>
            </div>

            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="e.g. EDV-2026-34512"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-mono font-bold text-[#002B49] placeholder:text-slate-400 placeholder:font-normal focus:border-[#002B49] focus:bg-white focus:outline-none transition uppercase"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-[#002B49] hover:bg-[#083e66] px-5 py-2.5 text-xs font-bold text-white shadow transition"
              >
                Track
              </button>
            </form>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link
              to="/"
              className="font-semibold text-slate-500 hover:text-slate-800 transition"
            >
              ← Back to Home
            </Link>
            <Link
              to="/admission"
              className="font-bold text-[#002B49] hover:text-[#C5A059] transition"
            >
              New Admission →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 py-8 px-3 sm:px-6 lg:px-8 selection:bg-[#002B49] selection:text-white print:bg-white print:p-0">
      
      {/* PRINT STYLES */}
      <style>{`
        @media print {
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          header, footer, nav, .no-print {
            display: none !important;
          }
          .printable-slip {
            border: 2px solid #002B49 !important;
            box-shadow: none !important;
            padding: 16px !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      <div className="mx-auto max-w-4xl space-y-5">
        
        {/* ACTION BAR (hidden on print) */}
        <div className="no-print bg-white border border-slate-200/80 rounded-2xl shadow-sm p-4 sm:p-5 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Admission Application Logged
                </p>
                <p className="text-sm font-black text-slate-900">
                  Application No: <span className="font-mono text-[#002B49]">{data.applicationNo}</span>
                </p>
              </div>
            </div>

            <div>
              {renderStatusBadge()}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Quick search another application */}
            <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-56">
                <input
                  type="text"
                  placeholder="Check other App No."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full text-xs font-mono font-bold uppercase rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 focus:border-[#002B49] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-slate-100 hover:bg-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition"
              >
                Track
              </button>
            </form>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Link
                to="/my-tests"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-xs font-bold shadow-md shadow-blue-600/20 transition"
              >
                <span>Go to My Tests →</span>
              </Link>

              <button
                type="button"
                onClick={handleCopyId}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                <Copy className="h-3.5 w-3.5 text-blue-600" />
                <span>{copied ? 'Copied!' : 'Copy ID'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-[#002B49] hover:bg-[#001f35] text-white rounded-xl px-5 py-2 text-xs font-bold shadow-md shadow-[#002B49]/20 transition"
              >
                <Printer className="h-3.5 w-3.5 text-[#C5A059]" />
                <span>Print Official Slip</span>
              </button>
            </div>
          </div>
        </div>

        {/* OFFICIAL PRINTABLE ADMISSION SLIP (EXACT 1-TO-1 WITH FORM) */}
        <div
          ref={printAreaRef}
          className="printable-slip bg-white border border-slate-300 shadow-md p-4 sm:p-8"
        >
          {/* Header */}
          <div className="border-b border-slate-300 pb-5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3.5">
              <img src={EDVEDUM_LOGO} alt={EDVEDUM_LOGO_ALT} className="h-14 w-auto object-contain" />
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#002B49] font-serif uppercase">
                  EDVEDUM ACADEMY
                </h1>
                <p className="text-xs font-bold tracking-widest text-[#855D14] uppercase mt-0.5">
                  Official Student Admission &amp; Enrollment Slip • Session 2026–2027
                </p>
                <p className="text-[11px] text-slate-500">
                  EDVEDUM ACADEMY (OPC) PRIVATE LIMITED • edvedum.com • support@edvedum.com
                </p>
              </div>
            </div>
            <div className="text-xs text-slate-600 text-center sm:text-right">
              <span className="font-bold text-[#002B49] uppercase tracking-wider block text-[11px]">Provisional Admission</span>
              <span className="inline-block bg-blue-50 text-[#002B49] px-2.5 py-1 text-xs font-mono font-bold border border-blue-200 mt-1">
                {data.applicationNo}
              </span>
            </div>
          </div>

          {/* Top Bar: Application No., Date, Photo */}
          <div className="border border-slate-300 mb-6 bg-slate-50/50">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-300">
              <div className="p-3">
                <span className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide">Application No.</span>
                <p className="text-sm font-mono font-black text-[#002B49] mt-0.5">{data.applicationNo}</p>
              </div>
              <div className="p-3">
                <span className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide">Application Date</span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">{data.applicationDate}</p>
              </div>
              <div className="p-3 flex items-center justify-between gap-3">
                <div>
                  <span className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide">Student Photo</span>
                  <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">● Photo Verified</span>
                </div>
                <div className="h-16 w-14 border border-slate-300 bg-white flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                  {data.studentPhoto ? (
                    <img src={data.studentPhoto} alt="Student" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-6 w-6 text-slate-400" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5 text-xs">

            {/* 01 STUDENT DETAILS */}
            <div>
              <div className="bg-[#002B49] text-white px-3.5 py-1.5 font-black tracking-wider uppercase text-xs">
                01 STUDENT DETAILS
              </div>
              <div className="border border-t-0 border-slate-300 divide-y divide-slate-300 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Full Name:</span>
                    <p className="font-bold text-slate-900 text-sm">{data.fullName}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Date of Birth:</span>
                    <p className="font-semibold text-slate-900">{data.dob}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Student Mobile:</span>
                    <p className="font-mono font-bold text-slate-900">{data.studentMobile}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">WhatsApp Number:</span>
                    <p className="font-mono font-semibold text-slate-900">{data.whatsappNumber || data.studentMobile}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Email ID:</span>
                    <p className="font-semibold text-slate-900">{data.email}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Gender:</span>
                    <p className="font-semibold text-slate-900">{data.gender}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 02 PARENT / GUARDIAN DETAILS */}
            <div>
              <div className="bg-[#002B49] text-white px-3.5 py-1.5 font-black tracking-wider uppercase text-xs">
                02 PARENT / GUARDIAN DETAILS
              </div>
              <div className="border border-t-0 border-slate-300 divide-y divide-slate-300 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Parent / Guardian Name:</span>
                    <p className="font-bold text-slate-900">{data.parentName}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Relationship:</span>
                    <p className="font-semibold text-slate-900">{data.relationship}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Parent Mobile Number:</span>
                    <p className="font-mono font-bold text-slate-900">{data.parentMobile}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Parent Email ID:</span>
                    <p className="font-semibold text-slate-900">{data.parentEmail || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 03 ACADEMIC PROFILE */}
            <div>
              <div className="bg-[#002B49] text-white px-3.5 py-1.5 font-black tracking-wider uppercase text-xs">
                03 ACADEMIC PROFILE
              </div>
              <div className="border border-t-0 border-slate-300 divide-y divide-slate-300 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Current Class / Academic Status:</span>
                    <p className="font-bold text-slate-900">{data.currentClass}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">School / Coaching Institute:</span>
                    <p className="font-semibold text-slate-900">{data.school || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Board:</span>
                    <p className="font-semibold text-slate-900">{data.board}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">NEET Attempt / Year:</span>
                    <p className="font-semibold text-slate-900">{data.neetAttempt || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">NEET Score / Rank:</span>
                    <p className="font-semibold text-slate-900">{data.neetScore || 'N/A'}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Target Exam:</span>
                    <p className="font-bold text-[#002B49]">{data.targetExam} {data.targetExamOther ? `(${data.targetExamOther})` : ''}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 04 COURSE / ENROLLMENT */}
            <div>
              <div className="bg-[#002B49] text-white px-3.5 py-1.5 font-black tracking-wider uppercase text-xs">
                04 COURSE / ENROLLMENT
              </div>
              <div className="border border-t-0 border-slate-300 divide-y divide-slate-300 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Course Name:</span>
                    <p className="font-bold text-[#002B49] text-sm">{data.courseName}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Admission Date:</span>
                    <p className="font-semibold text-slate-900">{data.admissionDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Academic Session:</span>
                    <p className="font-semibold text-slate-900">{data.academicSession}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Counsellor / Reference Name:</span>
                    <p className="font-semibold text-slate-900">{data.counsellor || 'Direct Admission'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Enrollment Type:</span>
                    <p className="font-semibold text-slate-900">{data.enrollmentType} Enrollment</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Lead Source:</span>
                    <p className="font-semibold text-slate-900">{data.leadSource} {data.leadSourceOther ? `(${data.leadSourceOther})` : ''}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 05 ADDRESS */}
            <div>
              <div className="bg-[#002B49] text-white px-3.5 py-1.5 font-black tracking-wider uppercase text-xs">
                05 ADDRESS
              </div>
              <div className="border border-t-0 border-slate-300 divide-y divide-slate-300 bg-white">
                <div className="p-2.5">
                  <span className="text-slate-500 font-bold uppercase text-[10px] block">Complete Address:</span>
                  <p className="font-semibold text-slate-900">{data.address}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">City:</span>
                    <p className="font-semibold text-slate-900">{data.city}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">State:</span>
                    <p className="font-semibold text-slate-900">{data.state}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">PIN Code:</span>
                    <p className="font-mono font-semibold text-slate-900">{data.pinCode}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 06 PAYMENT DETAILS */}
            <div>
              <div className="bg-[#002B49] text-white px-3.5 py-1.5 font-black tracking-wider uppercase text-xs">
                06 PAYMENT DETAILS
              </div>
              <div className="border border-t-0 border-slate-300 divide-y divide-slate-300 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Course Fee:</span>
                    <p className="font-bold text-slate-900">₹{parseInt(data.courseFee || 45000, 10).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Amount Paid:</span>
                    <p className="font-black text-emerald-700 text-sm">₹{parseInt(data.amountPaid || 45000, 10).toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Payment Mode:</span>
                    <p className="font-semibold text-slate-900">{data.paymentMode}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Transaction ID / UTR:</span>
                    <p className="font-mono font-bold text-slate-900">{data.transactionId || 'Desk Record'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Payment Date:</span>
                    <p className="font-semibold text-slate-900">{data.paymentDate}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Payment Status:</span>
                    <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[11px]">
                      {data.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 07 DOCUMENTS */}
            <div>
              <div className="bg-[#002B49] text-white px-3.5 py-1.5 font-black tracking-wider uppercase text-xs">
                07 DOCUMENTS
              </div>
              <div className="border border-t-0 border-slate-300 bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold uppercase text-[10px]">
                      <th className="p-2.5 w-1/3 border-r border-slate-300">Document</th>
                      <th className="p-2.5 w-1/3 border-r border-slate-300">Status</th>
                      <th className="p-2.5 w-1/3">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300">
                    <tr>
                      <td className="p-2.5 font-bold text-slate-900 border-r border-slate-300">Student Photo *</td>
                      <td className="p-2.5 border-r border-slate-300 text-emerald-700 font-bold">■ {data.docPhotoStatus}</td>
                      <td className="p-2.5 text-slate-600">{data.docPhotoRemarks || 'Verified'}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-900 border-r border-slate-300">Student ID Proof</td>
                      <td className="p-2.5 border-r border-slate-300 text-slate-800 font-semibold">■ {data.docIdProofStatus}</td>
                      <td className="p-2.5 text-slate-600">{data.docIdProofRemarks || 'Aadhaar copy submitted'}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-900 border-r border-slate-300">Payment Proof</td>
                      <td className="p-2.5 border-r border-slate-300 text-slate-800 font-semibold">■ {data.docPaymentProofStatus}</td>
                      <td className="p-2.5 text-slate-600">{data.docPaymentProofRemarks || 'UPI UTR Logged'}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-900 border-r border-slate-300">Other Required Document</td>
                      <td className="p-2.5 border-r border-slate-300 text-slate-600">■ {data.docOtherStatus}</td>
                      <td className="p-2.5 text-slate-600">{data.docOtherRemarks || 'N/A'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 08 COMMUNICATION PREFERENCE */}
            <div>
              <div className="bg-[#002B49] text-white px-3.5 py-1.5 font-black tracking-wider uppercase text-xs">
                08 COMMUNICATION PREFERENCE
              </div>
              <div className="border border-t-0 border-slate-300 divide-y sm:divide-y-0 sm:divide-x divide-slate-300 bg-white grid grid-cols-1 sm:grid-cols-2">
                <div className="p-2.5">
                  <span className="text-slate-500 font-bold uppercase text-[10px] block">Updates Through:</span>
                  <p className="font-semibold text-slate-900 mt-0.5">
                    {Array.isArray(data.updatesThrough) ? data.updatesThrough.join(', ') : 'Call, WhatsApp, Email'}
                  </p>
                </div>
                <div className="p-2.5">
                  <span className="text-slate-500 font-bold uppercase text-[10px] block">Preferred Recipient:</span>
                  <p className="font-semibold text-slate-900 mt-0.5">{data.preferredRecipient}</p>
                </div>
              </div>
            </div>

            {/* 09 DECLARATION */}
            <div>
              <div className="bg-[#002B49] text-white px-3.5 py-1.5 font-black tracking-wider uppercase text-xs">
                09 DECLARATION
              </div>
              <div className="border border-t-0 border-slate-300 divide-y divide-slate-300 bg-white">
                <div className="p-2.5 text-[11px] text-slate-700 bg-slate-50/50">
                  <p>
                    I/We confirm that the information and documents provided by me/us are true and complete. I/We agree to the applicable course terms, fee schedule, refund/cancellation policy, test rules, platform usage conditions and communication consent. Admission is confirmed only after required verification and payment approval.
                  </p>
                  <p className="font-bold text-emerald-800 mt-1">■ I/We Agreed</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Student / Parent Name:</span>
                    <p className="font-bold text-slate-900">{data.declarationName || data.fullName}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Date:</span>
                    <p className="font-semibold text-slate-900">{data.declarationDate || data.applicationDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Student / Parent Signature:</span>
                    <p className="font-serif italic font-bold text-slate-900 text-sm mt-0.5">{data.studentSignature || data.fullName}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Counsellor Signature:</span>
                    <p className="font-serif italic font-bold text-[#002B49] text-sm mt-0.5">{data.counsellorSignature || 'Admissions Dean'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 10 FOR EDVEDUM OFFICE USE ONLY */}
            <div>
              <div className="bg-[#002B49] text-white px-3.5 py-1.5 font-black tracking-wider uppercase text-xs">
                10 FOR EDVEDUM OFFICE USE ONLY
              </div>
              <div className="border border-t-0 border-slate-300 divide-y divide-slate-300 bg-slate-50/70">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Admission ID / Enrollment ID:</span>
                    <p className="font-mono font-bold text-slate-900">{data.officeAdmissionId || data.applicationNo}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Counsellor Name / Code:</span>
                    <p className="font-semibold text-slate-900">{data.officeCounsellorCode}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Batch / Course Code:</span>
                    <p className="font-mono font-semibold text-slate-900">{data.officeBatchCode}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Verification:</span>
                    <span className="inline-block px-2 py-0.5 bg-blue-100 text-[#002B49] font-bold rounded text-[11px]">
                      {data.officeVerification}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">ERP ID:</span>
                    <p className="font-mono font-semibold text-slate-900">{data.officeErpId}</p>
                  </div>
                  <div className="p-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Discount Approved By:</span>
                    <p className="font-semibold text-slate-900">{data.officeDiscountApprovedBy}</p>
                  </div>
                </div>

                <div className="p-2.5">
                  <span className="text-slate-500 font-bold uppercase text-[10px] block">Office Remarks / Notes:</span>
                  <p className="text-slate-700 font-medium">{data.officeRemarks || 'Provisional Admission Confirmed.'}</p>
                </div>
              </div>
            </div>

            {/* Bottom Legend */}
            <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p>Website flow: Course Selection → Student Details → Parent Details → Academic Details → Payment → Enrollment Confirmation.</p>
              <p className="font-mono">EDVEDUM ACADEMY (OPC) PRIVATE LIMITED</p>
            </div>

          </div>
        </div>

        {/* Back, My Tests, and Print buttons at bottom */}
        <div className="no-print flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <Link
            to="/admission"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 px-4 py-2 hover:bg-slate-50 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Edit Form
          </Link>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Link
              to="/my-tests"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-xs font-bold shadow transition"
            >
              <span>Go to My Tests →</span>
            </Link>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-[#002B49] hover:bg-[#001f35] text-white px-6 py-2 text-xs font-bold shadow transition"
            >
              <Printer className="h-3.5 w-3.5 text-[#C5A059]" />
              Print Official Admission Slip
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
