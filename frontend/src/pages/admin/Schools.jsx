import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  getPartnerSchools,
  addPartnerSchool,
  deletePartnerSchool,
  getDemoLeads,
  updateLeadStatus,
  deleteLead
} from '../../lib/schoolStore.js';
import {
  Building2,
  Plus,
  Search,
  Key,
  Mail,
  School,
  Users,
  CheckCircle2,
  ExternalLink,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Sparkles,
  X,
  Phone,
  Inbox,
  Check,
  FileText
} from 'lucide-react';

import { Badge } from '../../components/ui.jsx';


export default function Schools() {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedSchoolInvoice, setSelectedSchoolInvoice] = useState(null);
  const [leadNotes, setLeadNotes] = useState({});
  const [newNote, setNewNote] = useState('');
  const [showPasswords, setShowPasswords] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showAddModal || selectedLead || selectedSchoolInvoice) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showAddModal, selectedLead, selectedSchoolInvoice]);



  // Form State for New School
  const [formData, setFormData] = useState({
    name: '',
    schoolId: '',
    email: '',
    password: '',
    tagline: 'Premier Educational Institution',
    logoBadge: '',
    logoUrl: '',
    totalLicenses: '200',
    accentColor: '#2563eb',
  });

  const [leads, setLeads] = useState([]);

  useEffect(() => {
    setSchools(getPartnerSchools());
    setLeads(getDemoLeads());
  }, []);

  const handleApproveLead = (lead) => {
    setFormData({
      name: lead.schoolName,
      schoolId: `${lead.schoolName.substring(0, 4).toUpperCase()}-2026`,
      email: lead.email,
      password: 'password123',
      tagline: 'Premier Educational Institution',
      logoBadge: lead.schoolName.substring(0, 3).toUpperCase(),
      logoUrl: '',
      totalLicenses: lead.studentCount || '250',
      accentColor: '#2563eb',
    });
    setShowAddModal(true);
  };

  const handleLeadStatus = (id, newStatus) => {
    const updated = updateLeadStatus(id, newStatus);
    setLeads(updated);
  };

  const handleDeleteLead = (id) => {
    if (window.confirm('Delete this demo request lead?')) {
      const updated = deleteLead(id);
      setLeads(updated);
    }
  };


  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setFormData((prev) => ({
        ...prev,
        logoUrl: uploadEvent.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = (text, id) => {

    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const togglePasswordVisibility = (id) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.schoolId.trim() || !formData.email.trim() || !formData.password.trim()) return;

    const badge = formData.logoBadge.trim() || formData.name.trim().substring(0, 3).toUpperCase();
    const updated = addPartnerSchool({ ...formData, logoBadge: badge });
    setSchools(updated);

    // Reset Form & Close Modal
    setFormData({
      name: '',
      schoolId: '',
      email: '',
      password: '',
      tagline: 'Premier Educational Institution',
      logoBadge: '',
      logoUrl: '',
      totalLicenses: '200',
      accentColor: '#2563eb',
    });
    setShowAddModal(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" partner school?`)) {
      const updated = deletePartnerSchool(id);
      setSchools(updated);
    }
  };

  const filteredSchools = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.schoolId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalLicensesCount = schools.reduce((acc, s) => acc + Number(s.totalLicenses || 0), 0);
  const totalActiveStudentsCount = schools.reduce((acc, s) => acc + Number(s.activeStudents || 0), 0);

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">

      {/* 1. Header Banner */}
      <div className="rounded-2xl p-6 sm:p-7 border border-slate-200/90 bg-white dark:border-slate-800 dark:bg-[#111827] shadow-xs">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <School className="h-3.5 w-3.5" />
                Institutional B2B Management
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Partner Schools & Coaching Centers
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Create and manage partner school accounts, assign student license limits, and set custom school branding logos.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition cursor-pointer shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>+ Add Partner School</span>
          </button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="rounded-2xl border border-slate-200/90 bg-white dark:border-slate-800 dark:bg-[#111827] p-5 shadow-xs">
          <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Partner Schools</p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">{schools.length}</p>
          <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">Active Institutions</p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white dark:border-slate-800 dark:bg-[#111827] p-5 shadow-xs">
          <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Issued Licenses</p>
          <p className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 mt-1">{totalLicensesCount.toLocaleString()}</p>
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-1">Total Student Slots</p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white dark:border-slate-800 dark:bg-[#111827] p-5 shadow-xs">
          <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Enrolled Students</p>
          <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{totalActiveStudentsCount.toLocaleString()}</p>
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-1">Active Student Accounts</p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white dark:border-slate-800 dark:bg-[#111827] p-5 shadow-xs">
          <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Utilization Rate</p>
          <p className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 mt-1">
            {totalLicensesCount > 0 ? ((totalActiveStudentsCount / totalLicensesCount) * 100).toFixed(1) : 0}%
          </p>
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-1">License Capacity Used</p>
        </div>
      </div>

      {/* 2.5 INCOMING DEMO REQUESTS & LEADS */}
      <div className="rounded-2xl border border-blue-100 bg-white dark:border-slate-800 dark:bg-[#111827] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-cyan-500/10 dark:text-cyan-400 border border-blue-100 dark:border-cyan-500/20">
              <Inbox className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Incoming School Demo Requests</span>
                <span className="rounded-full bg-blue-50 text-blue-700 dark:bg-cyan-500/20 dark:text-cyan-300 px-2.5 py-0.5 text-xs font-bold border border-blue-200 dark:border-cyan-500/30">
                  {leads.length} Leads Received
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Real-time leads submitted via Schedule Demo form on the B2B portal.</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-full overflow-x-auto min-w-0">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
              <tr>
                <th className="py-3 px-4">School & Contact Person</th>
                <th className="py-3 px-4">Official Email & Phone</th>
                <th className="py-3 px-4">Target Capacity</th>
                <th className="py-3 px-4">Request Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">{lead.schoolName}</p>
                        <p className="text-[11px] text-blue-600 dark:text-cyan-400 font-semibold">{lead.contactName}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                          <Mail className="h-3 w-3 text-slate-400" />
                          <span>{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                          <Phone className="h-3 w-3 text-slate-400" />
                          <span>{lead.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-200">
                      {lead.studentCount} Students
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-medium text-[11px]">
                      {lead.createdAt}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleLeadStatus(lead.id, e.target.value)}
                        className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-[11px] font-extrabold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                      >
                        <option value="New Request">🟢 New Request</option>
                        <option value="Contacted">🔵 Contacted</option>
                        <option value="Demo Scheduled">🟣 Demo Scheduled</option>
                        <option value="Converted">⭐ Converted</option>
                        <option value="Rejected">🔴 Rejected</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedLead(lead)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                          title="View Lead Details & Notes"
                        >
                          <Eye className="h-3.5 w-3.5 text-blue-500" />
                          <span>Inspect</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApproveLead(lead)}
                          className="inline-flex items-center gap-1 rounded-lg bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-[11px] font-bold text-white shadow-xs transition cursor-pointer"
                          title="Pre-fill & Approve Account"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Convert</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition"
                          title="Delete Lead"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-500 font-medium">
                    No new school demo requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


      {/* 3. Partner Schools Roster Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white dark:border-slate-800 dark:bg-[#111827] p-6 shadow-xs space-y-5">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Onboarded Partner Schools</span>
              <span className="rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 px-2.5 py-0.5 text-xs font-bold border border-blue-200 dark:border-blue-500/20">
                {filteredSchools.length}
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Manage institutional credentials and access permissions.</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search school name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pl-9 pr-3 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Table */}
        <div className="w-full max-w-full overflow-x-auto min-w-0">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <tr>
                <th className="py-3.5 px-4">School Logo & Institution Name</th>
                <th className="py-3.5 px-4">School Code / ID</th>
                <th className="py-3.5 px-4">Admin Email</th>
                <th className="py-3.5 px-4">Password</th>
                <th className="py-3.5 px-4">License Capacity</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredSchools.length > 0 ? (
                filteredSchools.map((school) => (
                  <tr key={school.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition">
                    {/* Logo & Name */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3.5">
                        {/* Render Custom Logo Image or Emblem Badge */}
                        {school.logoUrl ? (
                          <img
                            src={school.logoUrl}
                            alt={school.name}
                            className="h-11 w-11 rounded-xl object-contain border border-slate-200 dark:border-slate-800 bg-white p-1 shrink-0"
                            onError={(e) => {
                              // Fallback if image fails to load
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${school.logoBg || 'bg-blue-600'
                            } text-white font-extrabold text-sm shadow-xs border border-white/20 ${school.logoUrl ? 'hidden' : 'flex'
                            }`}
                        >
                          {school.logoBadge || school.name.substring(0, 3).toUpperCase()}
                        </div>

                        <div>
                          <p className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">{school.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{school.tagline}</p>
                        </div>
                      </div>
                    </td>

                    {/* School Code */}
                    <td className="py-4 px-4">
                      <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-500/20">
                        {school.schoolId}
                      </span>
                    </td>

                    {/* Email */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-semibold">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        <span>{school.email}</span>
                      </div>
                    </td>

                    {/* Password */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-800">
                          {showPasswords[school.id] ? school.password : '••••••••'}
                        </span>
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(school.id)}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                          title="Toggle Password View"
                        >
                          {showPasswords[school.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopy(school.password, school.id)}
                          className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                          title="Copy Password"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                        {copiedId === school.id && <span className="text-[10px] text-emerald-600 font-bold">Copied!</span>}
                      </div>
                    </td>

                    {/* License Capacity */}
                    <td className="py-4 px-4 min-w-[140px]">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span className="text-slate-800 dark:text-slate-200">{school.activeStudents || 0} / {school.totalLicenses}</span>
                          <span className="text-slate-400">
                            {(((school.activeStudents || 0) / school.totalLicenses) * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${((school.activeStudents || 0) / school.totalLicenses) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedSchoolInvoice(school)}
                          className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300 transition cursor-pointer"
                          title="Generate & View GST Invoice"
                        >
                          <FileText className="h-3 w-3" />
                          <span>Invoice</span>
                        </button>
                        <a
                          href="/for-schools"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-600 hover:bg-blue-100 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 transition"
                          title="Open B2B Portal Demo"
                        >
                          <span>Portal Login</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>

                        <button
                          type="button"
                          onClick={() => handleDelete(school.id, school.name)}
                          className="p-1 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 transition"
                          title="Delete School Account"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400 font-medium">
                    No partner schools found. Click "+ Add Partner School" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. ADD PARTNER SCHOOL MODAL */}
      {showAddModal && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">

          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111827] p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <School className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">Add New Partner School</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Issue school credentials and set logo branding.</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              {/* School Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  School / Institution Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern School Barakhamba"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* School ID Code & Tagline */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    School Code / ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MODERN-2026"
                    value={formData.schoolId}
                    onChange={(e) => setFormData({ ...formData, schoolId: e.target.value.toUpperCase() })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3.5 py-2.5 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tagline / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. New Delhi Campus"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3.5 py-2.5 text-xs font-medium text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Admin Email & Password */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Admin Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="principal@modernschool.ac.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3.5 py-2.5 text-xs font-medium text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Admin Password *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Set Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3.5 py-2.5 text-xs font-mono font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Custom Logo Image (File Upload or URL) & Logo Badge */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    School Logo Image
                  </label>
                  <div className="space-y-2">
                    <label className="cursor-pointer flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900 py-2.5 px-3 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:bg-blue-50/50 transition">
                      <ImageIcon className="h-4 w-4 text-blue-500 shrink-0" />
                      <span className="truncate">{formData.logoUrl ? 'Change Image' : '📁 Upload Logo File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    {formData.logoUrl ? (
                      <div className="flex items-center justify-between p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                        <div className="flex items-center gap-2">
                          <img
                            src={formData.logoUrl}
                            alt="Logo Preview"
                            className="h-8 w-8 object-contain rounded-lg bg-white p-0.5 border border-slate-200"
                          />
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Logo Uploaded</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, logoUrl: '' })}
                          className="text-[10px] text-rose-500 font-bold hover:underline px-1"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <input
                        type="url"
                        placeholder="Or paste URL: https://..."
                        value={formData.logoUrl}
                        onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3 py-1.5 text-[11px] font-medium text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Backup Emblem Badge Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MOD (3 letters)"
                    maxLength={5}
                    value={formData.logoBadge}
                    onChange={(e) => setFormData({ ...formData, logoBadge: e.target.value.toUpperCase() })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3.5 py-2.5 text-xs font-extrabold uppercase text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                  <p className="text-[10px] text-slate-400 mt-1 font-medium">Used if image file is not provided.</p>
                </div>
              </div>


              {/* Student License Limit */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Issued Student License Limit *
                </label>
                <input
                  type="number"
                  required
                  placeholder="200"
                  value={formData.maxStudents}
                  onChange={(e) => setFormData({ ...formData, maxStudents: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3.5 py-2.5 text-xs font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-slate-300 bg-slate-100 dark:border-slate-800 dark:bg-slate-900 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition"
                >
                  Create School Account
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* 5. LEAD DETAILS & FOLLOW-UP NOTES MODAL */}

      {selectedLead && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111827] p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">{selectedLead.schoolName}</h3>
                <p className="text-xs text-blue-600 dark:text-cyan-400 font-semibold">Lead Details & Follow-up History</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Grid of 11 Lead Fields */}
            <div className="grid grid-cols-2 gap-3 text-xs border border-slate-100 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50">
              <div><span className="text-slate-400">Contact Person:</span> <strong className="text-slate-900 dark:text-white block">{selectedLead.contactName || 'N/A'}</strong></div>
              <div><span className="text-slate-400">Designation:</span> <strong className="text-slate-900 dark:text-white block">{selectedLead.designation || 'Principal'}</strong></div>
              <div><span className="text-slate-400">Official Email:</span> <strong className="text-slate-900 dark:text-white block font-mono">{selectedLead.email}</strong></div>
              <div><span className="text-slate-400">Phone / WhatsApp:</span> <strong className="text-slate-900 dark:text-white block font-mono">{selectedLead.phone}</strong></div>
              <div><span className="text-slate-400">City & State:</span> <strong className="text-slate-900 dark:text-white block">{selectedLead.city || 'Delhi'}, {selectedLead.state || 'NCR'}</strong></div>
              <div><span className="text-slate-400">Institution Type:</span> <strong className="text-slate-900 dark:text-white block">{selectedLead.institutionType || 'School'}</strong></div>
              <div><span className="text-slate-400">Student Capacity:</span> <strong className="text-slate-900 dark:text-white block">{selectedLead.studentCount} Students</strong></div>
              <div><span className="text-slate-400">Target Exam:</span> <strong className="text-slate-900 dark:text-white block">{selectedLead.preferredCourse || 'NEET / JEE'}</strong></div>
              {selectedLead.message && (
                <div className="col-span-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Special Message:</span>
                  <p className="text-slate-700 dark:text-slate-300 italic">{selectedLead.message}</p>
                </div>
              )}
            </div>

            {/* Lead Status Manager */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Lead Status:</span>
              <select
                value={selectedLead.status}
                onChange={(e) => {
                  handleLeadStatus(selectedLead.id, e.target.value);
                  setSelectedLead({ ...selectedLead, status: e.target.value });
                }}
                className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="New Request">🟢 New Request</option>
                <option value="Contacted">🔵 Contacted</option>
                <option value="Demo Scheduled">🟣 Demo Scheduled</option>
                <option value="Converted">⭐ Converted</option>
                <option value="Rejected">🔴 Rejected</option>
              </select>
            </div>

            {/* Follow-up Notes Section */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Follow-up Notes</h4>
              
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {(leadNotes[selectedLead.id] || []).length > 0 ? (
                  (leadNotes[selectedLead.id] || []).map((note, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                        <span>{note.author}</span>
                        <span>{note.time}</span>
                      </div>
                      <p className="text-slate-800 dark:text-slate-200 font-medium">{note.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No follow-up notes logged yet.</p>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type follow-up note (e.g. Call completed, demo fixed for Friday)..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newNote.trim()) return;
                    const existing = leadNotes[selectedLead.id] || [];
                    setLeadNotes({
                      ...leadNotes,
                      [selectedLead.id]: [
                        { text: newNote.trim(), time: 'Just now', author: 'Master Admin' },
                        ...existing,
                      ],
                    });
                    setNewNote('');
                  }}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition"
                >
                  Save Note
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="rounded-xl border border-slate-300 bg-slate-100 dark:border-slate-800 dark:bg-slate-900 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleApproveLead(selectedLead);
                  setSelectedLead(null);
                }}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 text-xs font-bold text-white shadow-md hover:scale-105 transition"
              >
                ⭐ Convert to Official Partner School
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* 6. GST INVOICE & CUSTOM PRICING GENERATOR MODAL */}
      {selectedSchoolInvoice && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111827] p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">Generate B2B Tax Invoice</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{selectedSchoolInvoice.name}</p>
              </div>
              <button
                onClick={() => setSelectedSchoolInvoice(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between font-mono"><span className="text-slate-400">Invoice No:</span> <strong className="text-slate-900 dark:text-white">EDV-B2B-2026-089</strong></div>
                <div className="flex justify-between font-mono"><span className="text-slate-400">School Code:</span> <strong className="text-blue-600">{selectedSchoolInvoice.schoolId}</strong></div>
                <div className="flex justify-between"><span className="text-slate-400">Target Package:</span> <strong className="text-slate-900 dark:text-white">{selectedSchoolInvoice.packageType || 'NEET-UG 2027 AIETS (1-Year)'}</strong></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Total Student Licenses</label>
                  <input
                    type="number"
                    defaultValue={selectedSchoolInvoice.totalLicenses || 200}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3 py-2 font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Custom Rate / Student (₹)</label>
                  <input
                    type="number"
                    defaultValue={selectedSchoolInvoice.customPrice || 1999}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3 py-2 font-bold text-emerald-600 dark:text-emerald-400"
                  />
                </div>
              </div>

              {/* GST Calculation Table */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between"><span className="text-slate-500">Subtotal (200 x ₹1,999):</span> <span>₹3,99,800.00</span></div>
                <div className="flex justify-between"><span className="text-slate-500">GST (18% HSN 9992):</span> <span>₹71,964.00</span></div>
                <div className="flex justify-between text-sm font-black pt-1.5 border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                  <span>Grand Total (Incl. GST):</span>
                  <span className="text-emerald-600 dark:text-emerald-400">₹4,71,764.00</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedSchoolInvoice(null)}
                className="rounded-xl border border-slate-300 bg-slate-100 dark:border-slate-800 dark:bg-slate-900 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('GST Tax Invoice generated and sent to school email!');
                  setSelectedSchoolInvoice(null);
                }}
                className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition"
              >
                📄 Download PDF Invoice
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}


