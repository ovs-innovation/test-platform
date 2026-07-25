import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState } from '../../components/ui.jsx';
import { formatDateTime } from '../../lib/format.js';
import {
  Award,
  ShieldCheck,
  Printer,
  Share2,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  GraduationCap
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';

export default function Certificate() {
  const { attemptId } = useParams();
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');
  const certificateRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    studentService.certificate(attemptId)
      .then(setData)
      .catch(() => setState('error'))
      .finally(() => setState((s) => s === 'loading' ? 'done' : s));
  }, [attemptId]);

  if (state === 'loading') return <LoadingScreen label="Generating Certificate of Achievement…" />;
  if (state === 'error' || !data) return <ErrorState message="Certificate not available or unauthorized." />;

  const { certificate = {}, attempt = {} } = data;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Certificate link copied to clipboard!');
    }
  };

  const scorePct = Number(attempt.percentage || 0);
  const isHighDistinction = scorePct >= 80;

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Top Navigation & Action Buttons (Hidden during Print) */}
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          to="/analytics"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Performance Analytics
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#070c18] px-4 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition-all shadow-md"
          >
            <Share2 className="w-4 h-4 text-cyan-400" /> Share Link
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500 to-yellow-600 px-4 py-2 text-xs font-extrabold text-slate-950 hover:brightness-110 transition-all shadow-lg shadow-amber-500/20"
          >
            <Printer className="w-4 h-4" /> Print / Download PDF
          </button>
        </div>
      </div>

      {/* Printable Certificate Main Container */}
      <div
        ref={certificateRef}
        className="relative overflow-hidden rounded-3xl border-4 border-amber-500/40 bg-gradient-to-b from-[#0a122c] via-[#070d22] to-[#040816] p-8 sm:p-12 shadow-2xl shadow-amber-500/10 text-center print:border-2 print:p-6 print:shadow-none"
      >
        {/* Decorative Metallic Corner Ornaments */}
        <div className="absolute top-4 left-4 h-8 w-8 border-t-2 border-l-2 border-amber-400/60 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-4 right-4 h-8 w-8 border-t-2 border-r-2 border-amber-400/60 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-amber-400/60 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-amber-400/60 rounded-br-xl pointer-events-none" />

        {/* Background Watermark Crest */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <GraduationCap className="w-96 h-96 text-amber-400" />
        </div>

        {/* Inner Border Line */}
        <div className="relative z-10 rounded-2xl border border-amber-500/20 p-6 sm:p-10 space-y-6">
          {/* Header Section */}
          <div className="space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500/20 to-yellow-400/20 border border-amber-400/40 shadow-inner">
              <Award className="h-9 w-9 text-amber-400" />
            </div>
            
            <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-400/90">
                EDVEDUM ACADEMY &bull; ASSESSPRO CBT
              </p>
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
                Certificate of Excellence
              </h1>
            </div>
          </div>

          <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

          {/* Recipient & Achievement Context */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              This is to certify that
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md py-1">
              {attempt.student_name || 'Candidate'}
            </h2>
            <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
              has successfully attempted and passed the proctored Computer-Based Test assessment with outstanding performance:
            </p>
            
            {/* Assessment Title Badge */}
            <div className="inline-block rounded-2xl border border-slate-700/80 bg-[#060b1a] px-6 py-2.5 shadow-lg">
              <p className="text-base sm:text-lg font-extrabold text-cyan-300">
                {attempt.assessment_title}
              </p>
            </div>
          </div>

          {/* Score & Distinction Metric */}
          <div className="flex flex-wrap items-center justify-center gap-4 py-2">
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 px-6 py-3 shadow-lg flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase text-emerald-300/80 block">Score Secured</span>
                <span className="text-2xl font-black text-emerald-400 tabular-nums">{scorePct.toFixed(2)}%</span>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-500/40 bg-amber-950/30 px-6 py-3 shadow-lg flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase text-amber-300/80 block">Result Status</span>
                <span className="text-sm font-extrabold text-amber-300">
                  {isHighDistinction ? 'Passed with Distinction' : 'Passed & Verified'}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Seals & Signatures */}
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-800/80 text-left items-end">
            {/* Left: Digital Verification Seal */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> EDVEDUM Verified Document
              </div>
              <p className="font-mono text-[11px] font-bold text-slate-300">
                ID: {certificate.certificate_code || 'AP-CERT-VERIFIED'}
              </p>
              <p className="text-[10px] text-slate-400">
                Issued on {certificate.issued_at ? formatDateTime(certificate.issued_at) : 'Official Record'}
              </p>
            </div>

            {/* Right: Signature Placeholder */}
            <div className="text-right space-y-1">
              <div className="inline-block border-b border-amber-400/40 pb-1 px-4">
                <span className="font-serif italic text-sm text-amber-300 font-bold tracking-wide">
                  EdVedum Academic Council
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                Controller of Examinations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

