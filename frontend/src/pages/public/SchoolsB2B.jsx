import { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  Building2,
  GraduationCap,
  Users,
  CheckCircle2,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  School,
  FileText,
  Search,
  Download,
  Plus,
  LogOut,
  ChevronRight,
  Award,
  TrendingUp,
  UserCheck,
  X,
  Mail,
  Key,
  HelpCircle,
  ChevronDown,
  BookOpen,
  Check,
  Layers,
  Calculator,
  Phone,
  Send,
  MessageSquare,
  Clock,
  ExternalLink,
  Target,
  PieChart,
  Lock,
  Activity,
  FileSpreadsheet,
  Eye,
  EyeOff
} from 'lucide-react';
import { Spinner } from '../../components/ui.jsx';
import {
  getPartnerSchools,
  submitSchoolDemoLead
} from '../../lib/schoolStore.js';
import {
  B2B_PACKAGES,
  B2B_FAQS,
  INSTITUTION_TYPES,
  TARGET_EXAMINATIONS,
  INTERESTED_PACKAGES,
  calculateInstitutionalQuote,
  getB2BPackageBySlug,
  getB2BPackageById
} from '../../data/b2bConfig.js';

export default function SchoolsB2B() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // State for logged-in institution portal dashboard
  const [activeSchool, setActiveSchool] = useState(null);

  // Hero Institution Login Form State (Clean Initial Load - Strictly Empty)
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showHeroPassword, setShowHeroPassword] = useState(false);
  const [heroRememberMe, setHeroRememberMe] = useState(false);
  const [heroSubmitting, setHeroSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard modal states
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRankingModal, setShowRankingModal] = useState(false);

  // Search & Filter State inside Portal Dashboard
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // New Student Form State inside Portal Dashboard
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentRoll, setNewStudentRoll] = useState('');
  const [newStudentCourse, setNewStudentCourse] = useState('JEE Main & Advanced');

  // FAQ Accordion States (Single open item, expandable view)
  const [faqOpen, setFaqOpen] = useState(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  // Interactive Pricing Calculator State
  const [selectedCalcPackageId, setSelectedCalcPackageId] = useState('neet-2027-1yr');
  const [calcStudentCount, setCalcStudentCount] = useState(250);

  // Calculated Pricing Quote
  const calculatedQuote = useMemo(() => {
    return calculateInstitutionalQuote(selectedCalcPackageId, calcStudentCount);
  }, [selectedCalcPackageId, calcStudentCount]);

  // Refs for smooth scrolling & accessibility focus
  const enquiryFormRef = useRef(null);
  const calculatorHeadingRef = useRef(null);
  const calculatorSectionRef = useRef(null);

  // URL Sync Effect for ?program=<slug> parameter and hash scrolling
  useEffect(() => {
    const programParam = searchParams.get('program');
    if (programParam) {
      const matched = getB2BPackageBySlug(programParam);
      if (matched) {
        setSelectedCalcPackageId(matched.id);
      }
    }

    if (location.hash === '#institutional-pricing' || location.hash === '#aiets-programs') {
      const targetId = location.hash === '#institutional-pricing' ? 'institutional-pricing' : 'aiets-programs';
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const yOffset = -70;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    }
  }, [searchParams, location.hash]);

  // Primary Button: Calculate Institutional Pricing
  const handleCalculatePricing = (pkg) => {
    setSelectedCalcPackageId(pkg.id);
    navigate(`/for-institutions?program=${pkg.slug}#institutional-pricing`, { replace: true });
    
    const element = document.getElementById('institutional-pricing') || calculatorSectionRef.current;
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Secondary Button: View Full Program Details
  const handleViewProgramDetails = (pkg) => {
    navigate(`/test-series/${pkg.slug}?audience=institution`);
  };

  // Partnership Enquiry Form State (12 Required Fields)
  const [enquiryForm, setEnquiryForm] = useState({
    institutionName: '',
    contactPerson: '',
    designation: 'Principal',
    mobileNumber: '',
    email: '',
    city: '',
    state: '',
    institutionType: 'School',
    studentCount: '100-300',
    targetExam: 'NEET',
    interestedPackage: 'NEET-UG 2027 One-Year Program',
    message: '',
    consent: false,
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (showAddModal || selectedStudent || showRankingModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showAddModal, selectedStudent, showRankingModal]);

  // Scroll Helpers with Header Offset
  const scrollToEnquiryForm = (prefillData = null) => {
    if (prefillData) {
      setEnquiryForm((prev) => ({
        ...prev,
        ...prefillData,
      }));
    }
    const element = document.getElementById('partnership-form') || enquiryFormRef.current;
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToHeroLogin = () => {
    const heroElement = document.getElementById('b2b-hero');
    if (heroElement) {
      const yOffset = -70;
      const y = heroElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToPrograms = () => {
    const element = document.getElementById('aiets-programs');
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const [enquiryRefCode, setEnquiryRefCode] = useState('');

  // Handle Enquiry Form Submit
  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!enquiryForm.institutionName.trim()) {
      setFormError('Please enter your Institution Name.');
      return;
    }
    if (!enquiryForm.contactPerson.trim()) {
      setFormError('Please enter the Contact Person name.');
      return;
    }
    const cleanPhone = enquiryForm.mobileNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enquiryForm.email.trim())) {
      setFormError('Please enter a valid official email address.');
      return;
    }
    if (!enquiryForm.city.trim() || !enquiryForm.state.trim()) {
      setFormError('Please enter your City and State.');
      return;
    }
    if (!enquiryForm.consent) {
      setFormError('Please tick the consent box to allow us to contact you regarding your enquiry.');
      return;
    }

    setFormSubmitting(true);

    try {
      const matchedPkg = getB2BPackageById(selectedCalcPackageId);
      const res = await submitSchoolDemoLead({
        institutionName: enquiryForm.institutionName,
        contactName: enquiryForm.contactPerson,
        designation: enquiryForm.designation,
        phone: enquiryForm.mobileNumber,
        email: enquiryForm.email,
        city: enquiryForm.city,
        state: enquiryForm.state,
        institutionType: enquiryForm.institutionType,
        studentCount: enquiryForm.studentCount,
        targetExam: enquiryForm.targetExam,
        interestedPackage: enquiryForm.interestedPackage,
        message: enquiryForm.message,
        estimatedPrice: calculatedQuote.grandTotal,
        testSeriesId: matchedPkg.dbId,
        programSlug: matchedPkg.slug,
        programName: matchedPkg.title,
        programYear: matchedPkg.target.includes('2028') ? 2028 : 2027,
        studentCountNum: calcStudentCount,
        standardRetailRate: matchedPkg.baseRetailPrice,
        discountTier: calculatedQuote.tierLabel,
        estimatedDiscountedRate: calculatedQuote.discountedPricePerStudent,
        estimatedSubtotal: calculatedQuote.subtotal,
        gstEstimate: calculatedQuote.taxAmount,
        estimatedGrandTotal: calculatedQuote.grandTotal,
        leadSource: 'b2b_program_card',
      });

      setEnquiryRefCode(res.referenceCode || `ENQ-2026-${Math.floor(100000 + Math.random() * 900000)}`);
      setFormSuccess(true);
    } catch (err) {
      setFormError('Failed to submit application. Please try again or contact support.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Handle Hero Institution Login Form Submit
  const handleLoginSubmit = (e) => {
    e?.preventDefault();
    setLoginError('');

    const input = loginId.trim().toLowerCase();
    const pass = loginPassword.trim();

    if (!input || !pass) {
      setLoginError('Please enter your Institution ID / registered email and password.');
      return;
    }

    setHeroSubmitting(true);

    try {
      const schoolsList = getPartnerSchools();
      const matched = schoolsList.find(
        (s) => (s.schoolId.toLowerCase() === input || s.email.toLowerCase() === input) && s.password === pass
      );

      if (matched) {
        setActiveSchool(matched);
        setLoginError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setLoginError('Invalid Institution ID or Password. Please check your credentials or contact support.');
      }
    } catch (err) {
      setLoginError(err.message || 'Invalid Institution ID or Password.');
    } finally {
      setHeroSubmitting(false);
    }
  };

  const handleLogout = () => {
    setActiveSchool(null);
    setLoginId('');
    setLoginPassword('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentRoll.trim()) return;

    const newSt = {
      id: `ST-${Date.now()}`,
      name: newStudentName.trim(),
      rollNo: newStudentRoll.trim(),
      course: newStudentCourse,
      progress: 0,
      testsCount: 0,
      avgScore: 0,
      lastActive: 'Just enrolled',
      status: 'Active',
      physics: 0,
      chemistry: 0,
      math: newStudentCourse.includes('JEE') ? 0 : null,
      biology: newStudentCourse.includes('NEET') ? 0 : null,
    };

    const updatedStudents = [newSt, ...(activeSchool.students || [])];
    const updatedSchool = {
      ...activeSchool,
      activeStudents: (activeSchool.activeStudents || 0) + 1,
      students: updatedStudents,
    };

    setActiveSchool(updatedSchool);
    setNewStudentName('');
    setNewStudentRoll('');
    setShowAddModal(false);
  };

  // Filtered Students List
  const filteredStudents = useMemo(() => {
    if (!activeSchool?.students) return [];
    return activeSchool.students.filter((st) => {
      const matchesSearch =
        st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        st.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCourse =
        courseFilter === 'All' || st.course.toLowerCase().includes(courseFilter.toLowerCase());
      const matchesStatus = statusFilter === 'All' || st.status === statusFilter;
      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [activeSchool, searchQuery, courseFilter, statusFilter]);

  // Visible FAQs based on expand state
  const visibleFaqs = useMemo(() => {
    return showAllFaqs ? B2B_FAQS : B2B_FAQS.slice(0, 6);
  }, [showAllFaqs]);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#2563eb] selection:text-white">

      {/* =========================================================================
          IF LOGGED IN: DISPLAY MULTI-TENANT INSTITUTION DASHBOARD
         ========================================================================= */}
      {activeSchool ? (
        <div className="bg-[#0B1730] text-slate-100 min-h-screen pb-16">
          <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">

            {/* BRANDED INSTITUTION HEADER */}
            <div className="rounded-3xl border border-slate-800 bg-[#071126] p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div
                className="absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ backgroundColor: activeSchool.accentColor || '#2563eb' }}
              />

<<<<<<< HEAD
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between relative z-10">
              {/* Left: School Logo & Title */}
              <div className="flex items-center gap-4 sm:gap-5">
                {/* Custom School Logo Emblem or Logo Image */}
                {activeSchool.logoUrl ? (
                  <img
                    src={activeSchool.logoUrl}
                    alt={activeSchool.name}
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-contain bg-white p-2 shadow-xl border border-white/20 shrink-0"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl ${activeSchool.logoBg || 'bg-blue-600'} text-white font-black text-xl sm:text-2xl shadow-xl border border-white/20 shrink-0 ${activeSchool.logoUrl ? 'hidden' : 'flex'}`}>
                  {activeSchool.logoBadge || activeSchool.name.substring(0, 3).toUpperCase()}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-400 border border-cyan-500/20">
                      <School className="h-3.5 w-3.5" />
                      INSTITUTION PORTAL
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      ID: {activeSchool.schoolId}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {activeSchool.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 font-medium">
                    {activeSchool.tagline} • <span className="text-emerald-400 font-bold">{activeSchool.totalLicenses} Total Licenses</span>
                  </p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95 transition cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Enroll New Student</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                  title="Switch School / Logout"
                >
                  <LogOut className="h-4 w-4 text-rose-400" />
                  <span>Exit Portal</span>
                </button>
              </div>
            </div>
          </div>

          {/* 2. SUMMARY KPI STATS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Total Enrolled */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider">Enrolled Students</span>
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white">{activeSchool.activeStudents} <span className="text-xs font-normal text-slate-400">/ {activeSchool.totalLicenses}</span></p>
              <div className="mt-2 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(activeSchool.activeStudents / activeSchool.totalLicenses) * 100}%` }} />
              </div>
            </div>

            {/* Average Batch Progress */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider">Batch Avg Progress</span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-emerald-400">{activeSchool.avgProgress}%</p>
              <p className="text-[11px] font-bold text-slate-400 mt-2">Overall Syllabus Coverage</p>
            </div>

            {/* Total Tests Attempted */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider">Tests Attempted</span>
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <FileText className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white">{activeSchool.testsAttempted.toLocaleString()}</p>
              <p className="text-[11px] font-bold text-slate-400 mt-2">NTA Pattern CBT Tests</p>
            </div>

            {/* Active Ratio */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider">Active Status</span>
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <UserCheck className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-cyan-400">{activeSchool.activeCount} <span className="text-xs font-normal text-slate-400">Active</span></p>
              <p className="text-[11px] font-bold text-rose-400 mt-2">{activeSchool.inactiveCount} Inactive (30+ days)</p>
            </div>
          </div>

          {/* 3. ENROLLED STUDENTS ROSTER TABLE */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl space-y-5">
            {/* Header & Controls */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-5">
              <div>
                <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <span>Student Roster & Course Progress</span>
                  <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-xs font-bold text-blue-400">
                    {filteredStudents.length} Students
                  </span>
                </h2>
                <p className="text-xs text-slate-400 font-medium">Real-time performance analytics for students enrolled under {activeSchool.name}.</p>
              </div>

              {/* Search, Filters & Action Tools */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Bulk Upload CSV Input */}
                <label className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/90 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700 hover:text-white cursor-pointer transition">
                  <Download className="h-3.5 w-3.5 text-cyan-400 rotate-180" />
                  <span>Bulk Upload (CSV)</span>
                  <input
                    type="file"
                    accept=".csv,.xlsx"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      alert(`Successfully imported ${file.name}! 50 student credentials auto-generated.`);
                    }}
                  />
                </label>

                {/* Ranking Leaderboard Modal Button */}
                <button
                  onClick={() => setShowRankingModal(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#C5A059]/40 bg-[#C5A059]/10 px-3 py-2 text-xs font-extrabold text-[#C5A059] hover:bg-[#C5A059]/20 transition cursor-pointer"
                >
                  <Award className="h-3.5 w-3.5" />
                  <span>🏆 Ranking Leaderboard</span>
                </button>

                {/* Export Report */}
                <button
                  onClick={() => alert(`Exporting ${activeSchool.name} Roster & Rank Performance Report to Excel/PDF...`)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/90 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700 hover:text-white cursor-pointer transition"
                >
                  <FileText className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Download Report</span>
                </button>


                {/* Search */}
                <div className="relative w-full sm:w-56">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search student or roll..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2 pl-9 pr-3 text-xs font-semibold text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                {/* Course Filter */}
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs font-semibold text-slate-300 focus:border-cyan-500 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Courses</option>
                  <option value="JEE">JEE Main & Advanced</option>
                  <option value="NEET">NEET UG</option>
                  <option value="Foundation">Class 9-10 Foundation</option>
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs font-semibold text-slate-300 focus:border-cyan-500 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active Only</option>
                  <option value="Inactive">Inactive Only</option>
                </select>
              </div>
            </div>


            {/* Table */}
            <div className="w-full max-w-full overflow-x-auto min-w-0">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="py-3.5 px-4">Student & Roll No</th>
                    <th className="py-3.5 px-4">Enrolled Course</th>
                    <th className="py-3.5 px-4">Syllabus Progress</th>
                    <th className="py-3.5 px-4">Tests Done</th>
                    <th className="py-3.5 px-4">Avg Score</th>
                    <th className="py-3.5 px-4">Last Active</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-800/40 transition">
                        {/* Name & Roll */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 font-extrabold text-xs border border-blue-500/20">
                              {student.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-extrabold text-white">{student.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono">{student.rollNo}</p>
                            </div>
                          </div>
                        </td>

                        {/* Course */}
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${student.course.includes('JEE')
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            : student.course.includes('NEET')
                              ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                              : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                            }`}>
                            {student.course}
                          </span>
                        </td>

                        {/* Progress */}
                        <td className="py-3.5 px-4 min-w-[130px]">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-bold">
                              <span className="text-slate-300">{student.progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${student.progress > 80 ? 'bg-emerald-500' : student.progress > 60 ? 'bg-cyan-500' : 'bg-amber-500'
                                  }`}
                                style={{ width: `${student.progress}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Tests */}
                        <td className="py-3.5 px-4">
                          <span className="font-extrabold text-white">{student.testsCount}</span> <span className="text-slate-500 text-[10px]">mocks</span>
                        </td>

                        {/* Avg Score */}
                        <td className="py-3.5 px-4">
                          <span className={`font-black text-xs ${student.avgScore >= 80 ? 'text-emerald-400' : student.avgScore >= 65 ? 'text-cyan-400' : 'text-amber-400'
                            }`}>
                            {student.avgScore}%
                          </span>
                        </td>

                        {/* Last Active */}
                        <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                          {student.lastActive}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold border ${student.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${student.status === 'Active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                            {student.status}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-bold text-slate-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 transition cursor-pointer"
                          >
                            View Report
                          </button>
                        </td>
                      </tr>
                    ))
=======
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between relative z-10">
                <div className="flex items-center gap-4 sm:gap-5">
                  {activeSchool.logoUrl ? (
                    <img
                      src={activeSchool.logoUrl}
                      alt={activeSchool.name}
                      className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-contain bg-white p-2 shadow-xl border border-white/20 shrink-0"
                    />
>>>>>>> 7c0a0eb (feat: AIETS calendar redesign, B2B pricing flow, auth stability repair, and hero seamless blending)
                  ) : (
                    <div className={`flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl ${activeSchool.logoBg || 'bg-[#2563eb]'} text-white font-black text-xl sm:text-2xl shadow-xl border border-white/20 shrink-0`}>
                      {activeSchool.logoBadge || activeSchool.name.substring(0, 3).toUpperCase()}
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2563eb]/20 px-3 py-1 text-xs font-bold text-cyan-300 border border-[#2563eb]/30">
                        <School className="h-3.5 w-3.5" />
                        INSTITUTION PORTAL
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        ID: {activeSchool.schoolId}
                      </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {activeSchool.name}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium">
                      {activeSchool.tagline} • <span className="text-emerald-400 font-bold">{activeSchool.totalLicenses} Issued Licenses</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] hover:bg-blue-700 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg transition cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Enroll New Student</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 text-rose-400" />
                    <span>Exit Portal</span>
                  </button>
                </div>
              </div>
            </div>

            {/* KPI STATS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="rounded-2xl border border-slate-800 bg-[#071126] p-5">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider">Enrolled Students</span>
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Users className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-black text-white">{activeSchool.activeStudents} <span className="text-xs font-normal text-slate-400">/ {activeSchool.totalLicenses}</span></p>
                <div className="mt-2 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563eb] rounded-full" style={{ width: `${(activeSchool.activeStudents / activeSchool.totalLicenses) * 100}%` }} />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#071126] p-5">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider">Batch Avg Progress</span>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400">{activeSchool.avgProgress}%</p>
                <p className="text-[11px] font-bold text-slate-400 mt-2">Overall Syllabus Coverage</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#071126] p-5">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider">Tests Attempted</span>
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <FileText className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-black text-white">{activeSchool.testsAttempted.toLocaleString()}</p>
                <p className="text-[11px] font-bold text-slate-400 mt-2">NTA Pattern CBT Tests</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#071126] p-5">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider">Active Status</span>
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <UserCheck className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-black text-cyan-400">{activeSchool.activeCount} <span className="text-xs font-normal text-slate-400">Active</span></p>
                <p className="text-[11px] font-bold text-slate-400 mt-2">{activeSchool.inactiveCount} Inactive (30+ days)</p>
              </div>
            </div>

            {/* ENROLLED STUDENTS TABLE */}
            <div className="rounded-3xl border border-slate-800 bg-[#071126] p-6 backdrop-blur-xl shadow-xl space-y-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-5">
                <div>
                  <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                    <span>Student Roster & Course Progress</span>
                    <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-xs font-bold text-blue-400">
                      {filteredStudents.length} Students
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 font-medium font-sans">Real-time performance analytics for students enrolled under {activeSchool.name}.</p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setShowRankingModal(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#C5A059]/40 bg-[#C5A059]/10 px-3 py-2 text-xs font-extrabold text-[#C5A059] hover:bg-[#C5A059]/20 transition cursor-pointer"
                  >
                    <Award className="h-3.5 w-3.5" />
                    <span>🏆 Ranking Leaderboard</span>
                  </button>

                  <div className="relative w-full sm:w-56">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search student or roll..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 pl-9 pr-3 text-xs font-semibold text-white placeholder-slate-500 focus:border-[#2563eb] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="w-full max-w-full overflow-x-auto min-w-0">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="py-3.5 px-4">Student & Roll No</th>
                      <th className="py-3.5 px-4">Enrolled Course</th>
                      <th className="py-3.5 px-4">Syllabus Progress</th>
                      <th className="py-3.5 px-4">Tests Done</th>
                      <th className="py-3.5 px-4">Avg Score</th>
                      <th className="py-3.5 px-4">Last Active</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-slate-900/50 transition">
                          <td className="py-3.5 px-4">
                            <div className="font-extrabold text-white text-xs">{student.name}</div>
                            <div className="text-[10px] font-mono text-slate-400">{student.rollNo}</div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-300 font-medium">{student.course}</td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-cyan-400 text-xs">{student.progress}%</span>
                              <div className="h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${student.progress}%` }} />
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-white">{student.testsCount}</td>
                          <td className="py-3.5 px-4 font-black text-emerald-400">{student.avgScore}%</td>
                          <td className="py-3.5 px-4 text-slate-400 text-[11px]">{student.lastActive}</td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold border ${student.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setSelectedStudent(student)}
                              className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-bold text-slate-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 transition cursor-pointer"
                            >
                              View Report
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-10 text-center text-slate-400">
                          No student records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* MODALS */}
            {selectedStudent && createPortal(
              <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
                <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-[#071126] p-6 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="font-extrabold text-white text-base">{selectedStudent.name}</h3>
                    <button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Progress</p>
                      <p className="text-lg font-black text-cyan-400 mt-0.5">{selectedStudent.progress}%</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Tests Done</p>
                      <p className="text-lg font-black text-white mt-0.5">{selectedStudent.testsCount}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Avg Accuracy</p>
                      <p className="text-lg font-black text-emerald-400 mt-0.5">{selectedStudent.avgScore}%</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-800 flex justify-end">
                    <button onClick={() => setSelectedStudent(null)} className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700">Close</button>
                  </div>
                </div>
              </div>,
              document.body
            )}

            {showRankingModal && createPortal(
              <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
                <div className="w-full max-w-2xl rounded-3xl border border-[#C5A059]/40 bg-[#071126] p-6 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-extrabold text-white text-lg">Student Ranking Leaderboard</h3>
                    <button onClick={() => setShowRankingModal(false)} className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
                  </div>
                  <div className="w-full max-w-full overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="border-b border-slate-800 bg-slate-950/80 text-[11px] font-extrabold uppercase text-slate-400">
                        <tr>
                          <th className="py-3 px-3">Rank</th>
                          <th className="py-3 px-3">Student Name</th>
                          <th className="py-3 px-3">Course</th>
                          <th className="py-3 px-3">Avg Accuracy</th>
                          <th className="py-3 px-3">Estimated AIR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {activeSchool?.students?.slice().sort((a, b) => b.avgScore - a.avgScore).map((st, idx) => (
                          <tr key={st.id}>
                            <td className="py-3 px-3 font-bold text-cyan-400">#{idx + 1}</td>
                            <td className="py-3 px-3 font-extrabold text-white">{st.name}</td>
                            <td className="py-3 px-3 text-slate-300">{st.course}</td>
                            <td className="py-3 px-3 font-black text-emerald-400">{st.avgScore}%</td>
                            <td className="py-3 px-3 font-mono text-cyan-300">AIR {(idx + 1) * 142 + 18}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="pt-3 border-t border-slate-800 flex justify-end">
                    <button onClick={() => setShowRankingModal(false)} className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-white">Close</button>
                  </div>
                </div>
              </div>,
              document.body
            )}

            {showAddModal && createPortal(
              <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
                <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-[#071126] p-6 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-extrabold text-white text-base">Enroll New Candidate</h3>
                    <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
                  </div>
                  <form onSubmit={handleAddStudent} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Student Full Name</label>
                      <input type="text" required placeholder="e.g. Rahul Verma" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Institutional Roll Number</label>
                      <input type="text" required placeholder="e.g. APX-2026-109" value={newStudentRoll} onChange={(e) => setNewStudentRoll(e.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Assigned Course Stream</label>
                      <select value={newStudentCourse} onChange={(e) => setNewStudentCourse(e.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white">
                        <option value="JEE Main & Advanced">JEE Main & Advanced</option>
                        <option value="NEET UG">NEET UG</option>
                        <option value="Foundation (Class 10)">Foundation (Class 10)</option>
                      </select>
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                      <button type="button" onClick={() => setShowAddModal(false)} className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-bold text-slate-300">Cancel</button>
                      <button type="submit" className="rounded-xl bg-[#2563eb] px-5 py-2 text-xs font-bold text-white">Confirm Enrollment</button>
                    </div>
                  </form>
                </div>
              </div>,
              document.body
            )}

          </div>
        </div>
      ) : (

        /* =========================================================================
            LOGGED OUT: CLEANED B2B LANDING PAGE (SIMPLIFIED CTAS & REFINED VISUALS)
           ========================================================================= */
        <div>

          {/* SECTION 2: B2B HERO (CLEAN SEAMLESS MIDNIGHT GRADIENT) */}
          <section id="b2b-hero" className="relative overflow-hidden bg-gradient-to-br from-[#061224] via-[#0B1E38] to-[#040C1A] text-white flex items-center py-8 sm:py-10 lg:py-12 border-b border-slate-800/80 min-h-[calc(100vh-140px)] scroll-mt-32">
            
            {/* Soft Organic Ambient Depth Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-0 w-3/5 h-full bg-[radial-gradient(ellipse_at_top_left,rgba(14,165,233,0.06)_0%,transparent_70%)]" />
              <div className="absolute bottom-0 right-0 w-3/5 h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
            </div>

            <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                
                {/* HERO LEFT SIDE: PARTNERSHIP CONTENT (55% / 7 cols) */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
                  {/* Partnership Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-blue-500/10 px-3.5 py-1 backdrop-blur-xl">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[11px] font-extrabold tracking-wider text-cyan-300 uppercase">
                      B2B & Institutional Partnerships
                    </span>
                  </div>

                  {/* Main Headline & Subheading */}
                  <div className="space-y-1.5">
                    <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-[1.12]">
                      Power Your Institution’s Results with AIETS
                    </h1>
                    <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                      NTA-Pattern CBT Test Series
                    </p>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl font-normal">
                    Bring national-level testing, detailed performance analytics, student rankings and institutional reporting to your school, coaching institute or college.
                  </p>

                  {/* SIMPLIFIED HERO CTAs */}
                  <div className="pt-0.5 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => scrollToEnquiryForm()}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-7 py-3 text-xs sm:text-sm font-extrabold text-white shadow-[0_6px_16px_rgba(37,99,235,0.16)] hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(37,99,235,0.20)] active:translate-y-0 transition-all duration-200 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>Request a Demo</span>
                    </button>
                    <button
                      onClick={() => scrollToPrograms()}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3 text-xs sm:text-sm font-extrabold text-slate-200 backdrop-blur-xl hover:border-slate-500 hover:text-white transition cursor-pointer"
                    >
                      <BookOpen className="h-4 w-4 text-cyan-400" />
                      <span>Explore AIETS Programs</span>
                    </button>
                  </div>

                  {/* 3 Short Trust Indicators */}
                  <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300 border-t border-slate-800/90">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>National-Level Assessments</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Bulk Student Onboarding</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Dedicated Support</span>
                    </div>
                  </div>
                </div>

                {/* HERO RIGHT SIDE: EDVEDUM SIGNATURE NEO-GLASS INSTITUTION LOGIN CARD (45% / 5 cols) */}
                <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center lg:justify-end">
                  {/* Dark Translucent Neo-Glass Card Frame */}
                  <div
                    id="institution-login"
                    className="w-full max-w-[440px] rounded-[24px] border border-[#38BDF8]/25 bg-gradient-to-b from-[#0F213D]/95 via-[#0B1A32]/98 to-[#071224]/98 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.45)] text-white overflow-hidden scroll-mt-32 relative z-10 transition-all duration-300"
                  >
                    {/* Top Accent Gradient Line */}
                    <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-80" />

                    {/* Header Area */}
                    <div className="bg-white/[0.02] px-5 sm:px-6 py-4 sm:py-5 border-b border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        {/* Gradient Icon Container */}
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] text-white flex items-center justify-center shadow-md">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        {/* Partner Access Badge */}
                        <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 text-[10px] font-extrabold uppercase tracking-widest backdrop-blur-md">
                          Partner Access
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <h3 className="text-xl sm:text-[26px] font-extrabold text-white tracking-tight leading-snug">
                          Institution Portal Login
                        </h3>
                        <p className="text-xs text-slate-300 leading-snug">
                          Secure access for authorized institutional partners.
                        </p>
                      </div>
                    </div>

                    {/* Form Body Area */}
                    <div className="px-5 sm:px-6 py-4 sm:py-5 space-y-3.5">
                      
                      {/* Error Message Box */}
                      {loginError && (
                        <div
                          role="alert"
                          className="rounded-xl border border-rose-500/30 bg-rose-500/15 p-2.5 text-xs font-semibold text-rose-200 flex items-start gap-2 animate-in fade-in"
                        >
                          <X className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                          <span>{loginError}</span>
                        </div>
                      )}

                      {/* Form */}
                      <form onSubmit={handleLoginSubmit} autoComplete="off" className="space-y-3">
                        
                        {/* Institution ID / Email Field */}
                        <div>
                          <label htmlFor="hero-login-id" className="block text-xs font-semibold text-slate-200 mb-1">
                            Institution ID or registered email
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400/80 pointer-events-none" />
                            <input
                              id="hero-login-id"
                              name="institution_login_id_no_fill"
                              type="text"
                              required
                              autoComplete="off"
                              placeholder="Enter institution ID or registered email"
                              value={loginId}
                              onChange={(e) => setLoginId(e.target.value)}
                              className="w-full h-11 rounded-xl border border-white/10 bg-white/[0.05] py-2.5 pl-10 pr-3.5 text-xs sm:text-sm text-white placeholder:text-slate-400 hover:border-cyan-400/40 focus:border-[#38BDF8] focus:ring-4 focus:ring-[#38BDF8]/15 focus:outline-none transition-all duration-200"
                            />
                          </div>
                        </div>

                        {/* Password Field */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label htmlFor="hero-login-pass" className="block text-xs font-semibold text-slate-200">
                              Password
                            </label>
                            <Link to="/forgot-password" className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 hover:underline">
                              Forgot password?
                            </Link>
                          </div>
                          <div className="relative">
                            <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400/80 pointer-events-none" />
                            <input
                              id="hero-login-pass"
                              name="institution_login_pass_no_fill"
                              type={showHeroPassword ? 'text' : 'password'}
                              required
                              autoComplete="new-password"
                              placeholder="Enter your password"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              className="w-full h-11 rounded-xl border border-white/10 bg-white/[0.05] py-2.5 pl-10 pr-10 text-xs sm:text-sm text-white placeholder:text-slate-400 hover:border-cyan-400/40 focus:border-[#38BDF8] focus:ring-4 focus:ring-[#38BDF8]/15 focus:outline-none transition-all duration-200"
                            />
                            <button
                              type="button"
                              onClick={() => setShowHeroPassword(!showHeroPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-lg transition"
                              aria-label={showHeroPassword ? 'Hide password' : 'Show password'}
                            >
                              {showHeroPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Remember Me Checkbox */}
                        <div className="flex items-center justify-between pt-0.5">
                          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={heroRememberMe}
                              onChange={(e) => setHeroRememberMe(e.target.checked)}
                              className="h-3.5 w-3.5 rounded border-white/20 bg-white/10 text-cyan-400 focus:ring-cyan-400/30"
                            />
                            <span>Remember me</span>
                          </label>
                        </div>

                        {/* Primary Gradient Login Button */}
                        <button
                          type="submit"
                          disabled={heroSubmitting}
                          className="w-full h-11 rounded-xl bg-gradient-to-r from-[#0284C7] via-[#2563EB] to-[#7C3AED] py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-[0_6px_16px_rgba(37,99,235,0.20)] hover:-translate-y-[1.5px] hover:shadow-[0_8px_25px_rgba(37,99,235,0.30)] active:translate-y-0 transition-all duration-200 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {heroSubmitting ? (
                            <>
                              <Spinner className="h-4 w-4 text-white" />
                              <span>Accessing Dashboard...</span>
                            </>
                          ) : (
                            <>
                              <span>Access Institution Dashboard</span>
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </form>

                      {/* Support Email Footer */}
                      <div className="pt-3 border-t border-white/10 text-center text-[11px] text-slate-300">
                        Need portal assistance? Email <a href="mailto:support@edvedum.com" className="text-cyan-400 font-semibold hover:underline">support@edvedum.com</a>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SLIM FULL-WIDTH NTA DISCLAIMER STRIP */}
          <div className="w-full border-y border-slate-800/90 bg-[#040d1a] py-3 px-4 text-center">
            <p className="text-xs sm:text-[13px] font-medium text-slate-300 max-w-4xl mx-auto leading-relaxed text-center">
              <ShieldCheck className="inline-block h-3.5 w-3.5 text-cyan-400 mr-1.5 -mt-0.5 align-middle" />
              <span>
                Edvedum Academy is an independent educational platform and is not affiliated with or endorsed by the National Testing Agency.
              </span>
            </p>
          </div>


          {/* SECTION 3: WHAT IS AIETS? (WHITE WITH SUBTLE RADIAL GLOW) */}
          <section id="what-is-aiets" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24 border-b border-[#DCE5F1]">
            <div className="absolute -inset-10 rounded-full bg-cyan-400/5 blur-3xl pointer-events-none" />
            <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-10 items-center">
                
                {/* Left Col */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-wider">Edvedum Assessment Engine</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071833] tracking-tight">
                      What is AIETS?
                    </h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-[#2563eb] to-cyan-400 rounded-full" />
                  </div>

                  <div className="p-4.5 rounded-2xl bg-[#F4F8FF] border border-[#D0E2FF]">
                    <p className="text-base font-black text-[#2563EB]">
                      AIETS — All India Edvedum Test Series
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#475467] leading-relaxed">
                    AIETS is Edvedum’s national-level testing program designed to provide structured assessments, realistic NTA-pattern CBT practice, All India ranking, granular performance analytics, detailed step-by-step solution PDFs, and personalized improvement insights for NEET aspirants.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 pt-1">
                    <div className="p-4 rounded-2xl border border-[#DCE5F1] bg-[#F8FAFC] space-y-1 shadow-xs hover:-translate-y-1 transition duration-300">
                      <h4 className="text-xs font-extrabold text-[#071833] uppercase">Authentic NTA CBT Interface</h4>
                      <p className="text-xs text-[#5D6B82]">Exact timer, question palette, section navigation, and proctoring controls.</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-[#DCE5F1] bg-[#F8FAFC] space-y-1 shadow-xs hover:-translate-y-1 transition duration-300">
                      <h4 className="text-xs font-extrabold text-[#071833] uppercase">Peer Benchmarking</h4>
                      <p className="text-xs text-[#5D6B82]">Benchmark performance across eligible AIETS participants nationwide.</p>
                    </div>
                  </div>
                </div>

                {/* Right Col: Highlights Panel */}
                <div className="lg:col-span-5 relative">
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-blue-100 via-cyan-100 to-indigo-100 blur-xl opacity-70 pointer-events-none" />
                  <div className="relative rounded-3xl border border-[#D0E2FF] bg-white p-7 sm:p-8 space-y-5 shadow-md">
                    <h3 className="text-lg font-black text-[#071833] border-b border-[#DCE5F1] pb-3">
                      Key Highlights of AIETS
                    </h3>

                    <ul className="space-y-4 text-xs text-[#475467]">
                      <li className="flex items-start gap-3">
                        <div className="p-1.5 rounded-xl bg-blue-50 text-[#2563EB] border border-blue-100 mt-0.5 shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <span><strong className="text-[#101828]">NTA-Style Practice Interface:</strong> Authentic exam environment builds student confidence.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1.5 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100 mt-0.5 shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <span><strong className="text-[#101828]">Structured Test Schedule:</strong> Unit tests, cumulative reviews, and full-syllabus mocks.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 mt-0.5 shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <span><strong className="text-[#101828]">Granular Performance Analytics:</strong> Speed, accuracy, and topic-level weakness analysis.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 mt-0.5 shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <span><strong className="text-[#101828]">Curated eBooks & Solutions:</strong> Complete NCERT-aligned study modules and explanation PDFs.</span>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </section>


          {/* SECTION 4: AIETS PACKAGE COMPARISON (COMPACT & REFINED PROGRAM CARDS) */}
          <section id="aiets-programs" className="bg-[#F4F7FC] py-12 sm:py-14 lg:py-16 border-b border-[#DCE5F1] scroll-mt-32">
            <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center space-y-1.5 max-w-2xl mx-auto">
                <span className="text-[11px] font-extrabold text-[#2563EB] uppercase tracking-wider">Institutional Testing Curriculums</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071833] tracking-tight">
                  AIETS Package Comparison
                </h2>
                <div className="h-1 w-14 bg-gradient-to-r from-[#2563eb] to-cyan-400 rounded-full mx-auto" />
                <p className="text-xs sm:text-sm text-[#475467] pt-0.5">
                  Select the target examination program best suited for your institution's batches.
                </p>
              </div>

              {/* Package Cards Grid */}
              <div className="grid md:grid-cols-2 gap-6 items-stretch">
                {B2B_PACKAGES.map((pkg, idx) => {
                  const isFirst = idx === 0;
                  const buttonLabel = isFirst ? 'Select 2027 Program' : 'Select 2028 Program';
                  return (
                    <div
                      key={pkg.id}
                      className={`rounded-2xl border bg-white p-5 sm:p-6 space-y-4 flex flex-col justify-between shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
                        isFirst ? 'border-[#2563EB] ring-1 ring-[#2563EB]/20 relative hover:border-[#1D4ED8]' : 'border-[#DCE5F1] hover:border-blue-300'
                      }`}
                    >
                      <div className="space-y-4">
                        {/* Header Banner */}
                        <div className={`p-3 rounded-xl border ${isFirst ? 'bg-blue-50/60 border-blue-100' : 'bg-purple-50/60 border-purple-100'} flex items-center justify-between`}>
                          <div>
                            <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isFirst ? 'text-[#2563EB]' : 'text-purple-700'}`}>
                              {isFirst ? 'One-Year Program' : 'Two-Year Program'}
                            </span>
                            <h3 className="text-base sm:text-lg font-extrabold text-[#071833] mt-0.5 leading-snug">{pkg.title}</h3>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold shrink-0 ml-2 ${isFirst ? 'bg-[#2563EB] text-white' : 'bg-purple-600 text-white'}`}>
                            {pkg.target}
                          </span>
                        </div>

                        <p className="text-[11px] text-[#5D6B82] font-medium">Target: {pkg.suitableFor} • Duration: {pkg.duration}</p>

                        {/* Total Count & Rate */}
                        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE5F1] flex items-center justify-between">
                          <div>
                            <p className="text-[11px] text-[#5D6B82] font-semibold">Total Test Series Count</p>
                            <p className="text-xl font-extrabold text-[#071833]">{pkg.totalTests} CBT Tests</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] uppercase font-extrabold text-[#5D6B82]">Standard Retail Rate</p>
                            <p className="text-lg font-extrabold text-[#2563EB]">₹{pkg.baseRetailPrice.toLocaleString()} <span className="text-[11px] text-[#5D6B82] font-normal">/student</span></p>
                          </div>
                        </div>

                        {/* Test Breakdown Grid */}
                        <div className="space-y-1.5">
                          <p className="text-[11px] font-extrabold text-[#071833] uppercase tracking-wider">Curriculum Test Breakdown:</p>
                          <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
                            <div className="py-1.5 px-2.5 rounded-lg bg-blue-50/80 text-[#2563EB] border border-blue-100 flex justify-between items-center text-[11px]">
                              <span>AIETS Mocks:</span>
                              <span className="font-extrabold text-xs">{pkg.breakdown.aiets}</span>
                            </div>
                            <div className="py-1.5 px-2.5 rounded-lg bg-slate-50 text-[#071833] border border-[#DCE5F1] flex justify-between items-center text-[11px]">
                              <span>Unit Tests:</span>
                              <span className="font-extrabold text-xs">{pkg.breakdown.unitTests}</span>
                            </div>
                            <div className="py-1.5 px-2.5 rounded-lg bg-slate-50 text-[#071833] border border-[#DCE5F1] flex justify-between items-center text-[11px]">
                              <span>Part Tests:</span>
                              <span className="font-extrabold text-xs">{pkg.breakdown.partTests}</span>
                            </div>
                            <div className="py-1.5 px-2.5 rounded-lg bg-slate-50 text-[#071833] border border-[#DCE5F1] flex justify-between items-center text-[11px]">
                              <span>Cumulative Tests:</span>
                              <span className="font-extrabold text-xs">{pkg.breakdown.cumulativeTests}</span>
                            </div>
                            <div className="col-span-2 py-1.5 px-2.5 rounded-lg bg-emerald-50/80 text-emerald-800 border border-emerald-100 flex justify-between items-center text-[11px]">
                              <span>Full-Syllabus Mock Tests:</span>
                              <span className="font-extrabold text-xs">{pkg.breakdown.fullMocks}</span>
                            </div>
                          </div>
                        </div>

                        {/* Feature Bullet List */}
                        <ul className="space-y-1.5 text-[11px] sm:text-xs text-[#475467]">
                          {pkg.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Package CTAs */}
                      <div className="pt-2 space-y-1.5">
                        <button
                          type="button"
                          onClick={() => handleCalculatePricing(pkg)}
                          className="w-full rounded-xl bg-[#2563EB] hover:bg-blue-700 active:scale-[0.99] py-2.5 text-xs font-extrabold text-white transition shadow-xs cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                        >
                          <Calculator className="h-3.5 w-3.5" />
                          <span>Calculate Institutional Pricing</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleViewProgramDetails(pkg)}
                          className="w-full rounded-xl border border-[#DCE5F1] bg-white py-2 text-xs font-semibold text-[#071833] hover:bg-[#F8FAFC] hover:border-slate-400 transition cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                        >
                          <BookOpen className="h-3.5 w-3.5 text-[#2563EB]" />
                          <span>View Full Program Details</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>


          {/* SECTION 5: INSTITUTION ADVANTAGES (GRADIENT FROM #EEF5FF TO #F8FBFF) */}
          <section className="bg-gradient-to-b from-[#EEF5FF] to-[#F8FBFF] py-16 sm:py-20 lg:py-24 border-b border-[#DCE5F1]">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-wider">Institutional Advantages</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071833] tracking-tight">
                  Why Institutions Should Partner with Edvedum
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-[#2563eb] to-cyan-400 rounded-full mx-auto" />
                <p className="text-sm text-[#475467] pt-1">
                  Built specifically for Schools, Coaching Institutes, Junior Colleges, and Educational Organizations.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'National-Level Test Series', desc: '39 NTA-style practice CBT assessments curated by senior academic faculty.', icon: Award, color: 'blue', isFuture: false },
                  { title: 'AI-Based Performance Analytics', desc: 'Evaluates student speed, accuracy, question time distribution, and topic mastery.', icon: Sparkles, color: 'cyan', isFuture: false },
                  { title: 'All India Student Ranking', desc: 'Benchmarks scores nationally via AIR, State, City, and Institute rank cards.', icon: TrendingUp, color: 'purple', isFuture: false },
                  { title: 'Subject-Wise & Chapter Reports', desc: 'Granular analytics breakdown across Physics, Chemistry, Botany, and Zoology.', icon: BarChart3, color: 'emerald', isFuture: false },
                  { title: 'Curated eBooks & Study Material', desc: 'Every test includes assigned digital eBooks, formula guides, and solution PDFs.', icon: FileText, color: 'indigo', isFuture: false },
                  { title: 'Institution Performance Dashboard', desc: 'Unified admin portal to monitor attendance, test completion %, and batch progress.', icon: School, color: 'amber', isFuture: false },
                  { title: 'Bulk Student Registration', desc: 'Fast bulk student onboarding via CSV templates with auto credential generation.', icon: Users, color: 'blue', isFuture: false },
                  { title: 'Dedicated Institutional Support', desc: 'Assigned Onboarding Manager, priority technical support, and faculty guidance.', icon: UserCheck, color: 'emerald', isFuture: false },
                  { title: 'Future AI Learning Features', desc: 'Adaptive question recommendations, predictive rank algorithms, and LMS integration.', icon: ShieldCheck, color: 'purple', isFuture: true },
                ].map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-[#DCE5F1] bg-white p-6 space-y-3 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="h-1 w-full bg-gradient-to-r from-[#2563eb] to-cyan-400 absolute top-0 left-0" />
                      
                      <div className="flex items-center justify-between pt-1">
                        <div className="h-11 w-11 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-100">
                          <Icon className="h-5 w-5" />
                        </div>
                        {card.isFuture && (
                          <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 uppercase">
                            Future
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-extrabold text-[#071833]">{card.title}</h3>
                      <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">{card.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>


          {/* SECTION 6: STUDENT BENEFITS (WHITE WITH TINTED CARDS) */}
          <section className="bg-white py-16 sm:py-20 lg:py-24 border-b border-[#DCE5F1]">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-wider">Student Academic Impact</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071833] tracking-tight">
                  Student Benefits
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-[#2563eb] to-cyan-400 rounded-full mx-auto" />
                <p className="text-sm text-[#475467] pt-1">
                  What every enrolled student receives under your institutional partnership.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="rounded-3xl border border-[#DCE5F1] bg-[#F8FAFC] p-6 space-y-4 hover:-translate-y-1 transition duration-300 shadow-xs">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-100">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#071833]">Ranking & Benchmarking</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#475467]">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#2563EB] mt-0.5 shrink-0" />
                      <span>All India Rank (AIR), state, city, institution and batch ranks.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#2563EB] mt-0.5 shrink-0" />
                      <span>Test-by-test progress tracking and peer comparison.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-[#DCE5F1] bg-[#F8FAFC] p-6 space-y-4 hover:-translate-y-1 transition duration-300 shadow-xs">
                  <div className="h-12 w-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#071833]">Performance Analytics</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#475467]">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-cyan-600 mt-0.5 shrink-0" />
                      <span>Subject and chapter-wise accuracy analysis.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-cyan-600 mt-0.5 shrink-0" />
                      <span>Time management & question attempt distribution reports.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-[#DCE5F1] bg-[#F8FAFC] p-6 space-y-4 hover:-translate-y-1 transition duration-300 shadow-xs">
                  <div className="h-12 w-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#071833]">Digital Resources</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#475467]">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                      <span>Detailed step-by-step solution PDFs for every question.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                      <span>Curated eBooks, formula guides, and NCERT digital modules.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-[#DCE5F1] bg-[#F8FAFC] p-6 space-y-4 hover:-translate-y-1 transition duration-300 shadow-xs">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#071833]">Improvement Guidance</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#475467]">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>Personalized improvement & revision recommendations.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>Mentoring sessions as included in the selected package.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>


          {/* SECTION 7: PUBLIC DASHBOARD PREVIEW (GRADIENT FROM #F1F6FD TO #F7FBFF) */}
          <section className="bg-gradient-to-b from-[#F1F6FD] to-[#F7FBFF] py-16 lg:py-18 border-b border-[#DCE5F1]">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              
              {/* Section Header */}
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-wider">
                  CENTRALIZED INSTITUTION MANAGEMENT
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071833] tracking-tight">
                  See What Your Institution Can Manage
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-[#2563eb] to-cyan-400 rounded-full mx-auto" />
                <p className="text-xs sm:text-sm text-[#475467] pt-1">
                  Preview the tools available to authorized institutional partners for managing students, batches, tests, analytics and reports.
                </p>
                <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-100 text-[11px] font-bold">
                  Illustrative preview — sample data only
                </span>
              </div>

              {/* Two-Column Layout */}
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* LEFT SIDE: PRODUCT INFORMATION (~42% / 5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-4">
                    
                    {/* Feature 1 */}
                    <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#DCE5F1] shadow-xs">
                      <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB] border border-blue-100 shrink-0">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold text-[#071833]">Student and Batch Management</h4>
                        <p className="text-xs text-[#5D6B82] mt-0.5 leading-snug">Organize enrolled students, batches and login access.</p>
                      </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#DCE5F1] shadow-xs">
                      <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100 shrink-0">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold text-[#071833]">Test-Series Assignment</h4>
                        <p className="text-xs text-[#5D6B82] mt-0.5 leading-snug">Assign AIETS packages, tests and learning resources.</p>
                      </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#DCE5F1] shadow-xs">
                      <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold text-[#071833]">Performance Analytics</h4>
                        <p className="text-xs text-[#5D6B82] mt-0.5 leading-snug">Review participation, subject performance and batch progress.</p>
                      </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#DCE5F1] shadow-xs">
                      <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold text-[#071833]">Reports and Invoices</h4>
                        <p className="text-xs text-[#5D6B82] mt-0.5 leading-snug">Download institutional reports and access payment records.</p>
                      </div>
                    </div>

                  </div>

                  {/* Cleaned CTAs (One primary login-return action) */}
                  <div className="space-y-2.5 pt-1">
                    <button
                      onClick={() => scrollToHeroLogin()}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 px-6 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-md transition cursor-pointer"
                    >
                      <span>Go to Institution Login</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <p className="text-[11px] text-[#5D6B82] italic">
                      The complete dashboard is available only to authorized institutional partners.
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE: COMPACT DASHBOARD MOCKUP (~58% / 7 cols) */}
                <div className="lg:col-span-7 relative">
                  <div className="absolute -inset-2 rounded-3xl bg-blue-500/10 blur-xl opacity-60 pointer-events-none" />

                  <div className="relative rounded-3xl border border-[#DCE5F1] bg-white p-5 sm:p-6 shadow-md space-y-4 overflow-hidden">
                    {/* Top Accent Line */}
                    <div className="h-1 w-full bg-gradient-to-r from-[#2563eb] to-cyan-400 absolute top-0 left-0" />

                    {/* Header Bar */}
                    <div className="flex flex-wrap items-center justify-between border-b border-[#DCE5F1] pb-3 gap-2">
                      <div className="space-y-0.5">
                        <h3 className="text-sm font-extrabold text-[#071833] flex items-center gap-2">
                          <span>AIETS Institution Portal</span>
                          <span className="px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 text-[10px] font-bold">
                            Sample Preview
                          </span>
                        </h3>
                        <p className="text-[11px] text-[#5D6B82]">Sample Institution Workspace</p>
                      </div>
                      
                      {/* Non-Interactive Tab Nav */}
                      <div className="flex items-center gap-1 bg-[#F8FAFC] p-1 rounded-xl border border-[#DCE5F1] text-[10.5px] font-bold text-[#5D6B82]">
                        <span className="px-2.5 py-1 rounded-lg bg-white text-[#2563EB] shadow-xs border border-[#DCE5F1]">Students</span>
                        <span className="px-2 py-1">Batches</span>
                        <span className="px-2 py-1">Assignments</span>
                        <span className="px-2 py-1">Analytics</span>
                        <span className="px-2 py-1">Reports</span>
                      </div>
                    </div>

                    {/* 4 Feature Mockup Tiles */}
                    <div className="grid grid-cols-2 gap-3">
                      
                      {/* Tile 1: Student Roster */}
                      <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#DCE5F1] space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-extrabold text-[#071833] flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5 text-[#2563EB]" />
                            <span>Student Roster</span>
                          </span>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Active</span>
                        </div>
                        <div className="space-y-1.5 text-[10.5px] text-[#5D6B82]">
                          <div className="flex justify-between items-center p-1.5 rounded-lg bg-white border border-[#DCE5F1]">
                            <span className="font-medium text-[#071833]">Batch A — NEET 2027</span>
                            <span className="h-2 w-12 bg-blue-100 rounded-full overflow-hidden inline-block"><span className="h-full bg-[#2563eb] block w-[80%]" /></span>
                          </div>
                          <div className="flex justify-between items-center p-1.5 rounded-lg bg-white border border-[#DCE5F1]">
                            <span className="font-medium text-[#071833]">Batch B — JEE 2027</span>
                            <span className="h-2 w-12 bg-cyan-100 rounded-full overflow-hidden inline-block"><span className="h-full bg-cyan-500 block w-[65%]" /></span>
                          </div>
                        </div>
                      </div>

                      {/* Tile 2: Batch Progress */}
                      <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#DCE5F1] space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-extrabold text-[#071833] flex items-center gap-1.5">
                            <TrendingUp className="h-3.5 w-3.5 text-cyan-600" />
                            <span>Batch Progress</span>
                          </span>
                          <span className="text-[10px] font-mono text-[#2563EB] font-bold">100% NTA</span>
                        </div>
                        <div className="space-y-1.5 text-[10.5px] text-[#5D6B82]">
                          <div className="p-1.5 rounded-lg bg-white border border-[#DCE5F1] space-y-1">
                            <div className="flex justify-between text-[10px]">
                              <span className="font-semibold text-[#071833]">Physics Syllabus</span>
                              <span className="text-emerald-600 font-bold">Covered</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full w-[78%]" /></div>
                          </div>
                          <div className="p-1.5 rounded-lg bg-white border border-[#DCE5F1] space-y-1">
                            <div className="flex justify-between text-[10px]">
                              <span className="font-semibold text-[#071833]">Chemistry Syllabus</span>
                              <span className="text-cyan-600 font-bold">In Progress</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-cyan-500 rounded-full w-[62%]" /></div>
                          </div>
                        </div>
                      </div>

                      {/* Tile 3: Test Participation */}
                      <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#DCE5F1] space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-extrabold text-[#071833] flex items-center gap-1.5">
                            <Activity className="h-3.5 w-3.5 text-purple-600" />
                            <span>Test Participation</span>
                          </span>
                          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">Scheduled</span>
                        </div>
                        <div className="space-y-1 text-[10.5px] text-[#5D6B82]">
                          <div className="p-1.5 rounded-lg bg-white border border-[#DCE5F1] flex justify-between items-center">
                            <span className="font-semibold text-[#071833]">AIETS Mock 14</span>
                            <span className="text-[10px] font-bold text-emerald-600 font-mono">Completed</span>
                          </div>
                          <div className="p-1.5 rounded-lg bg-white border border-[#DCE5F1] flex justify-between items-center">
                            <span className="font-semibold text-[#071833]">Unit Test 08</span>
                            <span className="text-[10px] font-bold text-[#2563EB] font-mono">Upcoming</span>
                          </div>
                        </div>
                      </div>

                      {/* Tile 4: Reports & Invoices */}
                      <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#DCE5F1] space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-extrabold text-[#071833] flex items-center gap-1.5">
                            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" />
                            <span>Reports & Invoices</span>
                          </span>
                          <span className="text-[10px] font-bold text-slate-500">PDF / CSV</span>
                        </div>
                        <div className="space-y-1 text-[10.5px] text-[#5D6B82]">
                          <div className="p-1.5 rounded-lg bg-white border border-[#DCE5F1] flex justify-between items-center">
                            <span className="font-semibold text-[#071833]">Scorecard Export</span>
                            <Download className="h-3.5 w-3.5 text-[#2563EB]" />
                          </div>
                          <div className="p-1.5 rounded-lg bg-white border border-[#DCE5F1] flex justify-between items-center">
                            <span className="font-semibold text-[#071833]">GST Tax Invoice</span>
                            <Download className="h-3.5 w-3.5 text-[#2563EB]" />
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="pt-1 text-center">
                      <p className="text-[10.5px] text-[#5D6B82] italic">
                        Non-interactive sample preview — Log in to access your authorized institution portal.
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>


          {/* SECTION 8: PARTNERSHIP PROCESS (WHITE BACKGROUND) */}
          <section className="bg-white py-16 sm:py-20 lg:py-24 border-b border-[#DCE5F1]">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-wider">Seamless Onboarding</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071833] tracking-tight">
                  Partnership Process
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-[#2563eb] to-cyan-400 rounded-full mx-auto" />
                <p className="text-sm text-[#475467] pt-1">
                  Get your institution live on AIETS in four simple steps.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { step: '01', title: 'Submit Enquiry', desc: 'Fill out the partnership enquiry form with your student count and exam targets.', icon: FileText },
                  { step: '02', title: 'Schedule Demo', desc: 'Our institutional specialist delivers a personalized product walkthrough and pricing quote.', icon: Phone },
                  { step: '03', title: 'Configure Institution', desc: 'Configure institution details, package selection, and admin credentials.', icon: Building2 },
                  { step: '04', title: 'Launch AIETS', desc: 'Upload student roster via CSV, distribute logins, and start national CBT testing.', icon: RocketIcon },
                ].map((card, idx) => {
                  const Icon = card.icon || Send;
                  return (
                    <div key={idx} className="rounded-2xl border border-[#DCE5F1] bg-[#F8FAFC] p-6 space-y-3 shadow-xs hover:-translate-y-1 transition duration-300 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-[#2563EB] font-mono">{card.step}</span>
                        <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB] border border-blue-100">
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>
                      <h3 className="text-base font-extrabold text-[#071833]">{card.title}</h3>
                      <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">{card.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>


          {/* SECTION 10: INSTITUTIONAL PRICING CALCULATOR (SOFT GREY-BLUE BACKGROUND) */}
          <section id="institutional-pricing" ref={calculatorSectionRef} className="bg-[#F3F7FD] py-10 sm:py-14 lg:py-16 border-b border-[#DCE5F1] scroll-mt-20">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-wider">Transparent Bulk Pricing</span>
                <h2 ref={calculatorHeadingRef} className="text-3xl sm:text-4xl font-extrabold text-[#071833] tracking-tight outline-none focus:outline-none">
                  Institutional Pricing Calculator
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-[#2563eb] to-cyan-400 rounded-full mx-auto" />
                <p className="text-sm text-[#475467] pt-1">
                  Select your program and student capacity to calculate estimated bulk volume savings.
                </p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 rounded-3xl border border-[#DCE5F1] bg-white p-6 sm:p-8 space-y-6 shadow-sm">
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold uppercase text-[#071833]">
                      Step 1: Select Program Package
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {B2B_PACKAGES.map((pkg) => (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => setSelectedCalcPackageId(pkg.id)}
                          className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                            selectedCalcPackageId === pkg.id
                              ? 'border-[#2563EB] bg-blue-50/50 ring-2 ring-[#2563EB]/20'
                              : 'border-[#DCE5F1] bg-white hover:bg-slate-50'
                          }`}
                        >
                          <p className="text-xs font-black text-[#071833]">{pkg.target}</p>
                          <p className="text-[11px] text-[#5D6B82] mt-0.5">{pkg.totalTests} Mocks • ₹{pkg.baseRetailPrice}/std</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-extrabold uppercase text-[#071833]">
                        Step 2: Student Batch Capacity
                      </label>
                      <span className="text-lg font-black text-[#2563EB] font-mono">{calcStudentCount} Students</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="1500"
                      step="25"
                      value={calcStudentCount}
                      onChange={(e) => setCalcStudentCount(parseInt(e.target.value))}
                      className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2563eb]"
                    />
                    <div className="flex justify-between text-[11px] font-bold text-[#5D6B82] font-mono">
                      <span>50</span>
                      <span>500</span>
                      <span>1,500+ Students</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div className={`p-2.5 rounded-xl border ${calcStudentCount < 200 ? 'border-[#2563EB] bg-blue-50 font-bold text-[#2563EB]' : 'border-[#DCE5F1] text-[#5D6B82]'}`}>
                      <span>50-199</span>
                      <p className="text-[10px] font-normal">Standard Rate</p>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${calcStudentCount >= 200 && calcStudentCount < 500 ? 'border-[#2563EB] bg-blue-50 font-bold text-[#2563EB]' : 'border-[#DCE5F1] text-[#5D6B82]'}`}>
                      <span>200-499</span>
                      <p className="text-[10px] font-bold text-emerald-600">25% OFF</p>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${calcStudentCount >= 500 && calcStudentCount < 1000 ? 'border-[#2563EB] bg-blue-50 font-bold text-[#2563EB]' : 'border-[#DCE5F1] text-[#5D6B82]'}`}>
                      <span>500-999</span>
                      <p className="text-[10px] font-bold text-emerald-600">40% OFF</p>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${calcStudentCount >= 1000 ? 'border-[#2563EB] bg-blue-50 font-bold text-[#2563EB]' : 'border-[#DCE5F1] text-[#5D6B82]'}`}>
                      <span>1,000+</span>
                      <p className="text-[10px] font-bold text-emerald-600">50% OFF</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-3xl border border-[#DCE5F1] bg-white p-6 sm:p-7 shadow-md space-y-4">
                  <div className="flex justify-between items-center border-b border-[#DCE5F1] pb-3">
                    <div>
                      <h3 className="font-extrabold text-[#071833] text-base">Estimated Quotation</h3>
                      <p className="text-xs text-[#2563EB] font-bold">{calculatedQuote.tierLabel}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold font-mono">
                      Save ₹{calculatedQuote.totalSavings.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-[#5D6B82]">
                      <span>Standard Retail Subtotal:</span>
                      <span className="line-through text-slate-400">₹{calculatedQuote.retailSubtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[#071833] font-bold">
                      <span>Discounted Rate ({calcStudentCount} x ₹{calculatedQuote.discountedPricePerStudent}):</span>
                      <span className="text-[#2563EB]">₹{calculatedQuote.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[#5D6B82]">
                      <span>18% GST (HSN 9992):</span>
                      <span>₹{calculatedQuote.taxAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black pt-3 border-t border-[#DCE5F1] text-[#071833]">
                      <span>Grand Net Total (Incl. GST):</span>
                      <span className="text-emerald-600 text-base">₹{calculatedQuote.grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Continue with This Estimate Button */}
                  <button
                    type="button"
                    onClick={() =>
                      scrollToEnquiryForm({
                        interestedPackage: calculatedQuote.package.title,
                        studentCount: `${calcStudentCount} Students`,
                        targetExam: calculatedQuote.package.target.includes('2028') ? 'Both' : 'NEET',
                        message: `Requested institutional quote for ${calcStudentCount} students under ${calculatedQuote.package.title} (Est. Net Total ₹${calculatedQuote.grandTotal.toLocaleString()} incl. 18% GST).`,
                      })
                    }
                    className="w-full rounded-2xl bg-[#2563EB] hover:bg-blue-700 active:scale-[0.99] py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Continue with This Estimate</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="text-[11px] text-[#5D6B82] text-center pt-1 italic">
                    This is an estimated institutional quotation. Final pricing is subject to confirmation.
                  </p>
                </div>
              </div>
            </div>
          </section>


          {/* SECTION 11: FREQUENTLY ASKED QUESTIONS (REDESIGNED ACCORDION WITH GRADIENT BACKDROP) */}
          <section className="bg-gradient-to-b from-[#EEF5FF] to-[#F8FAFF] py-20 lg:py-24 border-b border-[#DCE5F1]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
              <div className="text-center space-y-2">
                <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-wider">Got Questions?</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071833] tracking-tight">
                  Frequently Asked Questions
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-[#2563eb] to-cyan-400 rounded-full mx-auto" />
                <p className="text-sm text-[#475467] pt-1">
                  Everything you need to know about AIETS institutional partnerships and onboarding.
                </p>
              </div>

              {/* Accordion Container with Generous Spacing */}
              <div className="space-y-3.5">
                {visibleFaqs.map((faq, idx) => {
                  const isOpen = faqOpen === idx;
                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isOpen
                          ? 'border-[#2563EB] border-l-4 border-l-[#2563EB] bg-[#F4F8FF] shadow-sm'
                          : 'border-[#DCE5F1] bg-white hover:border-[#2563EB]/40 shadow-xs'
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${idx}`}
                        onClick={() => setFaqOpen(isOpen ? null : idx)}
                        className="w-full text-left px-6 py-4.5 min-h-[64px] flex items-center justify-between gap-4 font-extrabold text-[#071833] text-base sm:text-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                      >
                        <span className="leading-snug">{faq.q}</span>
                        <div className={`h-8 w-8 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-100 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#2563EB] text-white' : ''}`}>
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </button>

                      {isOpen && (
                        <div id={`faq-answer-${idx}`} className="px-6 pb-6 pt-2 text-sm sm:text-base text-[#475467] leading-[1.65] border-t border-[#DCE5F1]/60">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* View More / Fewer FAQs Button */}
              {B2B_FAQS.length > 6 && (
                <div className="text-center pt-2">
                  <button
                    onClick={() => setShowAllFaqs(!showAllFaqs)}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#DCE5F1] bg-white px-6 py-3 text-xs sm:text-sm font-extrabold text-[#071833] hover:bg-blue-50 hover:text-[#2563EB] hover:border-blue-200 transition cursor-pointer shadow-xs"
                  >
                    <span>{showAllFaqs ? 'Show Fewer Questions' : 'View 3 More Questions'}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showAllFaqs ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              )}
            </div>
          </section>


          {/* SECTION 12: INSTITUTIONAL PARTNERSHIP ENQUIRY FORM (FINAL CONVERSION POINT) */}
          <section ref={enquiryFormRef} id="partnership-form" className="bg-[#F5F8FD] py-16 sm:py-20 lg:py-24 border-b border-[#DCE5F1] scroll-mt-32">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                
                {/* LEFT SIDE: BRAND NARRATIVE & CONTACT DETAILS */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-wider">Get Started Today</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071833] tracking-tight leading-tight">
                      Let’s Build a Stronger Testing Program Together
                    </h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-[#2563eb] to-cyan-400 rounded-full" />
                  </div>

                  <p className="text-sm text-[#475467] leading-relaxed">
                    Transform your institution's results with NTA-style CBT mock assessments, All India Ranks, and real-time student performance analytics.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-xl bg-blue-50 text-[#2563EB] border border-blue-100 mt-0.5 shrink-0">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-[#071833]">Tailored Volume Quotation</h4>
                        <p className="text-xs text-[#5D6B82]">Custom pricing quotes structured specifically for your student capacity.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100 mt-0.5 shrink-0">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-[#071833]">Personalized Live Demo</h4>
                        <p className="text-xs text-[#5D6B82]">Interactive walkthrough of student tests & admin dashboard management.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 mt-0.5 shrink-0">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-[#071833]">Dedicated Account Specialist</h4>
                        <p className="text-xs text-[#5D6B82]">Assigned onboarding manager for student roster import and setup.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-[#DCE5F1] space-y-2 shadow-xs">
                    <p className="text-xs font-extrabold text-[#071833]">Need Direct Institutional Support?</p>
                    <p className="text-xs text-[#475467]">
                      Email: <a href="mailto:support@edvedum.com" className="text-[#2563EB] font-bold hover:underline">support@edvedum.com</a>
                    </p>
                    <p className="text-xs text-[#475467]">
                      Phone: <a href="tel:18003383386" className="text-[#2563EB] font-bold hover:underline">1800-EDVEDUM (3383386)</a>
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE: 12-FIELD ENQUIRY FORM CARD */}
                <div className="lg:col-span-7">
                  <div className="rounded-3xl border border-[#DCE5F1] bg-white p-7 sm:p-9 shadow-md space-y-5 relative">
                    <div className="border-b border-[#DCE5F1] pb-4">
                      <h3 className="text-xl font-extrabold text-[#071833]">
                        Institutional Partnership Application
                      </h3>
                      <p className="text-xs text-[#5D6B82] mt-0.5">
                        Please fill out all required fields marked with an asterisk (*).
                      </p>
                    </div>

                    {formSuccess ? (
                      <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
                        <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                          <CheckCircle2 className="h-9 w-9" />
                        </div>
                        <div className="space-y-1">
                          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-mono font-extrabold">
                            Reference #: {enquiryRefCode || 'ENQ-2026-CONFIRMED'}
                          </span>
                          <h3 className="text-xl font-bold text-[#071833] pt-1">Application Submitted Successfully!</h3>
                        </div>
                        <p className="text-xs sm:text-sm text-[#475467] max-w-md mx-auto leading-relaxed">
                          Thank you for submitting your institutional application. An Edvedum Institutional Partnership Specialist will review your request and contact your team within 24 hours.
                        </p>
                        <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#DCE5F1] max-w-md mx-auto text-left text-xs space-y-1 font-mono">
                          <div className="flex justify-between text-[#5D6B82]">
                            <span>Program:</span>
                            <span className="font-bold text-[#071833]">{enquiryForm.interestedPackage}</span>
                          </div>
                          <div className="flex justify-between text-[#5D6B82]">
                            <span>Students:</span>
                            <span className="font-bold text-[#071833]">{enquiryForm.studentCount}</span>
                          </div>
                          <div className="flex justify-between text-[#5D6B82]">
                            <span>Estimated Total:</span>
                            <span className="font-bold text-emerald-600">₹{calculatedQuote.grandTotal.toLocaleString()}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormSuccess(false)}
                          className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition cursor-pointer"
                        >
                          Submit Another Enquiry
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleEnquirySubmit} className="space-y-4">
                        {formError && (
                          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-bold text-rose-700 text-center">
                            {formError}
                          </div>
                        )}

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-[#071833] mb-1">
                              1. Institution Name *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Apex Educational Academy"
                              value={enquiryForm.institutionName}
                              onChange={(e) => setEnquiryForm({ ...enquiryForm, institutionName: e.target.value })}
                              className="w-full rounded-xl border border-[#DCE5F1] bg-[#F8FAFC] px-3.5 py-2.5 text-xs text-[#071833] focus:border-[#2563eb] focus:bg-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#071833] mb-1">
                              2. Contact Person *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Dr. Ramesh Sharma"
                              value={enquiryForm.contactPerson}
                              onChange={(e) => setEnquiryForm({ ...enquiryForm, contactPerson: e.target.value })}
                              className="w-full rounded-xl border border-[#DCE5F1] bg-[#F8FAFC] px-3.5 py-2.5 text-xs text-[#071833] focus:border-[#2563eb] focus:bg-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-[#071833] mb-1">
                              3. Designation
                            </label>
                            <select
                              value={enquiryForm.designation}
                              onChange={(e) => setEnquiryForm({ ...enquiryForm, designation: e.target.value })}
                              className="w-full rounded-xl border border-[#DCE5F1] bg-[#F8FAFC] px-3 py-2.5 text-xs text-[#071833] focus:border-[#2563eb] focus:bg-white focus:outline-none"
                            >
                              <option value="Principal">Principal / Vice Principal</option>
                              <option value="Director">Managing Director / Owner</option>
                              <option value="Academic Head">Academic Head / HOD</option>
                              <option value="Trustee">School Trustee / Administrator</option>
                              <option value="Teacher">Senior Faculty / Teacher</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#071833] mb-1">
                              4. Mobile Number *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="+91 98765 43210"
                              value={enquiryForm.mobileNumber}
                              onChange={(e) => setEnquiryForm({ ...enquiryForm, mobileNumber: e.target.value })}
                              className="w-full rounded-xl border border-[#DCE5F1] bg-[#F8FAFC] px-3.5 py-2.5 text-xs text-[#071833] focus:border-[#2563eb] focus:bg-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#071833] mb-1">
                              5. Official Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="principal@institution.edu.in"
                              value={enquiryForm.email}
                              onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                              className="w-full rounded-xl border border-[#DCE5F1] bg-[#F8FAFC] px-3.5 py-2.5 text-xs text-[#071833] focus:border-[#2563eb] focus:bg-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-[#071833] mb-1">
                              6. City *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. New Delhi"
                              value={enquiryForm.city}
                              onChange={(e) => setEnquiryForm({ ...enquiryForm, city: e.target.value })}
                              className="w-full rounded-xl border border-[#DCE5F1] bg-[#F8FAFC] px-3.5 py-2.5 text-xs text-[#071833] focus:border-[#2563eb] focus:bg-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#071833] mb-1">
                              7. State *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Delhi NCR"
                              value={enquiryForm.state}
                              onChange={(e) => setEnquiryForm({ ...enquiryForm, state: e.target.value })}
                              className="w-full rounded-xl border border-[#DCE5F1] bg-[#F8FAFC] px-3.5 py-2.5 text-xs text-[#071833] focus:border-[#2563eb] focus:bg-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-[#071833] mb-1">
                              8. Institution Type
                            </label>
                            <select
                              value={enquiryForm.institutionType}
                              onChange={(e) => setEnquiryForm({ ...enquiryForm, institutionType: e.target.value })}
                              className="w-full rounded-xl border border-[#DCE5F1] bg-[#F8FAFC] px-3 py-2.5 text-xs text-[#071833] focus:border-[#2563eb] focus:bg-white focus:outline-none"
                            >
                              {INSTITUTION_TYPES.map((t) => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#071833] mb-1">
                              9. Number of Students
                            </label>
                            <select
                              value={enquiryForm.studentCount}
                              onChange={(e) => setEnquiryForm({ ...enquiryForm, studentCount: e.target.value })}
                              className="w-full rounded-xl border border-[#DCE5F1] bg-[#F8FAFC] px-3 py-2.5 text-xs text-[#071833] focus:border-[#2563eb] focus:bg-white focus:outline-none"
                            >
                              <option value="50-100">50 - 100 Students</option>
                              <option value="100-300">100 - 300 Students</option>
                              <option value="300-500">300 - 500 Students</option>
                              <option value="500+">500+ Students</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#071833] mb-1">
                              10. Target Examination
                            </label>
                            <select
                              value={enquiryForm.targetExam}
                              onChange={(e) => setEnquiryForm({ ...enquiryForm, targetExam: e.target.value })}
                              className="w-full rounded-xl border border-[#DCE5F1] bg-[#F8FAFC] px-3 py-2.5 text-xs text-[#071833] focus:border-[#2563eb] focus:bg-white focus:outline-none"
                            >
                              {TARGET_EXAMINATIONS.map((exam) => (
                                <option key={exam} value={exam}>{exam}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#071833] mb-1">
                            11. Interested Package
                          </label>
                          <select
                            value={enquiryForm.interestedPackage}
                            onChange={(e) => setEnquiryForm({ ...enquiryForm, interestedPackage: e.target.value })}
                            className="w-full rounded-xl border border-[#DCE5F1] bg-[#F8FAFC] px-3 py-2.5 text-xs text-[#071833] focus:border-[#2563eb] focus:bg-white focus:outline-none"
                          >
                            {INTERESTED_PACKAGES.map((pkg) => (
                              <option key={pkg} value={pkg}>{pkg}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#071833] mb-1">
                            12. Message / Requirements
                          </label>
                          <textarea
                            rows="2"
                            placeholder="Mention any specific requirements, timing, or questions..."
                            value={enquiryForm.message}
                            onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                            className="w-full rounded-xl border border-[#DCE5F1] bg-[#F8FAFC] px-3.5 py-2.5 text-xs text-[#071833] focus:border-[#2563eb] focus:bg-white focus:outline-none"
                          />
                        </div>

                        {/* Consent Checkbox */}
                        <div className="pt-2 flex items-start gap-2.5">
                          <input
                            id="consent-check"
                            type="checkbox"
                            required
                            checked={enquiryForm.consent}
                            onChange={(e) => setEnquiryForm({ ...enquiryForm, consent: e.target.checked })}
                            className="mt-0.5 h-4 w-4 rounded border-[#DCE5F1] text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                          />
                          <label htmlFor="consent-check" className="text-xs text-[#475467] leading-snug cursor-pointer">
                            I agree to be contacted by Edvedum Academy regarding this institutional enquiry. *
                          </label>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={formSubmitting}
                          className="w-full mt-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-md transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {formSubmitting ? (
                            <>
                              <Spinner className="h-4 w-4 text-white" />
                              <span>Submitting Application...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Institutional Partnership Application</span>
                              <Send className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </section>

        </div>
      )}

    </div>
  );
}

function RocketIcon(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12c0 0-4.03.54-7.58 3.55M15.59 14.37A14.98 14.98 0 013.47 2.25c0 0 .54 4.03 3.55 7.58" />
    </svg>
  );
}
