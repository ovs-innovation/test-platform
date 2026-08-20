import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const SENIOR_CLASS_OPTIONS = [
  { label: 'Class 11', value: '11' },
  { label: 'Class 12', value: '12' },
  { label: 'Dropper / Passed 12', value: 'passed-12' },
];

const TEST_SERIES_OPTIONS = [
  { label: 'JEE Test Series', filter: 'jee' },
  { label: 'NEET UG Test Series', filter: 'neet' },
  { label: 'NEET PG Test Series', filter: 'neetpg' },
];

export const PROGRAM_SECTIONS = [
  {
    id: 'jee',
    title: 'JEE',
    subtitle: 'Main + Advanced',
    desc: 'Engineering entrance — Physics, Chemistry & Maths',
    filter: 'jee',
    theme: 'jee',
    studentImage: '/images/home/categories/jee-student-approved.png',
    bgColor: 'bg-[#f0f7ff]',
    hoverBg: 'hover:bg-blue-50/90',
    borderColor: 'border-blue-200/90 hover:border-blue-500',
    activeBorder: 'border-blue-600 ring-4 ring-blue-500/20',
    iconBg: 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-blue-500/25',
    icon: Star,
    imageStyle: {
      height: '172px',
      right: '-15px',
      bottom: '2px',
    },
  },
  {
    id: 'neet',
    title: 'NEET',
    subtitle: 'UG Medical',
    desc: 'Medical entrance — Biology, Physics & Chemistry',
    filter: 'neet',
    theme: 'neet',
    badge: 'Popular',
    studentImage: '/images/home/categories/neet-student-approved.png',
    bgColor: 'bg-[#ecfeff]',
    hoverBg: 'hover:bg-cyan-50/90',
    borderColor: 'border-cyan-200/90 hover:border-cyan-500',
    activeBorder: 'border-cyan-500 ring-4 ring-cyan-500/20',
    iconBg: 'bg-gradient-to-tr from-cyan-500 to-teal-500 text-white shadow-cyan-500/25',
    icon: Heart,
    imageStyle: {
      height: '176px',
      right: '12px',
      bottom: '-8px',
    },
  },
  {
    id: 'foundation',
    title: 'Foundation',
    subtitle: 'Class 6 – 10',
    desc: 'Early preparation for future doctors & engineers',
    filter: 'foundation',
    theme: 'foundation',
    badge: 'Coming Soon',
    disabled: true,
    studentImage: '/images/home/categories/foundation-student-approved.png',
    bgColor: 'bg-[#f5f3ff]',
    hoverBg: 'hover:bg-indigo-50/90',
    borderColor: 'border-indigo-200/90 hover:border-indigo-400',
    activeBorder: 'border-indigo-500 ring-4 ring-indigo-500/20',
    iconBg: 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-indigo-500/25',
    icon: GraduationCap,
    imageStyle: {
      height: '180px',
      right: '-2px',
      bottom: '-6px',
    },
  },
  {
    id: 'testSeries',
    title: 'Test Series',
    subtitle: 'All India Mocks',
    desc: 'Full-length mocks with rank & analysis',
    filter: null,
    theme: 'series',
    studentImage: '/images/home/categories/test-series-student-approved.png',
    bgColor: 'bg-[#faf5ff]',
    hoverBg: 'hover:bg-purple-50/90',
    borderColor: 'border-purple-200/90 hover:border-purple-500',
    activeBorder: 'border-purple-600 ring-4 ring-purple-500/20',
    iconBg: 'bg-gradient-to-tr from-purple-600 to-violet-600 text-white shadow-purple-500/25',
    icon: FileText,
    imageStyle: {
      height: '180px',
      right: '-4px',
      bottom: '-4px',
    },
  },
];

const THEME_STYLES = {
  jee: {
    link: 'hover:bg-blue-50 hover:text-blue-600',
    chip: 'bg-blue-100 text-blue-700',
    viewAll: 'bg-blue-50/80 text-blue-600 hover:bg-blue-100/80',
  },
  neet: {
    link: 'hover:bg-cyan-50 hover:text-cyan-700',
    chip: 'bg-cyan-100 text-cyan-800',
    viewAll: 'bg-cyan-50/80 text-cyan-700 hover:bg-cyan-100/80',
  },
  foundation: {
    link: 'hover:bg-indigo-50 hover:text-indigo-600',
    chip: 'bg-indigo-100 text-indigo-700',
    viewAll: 'bg-indigo-50/80 text-indigo-600 hover:bg-indigo-100/80',
  },
  series: {
    link: 'hover:bg-purple-50 hover:text-purple-600',
    chip: 'bg-purple-100 text-purple-700',
    viewAll: 'bg-purple-50/80 text-purple-600 hover:bg-purple-100/80',
  },
};

function getDropdownOptions(section) {
  if (section.id === 'testSeries') return TEST_SERIES_OPTIONS;
  if (section.id === 'jee' || section.id === 'neet') return SENIOR_CLASS_OPTIONS;
  return [];
}

function dropdownLink(section, option) {
  if (section.id === 'testSeries') return `/test-series?filter=${option.filter}`;
  const params = new URLSearchParams();
  if (section.filter) params.set('filter', section.filter);
  if (option.value) params.set('class', option.value);
  return `/test-series?${params.toString()}`;
}

function viewAllLink(section) {
  if (section.filter) return `/test-series?filter=${section.filter}`;
  return '/test-series';
}

function getHeaderTitle(section) {
  if (section.id === 'jee') return 'JEE TARGET CLASS';
  if (section.id === 'neet') return 'NEET TARGET CLASS';
  if (section.id === 'testSeries') return 'TEST SERIES OPTIONS';
  return `${section.title.toUpperCase()} TARGET CLASS`;
}

function getCtaText(section) {
  if (section.id === 'jee') return 'Explore all JEE tests';
  if (section.id === 'neet') return 'Explore all NEET tests';
  if (section.id === 'testSeries') return 'Explore all Test Series';
  return `Explore all ${section.title} tests`;
}

function ProgramCard({ section, isOpen, onToggle, onClose }) {
  const theme = THEME_STYLES[section.theme];
  const options = getDropdownOptions(section);
  const isDisabled = Boolean(section.disabled);
  const IconComponent = section.icon;

  const handleCardClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDisabled) return;
    onToggle();
  };

  return (
    <div className="relative group overflow-visible">
      {/* BADGE LAYER ON TOP (z-30: Positioned at -top-3 right-4 above card top border) */}
      {section.badge && (
        <span
          className={`absolute -top-3 right-4 z-30 inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-[10.5px] font-extrabold uppercase tracking-wider shadow-md ${
            isDisabled
              ? 'bg-amber-500 text-white shadow-amber-500/20 border border-amber-400'
              : 'bg-gradient-to-r from-[#00F0FF] to-[#06b6d4] text-slate-950 shadow-cyan-500/20'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${isDisabled ? 'bg-white' : 'bg-slate-950'} animate-pulse`} />
          {section.badge}
        </span>
      )}

      {/* CARD MAIN BUTTON CONTAINER (Height: 187px, Rounded: 20px) */}
      <button
        type="button"
        onClick={handleCardClick}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={`group relative flex w-full h-[187px] overflow-hidden rounded-[20px] border-2 text-left transition-all duration-200 shadow-sm ${
          section.bgColor
        } ${isDisabled ? 'opacity-90 cursor-not-allowed border-slate-200' : `${section.hoverBg} cursor-pointer hover:shadow-xl hover:-translate-y-0.5 ${
          isOpen ? section.activeBorder : section.borderColor
        }`}`}
      >
        {/* LAYER 1: PALE CARD BACKGROUND */}
        <div className="absolute inset-0 z-0 pointer-events-none" />

        {/* LAYER 2: ABSOLUTE STUDENT CUTOUT IMAGE (z-10, limited width on mobile to avoid covering text) */}
        <img
          src={section.studentImage}
          alt=""
          className="absolute z-10 pointer-events-none object-contain object-bottom max-w-[48%] sm:max-w-none transition-transform duration-200 group-hover:-translate-y-1 drop-shadow-sm"
          style={{
            height: section.imageStyle.height,
            right: section.imageStyle.right,
            bottom: section.imageStyle.bottom,
            transform: section.imageStyle.transform,
          }}
          loading="eager"
        />

        {/* LAYER 3: INTERACTIVE CONTENT (z-20, text container) */}
        <div className="relative z-20 flex flex-col justify-between p-4 sm:p-5 w-[56%] sm:w-[64%] h-full pointer-events-none pr-1 sm:pr-0">
          
          {/* UPPER HEADER: TITLES */}
          <div className="flex items-center gap-3">
            <div className="min-w-0">
              <h3 className="text-[18px] sm:text-[20px] font-black text-slate-900 leading-tight whitespace-nowrap">
                {section.title}
              </h3>
              <p className="text-[13px] sm:text-[14px] font-semibold text-slate-500 mt-0.5 whitespace-nowrap">
                {section.subtitle}
              </p>
            </div>
          </div>

          {/* LOWER CONTROL: SELECT LABEL & CIRCULAR ARROW BUTTON (Min 44px touch area) */}
          <div className="flex items-center gap-2 pt-2 min-h-[44px]">
            {isDisabled ? (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300/80 text-[11px] font-extrabold uppercase tracking-wider">
                Coming Soon
              </span>
            ) : (
              <div className="flex items-center gap-2 py-1">
                <span className="text-[13px] font-black uppercase tracking-wider text-slate-700 group-hover:text-slate-900">
                  {isOpen ? 'CLOSE' : 'SELECT'}
                </span>
                <div className={`h-[34px] w-[34px] sm:h-[32px] sm:w-[32px] rounded-full border flex items-center justify-center bg-white shadow-xs transition-all duration-200 ${
                  isOpen ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 text-slate-600 group-hover:border-slate-400 group-hover:scale-110'
                }`}>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : 'group-hover:translate-x-0.5'}`} />
                </div>
              </div>
            )}
          </div>
        </div>
      </button>

      {/* ENHANCED DROPDOWN MENU FOR CLASS/COURSE OPTIONS */}
      {isOpen && !isDisabled && (
        <div
          className={`absolute left-0 right-0 top-full z-50 mt-2 sm:mt-3 w-full min-w-full rounded-3xl border-2 bg-white/95 backdrop-blur-xl p-3 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.22)] animate-in fade-in slide-in-from-top-3 duration-200 ${
            section.theme === 'jee' ? 'border-blue-400/50 shadow-blue-500/10' :
            section.theme === 'neet' ? 'border-cyan-400/50 shadow-cyan-500/10' :
            section.theme === 'foundation' ? 'border-indigo-400/50 shadow-indigo-500/10' :
            'border-purple-400/50 shadow-purple-500/10'
          }`}
        >
          {/* POPUP HEADER */}
          <div className="mb-2 px-3.5 py-2.5 flex items-center justify-between border-b border-slate-100 bg-slate-50/80 rounded-2xl">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <p className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                {getHeaderTitle(section)}
              </p>
            </div>
            <span className={`text-[10px] font-extrabold rounded-full px-2.5 py-0.5 ${theme.chip}`}>
              {options.length} Options
            </span>
          </div>

          {/* OPTIONS LIST */}
          <div className="space-y-1">
            {options.map((opt) => (
              <Link
                key={opt.label}
                to={dropdownLink(section, opt)}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className={`group/opt flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 px-3.5 py-2.5 text-xs font-bold text-slate-800 transition-all duration-150 ${theme.link}`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-blue-500 group-hover/opt:scale-125 transition-transform" />
                  <span>{opt.label}</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 transition-transform duration-150 group-hover/opt:translate-x-1 group-hover/opt:text-blue-600" />
              </Link>
            ))}
          </div>

          {/* BOTTOM EXPLORE CTA */}
          <div className="mt-2.5 border-t border-slate-100 pt-2.5">
            <Link
              to={viewAllLink(section)}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className={`flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-xs font-extrabold transition-all duration-150 ${theme.viewAll}`}
            >
              <span>{getCtaText(section)}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EdvedumProgramDropdowns() {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenDropdownId(null);
      }
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setOpenDropdownId(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 overflow-visible relative">
      {PROGRAM_SECTIONS.map((sec) => (
        <ProgramCard
          key={sec.id}
          section={sec}
          isOpen={openDropdownId === sec.id}
          onToggle={() => setOpenDropdownId((curr) => (curr === sec.id ? null : sec.id))}
          onClose={() => setOpenDropdownId(null)}
        />
      ))}
    </div>
  );
}

export function ProgramDropdownGrid() {
  return <EdvedumProgramDropdowns />;
}


