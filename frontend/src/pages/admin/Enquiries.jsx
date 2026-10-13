import React, { useEffect, useState, useMemo } from 'react';
import {
  PhoneCall,
  MessageCircle,
  Mail,
  Search,
  Filter,
  Download,
  RotateCcw,
  Clock,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  UserX,
  Copy,
  Check,
  ChevronRight,
  Calendar,
  BookOpen,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Edit3,
  Trash2,
  X,
  Send,
  Building,
  User
} from 'lucide-react';
import { enquiryService } from '../../lib/services.js';
import { useToast } from '../../context/ToastContext.jsx';
import { AdminHeader } from '../../components/admin/AdminUI.jsx';
import { Spinner } from '../../components/ui.jsx';

const STATUS_CONFIG = {
  new: {
    label: 'New Lead',
    bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    dot: 'bg-amber-500 animate-pulse',
    icon: AlertCircle,
  },
  contacted: {
    label: 'Contacted',
    bg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30',
    dot: 'bg-sky-500',
    icon: PhoneCall,
  },
  follow_up: {
    label: 'Follow Up',
    bg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    dot: 'bg-purple-500',
    icon: Clock,
  },
  enrolled: {
    label: 'Enrolled',
    bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    dot: 'bg-emerald-500',
    icon: UserCheck,
  },
  closed: {
    label: 'Closed / Lost',
    bg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30',
    dot: 'bg-slate-400',
    icon: UserX,
  },
};

const EXAM_OPTIONS = ['All', 'NEET', 'JEE Main', 'JEE Advanced', 'Foundation', 'Other'];
const CLASS_OPTIONS = ['All', 'Class 9', 'Class 10', 'Class 11', 'Class 12', '12th Pass / Dropper'];

export default function Enquiries() {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [enquiries, setEnquiries] = useState([]);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState({
    totalCount: 0,
    newCount: 0,
    contactedCount: 0,
    followUpCount: 0,
    enrolledCount: 0,
    closedCount: 0,
  });

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [examFilter, setExamFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');
  const [page, setPage] = useState(1);
  const limit = 25;

  // Modals & Action states
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [editNotes, setEditNotes] = useState('');
  const [editStatus, setEditStatus] = useState('new');
  const [savingNotes, setSavingNotes] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const params = {
        search: search.trim() || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        exam: examFilter !== 'All' ? examFilter : undefined,
        studentClass: classFilter !== 'All' ? classFilter : undefined,
        page,
        limit,
      };

      const res = await enquiryService.listEnquiries(params);
      setEnquiries(res.enquiries || []);
      setTotal(res.total || 0);
      if (res.stats) {
        setStats(res.stats);
      }
    } catch (err) {
      toast.error('Unable to load student enquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [search, statusFilter, examFilter, classFilter, page]);

  const handleCopyPhone = (phone, id) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    toast.success('Mobile number copied to clipboard');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const openNotesModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setEditNotes(enquiry.notes || '');
    setEditStatus(enquiry.status || 'new');
    setNotesModalOpen(true);
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    try {
      setSavingNotes(true);
      const res = await enquiryService.updateEnquiry(selectedEnquiry.id, {
        status: editStatus,
        notes: editNotes.trim(),
        last_contacted_at: editStatus !== 'new' ? new Date().toISOString() : undefined,
      });

      toast.success('Enquiry updated successfully');
      setNotesModalOpen(false);

      // Refresh list & local state
      setEnquiries((prev) =>
        prev.map((item) => (item.id === selectedEnquiry.id ? res.enquiry : item))
      );
      fetchEnquiries();
    } catch (err) {
      toast.error('Failed to update enquiry notes.');
    } finally {
      setSavingNotes(false);
    }
  };

  const handleQuickStatusChange = async (enquiry, newStatus) => {
    try {
      const res = await enquiryService.updateEnquiry(enquiry.id, {
        status: newStatus,
        last_contacted_at: newStatus !== 'new' ? new Date().toISOString() : undefined,
      });

      toast.success(`Status updated to ${STATUS_CONFIG[newStatus]?.label || newStatus}`);
      setEnquiries((prev) =>
        prev.map((item) => (item.id === enquiry.id ? res.enquiry : item))
      );
      fetchEnquiries();
    } catch (err) {
      toast.error('Failed to update status.');
    }
  };

  const handleDeleteEnquiry = async (id) => {
    try {
      setDeleting(true);
      await enquiryService.deleteEnquiry(id);
      toast.success('Enquiry record deleted.');
      setDeleteConfirmId(null);
      fetchEnquiries();
    } catch (err) {
      toast.error('Failed to delete enquiry.');
    } finally {
      setDeleting(false);
    }
  };

  const handleExportCSV = () => {
    if (!enquiries.length) {
      toast.error('No enquiries to export.');
      return;
    }

    const headers = [
      'Reference No',
      'Student Name',
      'Mobile',
      'Email',
      'Current Class',
      'Target Exam',
      'Status',
      'Notes',
      'Last Contacted',
      'Submitted Date',
    ];

    const rows = enquiries.map((e) => [
      `"${e.reference_no || ''}"`,
      `"${(e.student_name || '').replace(/"/g, '""')}"`,
      `"${e.mobile || ''}"`,
      `"${e.email || ''}"`,
      `"${e.student_class || ''}"`,
      `"${e.target_exam || ''}"`,
      `"${e.status || ''}"`,
      `"${(e.notes || '').replace(/"/g, '""')}"`,
      `"${e.last_contacted_at ? new Date(e.last_contacted_at).toLocaleString('en-IN') : 'Not contacted'}"`,
      `"${e.created_at ? new Date(e.created_at).toLocaleString('en-IN') : ''}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `edvedum_student_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Enquiries exported to CSV.');
  };

  // WhatsApp message builder
  const getWhatsAppLink = (enquiry) => {
    const cleanPhone = String(enquiry.mobile || '').replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
    const name = enquiry.student_name || 'Student';
    const target = enquiry.target_exam || 'NEET / JEE preparation';
    const message = `Hello ${name}! Greetings from EDVEDUM Academy. We received your study goal enquiry regarding ${target}. Our academic counsellors are available to guide you regarding batches, test series and study material. When would be a convenient time to speak?`;
    return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* 1. Header with Breadcrumbs & Top Actions */}
      <AdminHeader
        title="Student Enquiries & Leads"
        subtitle="Live enquiries submitted by students visiting the platform. Instant phone dialer, WhatsApp messaging, and counselling follow-up tracker."
        breadcrumbs={['Management', 'Enquiries']}
        status={`${stats.newCount} New`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Download className="h-3.5 w-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={fetchEnquiries}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
            >
              <RotateCcw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        }
      />

      {/* 2. Metric Rail / KPI Overview */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div
          onClick={() => setStatusFilter('all')}
          className={`cursor-pointer rounded-2xl border p-4 transition-all ${
            statusFilter === 'all'
              ? 'border-blue-500/40 bg-blue-50/50 dark:bg-blue-950/20 shadow-sm ring-1 ring-blue-500/20'
              : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-[#0F172A]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Enquiries
            </span>
            <User className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            {stats.totalCount}
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 truncate">
            All registered visitor leads
          </p>
        </div>

        <div
          onClick={() => setStatusFilter('new')}
          className={`cursor-pointer rounded-2xl border p-4 transition-all ${
            statusFilter === 'new'
              ? 'border-amber-500/40 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm ring-1 ring-amber-500/20'
              : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-[#0F172A]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              New / Pending
            </span>
            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          </div>
          <div className="mt-2 text-2xl font-black text-amber-600 dark:text-amber-400">
            {stats.newCount}
          </div>
          <p className="mt-1 text-[11px] text-amber-600/80 dark:text-amber-400/80 truncate">
            Requires initial call / message
          </p>
        </div>

        <div
          onClick={() => setStatusFilter('contacted')}
          className={`cursor-pointer rounded-2xl border p-4 transition-all ${
            statusFilter === 'contacted'
              ? 'border-sky-500/40 bg-sky-50/50 dark:bg-sky-950/20 shadow-sm ring-1 ring-sky-500/20'
              : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-[#0F172A]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Contacted
            </span>
            <PhoneCall className="h-4 w-4 text-sky-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-sky-600 dark:text-sky-400">
            {stats.contactedCount}
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 truncate">
            Counselling in progress
          </p>
        </div>

        <div
          onClick={() => setStatusFilter('follow_up')}
          className={`cursor-pointer rounded-2xl border p-4 transition-all ${
            statusFilter === 'follow_up'
              ? 'border-purple-500/40 bg-purple-50/50 dark:bg-purple-950/20 shadow-sm ring-1 ring-purple-500/20'
              : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-[#0F172A]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Follow-Up
            </span>
            <Clock className="h-4 w-4 text-purple-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-purple-600 dark:text-purple-400">
            {stats.followUpCount}
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 truncate">
            Scheduled callback / decision
          </p>
        </div>

        <div
          onClick={() => setStatusFilter('enrolled')}
          className={`cursor-pointer rounded-2xl border p-4 transition-all ${
            statusFilter === 'enrolled'
              ? 'border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm ring-1 ring-emerald-500/20'
              : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-[#0F172A]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Enrolled / Converted
            </span>
            <UserCheck className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {stats.enrolledCount}
          </div>
          <p className="mt-1 text-[11px] text-emerald-600/80 dark:text-emerald-400/80 truncate">
            Successfully admitted
          </p>
        </div>
      </div>

      {/* 3. Filters & Search Toolbar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#0F172A]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by student name, phone, email, reference code or notes..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-blue-500"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Exam Dropdown */}
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <BookOpen className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={examFilter}
                onChange={(e) => {
                  setExamFilter(e.target.value);
                  setPage(1);
                }}
                className="bg-transparent outline-none cursor-pointer text-xs font-medium"
              >
                {EXAM_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="dark:bg-slate-900">
                    {opt === 'All' ? 'All Exams' : opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Class Dropdown */}
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={classFilter}
                onChange={(e) => {
                  setClassFilter(e.target.value);
                  setPage(1);
                }}
                className="bg-transparent outline-none cursor-pointer text-xs font-medium"
              >
                {CLASS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="dark:bg-slate-900">
                    {opt === 'All' ? 'All Classes' : opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Dropdown */}
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="bg-transparent outline-none cursor-pointer text-xs font-medium"
              >
                <option value="all" className="dark:bg-slate-900">All Statuses</option>
                <option value="new" className="dark:bg-slate-900">New Leads</option>
                <option value="contacted" className="dark:bg-slate-900">Contacted</option>
                <option value="follow_up" className="dark:bg-slate-900">Follow-Up Needed</option>
                <option value="enrolled" className="dark:bg-slate-900">Enrolled</option>
                <option value="closed" className="dark:bg-slate-900">Closed / Lost</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Main Enquiries List / Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0F172A]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Spinner size="lg" />
            <p className="mt-3 text-xs font-medium">Fetching student enquiries...</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <PhoneCall className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
              No Student Enquiries Found
            </h3>
            <p className="mt-1 max-w-sm text-xs text-slate-500 dark:text-slate-400">
              {search || statusFilter !== 'all' || examFilter !== 'All' || classFilter !== 'All'
                ? 'No enquiries match the selected filters. Try clearing search keywords or resetting filters.'
                : 'Whenever visitors fill the "Tell us about your study goals" popup on the website, their contact details and study targets will appear right here.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/75 dark:border-slate-800 dark:bg-slate-900/50">
                  <th className="py-3.5 px-4 font-bold text-slate-600 dark:text-slate-400">Student & Ref</th>
                  <th className="py-3.5 px-4 font-bold text-slate-600 dark:text-slate-400">Contact Actions</th>
                  <th className="py-3.5 px-4 font-bold text-slate-600 dark:text-slate-400">Target Goal</th>
                  <th className="py-3.5 px-4 font-bold text-slate-600 dark:text-slate-400">Status</th>
                  <th className="py-3.5 px-4 font-bold text-slate-600 dark:text-slate-400">Follow-up Notes</th>
                  <th className="py-3.5 px-4 font-bold text-slate-600 dark:text-slate-400">Submitted</th>
                  <th className="py-3.5 px-4 text-right font-bold text-slate-600 dark:text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {enquiries.map((enquiry) => {
                  const statusInfo = STATUS_CONFIG[enquiry.status] || STATUS_CONFIG.new;
                  const cleanPhone = String(enquiry.mobile || '').replace(/\D/g, '');
                  const waUrl = getWhatsAppLink(enquiry);

                  return (
                    <tr
                      key={enquiry.id}
                      className="group transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-900/40"
                    >
                      {/* 1. Student Name & Ref */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 font-bold text-white shadow-sm shadow-blue-500/20 text-xs">
                            {enquiry.student_name ? enquiry.student_name.slice(0, 2).toUpperCase() : 'ST'}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <span>{enquiry.student_name}</span>
                              {enquiry.source === 'first_visit_popup' && (
                                <span className="rounded bg-blue-50 px-1.5 py-0.2 text-[9px] font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                                  Visitor
                                </span>
                              )}
                            </div>
                            <div className="font-mono text-[10px] text-slate-400">
                              {enquiry.reference_no}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Direct Contact Buttons */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1.5">
                          {/* Phone + Dial + WhatsApp */}
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                              +91 {cleanPhone}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyPhone(cleanPhone, enquiry.id)}
                              className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition"
                              title="Copy number"
                            >
                              {copiedId === enquiry.id ? (
                                <Check className="h-3 w-3 text-emerald-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                          </div>

                          {/* Quick Action Badges */}
                          <div className="flex items-center gap-1.5">
                            {/* Call Button */}
                            <a
                              href={`tel:${cleanPhone}`}
                              className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 transition hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/60"
                              title="Initiate phone call"
                            >
                              <PhoneCall className="h-2.5 w-2.5" />
                              <span>Call</span>
                            </a>

                            {/* WhatsApp Button */}
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-900/60"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="h-2.5 w-2.5" />
                              <span>WhatsApp</span>
                            </a>

                            {/* Email Button */}
                            {enquiry.email && (
                              <a
                                href={`mailto:${enquiry.email}`}
                                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                                title={`Send email to ${enquiry.email}`}
                              >
                                <Mail className="h-2.5 w-2.5" />
                                <span>Email</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 3. Target Exam & Class */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <span className="inline-block rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                            {enquiry.target_exam || 'General'}
                          </span>
                          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                            {enquiry.student_class || 'Not specified'}
                          </div>
                        </div>
                      </td>

                      {/* 4. Status Selector */}
                      <td className="py-3.5 px-4">
                        <div className="relative inline-block">
                          <select
                            value={enquiry.status || 'new'}
                            onChange={(e) => handleQuickStatusChange(enquiry, e.target.value)}
                            className={`rounded-lg border px-2.5 py-1 text-[11px] font-bold outline-none cursor-pointer transition ${statusInfo.bg}`}
                          >
                            <option value="new" className="text-slate-900 dark:bg-slate-900 dark:text-white">New Lead</option>
                            <option value="contacted" className="text-slate-900 dark:bg-slate-900 dark:text-white">Contacted</option>
                            <option value="follow_up" className="text-slate-900 dark:bg-slate-900 dark:text-white">Follow Up</option>
                            <option value="enrolled" className="text-slate-900 dark:bg-slate-900 dark:text-white">Enrolled</option>
                            <option value="closed" className="text-slate-900 dark:bg-slate-900 dark:text-white">Closed / Lost</option>
                          </select>
                        </div>
                      </td>

                      {/* 5. Notes & Follow-Up Snippet */}
                      <td className="py-3.5 px-4 max-w-[200px]">
                        {enquiry.notes ? (
                          <div
                            onClick={() => openNotesModal(enquiry)}
                            className="cursor-pointer group/note"
                          >
                            <p className="line-clamp-2 text-[11px] text-slate-700 dark:text-slate-300 group-hover/note:text-blue-600 transition">
                              {enquiry.notes}
                            </p>
                            {enquiry.last_contacted_at && (
                              <span className="text-[9px] text-slate-400">
                                Contacted: {new Date(enquiry.last_contacted_at).toLocaleDateString('en-IN')}
                              </span>
                            )}
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openNotesModal(enquiry)}
                            className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                          >
                            <Edit3 className="h-3 w-3" />
                            <span>Add notes</span>
                          </button>
                        )}
                      </td>

                      {/* 6. Submitted Timestamp */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 dark:text-slate-400">
                        <div>
                          {enquiry.created_at
                            ? new Date(enquiry.created_at).toLocaleDateString('en-IN', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : 'N/A'}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {enquiry.created_at
                            ? new Date(enquiry.created_at).toLocaleTimeString('en-IN', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : ''}
                        </div>
                      </td>

                      {/* 7. Action Buttons */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openNotesModal(enquiry)}
                            className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                            title="Edit notes & details"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(enquiry.id)}
                            className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-400 shadow-sm transition hover:bg-rose-50 hover:text-rose-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-rose-950/30 dark:hover:text-rose-400"
                            title="Delete enquiry"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. Notes & Full Details Modal */}
      {notesModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-[#0F172A]">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-500/20">
                  {selectedEnquiry.student_name ? selectedEnquiry.student_name.slice(0, 2).toUpperCase() : 'ST'}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {selectedEnquiry.student_name}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    Ref: {selectedEnquiry.reference_no}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNotesModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Contact Buttons inside Modal */}
            <div className="my-4 grid grid-cols-2 gap-2.5">
              <a
                href={`tel:${String(selectedEnquiry.mobile).replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span>Call {selectedEnquiry.mobile}</span>
              </a>
              <a
                href={getWhatsAppLink(selectedEnquiry)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp Student</span>
              </a>
            </div>

            {/* Student Enquiry Meta Details */}
            <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3.5 text-xs dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Target Exam</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  {selectedEnquiry.target_exam || 'General'}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Current Class</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  {selectedEnquiry.student_class || 'Not specified'}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Email Address</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 truncate">
                  {selectedEnquiry.email || 'None provided'}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Submission Date</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  {selectedEnquiry.created_at
                    ? new Date(selectedEnquiry.created_at).toLocaleString('en-IN')
                    : 'N/A'}
                </p>
              </div>
            </div>

            {/* Status Dropdown */}
            <div className="mb-4">
              <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-200">
                Enquiry Status
              </label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value="new">New Lead (Pending Call)</option>
                <option value="contacted">Contacted (In Discussion)</option>
                <option value="follow_up">Follow Up (Scheduled Callback)</option>
                <option value="enrolled">Enrolled / Converted (Admitted)</option>
                <option value="closed">Closed / Lost (Not interested / Invalid)</option>
              </select>
            </div>

            {/* Counsellor Follow-up Notes */}
            <div className="mb-5">
              <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-200">
                Counsellor Remarks & Call Notes
              </label>
              <textarea
                rows={4}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Write notes from your phone call or WhatsApp conversation (e.g. parent is looking for NEET 2026 crash course, wants 10% discount on mock test series, scheduled follow-up for Saturday)..."
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white resize-none"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setNotesModalOpen(false)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={savingNotes}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
              >
                {savingNotes ? (
                  <>
                    <RotateCcw className="h-3.5 w-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Enquiry Notes</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-[#0F172A]">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
              <Trash2 className="h-5 w-5" />
            </div>
            <h4 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
              Delete Enquiry?
            </h4>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              This action cannot be undone. The enquiry record will be permanently deleted from the database.
            </p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteEnquiry(deleteConfirmId)}
                disabled={deleting}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-rose-700 disabled:opacity-60"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
