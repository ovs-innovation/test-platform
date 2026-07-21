import { useEffect, useState } from 'react';
import { adminService } from '../../lib/services.js';
import { PageHeader, LoadingScreen, ErrorState, EmptyState } from '../../components/ui.jsx';
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
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <Th>Student</Th>
                  <Th>Contact Details</Th>
                  <Th>Academic Profile</Th>
                  <Th>Exam Attempts</Th>
                  <Th>Registered On</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <Td>
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700 text-sm">
                          {c.name.charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <p className="font-semibold text-slate-900 leading-none mb-1">{c.name}</p>
                          <p className="text-xs text-slate-400">ID: #{c.id}</p>
                        </div>
                      </div>
                    </Td>
                    <Td>
                      <p className="text-slate-700 font-medium">{c.email}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{c.phone || 'No mobile'}</p>
                    </Td>
                    <Td>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded w-max">
                          Class: {c.class || 'N/A'}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded w-max ${
                          c.target_exam === 'JEE' 
                            ? 'bg-blue-50 text-blue-700' 
                            : c.target_exam === 'NEET' 
                              ? 'bg-pink-50 text-pink-700' 
                              : 'bg-slate-100 text-slate-600'
                        }`}>
                          Target: {c.target_exam || 'N/A'}
                        </span>
                      </div>
                    </Td>
                    <Td>
                      <div className="flex flex-col">
                        <span className="text-slate-700 font-medium">Attempts: {c.attempts}</span>
                        <span className="text-xs text-slate-500">
                          Completed: {c.completed} | Avg Score: {c.avg_score}%
                        </span>
                      </div>
                    </Td>
                    <Td className="text-slate-500 text-xs">
                      {formatDate(c.created_at)}
                    </Td>
                    <Td className="text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          className="btn-secondary !p-1.5 text-blue-600 hover:text-blue-700"
                          onClick={() => handleOpenEdit(c)}
                          title="Edit Profile"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="btn-secondary !p-1.5 text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteClick(c)}
                          title="Delete Student"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden transform transition-all border border-slate-100">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-150 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 text-lg">
                {modalMode === 'create' ? 'Register New Student' : 'Edit Student Profile'}
              </h3>
              <button
                type="button"
                className="text-slate-400 hover:text-slate-600 transition"
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Password {modalMode === 'create' ? <span className="text-red-500">*</span> : <span className="text-slate-400 font-normal">(Leave blank to keep current)</span>}
                  </label>
                  <input
                    type="password"
                    required={modalMode === 'create'}
                    className="input w-full"
                    placeholder={modalMode === 'create' ? "Min 6 characters" : "Enter new password if changing"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
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
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
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
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
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

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
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
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
            <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">Delete Student Profile?</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Are you sure you want to delete student <strong className="font-bold text-slate-800 dark:text-slate-200">"{candidateToDelete?.name}"</strong>?
          </p>
          <div className="mt-3 rounded-lg bg-red-50 p-3 text-left text-xs text-red-800 dark:bg-red-950/30 dark:text-red-300">
            <strong>Warning:</strong> This will delete all of their test scores, attempts, payments, and academic history permanently. This action cannot be undone.
          </div>
          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              className="btn-secondary text-sm"
              onClick={() => setDeleteConfirmOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-primary border-transparent bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-sm px-4 py-2 rounded-lg transition"
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
    </div>
  );
}

const Th = ({ children, className = '' }) => (
  <th className={`px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 ${className}`}>
    {children}
  </th>
);

const Td = ({ children, className = '' }) => (
  <td className={`whitespace-nowrap px-4 py-3.5 text-sm text-slate-700 ${className}`}>
    {children}
  </td>
);
