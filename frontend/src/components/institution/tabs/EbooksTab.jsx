import { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  FileText,
  Search,
  Filter,
  Eye,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Download,
  Calendar,
  RefreshCw,
  X,
  Maximize2,
  Info,
  CheckCircle2,
  Layers,
  FileDown,
  User,
  Users,
  UserPlus,
  Send,
  Trash2
} from 'lucide-react';
import { institutionDashboardService } from '../../../lib/services.js';

export default function EbooksTab({
  availableEbooks = [],
  batches = [],
  students = [],
  onAssignEbook,
  onUnassignEbook,
  instId,
  isDarkMode = true,
}) {
  const [ebooks, setEbooks] = useState(availableEbooks);
  const [loading, setLoading] = useState(false);
  const [previewEbook, setPreviewEbook] = useState(null);
  const [modalTab, setModalTab] = useState('reader'); // 'reader' | 'info'
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Assignment Modal States
  const [assignModalBook, setAssignModalBook] = useState(null);
  const [assignScope, setAssignScope] = useState('batch'); // 'batch' | 'student' | 'all'
  const [targetId, setTargetId] = useState('');
  const [studentSearch, setStudentSearch] = useState('');
  const [assigning, setAssigning] = useState(false);

  const deduplicateBooks = (list) => {
    if (!Array.isArray(list)) return [];
    const map = new Map();
    for (const item of list) {
      if (item && item.id) {
        if (!map.has(item.id)) {
          map.set(item.id, item);
        } else {
          const existing = map.get(item.id);
          const combinedRoster = [...(existing.roster_assignments || []), ...(item.roster_assignments || [])];
          const uniqueRoster = Array.from(
            new Map(combinedRoster.map((r) => [r.assignment_id || `${r.assigned_to_type}-${r.assigned_to_id}`, r])).values()
          );
          map.set(item.id, { ...existing, roster_assignments: uniqueRoster });
        }
      }
    }
    return Array.from(map.values());
  };

  useEffect(() => {
    if (availableEbooks && availableEbooks.length > 0) {
      setEbooks(deduplicateBooks(availableEbooks));
    }
  }, [availableEbooks]);

  const loadAssignedEbooks = async () => {
    if (!instId) return;
    setLoading(true);
    try {
      const res = await institutionDashboardService.availableEbooks(instId);
      if (res?.ebooks) {
        setEbooks(deduplicateBooks(res.ebooks));
      }
    } catch (err) {
      console.error('Failed to load assigned ebooks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignedEbooks();
  }, [instId]);

  useEffect(() => {
    if (assignModalBook) {
      if (assignScope === 'batch' && batches.length > 0) {
        setTargetId(String(batches[0].id));
      } else if (assignScope === 'student' && students.length > 0) {
        setTargetId(String(students[0].id));
      } else {
        setTargetId('');
      }
    }
  }, [assignModalBook, assignScope, batches, students]);

  const handleAssignSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!assignModalBook) return;

    setAssigning(true);
    try {
      const payload = {
        assign_to: assignScope,
        target_id: assignScope === 'all' ? null : Number(targetId || (assignScope === 'batch' ? batches[0]?.id : students[0]?.id)),
      };

      if (onAssignEbook) {
        await onAssignEbook(assignModalBook.id, payload);
      } else {
        await institutionDashboardService.assignEbook(instId, assignModalBook.id, payload);
      }
      setAssignModalBook(null);
      await loadAssignedEbooks();
    } catch (err) {
      console.error('Failed to assign ebook:', err);
    } finally {
      setAssigning(false);
    }
  };

  const handleRevokeAssignment = async (ebookId, assignmentId) => {
    if (!window.confirm('Are you sure you want to revoke this eBook assignment?')) return;
    try {
      if (onUnassignEbook) {
        await onUnassignEbook(ebookId, assignmentId);
      } else {
        await institutionDashboardService.unassignEbook(instId, ebookId, assignmentId);
      }
      await loadAssignedEbooks();
      if (previewEbook && previewEbook.id === ebookId) {
        setPreviewEbook((prev) => ({
          ...prev,
          roster_assignments: (prev.roster_assignments || []).filter((a) => a.assignment_id !== assignmentId),
        }));
      }
    } catch (err) {
      console.error('Failed to revoke assignment:', err);
    }
  };

  useEffect(() => {
    if (previewEbook) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [previewEbook]);

  const categories = ['All', 'Physics', 'Chemistry', 'Biology', 'Mathematics', 'General'];

  const getPdfUrl = (url) => {
    if (!url) return '#';
    if (url.startsWith('http')) return url;
    return url.startsWith('/') ? url : `/${url}`;
  };

  const getSubjectMeta = (subject = '') => {
    const s = subject.toLowerCase();
    if (s.includes('phys')) return {
      gradient: 'from-blue-600 to-indigo-600',
      badge: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    };
    if (s.includes('chem')) return {
      gradient: 'from-emerald-600 to-teal-600',
      badge: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
    };
    if (s.includes('bio')) return {
      gradient: 'from-rose-600 to-pink-600',
      badge: 'bg-rose-500/10 text-rose-500 border-rose-500/20'
    };
    if (s.includes('math')) return {
      gradient: 'from-amber-600 to-orange-600',
      badge: 'bg-amber-500/10 text-amber-500 border-amber-500/20'
    };
    return {
      gradient: 'from-purple-600 to-indigo-600',
      badge: 'bg-purple-500/10 text-purple-500 border-purple-500/20'
    };
  };

  const filteredBooks = useMemo(() => {
    return ebooks.filter((b) => {
      const matchesCategory = categoryFilter === 'All' || (b.subject && b.subject.toLowerCase() === categoryFilter.toLowerCase());
      const matchesSearch =
        !searchQuery ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.author && b.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (b.description && b.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [ebooks, categoryFilter, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* HEADER & ADMIN ASSIGNMENT NOTICE */}
      <div className={`p-6 rounded-3xl border shadow-sm ${isDarkMode ? 'bg-[#0b1329] border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center border border-purple-500/20">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h2 className={`text-xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Assigned eBooks & Study Material
                </h2>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Curated digital modules, formula handbooks, and revision materials assigned to your institution by Platform Administrators.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-500/10 text-purple-500 border border-purple-500/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin Assigned Only</span>
            </span>
            <span className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
              {ebooks.length} Resources Unlocked
            </span>
            <button
              onClick={loadAssignedEbooks}
              disabled={loading}
              title="Refresh assigned eBooks"
              className={`p-2 rounded-xl border transition-colors flex items-center justify-center cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-purple-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, topics, authors..."
              className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs font-semibold border transition ${
                isDarkMode
                  ? 'bg-slate-900/80 border-slate-800 text-white placeholder:text-slate-500 focus:border-purple-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-purple-500'
              } focus:outline-none`}
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-purple-600 text-white shadow-sm'
                    : isDarkMode
                    ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* EBOOKS GRID */}
      {loading && ebooks.length === 0 ? (
        <div className={`p-16 text-center rounded-3xl border ${isDarkMode ? 'bg-[#0b1329] border-slate-800' : 'bg-white border-slate-200'}`}>
          <RefreshCw className="h-8 w-8 text-purple-500 animate-spin mx-auto mb-3" />
          <h3 className={`text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Loading Assigned eBooks...
          </h3>
          <p className={`text-xs max-w-md mx-auto mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Fetching latest study materials assigned to your institution...
          </p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className={`p-12 text-center rounded-3xl border ${isDarkMode ? 'bg-[#0b1329] border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="h-14 w-14 rounded-3xl bg-purple-500/10 text-purple-500 mx-auto flex items-center justify-center border border-purple-500/20 mb-3">
            <BookOpen className="h-7 w-7" />
          </div>
          <h3 className={`text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {searchQuery || categoryFilter !== 'All' ? 'No matching eBooks found' : 'No eBooks Assigned Yet'}
          </h3>
          <p className={`text-xs max-w-md mx-auto mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {searchQuery || categoryFilter !== 'All'
              ? 'Try resetting your search query or subject filters to view other materials.'
              : 'Your platform administrator has not assigned any digital study modules or formula books to this institution yet. Contact admin to request materials.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBooks.map((b) => {
            const meta = getSubjectMeta(b.subject);
            return (
              <div
                key={b.id}
                className={`rounded-3xl border overflow-hidden transition-all duration-200 hover:shadow-lg flex flex-col justify-between ${
                  isDarkMode
                    ? 'bg-[#0b1329] border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* CARD HEADER COVER */}
                <div className={`p-5 bg-gradient-to-tr ${meta.gradient} text-white relative overflow-hidden`}>
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white">
                      {b.subject || 'General'}
                    </span>
                    <span className="text-[10px] font-extrabold text-white/90">
                      {b.class_level || 'Class 11 & 12'}
                    </span>
                  </div>

                  <div className="mt-6 mb-1 relative z-10">
                    <h3 className="text-base font-black leading-snug drop-shadow-sm line-clamp-2">
                      {b.title}
                    </h3>
                    <p className="text-xs text-white/80 font-semibold mt-1">
                      {b.author || 'Academic Panel'}
                    </p>
                  </div>

                  <BookOpen className="absolute -bottom-4 -right-4 h-24 w-24 text-white/10" />
                </div>

                {/* CARD BODY */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className={`text-xs line-clamp-3 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {b.description || 'Comprehensive digital study material and test-series revision handbook curated for competitive success.'}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500 font-semibold'}>
                        Pages & Format
                      </span>
                      <span className={`font-extrabold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                        {b.pages ? `${b.pages} Pages` : 'PDF Document'} {b.file_size ? `(${b.file_size})` : ''}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500 font-semibold'}>
                        Assigned By
                      </span>
                      <span className="font-extrabold text-purple-500 flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" />
                        Admin
                      </span>
                    </div>
                  </div>

                  {/* ACTIVE ROSTER ASSIGNMENTS ON CARD */}
                  {b.roster_assignments && b.roster_assignments.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <p className="text-[10px] font-bold text-slate-400 mb-1 flex items-center gap-1">
                        <Users className="h-3 w-3 text-indigo-400" />
                        <span>Allocated Roster ({b.roster_assignments.length}):</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
                        {b.roster_assignments.map((ra) => (
                          <span
                            key={ra.assignment_id}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                          >
                            <span>{ra.assigned_to_type === 'batch' ? `Batch: ${ra.batch_name}` : `Student: ${ra.student_name}`}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRevokeAssignment(b.id, ra.assignment_id);
                              }}
                              title="Revoke access"
                              className="text-indigo-400 hover:text-red-400 cursor-pointer ml-0.5"
                            >
                              <X className="h-2.5 w-2.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ACTION BUTTONS */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => {
                        setPreviewEbook(b);
                        setModalTab('reader');
                      }}
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition flex items-center justify-center gap-1.5 shadow-md hover:shadow-purple-500/20 cursor-pointer"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Read</span>
                    </button>

                    <button
                      onClick={() => {
                        setAssignModalBook(b);
                        setAssignScope('batch');
                        if (batches.length > 0) setTargetId(String(batches[0].id));
                      }}
                      className="py-2 px-3 rounded-xl text-xs font-extrabold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center justify-center gap-1.5 shadow-md hover:shadow-indigo-500/20 cursor-pointer"
                      title="Assign this eBook to a batch or student"
                    >
                      <UserPlus className="h-3.5 w-3.5" />
                      <span>Assign</span>
                    </button>

                    <a
                      href={getPdfUrl(b.pdf_url)}
                      target="_blank"
                      rel="noreferrer"
                      className={`py-2 px-2.5 rounded-xl text-xs font-extrabold border transition flex items-center justify-center cursor-pointer ${
                        isDarkMode
                          ? 'bg-slate-900/90 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                      title="Open in new tab"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* COMPREHENSIVE INTERACTIVE eBOOK READER & DOCUMENT VIEWER MODAL */}
      {previewEbook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-[96vw] max-w-6xl h-[92vh] max-h-[950px] rounded-3xl border border-slate-700/80 bg-[#0B132B] shadow-2xl flex flex-col overflow-hidden text-white relative animate-in zoom-in-95 duration-200">
            {/* TOP CONTROL BAR */}
            <div className="px-5 py-3.5 border-b border-slate-800/90 bg-[#0E1838] flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`h-10 w-10 rounded-2xl bg-gradient-to-tr ${getSubjectMeta(previewEbook.subject).gradient} text-white flex items-center justify-center shadow-md shrink-0`}>
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${getSubjectMeta(previewEbook.subject).badge}`}>
                      {previewEbook.subject || 'General'}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      {previewEbook.class_level || 'Class 11 & 12'}
                    </span>
                    <span className="hidden sm:inline text-slate-600">•</span>
                    <span className="hidden sm:inline text-[11px] text-slate-400 font-medium">
                      by <strong className="text-slate-200">{previewEbook.author || 'Edvedum Academic Panel'}</strong>
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white truncate max-w-md md:max-w-xl">
                    {previewEbook.title}
                  </h3>
                </div>
              </div>

              {/* ACTION TOOLBAR */}
              <div className="flex items-center gap-2">
                {/* MOBILE VIEW TOGGLE */}
                <div className="flex lg:hidden bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-xs">
                  <button
                    onClick={() => setModalTab('reader')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition ${
                      modalTab === 'reader' ? 'bg-purple-600 text-white shadow' : 'text-slate-400'
                    }`}
                  >
                    Reader
                  </button>
                  <button
                    onClick={() => setModalTab('info')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition ${
                      modalTab === 'info' ? 'bg-purple-600 text-white shadow' : 'text-slate-400'
                    }`}
                  >
                    Details
                  </button>
                </div>

                <button
                  onClick={() => {
                    setAssignModalBook(previewEbook);
                    setAssignScope('batch');
                    if (batches.length > 0) setTargetId(String(batches[0].id));
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1.5 shadow-md cursor-pointer"
                  title="Assign to Batch or Student"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>Assign</span>
                </button>

                <a
                  href={getPdfUrl(previewEbook.pdf_url)}
                  download
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-900/90 border border-slate-700/80 hover:bg-slate-800 text-slate-200 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
                  title="Download PDF"
                >
                  <Download className="h-3.5 w-3.5 text-slate-300" />
                  <span className="hidden md:inline">Download</span>
                </a>

                <a
                  href={getPdfUrl(previewEbook.pdf_url)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition flex items-center gap-1.5 shadow-md cursor-pointer"
                  title="Open full document in new tab"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Pop Out</span>
                </a>

                <button
                  onClick={() => setPreviewEbook(null)}
                  className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                  title="Close viewer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-[#060D1E]">
              {/* DOCUMENT VIEWER STAGE */}
              <div className={`lg:col-span-8 xl:col-span-9 flex flex-col h-full bg-slate-900/50 relative ${
                modalTab === 'reader' ? 'flex' : 'hidden lg:flex'
              }`}>
                <div className="flex-1 w-full h-full relative overflow-hidden bg-slate-950 flex flex-col">
                  {previewEbook.pdf_url ? (
                    <object
                      data={`${getPdfUrl(previewEbook.pdf_url)}#toolbar=1&navpanes=0`}
                      type="application/pdf"
                      className="w-full h-full border-0 bg-white"
                    >
                      <iframe
                        src={`${getPdfUrl(previewEbook.pdf_url)}#toolbar=1&navpanes=0`}
                        className="w-full h-full border-0 bg-white"
                        title={previewEbook.title}
                      >
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
                          <FileText className="h-16 w-16 text-slate-600 mx-auto" />
                          <p className="text-sm font-bold text-slate-400">PDF Reader</p>
                          <a
                            href={getPdfUrl(previewEbook.pdf_url)}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs"
                          >
                            Open PDF in New Window
                          </a>
                        </div>
                      </iframe>
                    </object>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
                      <FileText className="h-16 w-16 text-slate-600" />
                      <p className="text-sm font-bold text-slate-400">PDF document link is being processed.</p>
                      <a
                        href={getPdfUrl(previewEbook.pdf_url)}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs"
                      >
                        Try Opening in Browser
                      </a>
                    </div>
                  )}
                </div>

                <div className="px-4 py-2 bg-[#091124] border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 truncate">
                    <Sparkles className="h-3 w-3 text-purple-400" />
                    <span>Unlocked for your institution • Synchronized with enrolled candidate accounts</span>
                  </span>
                  <span className="hidden sm:inline font-mono font-bold text-slate-500">
                    {previewEbook.pages ? `${previewEbook.pages} Pages` : 'PDF'}
                  </span>
                </div>
              </div>

              {/* METADATA & INSTITUTION DETAILS SIDEBAR */}
              <div className={`lg:col-span-4 xl:col-span-3 border-l border-slate-800/90 bg-[#0B1428] flex flex-col justify-between overflow-y-auto p-5 space-y-5 ${
                modalTab === 'info' ? 'flex' : 'hidden lg:flex'
              }`}>
                <div className="space-y-5">
                  {/* ABOUT SECTION */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Info className="h-3.5 w-3.5 text-purple-400" />
                      Curated Overview
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                      {previewEbook.description || 'Curated high-yield study material designed for in-depth conceptual revision and competitive examination problem solving.'}
                    </p>
                  </div>

                  {/* SPECIFICATION PILLS */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Handbook Specifications
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                        <p className="text-[10px] font-bold text-slate-400">Subject</p>
                        <p className="text-xs font-extrabold text-white mt-0.5">{previewEbook.subject || 'General'}</p>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                        <p className="text-[10px] font-bold text-slate-400">Target Standard</p>
                        <p className="text-xs font-extrabold text-white mt-0.5">{previewEbook.class_level || 'Class 11 & 12'}</p>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                        <p className="text-[10px] font-bold text-slate-400">Length & Size</p>
                        <p className="text-xs font-extrabold text-emerald-400 mt-0.5">
                          {previewEbook.pages ? `${previewEbook.pages} Pages` : 'PDF'} {previewEbook.file_size ? `(${previewEbook.file_size})` : ''}
                        </p>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                        <p className="text-[10px] font-bold text-slate-400">Faculty / Author</p>
                        <p className="text-xs font-extrabold text-purple-300 mt-0.5 truncate">{previewEbook.author || 'Academic Panel'}</p>
                      </div>
                    </div>
                  </div>

                  {/* ACCESS BADGE CARD & ROSTER ASSIGNMENT */}
                  <div className="p-4 rounded-2xl border border-purple-500/20 bg-purple-500/5 space-y-3">
                    <div className="flex items-center justify-between text-purple-400">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 shrink-0" />
                        <h4 className="text-xs font-extrabold">Institution Entitlement</h4>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">Unlocked</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      Assigned by platform administrators. You can allocate this study material directly to your batches or individual students.
                    </p>

                    <button
                      onClick={() => {
                        setAssignModalBook(previewEbook);
                        setAssignScope('batch');
                        if (batches.length > 0) setTargetId(String(batches[0].id));
                      }}
                      className="w-full py-2.5 px-3 rounded-xl font-extrabold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <UserPlus className="h-3.5 w-3.5" />
                      <span>Assign to Batch or Student</span>
                    </button>

                    {previewEbook.roster_assignments && previewEbook.roster_assignments.length > 0 && (
                      <div className="pt-2 border-t border-purple-500/20 space-y-1.5">
                        <p className="text-[10px] font-bold text-slate-400">Active Roster Access ({previewEbook.roster_assignments.length}):</p>
                        <div className="flex flex-wrap gap-1.5">
                          {previewEbook.roster_assignments.map((ra) => (
                            <span
                              key={ra.assignment_id}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                            >
                              <span>{ra.assigned_to_type === 'batch' ? `Batch: ${ra.batch_name}` : `Student: ${ra.student_name}`}</span>
                              <button
                                onClick={() => handleRevokeAssignment(previewEbook.id, ra.assignment_id)}
                                title="Revoke access"
                                className="hover:text-red-400 cursor-pointer ml-0.5"
                              >
                                <X className="h-2.5 w-2.5" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* BOTTOM QUICK ACTIONS */}
                <div className="space-y-2 pt-4 border-t border-slate-800/80">
                  <a
                    href={getPdfUrl(previewEbook.pdf_url)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl font-extrabold text-xs bg-purple-600 hover:bg-purple-500 text-white transition flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 cursor-pointer"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Open in Fullscreen Tab</span>
                  </a>

                  <button
                    onClick={() => setPreviewEbook(null)}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition cursor-pointer"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ASSIGN eBOOK TO BATCH / STUDENT MODAL */}
      {assignModalBook && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div
            className={`w-full max-w-lg rounded-3xl border p-6 sm:p-7 space-y-5 shadow-2xl relative my-auto animate-in zoom-in-95 ${
              isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* MODAL HEADER */}
            <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Assign eBook to Roster
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Allocate material to batches or individual students
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAssignModalBook(null)}
                className={`p-1.5 rounded-xl transition cursor-pointer ${
                  isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* TARGET eBOOK PILL */}
            <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
              isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={`h-9 w-9 rounded-xl bg-gradient-to-tr ${getSubjectMeta(assignModalBook.subject).gradient} text-white flex items-center justify-center shadow-sm shrink-0`}>
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h4 className={`text-xs font-black truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {assignModalBook.title}
                </h4>
                <p className={`text-[11px] truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {assignModalBook.subject} • {assignModalBook.class_level || 'Class 11 & 12'} • by {assignModalBook.author || 'Academic Panel'}
                </p>
              </div>
            </div>

            <form onSubmit={handleAssignSubmit} className="space-y-4 text-xs">
              {/* SCOPE SELECTION BUTTONS */}
              <div>
                <label className={`block font-extrabold uppercase text-[10px] tracking-wider mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Assignment Target Scope
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAssignScope('batch');
                      if (batches.length > 0) setTargetId(String(batches[0].id));
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      assignScope === 'batch'
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
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
                      setAssignScope('student');
                      if (students.length > 0) setTargetId(String(students[0].id));
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      assignScope === 'student'
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
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
                      setAssignScope('all');
                      setTargetId('');
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      assignScope === 'all'
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                        : isDarkMode
                        ? 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <Users className="h-3.5 w-3.5" />
                    <span>All Students</span>
                  </button>
                </div>
              </div>

              {/* TARGET DETAILS: BATCH SELECTOR */}
              {assignScope === 'batch' && (
                <div className="space-y-1.5">
                  <label className={`block font-bold text-[11px] ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Select Target Batch
                  </label>
                  {batches.length === 0 ? (
                    <p className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs">
                      No academic batches found in your institution. Create a batch first under the Batches tab.
                    </p>
                  ) : (
                    <select
                      value={targetId}
                      onChange={(e) => setTargetId(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border font-bold text-xs focus:outline-none focus:border-indigo-500 transition cursor-pointer ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-800 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    >
                      {batches.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.batch_name || b.name || `Batch #${b.id}`} ({b.student_count || b.students_count || 0} students enrolled)
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}

              {/* TARGET DETAILS: STUDENT SELECTOR */}
              {assignScope === 'student' && (
                <div className="space-y-2">
                  <label className={`block font-bold text-[11px] ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Select Candidate / Student
                  </label>
                  {students.length === 0 ? (
                    <p className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs">
                      No enrolled students found in your institution roster.
                    </p>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Search student by name or roll number..."
                        value={studentSearch}
                        onChange={(e) => setStudentSearch(e.target.value)}
                        className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:outline-none focus:border-indigo-500 transition ${
                          isDarkMode
                            ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                      <select
                        value={targetId}
                        onChange={(e) => setTargetId(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border font-bold text-xs focus:outline-none focus:border-indigo-500 transition cursor-pointer ${
                          isDarkMode
                            ? 'bg-slate-900 border-slate-800 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                        }`}
                        size={students.filter((s) => !studentSearch || s.name.toLowerCase().includes(studentSearch.toLowerCase()) || (s.roll_number && s.roll_number.toLowerCase().includes(studentSearch.toLowerCase()))).length > 5 ? 5 : undefined}
                      >
                        {students
                          .filter((s) => !studentSearch || s.name.toLowerCase().includes(studentSearch.toLowerCase()) || (s.roll_number && s.roll_number.toLowerCase().includes(studentSearch.toLowerCase())))
                          .map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name} {s.roll_number ? `(${s.roll_number})` : `(${s.email})`} • {s.batch_name || 'No Batch'}
                            </option>
                          ))}
                      </select>
                    </>
                  )}
                </div>
              )}

              {/* TARGET DETAILS: ALL STUDENTS */}
              {assignScope === 'all' && (
                <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 space-y-1">
                  <p className="font-extrabold flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                    <span>Institute-Wide Distribution</span>
                  </p>
                  <p className="text-[11px] leading-relaxed text-slate-300">
                    All currently enrolled students across every batch in your institution will immediately be able to view and read this handbook under their "My eBooks & Notes" section.
                  </p>
                </div>
              )}

              {/* FOOTER ACTIONS */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setAssignModalBook(null)}
                  disabled={assigning}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    isDarkMode
                      ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                      : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={assigning || (assignScope === 'batch' && batches.length === 0) || (assignScope === 'student' && students.length === 0)}
                  className="px-5 py-2.5 rounded-xl font-extrabold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50 cursor-pointer"
                >
                  {assigning ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Assigning...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Confirm Assignment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
