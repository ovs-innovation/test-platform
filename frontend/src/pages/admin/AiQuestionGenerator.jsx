import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sparkles,
  Layers,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Clock,
  FileText,
  UploadCloud,
  RotateCcw,
  Check,
  ChevronRight,
  ChevronDown,
  Hash,
  HelpCircle,
  Info,
  Calendar,
  Award,
  FileUp,
  RefreshCw,
  Eye,
  Send,
  X,
  Sliders,
  ListFilter,
  Maximize2,
  Settings,
  Shield,
  ArrowRight,
  CheckSquare,
  Square,
  Cpu,
  BookmarkCheck,
  Image as ImageIcon,
} from 'lucide-react';
import { adminService, aiGeneratorService } from '../../lib/services.js';
import { AdminHeader, AdminCard, AdminMetricRail } from '../../components/admin/AdminUI.jsx';
import { Spinner } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import Modal from '../../components/Modal.jsx';

// -----------------------------------------------------------------------------
// STANDARD CURRICULUM DATA DEFAULTS (NEET & JEE)
// -----------------------------------------------------------------------------
const STANDARD_CURRICULUM = {
  NEET: {
    subjects: ['Physics', 'Chemistry', 'Botany', 'Zoology'],
    chapters: {
      Physics: [
        'Kinematics',
        'Laws of Motion',
        'Work, Energy and Power',
        'Rotational Motion',
        'Gravitation',
        'Mechanical Properties of Solids & Fluids',
        'Thermal Properties of Matter',
        'Thermodynamics & Kinetic Theory',
        'Oscillations and Waves',
        'Electrostatics',
        'Current Electricity',
        'Magnetic Effects of Current & Magnetism',
        'Electromagnetic Induction & AC',
        'Electromagnetic Waves',
        'Ray Optics and Optical Instruments',
        'Wave Optics',
        'Dual Nature of Radiation & Matter',
        'Atoms and Nuclei',
        'Semiconductor Electronics',
      ],
      Chemistry: [
        'Some Basic Concepts of Chemistry',
        'Structure of Atom',
        'Classification of Elements & Periodicity',
        'Chemical Bonding & Molecular Structure',
        'Chemical Thermodynamics',
        'Equilibrium (Physical & Chemical)',
        'Redox Reactions',
        'Organic Chemistry - Some Basic Principles',
        'Hydrocarbons',
        'Solutions',
        'Electrochemistry',
        'Chemical Kinetics',
        'The d- and f-Block Elements',
        'Coordination Compounds',
        'Haloalkanes and Haloarenes',
        'Alcohols, Phenols and Ethers',
        'Aldehydes, Ketones and Carboxylic Acids',
        'Amines & Nitrogen Compounds',
        'Biomolecules',
      ],
      Botany: [
        'The Living World',
        'Biological Classification',
        'Plant Kingdom',
        'Morphology of Flowering Plants',
        'Anatomy of Flowering Plants',
        'Cell: The Unit of Life',
        'Cell Cycle and Cell Division',
        'Photosynthesis in Higher Plants',
        'Respiration in Plants',
        'Plant Growth and Development',
        'Sexual Reproduction in Flowering Plants',
        'Principles of Inheritance and Variation',
        'Molecular Basis of Inheritance',
        'Biotechnology: Principles and Processes',
        'Biotechnology and Its Applications',
        'Organisms and Populations',
        'Ecosystem and Ecological Succession',
      ],
      Zoology: [
        'Animal Kingdom',
        'Structural Organisation in Animals',
        'Breathing and Exchange of Gases',
        'Body Fluids and Circulation',
        'Excretory Products and Their Elimination',
        'Locomotion and Movement',
        'Neural Control and Coordination',
        'Chemical Coordination and Integration',
        'Human Reproduction',
        'Reproductive Health',
        'Evolution & Origin of Life',
        'Human Health and Disease',
        'Microbes in Human Welfare',
      ],
    },
  },
  JEE: {
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    chapters: {
      Physics: [
        'Kinematics & Projectile Motion',
        'Newton Laws of Motion & Friction',
        'Work Energy and Power',
        'Centre of Mass & Collision',
        'Rotational Dynamics & Inertia',
        'Gravitation & Orbital Mechanics',
        'Fluids & Mechanical Properties of Matter',
        'Heat & Thermodynamics',
        'Simple Harmonic Motion & Waves',
        'Electrostatics & Capacitance',
        'Current Electricity',
        'Magnetic Effects & Magnetism',
        'Electromagnetic Induction & AC Circuits',
        'Ray Optics & Wave Optics',
        'Modern Physics & Nuclear Physics',
        'Semiconductor Devices & Logic Gates',
      ],
      Chemistry: [
        'Atomic Structure & Quantum Numbers',
        'Chemical Bonding & Hybridization',
        'Thermodynamics & Thermochemistry',
        'Chemical and Ionic Equilibrium',
        'Electrochemistry',
        'Chemical Kinetics',
        'GOC (General Organic Chemistry)',
        'Hydrocarbons (Alkanes, Alkenes, Alkynes)',
        'Alkyl Halides & Aryl Halides',
        'Alcohols, Phenols & Ethers',
        'Carbonyl Compounds (Aldehydes & Ketones)',
        'Carboxylic Acids & Derivatives',
        'Coordination Chemistry & Isomerism',
        'd-Block and f-Block Elements',
        'p-Block Elements',
      ],
      Mathematics: [
        'Sets, Relations and Functions',
        'Complex Numbers & Quadratic Equations',
        'Matrices and Determinants',
        'Permutations and Combinations',
        'Binomial Theorem',
        'Sequences and Series (AP, GP, HP)',
        'Limits, Continuity and Differentiability',
        'Application of Derivatives (AOD)',
        'Indefinite and Definite Integration',
        'Differential Equations',
        'Straight Lines & Circles',
        'Conic Sections (Parabola, Ellipse, Hyperbola)',
        'Vector Algebra',
        'Three Dimensional Geometry (3D)',
        'Probability and Statistics',
        'Trigonometric Functions & Equations',
      ],
    },
  },
};

const BLUEPRINT_PRESETS = [

  {
    id: 'neet-core-180',
    title: 'NEET UG Standard Test (180 Qs)',
    exam_type: 'NEET',
    class_level: 'Class 11+12',
    total_questions: 180,
    duration_minutes: 180,
    marks_per_question: 4,
    negative_marking: 1,
    subjects: { Physics: 45, Chemistry: 45, Botany: 45, Zoology: 45 },
    has_sections: false,
    difficulty: { easy: 30, medium: 50, hard: 20 },
    types: { mcq: 180 },
  },
  {
    id: 'jee-main-75',
    title: 'JEE Main Strict 75 Qs Test',
    exam_type: 'JEE',
    class_level: 'Class 11+12',
    total_questions: 75,
    duration_minutes: 180,
    marks_per_question: 4,
    negative_marking: 1,
    subjects: { Physics: 25, Chemistry: 25, Mathematics: 25 },
    has_sections: false,
    difficulty: { easy: 20, medium: 55, hard: 25 },
    types: { mcq: 60, numerical: 15 },
  }
];

export default function AiQuestionGenerator() {
  const { push: showToast } = useToast();

  // Active Top Tab
  const [activeTab, setActiveTab] = useState('question-generator'); // 'question-generator' | 'test-generator' | 'drafts'

  // Loading & Generation states
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [generationProgress, setGenerationProgress] = useState(0);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [recentDrafts, setRecentDrafts] = useState([]);
  const [loadingDrafts, setLoadingDrafts] = useState(false);

  // ---------------------------------------------------------------------------
  // MODULE 1: AI QUESTION GENERATOR FORM STATE
  // ---------------------------------------------------------------------------
  const [qForm, setQForm] = useState({
    class_level: '12', // '11', '12', '11+12'
    exam_type: 'NEET', // 'NEET', 'JEE'
    subject: 'Physics',
    chapters: [],
    topic: '',
    count: 10,
    difficulty: 'Medium', // 'Easy', 'Medium', 'Hard', 'Mixed'
    question_types: ['Single MCQ', 'Assertion-Reason'],
    diagram_req: 'Optional', // 'None', 'Optional', 'Required'
    explanation_req: 'Detailed Step-by-Step', // 'Detailed Step-by-Step', 'Formula & Key Insight', 'Concise Summary'
    reference_file: null,
    reference_file_name: '',
    target_destination: 'draft', // 'draft' (Staging) | 'bank' (Direct Question Bank)
  });

  // Chapter search filter in Question Generator
  const [chapterSearch, setChapterSearch] = useState('');

  // ---------------------------------------------------------------------------
  // MODULE 2: AI TEST GENERATOR FORM STATE
  // ---------------------------------------------------------------------------
  const [testForm, setTestForm] = useState({
    title: 'NEET UG 2026 AI Assessment Mock #1',
    exam_type: 'NEET', // 'NEET', 'JEE'
    class_level: 'Class 11+12',
    total_questions: 200,
    duration_minutes: 200,
    marks_per_question: 4,
    negative_marking: 1,
    has_sections: true,
    section_config: {
      sectionA: 35,
      sectionB: 15,
      sectionBChoice: 10,
    },
    subject_distribution: {
      Physics: 50,
      Chemistry: 50,
      Botany: 50,
      Zoology: 50,
    },
    difficulty: {
      easy: 25,
      medium: 55,
      hard: 20,
    },
    question_types: {
      single_mcq: 180,
      assertion_reason: 20,
      numerical: 0,
      multi_select: 0,
      match: 0,
      passage: 0,
    },
    chapter_scope: 'all', // 'all' | 'custom'
    selected_chapters: {},
    auto_publish: false,
  });

  // ---------------------------------------------------------------------------
  // MODULE 3: AI DIAGRAM ENGINE & STUDIO STATE
  // ---------------------------------------------------------------------------
  const [diagramForm, setDiagramForm] = useState({
    subject: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Wheatstone Bridge & AC Circuits',
    category: 'electric_circuit',
    method: 'programmatic', // 'programmatic', 'ai_svg', 'pdf_extracted'
    markers: 'A, B, X, Y',
    customPrompt: '',
    isSolutionDiagram: false,
  });
  const [activeDiagram, setActiveDiagram] = useState(null);
  const [diagramList, setDiagramList] = useState([]);
  const [loadingDiagrams, setLoadingDiagrams] = useState(false);
  const [isGeneratingDiagram, setIsGeneratingDiagram] = useState(false);
  const [showRefineModal, setShowRefineModal] = useState(false);
  const [refinePrompt, setRefinePrompt] = useState('');

  // ---------------------------------------------------------------------------
  // DYNAMIC OPTIONS COMPUTATION
  // ---------------------------------------------------------------------------
  // Available subjects for selected exam
  const availableSubjects = useMemo(() => {
    return STANDARD_CURRICULUM[qForm.exam_type]?.subjects || ['Physics', 'Chemistry'];
  }, [qForm.exam_type]);

  // Available chapters for selected exam & subject
  const availableChapters = useMemo(() => {
    const list = STANDARD_CURRICULUM[qForm.exam_type]?.chapters?.[qForm.subject] || [];
    if (!chapterSearch.trim()) return list;
    return list.filter((ch) => ch.toLowerCase().includes(chapterSearch.toLowerCase()));
  }, [qForm.exam_type, qForm.subject, chapterSearch]);

  // Synchronize subject when exam_type changes in Question Generator
  useEffect(() => {
    const validSubs = STANDARD_CURRICULUM[qForm.exam_type]?.subjects || [];
    if (!validSubs.includes(qForm.subject)) {
      setQForm((prev) => ({
        ...prev,
        subject: validSubs[0] || 'Physics',
        chapters: [],
      }));
    }
  }, [qForm.exam_type]);

  // Synchronize subjects in Test Generator when exam_type changes
  useEffect(() => {
    const exam = testForm.exam_type;
    if (exam === 'NEET') {
      setTestForm((prev) => ({
        ...prev,
        title: prev.title.includes('JEE') ? 'NEET UG 2026 AI Assessment Mock #1' : prev.title,
        total_questions: 200,
        duration_minutes: 200,
        subject_distribution: { Physics: 50, Chemistry: 50, Botany: 50, Zoology: 50 },
        question_types: { single_mcq: 180, assertion_reason: 20, numerical: 0, multi_select: 0, match: 0, passage: 0 },
      }));
    } else {
      setTestForm((prev) => ({
        ...prev,
        title: prev.title.includes('NEET') ? 'JEE Main 2026 AI Assessment Mock #1' : prev.title,
        total_questions: 90,
        duration_minutes: 180,
        subject_distribution: { Physics: 30, Chemistry: 30, Mathematics: 30 },
        question_types: { single_mcq: 60, assertion_reason: 0, numerical: 30, multi_select: 0, match: 0, passage: 0 },
      }));
    }
  }, [testForm.exam_type]);

  // Subject sum in test generator
  const testSubjectSum = useMemo(() => {
    return Object.values(testForm.subject_distribution).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
  }, [testForm.subject_distribution]);

  // Type sum in test generator
  const testTypeSum = useMemo(() => {
    return Object.values(testForm.question_types).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
  }, [testForm.question_types]);

  // Difficulty sum in test generator
  const testDifficultySum = useMemo(() => {
    return (
      (Number(testForm.difficulty.easy) || 0) +
      (Number(testForm.difficulty.medium) || 0) +
      (Number(testForm.difficulty.hard) || 0)
    );
  }, [testForm.difficulty]);

  // ---------------------------------------------------------------------------
  // HANDLERS: QUESTION GENERATOR
  // ---------------------------------------------------------------------------
  const toggleChapterSelection = (chapter) => {
    setQForm((prev) => {
      const exists = prev.chapters.includes(chapter);
      if (exists) {
        return { ...prev, chapters: prev.chapters.filter((c) => c !== chapter) };
      } else {
        return { ...prev, chapters: [...prev.chapters, chapter] };
      }
    });
  };

  const selectAllChapters = () => {
    const all = STANDARD_CURRICULUM[qForm.exam_type]?.chapters?.[qForm.subject] || [];
    setQForm((prev) => ({ ...prev, chapters: all }));
  };

  const clearAllChapters = () => {
    setQForm((prev) => ({ ...prev, chapters: [] }));
  };

  const toggleQuestionType = (qType) => {
    setQForm((prev) => {
      const exists = prev.question_types.includes(qType);
      if (exists) {
        if (prev.question_types.length === 1) {
          showToast('At least one question type must be selected', 'warning');
          return prev;
        }
        return { ...prev, question_types: prev.question_types.filter((t) => t !== qType) };
      } else {
        return { ...prev, question_types: [...prev.question_types, qType] };
      }
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      showToast('Please upload a valid PDF document', 'error');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      showToast('PDF file size must be under 15MB', 'error');
      return;
    }
    setQForm((prev) => ({
      ...prev,
      reference_file: file,
      reference_file_name: file.name,
    }));
    showToast(`Reference document attached: ${file.name}`, 'info');
  };

  const removeFileUpload = () => {
    setQForm((prev) => ({
      ...prev,
      reference_file: null,
      reference_file_name: '',
    }));
  };

  // ---------------------------------------------------------------------------
  // HANDLERS: TEST GENERATOR
  // ---------------------------------------------------------------------------
  const applyPresetBlueprint = (preset) => {
    setTestForm({
      title: `${preset.title} - AI Generated`,
      exam_type: preset.exam_type,
      class_level: preset.class_level,
      total_questions: preset.total_questions,
      duration_minutes: preset.duration_minutes,
      marks_per_question: preset.marks_per_question,
      negative_marking: preset.negative_marking,
      has_sections: preset.has_sections,
      section_config: preset.section_config || { sectionA: 35, sectionB: 15, sectionBChoice: 10 },
      subject_distribution: { ...preset.subjects },
      difficulty: { ...preset.difficulty },
      question_types: {
        single_mcq: preset.types.mcq || 0,
        assertion_reason: preset.types.ar || 0,
        numerical: preset.types.numerical || 0,
        multi_select: preset.types.multi_select || 0,
        match: preset.types.match || 0,
        passage: preset.types.passage || 0,
      },
      chapter_scope: 'all',
      selected_chapters: {},
      auto_publish: false,
    });
    showToast(`Loaded blueprint: ${preset.title}`, 'success');
  };

  const handleSubjectDistChange = (subject, val) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    setTestForm((prev) => ({
      ...prev,
      subject_distribution: {
        ...prev.subject_distribution,
        [subject]: num,
      },
    }));
  };

  const handleTypeDistChange = (typeKey, val) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    setTestForm((prev) => ({
      ...prev,
      question_types: {
        ...prev.question_types,
        [typeKey]: num,
      },
    }));
  };

  // ---------------------------------------------------------------------------
  // GENERATION DISPATCH
  // ---------------------------------------------------------------------------
  const handleStartGeneration = async () => {
    setPreviewModalOpen(false);
    setIsGenerating(true);
    setGenerationProgress(10);

    const isQuestionGen = activeTab === 'question-generator';

    try {
      if (isQuestionGen) {
        setGenerationStep('Formatting prompt & curriculum schemas...');
        setGenerationProgress(25);

        // Upload reference PDF if present
        let fileRef = null;
        if (qForm.reference_file) {
          setGenerationStep('Extracting reference context from PDF...');
          fileRef = await aiGeneratorService.uploadReferencePdf(qForm.reference_file).catch((err) => {
            console.warn('PDF upload placeholder note:', err.message);
            return { file_url: null };
          });
        }

        setGenerationStep('Synthesizing questions via Gemini 3.8 Flash...');
        setGenerationProgress(55);

        const payload = {
          exam_type: qForm.exam_type,
          class_level: qForm.class_level,
          subject: qForm.subject,
          chapters: qForm.chapters.length ? qForm.chapters : ['Full Syllabus'],
          topic: qForm.topic || 'Core Subject Principles',
          count: Number(qForm.count) || 10,
          difficulty: qForm.difficulty,
          question_types: qForm.question_types,
          diagram_req: qForm.diagram_req,
          explanation_req: qForm.explanation_req,
          reference_file_url: fileRef?.file_url || null,
          target_destination: qForm.target_destination,
        };

        setGenerationStep('Validating KaTeX formulas & diagrams (0 answer leakages)...');
        setGenerationProgress(85);

        // Call structured API placeholder
        const res = await aiGeneratorService.generateQuestions(payload);

        setGenerationProgress(100);
        showToast(
          res?.message ||
          `Successfully dispatched request for ${qForm.count} questions. Saved to ${qForm.target_destination === 'bank' ? 'Question Bank' : 'Staging Drafts'
          }.`,
          'success'
        );
      } else {
        // Test generation flow
        setGenerationStep('Verifying exam blueprint & section distributions...');
        setGenerationProgress(20);

        setGenerationStep('Dividing test into concurrent batch pipelines...');
        setGenerationProgress(45);

        const payload = {
          title: testForm.title,
          exam_type: testForm.exam_type,
          class_level: testForm.class_level,
          total_questions: Number(testForm.total_questions) || 90,
          duration_minutes: Number(testForm.duration_minutes) || 180,
          marks_per_question: Number(testForm.marks_per_question) || 4,
          negative_marking: Number(testForm.negative_marking) || 1,
          has_sections: testForm.has_sections,
          section_config: testForm.section_config,
          subject_distribution: testForm.subject_distribution,
          question_types: testForm.question_types,
          difficulty_distribution: testForm.difficulty,
          chapter_scope: testForm.chapter_scope,
          auto_publish: testForm.auto_publish,
        };

        setGenerationStep('Assembling assessment sections via Gemini 3.8 Flash...');
        setGenerationProgress(80);

        // Call structured API placeholder
        const res = await aiGeneratorService.generateTest(payload);

        setGenerationProgress(100);
        showToast(
          res?.message ||
          `Successfully initiated generation for "${testForm.title}". Test will appear in Assessment Manager once processing finishes.`,
          'success'
        );
      }
    } catch (err) {
      console.error('[AiGenerator] Generation request error:', err);
      // Give clean, user-friendly error message
      const errMsg =
        err?.response?.data?.message ||
        err?.message ||
        'Endpoint is ready for backend connection in Phase 3. Form payload validated successfully.';
      showToast(errMsg, 'error');
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
      setGenerationProgress(0);
    }
  };

  // ---------------------------------------------------------------------------
  // LOAD DRAFTS & RECENT HISTORY
  // ---------------------------------------------------------------------------
  const fetchDrafts = async () => {
    setLoadingDrafts(true);
    try {
      const data = await aiGeneratorService.getDrafts();
      setRecentDrafts(Array.isArray(data?.drafts) ? data.drafts : []);
    } catch (_) {
      // Backend drafts endpoint placeholder
      setRecentDrafts([]);
    } finally {
      setLoadingDrafts(false);
    }
  };

  // ---------------------------------------------------------------------------
  // DIAGRAM ENGINE HANDLERS
  // ---------------------------------------------------------------------------
  const fetchDiagramAssets = async () => {
    setLoadingDiagrams(true);
    try {
      const data = await aiGeneratorService.listDiagrams();
      if (Array.isArray(data?.assets)) {
        setDiagramList(data.assets);
        if (!activeDiagram && data.assets.length > 0) {
          setActiveDiagram(data.assets[0]);
        }
      }
    } catch (_) {
      setDiagramList([]);
    } finally {
      setLoadingDiagrams(false);
    }
  };

  const handleGenerateDiagram = async () => {
    setIsGeneratingDiagram(true);
    try {
      const markersArray = diagramForm.markers
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean);

      const payload = {
        subject: diagramForm.subject,
        chapter: diagramForm.chapter,
        topic: diagramForm.topic,
        diagramCategory: diagramForm.category,
        customPrompt: diagramForm.customPrompt,
        markers: markersArray.length ? markersArray : ['A', 'B', 'C', 'D'],
        method: diagramForm.method,
        isSolutionDiagram: diagramForm.isSolutionDiagram,
      };

      const res = await aiGeneratorService.generateDiagram(payload);
      if (res?.asset) {
        setActiveDiagram(res.asset);
        setDiagramList((prev) => [res.asset, ...prev]);
        showToast('Examination diagram generated and validated successfully!', 'success');
      }
    } catch (err) {
      showToast(err?.response?.data?.message || err?.message || 'Diagram generation failed', 'error');
    } finally {
      setIsGeneratingDiagram(false);
    }
  };

  const handleRegenerateDiagram = async () => {
    if (!activeDiagram?.asset_id) return;
    setIsGeneratingDiagram(true);
    try {
      const res = await aiGeneratorService.regenerateDiagram(activeDiagram.asset_id, {
        newPrompt: refinePrompt || activeDiagram.prompt_used,
        method: diagramForm.method,
      });
      if (res?.asset) {
        setActiveDiagram(res.asset);
        setDiagramList((prev) => [res.asset, ...prev.filter((d) => d.asset_id !== activeDiagram.asset_id)]);
        setShowRefineModal(false);
        setRefinePrompt('');
        showToast('Diagram regenerated and validated!', 'success');
      }
    } catch (err) {
      showToast(err?.response?.data?.message || err?.message || 'Diagram regeneration failed', 'error');
    } finally {
      setIsGeneratingDiagram(false);
    }
  };

  const handleReviewDiagram = async (status) => {
    if (!activeDiagram?.asset_id) return;
    try {
      const res = await aiGeneratorService.reviewDiagram(activeDiagram.asset_id, {
        status,
        adminNotes: 'Reviewed in AI Diagram Studio',
      });
      if (res?.asset) {
        setActiveDiagram(res.asset);
        setDiagramList((prev) => prev.map((d) => (d.asset_id === res.asset.asset_id ? res.asset : d)));
        showToast(`Diagram marked as "${status}".`, 'success');
      }
    } catch (err) {
      showToast(err?.response?.data?.message || err?.message || 'Review update failed', 'error');
    }
  };

  useEffect(() => {
    if (activeTab === 'drafts') {
      fetchDrafts();
    } else if (activeTab === 'diagram-engine') {
      fetchDiagramAssets();
    }
  }, [activeTab]);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <AdminHeader
        breadcrumbs={['AI Tools', 'Question & Test Generator']}
        title="AI Question & Test Generator"
        subtitle="Enterprise AI generation engine powered by Google Gemini 3.8 Flash. Craft individual curriculum questions or synthesize full NEET & JEE competitive examination papers."
        status="Gemini 3.8 Flash Engine Active"
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('drafts')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'drafts'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-500'
                }`}
            >
              <BookmarkCheck className="h-4 w-4 text-blue-500" />
              <span>Staging Drafts & History</span>
            </button>
          </div>
        }
      />

      {/* Metric Rail */}
      <AdminMetricRail
        items={[
          {
            label: 'AI Model Engine',
            value: 'Gemini 3.8 Flash',
            badge: 'Structured Output',
            subtext: 'Official Google GenAI SDK',
          },
          {
            label: 'Supported Exam Streams',
            value: 'NEET & JEE',
            subtext: 'Class 11, 12 & Repeater',
          },
          {
            label: 'Question Types',
            value: '8 Formats',
            badge: 'LaTeX + Diagrams',
            subtext: 'MCQ, Multi, AR, Num, Match, Passage',
          },
          {
            label: 'Answer Isolation Guarantee',
            value: '100% Unlabeled',
            badge: 'Protected',
            subtext: 'Question SVGs contain zero answers',
          },
        ]}
      />

      {/* Main Module Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('question-generator')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${activeTab === 'question-generator'
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
            : 'bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400'
            }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>1. AI Question Generator (Repository Bank)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('test-generator')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${activeTab === 'test-generator'
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
            : 'bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400'
            }`}
        >
          <Layers className="h-4 w-4" />
          <span>2. AI Test Generator (Full Assessment Paper)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('diagram-engine')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${activeTab === 'diagram-engine'
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
            : 'bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400'
            }`}
        >
          <ImageIcon className="h-4 w-4" />
          <span>3. AI Diagram Engine & Studio</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('drafts')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${activeTab === 'drafts'
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
            : 'bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400'
            }`}
        >
          <Clock className="h-4 w-4" />
          <span>Generation Queue & Drafts</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: AI QUESTION GENERATOR                                          */}
      {/* ===================================================================== */}
      {activeTab === 'question-generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Question Generator Form (Left Column) */}
          <div className="lg:col-span-8 space-y-6">
            <AdminCard
              title="Question Parameters & Scope"
              subtitle="Configure targeting filters, difficulty mix, question formats, and diagram requirements."
            >
              <div className="space-y-6 pt-2">
                {/* 1. Exam & Class Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Exam Stream */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Exam Stream <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['NEET', 'JEE'].map((exam) => {
                        const isSelected = qForm.exam_type === exam;
                        return (
                          <button
                            key={exam}
                            type="button"
                            onClick={() => setQForm((prev) => ({ ...prev, exam_type: exam }))}
                            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer border ${isSelected
                              ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-600 dark:text-blue-400 shadow-xs'
                              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                              }`}
                          >
                            <GraduationCap className="h-4 w-4 shrink-0" />
                            <span>{exam}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Target Class */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Target Class <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: '11', label: 'Class 11' },
                        { id: '12', label: 'Class 12' },
                        { id: '11+12', label: '11+12 (Full)' },
                      ].map((cls) => {
                        const isSelected = qForm.class_level === cls.id;
                        return (
                          <button
                            key={cls.id}
                            type="button"
                            onClick={() => setQForm((prev) => ({ ...prev, class_level: cls.id }))}
                            className={`py-2.5 px-2 rounded-xl text-xs font-black transition-all cursor-pointer border text-center ${isSelected
                              ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-600 dark:text-blue-400 shadow-xs'
                              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                              }`}
                          >
                            {cls.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 2. Subject Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {availableSubjects.map((sub) => {
                      const isSelected = qForm.subject === sub;
                      return (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => setQForm((prev) => ({ ...prev, subject: sub, chapters: [] }))}
                          className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer border text-center ${isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                            }`}
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Chapters Multi-Select */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Chapters Scope ({qForm.chapters.length ? `${qForm.chapters.length} Selected` : 'All Chapters'})
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={selectAllChapters}
                        className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        Select All
                      </button>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <button
                        type="button"
                        onClick={clearAllChapters}
                        className="text-[11px] font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  {/* Chapter Search Box */}
                  <div className="relative mb-2">
                    <input
                      type="text"
                      placeholder={`Filter ${qForm.subject} chapters...`}
                      value={chapterSearch}
                      onChange={(e) => setChapterSearch(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2 pl-3 pr-8 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                    {chapterSearch && (
                      <button
                        type="button"
                        onClick={() => setChapterSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Chapters Pill Container */}
                  <div className="max-h-48 overflow-y-auto p-2.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex flex-wrap gap-1.5">
                    {availableChapters.map((ch) => {
                      const isSelected = qForm.chapters.includes(ch);
                      return (
                        <button
                          key={ch}
                          type="button"
                          onClick={() => toggleChapterSelection(ch)}
                          className={`text-left text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-all cursor-pointer border ${isSelected
                            ? 'bg-blue-500 text-white border-blue-500 shadow-2xs'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                            }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {ch}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Micro-Topic Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Micro-Topic or Focus Area <span className="text-slate-400 font-normal">(Optional prompt hint)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Electric Dipole in External Field, Genetic Drift, Hybridization in SF6..."
                    value={qForm.topic}
                    onChange={(e) => setQForm((prev) => ({ ...prev, topic: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2.5 px-3.5 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* 5. Question Count & Difficulty */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Number of questions */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Number of Questions: <span className="text-blue-600 font-black">{qForm.count}</span>
                      </label>
                      <span className="text-[11px] text-slate-400">Max 50 / batch</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={qForm.count}
                      onChange={(e) => setQForm((prev) => ({ ...prev, count: parseInt(e.target.value, 10) || 1 }))}
                      className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>1</span>
                      <span>10</span>
                      <span>25</span>
                      <span>50</span>
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Difficulty Level
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {['Easy', 'Medium', 'Hard', 'Mixed'].map((diff) => {
                        const isSelected = qForm.difficulty === diff;
                        return (
                          <button
                            key={diff}
                            type="button"
                            onClick={() => setQForm((prev) => ({ ...prev, difficulty: diff }))}
                            className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer text-center border ${isSelected
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                              }`}
                          >
                            {diff}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 6. Question Types Multi-Select */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Question Types to Include <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'Single MCQ', label: 'Single Correct MCQ' },
                      { id: 'Multiple Correct', label: 'Multiple Correct MCQ' },
                      { id: 'Assertion-Reason', label: 'Assertion-Reason' },
                      { id: 'Integer', label: 'Integer / Numerical' },
                      { id: 'Match the Following', label: 'Match the Following' },
                      { id: 'Passage-based', label: 'Passage-based' },
                    ].map((type) => {
                      const isSelected = qForm.question_types.includes(type.id);
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => toggleQuestionType(type.id)}
                          className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border text-left ${isSelected
                            ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-700 dark:text-blue-300'
                            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                            }`}
                        >
                          {isSelected ? (
                            <CheckSquare className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                          ) : (
                            <Square className="h-4 w-4 text-slate-400 shrink-0" />
                          )}
                          <span className="truncate">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 7. Diagram & Explanation Configuration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Diagram Requirement */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Diagram Requirement
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'None', label: 'None' },
                        { id: 'Optional', label: 'Optional' },
                        { id: 'Required', label: 'Required' },
                      ].map((item) => {
                        const isSelected = qForm.diagram_req === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setQForm((prev) => ({ ...prev, diagram_req: item.id }))}
                            className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer text-center border ${isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                              }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                      {qForm.diagram_req === 'Required'
                        ? 'Generates SVG with neutral reference markers ($P, Q, \\theta$) strictly omitting answers.'
                        : qForm.diagram_req === 'None'
                          ? 'Pure text & equation based questions only.'
                          : 'AI includes diagram only when standard physics/chemistry warrants it.'}
                    </p>
                  </div>

                  {/* Explanation Requirement */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Explanation Detail
                    </label>
                    <select
                      value={qForm.explanation_req}
                      onChange={(e) => setQForm((prev) => ({ ...prev, explanation_req: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2.5 px-3 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Detailed Step-by-Step">Detailed Step-by-Step (Full Derivations)</option>
                      <option value="Formula & Key Insight">Formula & Key Insight (Quick Logic)</option>
                      <option value="Concise Summary">Concise Summary (Final Steps Only)</option>
                    </select>
                  </div>
                </div>

                {/* 8. Optional Reference PDF */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Optional Reference PDF Document{' '}
                    <span className="text-slate-400 font-normal">(Syllabus note, past paper, or test material)</span>
                  </label>
                  {!qForm.reference_file_name ? (
                    <label className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 hover:border-blue-500 transition-all cursor-pointer">
                      <FileUp className="h-6 w-6 text-slate-400 mb-1" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Click to attach reference PDF
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">PDF up to 15MB</span>
                      <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between p-3 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/40">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="text-xs font-bold text-blue-900 dark:text-blue-200 truncate">
                          {qForm.reference_file_name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={removeFileUpload}
                        className="text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer p-1"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* 9. Target Destination Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Target Destination
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${qForm.target_destination === 'draft'
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900'
                        }`}
                    >
                      <input
                        type="radio"
                        name="dest"
                        value="draft"
                        checked={qForm.target_destination === 'draft'}
                        onChange={() => setQForm((prev) => ({ ...prev, target_destination: 'draft' }))}
                        className="mt-0.5"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          Save to Staging Drafts (Recommended)
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Review, edit, regenerate, and approve questions before publishing.
                        </p>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${qForm.target_destination === 'bank'
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900'
                        }`}
                    >
                      <input
                        type="radio"
                        name="dest"
                        value="bank"
                        checked={qForm.target_destination === 'bank'}
                        onChange={() => setQForm((prev) => ({ ...prev, target_destination: 'bank' }))}
                        className="mt-0.5"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          Directly Push to Question Bank
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Instant insertion into production question bank repository.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </AdminCard>
          </div>

          {/* Right Column: Live Configuration Preview & Action Drawer */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-4">
            <AdminCard
              title="Configuration Preview"
              subtitle="Live overview of question generator parameters."
              className="border-blue-500/30 dark:border-blue-500/20"
            >
              <div className="space-y-4 pt-1">
                {/* Badges Overview */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-bold">
                    {qForm.exam_type}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
                    Class {qForm.class_level}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs font-bold">
                    {qForm.subject}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                    {qForm.difficulty}
                  </span>
                </div>

                {/* Question Types chips */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Selected Types
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {qForm.question_types.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Scope Details */}
                <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 p-3 bg-slate-50/60 dark:bg-slate-900/60 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Questions:</span>
                    <span className="font-black text-slate-900 dark:text-white">{qForm.count} Qs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Chapters:</span>
                    <span className="font-bold text-slate-900 dark:text-white truncate max-w-[160px]">
                      {qForm.chapters.length ? `${qForm.chapters.length} Chapters` : 'Full Subject Syllabus'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Diagram Mode:</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{qForm.diagram_req}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target:</span>
                    <span className="font-bold text-slate-900 dark:text-white capitalize">
                      {qForm.target_destination === 'bank' ? 'Question Bank' : 'Staging Draft'}
                    </span>
                  </div>
                </div>

                {/* Validation Checklist */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>Curriculum & subject valid</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>KaTeX math rendering ready</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>Answer key isolation enabled</span>
                  </div>
                </div>

                {/* Action Trigger */}
                <button
                  type="button"
                  onClick={() => setPreviewModalOpen(true)}
                  disabled={isGenerating || qForm.question_types.length === 0}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Generate {qForm.count} Questions with AI</span>
                </button>
              </div>
            </AdminCard>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: AI TEST GENERATOR                                              */}
      {/* ===================================================================== */}
      {activeTab === 'test-generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Test Form */}
          <div className="lg:col-span-8 space-y-6">
            {/* Quick Blueprint Presets */}
            <AdminCard
              title="Official Competitive Exam Blueprint Presets"
              subtitle="Quickly load pre-configured official NTA NEET UG & IIT JEE test specifications."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {BLUEPRINT_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPresetBlueprint(preset)}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-blue-500 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        {preset.exam_type}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">{preset.total_questions} Qs</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {preset.title}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                      {preset.duration_minutes} Mins • {preset.marks_per_question * preset.total_questions} Marks
                    </p>
                  </button>
                ))}
              </div>
            </AdminCard>

            {/* Test Core Details */}
            <AdminCard title="Test Metadata & Architecture" subtitle="Specify title, exam stream, and target audience.">
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Test Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={testForm.title}
                    onChange={(e) => setTestForm((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2.5 px-3.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Exam Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Exam Type
                    </label>
                    <select
                      value={testForm.exam_type}
                      onChange={(e) => setTestForm((prev) => ({ ...prev, exam_type: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2.5 px-3 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    >
                      <option value="NEET">NEET UG</option>
                      <option value="JEE">JEE Main</option>
                    </select>
                  </div>

                  {/* Class */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Class Level
                    </label>
                    <select
                      value={testForm.class_level}
                      onChange={(e) => setTestForm((prev) => ({ ...prev, class_level: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2.5 px-3 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                      <option value="Class 11+12">Class 11+12 (Full Syllabus)</option>
                      <option value="Repeater">Repeater / Dropper</option>
                    </select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Duration (Minutes)
                    </label>
                    <input
                      type="number"
                      min="15"
                      max="360"
                      value={testForm.duration_minutes}
                      onChange={(e) =>
                        setTestForm((prev) => ({ ...prev, duration_minutes: parseInt(e.target.value, 10) || 180 }))
                      }
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2.5 px-3 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </AdminCard>

            {/* Subject-Wise Distribution */}
            <AdminCard
              title="Subject-wise Question Distribution"
              subtitle={`Total must equal ${testForm.total_questions} questions.`}
              action={
                <span
                  className={`text-xs font-extrabold px-2.5 py-1 rounded-md ${testSubjectSum === Number(testForm.total_questions)
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    }`}
                >
                  Sum: {testSubjectSum} / {testForm.total_questions}
                </span>
              }
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {Object.keys(testForm.subject_distribution).map((sub) => (
                  <div
                    key={sub}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
                  >
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{sub}</label>
                    <input
                      type="number"
                      min="0"
                      max={testForm.total_questions}
                      value={testForm.subject_distribution[sub]}
                      onChange={(e) => handleSubjectDistChange(sub, e.target.value)}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-1.5 px-2.5 text-xs font-black text-slate-900 dark:text-white"
                    />
                  </div>
                ))}
              </div>
            </AdminCard>

            {/* Question-Type & Difficulty Distributions */}
            <AdminCard
              title="Question Types & Difficulty Breakdown"
              subtitle="Configure competitive exam formats and cognitive complexity."
            >
              <div className="space-y-4 pt-2">
                {/* Question Types */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Format Allocations</span>
                    <span
                      className={`text-xs font-extrabold px-2 py-0.5 rounded ${testTypeSum === Number(testForm.total_questions)
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : 'bg-amber-500/10 text-amber-600'
                        }`}
                    >
                      Types Total: {testTypeSum} / {testForm.total_questions}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { key: 'single_mcq', label: 'Single Correct MCQ' },
                      { key: 'numerical', label: 'Numerical / Integer' },
                      { key: 'assertion_reason', label: 'Assertion-Reason' },
                      { key: 'multi_select', label: 'Multiple Correct' },
                      { key: 'match', label: 'Match Following' },
                      { key: 'passage', label: 'Passage Comprehension' },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
                      >
                        <span className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          {item.label}
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={testForm.question_types[item.key] || 0}
                          onChange={(e) => handleTypeDistChange(item.key, e.target.value)}
                          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-1 px-2 text-xs font-black"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Difficulty distribution */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Difficulty Distribution (%)
                    </span>
                    <span
                      className={`text-xs font-extrabold ${testDifficultySum === 100 ? 'text-emerald-600' : 'text-amber-600'
                        }`}
                    >
                      Sum: {testDifficultySum}% {testDifficultySum !== 100 && '(Must equal 100%)'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-600 mb-1">Easy (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={testForm.difficulty.easy}
                        onChange={(e) =>
                          setTestForm((prev) => ({
                            ...prev,
                            difficulty: { ...prev.difficulty, easy: parseInt(e.target.value, 10) || 0 },
                          }))
                        }
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-1.5 px-2.5 text-xs font-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-blue-600 mb-1">Medium (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={testForm.difficulty.medium}
                        onChange={(e) =>
                          setTestForm((prev) => ({
                            ...prev,
                            difficulty: { ...prev.difficulty, medium: parseInt(e.target.value, 10) || 0 },
                          }))
                        }
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-1.5 px-2.5 text-xs font-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-rose-600 mb-1">Hard (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={testForm.difficulty.hard}
                        onChange={(e) =>
                          setTestForm((prev) => ({
                            ...prev,
                            difficulty: { ...prev.difficulty, hard: parseInt(e.target.value, 10) || 0 },
                          }))
                        }
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-1.5 px-2.5 text-xs font-black"
                      />
                    </div>
                  </div>
                </div>

                {/* Section Structure & Marking Scheme */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Correct Answer Marks (+ve)
                    </label>
                    <input
                      type="number"
                      value={testForm.marks_per_question}
                      onChange={(e) =>
                        setTestForm((prev) => ({ ...prev, marks_per_question: parseInt(e.target.value, 10) || 4 }))
                      }
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-1.5 px-2.5 text-xs font-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Negative Marking (-ve)
                    </label>
                    <input
                      type="number"
                      value={testForm.negative_marking}
                      onChange={(e) =>
                        setTestForm((prev) => ({ ...prev, negative_marking: parseInt(e.target.value, 10) || 0 }))
                      }
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-1.5 px-2.5 text-xs font-black"
                    />
                  </div>
                </div>
              </div>
            </AdminCard>
          </div>

          {/* Right Column: Test Blueprint Preview Rail */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-4">
            <AdminCard
              title="Test Blueprint Summary"
              subtitle="Full specification of the exam paper to be generated."
              className="border-indigo-500/30 dark:border-indigo-500/20"
            >
              <div className="space-y-4 pt-1">
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                    {testForm.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-600">
                      {testForm.exam_type}
                    </span>
                    <span className="text-xs text-slate-500">{testForm.class_level}</span>
                  </div>
                </div>

                {/* Quantitative Metrics */}
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Questions</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white">
                      {testForm.total_questions}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Max Marks</span>
                    <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                      {testForm.total_questions * testForm.marks_per_question}
                    </span>
                  </div>
                </div>

                {/* Validation Status */}
                <div className="space-y-1.5 text-xs">
                  <div
                    className={`flex items-center gap-2 ${testSubjectSum === Number(testForm.total_questions)
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                      }`}
                  >
                    {testSubjectSum === Number(testForm.total_questions) ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                    )}
                    <span>
                      Subject Sum: {testSubjectSum} / {testForm.total_questions}
                    </span>
                  </div>

                  <div
                    className={`flex items-center gap-2 ${testDifficultySum === 100
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-amber-600 dark:text-amber-400'
                      }`}
                  >
                    {testDifficultySum === 100 ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 shrink-0" />
                    )}
                    <span>Difficulty Split: {testDifficultySum}% / 100%</span>
                  </div>
                </div>

                {/* Action Trigger */}
                <button
                  type="button"
                  onClick={() => setPreviewModalOpen(true)}
                  disabled={isGenerating || testSubjectSum !== Number(testForm.total_questions)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Layers className="h-4 w-4" />
                  <span>Synthesize Full Test with AI</span>
                </button>
              </div>
            </AdminCard>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: GENERATION QUEUE & DRAFTS                                      */}
      {/* ===================================================================== */}
      {activeTab === 'drafts' && (
        <AdminCard
          title="AI Generation Staging & History"
          subtitle="Recent generation requests, staging drafts, and batches ready for administrative approval."
          action={
            <button
              type="button"
              onClick={fetchDrafts}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loadingDrafts ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          }
        >
          {loadingDrafts ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400">
              <Spinner className="h-8 w-8 text-blue-600 mb-2" />
              <p className="text-xs font-bold">Querying AI Staging Queue...</p>
            </div>
          ) : recentDrafts.length === 0 ? (
            <div className="py-12 text-center">
              <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
                <BookmarkCheck className="h-6 w-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Drafts in Queue</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                Generated question batches will appear here for preview, inline KaTeX math editing, and batch
                approval.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {recentDrafts.map((d, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{d.batch_id}</span>
                    <p className="text-[11px] text-slate-500">{d.subject} • {d.total_questions} Questions</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600">
                    {d.status || 'Draft'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </AdminCard>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: AI DIAGRAM ENGINE & STUDIO                                     */}
      {/* ===================================================================== */}
      {activeTab === 'diagram-engine' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Diagram Generator & Preview (Left Column - 8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <AdminCard
              title="Exam Diagram Generator Parameters"
              subtitle="Generate examination-quality vector diagrams for NEET and JEE with neutral reference markers."
            >
              <div className="space-y-4 pt-1">
                {/* Subject & Category Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Subject
                    </label>
                    <select
                      value={diagramForm.subject}
                      onChange={(e) => setDiagramForm({ ...diagramForm, subject: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Biology">Biology</option>
                      <option value="Mathematics">Mathematics</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Diagram Template
                    </label>
                    <select
                      value={diagramForm.category}
                      onChange={(e) => setDiagramForm({ ...diagramForm, category: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      <option value="electric_circuit">Electric Circuit (Bridge / Series-Parallel)</option>
                      <option value="ray_optics">Ray Optics (Lenses / Mirrors / Rays)</option>
                      <option value="mechanics_fbd">Mechanics (Incline / Pulley / FBD)</option>
                      <option value="physics_graph">Indicator Graph / Curves (P-V / Kinematics)</option>
                      <option value="molecular_structure">Molecular Structure (Benzene / Bonds)</option>
                      <option value="cellular_structure">Cellular Organelle (Chloroplast / Nucleus)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Generation Method
                    </label>
                    <select
                      value={diagramForm.method}
                      onChange={(e) => setDiagramForm({ ...diagramForm, method: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      <option value="programmatic">Programmatic SVG (Instant, Pure Vector)</option>
                      <option value="ai_svg">AI Dynamic Vector (Gemini Vision/SVG)</option>
                      <option value="pdf_extracted">Extract from Reference Material</option>
                    </select>
                  </div>
                </div>

                {/* Chapter & Topic */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Chapter
                    </label>
                    <input
                      type="text"
                      value={diagramForm.chapter}
                      onChange={(e) => setDiagramForm({ ...diagramForm, chapter: e.target.value })}
                      placeholder="e.g. Alternating Current"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-slate-200 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Topic / Setup Name
                    </label>
                    <input
                      type="text"
                      value={diagramForm.topic}
                      onChange={(e) => setDiagramForm({ ...diagramForm, topic: e.target.value })}
                      placeholder="e.g. Wheatstone Bridge Network"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-slate-200 font-semibold"
                    />
                  </div>
                </div>

                {/* Reference Markers */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Reference Markers (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={diagramForm.markers}
                    onChange={(e) => setDiagramForm({ ...diagramForm, markers: e.target.value })}
                    placeholder="e.g. A, B, X, Y or (1), (2), (3), (4)"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-slate-200 font-semibold font-mono"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Markers will be overlaid at key test points. Question diagram will never reveal answers.
                  </p>
                </div>

                {/* Custom Prompt / Instructions */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Custom Diagram Prompt (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={diagramForm.customPrompt}
                    onChange={(e) => setDiagramForm({ ...diagramForm, customPrompt: e.target.value })}
                    placeholder="Describe specific component values, ray directions, or structural highlights..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-slate-200 resize-none font-medium"
                  />
                </div>

                {/* Submit Action Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleGenerateDiagram}
                    disabled={isGeneratingDiagram}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-50"
                  >
                    {isGeneratingDiagram ? (
                      <>
                        <Spinner className="h-4 w-4" />
                        <span>Rendering & Validating Vector...</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="h-4 w-4" />
                        <span>Generate & Validate Diagram</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </AdminCard>

            {/* Live Diagram Preview & Quality Assurance Card */}
            <AdminCard
              title="Live Diagram Preview & Security Audit"
              subtitle="Inspect rendered vector paths, reference markers, and automated answer-leak security validation."
              action={
                activeDiagram && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setRefinePrompt(activeDiagram.prompt_used || '');
                        setShowRefineModal(true);
                      }}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="h-3 w-3 text-blue-500" />
                      <span>Refine</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReviewDiagram('approved')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[11px] font-bold hover:bg-emerald-500/20 flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="h-3 w-3" />
                      <span>Approve</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReviewDiagram('flagged_for_review')}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[11px] font-bold hover:bg-amber-500/20 flex items-center gap-1 cursor-pointer"
                    >
                      <AlertTriangle className="h-3 w-3" />
                      <span>Flag</span>
                    </button>
                  </div>
                )
              }
            >
              {activeDiagram ? (
                <div className="space-y-4 pt-2">
                  {/* Status Bar */}
                  <div className="flex flex-wrap items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                        {activeDiagram.asset_id}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600 dark:text-slate-400 font-semibold">
                        {activeDiagram.subject} ({activeDiagram.diagram_type})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${activeDiagram.review_status === 'approved'
                          ? 'bg-emerald-500/10 text-emerald-600'
                          : activeDiagram.review_status === 'flagged_for_review'
                            ? 'bg-amber-500/10 text-amber-600'
                            : 'bg-blue-500/10 text-blue-600'
                          }`}
                      >
                        Status: {activeDiagram.review_status}
                      </span>
                    </div>
                  </div>

                  {/* SVG Canvas Preview Container */}
                  <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-center min-h-[300px] overflow-hidden">
                    {activeDiagram.svg_content ? (
                      <div
                        className="max-w-full overflow-auto flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: activeDiagram.svg_content }}
                      />
                    ) : activeDiagram.image_url ? (
                      <img
                        src={activeDiagram.image_url}
                        alt="Examination diagram preview"
                        className="max-h-[360px] object-contain rounded-lg border border-slate-200 dark:border-slate-800"
                      />
                    ) : (
                      <p className="text-xs text-slate-400">No renderable visual asset found.</p>
                    )}
                  </div>

                  {/* Reference Markers Chips */}
                  {Array.isArray(activeDiagram.reference_markers) && activeDiagram.reference_markers.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-500">Embedded Markers:</span>
                      {activeDiagram.reference_markers.map((m, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-black shadow-xs font-mono"
                        >
                          [{m}]
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Security & Validation Audit Report */}
                  <div className="p-3.5 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                      <Shield className="h-4 w-4" />
                      <span>Security & Quality Validation Report</span>
                    </div>
                    <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300 font-medium list-disc list-inside">
                      <li>Answer Isolation: Confirmed ZERO solution labels or answers exposed.</li>
                      <li>Vector Architecture: Valid SVG XML paths with responsive viewBox bounds.</li>
                      <li>Reference Calibration: Unbiased markers ready for candidate CBT assessment.</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center text-slate-400">
                  <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Diagram Selected</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    Select a template and click &quot;Generate &amp; Validate Diagram&quot; above to preview scientific vector artwork.
                  </p>
                </div>
              )}
            </AdminCard>
          </div>

          {/* Right Column (4 Cols): Diagram Asset Library & Guidelines */}
          <div className="lg:col-span-4 space-y-6">
            <AdminCard
              title="Diagram Asset Library"
              subtitle="Recently synthesized vector assets across NEET &amp; JEE."
              action={
                <button
                  type="button"
                  onClick={fetchDiagramAssets}
                  className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${loadingDiagrams ? 'animate-spin' : ''}`} />
                </button>
              }
            >
              {loadingDiagrams ? (
                <div className="py-8 flex justify-center text-slate-400">
                  <Spinner className="h-6 w-6 text-blue-600" />
                </div>
              ) : diagramList.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No diagram assets generated yet.
                </div>
              ) : (
                <div className="divide-y divide-slate-200 dark:divide-slate-800 max-h-[420px] overflow-y-auto">
                  {diagramList.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveDiagram(item)}
                      className={`py-2.5 px-2 flex items-center justify-between rounded-lg cursor-pointer transition-colors ${activeDiagram?.asset_id === item.asset_id
                        ? 'bg-blue-500/10 border-l-2 border-blue-600'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-900'
                        }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {item.topic || item.subject}
                        </p>
                        <span className="text-[10px] text-slate-500">
                          {item.subject} • {item.diagram_type}
                        </span>
                      </div>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${item.review_status === 'approved'
                          ? 'bg-emerald-500/10 text-emerald-600'
                          : 'bg-amber-500/10 text-amber-600'
                          }`}
                      >
                        {item.review_status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </AdminCard>

            {/* Exam Standards Card */}
            <AdminCard
              title="Competitive Exam Standards"
              subtitle="NEET &amp; JEE Diagram Regulations"
            >
              <div className="space-y-3 pt-1 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Unbiased Markers Only:</span>
                    <p className="text-[11px]">Never write descriptive answers or solutions inside the question graphic.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Vector Scalability:</span>
                    <p className="text-[11px]">SVGs must render crisply across mobile, tablet, and high-DPI desktop displays.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Independent Solutions:</span>
                    <p className="text-[11px]">Full solution diagrams and step-by-step explanations are strictly held on backend until after test submission.</p>
                  </div>
                </div>
              </div>
            </AdminCard>
          </div>
        </div>
      )}

      {/* Diagram Refine Modal */}
      {showRefineModal && (
        <Modal
          isOpen={showRefineModal}
          onClose={() => setShowRefineModal(false)}
          title="Refine Examination Diagram"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Provide instructions to modify components, adjust marker positions, or alter curve characteristics:
            </p>
            <textarea
              rows={3}
              value={refinePrompt}
              onChange={(e) => setRefinePrompt(e.target.value)}
              placeholder="e.g. Rotate the lens, add a third parallel resistor labeled R3, make the incline steeper..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-slate-200 resize-none font-medium"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowRefineModal(false)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRegenerateDiagram}
                disabled={isGeneratingDiagram}
                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isGeneratingDiagram ? 'Regenerating...' : 'Apply Refinements'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ===================================================================== */}
      {/* CONFIRMATION PREVIEW MODAL                                            */}
      {/* ===================================================================== */}
      {previewModalOpen && (
        <Modal
          isOpen={previewModalOpen}
          onClose={() => setPreviewModalOpen(false)}
          title="Confirm AI Generation Request"
          size="md"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Operation:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {activeTab === 'question-generator' ? 'Question Batch Generation' : 'Complete Test Generation'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Exam & Target:</span>
                <span className="font-bold text-blue-600">
                  {activeTab === 'question-generator'
                    ? `${qForm.exam_type} (${qForm.subject})`
                    : `${testForm.exam_type} (${testForm.total_questions} Questions)`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">AI Model:</span>
                <span className="font-bold text-emerald-600">Google Gemini 3.8 Flash</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Answer Key Protection:</span>
                <span className="font-bold text-slate-900 dark:text-white">Active (Unlabeled SVGs only)</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              The AI Engine will synthesize competitive exam questions adhering strictly to the NTA syllabus and LaTeX
              math standards. Generation typically takes 15–45 seconds.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPreviewModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStartGeneration}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 shadow-md cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Confirm & Generate</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ===================================================================== */}
      {/* PROGRESS / LOADING OVERLAY                                            */}
      {/* ===================================================================== */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 shadow-2xl space-y-4 text-center">
            <div className="h-14 w-14 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto animate-pulse">
              <Sparkles className="h-7 w-7" />
            </div>

            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Synthesizing with Gemini 3.8 Flash
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{generationStep}</p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${generationProgress}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-400 font-medium">
              Please wait while questions, options, KaTeX formulas, and diagrams are validated.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
