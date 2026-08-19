import { useState } from 'react';
import { BookOpen, Download, Users, Layers, Sparkles, FileText, CheckCircle2, Plus, Upload, Trash2, AlertTriangle } from 'lucide-react';
import { useToast } from '../../../context/ToastContext.jsx';

export default function EbooksTab({
  availableEbooks = [],
  batches = [],
  students = [],
  onAssignEbook,
  onCreateEbook,
  onDeleteEbook,
  isDarkMode = true,
}) {
  const toast = useToast();
  const [selectedEbook, setSelectedEbook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [targetType, setTargetType] = useState('institution');
  const [targetId, setTargetId] = useState('');
  const [assigning, setAssigning] = useState(false);

  const confirmDelete = async () => {
    if (!deletingBook) return;
    setDeleting(true);
    try {
      if (onDeleteEbook) {
        await onDeleteEbook(deletingBook.id);
      }
      toast.success(`"${deletingBook.title}" deleted successfully.`);
      setDeletingBook(null);
    } catch (err) {
      toast.error(err.message || 'Failed to delete eBook.');
    } finally {
      setDeleting(false);
    }
  };

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState({
    title: '',
    author: '',
    description: '',
    subject: 'Physics',
    class_level: 'Class 11 & 12',
    pdf_url: '',
  });

  const defaultBooks = [
    { id: 1, title: 'NEET-UG High-Yield Physics Formula Handbook 2027', subject: 'Physics', author: 'Edvedum Academic Panel', class_level: 'Class 11 & 12', pdf_url: '/ebooks/neet-physics-handbook.pdf', cover_image_url: '' },
    { id: 2, title: 'JEE Main Organic Chemistry Mechanism Shortcuts', subject: 'Chemistry', author: 'Kota Subject Experts', class_level: 'Class 12', pdf_url: '/ebooks/jee-chemistry-shortcuts.pdf', cover_image_url: '' },
    { id: 3, title: 'Class 10 Olympiad Mathematics & Logical Reasoning', subject: 'Mathematics', author: 'Foundation Division', class_level: 'Class 10', pdf_url: '/ebooks/class10-olympiad-math.pdf', cover_image_url: '' },
  ];

  const booksList = availableEbooks && availableEbooks.length > 0 ? availableEbooks : defaultBooks;

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEbook) return;

    setAssigning(true);
    try {
      if (onAssignEbook) {
        await onAssignEbook(selectedEbook.id, {
          assign_to: targetType,
          target_id: targetType === 'institution' ? null : targetId,
        });
      }
      setSelectedEbook(null);
    } catch (err) {
      toast.error(err.message || 'Failed to assign eBook.');
      setSelectedEbook(null);
    } finally {
      setAssigning(false);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!createForm.title || !createForm.pdf_url) {
      toast.error('Title and PDF File / Path are required.');
      return;
    }

    setCreating(true);
    try {
      if (onCreateEbook) {
        await onCreateEbook(createForm);
      }
      setShowCreateModal(false);
      setCreateForm({
        title: '',
        author: '',
        description: '',
        subject: 'Physics',
        class_level: 'Class 11 & 12',
        pdf_url: '',
      });
    } catch (err) {
      toast.error(err.message || 'Failed to create study material.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* TAB HEADER */}
      <div className={`rounded-2xl border p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-[#0E1726] border-slate-800 text-white' : 'bg-white border-slate-200/90 text-slate-900'
      }`}>
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Digital Learning Resources</span>
          </div>
          <h2 className={`text-lg sm:text-xl font-extrabold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <span>eBooks & Digital Study Material</span>
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Distribute platform-approved eBooks, NEET & JEE practice modules, and formula handbooks to batches or individual students.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-md hover:bg-purple-500 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Upload Study Material</span>
          </button>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 px-3.5 py-1 text-xs font-extrabold text-purple-400 shrink-0">
            <Sparkles className="h-3.5 w-3.5" />
            Digital Library
          </span>
        </div>
      </div>

      {/* EBOOKS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booksList.map((book) => (
          <div
            key={book.id}
            className={`rounded-2xl border p-5 sm:p-6 space-y-4 shadow-2xs relative overflow-hidden transition flex flex-col justify-between ${
              isDarkMode ? 'bg-[#0E1726] border-slate-800 text-white' : 'bg-white border-slate-200/90 text-slate-900'
            }`}
          >
            <div className="flex items-start gap-4">
              {book.cover_image_url ? (
                <img src={book.cover_image_url} alt={book.title} className="h-20 w-14 rounded-xl object-cover shadow-md shrink-0" />
              ) : (
                <div className="h-20 w-14 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-md shrink-0 p-1 text-center">
                  {book.subject ? book.subject.substring(0, 3).toUpperCase() : 'PDF'}
                </div>
              )}

              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-400 uppercase">
                  {book.subject || 'Physics / Chemistry'}
                </span>
                <h3 className={`text-sm font-extrabold leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {book.title}
                </h3>
                <p className="text-[11px] text-slate-400">Author: {book.author || 'Edvedum Faculty Panel'}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/40 flex items-center justify-between gap-2 text-xs">
              <span className="text-[10px] font-mono text-slate-400">{book.class_level || 'Class 11 & 12'}</span>
              <div className="flex items-center gap-2">
                {book.pdf_url && (
                  <a
                    href={book.pdf_url.startsWith('http') ? book.pdf_url : `http://127.0.0.1:5000${book.pdf_url.startsWith('/') ? '' : '/'}${book.pdf_url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-xl bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>PDF</span>
                  </a>
                )}
                <button
                  onClick={() => {
                    setSelectedEbook(book);
                    setTargetType('institution');
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-purple-500 transition cursor-pointer shadow-md"
                >
                  <span>Assign eBook</span>
                </button>

                <button
                  onClick={() => setDeletingBook(book)}
                  title="Delete eBook"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 px-2.5 py-1.5 text-xs font-bold text-rose-400 hover:bg-rose-500 hover:text-white transition cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ASSIGN EBOOK MODAL */}
      {selectedEbook && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 space-y-5 ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Assign "{selectedEbook.title}"
            </h3>

            <form onSubmit={handleAssignSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">Assign Target Level</label>
                <select
                  value={targetType}
                  onChange={(e) => setTargetType(e.target.value)}
                  className={`w-full py-2.5 px-3 rounded-xl border transition ${
                    isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-slate-100 text-slate-800'
                  }`}
                >
                  <option value="institution">Entire Institution (All Students)</option>
                  <option value="batch">Specific Batch</option>
                  <option value="student">Individual Student</option>
                </select>
              </div>

              {targetType === 'batch' && (
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">Select Batch</label>
                  <select
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    required
                    className={`w-full py-2.5 px-3 rounded-xl border transition ${
                      isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-slate-100 text-slate-800'
                    }`}
                  >
                    <option value="">Select a batch...</option>
                    {batches.map((b) => (
                      <option key={b.id} value={b.id}>{b.batch_name || b.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {targetType === 'student' && (
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">Select Student</label>
                  <select
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    required
                    className={`w-full py-2.5 px-3 rounded-xl border transition ${
                      isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-slate-100 text-slate-800'
                    }`}
                  >
                    <option value="">Select a student...</option>
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} ({s.roll_number || s.email})</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedEbook(null)}
                  className={`px-4 py-2 rounded-xl border font-bold ${
                    isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={assigning}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 font-bold text-white hover:bg-purple-500 shadow-md"
                >
                  {assigning ? 'Assigning...' : 'Confirm eBook Distribution'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / UPLOAD STUDY MATERIAL MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 space-y-5 ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
              <h3 className={`text-lg font-extrabold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <Upload className="h-5 w-5 text-purple-400" />
                <span>Upload Custom Study Material</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white text-base font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Physics Formula & Short Notes 2027"
                  value={createForm.title}
                  onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                  required
                  className={`w-full py-2.5 px-3 rounded-xl border transition ${
                    isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-slate-100 text-slate-800'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">Subject</label>
                  <select
                    value={createForm.subject}
                    onChange={(e) => setCreateForm({ ...createForm, subject: e.target.value })}
                    className={`w-full py-2.5 px-3 rounded-xl border transition ${
                      isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-slate-100 text-slate-800'
                    }`}
                  >
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="General">General / All Subjects</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">Class Level</label>
                  <input
                    type="text"
                    placeholder="e.g. Class 11 & 12"
                    value={createForm.class_level}
                    onChange={(e) => setCreateForm({ ...createForm, class_level: e.target.value })}
                    className={`w-full py-2.5 px-3 rounded-xl border transition ${
                      isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-slate-100 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">Author / Faculty Name</label>
                <input
                  type="text"
                  placeholder="e.g. Institute HOD / Kota Faculty"
                  value={createForm.author}
                  onChange={(e) => setCreateForm({ ...createForm, author: e.target.value })}
                  className={`w-full py-2.5 px-3 rounded-xl border transition ${
                    isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-slate-100 text-slate-800'
                  }`}
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">PDF File Path or URL *</label>
                <input
                  type="text"
                  placeholder="e.g. C:\Users\Downloads\genetics_notes.pdf OR /ebooks/physics_handbook.pdf"
                  value={createForm.pdf_url}
                  onChange={(e) => setCreateForm({ ...createForm, pdf_url: e.target.value })}
                  required
                  className={`w-full py-2.5 px-3 rounded-xl border transition ${
                    isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-slate-100 text-slate-800'
                  }`}
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  You can enter a web URL or paste a local computer file path (e.g. C:\Users\...\document.pdf).
                </p>
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">Description (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Brief summary of syllabus coverage or chapter highlights..."
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  className={`w-full py-2.5 px-3 rounded-xl border transition ${
                    isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-slate-100 text-slate-800'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className={`px-4 py-2 rounded-xl border font-bold ${
                    isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 font-bold text-white hover:bg-purple-500 shadow-md flex items-center gap-1.5"
                >
                  <Upload className="h-3.5 w-3.5" />
                  <span>{creating ? 'Uploading...' : 'Save & Publish eBook'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingBook && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 space-y-5 ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className={`text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Delete Study Material?
                </h3>
                <p className="text-xs text-slate-400">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-white">"{deletingBook.title}"</strong> from the institution digital library?
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingBook(null)}
                className={`px-4 py-2 rounded-xl border font-bold text-xs ${
                  isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="px-5 py-2.5 rounded-xl bg-rose-600 font-bold text-xs text-white hover:bg-rose-500 shadow-md flex items-center gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>{deleting ? 'Deleting...' : 'Delete Permanently'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
