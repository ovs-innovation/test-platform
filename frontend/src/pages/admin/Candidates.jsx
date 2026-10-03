import { useEffect, useState } from 'react';
import { Pencil, ShieldAlert, Trash2, ChevronLeft, ChevronRight, Mail, KeyRound, Copy, Check } from 'lucide-react';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, EmptyState, PasswordInput } from '../../components/ui.jsx';
import { AdminHeader } from '../../components/admin/AdminUI.jsx';
import ActionDropdown from '../../components/ActionDropdown.jsx';
import { formatDate } from '../../lib/format.js';
import { useToast } from '../../context/ToastContext.jsx';
import Modal from '../../components/Modal.jsx';

export default function AdminCandidates() {
  const toast = useToast();
  const [candidates, setCandidates] = useState([]);
  const [state, setState] = useState('loading');
  const [search, setSearch] = useState('');
  const [selectedInstitutionFilter, setSelectedInstitutionFilter] = useState('');
  
  // Pagination states (10 candidates per page)
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  // Delete confirm modal states
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState(null);
  
  // Block/Unblock confirm modal states
  const [blockConfirmOpen, setBlockConfirmOpen] = useState(false);
  const [candidateToBlock, setCandidateToBlock] = useState(null);
  const [blockActionLoading, setBlockActionLoading] = useState(false);

  // Send Credentials modal states
  const [credentialsModalOpen, setCredentialsModalOpen] = useState(false);
  const [candidateForCredentials, setCandidateForCredentials] = useState(null);
  const [credentialsCustomPassword, setCredentialsCustomPassword] = useState('');
  const [credentialsCustomStudentId, setCredentialsCustomStudentId] = useState('');
  const [sendingCredentials, setSendingCredentials] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  
  const [institutions, setInstitutions] = useState([]);

  // Form states
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    student_id: '',
    phone: '',
    class: '',
    target_exam: 'JEE',
    institution_id: '',
    send_credentials: true
  });
  
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setState('loading');
    try {
      const [candData, instData] = await Promise.all([
        adminService.candidates(),
        adminService.partnerSchools().catch(() => ({ institutions: [] }))
      ]);
      setCandidates(candData || []);
      setInstitutions(instData?.institutions || instData || []);
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Reset to page 1 when search or institution filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedInstitutionFilter]);

  const handleCopyId = (id) => {
    if (!id) return;
    navigator.clipboard?.writeText(id);
    setCopiedId(id);
    toast.success(`Copied Student ID: ${id}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenSendCredentials = (c) => {
    setCandidateForCredentials(c);
    setCredentialsCustomPassword('');
    setCredentialsCustomStudentId(c.student_id || c.roll_number || '');
    setCredentialsModalOpen(true);
  };

  const handleSendCredentials = async (e) => {
    e?.preventDefault();
    if (!candidateForCredentials) return;
    setSendingCredentials(true);
    try {
      const res = await adminService.sendCandidateCredentials(candidateForCredentials.id, {
        password: credentialsCustomPassword.trim() || undefined,
        student_id: credentialsCustomStudentId.trim() || undefined,
      });
      if (res?.emailSent) {
        toast.success(`Login credentials sent to ${candidateForCredentials.email}! (Student ID: ${res.student_id})`);
      } else if (res?.emailError) {
        toast.warning(`Updated Student ID to ${res.student_id}, but email delivery failed: ${res.emailError}`);
      } else {
        toast.success(`Student credentials updated! (Student ID: ${res.student_id})`);
      }
      setCredentialsModalOpen(false);
      setCandidateForCredentials(null);
      load();
    } catch (err) {
      toast.error(err.message || 'Failed to send credentials');
    } finally {
      setSendingCredentials(false);
    }
  };

  const handleOpenCreate = () => {
    setModalMode('create');
    setSelectedCandidate(null);
    setForm({
      name: '',
      email: '',
      password: '',
      student_id: '',
      phone: '',
      class: '',
      target_exam: 'JEE',
      institution_id: '',
      send_credentials: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (c) => {
    setModalMode('edit');
    setSelectedCandidate(c);
    setForm({
      name: c.name || '',
      email: c.email || '',
      password: '',
      student_id: c.student_id || c.roll_number || '',
      phone: c.phone || '',
      class: c.class || '',
      target_exam: c.target_exam || 'JEE',
      institution_id: c.institution_id || '',
      send_credentials: false
    });
    setModalOpen(true);
  };

  const handleOpenDelete = (c) => {
    setCandidateToDelete(c);
    setDeleteConfirmOpen(true);
  };

  const handleOpenBlockConfirm = (c) => {
    setCandidateToBlock(c);
    setBlockConfirmOpen(true);
  };

  const handleToggleBlock = async () => {
    if (!candidateToBlock) return;
    setBlockActionLoading(true);
    const newStatus = !candidateToBlock.is_blocked;
    try {
      await adminService.toggleBlockCandidate(candidateToBlock.id, newStatus);
      toast.success(`Candidate ${candidateToBlock.name} has been ${newStatus ? 'blocked' : 'unblocked'}.`);
      setBlockConfirmOpen(false);
      setCandidateToBlock(null);
      load();
    } catch (err) {
      toast.error(err.message || 'Failed to update candidate block status');
    } finally {
      setBlockActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!candidateToDelete) return;
    try {
      await adminService.deleteCandidate(candidateToDelete.id);
      toast.success(`Student ${candidateToDelete.name} deleted.`);
      setDeleteConfirmOpen(false);
      setCandidateToDelete(null);
      load();
    } catch (err) {
      toast.error(err.message || 'Failed to delete student');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (modalMode === 'create') {
        const res = await adminService.createCandidate(form);
        if (res?.emailSent) {
          toast.success(`Student registered and credentials emailed to ${form.email}!`);
        } else if (res?.emailError) {
          toast.warning(`Student registered, but email delivery issue: ${res.emailError}`);
        } else {
          toast.success('Student registered successfully!');
        }
      } else {
        const payload = { ...form };
        if (!payload.password) delete payload.password;
        await adminService.updateCandidate(selectedCandidate.id, payload);
        toast.success('Student details updated!');
      }
      setModalOpen(false);
      load();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (state === 'loading') return <LoadingScreen label="Loading candidates…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  const filtered = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      ((c.student_id || c.roll_number || '') && String(c.student_id || c.roll_number).toLowerCase().includes(search.toLowerCase())) ||
      (c.phone && c.phone.includes(search)) ||
      (c.institution_name && c.institution_name.toLowerCase().includes(search.toLowerCase())) ||
      (c.institution_code && c.institution_code.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedInstitutionFilter === 'independent') {
      return !c.institution_id && !c.institution_name;
    }
    if (selectedInstitutionFilter) {
      return (
        String(c.institution_id) === String(selectedInstitutionFilter) ||
        String(c.institution_name) === String(selectedInstitutionFilter)
      );
    }

    return true;
  });

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedCandidates = filtered.slice(startIndex, endIndex);

  return (
    <div className="w-full max-w-full space-y-6">
      <AdminHeader 
        title="Student Candidates Roster" 
        subtitle={`Managing ${candidates.length} registered candidate accounts across national partner institutions and open enrollments.`} 
        breadcrumbs={['Students Roster']}
        actions={
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleOpenCreate}
          >
            + Register Student
          </button>
        }
      />

      <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <input
          className="input max-w-sm"
          placeholder="Search by name, email, phone, or institution…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="input max-w-xs font-semibold"
          value={selectedInstitutionFilter}
          onChange={(e) => setSelectedInstitutionFilter(e.target.value)}
        >
          <option value="">All Institutions & Signups</option>
          <option value="independent">🌐 Direct Website Signups (No Institution)</option>
          {institutions.map((inst) => (
            <option key={inst.id} value={inst.id}>
              🏫 {inst.name} ({inst.schoolId})
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No candidates found" message="Candidates appear here once they register." />
      ) : (
        <div className="card overflow-hidden p-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800/80">
              <thead className="bg-slate-100/80 dark:bg-slate-900/80">
                <tr>
                  <Th>Student</Th>
                  <Th>Status</Th>
                  <Th>Institution / Source</Th>
                  <Th>Contact Details</Th>
                  <Th>Academic Profile</Th>
                  <Th>Exam Attempts</Th>
                  <Th>Registered On</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-[#111827]">
                {paginatedCandidates.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <Td>
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/10 dark:bg-blue-600/20 font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs">
                          {c.name.charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <p className="font-extrabold text-slate-900 dark:text-white leading-none mb-1">{c.name}</p>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <button
                              type="button"
                              onClick={() => handleCopyId(c.student_id || c.roll_number || c.id)}
                              title="Click to copy Student ID"
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-mono font-bold text-[10.5px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                            >
                              <span>ID: {c.student_id || c.roll_number || `#${c.id}`}</span>
                              {copiedId === (c.student_id || c.roll_number || c.id) ? (
                                <Check className="h-3 w-3 text-emerald-500" />
                              ) : (
                                <Copy className="h-2.5 w-2.5 text-slate-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Td>
                    <Td>
                      {c.is_blocked ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                          Blocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      )}
                    </Td>
                    <Td>
                      {c.institution_name ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="inline-flex items-center gap-1 text-xs font-extrabold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-2.5 py-1 rounded-lg w-max">
                            🏫 {c.institution_name}
                          </span>
                          {c.institution_code && (
                            <span className="text-[10.5px] font-semibold text-slate-400 pl-0.5">
                              Code: {c.institution_code}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-lg w-max">
                          🌐 Direct Website Signup
                        </span>
                      )}
                    </Td>
                    <Td>
                      <p className="text-slate-800 dark:text-slate-200 font-semibold text-xs">{c.email}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{c.phone || 'No mobile'}</p>
                    </Td>
                    <Td>
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md w-max border border-slate-200 dark:border-slate-700">
                          Class: {c.class || c.class_level || 'Class 12'}
                        </span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md w-max border ${
                          (c.target_exam || '').toUpperCase().includes('JEE') 
                            ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30' 
                            : (c.target_exam || '').toUpperCase().includes('NEET') 
                              ? 'bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                        }`}>
                          Target: {c.target_exam || 'NEET'}
                        </span>
                      </div>
                    </Td>
                    <Td>
                      <div className="flex flex-col">
                        <span className="text-slate-800 dark:text-slate-200 font-bold text-xs">Attempts: {c.attempts}</span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          Completed: {c.completed} | Avg: {c.avg_score}%
                        </span>
                      </div>
                    </Td>
                    <Td className="text-slate-400 text-xs font-semibold">
                      {formatDate(c.created_at)}
                    </Td>
                    <Td className="text-right">
                      <div className="flex justify-end pr-1">
                        <ActionDropdown
                          items={[
                            {
                              label: 'Send ID & Password',
                              icon: Mail,
                              onClick: () => handleOpenSendCredentials(c),
                              color: 'text-indigo-600 dark:text-indigo-400 font-semibold',
                            },
                            {
                              label: 'Edit Profile',
                              icon: Pencil,
                              onClick: () => handleOpenEdit(c),
                              color: 'text-blue-600 dark:text-blue-400',
                            },
                            {
                              label: c.is_blocked ? 'Unblock Student' : 'Block Student',
                              icon: ShieldAlert,
                              onClick: () => handleOpenBlockConfirm(c),
                              warning: !c.is_blocked,
                              color: c.is_blocked ? 'text-emerald-600 dark:text-emerald-400' : undefined,
                            },
                            {
                              label: 'Delete Student',
                              icon: Trash2,
                              onClick: () => handleOpenDelete(c),
                              danger: true,
                            },
                          ]}
                        />
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls Bar (10 items per page) */}
          {totalItems > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <div>
                Showing <span className="font-extrabold text-slate-900 dark:text-white">{totalItems === 0 ? 0 : startIndex + 1}</span> to{' '}
                <span className="font-extrabold text-slate-900 dark:text-white">{endIndex}</span> of{' '}
                <span className="font-extrabold text-slate-900 dark:text-white">{totalItems}</span> students
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-slate-700 dark:text-slate-300 font-bold cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-1 px-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`h-8 min-w-[32px] px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          currentPage === page
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                            : 'bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-slate-700 dark:text-slate-300 font-bold cursor-pointer"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Modal Dialog for Create/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs transition-opacity">
          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                {modalMode === 'create' ? 'Register New Student' : 'Edit Student Profile'}
              </h3>
              <button
                type="button"
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition"
                onClick={() => setModalOpen(false)}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="label">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="input w-full"
                    placeholder="Enter full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="label">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="input w-full"
                    placeholder="student@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="label">
                    Student ID / Roll Number <span className="text-slate-400 font-normal">({modalMode === 'create' ? 'Optional - auto-generated if left blank' : 'Unique student identifier'})</span>
                  </label>
                  <input
                    type="text"
                    className="input w-full font-mono uppercase"
                    placeholder={modalMode === 'create' ? "e.g. EDV26-10023 (or leave blank to auto-generate)" : "Enter Student ID"}
                    value={form.student_id}
                    onChange={(e) => setForm({ ...form, student_id: e.target.value })}
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Student can use this ID along with their password to sign in to the student portal.
                  </p>
                </div>

                <div>
                  <label className="label">
                    Password {modalMode === 'create' ? <span className="text-rose-500">*</span> : <span className="text-slate-400 font-normal">(Leave blank to keep current)</span>}
                  </label>
                  <PasswordInput
                    required={modalMode === 'create'}
                    className="input"
                    placeholder={modalMode === 'create' ? "Min 6 characters" : "Enter new password if changing"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>

                <div>
                  <label className="label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      Class
                    </label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="e.g. 11th, 12th Pass"
                      value={form.class}
                      onChange={(e) => setForm({ ...form, class: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="label">
                      Target Exam
                    </label>
                    <select
                      className="input w-full"
                      value={form.target_exam}
                      onChange={(e) => setForm({ ...form, target_exam: e.target.value })}
                    >
                      <option value="JEE">JEE</option>
                      <option value="NEET">NEET</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label">
                    Allocated Partner School / Institution
                  </label>
                  <select
                    className="input w-full font-semibold"
                    value={form.institution_id || ''}
                    onChange={(e) => setForm({ ...form, institution_id: e.target.value })}
                  >
                    <option value="">-- Independent Student (No Institution) --</option>
                    {institutions.map((inst) => (
                      <option key={inst.id} value={inst.id}>
                        🏫 {inst.name} ({inst.schoolId})
                      </option>
                    ))}
                  </select>
                </div>

                {modalMode === 'create' && (
                  <div className="rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/70 dark:bg-blue-950/20 p-3.5">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        className="checkbox mt-0.5"
                        checked={form.send_credentials}
                        onChange={(e) => setForm({ ...form, send_credentials: e.target.checked })}
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                          Email Login Credentials to Student
                        </span>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                          Automatically sends an email containing their Student ID, registered email, and password so they can log in immediately.
                        </p>
                      </div>
                    </label>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Saving…' : 'Save Details'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Modal
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Confirm Deletion"
        size="sm"
      >
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950">
            <svg className="h-6 w-6 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-extrabold text-slate-900 dark:text-white">Delete Student Profile?</h3>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            Are you sure you want to delete student <strong className="font-bold text-slate-900 dark:text-white">"{candidateToDelete?.name}"</strong>?
          </p>
          <div className="mt-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 p-3 text-left text-xs text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50">
            <strong>Warning:</strong> This will delete all of their test scores, attempts, payments, and academic history permanently.
          </div>
          <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800 pt-4">
            <button
              type="button"
              className="btn-secondary text-xs"
              onClick={() => setDeleteConfirmOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-danger text-xs"
              onClick={async () => {
                if (!candidateToDelete) return;
                try {
                  await adminService.deleteCandidate(candidateToDelete.id);
                  toast.success('Student deleted successfully');
                  setCandidates(candidates.filter(c => c.id !== candidateToDelete.id));
                } catch (err) {
                  toast.error(err.message || 'Failed to delete student');
                } finally {
                  setDeleteConfirmOpen(false);
                  setCandidateToDelete(null);
                }
              }}
            >
              Permanently Delete
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={blockConfirmOpen}
        onClose={() => setBlockConfirmOpen(false)}
        title={candidateToBlock?.is_blocked ? 'Unblock Student' : 'Block Student'}
        size="sm"
      >
        <div className="text-center">
          <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
            candidateToBlock?.is_blocked ? 'bg-emerald-100 dark:bg-emerald-950' : 'bg-amber-100 dark:bg-amber-950'
          }`}>
            {candidateToBlock?.is_blocked ? (
              <svg className="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            )}
          </div>
          <h3 className="mt-4 text-base font-extrabold text-slate-900 dark:text-white">
            {candidateToBlock?.is_blocked ? 'Unblock Student Account?' : 'Block Student Account?'}
          </h3>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            Are you sure you want to {candidateToBlock?.is_blocked ? 'unblock' : 'block'} student{' '}
            <strong className="font-bold text-slate-900 dark:text-white">"{candidateToBlock?.name}"</strong>?
          </p>
          {!candidateToBlock?.is_blocked && (
            <div className="mt-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 p-3 text-left text-xs text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50">
              <strong>Impact:</strong> When blocked, this student will not be able to log in or take assessments until unblocked.
            </div>
          )}
          <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800 pt-4">
            <button type="button" className="btn-secondary text-xs" onClick={() => setBlockConfirmOpen(false)}>
              Cancel
            </button>
            <button
              type="button"
              className={candidateToBlock?.is_blocked ? 'btn-primary bg-emerald-600 hover:bg-emerald-500 text-xs' : 'btn-primary bg-amber-600 hover:bg-amber-500 text-xs'}
              onClick={handleToggleBlock}
              disabled={blockActionLoading}
            >
              {blockActionLoading ? 'Processing…' : candidateToBlock?.is_blocked ? 'Unblock Student' : 'Block Student'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Send Student Credentials Modal */}
      <Modal
        open={credentialsModalOpen}
        onClose={() => !sendingCredentials && setCredentialsModalOpen(false)}
        title="Send Student ID & Password"
        size="sm"
      >
        <form onSubmit={handleSendCredentials} className="space-y-4">
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/60 p-4 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400">Student:</span>
              <span className="font-extrabold text-slate-900 dark:text-white">{candidateForCredentials?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400">Registered Email:</span>
              <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">{candidateForCredentials?.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400">Current Student ID:</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                {candidateForCredentials?.student_id || candidateForCredentials?.roll_number || 'Will auto-generate'}
              </span>
            </div>
          </div>

          <div>
            <label className="label">
              Student ID / Roll Number <span className="text-slate-400 font-normal">(Leave blank to keep / auto-generate)</span>
            </label>
            <input
              type="text"
              className="input w-full font-mono uppercase text-xs"
              placeholder="e.g. EDV26-10023"
              value={credentialsCustomStudentId}
              onChange={(e) => setCredentialsCustomStudentId(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              Set New Password <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <PasswordInput
              className="input text-xs"
              placeholder="Leave blank to auto-generate secure password"
              value={credentialsCustomPassword}
              onChange={(e) => setCredentialsCustomPassword(e.target.value)}
            />
            <p className="text-[11px] text-slate-400 mt-1">
              If left blank, an 8-character secure password will be generated, saved, and dispatched to the student's email.
            </p>
          </div>

          <div className="mt-5 flex justify-end gap-2.5 border-t border-slate-200 dark:border-slate-800 pt-4">
            <button
              type="button"
              className="btn-secondary text-xs"
              onClick={() => setCredentialsModalOpen(false)}
              disabled={sendingCredentials}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary text-xs flex items-center gap-1.5"
              disabled={sendingCredentials}
            >
              {sendingCredentials ? (
                <>
                  <span className="inline-block animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full mr-1" />
                  Sending Email…
                </>
              ) : (
                <>
                  <Mail className="h-3.5 w-3.5" />
                  Send Credentials
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const Th = ({ children, className = '' }) => (
  <th className={`px-4 py-3.5 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 ${className}`}>
    {children}
  </th>
);

const Td = ({ children, className = '' }) => (
  <td className={`whitespace-nowrap px-4 py-3.5 text-xs text-slate-700 dark:text-slate-300 font-medium ${className}`}>
    {children}
  </td>
);

