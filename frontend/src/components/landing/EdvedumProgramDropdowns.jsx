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
    icon: 'bg-gradient-to-br from-orange-500 to-amber-600 shadow-orange-500/30',
    ring: 'ring-orange-400/40',
    border: 'border-orange-400',
    header: 'bg-gradient-to-r from-orange-500 to-amber-500',
    hover: 'hover:border-orange-300 hover:bg-orange-50/60',
    active: 'border-orange-400 bg-orange-50/80 shadow-md shadow-orange-100',
    link: 'hover:bg-orange-50 hover:text-orange-700',
    chip: 'bg-orange-100 text-orange-800',
    viewAll: 'text-orange-600 hover:text-orange-700',
  },
  neet: {
    icon: 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30',
    ring: 'ring-emerald-400/40',
    border: 'border-emerald-400',
    header: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    hover: 'hover:border-emerald-300 hover:bg-emerald-50/60',
    active: 'border-emerald-400 bg-emerald-50/80 shadow-md shadow-emerald-100',
    link: 'hover:bg-emerald-50 hover:text-emerald-700',
    chip: 'bg-emerald-100 text-emerald-800',
    viewAll: 'text-emerald-600 hover:text-emerald-700',
  },
  foundation: {
    icon: 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-500/30',
    ring: 'ring-violet-400/40',
    border: 'border-violet-400',
    header: 'bg-gradient-to-r from-violet-500 to-purple-500',
    hover: 'hover:border-violet-300 hover:bg-violet-50/60',
    active: 'border-violet-400 bg-violet-50/80 shadow-md shadow-violet-100',
    link: 'hover:bg-violet-50 hover:text-violet-700',
    chip: 'bg-violet-100 text-violet-800',
    viewAll: 'text-violet-600 hover:text-violet-700',
  },
  series: {
    icon: 'bg-gradient-to-br from-blue-600 to-indigo-600 shadow-blue-500/30',
    ring: 'ring-blue-400/40',
    border: 'border-blue-400',
    header: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    hover: 'hover:border-blue-300 hover:bg-blue-50/60',
    active: 'border-blue-400 bg-blue-50/80 shadow-md shadow-blue-100',
    link: 'hover:bg-blue-50 hover:text-blue-700',
    chip: 'bg-blue-100 text-blue-800',
    viewAll: 'text-blue-600 hover:text-blue-700',
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
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`group flex w-full items-center gap-3.5 rounded-2xl border-2 bg-white px-4 py-4 text-left transition-all duration-200 ${theme.hover} ${
          isOpen ? `ring-4 ${theme.ring} ${theme.active}` : 'border-slate-200/90'
        }`}
      >
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-lg ${theme.icon}`}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d={section.icon} />
          </svg>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-bold text-slate-900">{section.title}</span>
          <span className="block text-[12px] text-slate-500">{section.subtitle}</span>
        </span>
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${
          isOpen ? `${theme.border} bg-white` : 'border-slate-200 bg-slate-50 group-hover:border-slate-300'
        }`}>
          <svg
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="program-dropdown-panel absolute left-0 right-0 top-[calc(100%+10px)] z-50 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-300/40">
          <div className={`px-4 py-3 ${theme.header}`}>
            <p className="text-[13px] font-bold text-white">{section.title}</p>
            <p className="mt-0.5 text-[11px] text-white/85">{section.desc}</p>
          </div>
          <div className="p-2">
            <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {section.title === 'Test Series' ? 'Choose exam' : 'Select class'}
            </p>
            <ul className="space-y-0.5">
              {options.map((option, i) => (
                <li key={option.filter || option.value}>
                  <Link
                    to={dropdownLink(section, option)}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-slate-700 transition ${theme.link}`}
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold ${theme.chip}`}>
                      {i + 1}
                    </span>
                    {option.label}
                    <svg className="ml-auto h-4 w-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-1 border-t border-slate-100 px-2 pt-2">
              <Link
                to={viewAllLink(section)}
                onClick={onClose}
                className={`flex items-center justify-center gap-1 rounded-xl py-2.5 text-[12px] font-semibold transition ${theme.viewAll}`}
              >
                View all {section.title} courses
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProgramDropdownGrid({ className = '' }) {
  const [openProgram, setOpenProgram] = useState(null);
  const programsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (programsRef.current && !programsRef.current.contains(e.target)) {
        setOpenProgram(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={programsRef} className={className}>
      <div className="mb-5 flex flex-col items-center gap-1 sm:flex-row sm:justify-center sm:gap-3">
        <span className="hidden h-px w-8 bg-slate-200 sm:block" aria-hidden />
        <p className="text-center text-[13px] font-bold uppercase tracking-[0.2em] text-slate-700">
          Choose your program
        </p>
        <span className="hidden h-px w-8 bg-slate-200 sm:block" aria-hidden />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {PROGRAM_SECTIONS.map((section) => (
          <ProgramDropdown
            key={section.title}
            section={section}
            isOpen={openProgram === section.title}
            onToggle={() => setOpenProgram((c) => (c === section.title ? null : section.title))}
            onClose={() => setOpenProgram(null)}
          />
        ))}
      </div>
    </div>
  );
}

export default function EdvedumProgramDropdowns() {
  return (
    <section className="relative z-20 px-4 lg:px-8">
      <div className="edvedum-section-wrap !px-0">
        <div className="edvedum-program-bar">
          <ProgramDropdownGrid />
        </div>
      </div>
    </section>
  );
}
