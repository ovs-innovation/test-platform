import { useState, useEffect } from 'react';
import { BookOpen, Download, Search, FileText, Sparkles, ExternalLink, Filter } from 'lucide-react';
import { ebookService } from '../../lib/services.js';
import { useToast } from '../../context/ToastContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { Spinner } from '../../components/ui.jsx';

export default function MyEbooks() {
  const toast = useToast();
  const { dark: isDarkMode } = useTheme();
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
    if (s.includes('phys')) return {
      gradient: 'from-blue-600 to-indigo-600',
      badge: isDarkMode ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' : 'text-blue-700 bg-blue-50 border-blue-200'
    };
    if (s.includes('chem')) return {
      gradient: 'from-emerald-600 to-teal-600',
      badge: isDarkMode ? 'text-teal-400 bg-teal-500/10 border-teal-500/20' : 'text-teal-700 bg-teal-50 border-teal-200'
    };
    if (s.includes('bio')) return {
      gradient: 'from-purple-600 to-pink-600',
      badge: isDarkMode ? 'text-purple-400 bg-purple-500/10 border-purple-500/20' : 'text-purple-700 bg-purple-50 border-purple-200'
    };
    if (s.includes('math')) return {
      gradient: 'from-amber-600 to-orange-600',
      badge: isDarkMode ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-amber-800 bg-amber-50 border-amber-200'
    };
    return {
      gradient: 'from-purple-600 to-indigo-600',
      badge: isDarkMode ? 'text-purple-400 bg-purple-500/10 border-purple-500/20' : 'text-purple-700 bg-purple-50 border-purple-200'
    };
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* HEADER BANNER */}
      <div className={`rounded-3xl border p-6 sm:p-8 shadow-sm relative overflow-hidden transition-colors ${
        isDarkMode
          ? 'bg-[#0E1726] border-slate-800 text-white shadow-xl'
          : 'bg-white border-slate-200/90 text-slate-900 shadow-sm'
      }`}>
        <div className={`absolute -right-10 -bottom-10 w-60 h-60 rounded-full blur-3xl pointer-events-none ${
          isDarkMode ? 'bg-purple-500/10' : 'bg-purple-500/5'
        }`} />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${
              isDarkMode
                ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                : 'bg-purple-50 text-purple-700 border-purple-200'
            }`}>
              <BookOpen className="h-4 w-4" />
              <span>Digital Study Library</span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Assigned eBooks & Digital Study Material
            </h1>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium'
            }`}>
              Access subject handbooks, formula sheets, chapter notes, and custom practice modules assigned directly by your institution faculty.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-xs font-extrabold ${
              isDarkMode
                ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                : 'bg-purple-50 border-purple-200 text-purple-700'
            }`}>
              <Sparkles className="h-4 w-4 text-purple-500" />
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
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : isDarkMode
                  ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'bg-white border border-slate-200/90 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-2xs'
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
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs transition focus:outline-none focus:border-purple-500 ${
              isDarkMode
                ? 'border-slate-800 bg-[#0E1726] text-slate-200 placeholder-slate-500'
                : 'border-slate-200/90 bg-white text-slate-900 placeholder-slate-400 shadow-2xs'
            }`}
          />
        </div>
      </div>

      {/* EBOOKS GRID */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <Spinner className="h-8 w-8 text-purple-400 mx-auto" />
          <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Loading assigned study materials...</p>
        </div>
      ) : filteredEbooks.length === 0 ? (
        <div className={`rounded-3xl border p-12 text-center space-y-4 shadow-sm ${
          isDarkMode
            ? 'border-slate-800 bg-[#0E1726]'
            : 'border-slate-200/90 bg-white text-slate-900'
        }`}>
          <div className={`h-16 w-16 rounded-2xl border flex items-center justify-center mx-auto ${
            isDarkMode
              ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
              : 'bg-purple-50 border-purple-200 text-purple-600'
          }`}>
            <FileText className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className={`text-base font-black ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              No Study Materials Found
            </h3>
            <p className={`text-xs max-w-md mx-auto ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium'
            }`}>
              {searchQuery || selectedSubject !== 'All'
                ? 'No study materials match your filter or search query.'
                : 'No eBooks or reference modules assigned yet. Your institution faculty will assign reference handbooks here.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEbooks.map((book) => {
            const styleConfig = getSubjectColor(book.subject);
            return (
              <div
                key={book.id}
                className={`rounded-3xl border p-6 space-y-5 shadow-sm transition flex flex-col justify-between group relative ${
                  isDarkMode
                    ? 'border-slate-800 bg-[#0E1726] text-white hover:border-purple-500/40'
                    : 'border-slate-200/90 bg-white text-slate-900 hover:border-purple-300 hover:shadow-md'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className={`h-16 w-14 rounded-2xl bg-gradient-to-tr ${styleConfig.gradient} text-white font-black text-xs flex items-center justify-center shadow-lg shrink-0 p-1 text-center uppercase tracking-wider`}>
                      {book.subject ? book.subject.substring(0, 3) : 'PDF'}
                    </div>

                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider border ${styleConfig.badge}`}>
                      {book.subject || 'General'}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className={`text-base font-extrabold leading-snug transition ${
                      isDarkMode ? 'text-white group-hover:text-purple-300' : 'text-slate-900 group-hover:text-purple-600'
                    }`}>
                      {book.title}
                    </h3>
                    {book.author && (
                      <p className={`text-xs font-semibold ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        Author: <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{book.author}</span>
                      </p>
                    )}
                    {book.description && (
                      <p className={`text-xs line-clamp-2 leading-relaxed pt-1 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium'
                      }`}>
                        {book.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className={`pt-4 border-t flex items-center justify-between gap-3 ${
                  isDarkMode ? 'border-slate-800/60' : 'border-slate-100'
                }`}>
                  <span className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border ${
                    isDarkMode
                      ? 'bg-slate-900 text-slate-400 border-slate-800'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}>
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

