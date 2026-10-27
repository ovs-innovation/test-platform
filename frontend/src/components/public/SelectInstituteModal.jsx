import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Search,
  X,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  School,
  GraduationCap
} from 'lucide-react';
import { authService } from '../../lib/services.js';
import { Spinner } from '../ui.jsx';

export default function SelectInstituteModal({ isOpen, onClose, onSelectInstitute }) {
  const navigate = useNavigate();
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Reset search
    setSearchQuery('');
    setLoading(true);

    let isMounted = true;
    authService
      .getPublicInstitutions()
      .then((res) => {
        if (isMounted && res?.institutions) {
          setInstitutions(res.institutions);
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch public institutions:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Auto-focus search after modal transitions in
    const focusTimer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);

    return () => {
      isMounted = false;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = institutions.filter((inst) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      inst.name?.toLowerCase().includes(q) ||
      inst.code?.toLowerCase().includes(q) ||
      inst.city?.toLowerCase().includes(q)
    );
  });

  const handleChoose = (inst) => {
    onClose();
    if (typeof onSelectInstitute === 'function') {
      onSelectInstitute(inst);
    } else {
      navigate(`/institute/${encodeURIComponent(inst.code)}/login`);
    }
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="select-institute-modal-title"
      className="fixed inset-0 z-[1200] bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-xl rounded-3xl border border-slate-700/80 bg-[#070e24] text-white shadow-2xl shadow-cyan-950/40 p-5 sm:p-6 space-y-5 relative my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
              <School className="h-6 w-6" />
            </div>
            <div>
              <h3 id="select-institute-modal-title" className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>Select Your Institute / School</span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  <Sparkles className="h-2.5 w-2.5" /> Partner Portal
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Choose your coaching institute or school to access your dedicated student portal.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition cursor-pointer shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by institute name, code, or city (e.g. Drona, Kota, DRON-2026)..."
            className="w-full rounded-2xl border border-slate-700/80 bg-[#0b1633] pl-10 pr-9 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:border-[#00F0FF] focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/50 transition shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Institutes List */}
        <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-400">
              <Spinner className="h-6 w-6 text-cyan-400" />
              <p className="text-xs font-semibold">Loading partner institutions...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10 px-4 rounded-2xl border border-slate-800 bg-[#091228] space-y-3">
              <div className="h-10 w-10 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 mx-auto">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">No matching institute found</p>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  We could not find any institute matching <span className="text-cyan-300 font-mono">"{searchQuery}"</span>. Please check your spelling or contact your institute administrator.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-cyan-400 hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          ) : (
            filtered.map((inst) => (
              <button
                key={inst.id || inst.code}
                type="button"
                onClick={() => handleChoose(inst)}
                className="w-full flex items-center justify-between gap-3.5 p-3 sm:p-3.5 rounded-2xl border border-slate-800 bg-[#08122c]/90 hover:bg-[#0f1d42] hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-950/30 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Institute Logo or Badge */}
                  {inst.logo_url ? (
                    <img
                      src={inst.logo_url}
                      alt={inst.name}
                      className="h-11 w-11 rounded-xl object-contain bg-white/10 p-1 border border-white/15 shrink-0 group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div
                      className="h-11 w-11 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md shrink-0 group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: inst.accent_color || '#4f46e5' }}
                    >
                      {inst.logo_badge || inst.name?.substring(0, 3).toUpperCase() || 'INS'}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-white group-hover:text-cyan-300 transition-colors truncate">
                        {inst.name}
                      </span>
                      <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        Verified
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                      <span className="font-mono font-semibold text-slate-300 bg-slate-800/60 px-1.5 py-0.5 rounded border border-slate-700/60">
                        {inst.code}
                      </span>
                      {inst.city && (
                        <span className="flex items-center gap-1 truncate text-slate-400">
                          <MapPin className="h-3 w-3 text-slate-500 shrink-0" />
                          <span>{inst.city}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-cyan-400 transition-colors">
                  <span className="hidden sm:inline">Open Portal</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>Not an affiliated institute student?</span>
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate('/student-login');
            }}
            className="font-bold text-cyan-400 hover:underline cursor-pointer"
          >
            Direct Student Login →
          </button>
        </div>

      </div>
    </div>
  );

  if (typeof document === 'undefined') return modalContent;
  return createPortal(modalContent, document.body);
}
