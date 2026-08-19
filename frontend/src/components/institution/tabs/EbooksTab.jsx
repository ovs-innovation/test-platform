import { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Download,
  Users,
  Layers,
  Sparkles,
  FileText,
  CheckCircle2,
  Search,
  Filter,
  Atom,
  FlaskConical,
  Binary,
  Dna,
  Send,
  Eye,
  Building2,
  User,
  X,
  BookMarked,
  ShieldCheck,
  ChevronRight,
  Plus,
  Upload,
  Trash2,
  AlertTriangle
} from 'lucide-react';
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
  const [previewEbook, setPreviewEbook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [targetType, setTargetType] = useState('batch'); // 'batch' | 'student' | 'institution'
  const [targetId, setTargetId] = useState('');
  const [assigning, setAssigning] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

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

  useEffect(() => {
    if (selectedEbook || previewEbook || showCreateModal || deletingBook) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedEbook, previewEbook, showCreateModal, deletingBook]);

  const defaultBooks = [
    {
      id: 1,
      title: 'NEET-UG High-Yield Physics Formula Handbook 2027',
      subject: 'Physics',
      author: 'Edvedum Academic Panel',
      class_level: 'Class 11 & 12',
      pages: 164,
      file_size: '8.4 MB',
      target_exam: 'NEET-UG 2027',
      description: 'Comprehensive quick-revision formula guide, key derivations, and high-yield solved examples for NEET physics prep.',
      color: 'from-blue-600 via-indigo-600 to-cyan-500',
      badgeBg: 'bg-blue-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
      icon: Atom
    },
    {
      id: 2,
      title: 'JEE Main Organic Chemistry Mechanism Shortcuts',
      subject: 'Chemistry',
      author: 'Kota Subject Experts',
      class_level: 'Class 12',
      pages: 142,
      file_size: '12.1 MB',
      target_exam: 'JEE Main 2027',
      description: 'Master organic reaction mechanisms, reagent cheat sheets, and step-by-step synthetic conversions.',
      color: 'from-emerald-600 via-teal-600 to-cyan-500',
      badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      icon: FlaskConical
    },
    {
      id: 3,
      title: 'Class 10 Olympiad Mathematics & Logical Reasoning',
      subject: 'Mathematics',
      author: 'Foundation Division',
      class_level: 'Class 10',
      pages: 210,
      file_size: '15.6 MB',
      target_exam: 'Foundation & NTSE',
      description: 'Advanced problem sets, number theory, algebraic geometry, and speed arithmetic strategies for competitive foundation math.',
      color: 'from-purple-600 via-indigo-600 to-blue-500',
      badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      icon: Binary
    },
    {
      id: 4,
      title: 'NEET Biology 360/360 NCERT Diagrammatic Review',
      subject: 'Biology',
      author: 'Edvedum Medical Faculty',
      class_level: 'Class 11 & 12',
      pages: 280,
      file_size: '22.0 MB',
      target_exam: 'NEET-UG 2027',
      description: 'Full NCERT line-by-line summary, high-resolution labeled biological diagrams, and high-probability assertion-reason notes.',
      color: 'from-rose-600 via-pink-600 to-purple-500',
      badgeBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      icon: Dna
    },
    {
      id: 5,
      title: 'JEE Advanced Calculus & Coordinate Geometry Set',
      subject: 'Mathematics',
      author: 'IITian Faculty Wing',
      class_level: 'Class 12',
      pages: 195,
      file_size: '11.2 MB',
      target_exam: 'JEE Advanced',
      description: 'Differential & integral calculus problem bank, conic sections shortcuts, and multi-concept practice problems.',
      color: 'from-indigo-600 via-blue-600 to-cyan-500',
      badgeBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      icon: Binary
    },
    {
      id: 6,
      title: 'Class 9 Science Foundation Concept Map & Manual',
      subject: 'Science',
      author: 'Foundation Academic Board',
      class_level: 'Class 9',
      pages: 130,
      file_size: '6.8 MB',
      target_exam: 'Class 9 Board & NTSE',
      description: 'Interactive concept mindmaps, practical lab exercise guide, and foundational physics/chemistry problem worksheets.',
      color: 'from-amber-600 via-orange-500 to-yellow-500',
      badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      icon: BookMarked
    }
  ];

  const booksList = availableEbooks && availableEbooks.length > 0
    ? availableEbooks.map((b, i) => ({
        ...b,
        color: b.color || defaultBooks[i % defaultBooks.length].color,
        badgeBg: b.badgeBg || defaultBooks[i % defaultBooks.length].badgeBg,
        icon: b.subject?.toLowerCase().includes('chem') ? FlaskConical : b.subject?.toLowerCase().includes('math') ? Binary : b.subject?.toLowerCase().includes('bio') ? Dna : Atom
      }))
    : defaultBooks;

  const filteredBooks = useMemo(() => {
    return booksList.filter((b) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        (b.title || '').toLowerCase().includes(q) ||
        (b.subject || '').toLowerCase().includes(q) ||
        (b.author || '').toLowerCase().includes(q) ||
        (b.target_exam || '').toLowerCase().includes(q);

      const matchesCat =
        categoryFilter === 'All' ||
        (b.subject || '').toLowerCase().includes(categoryFilter.toLowerCase()) ||
        (categoryFilter === 'Class 11 & 12' && ((b.class_level || '').includes('11') || (b.class_level || '').includes('12'))) ||
        (categoryFilter === 'Foundation' && ((b.class_level || '').includes('9') || (b.class_level || '').includes('10')));

      return matchesSearch && matchesCat;
    });
  }, [booksList, searchQuery, categoryFilter]);

  const handleOpenAssignModal = (book) => {
    setSelectedEbook(book);
    if (batches.length > 0) {
      setTargetType('batch');
      setTargetId(String(batches[0].id));
    } else {
      setTargetType('institution');
      setTargetId('');
    }
  };

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
      const targetLabel =
        targetType === 'batch'
          ? batches.find((b) => Number(b.id) === Number(targetId))?.batch_name || 'Batch'
          : targetType === 'student'
          ? students.find((s) => Number(s.id) === Number(targetId))?.name || 'Student'
          : 'Entire Institution';

      toast.success(`"${selectedEbook.title}" distributed to ${targetLabel} successfully.`);
      setSelectedEbook(null);
    } catch (err) {
      toast.error(err.message || 'Failed to distribute eBook.');
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

  const textMutedClass = isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* =========================================================================
          1. HEADER STRIP & SEARCH TOOLBAR
         ========================================================================= */}
      <div className={`rounded-3xl border p-5 sm:p-6 shadow-sm space-y-4 ${
        isDarkMode ? 'bg-[#0E1726] border-slate-800 text-white' : 'bg-white border-slate-200/90 text-slate-900'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border mb-2 ${
              isDarkMode ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-purple-50 text-purple-700 border-purple-200'
            }`}>
              <BookOpen className="h-3.5 w-3.5" />
              <span>Digital Study Library & Handbooks</span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              eBooks & Digital Study Material
            </h2>
            <p className={`text-xs mt-1 ${textMutedClass}`}>
              Distribute platform-approved eBooks, NEET & JEE practice modules, and formula handbooks to batches or individual students.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-extrabold text-white shadow-md hover:bg-purple-500 transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Upload Study Material</span>
            </button>

            <div className={`px-4 py-2 rounded-2xl border text-center ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-2xs'
            }`}>
              <span className={`text-[10px] font-extrabold uppercase tracking-wider block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Digital Library</span>
              <span className="text-base font-black text-purple-600 dark:text-purple-400">{booksList.length} eBooks</span>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 px-3.5 py-2 text-xs font-extrabold text-purple-600 dark:text-purple-400 shrink-0">
              <Sparkles className="h-4 w-4" />
              <span>Full Access Unlocked</span>
            </span>
          </div>
        </div>

        {/* SEARCH AND CATEGORY FILTERS ROW */}
        <div className={`pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isDarkMode ? 'border-slate-800/80' : 'border-slate-200'
        }`}>
          {/* High-Contrast Search Input */}
          <div className="relative w-full sm:w-96">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
            <input
              type="text"
              placeholder="Search eBooks, formula handbooks, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 text-xs font-semibold rounded-xl border transition ${
                isDarkMode
                  ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-purple-400'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-purple-600 focus:bg-white shadow-2xs'
              }`}
            />
          </div>

          {/* Subject Filter Pills */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <Filter className={`h-4 w-4 shrink-0 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
            {['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Foundation'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition shrink-0 cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-purple-600 text-white shadow-md font-black'
                    : isDarkMode
                    ? 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/90'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. EBOOKS CARD GRID (UNCONGESTED SPACIOUS LAYOUT WITH PROPER BADGES & COVER)
         ========================================================================= */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => {
            const IconComponent = book.icon || BookOpen;

            return (
              <div
                key={book.id}
                className={`group rounded-3xl border-2 p-5 sm:p-6 space-y-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden ${
                  isDarkMode
                    ? 'bg-[#0E1726] border-slate-800 text-white hover:border-purple-500/40'
                    : 'bg-white border-slate-200/90 text-slate-900 shadow-sm hover:border-purple-300'
                }`}
              >
                {/* CARD TOP ROW: SUBJECT BADGE + EXAM BADGE */}
                <div className="flex items-center justify-between gap-2">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-extrabold uppercase tracking-wider border ${book.badgeBg}`}>
                    <IconComponent className="h-3.5 w-3.5 shrink-0" />
                    <span>{book.subject}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-xl border ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}>
                    {book.target_exam || 'NEET / JEE'}
                  </span>
                </div>

                {/* BOOK VISUAL COVER + TITLE & AUTHOR */}
                <div className="flex items-center gap-4 py-1">
                  {/* Compact 16x20 Cover Badge */}
                  <div className={`h-20 w-16 rounded-2xl bg-gradient-to-tr ${book.color} text-white p-2 flex flex-col justify-between shadow-md shrink-0 border border-white/20 relative overflow-hidden`}>
                    <span className="text-[9px] font-black uppercase tracking-wider opacity-90">{book.subject?.substring(0, 3)}</span>
                    <IconComponent className="h-6 w-6 opacity-90 mx-auto my-auto" />
                    <span className="text-[7px] font-mono font-bold opacity-80 uppercase text-center">PDF MODULE</span>
                  </div>

                  {/* Title & Author info */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className={`text-sm font-black leading-snug tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {book.title}
                    </h3>
                    <p className={`text-xs ${textMutedClass}`}>
                      Author: <span className={isDarkMode ? 'text-slate-200 font-bold' : 'text-slate-800 font-bold'}>{book.author || 'Edvedum Faculty'}</span>
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className={`text-xs leading-relaxed line-clamp-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600 font-medium'}`}>
                  {book.description}
                </p>

                {/* Format Specs Grid */}
                <div className={`grid grid-cols-2 gap-3 p-3 rounded-2xl border text-xs ${
                  isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200/80'
                }`}>
                  <div>
                    <span className={`block text-[10px] font-extrabold uppercase ${textMutedClass}`}>Target Class</span>
                    <strong className={`text-xs font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{book.class_level || 'Class 11 & 12'}</strong>
                  </div>
                  <div>
                    <span className={`block text-[10px] font-extrabold uppercase ${textMutedClass}`}>Format & Volume</span>
                    <strong className="text-xs font-extrabold text-purple-600 dark:text-purple-400">{book.pages || 160} Pages • {book.file_size || '10 MB'}</strong>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className={`pt-3 border-t flex items-center gap-2 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                  <button
                    onClick={() => setPreviewEbook(book)}
                    className={`py-2 px-3 rounded-xl border text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      isDarkMode
                        ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                        : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 shadow-2xs'
                    }`}
                  >
                    <Eye className="h-3.5 w-3.5 text-purple-500 dark:text-purple-400" />
                    <span>Preview</span>
                  </button>

                  <button
                    onClick={() => handleOpenAssignModal(book)}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-black bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 text-white shadow-md hover:brightness-110 active:scale-98 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Assign eBook</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className={`rounded-3xl border p-12 text-center space-y-4 ${
          isDarkMode ? 'bg-[#0E1726] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
        }`}>
          <div className="h-16 w-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
            <BookOpen className="h-8 w-8" />
          </div>
          <h3 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No eBooks match your search or filter</h3>
          <p className={`text-xs max-w-sm mx-auto ${textMutedClass}`}>
            Try searching for a different subject, class level, or clear your subject filters.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setCategoryFilter('All'); }}
            className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md hover:bg-purple-500 transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewEbook && (
        <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 sm:p-7 space-y-5 my-auto ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className={`flex items-start justify-between border-b pb-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-2xl bg-gradient-to-tr ${previewEbook.color} text-white flex items-center justify-center shadow-md shrink-0`}>
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${previewEbook.badgeBg}`}>
                    {previewEbook.subject}
                  </span>
                  <h3 className={`text-base font-black mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {previewEbook.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setPreviewEbook(null)}
                className={`p-1.5 rounded-xl transition ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className={`p-4 rounded-2xl border space-y-2 ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`text-[10px] font-extrabold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Summary & Course Scope</span>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700 font-medium'}`}>{previewEbook.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className={`text-[10px] font-extrabold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Author / Faculty</span>
                  <p className={`font-bold mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{previewEbook.author}</p>
                </div>
                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className={`text-[10px] font-extrabold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Target Exam</span>
                  <p className="font-bold text-purple-600 dark:text-purple-400 mt-0.5">{previewEbook.target_exam || 'NEET / JEE'}</p>
                </div>
                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className={`text-[10px] font-extrabold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Target Class</span>
                  <p className={`font-bold mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{previewEbook.class_level}</p>
                </div>
                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className={`text-[10px] font-extrabold uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>PDF Document Size</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{previewEbook.pages || 160} Pages ({previewEbook.file_size || '10 MB'})</p>
                </div>
              </div>
            </div>

            <div className={`pt-3 border-t flex items-center justify-end gap-3 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <button
                type="button"
                onClick={() => setPreviewEbook(null)}
                className={`px-4 py-2 rounded-xl border text-xs font-bold ${
                  isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const b = previewEbook;
                  setPreviewEbook(null);
                  handleOpenAssignModal(b);
                }}
                className="px-5 py-2 rounded-xl bg-purple-600 text-white text-xs font-extrabold hover:bg-purple-500 shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Assign eBook to Batch</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ASSIGN EBOOK MODAL */}
      {selectedEbook && (
        <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div
            className={`w-full max-w-lg rounded-3xl border p-6 sm:p-7 space-y-5 shadow-2xl relative my-auto animate-in zoom-in-95 ${
              isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <h3 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Distribute eBook Study Material</h3>
                  <p className={`text-xs ${textMutedClass}`}>Select target academic batch or student group</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEbook(null)}
                className={`p-1.5 rounded-xl transition cursor-pointer ${
                  isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${
              isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[10px] font-extrabold uppercase text-purple-600 dark:text-purple-400 tracking-wider">Target Digital Resource</span>
              <h4 className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedEbook.title}</h4>
            </div>

            <form onSubmit={handleAssignSubmit} className="space-y-4 text-xs">
              <div>
                <label className={`block font-extrabold uppercase mb-1.5 ${textMutedClass}`}>Distribution Scope</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTargetType('batch');
                      if (batches.length > 0) setTargetId(String(batches[0].id));
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      targetType === 'batch'
                        ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                        : isDarkMode
                        ? 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Batch</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTargetType('student');
                      if (students.length > 0) setTargetId(String(students[0].id));
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      targetType === 'student'
                        ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                        : isDarkMode
                        ? 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <User className="h-3.5 w-3.5" />
                    <span>Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTargetType('institution');
                      setTargetId('');
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      targetType === 'institution'
                        ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                        : isDarkMode
                        ? 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <Building2 className="h-3.5 w-3.5" />
                    <span>School</span>
                  </button>
                </div>
              </div>

              {targetType === 'batch' && (
                <div>
                  <label className={`block font-extrabold uppercase mb-1.5 ${textMutedClass}`}>Target Academic Batch</label>
                  <select
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    required
                    className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      isDarkMode
                        ? 'border-slate-800 bg-slate-900 text-slate-200'
                        : 'border-slate-300 bg-slate-50 text-slate-900'
                    }`}
                  >
                    {batches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.batch_name || b.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {targetType === 'student' && (
                <div>
                  <label className={`block font-extrabold uppercase mb-1.5 ${textMutedClass}`}>Target Enrolled Student</label>
                  <select
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    required
                    className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      isDarkMode
                        ? 'border-slate-800 bg-slate-900 text-slate-200'
                        : 'border-slate-300 bg-slate-50 text-slate-900'
                    }`}
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.roll_number || s.email})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className={`pt-3 border-t flex justify-end gap-3 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
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
                  className="px-5 py-2 rounded-xl bg-purple-600 font-bold text-white shadow-md hover:bg-purple-500 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{assigning ? 'Distributing...' : 'Confirm eBook Distribution'}</span>
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
