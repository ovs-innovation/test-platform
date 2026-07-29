import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  Building2,
  GraduationCap,
  Users,
  CheckCircle2,
  BarChart3,
  ArrowRight,
  Lock,
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
  ChevronDown
} from 'lucide-react';
import { getPartnerSchools, submitSchoolDemoLead } from '../../lib/schoolStore.js';
import { EDVEDUM_LOGO, EDVEDUM_LOGO_ALT } from '../../data/edvedumContent.js';

export default function SchoolsB2B() {
  // State
  const [activeSchool, setActiveSchool] = useState(null); // null when logged out
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null); // For detail modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showRankingModal, setShowRankingModal] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (showDemoModal || showAddModal || selectedStudent || showRankingModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showDemoModal, showAddModal, selectedStudent, showRankingModal]);



  // Search & Filter State inside Dashboard
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Interactive Pricing Calculator State
  const [calcStudentCount, setCalcStudentCount] = useState(250);

  // New Student Form State

  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentRoll, setNewStudentRoll] = useState('');
  const [newStudentCourse, setNewStudentCourse] = useState('JEE Main & Advanced');

  // Schedule Demo Form State
  const [demoForm, setDemoForm] = useState({
    institutionName: '',
    contactName: '',
    designation: 'Principal',
    mobileNumber: '',
    email: '',
    city: '',
    state: '',
    institutionType: 'School',
    studentCount: '100-300',
    targetExam: 'NEET 2027 (1-Yr ₹1,999)',
    message: '',
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const handleDemoSubmit = (e) => {
    e?.preventDefault();
    const inst = demoForm.institutionName || demoForm.schoolName || '';
    const mail = demoForm.email || '';
    const phone = demoForm.mobileNumber || demoForm.phone || '';
    if (!inst.trim() || !mail.trim() || !phone.trim()) return;
    submitSchoolDemoLead({
      schoolName: inst,
      contactName: demoForm.contactName,
      designation: demoForm.designation,
      email: mail,
      phone: phone,
      city: demoForm.city,
      state: demoForm.state,
      institutionType: demoForm.institutionType,
      studentCount: demoForm.studentCount,
      preferredCourse: demoForm.targetExam,
      message: demoForm.message,
    });
    setDemoSubmitted(true);
  };


  // Handle Login

  const handleLoginSubmit = (e) => {
    e?.preventDefault();
    setLoginError('');

    const input = loginId.trim().toLowerCase();
    const pass = loginPassword.trim();

    const schoolsList = getPartnerSchools();
    const matched = schoolsList.find(
      (s) => (s.schoolId.toLowerCase() === input || s.email.toLowerCase() === input) && s.password === pass
    );

    if (matched) {
      setActiveSchool(matched);
      setLoginError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setLoginError('Invalid School ID or Password. Check your Admin Panel (/admin/schools) or try one of the quick demo buttons below.');
    }
  };

  // Quick Demo Login Handler
  const handleQuickLogin = (schoolKey) => {
    const schoolsList = getPartnerSchools();
    const school = schoolsList.find((s) => s.id === schoolKey || s.schoolId.toLowerCase().includes(schoolKey));
    if (school) {
      setLoginId(school.schoolId);
      setLoginPassword(school.password);
      setActiveSchool(school);
      setLoginError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  // Smooth Scroll to Login Card with Sticky Header Offset
  const scrollToLogin = (e) => {
    e?.preventDefault();
    const el = document.getElementById('school-login');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Logout Handler
  const handleLogout = () => {

    setActiveSchool(null);
    setLoginId('');
    setLoginPassword('');
    setSelectedStudent(null);
  };

  // Add Student Handler
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentRoll.trim()) return;

    const newObj = {
      id: `STU-${Date.now().toString().slice(-4)}`,
      name: newStudentName.trim(),
      rollNo: newStudentRoll.trim(),
      course: newStudentCourse,
      progress: 0,
      testsCount: 0,
      avgScore: 0,
      lastActive: 'Just now',
      status: 'Active',
      physics: 0,
      chemistry: 0,
      math: newStudentCourse.includes('JEE') ? 0 : null,
      biology: newStudentCourse.includes('NEET') ? 0 : null,
    };

    setActiveSchool((prev) => ({
      ...prev,
      activeStudents: prev.activeStudents + 1,
      activeCount: prev.activeCount + 1,
      students: [newObj, ...prev.students],
    }));

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

  return (
    <div className="min-h-screen bg-[#010d1f] text-slate-100 selection:bg-cyan-500 selection:text-slate-900 font-sans">

      {/* =========================================================================
          IF LOGGED IN: DISPLAY MULTI-TENANT SCHOOL DASHBOARD
         ========================================================================= */}
      {activeSchool ? (
        <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">

          {/* 1. CUSTOM BRANDED SCHOOL HEADER */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Ambient Lighting Gradient based on School Accent */}
            <div
              className="absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ backgroundColor: activeSchool.accentColor }}
            />

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
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-slate-400">
                        No student records match the filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* STUDENT PERFORMANCE REPORT MODAL */}
          {selectedStudent && createPortal(
            <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">




              <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 font-extrabold border border-cyan-500/20">
                      {selectedStudent.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-white text-base">{selectedStudent.name}</h3>
                      <p className="text-xs text-slate-400 font-mono">{selectedStudent.rollNo} • {selectedStudent.course}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Score Summary */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Overall Progress</p>
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

                {/* Subject Breakdown */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Subject Performance Analysis</p>
                  <div className="space-y-2">
                    {selectedStudent.physics !== null && (
                      <div className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                        <span className="font-bold text-slate-300">Physics & Mechanics</span>
                        <span className="font-black text-cyan-400">{selectedStudent.physics}%</span>
                      </div>
                    )}
                    {selectedStudent.chemistry !== null && (
                      <div className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                        <span className="font-bold text-slate-300">Organic & Physical Chemistry</span>
                        <span className="font-black text-purple-400">{selectedStudent.chemistry}%</span>
                      </div>
                    )}
                    {selectedStudent.math !== null && selectedStudent.math !== undefined && (
                      <div className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                        <span className="font-bold text-slate-300">Mathematics & Calculus</span>
                        <span className="font-black text-blue-400">{selectedStudent.math}%</span>
                      </div>
                    )}
                    {selectedStudent.biology !== null && selectedStudent.biology !== undefined && (
                      <div className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                        <span className="font-bold text-slate-300">Biology & Zoology</span>
                        <span className="font-black text-emerald-400">{selectedStudent.biology}%</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700"
                  >
                    Close Report
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )}

          {/* STUDENT RANKING LEADERBOARD MODAL */}
          {showRankingModal && createPortal(
            <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
              <div className="w-full max-w-2xl rounded-3xl border border-[#C5A059]/40 bg-[#0b1329] p-6 sm:p-7 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-white text-lg">Student Ranking Leaderboard</h3>
                      <p className="text-xs text-slate-400 font-medium">{activeSchool?.name} • All India & School Benchmarking</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowRankingModal(false)}
                    className="text-slate-400 hover:text-white p-1 rounded-lg"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="w-full max-w-full overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="border-b border-slate-800 bg-slate-950/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      <tr>
                        <th className="py-3 px-3">School Rank</th>
                        <th className="py-3 px-3">Student Name</th>
                        <th className="py-3 px-3">Course Stream</th>
                        <th className="py-3 px-3">Avg Accuracy</th>
                        <th className="py-3 px-3">Estimated AIR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {activeSchool?.students
                        ?.slice()
                        .sort((a, b) => b.avgScore - a.avgScore)
                        .map((st, idx) => (
                          <tr key={st.id} className="hover:bg-slate-900/60 transition">
                            <td className="py-3 px-3">
                              <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg font-black text-xs ${
                                idx === 0 ? 'bg-amber-500 text-slate-950 font-mono' : idx === 1 ? 'bg-slate-300 text-slate-950 font-mono' : idx === 2 ? 'bg-amber-700 text-white font-mono' : 'bg-slate-800 text-slate-300'
                              }`}>
                                #{idx + 1}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-extrabold text-white">{st.name}</td>
                            <td className="py-3 px-3 text-slate-300">{st.course}</td>
                            <td className="py-3 px-3 font-black text-emerald-400">{st.avgScore}%</td>
                            <td className="py-3 px-3 font-mono font-bold text-cyan-400">AIR {(idx + 1) * 142 + 18}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => setShowRankingModal(false)}
                    className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700 transition"
                  >
                    Close Leaderboard
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )}


          {/* ADD STUDENT MODAL */}
          {showAddModal && createPortal(
            <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">




              <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="font-extrabold text-white text-base">Enroll New Candidate</h3>
                  <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleAddStudent} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Student Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Institutional Roll Number</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2026-DPS-109"
                      value={newStudentRoll}
                      onChange={(e) => setNewStudentRoll(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Assigned Course Stream</label>
                    <select
                      value={newStudentCourse}
                      onChange={(e) => setNewStudentCourse(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="JEE Main & Advanced">JEE Main & Advanced</option>
                      <option value="NEET UG">NEET UG</option>
                      <option value="Foundation (Class 10)">Foundation (Class 10)</option>
                      <option value="Foundation (Class 9)">Foundation (Class 9)</option>
                    </select>
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 text-xs font-bold text-white shadow-md hover:scale-105 transition"
                    >
                      Confirm Enrollment
                    </button>
                  </div>
                </form>
              </div>
            </div>,
            document.body
          )}


        </div>
      ) : (

        /* =========================================================================
            IF LOGGED OUT: B2B LANDING PAGE & SCHOOL ADMIN LOGIN FORM
           ========================================================================= */
        <div className="space-y-16 pb-20">

          {/* 1. B2B HERO SECTION */}
          <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-800/80">
            {/* Ambient Background Glows */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />
            <div className="absolute top-40 right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00F0FF]/40 bg-slate-950/80 px-4 py-1.5 backdrop-blur-xl shadow-lg">
                <span className="h-2 w-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] animate-pulse" />
                <span className="text-xs font-bold tracking-wider text-[#00F0FF] uppercase">
                  B2B & INSTITUTIONAL PARTNERSHIPS 2026
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
                Power Your School’s Results with <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  NTA-Pattern CBT Test Series
                </span>
              </h1>

              {/* Subheadline */}
              <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
                Empower your students with India’s most accurate NTA CBT exam simulator. Get bulk institutional pricing, custom-branded student portals, and a unified school admin dashboard.
              </p>

              {/* CTA Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#school-login"
                  onClick={scrollToLogin}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-8 py-3.5 text-base font-bold text-white shadow-[0_0_30px_rgba(37,99,235,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >

                  <School className="h-5 w-5" />
                  <span>School Admin Login ↓</span>
                </a>
                <button
                  onClick={() => setShowDemoModal(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-cyan-400/50 bg-slate-900/80 px-8 py-3.5 text-base font-bold text-slate-200 backdrop-blur-xl hover:border-cyan-400 hover:text-white transition"
                >
                  <Building2 className="h-5 w-5 text-cyan-400" />
                  <span>Schedule School Demo</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-bold text-slate-400 border-t border-slate-800/80 max-w-3xl mx-auto">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>100+ Partner Schools & Colleges</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>NTA Compliant Exam Interface</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Dedicated Institution Support</span>
                </div>
              </div>
            </div>
          </section>

          {/* 2. INSTITUTIONAL PARTNERSHIP ADVANTAGES (9 CARDS) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">Institutional Advantages</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Why Partner with Edvedum Academy?
              </h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                Built specifically for Schools, Coaching Institutes, Junior Colleges, and Educational Organizations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-300 space-y-3">
                <div className="h-10 w-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="text-base font-extrabold text-white">National-Level Test Series</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  39 NTA-compliant CBT assessments (14 AIETS, 12 Unit Tests, 4 Part Tests, 2 Cumulative, 7 Full Mocks).
                </p>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl hover:border-blue-500/50 transition-all duration-300 space-y-3">
                <div className="h-10 w-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-base font-extrabold text-white">AI-Based Performance Analytics</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  AI algorithms evaluate speed, accuracy, question time distribution, and topic mastery.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-300 space-y-3">
                <div className="h-10 w-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="text-base font-extrabold text-white">All India Student Ranking</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Students benchmark performance nationally via AIR, State Rank, City Rank, and Institute Rank.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl hover:border-amber-500/50 transition-all duration-300 space-y-3">
                <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <h3 className="text-base font-extrabold text-white">Detailed Subject & Chapter Reports</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Granular breakdown across Physics, Chemistry, Botany, and Zoology chapters.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-300 space-y-3">
                <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-base font-extrabold text-white">Curated eBooks & Study Material</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every test includes assigned digital eBooks, formula guides, and solution PDFs.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl hover:border-[#00F0FF]/50 transition-all duration-300 space-y-3">
                <div className="h-10 w-10 rounded-2xl bg-[#00F0FF]/10 text-[#00F0FF] flex items-center justify-center border border-[#00F0FF]/20">
                  <School className="h-5 w-5" />
                </div>
                <h3 className="text-base font-extrabold text-white">Institute Performance Dashboard</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Unified school portal to monitor attendance, test completion %, and batch progress.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl hover:border-indigo-500/50 transition-all duration-300 space-y-3">
                <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-base font-extrabold text-white">Bulk Student Registration</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  1-click bulk student upload via Excel/CSV templates with auto credential generation.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl hover:border-rose-500/50 transition-all duration-300 space-y-3">
                <div className="h-10 w-10 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
                  <UserCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-extrabold text-white">Dedicated Institutional Support</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dedicated Onboarding Manager, priority technical support, and faculty assistance.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl hover:border-yellow-500/50 transition-all duration-300 space-y-3">
                <div className="h-10 w-10 rounded-2xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center border border-yellow-500/20">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-extrabold text-white">Future AI Learning Features</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Adaptive AI question recommendations, predictive rank algorithms, and LMS integration.
                </p>
              </div>
            </div>
          </section>


          {/* 2.5 BENEFITS FOR STUDENTS */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">Student Academic Impact</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Empower Every Student with AIETS
              </h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                What every enrolled student receives under your institutional partnership.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/40 space-y-3">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 w-fit border border-blue-500/20">
                  <Award className="h-5 w-5" />
                </div>
                <h4 className="text-base font-extrabold text-white">National & School Ranks</h4>
                <p className="text-xs text-slate-400 leading-relaxed">All India Rank (AIR), State Rank, City Rank, and Institute Rank after every test.</p>
              </div>

              <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/40 space-y-3">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit border border-cyan-500/20">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <h4 className="text-base font-extrabold text-white">Subject & Chapter Analytics</h4>
                <p className="text-xs text-slate-400 leading-relaxed">In-depth strength & weakness breakdown across Physics, Chemistry, Botany & Zoology.</p>
              </div>

              <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/40 space-y-3">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 w-fit border border-purple-500/20">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h4 className="text-base font-extrabold text-white">1-on-1 Mentoring Sessions</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Personalized 1-on-1 review session for every test to address weak topics.</p>
              </div>

              <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/40 space-y-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 w-fit border border-amber-500/20">
                  <FileText className="h-5 w-5" />
                </div>
                <h4 className="text-base font-extrabold text-white">Curated eBooks & PDFs</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Access to premium digital study modules, formula books, and solution PDFs.</p>
              </div>
            </div>
          </section>

          {/* 2.6 PARTNERSHIP PROCESS */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Seamless Onboarding</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                How Institutional Partnership Works
              </h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                Get your school live on AIETS in 4 simple steps.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/50 space-y-3 relative">
                <span className="text-2xl font-black text-cyan-400 font-mono">01</span>
                <h4 className="text-base font-extrabold text-white">Submit Enquiry</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Fill out the institutional partnership form with your student capacity & exam targets.</p>
              </div>

              <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/50 space-y-3 relative">
                <span className="text-2xl font-black text-blue-400 font-mono">02</span>
                <h4 className="text-base font-extrabold text-white">Schedule Demo</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Our institutional specialist delivers a live product walkthrough & custom pricing quote.</p>
              </div>

              <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/50 space-y-3 relative">
                <span className="text-2xl font-black text-purple-400 font-mono">03</span>
                <h4 className="text-base font-extrabold text-white">Onboard Institution</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Receive your branded school admin portal & bulk-upload student roster via CSV.</p>
              </div>

              <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/50 space-y-3 relative">
                <span className="text-2xl font-black text-emerald-400 font-mono">04</span>
                <h4 className="text-base font-extrabold text-white">Launch AIETS</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Students begin scheduled CBT tests, AIR ranking, and 1-on-1 mentoring sessions.</p>
              </div>
            </div>
          </section>

          {/* 2.7 CALL-TO-ACTION BUTTONS BAR */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-blue-900/80 via-slate-900 to-purple-900/80 border border-blue-500/30 p-8 sm:p-10 text-center space-y-6 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-black text-white">Ready to Partner with Edvedum Academy?</h2>
              <p className="text-sm text-slate-300 max-w-xl mx-auto">
                Transform your school's competitive exam results with national AIR benchmarking and AI analytics.
              </p>

              {/* 4 Explicit CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowDemoModal(true)}
                  className="rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3 text-xs sm:text-sm font-extrabold text-white shadow-lg hover:scale-105 transition cursor-pointer"
                >
                  🤝 Become a Partner
                </button>
                <button
                  onClick={() => setShowDemoModal(true)}
                  className="rounded-full border border-cyan-400/50 bg-cyan-500/10 px-6 py-3 text-xs sm:text-sm font-extrabold text-cyan-300 hover:bg-cyan-500/20 transition cursor-pointer"
                >
                  📅 Request a Demo
                </button>
                <button
                  onClick={() => setShowDemoModal(true)}
                  className="rounded-full border border-purple-400/50 bg-purple-500/10 px-6 py-3 text-xs sm:text-sm font-extrabold text-purple-300 hover:bg-purple-500/20 transition cursor-pointer"
                >
                  💬 Contact Partnership Team
                </button>
                <button
                  onClick={() => setShowDemoModal(true)}
                  className="rounded-full border border-[#C5A059]/60 bg-[#C5A059]/10 px-6 py-3 text-xs sm:text-sm font-extrabold text-[#C5A059] hover:bg-[#C5A059]/20 transition cursor-pointer"
                >
                  🏷️ Get Institutional Pricing
                </button>
              </div>
            </div>
          </section>

          {/* 2.7.5 FLEXIBLE BULK PRICING & VOLUME DISCOUNT CALCULATOR */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Flexible B2B Pricing Structure</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Bulk Volume Discounts & Tiered Savings
              </h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                Standard retail price is ₹1,999 per student. Select your institution's batch capacity to calculate instant bulk savings.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Left 7 cols: Interactive Volume Slider & Price Tiers */}
              <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">Enrolled Student Capacity</label>
                    <span className="text-xl font-black text-cyan-400 font-mono">{calcStudentCount} Students</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1500"
                    step="25"
                    value={calcStudentCount}
                    onChange={(e) => setCalcStudentCount(parseInt(e.target.value))}
                    className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[11px] font-bold text-slate-500 font-mono">
                    <span>50 Students</span>
                    <span>500 Students</span>
                    <span>1,500+ Students</span>
                  </div>
                </div>

                {/* Tier Badges Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className={`p-3 rounded-2xl border transition ${calcStudentCount < 200 ? 'border-cyan-400 bg-cyan-500/10 text-white' : 'border-slate-800 bg-slate-950/60 text-slate-400'}`}>
                    <p className="text-[10px] font-extrabold uppercase">50 - 199</p>
                    <p className="text-sm font-black mt-1">₹1,999 <span className="text-[10px] font-normal">/std</span></p>
                    <span className="text-[9px] text-slate-400">Standard Rate</span>
                  </div>
                  <div className={`p-3 rounded-2xl border transition ${calcStudentCount >= 200 && calcStudentCount < 500 ? 'border-cyan-400 bg-cyan-500/10 text-white' : 'border-slate-800 bg-slate-950/60 text-slate-400'}`}>
                    <p className="text-[10px] font-extrabold uppercase text-cyan-400">200 - 499</p>
                    <p className="text-sm font-black mt-1">₹1,499 <span className="text-[10px] font-normal">/std</span></p>
                    <span className="text-[9px] text-emerald-400 font-bold">25% OFF</span>
                  </div>
                  <div className={`p-3 rounded-2xl border transition ${calcStudentCount >= 500 && calcStudentCount < 1000 ? 'border-cyan-400 bg-cyan-500/10 text-white' : 'border-slate-800 bg-slate-950/60 text-slate-400'}`}>
                    <p className="text-[10px] font-extrabold uppercase text-purple-400">500 - 999</p>
                    <p className="text-sm font-black mt-1">₹1,199 <span className="text-[10px] font-normal">/std</span></p>
                    <span className="text-[9px] text-emerald-400 font-bold">40% OFF</span>
                  </div>
                  <div className={`p-3 rounded-2xl border transition ${calcStudentCount >= 1000 ? 'border-cyan-400 bg-cyan-500/10 text-white' : 'border-slate-800 bg-slate-950/60 text-slate-400'}`}>
                    <p className="text-[10px] font-extrabold uppercase text-amber-400">1,000+</p>
                    <p className="text-sm font-black mt-1">₹999 <span className="text-[10px] font-normal">/std</span></p>
                    <span className="text-[9px] text-emerald-400 font-bold">50% OFF</span>
                  </div>
                </div>
              </div>

              {/* Right 5 cols: Billing Breakdown Summary Card */}
              {(() => {
                let rate = 1999;
                let tierDiscount = '0%';
                if (calcStudentCount >= 1000) { rate = 999; tierDiscount = '50% Bulk Tier'; }
                else if (calcStudentCount >= 500) { rate = 1199; tierDiscount = '40% Bulk Tier'; }
                else if (calcStudentCount >= 200) { rate = 1499; tierDiscount = '25% Bulk Tier'; }

                const subtotal = calcStudentCount * rate;
                const retailTotal = calcStudentCount * 1999;
                const totalSaved = retailTotal - subtotal;
                const gst = Math.round(subtotal * 0.18);
                const grandTotal = subtotal + gst;

                return (
                  <div className="lg:col-span-5 rounded-3xl border border-[#C5A059]/40 bg-gradient-to-b from-[#111c38] to-[#0a1226] p-6 sm:p-7 shadow-2xl space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="font-extrabold text-white text-base">Estimated Institutional Quote</h3>
                        <p className="text-xs text-[#C5A059] font-bold">Applied: {tierDiscount}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold font-mono">
                        Save ₹{totalSaved.toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-slate-400">
                        <span>Retail Standard Cost ({calcStudentCount} x ₹1,999):</span>
                        <span className="line-through text-slate-500">₹{retailTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-white font-bold">
                        <span>Bulk Discounted Price ({calcStudentCount} x ₹{rate}):</span>
                        <span className="text-cyan-400">₹{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>GST (18% HSN 9992):</span>
                        <span>₹{gst.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm font-black pt-2 border-t border-slate-800 text-white">
                        <span>Grand Net Total (Incl. GST):</span>
                        <span className="text-emerald-400 text-base">₹{grandTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowDemoModal(true)}
                      className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-xs font-black text-white shadow-lg shadow-blue-500/25 hover:scale-102 transition cursor-pointer"
                    >
                      🚀 Lock Bulk Institutional Quote
                    </button>
                  </div>
                );
              })()}
            </div>
          </section>

          {/* 2.8 FREQUENTLY ASKED QUESTIONS (FAQ) */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8 sm:space-y-10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-400 uppercase tracking-wider shadow-sm">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Got Questions?</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Frequently Asked <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Everything you need to know about AIETS institutional partnerships, student onboarding, and bulk pricing.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {[
                { q: 'What is AIETS and how does it benefit our institution?', a: 'AIETS (All India Edvedum Test Series) is our flagship national-level CBT assessment program designed specifically according to NTA NEET & JEE patterns. It provides your institution with national AIR benchmarking, student performance analytics, and custom-branded reports.' },
                { q: 'How does bulk student registration work?', a: 'Once your institution is onboarded, you get access to your School Admin Portal. You can upload student lists via Excel/CSV templates in seconds, auto-generate enrollment IDs, and assign test series packages.' },
                { q: 'Can we get custom pricing for our school?', a: 'Yes! We offer bulk volume discounts ranging up to 65% off retail pricing based on your student batch size and course requirements.' },
                { q: 'Are 1-on-1 sessions included for every student?', a: 'Yes, every test in the AIETS package includes a dedicated 1-on-1 performance review session with our academic mentors.' },
                { q: 'How quickly can our school start testing?', a: 'Account setup and onboarding take less than 24 hours. Your team can upload students and start tests immediately.' }
              ].map((faq, idx) => {
                const isOpen = faqOpen === idx;
                return (
                  <div
                    key={idx}
                    className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'border-cyan-500/40 bg-slate-900/90 shadow-[0_0_30px_rgba(6,182,212,0.12)]'
                        : 'border-slate-800/90 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/80'
                    }`}
                  >
                    <button
                      onClick={() => setFaqOpen(isOpen ? null : idx)}
                      className="w-full text-left px-6 py-5 sm:px-7 sm:py-6 flex items-center justify-between gap-4 font-extrabold text-white text-sm sm:text-base cursor-pointer transition-colors"
                    >
                      <span className={`transition-colors duration-200 ${isOpen ? 'text-cyan-400' : 'group-hover:text-cyan-300'}`}>
                        {faq.q}
                      </span>
                      <div
                        className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rotate-180'
                            : 'bg-slate-800/80 text-slate-400 border border-slate-700/50 group-hover:bg-slate-800 group-hover:text-white'
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 sm:px-7 sm:pb-7 animate-in fade-in duration-200">
                        <div className="pt-4 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {faq.a}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>





          {/* 3. SCHOOL ADMIN LOGIN SECTION */}
          <section id="school-login" className="scroll-mt-28 max-w-xl mx-auto px-4 sm:px-6">

            <div className="rounded-3xl border border-cyan-500/30 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,240,255,0.1)] space-y-6 relative overflow-hidden">

              {/* Card Header */}
              <div className="text-center space-y-2">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg mx-auto">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-white">School Admin Portal Login</h2>
                <p className="text-xs text-slate-400">
                  Access your institutional student roster, performance metrics, and license keys.
                </p>
              </div>

              {/* Error Alert */}
              {loginError && (
                <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs font-bold text-rose-300 text-center animate-in fade-in">
                  {loginError}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    School ID or Registered Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. DPS-DELHI-2026 or principal@dps.ac.in"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 py-3 pl-10 pr-4 text-xs font-medium text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Admin Password
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 py-3 pl-10 pr-4 text-xs font-medium text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
                >
                  Access School Dashboard →
                </button>
              </form>

              {/* QUICK MULTI-TENANT DEMO SELECTOR */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    ⚡ Quick Demo Login (Test Multi-Tenancy)
                  </span>
                  <span className="text-[10px] text-cyan-400 font-bold">1-Click Login</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('dps')}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 transition cursor-pointer text-center"
                  >
                    <span className="font-extrabold text-xs">DPS Delhi</span>
                    <span className="text-[9px] text-slate-400 mt-0.5">250 Students</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('allen')}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 transition cursor-pointer text-center"
                  >
                    <span className="font-extrabold text-xs">Allen Kota</span>
                    <span className="text-[9px] text-slate-400 mt-0.5">500 Students</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('xaviers')}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 transition cursor-pointer text-center"
                  >
                    <span className="font-extrabold text-xs">St. Xavier's</span>
                    <span className="text-[9px] text-slate-400 mt-0.5">150 Students</span>
                  </button>
                </div>
              </div>

            </div>
          </section>

          {/* DEMO SCHEDULE MODAL */}
          {showDemoModal && createPortal(
            <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">

              <div className="w-full max-w-2xl rounded-3xl border border-cyan-500/30 bg-[#0b1329] p-6 sm:p-8 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <School className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-white text-base">Institutional Partnership Enquiry Form</h3>
                      <p className="text-[11px] text-slate-400 font-medium">Custom Volume Pricing & Demo Setup</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowDemoModal(false);
                      setDemoSubmitted(false);
                    }}
                    className="text-slate-400 hover:text-white p-1 rounded-lg transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {demoSubmitted ? (
                  <div className="py-6 text-center space-y-3 animate-in zoom-in-95">
                    <div className="h-14 w-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Application Received!</h4>
                    <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed font-medium">
                      Thank you! Our Master Admin Panel has received your details. An Institutional Partnership Manager will contact you shortly.
                    </p>
                    <button
                      onClick={() => {
                        setShowDemoModal(false);
                        setDemoSubmitted(false);
                      }}
                      className="rounded-xl bg-slate-800 px-5 py-2 text-xs font-bold text-white hover:bg-slate-700 transition"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleDemoSubmit} className="space-y-3.5">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          1. Institution Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Delhi Public School / Chaitanya Academy"
                          value={demoForm.institutionName}
                          onChange={(e) => setDemoForm({ ...demoForm, institutionName: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2 text-xs font-semibold text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          2. Contact Person *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. Ramesh Sharma"
                          value={demoForm.contactName}
                          onChange={(e) => setDemoForm({ ...demoForm, contactName: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2 text-xs font-semibold text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          3. Designation
                        </label>
                        <select
                          value={demoForm.designation}
                          onChange={(e) => setDemoForm({ ...demoForm, designation: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2 text-xs font-semibold text-white focus:border-cyan-400 focus:outline-none transition"
                        >
                          <option value="Principal">Principal / Vice Principal</option>
                          <option value="Director">Managing Director / Owner</option>
                          <option value="Academic Head">Academic Head / HOD</option>
                          <option value="Trustee">School Trustee / Administrator</option>
                          <option value="Teacher">Senior Teacher / Faculty</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          4. Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={demoForm.mobileNumber}
                          onChange={(e) => setDemoForm({ ...demoForm, mobileNumber: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2 text-xs font-semibold text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          5. Official Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="principal@school.edu.in"
                          value={demoForm.email}
                          onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2 text-xs font-semibold text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          6. City *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. New Delhi / Kota / Jaipur"
                          value={demoForm.city}
                          onChange={(e) => setDemoForm({ ...demoForm, city: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2 text-xs font-semibold text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          7. State *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Delhi NCR / Rajasthan"
                          value={demoForm.state}
                          onChange={(e) => setDemoForm({ ...demoForm, state: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2 text-xs font-semibold text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          8. Institution Type
                        </label>
                        <select
                          value={demoForm.institutionType}
                          onChange={(e) => setDemoForm({ ...demoForm, institutionType: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2 text-xs font-semibold text-white focus:border-cyan-400 focus:outline-none transition"
                        >
                          <option value="School">K-12 School</option>
                          <option value="Coaching Institute">Coaching Institute</option>
                          <option value="College">Junior College</option>
                          <option value="Educational NGO">Educational NGO</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          9. Number of Students
                        </label>
                        <select
                          value={demoForm.studentCount}
                          onChange={(e) => setDemoForm({ ...demoForm, studentCount: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2 text-xs font-semibold text-white focus:border-cyan-400 focus:outline-none transition"
                        >
                          <option value="50-100">50 - 100 Students</option>
                          <option value="100-300">100 - 300 Students</option>
                          <option value="300-500">300 - 500 Students</option>
                          <option value="500+">500+ Students</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          10. Target Examination
                        </label>
                        <select
                          value={demoForm.targetExam}
                          onChange={(e) => setDemoForm({ ...demoForm, targetExam: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2 text-xs font-semibold text-white focus:border-cyan-400 focus:outline-none transition"
                        >
                          <option value="NEET 2027 (1-Yr ₹1,999)">NEET 2027 (1-Yr ₹1,999)</option>
                          <option value="NEET 2028 (2-Yr ₹3,999)">NEET 2028 (2-Yr ₹3,999)</option>
                          <option value="JEE Main & Advanced">JEE Main & Advanced</option>
                          <option value="Both NEET & JEE">Both NEET & JEE</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        11. Message / Special Requirements
                      </label>
                      <textarea
                        rows="2"
                        placeholder="Mention any custom pricing, branding, proctoring, or demo timing requests..."
                        value={demoForm.message}
                        onChange={(e) => setDemoForm({ ...demoForm, message: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2 text-xs font-semibold text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 py-3.5 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer"
                    >
                      🚀 Submit Institutional Partnership Application
                    </button>
                  </form>
                )}
              </div>

            </div>,
            document.body
          )}




        </div>
      )}

    </div>
  );
}
