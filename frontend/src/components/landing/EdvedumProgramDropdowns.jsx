import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const SENIOR_CLASS_OPTIONS = [
  { label: 'Class 11', value: '11' },
  { label: 'Class 12', value: '12' },
  { label: 'Dropper / Passed 12', value: 'passed-12' },
];

const FOUNDATION_CLASS_OPTIONS = [6, 7, 8, 9, 10].map((n) => ({
  label: `Class ${n}`,
  value: String(n),
}));

const TEST_SERIES_OPTIONS = [
  { label: 'JEE Test Series', filter: 'jee' },
  { label: 'NEET Test Series', filter: 'neet' },
];

export const PROGRAM_SECTIONS = [
  {
    title: 'JEE',
    subtitle: 'Main + Advanced',
    desc: 'Engineering entrance — Physics, Chemistry & Maths',
    filter: 'jee',
    theme: 'jee',
    icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
  },
  {
    title: 'NEET',
    subtitle: 'UG Medical',
    desc: 'Medical entrance — Biology, Physics & Chemistry',
    filter: 'neet',
    theme: 'neet',
    badge: 'Popular',
    icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
  },
  {
    title: 'Foundation',
    subtitle: 'Class 6 – 10',
    desc: 'Early preparation for future doctors & engineers',
    filter: 'foundation',
    theme: 'foundation',
    icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
  },
  {
    title: 'Test Series',
    subtitle: 'All India Mocks',
    desc: 'Full-length mocks with rank & analysis',
    filter: null,
    theme: 'series',
    icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
  },
];

const THEME_STYLES = {
  jee: {
    icon: 'bg-gradient-to-br from-[#0D6EFD] to-[#2563eb] text-white shadow-blue-500/30',
    ring: 'ring-[#0D6EFD]/40',
    border: 'border-[#0D6EFD]',
    header: 'bg-gradient-to-r from-[#0D6EFD] to-[#2563eb]',
    hover: 'hover:border-[#0D6EFD] hover:bg-blue-50/70 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-[1.025]',
    active: 'border-[#0D6EFD] bg-blue-50/90 shadow-md shadow-blue-100',
    link: 'hover:bg-blue-50 hover:text-[#0D6EFD]',
    chip: 'bg-blue-100 text-[#0D6EFD]',
    viewAll: 'text-[#0D6EFD] hover:text-blue-700',
  },
  neet: {
    icon: 'bg-gradient-to-br from-[#00F0FF] to-[#06b6d4] text-slate-950 shadow-cyan-500/30',
    ring: 'ring-cyan-400/40',
    border: 'border-[#00F0FF]',
    header: 'bg-gradient-to-r from-[#00b4d8] to-[#06b6d4]',
    hover: 'hover:border-[#00F0FF] hover:bg-cyan-50/70 hover:shadow-lg hover:shadow-cyan-500/10 hover:scale-[1.025]',
    active: 'border-[#00F0FF] bg-cyan-50/90 shadow-md shadow-cyan-100',
    link: 'hover:bg-cyan-50 hover:text-cyan-800',
    chip: 'bg-cyan-100 text-cyan-800',
    viewAll: 'text-cyan-700 hover:text-cyan-800',
  },
  foundation: {
    icon: 'bg-gradient-to-br from-[#4F46E5] to-indigo-700 text-white shadow-indigo-500/30',
    ring: 'ring-indigo-400/40',
    border: 'border-[#4F46E5]',
    header: 'bg-gradient-to-r from-[#4F46E5] to-indigo-700',
    hover: 'hover:border-[#4F46E5] hover:bg-indigo-50/70 hover:shadow-lg hover:shadow-indigo-500/10 hover:scale-[1.025]',
    active: 'border-[#4F46E5] bg-indigo-50/90 shadow-md shadow-indigo-100',
    link: 'hover:bg-indigo-50 hover:text-[#4F46E5]',
    chip: 'bg-indigo-100 text-[#4F46E5]',
    viewAll: 'text-[#4F46E5] hover:text-indigo-700',
  },
  series: {
    icon: 'bg-gradient-to-br from-[#7C3AED] to-purple-700 text-white shadow-purple-500/30',
    ring: 'ring-purple-400/40',
    border: 'border-[#7C3AED]',
    header: 'bg-gradient-to-r from-[#7C3AED] to-purple-700',
    hover: 'hover:border-[#7C3AED] hover:bg-purple-50/70 hover:shadow-lg hover:shadow-purple-500/10 hover:scale-[1.025]',
    active: 'border-[#7C3AED] bg-purple-50/90 shadow-md shadow-purple-100',
    link: 'hover:bg-purple-50 hover:text-[#7C3AED]',
    chip: 'bg-violet-100 text-[#7C3AED]',
    viewAll: 'text-[#7C3AED] hover:text-purple-700',
  },
};

function getDropdownOptions(section) {
  if (section.title === 'Foundation') return FOUNDATION_CLASS_OPTIONS;
  if (section.title === 'Test Series') return TEST_SERIES_OPTIONS;
  return SENIOR_CLASS_OPTIONS;
}

function dropdownLink(section, option) {
  if (section.title === 'Test Series') return `/test-series?filter=${option.filter}`;
  const params = new URLSearchParams();
  if (section.filter) params.set('filter', section.filter);
  if (option.value) params.set('class', option.value);
  return `/test-series?${params.toString()}`;
}

function viewAllLink(section) {
  if (section.filter) return `/test-series?filter=${section.filter}`;
  return '/test-series';
}

function ProgramDropdown({ section, isOpen, onToggle, onClose }) {
  const theme = THEME_STYLES[section.theme];
  const options = getDropdownOptions(section);

  return (
    <div className="relative">
      {section.badge && (
        <span className="absolute -top-3 right-4 z-10 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#06b6d4] px-2.5 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider text-slate-950 shadow-md shadow-cyan-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-950 animate-pulse" />
          {section.badge}
        </span>
      )}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`group relative flex w-full items-center gap-3.5 rounded-2xl border-2 bg-white px-4 py-4 text-left transition-all duration-300 cursor-pointer ${
          theme.hover
        } ${
          isOpen
            ? `ring-4 ${theme.ring} ${theme.active} scale-[1.02]`
            : section.badge
            ? 'border-[#00F0FF]/60 shadow-md shadow-cyan-500/5'
            : 'border-slate-200/90'
        }`}
      >
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 ${theme.icon}`}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d={section.icon} />
          </svg>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-bold text-slate-900">{section.title}</span>
          <span className="block text-[12px] text-slate-500">{section.subtitle}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 xl:inline">
            {isOpen ? 'Close' : 'Select'}
          </span>
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
            isOpen ? `${theme.border} bg-white shadow-xs` : 'border-slate-200 bg-slate-50 group-hover:border-slate-300 group-hover:bg-white'
          }`}>
            <svg
              className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-slate-900' : 'group-hover:text-slate-600'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2.5 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="mb-2 px-3 pt-2.5 pb-1 flex items-center justify-between border-b border-slate-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{section.title} Target Class</p>
            <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 ${theme.chip}`}>
              {options.length} Options
            </span>
          </div>
          <div className="space-y-0.5">
            {options.map((opt) => (
              <Link
                key={opt.label}
                to={dropdownLink(section, opt)}
                onClick={onClose}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition duration-150 ${theme.link}`}
              >
                <span>{opt.label}</span>
                <span className="text-slate-400 transition-transform duration-150 group-hover:translate-x-0.5">→</span>
              </Link>
            ))}
          </div>

          <div className="mt-2 border-t border-slate-100 pt-2 px-1 pb-1">
            <Link
              to={viewAllLink(section)}
              onClick={onClose}
              className={`flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold transition duration-150 ${theme.viewAll}`}
            >
              <span>Explore all {section.title} tests</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EdvedumProgramDropdowns() {
  const [activeTitle, setActiveTitle] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveTitle(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
      {PROGRAM_SECTIONS.map((sec) => (
        <ProgramDropdown
          key={sec.title}
          section={sec}
          isOpen={activeTitle === sec.title}
          onToggle={() => setActiveTitle((curr) => (curr === sec.title ? null : sec.title))}
          onClose={() => setActiveTitle(null)}
        />
      ))}
    </div>
  );
}

export function ProgramDropdownGrid() {
  return <EdvedumProgramDropdowns />;
}

