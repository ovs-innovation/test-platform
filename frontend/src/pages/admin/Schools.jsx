import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminService } from '../../lib/services.js';
import { useToast } from '../../context/ToastContext.jsx';
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
  FileText,
  Pencil,
  Package
} from 'lucide-react';

import { Badge } from '../../components/ui.jsx';

export default function Schools() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [schools, setSchools] = useState([]);
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ totalInstitutions: 0, issuedLicenses: 0, enrolledStudents: 0, utilizationRate: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedSchoolInvoice, setSelectedSchoolInvoice] = useState(null);
  const [invoiceLicenses, setInvoiceLicenses] = useState(200);
  const [invoiceCustomPrice, setInvoiceCustomPrice] = useState(1999);
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [leadNotes, setLeadNotes] = useState({});
  const [newNote, setNewNote] = useState('');
  const [showPasswords, setShowPasswords] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  // Additional B2B Features State
  const [editingSchool, setEditingSchool] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    schoolId: '',
    email: '',
    password: '',
    tagline: '',
    logoBadge: '',
    logoUrl: '',
    totalLicenses: '200',
    gstin: '',
    customPrice: '1999',
    paymentStatus: 'Paid',
    accentColor: '#2563eb',
  });
  const [availablePackages, setAvailablePackages] = useState([]);
  const [schoolPackages, setSchoolPackages] = useState([]);
  const [selectedPackageToAssign, setSelectedPackageToAssign] = useState('');
  const [storedInvoices, setStoredInvoices] = useState([]);

  // Sync invoice defaults & stored invoices when modal opens
  useEffect(() => {
    if (selectedSchoolInvoice) {
      const defaultLic = selectedSchoolInvoice.totalLicenses || 200;
      setInvoiceLicenses(defaultLic);
      let defaultRate = 1999;
      if (defaultLic >= 1000) defaultRate = 999;
      else if (defaultLic >= 500) defaultRate = 1199;
      else if (defaultLic >= 200) defaultRate = 1499;
      setInvoiceCustomPrice(selectedSchoolInvoice.customPrice || defaultRate);
      setAppliedCoupon(null);
      setCouponCodeInput('');

      // Fetch recorded invoices from backend DB
      adminService.getSchoolInvoices(selectedSchoolInvoice.id)
        .then((data) => setStoredInvoices(data.invoices || []))
        .catch(() => setStoredInvoices([]));
    }
  }, [selectedSchoolInvoice]);

  // Fetch live lead follow-up notes when a lead is selected
  useEffect(() => {
    if (selectedLead?.id) {
      adminService.getLeadNotes(selectedLead.id)
        .then((data) => {
          setLeadNotes((prev) => ({ ...prev, [selectedLead.id]: data.notes || [] }));
        })
        .catch(() => {});
    }
  }, [selectedLead]);

  // Fetch assigned school packages when editing a school
  useEffect(() => {
    if (editingSchool?.id) {
      adminService.getSchoolPackages(editingSchool.id)
        .then((data) => setSchoolPackages(data.packages || []))
        .catch(() => setSchoolPackages([]));
    }
  }, [editingSchool]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showAddModal || selectedLead || selectedSchoolInvoice || editingSchool) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showAddModal, selectedLead, selectedSchoolInvoice, editingSchool]);

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
    gstin: '',
    customPrice: '1999',
    paymentStatus: 'Paid',
    accentColor: '#2563eb',
    leadId: null,
  });

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [schoolsData, leadsData, pkgsData] = await Promise.all([
        adminService.partnerSchools().catch(() => ({ institutions: [], stats: {} })),
        adminService.demoLeads().catch(() => ({ leads: [] })),
        adminService.listPackages().catch(() => ({ packages: [] })),
      ]);
      setSchools(schoolsData.institutions || []);
      setStats(schoolsData.stats || {});
      setLeads(leadsData.leads || []);
      setAvailablePackages(pkgsData.packages || []);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to load partner schools live data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Auto-open lead details modal when coming from Notification Click
  useEffect(() => {
    if (leads.length > 0 && location.state?.leadRef) {
      const term = location.state.leadRef.toLowerCase();
      const matched = leads.find((l) =>
        l.schoolName?.toLowerCase().includes(term) ||
        l.contactName?.toLowerCase().includes(term) ||
        term.includes(l.schoolName?.toLowerCase())
      );
      if (matched) {
        setSelectedLead(matched);
      }
    }
  }, [leads, location.state]);

  const handlePaymentStatusChange = async (schoolId, newStatus) => {
    try {
      await adminService.updateSchoolPaymentStatus(schoolId, newStatus);
      setSchools((prev) => prev.map((s) => (s.id === schoolId ? { ...s, paymentStatus: newStatus } : s)));
      toast?.success(`Payment status updated to "${newStatus}"`);
    } catch (err) {
      toast?.error(err.message || 'Failed to update payment status');
    }
  };

  const handleOpenEditModal = (school) => {
    setEditingSchool(school);
    setEditFormData({
      name: school.name || '',
      schoolId: school.schoolId || '',
      email: school.email || '',
      password: school.password || '',
      tagline: school.tagline || '',
      logoBadge: school.logoBadge || '',
      logoUrl: school.logoUrl || '',
      totalLicenses: String(school.totalLicenses || 200),
      gstin: school.gstin || '',
      customPrice: String(school.customPrice || 1999),
      paymentStatus: school.paymentStatus || 'Paid',
      accentColor: school.accentColor || '#2563eb',
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingSchool) return;
    try {
      const res = await adminService.updatePartnerSchool(editingSchool.id, editFormData);
      toast?.success(res.message || 'Partner School updated successfully');
      loadAllData();
      setEditingSchool(null);
    } catch (err) {
      toast?.error(err.message || 'Failed to update partner school');
    }
  };

  const handleAssignPackage = async () => {
    if (!selectedPackageToAssign || !editingSchool?.id) return;
    try {
      await adminService.assignSchoolPackage(editingSchool.id, selectedPackageToAssign);
      toast?.success('Test package assigned successfully');
      const updated = await adminService.getSchoolPackages(editingSchool.id);
      setSchoolPackages(updated.packages || []);
      setSelectedPackageToAssign('');
    } catch (err) {
      toast?.error(err.message || 'Failed to assign package');
    }
  };

  const handleRemovePackage = async (packageId) => {
    if (!editingSchool?.id) return;
    try {
      await adminService.removeSchoolPackage(editingSchool.id, packageId);
      toast?.success('Package association removed');
      setSchoolPackages((prev) => prev.filter((p) => p.packageId !== packageId));
    } catch (err) {
      toast?.error(err.message || 'Failed to remove package');
    }
  };

  const handleSaveNote = async () => {
    if (!newNote.trim() || !selectedLead?.id) return;
    try {
      const res = await adminService.addLeadNote(selectedLead.id, newNote.trim(), 'Master Admin');
      const added = res.note;
      setLeadNotes((prev) => ({
        ...prev,
        [selectedLead.id]: [added, ...(prev[selectedLead.id] || [])],
      }));
      setNewNote('');
      toast?.success('Follow-up note saved');
    } catch (err) {
      toast?.error(err.message || 'Failed to save note');
    }
  };

  const handleSaveInvoiceToDb = async (invDetails) => {
    if (!selectedSchoolInvoice?.id) return;
    try {
      const res = await adminService.createSchoolInvoice(selectedSchoolInvoice.id, invDetails);
      toast?.success(res.message || 'Invoice recorded in system database');
      setStoredInvoices((prev) => [res.invoice, ...prev]);
    } catch (err) {
      toast?.error(err.message || 'Failed to record invoice');
    }
  };

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
      leadId: lead.id,
    });
    setShowAddModal(true);
  };

  const handleLeadStatus = async (id, newStatus) => {
    try {
      await adminService.updateLeadStatus(id, newStatus);
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
      toast?.success(`Lead status updated to "${newStatus}"`);
    } catch (err) {
      toast?.error(err.message || 'Failed to update lead status');
    }
  };

  const handleDeleteLead = async (id) => {
    if (window.confirm('Delete this demo request lead?')) {
      try {
        await adminService.deleteLead(id);
        setLeads((prev) => prev.filter((l) => l.id !== id));
        toast?.success('Demo request lead deleted');
      } catch (err) {
        toast?.error(err.message || 'Failed to delete lead');
      }
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

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.schoolId.trim() || !formData.email.trim() || !formData.password.trim()) return;

    try {
      const res = await adminService.addPartnerSchool(formData);
      toast?.success(res.message || 'Partner School account created');
      loadAllData();

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
        leadId: null,
      });
      setShowAddModal(false);
    } catch (err) {
      toast?.error(err.message || 'Failed to create partner school');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" partner school?`)) {
      try {
        await adminService.deletePartnerSchool(id);
        toast?.success(`Partner School "${name}" deleted`);
        loadAllData();
      } catch (err) {
        toast?.error(err.message || 'Failed to delete partner school');
      }
    }
  };

  const filteredSchools = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.schoolId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalLicensesCount = stats.issuedLicenses ?? schools.reduce((acc, s) => acc + Number(s.totalLicenses || 0), 0);
  const totalActiveStudentsCount = stats.enrolledStudents ?? schools.reduce((acc, s) => acc + Number(s.activeStudents || 0), 0);
  const utilizationRate = stats.utilizationRate ?? (totalLicensesCount > 0 ? Math.round((totalActiveStudentsCount / totalLicensesCount) * 1000) / 10 : 0);

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

        <div className="w-full max-w-full overflow-x-auto min-w-0 custom-scrollbar">
          <table className="w-full min-w-[960px] text-left text-xs border-collapse">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
              <tr>
                <th className="py-3 px-4 min-w-[250px]">School & Contact Person</th>
                <th className="py-3 px-4 min-w-[210px]">Official Email & Phone</th>
                <th className="py-3 px-4 min-w-[130px]">Target Capacity</th>
                <th className="py-3 px-4 min-w-[120px]">Request Date</th>
                <th className="py-3 px-4 min-w-[140px]">Status</th>
                <th className="py-3 px-4 text-right min-w-[180px]">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 min-w-[250px]">
                      <div className="space-y-0.5 min-w-0">
                        <p className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm leading-snug">{lead.schoolName}</p>
                        <p className="text-[11px] text-blue-600 dark:text-cyan-400 font-bold leading-snug">{lead.contactName}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 min-w-[210px] whitespace-nowrap">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                          <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                          <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>{lead.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 min-w-[130px] font-bold text-slate-900 dark:text-slate-200 whitespace-nowrap">
                      {lead.studentCount} Students
                    </td>
                    <td className="py-3.5 px-4 min-w-[120px] text-slate-500 dark:text-slate-400 font-medium text-[11px] whitespace-nowrap">
                      {lead.createdAt}
                    </td>
                    <td className="py-3.5 px-4 min-w-[140px] whitespace-nowrap">
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
                    <td className="py-3.5 px-4 text-right min-w-[180px] whitespace-nowrap">
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
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition cursor-pointer"
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
        <div className="w-full max-w-full overflow-x-auto min-w-0 custom-scrollbar">
          <table className="w-full min-w-[1050px] text-left text-xs border-collapse">
            <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <tr>
                <th className="py-3.5 px-4 min-w-[280px]">School Logo & Institution Name</th>
                <th className="py-3.5 px-4 min-w-[140px]">School Code / ID</th>
                <th className="py-3.5 px-4 min-w-[200px]">Admin Email</th>
                <th className="py-3.5 px-4 min-w-[140px]">Password</th>
                <th className="py-3.5 px-4 min-w-[140px]">License Capacity</th>
                <th className="py-3.5 px-4 min-w-[120px]">Payment Status</th>
                <th className="py-3.5 px-4 text-right min-w-[180px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredSchools.length > 0 ? (
                filteredSchools.map((school) => (
                  <tr key={school.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition">
                    {/* Logo & Name */}
                    <td className="py-4 px-4 min-w-[280px]">
                      <div className="flex items-center gap-3.5 min-w-0">
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

                        <div className="min-w-0 flex-1">
                          <p className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm leading-snug">{school.name}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug mt-0.5">{school.tagline}</p>
                        </div>
                      </div>
                    </td>

                    {/* School Code */}
                    <td className="py-4 px-4 min-w-[140px] whitespace-nowrap">
                      <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-500/20">
                        {school.schoolId}
                      </span>
                    </td>

                    {/* Email */}
                    <td className="py-4 px-4 min-w-[200px] whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-semibold">
                        <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{school.email}</span>
                      </div>
                    </td>

                    {/* Password */}
                    <td className="py-4 px-4 min-w-[140px] whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-800">
                          {showPasswords[school.id] ? school.password : '••••••••'}
                        </span>
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(school.id)}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                          title="Toggle Password View"
                        >
                          {showPasswords[school.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopy(school.password, school.id)}
                          className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
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

                    {/* Payment Status */}
                    <td className="py-4 px-4 min-w-[120px] whitespace-nowrap">
                      <select
                        value={school.paymentStatus || 'Paid'}
                        onChange={(e) => handlePaymentStatusChange(school.id, e.target.value)}
                        className={`rounded-lg border px-2.5 py-1 text-[11px] font-extrabold cursor-pointer focus:outline-none ${
                          (school.paymentStatus || 'Paid') === 'Paid'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30'
                            : (school.paymentStatus || 'Paid') === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30'
                            : 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30'
                        }`}
                      >
                        <option value="Paid">🟢 Paid</option>
                        <option value="Pending">🟡 Pending</option>
                        <option value="Partial">🟣 Partial</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right min-w-[180px] whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(school)}
                          className="p-1 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 transition cursor-pointer"
                          title="Edit Partner School & Package Configuration"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedSchoolInvoice(school)}
                          className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300 transition cursor-pointer"
                          title="Generate & Record GST Invoice"
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
                          className="p-1 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 transition cursor-pointer"
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
                  <td colSpan={7} className="py-10 text-center text-slate-400 font-medium">
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
                  onClick={handleSaveNote}
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

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between font-mono"><span className="text-slate-400">Invoice No:</span> <strong className="text-slate-900 dark:text-white">EDV-B2B-2026-089</strong></div>
                <div className="flex justify-between font-mono"><span className="text-slate-400">School Code:</span> <strong className="text-blue-600">{selectedSchoolInvoice.schoolId}</strong></div>
                <div className="flex justify-between"><span className="text-slate-400">Target Package:</span> <strong className="text-slate-900 dark:text-white">{selectedSchoolInvoice.packageType || 'NEET-UG 2027 AIETS (1-Year)'}</strong></div>
              </div>

              {/* Volume Pricing & Rate Controller */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">Total Licenses</label>
                    <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-extrabold">
                      {invoiceLicenses >= 1000 ? '50% Tier' : invoiceLicenses >= 500 ? '40% Tier' : invoiceLicenses >= 200 ? '25% Tier' : 'Standard'}
                    </span>
                  </div>
                  <input
                    type="number"
                    value={invoiceLicenses}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 0;
                      setInvoiceLicenses(count);
                      // Auto update rate based on volume tiers if not custom edited
                      if (count >= 1000) setInvoiceCustomPrice(999);
                      else if (count >= 500) setInvoiceCustomPrice(1199);
                      else if (count >= 200) setInvoiceCustomPrice(1499);
                      else setInvoiceCustomPrice(1999);
                    }}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3 py-2 font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Custom Rate / Student (₹)</label>
                  <input
                    type="number"
                    value={invoiceCustomPrice}
                    onChange={(e) => setInvoiceCustomPrice(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3 py-2 font-bold text-emerald-600 dark:text-emerald-400"
                  />
                </div>
              </div>

              {/* Promotional Offer / Coupon Code Engine */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">Apply Promo / Coupon Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Try EDVEDUM20 or EARLYBIRD15..."
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                    className="flex-1 uppercase font-mono rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const code = couponCodeInput.trim().toUpperCase();
                      if (code === 'EDVEDUM20') {
                        setAppliedCoupon({ code: 'EDVEDUM20', type: 'percent', value: 20, label: '20% Special B2B Discount' });
                      } else if (code === 'EARLYBIRD15') {
                        setAppliedCoupon({ code: 'EARLYBIRD15', type: 'percent', value: 15, label: '15% Early Bird Offer' });
                      } else if (code === 'SCHOOL5000') {
                        setAppliedCoupon({ code: 'SCHOOL5000', type: 'flat', value: 5000, label: '₹5,000 Flat Grant Discount' });
                      } else {
                        alert('Invalid Coupon Code! Try EDVEDUM20, EARLYBIRD15, or SCHOOL5000');
                      }
                    }}
                    className="rounded-xl bg-slate-800 dark:bg-slate-700 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-slate-700 cursor-pointer"
                  >
                    Apply Code
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    <span>🎟️ Coupon Applied: {appliedCoupon.label} ({appliedCoupon.code})</span>
                    <button onClick={() => setAppliedCoupon(null)} className="text-rose-400 hover:underline">Remove</button>
                  </div>
                )}
              </div>

              {/* Dynamic GST & Billing Calculation Table */}
              {(() => {
                const subtotal = invoiceLicenses * invoiceCustomPrice;
                const discount = appliedCoupon
                  ? (appliedCoupon.type === 'percent' ? Math.round(subtotal * (appliedCoupon.value / 100)) : appliedCoupon.value)
                  : 0;
                const netSubtotal = Math.max(0, subtotal - discount);
                const gst = Math.round(netSubtotal * 0.18);
                const grandTotal = netSubtotal + gst;
                const invNum = `INV-EDV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

                return (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 space-y-1.5 font-mono text-xs">
                      <div className="flex justify-between"><span className="text-slate-500">Subtotal ({invoiceLicenses} x ₹{invoiceCustomPrice.toLocaleString()}):</span> <span>₹{subtotal.toLocaleString()}.00</span></div>
                      {discount > 0 && (
                        <div className="flex justify-between text-emerald-500"><span className="text-emerald-500 font-bold">Coupon Discount ({appliedCoupon?.code}):</span> <span>- ₹{discount.toLocaleString()}.00</span></div>
                      )}
                      <div className="flex justify-between"><span className="text-slate-500">GST (18% HSN 9992):</span> <span>₹{gst.toLocaleString()}.00</span></div>
                      <div className="flex justify-between text-sm font-black pt-1.5 border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                        <span>Grand Total Payable:</span>
                        <span className="text-emerald-600 dark:text-emerald-400">₹{grandTotal.toLocaleString()}.00</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSaveInvoiceToDb({
                        invoiceNumber: invNum,
                        packageName: 'NEET-UG 2027 AIETS Institutional Package',
                        pricePerStudent: invoiceCustomPrice,
                        licenseQuantity: invoiceLicenses,
                        subtotal,
                        gstAmount: gst,
                        totalAmount: grandTotal,
                        paymentStatus: selectedSchoolInvoice.paymentStatus || 'Paid',
                      })}
                      className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition"
                    >
                      💾 Record Tax Invoice to System Database
                    </button>
                  </div>
                );
              })()}

              {/* Recorded Invoices History Table */}
              {storedInvoices.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Database Recorded Invoices ({storedInvoices.length})</h4>
                  <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                    {storedInvoices.map((inv) => (
                      <div key={inv.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-[11px] font-mono">
                        <div>
                          <strong className="text-blue-600 dark:text-blue-400 block">{inv.invoice_number}</strong>
                          <span className="text-slate-400">{inv.license_quantity} Licenses • ₹{Number(inv.total_amount).toLocaleString()}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">{inv.payment_status || 'Paid'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedSchoolInvoice(null)}
                className="rounded-xl border border-slate-300 bg-slate-100 dark:border-slate-800 dark:bg-slate-900 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* 7. EDIT PARTNER SCHOOL MODAL */}
      {editingSchool && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111827] p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <Pencil className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">Edit Partner School Account</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{editingSchool.name}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingSchool(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">School / Institution Name *</label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">School ID Code *</label>
                  <input
                    type="text"
                    required
                    value={editFormData.schoolId}
                    onChange={(e) => setEditFormData({ ...editFormData, schoolId: e.target.value.toUpperCase() })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3.5 py-2.5 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Admin Email *</label>
                  <input
                    type="email"
                    required
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3.5 py-2.5 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Admin Password</label>
                  <input
                    type="text"
                    value={editFormData.password}
                    onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3.5 py-2.5 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tagline / Location</label>
                  <input
                    type="text"
                    value={editFormData.tagline}
                    onChange={(e) => setEditFormData({ ...editFormData, tagline: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3.5 py-2.5 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Issued License Limit</label>
                  <input
                    type="number"
                    value={editFormData.totalLicenses}
                    onChange={(e) => setEditFormData({ ...editFormData, totalLicenses: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3.5 py-2.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* GSTIN, Custom Price & Payment Status */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">GSTIN Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 07AAAAA0000A1Z5"
                    value={editFormData.gstin}
                    onChange={(e) => setEditFormData({ ...editFormData, gstin: e.target.value.toUpperCase() })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3 py-2 text-xs font-mono font-bold uppercase text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Custom Rate / Student (₹)</label>
                  <input
                    type="number"
                    value={editFormData.customPrice}
                    onChange={(e) => setEditFormData({ ...editFormData, customPrice: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Payment Status</label>
                  <select
                    value={editFormData.paymentStatus}
                    onChange={(e) => setEditFormData({ ...editFormData, paymentStatus: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="Paid">🟢 Paid</option>
                    <option value="Pending">🟡 Pending</option>
                    <option value="Partial">🟣 Partial</option>
                  </select>
                </div>
              </div>

              {/* Package Assignment Panel */}
              <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Package className="h-4 w-4 text-blue-500" />
                  <span>Assigned Test Packages ({schoolPackages.length})</span>
                </h4>

                <div className="space-y-1.5">
                  {schoolPackages.length > 0 ? (
                    schoolPackages.map((pkg) => (
                      <div key={pkg.id} className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                        <span className="font-bold text-slate-800 dark:text-slate-200">{pkg.packageName}</span>
                        <button
                          type="button"
                          onClick={() => handleRemovePackage(pkg.packageId)}
                          className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded"
                          title="Remove Package"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">No specific packages assigned yet.</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <select
                    value={selectedPackageToAssign}
                    onChange={(e) => setSelectedPackageToAssign(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-300 bg-white dark:border-slate-800 dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="">-- Select Test Package to Assign --</option>
                    {availablePackages.map((p) => (
                      <option key={p.id} value={p.id}>{p.package_name}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAssignPackage}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                  >
                    + Assign
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingSchool(null)}
                  className="rounded-xl border border-slate-300 bg-slate-100 dark:border-slate-800 dark:bg-slate-900 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}


