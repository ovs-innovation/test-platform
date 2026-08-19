import { useState, useEffect } from 'react';
import { BookOpen, Download, Search, FileText, Sparkles, ExternalLink, Filter } from 'lucide-react';
import { ebookService } from '../../lib/services.js';
import { useToast } from '../../context/ToastContext.jsx';
import { Spinner } from '../../components/ui.jsx';

export default function MyEbooks() {
  const toast = useToast();
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');

  useEffect(() => {
    fetchMyEbooks();
  }, []);

  const fetchMyEbooks = async () => {
    setLoading(true);
    try {
      const data = await ebookService.myEbooks();
      setEbooks(data || []);
    } catch (err) {
      console.error('Failed to load eBooks:', err);
      toast.error('Failed to load study materials.');
    } finally {
      setLoading(false);
    }
  };

  const subjects = ['All', 'Physics', 'Chemistry', 'Biology', 'Mathematics'];

  const filteredEbooks = ebooks.filter((b) => {
    const matchesSubject = selectedSubject === 'All' || (b.subject && b.subject.toLowerCase() === selectedSubject.toLowerCase());
    const matchesSearch =
      !searchQuery ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.author && b.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.description && b.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  const getPdfUrl = (url) => {
    if (!url) return '#';
    if (url.startsWith('http')) return url;
    return `http://127.0.0.1:5000${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const getSubjectColor = (subject) => {
    const s = (subject || '').toLowerCase();
    if (s.includes('phys')) return 'from-blue-600 to-indigo-600 text-blue-400 bg-blue-500/10 border-blue-500/20';
    if (s.includes('chem')) return 'from-emerald-600 to-teal-600 text-teal-400 bg-teal-500/10 border-teal-500/20';
    if (s.includes('bio')) return 'from-purple-600 to-pink-600 text-purple-400 bg-purple-500/10 border-purple-500/20';
    if (s.includes('math')) return 'from-amber-600 to-orange-600 text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'from-purple-600 to-indigo-600 text-purple-400 bg-purple-500/10 border-purple-500/20';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* HEADER BANNER */}
      <div className="rounded-3xl border border-slate-800 bg-[#0E1726] p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <BookOpen className="h-4 w-4" />
              <span>Digital Study Library</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Assigned eBooks & Digital Study Material
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Access subject handbooks, formula sheets, chapter notes, and custom practice modules assigned directly by your institution faculty.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-2 rounded-2xl bg-purple-500/10 border border-purple-500/20 px-4 py-2 text-xs font-extrabold text-purple-400">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span>{ebooks.length} Resources Unlocked</span>
            </span>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* SUBJECT TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedSubject === sub
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* SEARCH INPUT */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search material or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 bg-[#0E1726] text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
          />
        </div>
      </div>

      {/* EBOOKS GRID */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <Spinner className="h-8 w-8 text-purple-400 mx-auto" />
          <p className="text-xs text-slate-400 font-semibold">Loading assigned study materials...</p>
        </div>
      ) : filteredEbooks.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-[#0E1726] p-12 text-center space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
            <FileText className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-white">No Study Materials Found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {searchQuery || selectedSubject !== 'All'
                ? 'No study materials match your filter or search query.'
                : 'No eBooks or reference modules assigned yet. Your institution faculty will assign reference handbooks here.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEbooks.map((book) => {
            const colorClass = getSubjectColor(book.subject);
            return (
              <div
                key={book.id}
                className="rounded-3xl border border-slate-800 bg-[#0E1726] p-6 space-y-5 shadow-xl hover:border-purple-500/40 transition flex flex-col justify-between group relative"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className={`h-16 w-14 rounded-2xl bg-gradient-to-tr ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} text-white font-black text-xs flex items-center justify-center shadow-lg shrink-0 p-1 text-center uppercase tracking-wider`}>
                      {book.subject ? book.subject.substring(0, 3) : 'PDF'}
                    </div>

                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider border ${colorClass.split(' ').slice(2).join(' ')}`}>
                      {book.subject || 'General'}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-extrabold text-white group-hover:text-purple-300 transition leading-snug">
                      {book.title}
                    </h3>
                    {book.author && (
                      <p className="text-xs font-semibold text-slate-400">
                        Author: <span className="text-slate-300">{book.author}</span>
                      </p>
                    )}
                    {book.description && (
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed pt-1">
                        {book.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                    {book.class_level || 'Class 11 & 12'}
                  </span>

                  <a
                    href={getPdfUrl(book.pdf_url)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-extrabold text-white shadow-md hover:bg-purple-500 transition cursor-pointer"
                  >
                    <span>Open PDF</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
