import { useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, ChevronDown, ChevronLeft, ChevronRight, Check, AlertTriangle, FileUp, FileText, Sparkles, UploadCloud, CheckCircle2, X, Image, BookOpen, Hash, Bookmark, Search, Plus, ExternalLink, BookmarkCheck, RotateCcw, ZoomIn, SlidersHorizontal, AlertCircle, CheckSquare, Layers, HelpCircle } from 'lucide-react';
import { questionBankService, adminService } from '../../lib/services.js';
import { LoadingScreen, Spinner, DataTable, Badge } from '../../components/ui.jsx';
import { AdminHeader } from '../../components/admin/AdminUI.jsx';
import ActionDropdown from '../../components/ActionDropdown.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import Modal from '../../components/Modal.jsx';
import { BANK_CSV_TEMPLATE, readFileAsText } from '../../lib/csv.js';
import QuestionImageUploader from '../../components/common/QuestionImageUploader.jsx';
import MathRenderer from '../../components/common/MathRenderer.jsx';
import { getMediaUrl } from '../../lib/media.js';

const tryParseArray = (val) => {
  if (Array.isArray(val)) return val;
  if (!val) return [];
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed;
      } catch { /* ignore */ }
    }
    if (trimmed.includes('|')) {
      return trimmed.split(/\s*\|\s*/).map((s) => s.trim()).filter(Boolean);
    }
    return [trimmed];
  }
  return [];
};

const DEFAULT_CATEGORIES = ['Physics', 'Chemistry', 'Mathematics', 'Botany', 'Zoology', 'Biology'];

export const isAssertionReason = (q) => {
  if (!q) return false;
  const t = String(q.question_type || '').toLowerCase().trim();
  if (t === 'assertion_reason' || t === 'assertion-reason') return true;
  if (Boolean(q.assertion_text && q.reason_text)) return true;
  const text = String(q.question_text || '');
  if (/assertion/i.test(text) && /reason/i.test(text)) return true;
  let opts = q.options;
  if (typeof opts === 'string') {
    try { opts = JSON.parse(opts); } catch (e) { /* ignore */ }
  }
  if (Array.isArray(opts)) {
    for (const opt of opts) {
      const optStr = typeof opt === 'object' && opt !== null ? (opt.text || '') : String(opt);
      if (/both\s+assertion\s*(&|and)\s*reason/i.test(optStr) || (/assertion\s+is\s+true/i.test(optStr) && /reason\s+is\s+false/i.test(optStr))) {
        return true;
      }
    }
  }
  return false;
};

export const isNumerical = (q) => {
  if (!q) return false;
  const t = String(q.question_type || '').toLowerCase().trim();
  return t === 'numerical' || t === 'integer';
};

export const isMCQ = (q) => {
  if (!q) return false;
  return !isAssertionReason(q) && !isNumerical(q);
};

function CustomSelectDropdown({ value, onChange, options, placeholder = 'Select option', disabled = false, className = '' }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getOptVal = (o) => (o.id !== undefined ? o.id : (o.value !== undefined ? o.value : o.name));

  const isMatchingOpt = (opt, targetVal) => {
    if (targetVal === '' || targetVal === null || targetVal === undefined) {
      const optVal = getOptVal(opt);
      return optVal === '' || optVal === null || optVal === undefined;
    }
    const optVal = getOptVal(opt);
    if (optVal !== undefined && optVal !== null && String(optVal) === String(targetVal)) {
      return true;
    }
    if (opt.name && String(opt.name).toLowerCase() === String(targetVal).toLowerCase()) {
      return true;
    }
    if (opt.label && String(opt.label).toLowerCase() === String(targetVal).toLowerCase()) {
      return true;
    }
    return false;
  };

  const selected = options.find((o) => isMatchingOpt(o, value));
  const displayLabel = selected ? (selected.label || selected.name) : (typeof value === 'string' && isNaN(Number(value)) && value !== '' ? value : placeholder);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optVal, opt) => {
    onChange(optVal, opt);
    setOpen(false);
  };

  return (
    <div className={`relative w-full ${open ? 'z-50' : 'z-auto'} ${className}`} ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2.5 px-3.5 text-xs font-bold text-slate-800 dark:text-slate-100 hover:border-blue-500/80 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
      >
        <span className="truncate">{displayLabel}</span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ${open ? 'rotate-180 text-blue-500' : ''}`} />
      </button>

      {open && !disabled && (
        <div
          className="absolute left-0 top-full mt-1.5 w-full z-50 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-2xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150 max-h-60 overflow-y-auto"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {options.map((opt, idx) => {
            const optVal = getOptVal(opt);
            const isSelected = isMatchingOpt(opt, value);
            return (
              <button
                key={optVal ?? opt.name ?? idx}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSelect(optVal, opt);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSelect(optVal, opt);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition cursor-pointer ${isSelected
                  ? 'bg-blue-600 text-white font-extrabold shadow-sm'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold'
                  }`}
              >
                <span>{opt.label || opt.name}</span>
                {isSelected && <Check className="h-4 w-4 text-white shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminQuestionBank() {
  const toast = useToast();
  const [category, setCategory] = useState('Physics');
  const [categoriesList, setCategoriesList] = useState(DEFAULT_CATEGORIES);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  // Multi-select Question Bank state
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [selectedQuestionsMap, setSelectedQuestionsMap] = useState({});
  const [createTestModalOpen, setCreateTestModalOpen] = useState(false);
  const [addToTestModalOpen, setAddToTestModalOpen] = useState(false);
  const [creatingTest, setCreatingTest] = useState(false);
  const [addingToTest, setAddingToTest] = useState(false);
  const [existingTestsList, setExistingTestsList] = useState([]);
  const [loadingExistingTests, setLoadingExistingTests] = useState(false);
  const [existingTestSearch, setExistingTestSearch] = useState('');
  const [selectedExistingTestId, setSelectedExistingTestId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'available' | 'already_chosen'
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'mcq' | 'assertion_reason' | 'numerical'
  const [selectedChapter, setSelectedChapter] = useState('all'); // 'all' | '<chapter_name>'
  const [chapterSearch, setChapterSearch] = useState('');
  const chapterSliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [testsModalQuestion, setTestsModalQuestion] = useState(null);
  const [previewImageModal, setPreviewImageModal] = useState(null); // { url, title }
  const [testForm, setTestForm] = useState({
    test_name: '',
    test_type: 'AIETS',
    test_date: new Date().toISOString().slice(0, 10),
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    max_marks: '',
    syllabus: '',
    is_published: true,
  });

  const selectedQuestionsList = useMemo(() => {
    return selectedQuestionIds.map((id) => selectedQuestionsMap[id]).filter(Boolean);
  }, [selectedQuestionIds, selectedQuestionsMap]);

  const totalSelectedMarks = useMemo(() => {
    return selectedQuestionsList.reduce((acc, q) => acc + (Number(q.marks) || 4), 0);
  }, [selectedQuestionsList]);

  const selectedCategoryBreakdown = useMemo(() => {
    const counts = {};
    selectedQuestionsList.forEach((q) => {
      const c = q.category || q.subject || 'General';
      counts[c] = (counts[c] || 0) + 1;
    });
    return Object.entries(counts).map(([cat, count]) => ({ cat, count }));
  }, [selectedQuestionsList]);

  const CHEMISTRY_STANDARD_11 = useMemo(() => [
    'Some Basic Concepts of Chemistry',
    'Solutions',
    'Electrochemistry',
    'Chemical Kinetics',
    'The p-Block Elements',
    'The d- and f-Block Elements',
    'Coordination Compounds',
    'Haloalkanes and Haloarenes',
    'Alcohols, Phenols and Ethers',
    'Aldehydes, Ketones and Carboxylic Acids',
    'Amines',
    'Biomolecules'
  ], []);

  const ZOOLOGY_STANDARD_6 = useMemo(() => [
    'Human Reproduction',
    'Reproductive Health',
    'Human Health & Disease',
    'Evolution',
    'Biotechnology - Principles and Processes',
    'Biotechnology and its Applications'
  ], []);

  const BOTANY_STANDARD = useMemo(() => [
    'The Living World',
    'Sexual Reproduction in Flowering Plants',
    'Principles of Inheritance and Variation',
    'Molecular Basis of Inheritance',
    'Microbes in Human Welfare',
    'Organisms and Populations',
    'Ecosystem',
    'Biodiversity and Conservation (Sacred groves)'
  ], []);

  const normChapterKey = (s) => (s || '').toLowerCase().replace(/&/g, 'and').replace(/[-:]/g, ' ').replace(/\(.*?\)/g, '').replace(/[^a-z0-9]/g, '');

  const formatChapterName = (str) => {
    if (!str) return 'General';
    const trimmed = String(str).trim();
    if (!trimmed) return 'General';

    if (category?.toLowerCase() === 'chemistry') {
      const normalized = normChapterKey(trimmed);
      const matched = CHEMISTRY_STANDARD_11.find((ch) => normChapterKey(ch) === normalized);
      if (matched) return matched;
      if (/p[- ]block/i.test(trimmed)) return 'The p-Block Elements';
      if (/d[- ]?(and|&)?[- ]?f[- ]block/i.test(trimmed)) return 'The d- and f-Block Elements';
      if (/coordination/i.test(trimmed)) return 'Coordination Compounds';
      if (/haloalkane/i.test(trimmed)) return 'Haloalkanes and Haloarenes';
      if (/alcohol/i.test(trimmed)) return 'Alcohols, Phenols and Ethers';
      if (/aldehyde|ketone|carboxylic/i.test(trimmed)) return 'Aldehydes, Ketones and Carboxylic Acids';
      if (/amine/i.test(trimmed)) return 'Amines';
      if (/biomolecule/i.test(trimmed)) return 'Biomolecules';
      if (/solution/i.test(trimmed)) return 'Solutions';
      if (/electrochem/i.test(trimmed)) return 'Electrochemistry';
      if (/kinetic/i.test(trimmed)) return 'Chemical Kinetics';
    }

    if (category?.toLowerCase() === 'zoology') {
      const normalized = normChapterKey(trimmed);
      const matched = ZOOLOGY_STANDARD_6.find((ch) => normChapterKey(ch) === normalized);
      if (matched) return matched;
      if (/human reproduction/i.test(trimmed)) return 'Human Reproduction';
      if (/reproductive health/i.test(trimmed)) return 'Reproductive Health';
      if (/health.*disease/i.test(trimmed)) return 'Human Health & Disease';
      if (/evolution/i.test(trimmed)) return 'Evolution';
      if (/biotechnology.*principles/i.test(trimmed)) return 'Biotechnology - Principles and Processes';
      if (/biotechnology.*applications/i.test(trimmed)) return 'Biotechnology and its Applications';
    }

    if (category?.toLowerCase() === 'botany') {
      const normalized = normChapterKey(trimmed);
      const matched = BOTANY_STANDARD.find((ch) => normChapterKey(ch) === normalized);
      if (matched) return matched;
      if (/living world/i.test(trimmed)) return 'The Living World';
      if (/sexual reproduction/i.test(trimmed)) return 'Sexual Reproduction in Flowering Plants';
      if (/principles.*inheritance/i.test(trimmed)) return 'Principles of Inheritance and Variation';
      if (/molecular.*inheritance/i.test(trimmed)) return 'Molecular Basis of Inheritance';
      if (/microbes/i.test(trimmed)) return 'Microbes in Human Welfare';
      if (/organism.*population/i.test(trimmed)) return 'Organisms and Populations';
      if (/ecosystem/i.test(trimmed)) return 'Ecosystem';
      if (/biodiversity/i.test(trimmed)) return 'Biodiversity and Conservation (Sacred groves)';
    }

    if (category?.toLowerCase() === 'physics') {
      if (/electrostatic/i.test(trimmed) || /capacitan/i.test(trimmed)) return 'Electrostatic Potential and Capacitance';
      if (/moving charges/i.test(trimmed)) return 'Moving Charges and Magnetism';
      if (/magnetism and matter/i.test(trimmed)) return 'Magnetism and Matter';
      if (/electromagnetic induction/i.test(trimmed)) return 'Electromagnetic Induction';
      if (/motion in straight line/i.test(trimmed)) return 'Motion in straight line';
      if (/motion in a plane/i.test(trimmed)) return 'motion in a plane';
    }

    if (category?.toLowerCase() === 'chemistry') {
      if (/some basic concepts of chemistry/i.test(trimmed) || /basic concepts of chemistry/i.test(trimmed)) return 'Some Basic Concepts of Chemistry';
    }

    if (trimmed === trimmed.toLowerCase()) {
      return trimmed.replace(/\b\w/g, (c) => c.toUpperCase());
    }
    return trimmed;
  };

  const getQuestionChapter = (q) => {
    if (!q) return 'General';
    // 1. Strict chapter_id check: Live is 221, Local DB is 129
    if (Number(q.chapter_id) === 221 || Number(q.chapter_id) === 129) {
      return 'The Living World';
    }
    // 2. Strict chapter name check
    if (q.chapter_name && /^\s*the living world\s*$/i.test(q.chapter_name)) {
      return 'The Living World';
    }
    if (q.chapter && /^\s*the living world\s*$/i.test(q.chapter)) {
      return 'The Living World';
    }

    // Botany: Molecular Basis of Inheritance batch range & leak fix
    if (
      (q.id >= 6151 && q.id <= 6553) ||
      [6503, 6504, 6507, 6508, 6509, 6511, 6513, 6514, 6516, 6519].includes(Number(q.id))
    ) {
      return 'Molecular Basis of Inheritance';
    }

    // Zoology: Biotechnology - Principles and Processes
    if (
      (q.id >= 13997 && q.id <= 14032) ||
      Number(q.chapter_id) === 213 ||
      (q.chapter_name && /biotechnology.*principles/i.test(q.chapter_name))
    ) {
      return 'Biotechnology - Principles and Processes';
    }

    // Chemistry: Solutions
    if (
      Number(q.chapter_id) === 37 ||
      Number(q.chapter_id) === 150 ||
      /^\s*solutions?\s*$/i.test(q.chapter_name || '') ||
      /^\s*solutions?\s*$/i.test(q.chapter || '')
    ) {
      return 'Solutions';
    }

    // Chemistry: Biomolecules
    if (
      Number(q.chapter_id) === 36 ||
      Number(q.chapter_id) === 133 ||
      /^\s*biomolecules?\s*$/i.test(q.chapter_name || '') ||
      /^\s*biomolecules?\s*$/i.test(q.chapter || '')
    ) {
      return 'Biomolecules';
    }

    // Chemistry: Electrochemistry
    if (
      Number(q.chapter_id) === 15 ||
      /^\s*electrochemistry\s*$/i.test(q.chapter_name || '') ||
      /^\s*electrochemistry\s*$/i.test(q.chapter || '')
    ) {
      return 'Electrochemistry';
    }

    // Chemistry: Chemical Kinetics
    if (
      Number(q.chapter_id) === 14 ||
      /^\s*chemical kinetics\s*$/i.test(q.chapter_name || '') ||
      /^\s*chemical kinetics\s*$/i.test(q.chapter || '')
    ) {
      return 'Chemical Kinetics';
    }

    // Chemistry: Haloalkanes and Haloarenes
    if (
      Number(q.chapter_id) === 34 ||
      /^\s*haloalkanes and haloarenes\s*$/i.test(q.chapter_name || '') ||
      /^\s*haloalkanes and haloarenes\s*$/i.test(q.chapter || '')
    ) {
      return 'Haloalkanes and Haloarenes';
    }

    // Chemistry: The d- and f-Block Elements
    if (
      Number(q.chapter_id) === 204 ||
      /^\s*the d- and f-block elements\s*$/i.test(q.chapter_name || '') ||
      /^\s*the d- and f-block elements\s*$/i.test(q.chapter || '')
    ) {
      return 'The d- and f-Block Elements';
    }

    // Chemistry: Some Basic Concepts of Chemistry (130 questions only)
    if (
      (Number(q.id) >= 14041 && Number(q.id) <= 14170) ||
      (Number(q.chapter_id) === 127 && Number(q.id) >= 5504 && Number(q.id) <= 5640) ||
      Number(q.chapter_id) === 95
    ) {
      return 'Some Basic Concepts of Chemistry';
    }

    // Physics: Electrostatic Potential and Capacitance
    if (
      Number(q.chapter_id) === 142 ||
      Number(q.chapter_id) === 67 ||
      (q.id >= 14033 && q.id <= 14040) ||
      [2555, 2556, 5496, 5497, 5498, 5499, 5500, 5501, 5502, 5503, 10812, 10987, 10988].includes(Number(q.id)) ||
      (q.chapter_name && /electrostatic potential|capacitance/i.test(q.chapter_name)) ||
      (q.chapter && /electrostatic potential|capacitance/i.test(q.chapter))
    ) {
      return 'Electrostatic Potential and Capacitance';
    }

    // Moving Charges and Magnetism: Live chapter_id is 193, Local DB is 143, or question ID range 11162-11339
    if (
      (q.id >= 11162 && q.id <= 11339) ||
      Number(q.chapter_id) === 193 ||
      Number(q.chapter_id) === 143 ||
      (q.chapter_name && /moving charges/i.test(q.chapter_name)) ||
      (q.topic && /moving charges/i.test(q.topic))
    ) {
      return 'Moving Charges and Magnetism';
    }

    // Magnetism and Matter: Live chapter_id is 194, Local DB is 106
    if (
      Number(q.chapter_id) === 194 ||
      Number(q.chapter_id) === 106 ||
      (q.chapter_name && /magnetism and matter/i.test(q.chapter_name))
    ) {
      return 'Magnetism and Matter';
    }

    // Electromagnetic Induction: Live chapter_id is 195, Local DB is 144
    if (
      Number(q.chapter_id) === 195 ||
      Number(q.chapter_id) === 144 ||
      (q.chapter_name && /electromagnetic induction/i.test(q.chapter_name))
    ) {
      return 'Electromagnetic Induction';
    }

    // Partition legacy composite "Magnetism & Electromagnetic Induction"
    if (
      (q.chapter && /magnetism\s*(&|and)\s*electromagnetic induction/i.test(q.chapter)) ||
      (q.chapter_name && /magnetism\s*(&|and)\s*electromagnetic induction/i.test(q.chapter_name))
    ) {
      const text = `${q.topic || ''} ${q.question_text || ''}`;
      if (/biot|savart|lorentz|cyclotron|solenoid|toroid|galvanometer|ampere|magnetic field|moving charge/i.test(text)) {
        return 'Moving Charges and Magnetism';
      }
      if (/faraday|lenz|induct|eddy/i.test(text)) {
        return 'Electromagnetic Induction';
      }
      if (/bar magnet|magnetic dipole|earth.*magnetism|dia|para|ferro|hysteresis|curie/i.test(text)) {
        return 'Magnetism and Matter';
      }
      return 'Moving Charges and Magnetism';
    }

    const raw = (q.chapter_name || q.chapter || 'General').trim() || 'General';
    return formatChapterName(raw);
  };

  const chaptersWithCounts = useMemo(() => {
    const isChemistry = category?.toLowerCase() === 'chemistry';
    const isZoology = category?.toLowerCase() === 'zoology';
    const isBotany = category?.toLowerCase() === 'botany';
    const map = new Map();

    if (isChemistry) {
      CHEMISTRY_STANDARD_11.forEach((ch) => {
        map.set(ch.toLowerCase(), { name: ch, count: 0, arCount: 0 });
      });
    } else if (isZoology) {
      ZOOLOGY_STANDARD_6.forEach((ch) => {
        map.set(ch.toLowerCase(), { name: ch, count: 0, arCount: 0 });
      });
    } else if (isBotany) {
      BOTANY_STANDARD.forEach((ch) => {
        map.set(ch.toLowerCase(), { name: ch, count: 0, arCount: 0 });
      });
    }

    (questions || []).forEach((q) => {
      const formatted = getQuestionChapter(q);
      const key = formatted.toLowerCase();
      if (!map.has(key)) {
        map.set(key, { name: formatted, count: 0, arCount: 0 });
      }
      const entry = map.get(key);
      entry.count += 1;
      if (isAssertionReason(q)) {
        entry.arCount = (entry.arCount || 0) + 1;
      }
    });

    if (isChemistry) {
      const list = CHEMISTRY_STANDARD_11.map((ch) => {
        const item = map.get(ch.toLowerCase());
        return item || { name: ch, count: 0, arCount: 0 };
      });
      const standardKeys = new Set(CHEMISTRY_STANDARD_11.map((c) => c.toLowerCase()));
      for (const [key, val] of map.entries()) {
        if (!standardKeys.has(key) && val.count > 0 && val.name.toLowerCase() !== 'general') {
          list.push(val);
        }
      }
      return list;
    }

    if (isZoology) {
      return ZOOLOGY_STANDARD_6.map((ch) => {
        const item = map.get(ch.toLowerCase());
        return item || { name: ch, count: 0, arCount: 0 };
      });
    }

    if (isBotany) {
      return BOTANY_STANDARD.map((ch) => {
        const item = map.get(ch.toLowerCase());
        return item || { name: ch, count: 0, arCount: 0 };
      });
    }

    return Array.from(map.values()).sort((a, b) => {
      if (a.name.toLowerCase() === 'general') return 1;
      if (b.name.toLowerCase() === 'general') return -1;
      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
    });
  }, [questions, category, CHEMISTRY_STANDARD_11, ZOOLOGY_STANDARD_6, BOTANY_STANDARD]);

  const totalArInSubject = useMemo(() => {
    return (questions || []).filter(isAssertionReason).length;
  }, [questions]);

  const displayedChapters = useMemo(() => {
    if (!chapterSearch.trim()) return chaptersWithCounts;
    const query = chapterSearch.toLowerCase().trim();
    return chaptersWithCounts.filter((c) => c.name.toLowerCase().includes(query));
  }, [chaptersWithCounts, chapterSearch]);

  const handleSelectChapter = (chapterName) => {
    if (!chapterName) return;
    setSelectedChapter((prev) => (prev.toLowerCase() === chapterName.toLowerCase() ? 'all' : chapterName));
  };

  const checkSliderScroll = () => {
    const el = chapterSliderRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  };

  const slideChapters = (direction) => {
    const el = chapterSliderRef.current;
    if (!el) return;
    const scrollDistance = Math.max(260, Math.floor(el.clientWidth * 0.65));
    el.scrollBy({
      left: direction === 'left' ? -scrollDistance : scrollDistance,
      behavior: 'smooth',
    });
    setTimeout(checkSliderScroll, 350);
  };

  const statusCounts = useMemo(() => {
    let baseList = questions || [];
    if (selectedChapter && selectedChapter !== 'all') {
      const targetNorm = normChapterKey(selectedChapter);
      baseList = baseList.filter((q) => {
        const ch = getQuestionChapter(q);
        return normChapterKey(ch) === targetNorm;
      });
    }
    if (typeFilter === 'assertion_reason') {
      baseList = baseList.filter(isAssertionReason);
    } else if (typeFilter === 'mcq') {
      baseList = baseList.filter(isMCQ);
    } else if (typeFilter === 'numerical') {
      baseList = baseList.filter(isNumerical);
    }
    let total = baseList.length;
    let chosen = 0;
    let available = 0;
    baseList.forEach((q) => {
      const isChosen = q.status === 'already_chosen';
      if (isChosen) chosen++;
      else available++;
    });
    return { total, chosen, available };
  }, [questions, selectedChapter, typeFilter]);

  const typeCounts = useMemo(() => {
    let baseList = questions || [];
    if (selectedChapter && selectedChapter !== 'all') {
      const targetNorm = normChapterKey(selectedChapter);
      baseList = baseList.filter((q) => {
        const ch = getQuestionChapter(q);
        return normChapterKey(ch) === targetNorm;
      });
    }
    if (statusFilter === 'already_chosen') {
      baseList = baseList.filter((q) => q.status === 'already_chosen');
    } else if (statusFilter === 'available') {
      baseList = baseList.filter((q) => q.status !== 'already_chosen');
    }

    let total = baseList.length;
    let arCount = 0;
    let mcqCount = 0;
    let numCount = 0;

    baseList.forEach((q) => {
      if (isAssertionReason(q)) arCount++;
      else if (isNumerical(q)) numCount++;
      else mcqCount++;
    });

    return { total, arCount, mcqCount, numCount };
  }, [questions, selectedChapter, statusFilter]);

  const filteredQuestions = useMemo(() => {
    let list = questions || [];
    if (statusFilter === 'already_chosen') {
      list = list.filter((q) => q.status === 'already_chosen');
    } else if (statusFilter === 'available') {
      list = list.filter((q) => q.status !== 'already_chosen');
    }
    if (selectedChapter && selectedChapter !== 'all') {
      const targetNorm = normChapterKey(selectedChapter);
      list = list.filter((q) => {
        const ch = getQuestionChapter(q);
        return normChapterKey(ch) === targetNorm;
      });
    }
    if (typeFilter === 'assertion_reason') {
      list = list.filter(isAssertionReason);
    } else if (typeFilter === 'mcq') {
      list = list.filter(isMCQ);
    } else if (typeFilter === 'numerical') {
      list = list.filter(isNumerical);
    }
    return list;
  }, [questions, statusFilter, selectedChapter, typeFilter]);

  const isAllArSelected = useMemo(() => {
    let baseList = questions || [];
    if (selectedChapter && selectedChapter !== 'all') {
      const targetNorm = normChapterKey(selectedChapter);
      baseList = baseList.filter((q) => {
        const ch = getQuestionChapter(q);
        return normChapterKey(ch) === targetNorm;
      });
    }
    const arQuestions = baseList.filter(isAssertionReason);
    if (arQuestions.length === 0) return false;
    return arQuestions.every((q) => selectedQuestionIds.includes(q.id));
  }, [questions, selectedChapter, selectedQuestionIds]);

  const handleSelectAllAR = () => {
    let baseList = questions || [];
    if (selectedChapter && selectedChapter !== 'all') {
      const targetNorm = normChapterKey(selectedChapter);
      baseList = baseList.filter((q) => {
        const ch = getQuestionChapter(q);
        return normChapterKey(ch) === targetNorm;
      });
    }
    const arQuestions = baseList.filter(isAssertionReason);
    if (arQuestions.length === 0) {
      toast.info('No Assertion-Reason questions found in this chapter.');
      return;
    }
    const arIds = arQuestions.map((q) => q.id);
    const allSelected = arIds.every((id) => selectedQuestionIds.includes(id));

    if (allSelected) {
      setSelectedQuestionIds((prev) => prev.filter((id) => !arIds.includes(id)));
      setSelectedQuestionsMap((prev) => {
        const next = { ...prev };
        arIds.forEach((id) => delete next[id]);
        return next;
      });
      toast.info(`Deselected ${arIds.length} Assertion-Reason questions.`);
    } else {
      setSelectedQuestionIds((prev) => Array.from(new Set([...prev, ...arIds])));
      setSelectedQuestionsMap((prev) => {
        const next = { ...prev };
        arQuestions.forEach((q) => { next[q.id] = q; });
        return next;
      });
      const chapterLabel = selectedChapter !== 'all' ? selectedChapter : category;
      toast.success(`Selected all ${arQuestions.length} Assertion-Reason questions from ${chapterLabel}!`);
    }
  };

  const _unusedFiltered = () => {}; /*
    if (statusFilter === 'all') return questions;
    if (statusFilter === 'already_chosen') {
      return (questions || []).filter((q) => q.status === 'already_chosen');
    }
    if (statusFilter === 'available') {
      return (questions || []).filter((q) => q.status !== 'already_chosen');
    }
    return questions;
  */

  const selectedAlreadyChosenCount = useMemo(() => {
    return selectedQuestionsList.filter((q) => q.status === 'already_chosen').length;
  }, [selectedQuestionsList]);

  const toggleSelectQuestion = (q) => {
    setSelectedQuestionIds((prev) => {
      const exists = prev.includes(q.id);
      if (exists) {
        return prev.filter((id) => id !== q.id);
      } else {
        return [...prev, q.id];
      }
    });
    setSelectedQuestionsMap((prev) => {
      const next = { ...prev };
      if (next[q.id]) {
        delete next[q.id];
      } else {
        next[q.id] = q;
      }
      return next;
    });
  };

  const handleSelectAllVisible = () => {
    const visibleIds = (filteredQuestions || []).map((q) => q.id);
    const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedQuestionIds.includes(id));
    if (allSelected) {
      setSelectedQuestionIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
      setSelectedQuestionsMap((prev) => {
        const next = { ...prev };
        visibleIds.forEach((id) => delete next[id]);
        return next;
      });
    } else {
      const newIdsSet = new Set([...selectedQuestionIds, ...visibleIds]);
      setSelectedQuestionIds(Array.from(newIdsSet));
      setSelectedQuestionsMap((prev) => {
        const next = { ...prev };
        (filteredQuestions || []).forEach((q) => { next[q.id] = q; });
        return next;
      });
    }
  };

  const handleClearSelection = () => {
    setSelectedQuestionIds([]);
    setSelectedQuestionsMap({});
  };

  const openCreateTestModal = () => {
    if (selectedQuestionIds.length === 0) {
      if (filteredQuestions.length > 0) {
        handleSelectAllVisible();
        toast.info(selectedChapter !== 'all' ? `Selected all ${filteredQuestions.length} questions in ${selectedChapter}. Click 'Create Test' again to proceed.` : `Selected all ${questions.length} questions in ${category}. Click 'Create Test' again to proceed.`);
      } else {
        toast.error('Please select at least one question from the bank');
      }
      return;
    }
    const list = selectedQuestionIds.map((id) => selectedQuestionsMap[id]).filter(Boolean);
    const sumMarks = list.reduce((s, q) => s + (Number(q.marks) || 4), 0);
    const cats = Array.from(new Set(list.map((q) => q.category || q.subject).filter(Boolean)));
    const chapters = Array.from(new Set(list.map((q) => q.chapter || q.topic).filter(Boolean)));

    const defaultTitle = cats.length > 0
      ? `${cats.join(' & ')} Practice Test`
      : 'Practice Test from Question Bank';

    const defaultSyllabus = chapters.length > 0
      ? chapters.slice(0, 8).join(', ')
      : (cats.join(', ') || 'Comprehensive Syllabus');

    setTestForm({
      test_name: defaultTitle,
      test_type: 'AIETS',
      test_date: new Date().toISOString().slice(0, 10),
      start_time: '09:00:00',
      end_time: '12:00:00',
      duration_minutes: 180,
      max_marks: sumMarks || 100,
      syllabus: defaultSyllabus,
      is_published: true,
    });
    setCreateTestModalOpen(true);
  };

  const handleCreateTestSubmit = async (e) => {
    e.preventDefault();
    if (!testForm.test_name.trim()) {
      toast.error('Please enter a test title');
      return;
    }
    setCreatingTest(true);
    try {
      const payload = {
        ...testForm,
        max_marks: Number(testForm.max_marks) || totalSelectedMarks || 100,
        start_time: testForm.start_time.length === 5 ? `${testForm.start_time}:00` : testForm.start_time,
        end_time: testForm.end_time.length === 5 ? `${testForm.end_time}:00` : testForm.end_time,
      };

      const res = await adminService.createTest(payload);
      const createdTest = res?.test || res;
      const testId = createdTest?.id;
      if (!testId) {
        throw new Error('Test creation failed: missing test ID');
      }

      await questionBankService.bulkImportToAssessment(testId, {
        ids: selectedQuestionIds,
      });

      setQuestions((prev) =>
        prev.map((q) =>
          selectedQuestionIds.includes(q.id)
            ? {
                ...q,
                status: 'already_chosen',
                test_count: (q.test_count || 0) + 1,
                used_in_tests: [
                  ...(q.used_in_tests || []),
                  { assessment_id: testId, test_name: testForm.test_name }
                ]
              }
            : q
        )
      );

      toast.success(`Test "${testForm.test_name}" created with ${selectedQuestionIds.length} questions!`);
      setCreateTestModalOpen(false);
      handleClearSelection();
      navigate(`/admin/assessments/${testId}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Failed to create test');
    } finally {
      setCreatingTest(false);
    }
  };

  const openAddToExistingTestModal = async () => {
    if (selectedQuestionIds.length === 0) {
      toast.error('Please select at least one question first');
      return;
    }
    setAddToTestModalOpen(true);
    setLoadingExistingTests(true);
    try {
      const tests = await adminService.tests();
      const list = Array.isArray(tests) ? tests : [];
      setExistingTestsList(list);
      if (list.length > 0) {
        setSelectedExistingTestId(list[0].id);
      }
    } catch (err) {
      toast.error('Failed to load existing tests');
    } finally {
      setLoadingExistingTests(false);
    }
  };

  const handleAddToExistingTestSubmit = async (e) => {
    e.preventDefault();
    if (!selectedExistingTestId) {
      toast.error('Please select a target test');
      return;
    }
    setAddingToTest(true);
    try {
      await questionBankService.bulkImportToAssessment(selectedExistingTestId, {
        ids: selectedQuestionIds,
      });
      const targetTest = existingTestsList.find((t) => t.id === Number(selectedExistingTestId));
      setQuestions((prev) =>
        prev.map((q) =>
          selectedQuestionIds.includes(q.id)
            ? {
                ...q,
                status: 'already_chosen',
                test_count: (q.test_count || 0) + 1,
                used_in_tests: [
                  ...(q.used_in_tests || []),
                  { assessment_id: selectedExistingTestId, test_name: targetTest?.test_name || 'Test' }
                ]
              }
            : q
        )
      );
      toast.success(`Imported ${selectedQuestionIds.length} question(s) into "${targetTest?.test_name || 'Test'}"!`);
      setAddToTestModalOpen(false);
      handleClearSelection();
      navigate(`/admin/assessments/${selectedExistingTestId}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Failed to import into test');
    } finally {
      setAddingToTest(false);
    }
  };

  const [csvOpen, setCsvOpen] = useState(false);
  const [csvText, setCsvText] = useState(BANK_CSV_TEMPLATE);
  const [uploading, setUploading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const fileRef = useRef(null);

  // Modal & Form States
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteQuestionId, setDeleteQuestionId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteAllModalOpen, setDeleteAllModalOpen] = useState(false);
  const [deleteAllScope, setDeleteAllScope] = useState('category'); // 'category' | 'all'
  const [deletingAll, setDeletingAll] = useState(false);
  const [form, setForm] = useState({
    question_type: 'mcq',
    question_text: '',
    options: 'A|B|C|D',
    correct_index: 0,
    correct_indices_str: '',
    numeric_answer: '',
    numerical_tolerance: 0.01,
    solution: '',
    explanation_url: '',
  });

  const [subjectsList, setSubjectsList] = useState([]);
  const [chaptersList, setChaptersList] = useState([]);
  const [customChapterMode, setCustomChapterMode] = useState(false);

  // PDF Upload States
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [answerKeyFile, setAnswerKeyFile] = useState(null);
  const [pdfCategory, setPdfCategory] = useState('auto');
  const [pdfMarks, setPdfMarks] = useState(4);
  const [pdfDifficulty, setPdfDifficulty] = useState('medium');
  const [pdfIncludeAnswers, setPdfIncludeAnswers] = useState(true);
  const [pdfPageRange, setPdfPageRange] = useState('');
  const [pdfUploading, setPdfUploading] = useState(false);
  const [pdfProgressStatus, setPdfProgressStatus] = useState('');
  const [pdfSuccessData, setPdfSuccessData] = useState(null);
  const pdfInputRef = useRef(null);
  const answerKeyInputRef = useRef(null);

  const openPdfModal = () => {
    setPdfFile(null);
    setAnswerKeyFile(null);
    setPdfCategory(category || 'auto');
    setPdfMarks(4);
    setPdfDifficulty('medium');
    setPdfIncludeAnswers(true);
    setPdfPageRange('');
    setPdfProgressStatus('');
    setPdfSuccessData(null);
    setPdfOpen(true);
  };

  const formatBytes = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const MAX_UPLOAD_SIZE = 100 * 1024 * 1024; // 100 MB

  const uploadPdf = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!pdfFile) {
      toast.error('Please select a question paper PDF file');
      return;
    }

    if (!pdfFile.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Please select a valid PDF document (.pdf)');
      return;
    }

    if (pdfFile.size > MAX_UPLOAD_SIZE) {
      toast.error(`Question paper PDF exceeds the maximum allowed upload size (maximum 100 MB). Selected: ${formatBytes(pdfFile.size)}`);
      return;
    }

    if (answerKeyFile) {
      if (!answerKeyFile.name.toLowerCase().endsWith('.pdf')) {
        toast.error('Answer key file must be a valid PDF document (.pdf)');
        return;
      }
      if (answerKeyFile.size > MAX_UPLOAD_SIZE) {
        toast.error(`Answer key PDF exceeds the maximum allowed upload size (maximum 100 MB). Selected: ${formatBytes(answerKeyFile.size)}`);
        return;
      }
    }

    setPdfUploading(true);
    setPdfSuccessData(null);
    setPdfProgressStatus('Uploading PDF document to server...');

    try {
      const formData = new FormData();
      formData.append('file', pdfFile);
      if (answerKeyFile) {
        formData.append('answer_key', answerKeyFile);
      }
      formData.append('category', pdfCategory);
      formData.append('default_marks', Number(pdfMarks) || 4);
      formData.append('difficulty', pdfDifficulty);
      formData.append('include_answers', Boolean(pdfIncludeAnswers));
      if (pdfPageRange && pdfPageRange.trim()) {
        formData.append('page_range', pdfPageRange.trim());
      }

      setPdfProgressStatus('Analyzing PDF with AI Vision, extracting questions, options, & answers...');

      const res = await questionBankService.uploadPdf(formData);
      if (!res?.created || res.created === 0) {
        const failureReason = res?.errors?.[0]?.error || 'No questions could be imported into the Question Bank.';
        toast.error(`Import failed: ${failureReason}`);
        return;
      }
      setPdfSuccessData(res);
      toast.success(`Imported ${res.created} question(s) successfully!`);
      await load();
    } catch (err) {
      let msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || 'PDF extraction failed. Please check the file.';
      if (typeof msg === 'string' && /<html|<!DOCTYPE/i.test(msg)) {
        msg = 'The server encountered an issue processing this PDF. If the file is very large, consider splitting it into smaller parts.';
      }
      toast.error(msg, { duration: 8000 });
    } finally {
      setPdfUploading(false);
      setPdfProgressStatus('');
    }
  };

  const load = async () => {
    setLoading(true);
    try {
      const [data, subjects] = await Promise.all([
        questionBankService.byCategory(category),
        adminService.subjects().catch(() => []),
      ]);
      setQuestions(data || []);

      const fetched = subjects || [];
      const defaultSubjects = [
        { name: 'Physics' },
        { name: 'Chemistry' },
        { name: 'Mathematics' },
        { name: 'Botany' },
        { name: 'Zoology' }
      ];

      const map = new Map();
      fetched.forEach(s => {
        if (s && s.name) map.set(s.name.toLowerCase(), s);
      });
      defaultSubjects.forEach((ds, idx) => {
        if (!map.has(ds.name.toLowerCase())) {
          map.set(ds.name.toLowerCase(), { id: 1000 + idx, name: ds.name });
        }
      });

      const unifiedSubjects = Array.from(map.values());
      setSubjectsList(unifiedSubjects);

      const subNames = unifiedSubjects.map((s) => s.name).filter(Boolean);
      const combined = Array.from(new Set([...DEFAULT_CATEGORIES, ...subNames]));
      setCategoriesList(combined);
    } catch {
      toast.error('Could not load questions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    setSelectedChapter('all');
    setChapterSearch('');
    if (chapterSliderRef.current) {
      chapterSliderRef.current.scrollLeft = 0;
    }
  }, [category]);

  useEffect(() => {
    checkSliderScroll();
    const el = chapterSliderRef.current;
    if (el) {
      el.addEventListener('scroll', checkSliderScroll, { passive: true });
    }
    window.addEventListener('resize', checkSliderScroll);
    return () => {
      if (el) el.removeEventListener('scroll', checkSliderScroll);
      window.removeEventListener('resize', checkSliderScroll);
    };
  }, [displayedChapters]);

  useEffect(() => {
    if (selectedChapter && selectedChapter !== 'all' && chapterSliderRef.current) {
      const activeEl = chapterSliderRef.current.querySelector('[data-active-chapter="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selectedChapter]);

  useEffect(() => {
    const targetSubjId = form.subject_id;
    if (targetSubjId && !isNaN(Number(targetSubjId))) {
      adminService.chapters(targetSubjId).then((data) => {
        setChaptersList(data || []);
      }).catch(() => setChaptersList([]));
    } else if (form.subject) {
      const match = subjectsList.find((s) => s.name?.toLowerCase() === form.subject?.toLowerCase());
      if (match?.id) {
        adminService.chapters(match.id).then((data) => {
          setChaptersList(data || []);
        }).catch(() => setChaptersList([]));
      } else {
        setChaptersList([]);
      }
    } else {
      setChaptersList([]);
    }
  }, [form.subject_id, form.subject, subjectsList]);

  const questionsWithSerial = useMemo(() => {
    return (filteredQuestions || []).map((q, idx) => ({
      ...q,
      serialNumber: idx + 1,
    }));
  }, [filteredQuestions]);

  const openAdd = () => {
    setEditing(null);
    setCustomChapterMode(false);
    setForm({
      question_type: 'single_choice',
      status: 'normal',
      question_text: '',
      options: [
        { key: 'A', text: '', image_url: '' },
        { key: 'B', text: '', image_url: '' },
        { key: 'C', text: '', image_url: '' },
        { key: 'D', text: '', image_url: '' },
      ],
      correct_index: 0,
      correct_indices: [0],
      correct_indices_str: '0',
      numeric_answer: '',
      numerical_tolerance: 0.01,
      assertion_text: '',
      reason_text: '',
      solution: '',
      explanation_url: '',
      image_url: '',
      solution_image_url: '',
      subject_id: null,
      subject: category && category !== 'All' ? category : '',
      chapter_id: null,
      chapter: '',
      topic: '',
      difficulty: 'medium',
      marks: 4,
    });
    setModalOpen(true);
  };

  const openEdit = (q) => {
    setEditing(q);
    setCustomChapterMode(false);
    const rawOpts = tryParseArray(q.options);
    const isIntOrNum = q.question_type === 'integer' || q.question_type === 'numerical';
    const fallbackList = ['Option A', 'Option B', 'Option C', 'Option D'];
    const baseOpts = (Array.isArray(rawOpts) && rawOpts.length > 0) ? rawOpts : (isIntOrNum ? [] : fallbackList);
    const formattedOpts = baseOpts.map((opt, idx) => {
      const key = ['A', 'B', 'C', 'D', 'E', 'F', 'G'][idx] || String.fromCharCode(65 + idx);
      if (typeof opt === 'object' && opt !== null) {
        return {
          key: opt.key || key,
          text: typeof opt.text === 'string' ? opt.text : (typeof opt.label === 'string' ? opt.label : ''),
          image_url: typeof opt.image_url === 'string' ? opt.image_url : (typeof opt.image === 'string' ? opt.image : (typeof opt.url === 'string' ? opt.url : '')),
        };
      }
      return {
        key,
        text: String(opt ?? ''),
        image_url: '',
      };
    });

    const correctIndex = (q.correct_index !== null && q.correct_index !== undefined && q.correct_index !== '') ? Number(q.correct_index) : 0;
    const correctIndices = Array.isArray(q.correct_indices) ? q.correct_indices : [correctIndex];
    const chapterName = q.chapter || q.chapter_name || '';
    const hasTopic = q.topic && chapterName && q.topic.toLowerCase() !== chapterName.toLowerCase();

    setForm({
      question_type: q.question_type || 'single_choice',
      status: q.status || 'normal',
      question_text: q.question_text || '',
      options: isIntOrNum ? [] : formattedOpts,
      correct_index: correctIndex,
      correct_indices: correctIndices,
      correct_indices_str: correctIndices.join(','),
      numeric_answer: q.numeric_answer !== undefined && q.numeric_answer !== null ? q.numeric_answer : '',
      numerical_tolerance: q.numerical_tolerance !== undefined && q.numerical_tolerance !== null ? q.numerical_tolerance : 0.01,
      assertion_text: q.assertion_text || '',
      reason_text: q.reason_text || '',
      solution: q.solution || q.solution_text || '',
      explanation_url: q.explanation_url || '',
      image_url: q.image_url || '',
      solution_image_url: q.solution_image_url || '',
      subject_id: q.subject_id || null,
      subject: q.subject || q.category || '',
      chapter_id: q.chapter_id || null,
      chapter: chapterName,
      topic: hasTopic ? q.topic : '',
      difficulty: q.difficulty || 'medium',
      marks: q.marks ?? 4,
    });
    setModalOpen(true);
  };

  const removeQuestion = (id) => {
    setDeleteQuestionId(id);
  };

  const confirmDeleteQuestion = async () => {
    if (!deleteQuestionId) return;
    const targetId = deleteQuestionId;
    setDeleting(true);
    try {
      await questionBankService.remove(targetId);
      setQuestions((prev) => prev.filter((q) => q.id !== targetId));
      toast.success('Question deleted from bank');
      setDeleteQuestionId(null);
      load();
    setSelectedChapter('all');
    setChapterSearch('');
    if (chapterSliderRef.current) {
      chapterSliderRef.current.scrollLeft = 0;
    }
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  const confirmDeleteAll = async () => {
    setDeletingAll(true);
    try {
      const res = await questionBankService.deleteAll(category, deleteAllScope);
      setQuestions([]);
      toast.success(
        deleteAllScope === 'all'
          ? `Deleted all questions across the entire question bank (${res.count ?? 0} removed)`
          : `Deleted all questions in ${category} (${res.count ?? 0} removed)`
      );
      setDeleteAllModalOpen(false);
      load();
    setSelectedChapter('all');
    setChapterSearch('');
    if (chapterSliderRef.current) {
      chapterSliderRef.current.scrollLeft = 0;
    }
    } catch (err) {
      toast.error(err.message || 'Failed to delete questions');
    } finally {
      setDeletingAll(false);
    }
  };

  const saveQuestion = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isIntegerType = form.question_type === 'integer' || form.question_type === 'numerical';
      const cleanOptions = isIntegerType
        ? []
        : (Array.isArray(form.options) ? form.options : []).map((opt, idx) => {
            const key = ['A', 'B', 'C', 'D', 'E', 'F', 'G'][idx] || String.fromCharCode(65 + idx);
            if (typeof opt === 'object' && opt !== null) {
              return {
                key: opt.key || key,
                text: (opt.text || '').trim(),
                image_url: (opt.image_url || '').trim(),
              };
            }
            return {
              key,
              text: String(opt || '').trim(),
              image_url: '',
            };
          }).filter((opt) => opt.text || opt.image_url);

      const correctIndex = isIntegerType ? null : Number(form.correct_index ?? 0);
      const isMulti = form.question_type === 'multi_select';
      const correctIndices = isMulti
        ? (Array.isArray(form.correct_indices) && form.correct_indices.length
            ? form.correct_indices
            : String(form.correct_indices_str ?? '').split(/[\s,]+/).map(Number).filter(n => Number.isInteger(n) && n >= 0))
        : (isIntegerType ? [] : [correctIndex]);

      const numericVal = isIntegerType
        ? (form.numeric_answer !== '' && form.numeric_answer !== null && form.numeric_answer !== undefined && !isNaN(Number(form.numeric_answer))
            ? (form.question_type === 'integer' ? parseInt(form.numeric_answer, 10) : parseFloat(form.numeric_answer))
            : (form.numeric_answer === '' ? null : 0))
        : null;

      const payload = {
        ...form,
        category: form.subject || category,
        status: form.status || 'normal',
        question_type: form.question_type,
        question_text: form.question_text?.trim(),
        options: cleanOptions,
        correct_index: correctIndex,
        correct_indices: correctIndices,
        numeric_answer: numericVal,
        numerical_tolerance: form.question_type === 'numerical' ? Number(form.numerical_tolerance ?? 0.01) : 0,
        assertion_text: form.assertion_text || null,
        reason_text: form.reason_text || null,
        marks: Number(form.marks ?? 1),
        solution: form.solution ?? '',
        image_url: form.image_url || '',
        solution_image_url: form.solution_image_url || '',
        subject_id: form.subject_id || null,
        chapter_id: form.chapter_id || null,
        chapter: (form.chapter || form.topic || '').trim(),
        subject: form.subject || category,
        topic: (form.topic || form.chapter || '').trim(),
        difficulty: form.difficulty || 'medium',
      };

      if (editing) {
        const res = await questionBankService.update(editing.id, payload);
        const updated = res?.question || res;
        toast.success('Question updated in bank');
        if (updated?.id) {
          setQuestions((prev) =>
            prev.map((item) =>
              item.id === updated.id
                ? {
                    ...item,
                    ...updated,
                    status: updated.status || payload.status || item.status,
                    test_count: (updated.status || payload.status) === 'normal' ? 0 : (updated.test_count ?? item.test_count),
                    used_in_tests: (updated.status || payload.status) === 'normal' ? [] : (updated.used_in_tests ?? item.used_in_tests),
                  }
                : item
            )
          );
        }
      } else {
        const res = await questionBankService.create(payload);
        const created = res?.question || res;
        toast.success('Question created in bank');
        if (created?.id) {
          setQuestions((prev) => [created, ...prev]);
        }
      }
      setModalOpen(false);
      setEditing(null);
      await load();
    } catch (err) {
      toast.error(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (q, targetStatus) => {
    const isCurrentChosen = q.status === 'already_chosen';
    const newStatus = targetStatus || (isCurrentChosen ? 'normal' : 'already_chosen');
    const prevStatus = q.status;
    const prevTestCount = q.test_count;
    const prevUsedInTests = q.used_in_tests;

    setQuestions((prev) =>
      prev.map((item) =>
        item.id === q.id
          ? {
              ...item,
              status: newStatus,
              test_count: newStatus === 'normal' ? 0 : item.test_count,
              used_in_tests: newStatus === 'normal' ? [] : item.used_in_tests,
            }
          : item
      )
    );
    if (testsModalQuestion && testsModalQuestion.id === q.id) {
      setTestsModalQuestion((prev) =>
        prev
          ? {
              ...prev,
              status: newStatus,
              test_count: newStatus === 'normal' ? 0 : prev.test_count,
              used_in_tests: newStatus === 'normal' ? [] : prev.used_in_tests,
            }
          : null
      );
    }

    try {
      await questionBankService.updateStatus(q.id, newStatus);
      toast.success(
        newStatus === 'already_chosen'
          ? `Question #${q.serialNumber || q.id} marked as Selected for Test`
          : `Question #${q.serialNumber || q.id} marked as Available (Unused)`
      );
    } catch (err) {
      setQuestions((prev) =>
        prev.map((item) =>
          item.id === q.id
            ? {
                ...item,
                status: prevStatus,
                test_count: prevTestCount,
                used_in_tests: prevUsedInTests,
              }
            : item
        )
      );
      if (testsModalQuestion && testsModalQuestion.id === q.id) {
        setTestsModalQuestion((prev) =>
          prev
            ? {
                ...prev,
                status: prevStatus,
                test_count: prevTestCount,
                used_in_tests: prevUsedInTests,
              }
            : null
        );
      }
      toast.error(err?.response?.data?.message || err?.message || 'Failed to update question status');
    }
  };

  const uploadCsv = async () => {
    setUploading(true);
    try {
      const res = await questionBankService.bulkUpload(csvText, category);
      toast.success(`Imported ${res.created} questions${res.errors?.length ? ` (${res.errors.length} errors)` : ''}`);
      setCsvOpen(false);
      load();
    setSelectedChapter('all');
    setChapterSearch('');
    if (chapterSliderRef.current) {
      chapterSliderRef.current.scrollLeft = 0;
    }
    } catch (err) {
      toast.error(err.message || 'Import failed');
    } finally {
      setUploading(false);
    }
  };

  const exportCsv = async (all = false) => {
    setExporting(true);
    try {
      await questionBankService.exportCsv(all ? null : category);
      toast.success('Export downloaded');
    } catch (err) {
      toast.error(err.message || 'Export failed');
    } finally {
      setExporting(false);
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setCsvText(await readFileAsText(file));
      toast.success(`Loaded ${file.name}`);
    } catch {
      toast.error('Could not read file');
    }
    e.target.value = '';
  };

  const handleQuickSetAnswerKey = async (q, optionIndex) => {
    try {
      const updatedOpts = tryParseArray(q.options);
      // Optimistically update the list
      setQuestions((prev) =>
        prev.map((item) =>
          item.id === q.id
            ? { ...item, correct_index: optionIndex, correct_indices: [optionIndex] }
            : item
        )
      );
      await questionBankService.update(q.id, {
        category: q.category || category,
        question_type: q.question_type || 'mcq',
        question_text: q.question_text,
        options: updatedOpts,
        correct_index: optionIndex,
        correct_indices: [optionIndex],
        image_url: q.image_url || '',
        solution_image_url: q.solution_image_url || '',
        marks: Number(q.marks ?? 4),
        solution: q.solution ?? '',
        subject_id: q.subject_id || null,
        chapter_id: q.chapter_id || null,
        chapter: q.chapter || '',
        subject: q.subject || category,
        topic: q.topic || '',
        difficulty: q.difficulty || 'medium',
      });
      const letter = ['A', 'B', 'C', 'D', 'E'][optionIndex] || (optionIndex + 1);
      toast.success(`Option ${letter} set as correct answer key for Question #${q.serialNumber || q.id}`);
    } catch {
      toast.error('Failed to update answer key');
      load();
    setSelectedChapter('all');
    setChapterSearch('');
    if (chapterSliderRef.current) {
      chapterSliderRef.current.scrollLeft = 0;
    }
    }
  };

  return (
    <div className="w-full max-w-full space-y-6">
      <AdminHeader
        title="Question Repository & Bank"
        subtitle={`Managing reusable exam questions — bulk import, export, and subject organization (${questions.length} in ${category}).`}
        breadcrumbs={['Question Repository']}
        actions={(
          <>
            <button
              type="button"
              className={`btn font-extrabold flex items-center gap-1.5 shadow-sm transition cursor-pointer ${
                selectedQuestionIds.length > 0
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25 ring-2 ring-emerald-400/50'
                  : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
              }`}
              onClick={openCreateTestModal}
              title="Create a test using selected questions from the bank"
            >
              <Sparkles className="h-4 w-4" />
              <span>
                {selectedQuestionIds.length > 0
                  ? `Create Test (${selectedQuestionIds.length})`
                  : 'Create Test from Bank'}
              </span>
            </button>
            <button type="button" className="btn btn-primary" onClick={openAdd}>+ Add Question</button>
            <button
              type="button"
              className="btn bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
              onClick={openPdfModal}
            >
              <FileUp className="h-4 w-4" />
              <span>Upload PDF</span>
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setCsvOpen(true)}>CSV Import</button>
            <button type="button" className="btn btn-secondary" onClick={() => exportCsv(false)} disabled={exporting}>
              Export {category}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => exportCsv(true)} disabled={exporting}>
              Export All
            </button>
            <button
              type="button"
              className="btn bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-900/50 flex items-center gap-1.5 font-bold transition shadow-xs cursor-pointer"
              onClick={() => {
                setDeleteAllScope('category');
                setDeleteAllModalOpen(true);
              }}
              disabled={loading || questions.length === 0}
              title="Delete questions from repository"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete All</span>
            </button>
          </>
        )}
      />

      {/* Floating Selection Action Bar */}
      {selectedQuestionIds.length > 0 && (
        <div className="sticky top-2 z-40 p-3.5 sm:p-4 rounded-2xl border border-blue-500/40 bg-slate-900/95 dark:bg-[#0f172a]/95 text-white shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="flex h-7 px-3 items-center justify-center rounded-xl bg-blue-600 text-white font-black text-xs shadow-md">
                {selectedQuestionIds.length} Selected
              </span>
              <span className="text-xs font-semibold text-slate-300">
                ({totalSelectedMarks} Total Marks)
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {selectedCategoryBreakdown.map(({ cat, count }) => (
                <span key={cat} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-white border border-white/15">
                  {cat}: {count}
                </span>
              ))}
            </div>
            {selectedAlreadyChosenCount > 0 && (
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/35 flex items-center gap-1.5 shadow-2xs">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>{selectedAlreadyChosenCount} question(s) already chosen in previous test(s)</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={openCreateTestModal}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 transition cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Create Test with Selected ({selectedQuestionIds.length})</span>
            </button>
            <button
              type="button"
              onClick={openAddToExistingTestModal}
              className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 transition cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span>Add to Existing Test</span>
            </button>
            <button
              type="button"
              onClick={handleClearSelection}
              className="px-2.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 text-xs font-semibold transition cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {categoriesList.map((c) => (
            <button
              key={c}
              type="button"
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${category === c
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              onClick={() => {
                setCategory(c);
                setSelectedChapter('all');
                setTypeFilter('all');
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <span className="text-[11px] text-slate-400 dark:text-slate-500 px-2 font-semibold">Status:</span>
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer text-xs ${
                statusFilter === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All ({statusCounts.total})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('available')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer text-xs flex items-center gap-1.5 ${
                statusFilter === 'available'
                  ? 'bg-emerald-600 text-white shadow-2xs font-black'
                  : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
              <span>Available ({statusCounts.available})</span>
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('already_chosen')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer text-xs flex items-center gap-1.5 ${
                statusFilter === 'already_chosen'
                  ? 'bg-violet-600 text-white shadow-2xs font-black'
                  : 'text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-950/30'
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>In Test ({statusCounts.chosen})</span>
            </button>
          </div>

          {/* Question Type Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <span className="text-[11px] text-slate-400 dark:text-slate-500 px-2 font-semibold">Type:</span>
            <button
              type="button"
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer text-xs ${
                typeFilter === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All ({typeCounts.total})
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter('mcq')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer text-xs ${
                typeFilter === 'mcq'
                  ? 'bg-blue-600 text-white shadow-2xs font-black'
                  : 'text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30'
              }`}
            >
              MCQs ({typeCounts.mcqCount})
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter('assertion_reason')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer text-xs flex items-center gap-1.5 ${
                typeFilter === 'assertion_reason'
                  ? 'bg-amber-600 text-white shadow-2xs font-black ring-1 ring-amber-400/50'
                  : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30'
              }`}
            >
              <AlertCircle className="h-3.5 w-3.5" />
              <span>Assertion-Reason ({typeCounts.arCount})</span>
            </button>
            {typeCounts.numCount > 0 && (
              <button
                type="button"
                onClick={() => setTypeFilter('numerical')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer text-xs ${
                  typeFilter === 'numerical'
                    ? 'bg-purple-600 text-white shadow-2xs font-black'
                    : 'text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30'
                }`}
              >
                Numerical ({typeCounts.numCount})
              </button>
            )}
          </div>
        </div>
      </div>

      
      {/* Chapter Name Badges Slider View */}
      {chaptersWithCounts.length > 0 && (
        <div className="card p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#111827]/95 shadow-xs backdrop-blur-xs space-y-2.5">
          {/* Top header row: Title, active filter chip, search input, slider prev/next controls */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                  <BookOpen className="h-3.5 w-3.5" />
                </span>
                <span>Chapters</span>
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-black bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60">
                  {chaptersWithCounts.length}
                </span>
              </div>

              {selectedChapter !== 'all' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 animate-in fade-in zoom-in-95 duration-150">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                    <span className="truncate max-w-[200px]">Active: <strong>{selectedChapter}</strong></span>
                    <span className="text-[10px] opacity-75 font-mono">({filteredQuestions.length} Qs)</span>
                    <button
                      type="button"
                      onClick={() => setSelectedChapter('all')}
                      className="ml-1 p-0.5 rounded-full hover:bg-indigo-500/30 text-indigo-600 dark:text-indigo-300 transition cursor-pointer"
                      title="Clear chapter filter (show all)"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Inline Type Toggles for Active Chapter */}
                  <div className="inline-flex items-center gap-1 p-0.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setTypeFilter('all')}
                      className={`px-2.5 py-1 rounded-lg transition text-[11px] cursor-pointer ${
                        typeFilter === 'all'
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs font-black'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                      title="View all questions in this chapter"
                    >
                      All ({typeCounts.total})
                    </button>
                    <button
                      type="button"
                      onClick={() => setTypeFilter('mcq')}
                      className={`px-2.5 py-1 rounded-lg transition text-[11px] cursor-pointer ${
                        typeFilter === 'mcq'
                          ? 'bg-blue-600 text-white shadow-2xs font-black'
                          : 'text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300'
                      }`}
                      title="View only MCQs in this chapter"
                    >
                      MCQ ({typeCounts.mcqCount})
                    </button>
                    <button
                      type="button"
                      onClick={() => setTypeFilter('assertion_reason')}
                      className={`px-2.5 py-1 rounded-lg transition text-[11px] cursor-pointer flex items-center gap-1 ${
                        typeFilter === 'assertion_reason'
                          ? 'bg-amber-600 text-white shadow-2xs font-black ring-1 ring-amber-400/50'
                          : 'text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300'
                      }`}
                      title="View only Assertion-Reason questions in this chapter"
                    >
                      <AlertCircle className="h-3 w-3" />
                      <span>AR ({typeCounts.arCount})</span>
                    </button>
                  </div>

                  {/* Quick Select All AR Button for this Chapter */}
                  {typeCounts.arCount > 0 && (
                    <button
                      type="button"
                      onClick={handleSelectAllAR}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer shadow-2xs active:scale-95 ${
                        isAllArSelected
                          ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 ring-2 ring-amber-400/50'
                          : 'bg-amber-500/15 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                      }`}
                      title={isAllArSelected ? `Deselect all ${typeCounts.arCount} Assertion-Reason questions in ${selectedChapter}` : `Select all ${typeCounts.arCount} Assertion-Reason questions in ${selectedChapter} for test creation`}
                    >
                      {isAllArSelected ? <CheckSquare className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5 text-amber-500" />}
                      <span>{isAllArSelected ? 'Deselect All AR' : 'Select All AR'} ({typeCounts.arCount})</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Quick Chapter Search Filter */}
              {chaptersWithCounts.length > 5 && (
                <div className="relative w-36 sm:w-44">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={chapterSearch}
                    onChange={(e) => setChapterSearch(e.target.value)}
                    placeholder="Find chapter..."
                    className="w-full pl-8 pr-7 py-1 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                  />
                  {chapterSearch && (
                    <button
                      type="button"
                      onClick={() => setChapterSearch('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                      title="Clear search"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              )}

              {/* Slider Prev / Next Controls */}
              <div className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => slideChapters('left')}
                  disabled={!canScrollLeft}
                  className={`p-1 rounded-lg transition-all ${
                    canScrollLeft
                      ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 shadow-2xs cursor-pointer active:scale-95'
                      : 'text-slate-300 dark:text-slate-600 cursor-not-allowed opacity-40'
                  }`}
                  title="Slide left"
                  aria-label="Previous chapters"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => slideChapters('right')}
                  disabled={!canScrollRight}
                  className={`p-1 rounded-lg transition-all ${
                    canScrollRight
                      ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 shadow-2xs cursor-pointer active:scale-95'
                      : 'text-slate-300 dark:text-slate-600 cursor-not-allowed opacity-40'
                  }`}
                  title="Slide right"
                  aria-label="Next chapters"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Slider View Track */}
          <div className="relative group">
            {/* Left Edge Fade */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-[#111827] to-transparent z-10 pointer-events-none transition-opacity duration-200" />
            )}

            {/* Right Edge Fade */}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-[#111827] to-transparent z-10 pointer-events-none transition-opacity duration-200" />
            )}

            {/* Scrollable Badges Strip */}
            <div
              ref={chapterSliderRef}
              className="flex items-center gap-2 overflow-x-auto scrollbar-none scroll-smooth py-1 px-0.5 select-none touch-pan-x"
            >
              {/* "All Chapters" Badge */}
              <button
                type="button"
                data-active-chapter={selectedChapter === 'all'}
                onClick={() => setSelectedChapter('all')}
                className={`shrink-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer ${
                  selectedChapter === 'all'
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/50 scale-[1.02]'
                    : 'border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-300'
                }`}
                title={`Show all questions in ${category} (${questions.length})`}
              >
                <span>All Chapters</span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                    selectedChapter === 'all'
                      ? 'bg-white/25 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {questions.length}
                </span>
                {totalArInSubject > 0 && (
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[9px] font-mono font-black transition-colors ${
                      selectedChapter === 'all'
                        ? 'bg-amber-400 text-slate-950 shadow-2xs'
                        : 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                    }`}
                    title={`${totalArInSubject} Assertion-Reason questions in ${category}`}
                  >
                    {totalArInSubject} AR
                  </span>
                )}
              </button>

              {/* Individual Chapter Name Badges */}
              {displayedChapters.map(({ name, count, arCount }) => {
                const isSelected = selectedChapter !== 'all' && normChapterKey(selectedChapter) === normChapterKey(name);
                return (
                  <button
                    key={name}
                    type="button"
                    data-active-chapter={isSelected}
                    onClick={() => handleSelectChapter(name)}
                    className={`shrink-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap group/badge ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/50 scale-[1.02]'
                        : 'border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-300'
                    }`}
                    title={`Click to filter by ${name} (${count} questions${arCount ? `, ${arCount} Assertion-Reason` : ''})`}
                  >
                    <BookOpen
                      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/badge:scale-110 ${
                        isSelected ? 'text-white' : 'text-indigo-500 dark:text-indigo-400'
                      }`}
                    />
                    <span className="font-extrabold">{name}</span>
                    <span
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-black transition-colors ${
                        isSelected
                          ? 'bg-white/25 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover/badge:bg-indigo-100 dark:group-hover/badge:bg-indigo-900/60 group-hover/badge:text-indigo-700 dark:group-hover/badge:text-indigo-300'
                      }`}
                    >
                      {count}
                    </span>
                    {arCount > 0 && (
                      <span
                        className={`px-1.5 py-0.5 rounded-md text-[9px] font-mono font-black transition-colors ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 shadow-2xs'
                            : 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 group-hover/badge:bg-amber-500/25'
                        }`}
                        title={`${arCount} Assertion-Reason questions in ${name}`}
                      >
                        {arCount} AR
                      </span>
                    )}
                  </button>
                );
              })}

              {displayedChapters.length === 0 && chapterSearch && (
                <div className="py-1 px-3 text-xs text-slate-400 italic">
                  No chapters matching &ldquo;{chapterSearch}&rdquo;
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Active Assertion-Reason Filter Banner */}
      {typeFilter === 'assertion_reason' && (
        <div className="mb-3 px-4 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 dark:bg-amber-950/20 flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xs">
          <div className="flex items-center gap-2.5 text-amber-900 dark:text-amber-200 font-bold">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <AlertCircle className="h-4 w-4" />
            </span>
            <div>
              <span>
                Filtering by <strong>Assertion-Reason Type</strong>: Showing{' '}
                <strong className="text-amber-600 dark:text-amber-400">{filteredQuestions.length}</strong> questions
                {selectedChapter !== 'all' ? (
                  <> in chapter <strong>&ldquo;{selectedChapter}&rdquo;</strong></>
                ) : (
                  <> across all <strong>{category}</strong> chapters</>
                )}.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {filteredQuestions.length > 0 && (
              <button
                type="button"
                onClick={handleSelectAllVisible}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold transition cursor-pointer text-xs flex items-center gap-1.5 shadow-xs"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Select All {filteredQuestions.length} AR Questions</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setTypeFilter('all')}
              className="px-2.5 py-1.5 rounded-xl border border-amber-500/30 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20 transition cursor-pointer font-semibold text-xs"
            >
              Show All Types
            </button>
          </div>
        </div>
      )}

      {loading ? <LoadingScreen /> : (
        <div className="card overflow-hidden p-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
          <DataTable
            key={`${category}-${selectedChapter}-${statusFilter}-${typeFilter}`}
            rowClassName={(q) => (selectedQuestionIds.includes(q.id) ? 'bg-blue-50/60 dark:bg-blue-950/30' : '')}
            columns={[
              {
                key: 'select',
                sortable: false,
                headerRender: () => {
                  const visibleIds = (filteredQuestions || []).map((q) => q.id);
                  const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedQuestionIds.includes(id));
                  const someSelected = visibleIds.some((id) => selectedQuestionIds.includes(id));
                  return (
                    <div className="flex items-center justify-center pl-1" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={allSelected}
                        ref={(el) => { if (el) el.indeterminate = !allSelected && someSelected; }}
                        onChange={handleSelectAllVisible}
                        title={allSelected ? "Deselect all questions in this category" : "Select all questions in this category"}
                        className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </div>
                  );
                },
                render: (q) => {
                  const isChecked = selectedQuestionIds.includes(q.id);
                  return (
                    <div className="flex items-center justify-center pl-1" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSelectQuestion(q)}
                        className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </div>
                  );
                },
              },
              {
                key: 'serialNumber',
                label: '#',
                render: (q, idx) => {
                  const sNo = q.serialNumber || (idx != null ? idx + 1 : q.id);
                  return (
                    <div className="flex flex-col items-center justify-center min-w-[36px] select-none">
                      <span className="inline-flex items-center justify-center font-mono font-black text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 rounded-md px-2 py-0.5 shadow-2xs">
                        #{sNo}
                      </span>
                      {q.id && (
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-0.5" title={`Database ID: ${q.id}`}>
                          ID:{q.id}
                        </span>
                      )}
                    </div>
                  );
                },
              },
              {
                key: 'chapter',
                label: 'Chapter',
                render: (q) => {
                  const chapterName = getQuestionChapter(q);
                  const hasTopic = q.topic && chapterName && q.topic.toLowerCase() !== chapterName.toLowerCase();
                  return (
                    <div className="flex flex-col gap-1 max-w-[200px]">
                      {chapterName ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectChapter(chapterName);
                          }}
                          className={`inline-flex items-center gap-1.5 text-xs font-bold rounded-lg px-2.5 py-1 text-left transition-all cursor-pointer ${
                            selectedChapter.toLowerCase() === chapterName.toLowerCase()
                              ? 'bg-indigo-600 text-white shadow-xs ring-1 ring-indigo-400'
                              : 'text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300'
                          }`}
                          title={`Click to filter by chapter: ${chapterName}`}
                        >
                          <BookOpen className={`h-3.5 w-3.5 shrink-0 ${selectedChapter.toLowerCase() === chapterName.toLowerCase() ? 'text-white' : 'text-indigo-500 dark:text-indigo-400'}`} />
                          <span className="truncate" title={chapterName}>{chapterName}</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 italic flex items-center gap-1">
                          <Bookmark className="h-3 w-3 opacity-40" />
                          <span>General</span>
                        </span>
                      )}
                      {hasTopic && (
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate pl-1" title={`Specific Topic: ${q.topic}`}>
                          Topic: {q.topic}
                        </span>
                      )}
                    </div>
                  );
                },
              },
              {
                key: 'question_text',
                label: 'Question',
                render: (q, idx) => {
                  const sNo = q.serialNumber || (idx != null ? idx + 1 : q.id);
                  const chapterName = getQuestionChapter(q);
                  const hasTopic = q.topic && chapterName && q.topic.toLowerCase() !== chapterName.toLowerCase();
                  const opts = tryParseArray(q.options);
                  const OPTION_KEYS = ['A', 'B', 'C', 'D', 'E'];
                  const hasAnswerKey = q.correct_index !== null && q.correct_index !== undefined && q.correct_index !== '';
                  const correctIdx = hasAnswerKey ? Number(q.correct_index) : -1;
                  const isInteger = q.question_type === 'integer' || q.question_type === 'numerical';
                  return (
                    <div className="flex flex-col gap-1.5 max-w-xl py-1">
                      {/* Top Identification Header: Numbering & Overall Chapter */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-0.5 select-none">
                        <span className="inline-flex items-center gap-1 text-[11px] font-black text-blue-700 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-900/40 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800/50">
                          <Hash className="h-3 w-3" />
                          Question #{sNo}
                        </span>
                        {q.status === 'already_chosen' ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTestsModalQuestion(q);
                            }}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-violet-700 dark:text-violet-300 bg-violet-100/90 dark:bg-violet-950/60 px-2 py-0.5 rounded-md border border-violet-300 dark:border-violet-700/60 hover:bg-violet-200/80 dark:hover:bg-violet-900/60 transition-colors cursor-pointer shadow-2xs"
                            title={Array.isArray(q.used_in_tests) && q.used_in_tests.length > 0 ? `Selected in ${q.used_in_tests.length} test(s): Click to view details` : 'Already selected in test'}
                          >
                            <BookmarkCheck className="h-3 w-3 text-violet-600 dark:text-violet-400 shrink-0" />
                            <span>In Test{Array.isArray(q.used_in_tests) && q.used_in_tests.length > 0 ? ` (${q.used_in_tests.length})` : ''}</span>
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>Available</span>
                          </span>
                        )}
                        {q.image_url && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 px-2 py-0.5 rounded-md border border-cyan-300 dark:border-cyan-800/60 shadow-2xs" title="This question has an attached reaction/chemical structure diagram">
                            <Image className="h-3 w-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
                            <span>Diagram</span>
                          </span>
                        )}
                        {isAssertionReason(q) && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-300 dark:border-amber-800/60 shadow-2xs" title="Assertion-Reason question">
                            <AlertCircle className="h-3 w-3 text-amber-600 dark:text-amber-400 shrink-0" />
                            <span>Assertion-Reason</span>
                          </span>
                        )}
                        {chapterName && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectChapter(chapterName);
                            }}
                            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md border transition-all cursor-pointer truncate max-w-xs ${
                              selectedChapter.toLowerCase() === chapterName.toLowerCase()
                                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs ring-1 ring-indigo-400'
                                : 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 hover:scale-102'
                            }`}
                            title={`Filter Question Bank by Chapter: ${chapterName}`}
                          >
                            <BookOpen className="h-3 w-3 shrink-0" />
                            <span className="truncate">{chapterName}</span>
                          </button>
                        )}
                        {hasTopic && (
                          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700/50 truncate max-w-[170px]" title={`Specific Topic: ${q.topic}`}>
                            Topic: {q.topic}
                          </span>
                        )}
                        {q.subject && q.subject.toLowerCase() !== category.toLowerCase() && (
                          <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 px-1.5 py-0.5 rounded border border-purple-200 dark:border-purple-800/50">
                            {q.subject}
                          </span>
                        )}
                      </div>

                      {/* Question Text with LaTeX */}
                      <div className="text-slate-900 dark:text-slate-100 font-bold leading-snug text-xs">
                        <MathRenderer text={q.question_text} />
                      </div>

                      {/* Prominent Question Diagram (Directly beneath question text, before options) */}
                      {q.image_url && (
                        <div className="my-2 rounded-xl border border-blue-200/90 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/25 p-2.5 max-w-xl transition-all shadow-xs hover:shadow-md">
                          <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-blue-100 dark:border-blue-900/40 select-none">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-blue-800 dark:text-blue-300">
                              <Image className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                              <span>Reaction & Structure Diagram</span>
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewImageModal({
                                  url: getMediaUrl(q.image_url),
                                  title: `Question #${sNo} - ${q.topic || 'Chemical Reaction Diagram'}`
                                });
                              }}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 hover:underline cursor-pointer"
                              title="Click to view full-resolution diagram"
                            >
                              <ZoomIn className="h-3.5 w-3.5" />
                              <span>Enlarge Diagram</span>
                            </button>
                          </div>
                          <div 
                            className="flex items-center justify-center bg-white dark:bg-slate-900 rounded-lg p-2.5 border border-slate-200 dark:border-slate-800 cursor-zoom-in group overflow-hidden"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewImageModal({
                                url: getMediaUrl(q.image_url),
                                title: `Question #${sNo} - ${q.topic || 'Chemical Reaction Diagram'}`
                              });
                            }}
                            title="Click to zoom in full resolution"
                          >
                            <img
                              src={getMediaUrl(q.image_url)}
                              alt={`Question #${sNo} diagram`}
                              className="max-h-64 sm:max-h-72 w-auto max-w-full object-contain rounded transition-transform duration-200 group-hover:scale-[1.02]"
                              onError={(e) => {
                                if (!e.target.dataset.triedFallback && !q.image_url.startsWith('http')) {
                                  e.target.dataset.triedFallback = 'true';
                                  e.target.src = `http://127.0.0.1:5000${q.image_url.startsWith('/') ? '' : '/'}${q.image_url}`;
                                }
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Options A/B/C/D */}
                      {!isInteger && opts.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-0.5">
                          {opts.map((opt, i) => {
                            const optText = typeof opt === 'object' ? (opt.text || '') : String(opt);
                            const optImg = typeof opt === 'object' ? (opt.image_url || (Array.isArray(opt.media) && opt.media[0]?.url) || '') : '';
                            const isCorrect = hasAnswerKey && i === correctIdx;
                            return (
                              <button
                                type="button"
                                key={i}
                                title={isCorrect ? `Option ${OPTION_KEYS[i]} is selected as correct answer` : `Click to select Option ${OPTION_KEYS[i]} as the correct answer key`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuickSetAnswerKey(q, i);
                                }}
                                className={`group flex items-start gap-1.5 rounded-lg px-2 py-1 text-[11px] leading-snug text-left transition-all cursor-pointer select-none ${
                                  isCorrect
                                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-400 dark:border-emerald-600/70 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500/30 shadow-xs'
                                    : 'bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 hover:border-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20'
                                }`}
                              >
                                <span className={`font-black shrink-0 ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'}`}>
                                  {OPTION_KEYS[i] || (i + 1)}.
                                </span>
                                <div className="flex-1 min-w-0 flex flex-col gap-1">
                                  {optText && <MathRenderer text={optText} className="min-w-0" />}
                                  {optImg && (
                                    <div className="flex items-center gap-1 mt-0.5">
                                      <img
                                        src={getMediaUrl(optImg)}
                                        alt={`Option ${OPTION_KEYS[i]} diagram`}
                                        className="h-14 max-w-[140px] object-contain rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-0.5"
                                        onError={(e) => {
                                          if (!e.target.dataset.triedFallback && !optImg.startsWith('http')) {
                                            e.target.dataset.triedFallback = 'true';
                                            e.target.src = `http://127.0.0.1:5000${optImg.startsWith('/') ? '' : '/'}${optImg}`;
                                          }
                                        }}
                                      />
                                      <span className="text-[9px] text-slate-400 font-medium">diagram</span>
                                    </div>
                                  )}
                                </div>
                                {isCorrect ? (
                                  <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500 mt-0.5" />
                                ) : (
                                  <span className="opacity-0 group-hover:opacity-100 text-[9px] text-emerald-600 dark:text-emerald-400 font-bold shrink-0 mt-0.5 transition-opacity">Select</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Warning when answer key is missing */}
                      {!isInteger && !hasAnswerKey && opts.length > 0 && (
                        <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-0.5 flex items-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          <span>Answer key not provided (click an option above to select)</span>
                        </div>
                      )}

                      {/* Integer answer */}
                      {isInteger && (
                        <div className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 rounded-lg px-2.5 py-1.5 flex items-center gap-2 mt-1">
                          <Hash className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                          <span>Correct Integer Answer: <strong className="font-mono text-xs font-black text-indigo-900 dark:text-indigo-100">{q.numeric_answer != null ? q.numeric_answer : 'Not specified'}</strong></span>
                          {q.question_type === 'numerical' && q.numerical_tolerance ? (
                            <span className="text-[10px] text-slate-500 font-mono">(±{q.numerical_tolerance})</span>
                          ) : null}
                        </div>
                      )}

                      {/* Solution preview with optional solution diagram */}
                      {(q.solution || q.solution_image_url) && (
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 italic border-t border-slate-100 dark:border-slate-800 pt-1 space-y-1">
                          {q.solution && (
                            <div>
                              <span className="font-semibold not-italic text-slate-400 dark:text-slate-500">Sol: </span>
                              <MathRenderer text={q.solution} className="inline" />
                            </div>
                          )}
                          {q.solution_image_url && (
                            <div className="flex items-center gap-2 not-italic pt-1">
                              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <Image className="h-3 w-3" />
                                Solution Diagram:
                              </span>
                              <img
                                src={getMediaUrl(q.solution_image_url)}
                                alt="Solution diagram"
                                className="h-16 max-w-[180px] object-contain rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-0.5 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPreviewImageModal({
                                    url: getMediaUrl(q.solution_image_url),
                                    title: `Question #${sNo} - Solution Diagram`
                                  });
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }
              },
              {
                key: 'question_type', label: 'Type', render: (q) => {
                  const typeColors = {
                    integer: 'text-indigo-700 dark:text-indigo-300 bg-indigo-500/15 border-indigo-500/30',
                    numerical: 'text-cyan-700 dark:text-cyan-300 bg-cyan-500/15 border-cyan-500/30',
                    multi_select: 'text-purple-700 dark:text-purple-300 bg-purple-500/15 border-purple-500/30',
                    assertion_reason: 'text-amber-700 dark:text-amber-300 bg-amber-500/15 border-amber-500/30',
                    coding: 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 border-emerald-500/30',
                    subjective: 'text-rose-700 dark:text-rose-300 bg-rose-500/15 border-rose-500/30',
                  };
                  const isAR = isAssertionReason(q);
                  const effectiveType = isAR ? 'assertion_reason' : q.question_type;
                  const colorClass = typeColors[effectiveType] || 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20';
                  const labelMap = {
                    mcq: 'Single MCQ',
                    single_choice: 'Single MCQ',
                    multi_select: 'Multi MCQ',
                    integer: 'Integer',
                    numerical: 'Numerical',
                    assertion_reason: 'Assertion-Reason',
                    coding: 'Coding',
                    subjective: 'Subjective',
                  };
                  return (
                    <span className={`uppercase text-[10px] font-black tracking-wider px-2.5 py-0.5 rounded-full border ${colorClass}`}>
                      {labelMap[effectiveType] || effectiveType}
                    </span>
                  );
                }
              },
              {
                key: 'difficulty', label: 'Difficulty', render: (q) => (
                  <Badge color={q.difficulty === 'hard' ? 'red' : q.difficulty === 'medium' ? 'amber' : 'green'}>
                    {q.difficulty || 'medium'}
                  </Badge>
                )
              },
              {
                key: 'status',
                label: 'Status',
                render: (q) => {
                  const isUsed = q.status === 'already_chosen';
                  const testCount = Array.isArray(q.used_in_tests) ? q.used_in_tests.length : (q.test_count || 0);
                  return isUsed ? (
                    <button
                      type="button"
                      onClick={() => setTestsModalQuestion(q)}
                      className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-500/15 border border-violet-500/30 text-violet-700 dark:text-violet-300 hover:bg-violet-500/25 transition-all cursor-pointer shadow-2xs"
                      title="Click to view tests using this question"
                    >
                      <BookmarkCheck className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400 shrink-0" />
                      <span>In Test</span>
                      {testCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full bg-violet-600 text-white text-[9px] font-black group-hover:scale-105 transition-transform">
                          {testCount}
                        </span>
                      )}
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>Available</span>
                    </span>
                  );
                }
              },
              { key: 'marks', label: 'Marks', render: (q) => <span className="font-black text-slate-900 dark:text-white text-xs">{q.marks}</span> },
              {
                key: 'actions', label: '', render: (q) => (
                  <div className="flex justify-end pr-2">
                    <ActionDropdown
                      items={[
                        {
                          label: 'Edit Question',
                          icon: Pencil,
                          onClick: () => openEdit(q),
                          color: 'text-blue-600 dark:text-blue-400',
                        },
                        ...(Array.isArray(q.used_in_tests) && q.used_in_tests.length > 0 ? [
                          {
                            label: `View In Tests (${q.used_in_tests.length})`,
                            icon: ExternalLink,
                            onClick: () => setTestsModalQuestion(q),
                            color: 'text-violet-600 dark:text-violet-400',
                          }
                        ] : []),
                        {
                          label: q.status === 'already_chosen' ? 'Mark as Available' : 'Mark as Selected in Test',
                          icon: BookmarkCheck,
                          onClick: () => handleToggleStatus(q),
                          color: q.status === 'already_chosen' ? 'text-emerald-600 dark:text-emerald-400' : 'text-violet-600 dark:text-violet-400',
                        },
                        {
                          label: 'Delete Question',
                          icon: Trash2,
                          onClick: () => setDeleteQuestionId(q.id),
                          danger: true,
                        },
                      ]}
                    />
                  </div>
                )
              },
            ]}
            rows={questionsWithSerial}
            emptyMessage={
              typeFilter === 'assertion_reason'
                ? selectedChapter !== 'all'
                  ? `No Assertion-Reason questions found in chapter "${selectedChapter}".`
                  : `No Assertion-Reason questions found in ${category}.`
                : selectedChapter !== 'all'
                  ? `No questions found for chapter "${selectedChapter}".`
                  : `No questions in ${category}. Upload a PDF, import via CSV, or add manually.`
            }
          />
        </div>
      )}

      {/* Add / Edit Question Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit question' : 'Add question'} size="lg">
        <form onSubmit={saveQuestion} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-30">
            <div>
              <label className="label">Question type</label>
              <CustomSelectDropdown
                value={form.question_type}
                options={[
                  { value: 'mcq', label: 'Single correct MCQ' },
                  { value: 'multi_select', label: 'Multiple correct MCQ' },
                  { value: 'integer', label: 'Integer type' },
                  { value: 'numerical', label: 'Numerical answer type' },
                  { value: 'assertion_reason', label: 'Assertion-reason type' },
                  { value: 'coding', label: 'Coding' },
                  { value: 'subjective', label: 'Subjective' },
                ]}
                onChange={(val) => {
                  const isIntOrNum = val === 'integer' || val === 'numerical';
                  setForm((f) => ({
                    ...f,
                    question_type: val,
                    numeric_answer: isIntOrNum ? (f.numeric_answer !== '' && f.numeric_answer != null ? f.numeric_answer : 0) : null,
                    numerical_tolerance: val === 'numerical' ? (f.numerical_tolerance ?? 0.01) : 0,
                    options: isIntOrNum ? '' : (f.options || 'Option A|Option B|Option C|Option D'),
                    correct_index: isIntOrNum ? null : (f.correct_index ?? 0),
                  }));
                }}
              />
            </div>
            <div>
              <label className="label">Marks</label>
              <input type="number" min={1} className="input" value={form.marks} onChange={(e) => setForm((f) => ({ ...f, marks: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="label">Test Status</label>
              <CustomSelectDropdown
                value={form.status || 'normal'}
                options={[
                  { value: 'normal', label: '🟢 Available (Unused)' },
                  { value: 'already_chosen', label: '🟣 Selected in Test' },
                ]}
                onChange={(val) => setForm((f) => ({ ...f, status: val }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 relative z-20">
            <div>
              <label className="label">Subject</label>
              <CustomSelectDropdown
                value={form.subject_id || form.subject || ''}
                placeholder="Select subject"
                options={[{ id: '', name: 'Select subject' }, ...subjectsList]}
                onChange={(val, opt) => {
                  const subjObj = opt || subjectsList.find(s => (s.id !== undefined && String(s.id) === String(val)) || (s.name && s.name.toLowerCase() === String(val).toLowerCase()));
                  const nextSubjId = (subjObj && subjObj.id !== undefined && subjObj.id !== '' && !isNaN(Number(subjObj.id))) ? Number(subjObj.id) : (val !== '' && val !== null && !isNaN(Number(val)) ? Number(val) : val);
                  const nextSubjName = (subjObj && (subjObj.name || subjObj.label)) ? (subjObj.name || subjObj.label) : String(val || '');
                  setForm((f) => ({
                    ...f,
                    subject_id: nextSubjId || null,
                    subject: nextSubjName,
                    chapter_id: null,
                    topic: ''
                  }));
                }}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="label mb-0">Chapter</label>
                <button
                  type="button"
                  onClick={() => setCustomChapterMode((prev) => !prev)}
                  className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-bold cursor-pointer"
                >
                  {customChapterMode ? 'Select from list' : '+ Enter custom'}
                </button>
              </div>
              {customChapterMode ? (
                <input
                  type="text"
                  className="input text-xs"
                  placeholder="e.g. Sexual Reproduction in Flowering Plants"
                  value={form.chapter || ''}
                  onChange={(e) => setForm((f) => ({ ...f, chapter: e.target.value }))}
                />
              ) : (
                <CustomSelectDropdown
                  value={form.chapter_id || form.chapter || ''}
                  placeholder="Select chapter"
                  disabled={!form.subject_id && !form.subject}
                  options={[{ id: '', name: 'Select chapter' }, ...chaptersList]}
                  onChange={(val, opt) => {
                    const chapObj = opt || chaptersList.find(c => (c.id !== undefined && String(c.id) === String(val)) || (c.name && c.name.toLowerCase() === String(val).toLowerCase()));
                    const nextChapId = (chapObj && chapObj.id !== undefined && chapObj.id !== '' && !isNaN(Number(chapObj.id))) ? Number(chapObj.id) : (val !== '' && val !== null && !isNaN(Number(val)) ? Number(val) : null);
                    const nextChapterName = (chapObj && (chapObj.name || chapObj.label)) ? (chapObj.name || chapObj.label) : String(val || '');
                    setForm((f) => ({
                      ...f,
                      chapter_id: nextChapId || null,
                      chapter: nextChapterName,
                    }));
                  }}
                />
              )}
            </div>
            <div>
              <label className="label">Specific Topic (Optional)</label>
              <input
                type="text"
                className="input text-xs"
                placeholder="e.g. Pollen Grain Viability / Double Fertilization"
                value={form.topic || ''}
                onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
              />
            </div>
            <div>
              <label className="label">Difficulty</label>
              <CustomSelectDropdown
                value={form.difficulty || 'medium'}
                options={[
                  { value: 'easy', label: 'Easy' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'hard', label: 'Hard' },
                ]}
                onChange={(val) => setForm((f) => ({ ...f, difficulty: val }))}
              />
            </div>
          </div>

          <div>
            <label className="label">Question text</label>
            <textarea rows={3} className="input" required value={form.question_text} onChange={(e) => setForm((f) => ({ ...f, question_text: e.target.value }))} />
          </div>

          {form.question_type === 'assertion_reason' && (
            <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div>
                <label className="label">Assertion (A)</label>
                <textarea rows={2} className="input" placeholder="Statement 1" value={form.assertion_text || ''} onChange={(e) => setForm((f) => ({ ...f, assertion_text: e.target.value }))} />
              </div>
              <div>
                <label className="label">Reason (R)</label>
                <textarea rows={2} className="input" placeholder="Statement 2" value={form.reason_text || ''} onChange={(e) => setForm((f) => ({ ...f, reason_text: e.target.value }))} />
              </div>
            </div>
          )}

          {(form.question_type === 'mcq' || form.question_type === 'single_choice' || form.question_type === 'multi_select' || form.question_type === 'assertion_reason') && (() => {
            const isMulti = form.question_type === 'multi_select';
            const optsList = Array.isArray(form.options) ? form.options : [];
            const OPT_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

            return (
              <div className="space-y-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-3.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {isMulti
                      ? 'Answer Options (check all correct; diagram/graph upload available per option)'
                      : 'Answer Options (select one correct; diagram/graph upload available per option)'}
                  </label>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline cursor-pointer"
                    onClick={() => {
                      const nextKey = OPT_LETTERS[optsList.length] || String.fromCharCode(65 + optsList.length);
                      setForm((f) => ({
                        ...f,
                        options: [...(Array.isArray(f.options) ? f.options : []), { key: nextKey, text: '', image_url: '' }],
                      }));
                    }}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Option</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {optsList.map((opt, i) => {
                    const optKey = (typeof opt === 'object' && opt?.key) ? opt.key : (OPT_LETTERS[i] || String.fromCharCode(65 + i));
                    const optText = typeof opt === 'object' ? (opt.text || opt.label || '') : String(opt || '');
                    const optImg = typeof opt === 'object' ? (opt.image_url || opt.image || opt.url || '') : '';
                    const isCorrect = isMulti
                      ? (Array.isArray(form.correct_indices) && form.correct_indices.includes(i))
                      : Number(form.correct_index) === i;

                    return (
                      <div
                        key={i}
                        className={`rounded-xl border p-3 space-y-2.5 transition-all ${
                          isCorrect
                            ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30 shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-2">
                          <div className="flex items-center gap-2">
                            {isMulti ? (
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                                checked={isCorrect}
                                onChange={(e) => {
                                  const cur = Array.isArray(form.correct_indices) ? [...form.correct_indices] : [];
                                  const next = e.target.checked
                                    ? Array.from(new Set([...cur, i]))
                                    : cur.filter((x) => x !== i);
                                  setForm((f) => ({ ...f, correct_indices: next, correct_indices_str: next.join(',') }));
                                }}
                              />
                            ) : (
                              <input
                                type="radio"
                                name="correct_bank_opt"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                                checked={isCorrect}
                                onChange={() => setForm((f) => ({ ...f, correct_index: i, correct_indices: [i] }))}
                              />
                            )}
                            <span className={`text-xs font-black ${isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-700 dark:text-slate-300'}`}>
                              Option ({optKey}) {isCorrect && '✓ Correct Answer'}
                            </span>
                          </div>

                          {optsList.length > 2 && (
                            <button
                              type="button"
                              className="text-[11px] font-bold text-rose-500 hover:text-rose-700 hover:underline cursor-pointer"
                              onClick={() => {
                                setForm((f) => {
                                  const curOpts = Array.isArray(f.options) ? f.options : [];
                                  const nextOpts = curOpts.filter((_, idx) => idx !== i);
                                  const nextIdx = Number(f.correct_index) === i ? 0 : (Number(f.correct_index) > i ? Number(f.correct_index) - 1 : Number(f.correct_index));
                                  const nextIndices = (f.correct_indices || []).filter((x) => x !== i).map((x) => (x > i ? x - 1 : x));
                                  return {
                                    ...f,
                                    options: nextOpts,
                                    correct_index: nextIdx,
                                    correct_indices: nextIndices,
                                    correct_indices_str: nextIndices.join(','),
                                  };
                                });
                              }}
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <textarea
                          rows={2}
                          className="input text-xs"
                          placeholder={`Enter Option (${optKey}) text, values, formulas...`}
                          value={optText}
                          onChange={(e) => {
                            const val = e.target.value;
                            setForm((f) => {
                              const cur = Array.isArray(f.options) ? [...f.options] : [];
                              cur[i] = {
                                ...(typeof cur[i] === 'object' ? cur[i] : { key: optKey }),
                                key: optKey,
                                text: val,
                              };
                              return { ...f, options: cur };
                            });
                          }}
                        />

                        {optText && (
                          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 text-xs">
                            <span className="text-[10px] font-bold text-slate-400 block mb-0.5">Live Math Preview:</span>
                            <MathRenderer text={optText} />
                          </div>
                        )}

                        <QuestionImageUploader
                          label={`Option (${optKey}) Diagram / Graph / Circuit Image (Optional)`}
                          value={optImg}
                          onChange={(url) => {
                            setForm((f) => {
                              const cur = Array.isArray(f.options) ? [...f.options] : [];
                              cur[i] = {
                                ...(typeof cur[i] === 'object' ? cur[i] : { key: optKey, text: '' }),
                                key: optKey,
                                image_url: url,
                              };
                              return { ...f, options: cur };
                            });
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {form.question_type === 'integer' && (
            <div className="rounded-xl border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-950/20 p-4 space-y-2">
              <label className="label text-indigo-900 dark:text-indigo-200 font-extrabold flex items-center gap-1.5 mb-1">
                <Hash className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Correct Integer Answer (Whole Number)
              </label>
              <input
                className="input font-mono text-base font-bold max-w-xs"
                type="number"
                step="1"
                placeholder="e.g. 4"
                required
                value={form.numeric_answer ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, numeric_answer: e.target.value !== '' ? parseInt(e.target.value, 10) : '' }))}
              />
              <p className="text-xs text-indigo-700/80 dark:text-indigo-300/80">
                Candidate will type a whole integer value (e.g. 0, 1, 2, 42) during the exam.
              </p>
            </div>
          )}

          {form.question_type === 'numerical' && (
            <div className="grid grid-cols-2 gap-3 rounded-xl border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-950/20 p-4">
              <div>
                <label className="label text-indigo-900 dark:text-indigo-200 font-extrabold">Correct Numerical Value</label>
                <input
                  className="input font-mono text-base font-bold"
                  type="number"
                  step="any"
                  placeholder="e.g. 12.5"
                  required
                  value={form.numeric_answer ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, numeric_answer: e.target.value !== '' ? parseFloat(e.target.value) : '' }))}
                />
              </div>
              <div>
                <label className="label text-indigo-900 dark:text-indigo-200 font-extrabold">Tolerance (±)</label>
                <input
                  className="input font-mono text-base font-bold"
                  type="number"
                  step="any"
                  min={0}
                  value={form.numerical_tolerance ?? 0.01}
                  onChange={(e) => setForm((f) => ({ ...f, numerical_tolerance: parseFloat(e.target.value) || 0 }))}
                />
              </div>
            </div>
          )}

          <QuestionImageUploader
            value={form.image_url || ''}
            onChange={(url) => setForm((f) => ({ ...f, image_url: url }))}
          />

          <div>
            <label className="label">Detailed Solution Explanation (optional)</label>
            <textarea rows={3} className="input" placeholder="Explain the step-by-step solution..." value={form.solution || ''} onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value }))} />
          </div>

          <QuestionImageUploader
            label="Solution Diagram / Step-by-Step Image (Optional)"
            value={form.solution_image_url || ''}
            onChange={(url) => setForm((f) => ({ ...f, solution_image_url: url }))}
          />

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 mt-4">
            <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? <Spinner className="h-4 w-4" /> : 'Save Question'}</button>
          </div>
        </form>
      </Modal>

      <Modal open={csvOpen} onClose={() => setCsvOpen(false)} title="Bulk CSV import to question bank" size="lg">
        <p className="mb-3 text-sm text-muted">
          Columns: category, question_text, question_type, marks, options, correct_index, correct_indices, solution, subject_id, chapter_id, difficulty, image_url.
          If CSV has no category column, questions go to <strong>{category}</strong>.
        </p>
        <div className="mb-3 flex flex-wrap gap-2">
          <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={handleFile} />
          <button type="button" className="btn-secondary text-xs" onClick={() => fileRef.current?.click()}>Choose CSV file</button>
          <button type="button" className="btn-secondary text-xs" onClick={() => setCsvText(BANK_CSV_TEMPLATE)}>Load template</button>
        </div>
        <textarea className="input font-mono text-xs" rows={12} value={csvText} onChange={(e) => setCsvText(e.target.value)} />
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" className="btn-secondary" onClick={() => setCsvOpen(false)}>Cancel</button>
          <button type="button" className="btn-primary" onClick={uploadCsv} disabled={uploading}>
            {uploading ? <Spinner className="h-4 w-4" /> : 'Import to bank'}
          </button>
        </div>
      </Modal>

      {/* Upload PDF Modal */}
      <Modal
        open={pdfOpen}
        onClose={() => !pdfUploading && setPdfOpen(false)}
        title="Upload Questions & Answers from PDF"
        size="lg"
      >
        {pdfSuccessData ? (
          <div className="space-y-5 p-2 text-center">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                Import Successful!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Successfully extracted and added <strong className="text-emerald-600 dark:text-emerald-400">{pdfSuccessData.created}</strong> question(s) with options, answers, and solutions into the Question Bank.
              </p>
            </div>

            {pdfSuccessData.categories?.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-left">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                  Subjects Updated:
                </span>
                <div className="flex flex-wrap gap-2">
                  {pdfSuccessData.categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setCategory(cat);
                        setPdfOpen(false);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{cat}</span>
                      <span className="text-[10px] bg-blue-600 text-white rounded-full px-1.5 py-0.2">View</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={openPdfModal}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer text-xs"
              >
                Upload Another PDF
              </button>
              <button
                type="button"
                onClick={() => {
                  if (pdfSuccessData.categories?.[0] && !categoriesList.includes(category)) {
                    setCategory(pdfSuccessData.categories[0]);
                  }
                  setPdfOpen(false);
                }}
                className="px-6 py-2.5 rounded-xl font-extrabold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition cursor-pointer text-xs"
              >
                Done & View Questions
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={uploadPdf} className="space-y-4">
            <div className="p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/40 flex items-start gap-3">
              <div className="h-8 w-8 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-indigo-950 dark:text-indigo-200">
                  AI-Powered Multi-Subject PDF Question & Solution Extractor
                </p>
                <p className="text-indigo-800/80 dark:text-indigo-300/80 mt-0.5 leading-relaxed">
                  Upload question papers (NEET, JEE, CBSE, etc.). Questions, options, diagrams, formulas, answer keys, and step-by-step solutions are automatically extracted and organized by subject.
                </p>
              </div>
            </div>

            {/* Target Subject Selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Target Subject / Category
                </label>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Auto-detect separates questions into Physics, Chemistry, Biology, etc.
                </span>
              </div>
              <CustomSelectDropdown
                value={pdfCategory}
                options={[
                  { value: 'auto', label: '✨ Auto-Detect by Subject (Multi-Subject paper)' },
                  ...categoriesList.map((c) => ({ value: c, label: `${c}` })),
                ]}
                onChange={(val) => setPdfCategory(val)}
                disabled={pdfUploading}
              />
            </div>

            {/* Question Paper PDF */}
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                Question Paper PDF <span className="text-rose-500">*</span>
              </label>

              <input
                ref={pdfInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                disabled={pdfUploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setPdfFile(f);
                  e.target.value = '';
                }}
              />

              {pdfFile ? (
                <div className="flex items-center justify-between p-3 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                        {pdfFile.name}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                        {formatBytes(pdfFile.size)} • Ready for AI extraction
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={pdfUploading}
                    onClick={() => setPdfFile(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                    title="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => !pdfUploading && pdfInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl p-6 text-center cursor-pointer transition bg-slate-50/50 dark:bg-slate-900/30 group"
                >
                  <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    <UploadCloud className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                    Click to choose or drag & drop Question Paper PDF
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Accepts NEET, JEE, or any exam PDF with questions & answers (up to 100MB)
                  </p>
                </div>
              )}
            </div>

            {/* Answer Key / Solutions PDF (Optional) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Separate Answer Key / Detailed Solutions PDF <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
              </div>

              <input
                ref={answerKeyInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                disabled={pdfUploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setAnswerKeyFile(f);
                  e.target.value = '';
                }}
              />

              {answerKeyFile ? (
                <div className="flex items-center justify-between p-3 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                        {answerKeyFile.name}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                        {formatBytes(answerKeyFile.size)} • Answer Key & Solutions
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={pdfUploading}
                    onClick={() => setAnswerKeyFile(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                    title="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={pdfUploading}
                  onClick={() => answerKeyInputRef.current?.click()}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <FileUp className="h-3.5 w-3.5 text-slate-500" />
                  <span>+ Attach Separate Answer Key or Solutions PDF</span>
                </button>
              )}
            </div>

            {/* Settings Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Default Marks
                </label>
                <input
                  type="number"
                  min={1}
                  disabled={pdfUploading}
                  className="input text-xs"
                  value={pdfMarks}
                  onChange={(e) => setPdfMarks(Number(e.target.value) || 4)}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Default Difficulty
                </label>
                <CustomSelectDropdown
                  value={pdfDifficulty}
                  disabled={pdfUploading}
                  options={[
                    { value: 'easy', label: 'Easy' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'hard', label: 'Hard' },
                  ]}
                  onChange={(val) => setPdfDifficulty(val)}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Page Range <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1-20, 116 (all if blank)"
                  disabled={pdfUploading}
                  className="input text-xs"
                  value={pdfPageRange}
                  onChange={(e) => setPdfPageRange(e.target.value)}
                />
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Question batch + Answer Key page (e.g. 1-20, 116)
                </p>
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer pb-2.5">
                  <input
                    type="checkbox"
                    checked={pdfIncludeAnswers}
                    disabled={pdfUploading}
                    onChange={(e) => setPdfIncludeAnswers(e.target.checked)}
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Extract Answers
                  </span>
                </label>
              </div>
            </div>

            {pdfFile && pdfFile.size > 20 * 1024 * 1024 && (
              <p className="text-[11px] text-amber-700 dark:text-amber-300 font-medium bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/40">
                💡 <strong>Large Document Tip:</strong> For large multi-page books or booklets (50MB+ / 100+ pages), enter a <strong>Page Range</strong> (such as <code>1-25</code>, <code>26-50</code>) to extract specific chapters quickly and reliably.
              </p>
            )}

            {/* Progress Box */}
            {pdfUploading && (
              <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-2 animate-pulse">
                <div className="flex items-center gap-3">
                  <Spinner className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <p className="text-xs font-extrabold text-indigo-950 dark:text-indigo-200">
                    {pdfProgressStatus || 'Extracting questions with AI Vision...'}
                  </p>
                </div>
                <p className="text-[11px] text-indigo-700/80 dark:text-indigo-300/80 pl-8">
                  Processing pages, formulas, diagrams, and answer keys. For large multi-page exam papers (50MB+), AI extraction may take 2–5 minutes. Please keep this tab open.
                </p>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                className="btn-secondary text-xs"
                onClick={() => setPdfOpen(false)}
                disabled={pdfUploading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-indigo-500/20"
                disabled={pdfUploading || !pdfFile}
              >
                {pdfUploading ? (
                  <>
                    <Spinner className="h-4 w-4" />
                    <span>Extracting...</span>
                  </>
                ) : (
                  <>
                    <FileUp className="h-4 w-4" />
                    <span>Extract & Import Questions</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete Question Confirmation Modal */}
      {deleteQuestionId && (
        <Modal
          open={!!deleteQuestionId}
          onClose={() => !deleting && setDeleteQuestionId(null)}
          title="Delete Question from Bank"
          size="sm"
        >
          {(() => {
            const targetQuestion = questions.find((q) => q.id === deleteQuestionId);
            return (
              <div className="space-y-4 text-center p-2">
                <div className="mx-auto h-12 w-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center justify-center">
                  <Trash2 className="h-6 w-6" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Delete Question</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    Are you sure you want to delete this question from the question bank? This action cannot be undone.
                  </p>
                  {targetQuestion && (
                    <div className="mt-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-left text-xs font-medium text-slate-700 dark:text-slate-300 line-clamp-3">
                      "{targetQuestion.question_text}"
                    </div>
                  )}
                </div>

                <div className="flex justify-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    disabled={deleting}
                    onClick={() => setDeleteQuestionId(null)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={deleting}
                    onClick={confirmDeleteQuestion}
                    className="px-5 py-2.5 rounded-xl font-extrabold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-500/20 transition cursor-pointer text-xs flex items-center gap-2"
                  >
                    {deleting ? <Spinner className="h-4 w-4" /> : null}
                    <span>Delete Question</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </Modal>
      )}

      {/* Delete All Questions Confirmation Modal */}
      {deleteAllModalOpen && (
        <Modal
          open={deleteAllModalOpen}
          onClose={() => !deletingAll && setDeleteAllModalOpen(false)}
          title="Delete Questions from Bank"
          size="md"
        >
          <div className="space-y-5 p-2">
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-rose-900 dark:text-rose-300">Warning: Permanent Deletion</p>
                <p className="text-rose-700 dark:text-rose-400/90 leading-relaxed font-medium">
                  This action permanently removes questions from the repository. Questions already imported into published assessments will remain intact.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Choose Deletion Scope
              </label>

              <div
                onClick={() => setDeleteAllScope('category')}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex items-start gap-3 ${deleteAllScope === 'category'
                  ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
              >
                <input
                  type="radio"
                  name="scope"
                  checked={deleteAllScope === 'category'}
                  onChange={() => setDeleteAllScope('category')}
                  className="mt-0.5 text-rose-600 focus:ring-rose-500 cursor-pointer"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Delete only in "{category}"
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Deletes all {questions.length} questions currently loaded under the {category} category.
                  </p>
                </div>
              </div>

              <div
                onClick={() => setDeleteAllScope('all')}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex items-start gap-3 ${deleteAllScope === 'all'
                  ? 'border-rose-600 bg-rose-500/10'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
              >
                <input
                  type="radio"
                  name="scope"
                  checked={deleteAllScope === 'all'}
                  onChange={() => setDeleteAllScope('all')}
                  className="mt-0.5 text-rose-600 focus:ring-rose-500 cursor-pointer"
                />
                <div>
                  <p className="text-xs font-bold text-rose-600 dark:text-rose-400">
                    Delete ENTIRE Question Bank (All Categories)
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Deletes every question across all categories and subjects in the database.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                disabled={deletingAll}
                onClick={() => setDeleteAllModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deletingAll}
                onClick={confirmDeleteAll}
                className="px-5 py-2.5 rounded-xl font-extrabold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-500/20 transition cursor-pointer text-xs flex items-center gap-2"
              >
                {deletingAll ? <Spinner className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
                <span>
                  {deletingAll
                    ? 'Deleting...'
                    : deleteAllScope === 'all'
                      ? 'Delete Entire Question Bank'
                      : `Delete All in ${category}`}
                </span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Test from Selected Questions Modal */}
      <Modal
        open={createTestModalOpen}
        onClose={() => setCreateTestModalOpen(false)}
        title="Create New Test from Question Bank"
        size="lg"
      >
        <form onSubmit={handleCreateTestSubmit} className="space-y-4">
          <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/30 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-200/60 dark:border-blue-800/60 pb-2.5 mb-2.5">
              <span className="text-xs font-black text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                Selected Question Repository Bundle
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-blue-600 text-white shadow-xs">
                  {selectedQuestionIds.length} Questions
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Total Marks: <strong className="text-blue-600 dark:text-blue-400">{testForm.max_marks || totalSelectedMarks}</strong>
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mr-1">Subject composition:</span>
              {selectedCategoryBreakdown.map(({ cat, count }) => (
                <span key={cat} className="inline-flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  {cat} ({count})
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="label">Test Title / Name <span className="text-rose-500">*</span></label>
              <input
                type="text"
                required
                className="input"
                placeholder="e.g. Botany & Zoology Major NEET Practice Test 1"
                value={testForm.test_name}
                onChange={(e) => setTestForm((prev) => ({ ...prev, test_name: e.target.value }))}
              />
            </div>

            <div>
              <label className="label">Test Type</label>
              <CustomSelectDropdown
                value={testForm.test_type}
                options={[
                  { value: 'AIETS', label: 'AIETS (All India Exam Test Series)' },
                  { value: 'Unit Test', label: 'Unit Test' },
                  { value: 'Part Test', label: 'Part Test' },
                  { value: 'Cumulative Test', label: 'Cumulative Test' },
                  { value: 'Full Syllabus Mock', label: 'Full Syllabus Mock' },
                ]}
                onChange={(val) => setTestForm((prev) => ({ ...prev, test_type: val }))}
              />
            </div>

            <div>
              <label className="label">Exam Date</label>
              <input
                type="date"
                required
                className="input text-xs"
                value={testForm.test_date}
                onChange={(e) => setTestForm((prev) => ({ ...prev, test_date: e.target.value }))}
              />
            </div>

            <div>
              <label className="label">Start Time</label>
              <input
                type="time"
                step="1"
                className="input text-xs"
                value={testForm.start_time}
                onChange={(e) => setTestForm((prev) => ({ ...prev, start_time: e.target.value }))}
              />
            </div>

            <div>
              <label className="label">End Time</label>
              <input
                type="time"
                step="1"
                className="input text-xs"
                value={testForm.end_time}
                onChange={(e) => setTestForm((prev) => ({ ...prev, end_time: e.target.value }))}
              />
            </div>

            <div>
              <label className="label">Duration (Minutes)</label>
              <input
                type="number"
                min="1"
                className="input text-xs"
                value={testForm.duration_minutes}
                onChange={(e) => setTestForm((prev) => ({ ...prev, duration_minutes: Number(e.target.value) }))}
              />
            </div>

            <div>
              <label className="label">Maximum Marks (Auto-summed)</label>
              <input
                type="number"
                min="1"
                className="input text-xs"
                value={testForm.max_marks}
                onChange={(e) => setTestForm((prev) => ({ ...prev, max_marks: Number(e.target.value) }))}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label">Syllabus / Topics Summary</label>
              <textarea
                rows={2}
                className="input text-xs"
                placeholder="e.g. Sexual Reproduction in Flowering Plants, Plant Physiology..."
                value={testForm.syllabus}
                onChange={(e) => setTestForm((prev) => ({ ...prev, syllabus: e.target.value }))}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-800 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={testForm.is_published}
                  onChange={(e) => setTestForm((prev) => ({ ...prev, is_published: e.target.checked }))}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span>Publish test immediately (available for candidates in portal)</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              className="btn btn-secondary text-xs"
              onClick={() => setCreateTestModalOpen(false)}
              disabled={creatingTest}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-blue-500/20 cursor-pointer"
              disabled={creatingTest}
            >
              {creatingTest ? (
                <>
                  <Spinner className="h-4 w-4 text-white" />
                  <span>Creating Test & Importing Questions...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Create Test & Import {selectedQuestionIds.length} Questions</span>
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Selected Questions to Existing Test Modal */}
      <Modal
        open={addToTestModalOpen}
        onClose={() => setAddToTestModalOpen(false)}
        title="Add Questions to Existing Test"
        size="md"
      >
        <form onSubmit={handleAddToExistingTestSubmit} className="space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Append <strong className="text-blue-600 dark:text-blue-400 font-black">{selectedQuestionIds.length} selected questions</strong> into an active test in your repository. Questions will automatically align to their respective subject sections.
          </p>

          <div>
            <label className="label">Search & Select Target Test</label>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search tests by title or exam..."
                className="input text-xs pl-8"
                value={existingTestSearch}
                onChange={(e) => setExistingTestSearch(e.target.value)}
              />
            </div>

            {loadingExistingTests ? (
              <div className="py-8 text-center"><Spinner className="h-5 w-5 mx-auto text-blue-500" /></div>
            ) : existingTestsList.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No tests available. Create a new test instead.</p>
            ) : (
              <div className="max-h-60 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800/60 p-1">
                {existingTestsList
                  .filter((t) => !existingTestSearch || (t.test_name || t.title || '').toLowerCase().includes(existingTestSearch.toLowerCase()))
                  .map((t) => {
                    const isSelected = selectedExistingTestId === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => setSelectedExistingTestId(t.id)}
                        className={`p-2.5 rounded-lg text-xs cursor-pointer transition flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-blue-600 text-white font-extrabold shadow-sm'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold">{t.test_name || t.title}</p>
                          <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                            {t.test_type} · {t.test_date ? String(t.test_date).slice(0, 10) : 'No date'} · {t.question_count || 0} questions
                          </p>
                        </div>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-white shrink-0" />}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              className="btn btn-secondary text-xs"
              onClick={() => setAddToTestModalOpen(false)}
              disabled={addingToTest}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary text-xs flex items-center gap-1.5"
              disabled={addingToTest || !selectedExistingTestId}
            >
              {addingToTest ? <Spinner className="h-4 w-4 text-white" /> : <BookOpen className="h-4 w-4" />}
              <span>Import into Test</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Test Usage Details Modal */}
      <Modal
        open={Boolean(testsModalQuestion)}
        onClose={() => setTestsModalQuestion(null)}
        title="Question Test Usage & Status"
        size="md"
      >
        {testsModalQuestion && (
          <div className="space-y-4">
            {/* Question Summary Banner */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-blue-700 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-900/40 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800/50">
                  <Hash className="h-3 w-3" />
                  Question #{testsModalQuestion.serialNumber || testsModalQuestion.id}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  testsModalQuestion.status === 'already_chosen'
                    ? 'bg-violet-500/15 border border-violet-500/30 text-violet-700 dark:text-violet-300'
                    : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${testsModalQuestion.status === 'already_chosen' ? 'bg-violet-500' : 'bg-emerald-500'}`}></span>
                  <span>{testsModalQuestion.status === 'already_chosen' ? 'Selected in Test' : 'Available (Unused)'}</span>
                </span>
              </div>
              <div className="text-xs text-slate-800 dark:text-slate-200 font-medium line-clamp-3">
                <MathRenderer text={testsModalQuestion.question_text} />
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] text-slate-500">
                {testsModalQuestion.subject && <span className="font-bold text-slate-600 dark:text-slate-400">Subject: {testsModalQuestion.subject}</span>}
                {testsModalQuestion.chapter && <span>· Chapter: {testsModalQuestion.chapter}</span>}
                {testsModalQuestion.difficulty && <span>· Difficulty: {testsModalQuestion.difficulty}</span>}
              </div>
            </div>

            {/* Test Usage List */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <BookmarkCheck className="h-4 w-4 text-violet-500" />
                  <span>Tests Using This Question ({Array.isArray(testsModalQuestion.used_in_tests) ? testsModalQuestion.used_in_tests.length : 0})</span>
                </h4>
              </div>

              {Array.isArray(testsModalQuestion.used_in_tests) && testsModalQuestion.used_in_tests.length > 0 ? (
                <div className="max-h-56 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800/60 p-1">
                  {testsModalQuestion.used_in_tests.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg text-xs flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-slate-800 dark:text-slate-100 truncate">{t.test_name}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">Test Assessment #{t.assessment_id}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setTestsModalQuestion(null);
                          navigate(`/admin/assessments/${t.assessment_id}`);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800/60 px-2.5 py-1 rounded-lg transition-colors cursor-pointer shrink-0"
                      >
                        <span>Open Test</span>
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-4 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {testsModalQuestion.status === 'already_chosen'
                      ? 'Marked as selected in tests, but no active assessment linkage records were found.'
                      : 'This question is currently fresh and has not been selected in any test yet.'}
                  </p>
                </div>
              )}
            </div>

            {/* Status Quick Toggle & Actions */}
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handleToggleStatus(testsModalQuestion)}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${
                  testsModalQuestion.status === 'already_chosen'
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100'
                    : 'bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 border-violet-300 dark:border-violet-700 hover:bg-violet-100'
                }`}
              >
                <BookmarkCheck className="h-3.5 w-3.5" />
                <span>{testsModalQuestion.status === 'already_chosen' ? 'Mark as Available (Unused)' : 'Mark as Selected in Test'}</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary text-xs"
                onClick={() => setTestsModalQuestion(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* High-Resolution Diagram Preview Lightbox Modal */}
      <Modal
        open={Boolean(previewImageModal)}
        onClose={() => setPreviewImageModal(null)}
        title={previewImageModal?.title || 'Reaction & Structure Diagram Preview'}
        size="lg"
      >
        {previewImageModal && (
          <div className="flex flex-col items-center justify-center p-2 sm:p-4 space-y-4">
            <div className="w-full flex items-center justify-center bg-white dark:bg-slate-950 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-inner overflow-auto max-h-[75vh]">
              <img
                src={previewImageModal.url}
                alt={previewImageModal.title || 'Diagram'}
                className="max-w-full max-h-[68vh] object-contain rounded-lg transition-transform"
                onError={(e) => {
                  if (!e.target.dataset.triedFallback && !previewImageModal.url.startsWith('http')) {
                    e.target.dataset.triedFallback = 'true';
                    e.target.src = `http://127.0.0.1:5000${previewImageModal.url.startsWith('/') ? '' : '/'}${previewImageModal.url}`;
                  }
                }}
              />
            </div>
            <div className="w-full flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
              <span className="font-semibold truncate max-w-md">{previewImageModal.title}</span>
              <div className="flex items-center gap-2">
                <a
                  href={previewImageModal.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary text-xs inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Open Full Size</span>
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewImageModal(null)}
                  className="btn btn-primary text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
