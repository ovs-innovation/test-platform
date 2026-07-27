import { useEffect, useState } from 'react';
import { Pencil, ShieldAlert, Trash2 } from 'lucide-react';
import { adminService } from '../../lib/services.js';
import { PageHeader, LoadingScreen, ErrorState, EmptyState, PasswordInput } from '../../components/ui.jsx';
import ActionDropdown from '../../components/ActionDropdown.jsx';
import { formatDate } from '../../lib/format.js';
import { useToast } from '../../context/ToastContext.jsx';
import Modal from '../../components/Modal.jsx';

export default function AdminCandidates() {
  const toast = useToast();
  const [candidates, setCandidates] = useState([]);
  const [state, setState] = useState('loading');
  const [search, setSearch] = useState('');
  
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
  
  // Form states
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    class: '',
    target_exam: 'JEE'
  });
  
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setState('loading');
    try {
      setCandidates(await adminService.candidates());
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleOpenCreate = () => {
    setForm({
      name: '',
      email: '',
      password: '',
      phone: '',
      class: '',
      target_exam: 'JEE'
    });
    setModalMode('create');
    setSelectedCandidate(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (c) => {
    setForm({
      name: c.name || '',
      email: c.email || '',
      password: '', // blank to keep current
      phone: c.phone || '',
      class: c.class || '',
      target_exam: c.target_exam || 'JEE'
    });
    setModalMode('edit');
    setSelectedCandidate(c);
    setModalOpen(true);
  };

  const handleDeleteClick = (c) => {
    setCandidateToDelete(c);
    setDeleteConfirmOpen(true);
  };

  const handleBlockClick = (c) => {
    setCandidateToBlock(c);
    setBlockConfirmOpen(true);
  };

  const handleConfirmToggleBlock = async () => {
    if (!candidateToBlock) return;
    setBlockActionLoading(true);
    const newStatus = !candidateToBlock.is_blocked;
    try {
      await adminService.toggleBlockCandidate(candidateToBlock.id, newStatus);
      toast.success(
        newStatus
          ? `Student "${candidateToBlock.name}" has been blocked.`
          : `Student "${candidateToBlock.name}" has been unblocked.`
      );
      setCandidates((prev) =>
        prev.map((c) => (c.id === candidateToBlock.id ? { ...c, is_blocked: newStatus } : c))
      );
      setBlockConfirmOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to update student block status');
    } finally {
      setBlockActionLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (modalMode === 'create') {
        const newCandidate = await adminService.createCandidate(form);
        toast.success('Student registered successfully');
        setCandidates([newCandidate, ...candidates]);
      } else {
        const updatedCandidate = await adminService.updateCandidate(selectedCandidate.id, form);
        toast.success('Student profile updated');
        setCandidates(candidates.map(c => c.id === selectedCandidate.id ? { ...c, ...updatedCandidate } : c));
      }
      setModalOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to save student profile');
    } finally {
      setSubmitting(false);
    }
  };

  if (state === 'loading') return <LoadingScreen label="Loading candidates…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  const filtered = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone && c.phone.includes(search))
  );

  return (
    <div>
      <PageHeader 
        title="Candidates" 
        subtitle={`${candidates.length} registered candidate${candidates.length === 1 ? '' : 's'}.`} 
        actions={
          <button 
            type="button" 
            className="btn-primary flex items-center gap-1.5"
            onClick={handleOpenCreate}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Student
          </button>
        }
      />

      <div className="mb-4">
        <input
          className="input max-w-sm"
          placeholder="Search by name, email, or mobile number…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
                  <Th>Contact Details</Th>
                  <Th>Academic Profile</Th>
                  <Th>Exam Attempts</Th>
                  <Th>Registered On</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-[#111827]">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <Td>
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/10 dark:bg-blue-600/20 font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs">
                          {c.name.charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <p className="font-extrabold text-slate-900 dark:text-white leading-none mb-1">{c.name}</p>
                          <p className="text-[11px] font-semibold text-slate-400">ID: #{c.id}</p>
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
                      <p className="text-slate-800 dark:text-slate-200 font-semibold text-xs">{c.email}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{c.phone || 'No mobile'}</p>
                    </Td>
                    <Td>
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md w-max border border-slate-200 dark:border-slate-700">
                          Class: {c.class || 'N/A'}
                        </span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md w-max border ${
                          c.target_exam === 'JEE' 
                            ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30' 
                            : c.target_exam === 'NEET' 
                              ? 'bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                        }`}>
                          Target: {c.target_exam || 'N/A'}
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
                              label: 'Edit Profile',
                              icon: Pencil,
                              onClick: () => handleOpenEdit(c),
                              color: 'text-blue-600 dark:text-blue-400',
                            },
                            {
                              label: c.is_blocked ? 'Unblock Student' : 'Block Student',
                              icon: ShieldAlert,
                              onClick: () => handleBlockClick(c),
                              warning: !c.is_blocked,
                              color: c.is_blocked ? 'text-emerald-600 dark:text-emerald-400' : undefined,
                            },
                            {
                              label: 'Delete Student',
                              icon: Trash2,
                              onClick: () => handleDeleteClick(c),
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
              onClick={handleConfirmToggleBlock}
              disabled={blockActionLoading}
            >
              {blockActionLoading ? 'Processing…' : candidateToBlock?.is_blocked ? 'Unblock Student' : 'Block Student'}
            </button>
          </div>
        </div>
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

