import { useState } from 'react';
import { BookOpen, Download, Users, Layers, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../../context/ToastContext.jsx';

export default function EbooksTab({
  availableEbooks = [],
  batches = [],
  students = [],
  onAssignEbook,
  isDarkMode = true,
}) {
  const toast = useToast();
  const [selectedEbook, setSelectedEbook] = useState(null);
  const [targetType, setTargetType] = useState('institution');
  const [targetId, setTargetId] = useState('');
  const [assigning, setAssigning] = useState(false);

  const defaultBooks = [
    { id: 1, title: 'NEET-UG High-Yield Physics Formula Handbook 2027', subject: 'Physics', author: 'Edvedum Academic Panel', class_level: 'Class 11 & 12', cover_image_url: '' },
    { id: 2, title: 'JEE Main Organic Chemistry Mechanism Shortcuts', subject: 'Chemistry', author: 'Kota Subject Experts', class_level: 'Class 12', cover_image_url: '' },
    { id: 3, title: 'Class 10 Olympiad Mathematics & Logical Reasoning', subject: 'Mathematics', author: 'Foundation Division', class_level: 'Class 10', cover_image_url: '' },
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

        <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 px-3.5 py-1 text-xs font-extrabold text-purple-400 shrink-0">
          <Sparkles className="h-3.5 w-3.5" />
          Digital Library Unlocked
        </span>
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
              <button
                onClick={() => {
                  setSelectedEbook(book);
                  setTargetType('institution');
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-purple-500 transition cursor-pointer shadow-md"
              >
                <span>Assign eBook</span>
              </button>
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
    </div>
  );
}
