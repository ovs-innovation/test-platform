import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Building2,
  School,
  ArrowLeft,
  Users,
  CheckCircle2,
  BarChart3,
  Layers,
  Settings as SettingsIcon,
  Upload,
  Mail,
  Phone,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { adminService, institutionDashboardService } from '../../lib/services.js';
import { useToast } from '../../context/ToastContext.jsx';
import { Spinner } from '../../components/ui.jsx';
import InstitutionReportsModule from '../../components/institution/reports/InstitutionReportsModule.jsx';

export default function SchoolDetail() {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const numSchoolId = Number(schoolId) || 1;

  const [activeTab, setActiveTab] = useState('reports'); // 'overview' | 'reports' | 'batches' | 'settings'
  const [loading, setLoading] = useState(true);
  const [schoolInfo, setSchoolInfo] = useState(null);
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadSchoolData();
  }, [numSchoolId]);

  const loadSchoolData = async () => {
    setLoading(true);
    try {
      const [profRes, batchRes, studRes] = await Promise.all([
        institutionDashboardService.profile(numSchoolId).catch(() => null),
        institutionDashboardService.batches(numSchoolId).catch(() => null),
        institutionDashboardService.students(numSchoolId).catch(() => null),
      ]);

      if (profRes?.profile) {
        setSchoolInfo(profRes.profile);
      } else {
        // Fallback info from admin institutions API
        const adminInst = await adminService.partnerSchools().catch(() => ({ institutions: [] }));
        const matched = (adminInst.institutions || []).find((s) => Number(s.id) === numSchoolId);
        if (matched) setSchoolInfo(matched);
        else setSchoolInfo({ id: numSchoolId, name: `Partner School #${numSchoolId}`, total_licenses: 200 });
      }

      if (batchRes?.batches) setBatches(batchRes.batches);
      if (studRes?.students) setStudents(studRes.students);
    } catch (err) {
      console.error('Failed to load school detail:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !schoolInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060D1A] text-white">
        <div className="text-center space-y-3">
          <Spinner className="h-10 w-10 text-cyan-400 mx-auto" />
          <p className="text-xs font-bold text-slate-400">Loading partner school dashboard...</p>
        </div>
      </div>
    );
  }

  const navTabs = [
    { id: 'overview', label: 'School Summary', icon: Building2 },
    { id: 'reports', label: 'Institution Reports', icon: BarChart3 },
    { id: 'batches', label: 'Batches & Roster', icon: Layers },
    { id: 'settings', label: 'License & Settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-[#060D1A] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* TOP BACK BUTTON & HEADER */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => navigate('/admin/schools')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Partner Schools</span>
        </button>

        <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          School ID: {schoolInfo?.code || schoolInfo?.schoolId || `INST-${numSchoolId}`}
        </span>
      </div>

      {/* SCHOOL EMBLEM & SUMMARY BANNER */}
      <div className="rounded-3xl border border-slate-800 bg-[#0A1628] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4 sm:gap-5">
            {schoolInfo?.logo_url ? (
              <img
                src={schoolInfo.logo_url}
                alt={schoolInfo.name}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-contain bg-white p-2 border border-slate-700 shrink-0"
              />
            ) : (
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white font-black text-xl flex items-center justify-center shadow-xl border border-white/20 shrink-0">
                {schoolInfo?.name ? schoolInfo.name.substring(0, 3).toUpperCase() : 'SCH'}
              </div>
            )}

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-0.5 text-xs font-bold text-cyan-400 border border-cyan-500/20">
                  <School className="h-3.5 w-3.5" />
                  Partner Coaching Institute
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="h-3 w-3" /> Active Partner
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {schoolInfo?.name || 'Partner School'}
              </h1>

              <p className="text-xs text-slate-400 font-medium">
                {schoolInfo?.tagline || 'Institutional CBT Assessment Partner'} • Contact: <span className="text-slate-300 font-bold">{schoolInfo?.contact_email || schoolInfo?.email || 'admin@partner.edu'}</span>
              </p>
            </div>
          </div>

          {/* KPI METRICS CORNER */}
          <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shrink-0">
            <div className="text-right">
              <p className="text-[11px] font-bold text-slate-400 uppercase">Licenses Issued</p>
              <p className="text-xl font-black text-cyan-400">{students.length} / {schoolInfo?.total_licenses || schoolInfo?.totalLicenses || 200}</p>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="text-right">
              <p className="text-[11px] font-bold text-slate-400 uppercase">Batches</p>
              <p className="text-xl font-black text-purple-400">{batches.length}</p>
            </div>
          </div>

        </div>

        {/* DETAIL NAVIGATION TABS */}
        <div className="flex items-center gap-2 pt-6 mt-6 border-t border-slate-800/80 overflow-x-auto">
          {navTabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 font-black'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT VIEWS */}
      {activeTab === 'reports' && (
        <InstitutionReportsModule schoolId={numSchoolId} batches={batches} isDarkMode={true} />
      )}

      {activeTab === 'overview' && (
        <div className="p-8 rounded-3xl border border-slate-800 bg-[#0B1730] space-y-4">
          <h3 className="text-lg font-extrabold text-white">Partner School Overview & Metadata</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <p className="text-slate-400 font-bold">Contact Email:</p>
              <p className="text-white font-mono">{schoolInfo?.contact_email || schoolInfo?.email || 'N/A'}</p>
              <p className="text-slate-400 font-bold mt-3">Contact Mobile:</p>
              <p className="text-white">{schoolInfo?.contact_mobile || '+91 98765 43210'}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <p className="text-slate-400 font-bold">Total Issued Licenses:</p>
              <p className="text-cyan-400 font-black text-sm">{schoolInfo?.total_licenses || 200} Licenses</p>
              <p className="text-slate-400 font-bold mt-3">Active Batches:</p>
              <p className="text-purple-400 font-bold">{batches.length} Active Batches</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'batches' && (
        <div className="p-8 rounded-3xl border border-slate-800 bg-[#0B1730] space-y-4">
          <h3 className="text-lg font-extrabold text-white">Batches Roster</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {batches.map((b) => (
              <div key={b.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                <p className="font-extrabold text-white text-sm">{b.batch_name || b.name}</p>
                <p className="text-slate-400">Target Exam: <span className="text-cyan-400 font-bold">{b.target_exam || 'JEE / NEET'}</span></p>
                <p className="text-slate-400">Students: <span className="text-emerald-400 font-bold">{b.student_count || 0}</span></p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="p-8 rounded-3xl border border-slate-800 bg-[#0B1730] space-y-4">
          <h3 className="text-lg font-extrabold text-white">License & Account Controls</h3>
          <p className="text-xs text-slate-400">Manage billing tier, custom package assignments, and administrative access for this partner school.</p>
        </div>
      )}

    </div>
  );
}
