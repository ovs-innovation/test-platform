import React, { useState, useMemo } from 'react';
import {
  X,
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Plus,
  Trash2,
  Clock,
  Layers,
  Award,
  BookOpen,
  Send,
  FileUp,
  Download,
  Copy,
  Check,
  ChevronRight,
  Eye
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext.jsx';
import { institutionDashboardService } from '../../../lib/services.js';
import { getMediaUrl } from '../../../lib/media.js';

const SAMPLE_TEXT = `1. A net force F = 2i - 4j - 10k N is applied on a body to accelerate it by 2 m/s^2. The mass of the body is:
A) sqrt(30) kg
B) 2*sqrt(30) kg
C) 3*sqrt(30) kg
D) 4*sqrt(30) kg
Answer: A
Solution: |F| = sqrt(2^2 + (-4)^2 + (-10)^2) = sqrt(120) = 2*sqrt(30) N. Mass m = F/a = 2*sqrt(30)/2 = sqrt(30) kg.

2. In an Atwood machine with two suspended unequal masses m1 and m2, if the masses are interchanged, what happens to acceleration and tension?
A) Both change
B) Both remain the same
C) Acceleration changes but tension remains same
D) Tension changes but acceleration remains same
Answer: B
Solution: Acceleration a = |m1 - m2|/(m1 + m2)*g and Tension T = 2*m1*m2/(m1 + m2)*g are both symmetric with respect to m1 and m2.

3. The upper half of an inclined plane of inclination theta is frictionless while lower half is rough. A body starts from rest at the top and comes to rest at the bottom. The coefficient of friction is:
A) 2*cot(theta)
B) cot(theta)
C) tan(theta)
D) 2*tan(theta)
Answer: D
Solution: Work done by gravity is balanced by work done by friction: mg*(2s)*sin(theta) = mu*mg*cos(theta)*s, which yields mu = 2*tan(theta).`;

export default function UploadCustomTestModal({
  isOpen,
  onClose,
  instId,
  batches = [],
  onTestCreated,
  isDarkMode = true,
}) {
  const toast = useToast();

  // Mode: 'paste' | 'pdf' | 'manual' | 'csv'
  const [uploadMode, setUploadMode] = useState('paste');

  // Basic Info
  const [title, setTitle] = useState('');
  const [targetExam, setTargetExam] = useState('NEET');
  const [durationMinutes, setDurationMinutes] = useState(180);
  const [passingMarks, setPassingMarks] = useState(0);
  const [negativeMarking, setNegativeMarking] = useState(true);
  const [negativeMarks, setNegativeMarks] = useState(1);
  const [marksPerQuestion, setMarksPerQuestion] = useState(4);
  const [syllabus, setSyllabus] = useState('');

  // Mode 1: Paste Text
  const [rawText, setRawText] = useState('');

  // Mode 2: PDF File
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfAnswerKey, setPdfAnswerKey] = useState('');
  const [pdfQuestionCount, setPdfQuestionCount] = useState(10);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [pdfExtractedQuestions, setPdfExtractedQuestions] = useState([]);

  // Mode 3: Manual Questions
  const [manualQuestions, setManualQuestions] = useState([
    {
      question_text: '',
      options: ['', '', '', ''],
      correct_index: 0,
      marks: 4,
      solution: '',
      subject: 'Physics'
    }
  ]);

  // Assignment Settings
  const [assignOption, setAssignOption] = useState('batch'); // 'all' | 'batch' | 'none'
  const [selectedBatchIds, setSelectedBatchIds] = useState([]);

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [previewTab, setPreviewTab] = useState(false);

  // Initialize default selected batch if available
  React.useEffect(() => {
    if (batches.length > 0 && selectedBatchIds.length === 0) {
      setSelectedBatchIds([batches[0].id]);
    }
  }, [batches]);

  // Real-time Parser for Quick Text Paste
  const parsedQuestions = useMemo(() => {
    if (uploadMode !== 'paste') return [];
    if (!rawText || !rawText.trim()) return [];

    const text = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    // Split into question blocks (starts with digits followed by dot/paren or "Q" followed by digits)
    const blocks = text.split(/\n(?=(?:Q(?:uestion)?\s*\d+[\.\:\)]|\d+[\.\:\)]))/i).filter(b => b.trim());

    const result = [];

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i].trim();
      const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length === 0) continue;

      let questionText = '';
      const options = [];
      let correctIndex = 0;
      let solution = '';
      let isReadingQuestion = true;

      for (let j = 0; j < lines.length; j++) {
        const line = lines[j];

        // Check if line is Answer
        const ansMatch = line.match(/^(?:ans(?:wer)?|key|correct(?:\s*option)?)\s*[:=\-]?\s*([a-d1-4])/i);
        if (ansMatch) {
          isReadingQuestion = false;
          const letter = ansMatch[1].toUpperCase();
          if (['A', '1'].includes(letter)) correctIndex = 0;
          else if (['B', '2'].includes(letter)) correctIndex = 1;
          else if (['C', '3'].includes(letter)) correctIndex = 2;
          else if (['D', '4'].includes(letter)) correctIndex = 3;
          continue;
        }

        // Check if line is Solution
        const solMatch = line.match(/^(?:sol(?:ution)?|exp(?:lanation)?|hint)\s*[:=\-]?\s*(.*)/i);
        if (solMatch) {
          isReadingQuestion = false;
          solution = solMatch[1] || '';
          // collect any further lines as part of solution
          for (let k = j + 1; k < lines.length; k++) {
            solution += '\n' + lines[k];
          }
          break;
        }

        // Check if line is Option A, B, C, D
        const optMatch = line.match(/^(?:\(?([a-d1-4])\)?[\.\:\)]?)\s+(.*)/i);
        if (optMatch) {
          isReadingQuestion = false;
          options.push(optMatch[2].trim());
          continue;
        }

        // Otherwise, if still reading question text
        if (isReadingQuestion) {
          // Remove leading "1. " or "Q1: " from first line
          const cleanedLine = j === 0 ? line.replace(/^(?:Q(?:uestion)?\s*\d+[\.\:\)]|\d+[\.\:\)])\s*/i, '') : line;
          questionText = questionText ? questionText + '\n' + cleanedLine : cleanedLine;
        }
      }

      // Pad options to 4 if less
      while (options.length < 4) {
        options.push(`Option ${String.fromCharCode(65 + options.length)}`);
      }

      if (questionText.trim()) {
        const imgMatch = questionText.match(/!\[.*?\]\((https?:\/\/[^\s\)]+|\/uploads\/[^\s\)]+)\)|(?:image|diagram|figure)\s*[:=\-]?\s*(https?:\/\/[^\s]+|\/uploads\/[^\s]+)/i);
        let extractedDiagram = null;
        let cleanedQText = questionText.trim();
        if (imgMatch) {
          extractedDiagram = imgMatch[1] || imgMatch[2];
          cleanedQText = cleanedQText.replace(imgMatch[0], '').trim();
        }

        result.push({
          question_text: cleanedQText,
          options: options.slice(0, 4),
          correct_index: correctIndex,
          marks: Number(marksPerQuestion) || 4,
          solution: solution.trim(),
          subject: targetExam === 'NEET' ? 'Physics' : targetExam === 'JEE' ? 'Mathematics' : 'General',
          image_url: extractedDiagram,
          media: extractedDiagram ? [{ type: 'diagram', url: extractedDiagram, id: `diag_${i + 1}` }] : [],
        });
      }
    }

    return result;
  }, [rawText, uploadMode, marksPerQuestion, targetExam]);

  // Handle PDF upload to server
  const handlePdfUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Please upload a valid PDF document.');
      return;
    }

    setPdfFile(file);
    setUploadingPdf(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await institutionDashboardService.uploadQuestionPaper(instId, formData);
      if (res?.url) {
        setPdfUrl(res.url);

        if (Array.isArray(res.extracted_questions) && res.extracted_questions.length > 0) {
          setPdfExtractedQuestions(res.extracted_questions);
          setPdfQuestionCount(res.extracted_questions.length);

          if (res.answer_key_map && Object.keys(res.answer_key_map).length > 0) {
            const formattedKeys = Object.entries(res.answer_key_map)
              .map(([k, v]) => `${k}:${v}`)
              .join(', ');
            setPdfAnswerKey(formattedKeys);
          }

          toast.success(`Success! Extracted ${res.extracted_questions.length} questions and options from your PDF.`);
        } else {
          toast.success('Question paper PDF uploaded successfully!');
        }
      } else {
        toast.error('Failed to get uploaded file URL.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'PDF upload failed.');
    } finally {
      setUploadingPdf(false);
    }
  };

  // Generate Questions from PDF (either parsed from PDF or via OMR Key)
  const generatePdfQuestions = () => {
    const keyMap = {};

    // Parse keys like "1:A, 2:B, 3:C" or "A,B,C,D" or "ABCD..."
    if (pdfAnswerKey && pdfAnswerKey.trim()) {
      const cleaned = pdfAnswerKey.trim().toUpperCase();
      if (cleaned.includes(':') || cleaned.includes('-')) {
        const parts = cleaned.split(/[\s,;\n]+/);
        for (const p of parts) {
          const match = p.match(/(\d+)[:=\-]?([A-D1-4])/);
          if (match) {
            keyMap[Number(match[1])] = match[2];
          }
        }
      } else if (cleaned.includes(',') || cleaned.includes(' ')) {
        const parts = cleaned.split(/[\s,;]+/).filter(Boolean);
        parts.forEach((p, idx) => {
          keyMap[idx + 1] = p;
        });
      } else {
        // Continuous string like "ABCDABCD..."
        for (let i = 0; i < cleaned.length; i++) {
          keyMap[i + 1] = cleaned[i];
        }
      }
    }

    // 1. If we have actual questions extracted from the PDF, use them directly!
    if (pdfExtractedQuestions && pdfExtractedQuestions.length > 0) {
      return pdfExtractedQuestions.map((q, idx) => {
        const qNum = idx + 1;
        const overrideChar = keyMap[qNum];
        let correctIdx = q.correct_index;

        if (overrideChar) {
          if (['A', '1'].includes(overrideChar)) correctIdx = 0;
          else if (['B', '2'].includes(overrideChar)) correctIdx = 1;
          else if (['C', '3'].includes(overrideChar)) correctIdx = 2;
          else if (['D', '4'].includes(overrideChar)) correctIdx = 3;
        }

        const diagramUrl = q.image_url || (Array.isArray(q.media) && q.media[0]?.url) || null;

        return {
          question_text: q.question_text || `Question ${qNum}`,
          options: Array.isArray(q.options) && q.options.length >= 2 ? q.options : ['Option (A)', 'Option (B)', 'Option (C)', 'Option (D)'],
          correct_index: correctIdx >= 0 ? correctIdx : 0,
          marks: Number(marksPerQuestion) || 4,
          solution: q.solution || `Correct option for Question ${qNum} is (${String.fromCharCode(65 + (correctIdx >= 0 ? correctIdx : 0))}).`,
          subject: targetExam || 'General',
          image_url: diagramUrl,
          media: q.media?.length ? q.media : (diagramUrl ? [{ type: 'diagram', url: diagramUrl, id: `diag_${qNum}` }] : []),
        };
      });
    }

    // 2. Fallback to digital OMR placeholders if PDF has no readable text stream
    const count = Number(pdfQuestionCount) || 10;
    const qs = [];
    for (let i = 1; i <= count; i++) {
      const char = keyMap[i] || 'A';
      let cIdx = 0;
      if (['A', '1'].includes(char)) cIdx = 0;
      else if (['B', '2'].includes(char)) cIdx = 1;
      else if (['C', '3'].includes(char)) cIdx = 2;
      else if (['D', '4'].includes(char)) cIdx = 3;

      qs.push({
        question_text: `Refer to Question ${i} in the attached Question Paper PDF.`,
        options: ['Option (A)', 'Option (B)', 'Option (C)', 'Option (D)'],
        correct_index: cIdx,
        marks: Number(marksPerQuestion) || 4,
        solution: `Correct option for Question ${i} is (${String.fromCharCode(65 + cIdx)}).`,
        subject: targetExam || 'General'
      });
    }

    return qs;
  };

  // Toggle Batch Selection
  const toggleBatch = (bId) => {
    setSelectedBatchIds((prev) =>
      prev.includes(bId) ? prev.filter((id) => id !== bId) : [...prev, bId]
    );
  };

  // Final Publish Handler
  const handlePublish = async () => {
    if (!title.trim()) {
      toast.error('Please enter a test title.');
      return;
    }

    let finalQuestions = [];

    if (uploadMode === 'paste') {
      if (parsedQuestions.length === 0) {
        toast.error('No questions parsed. Please paste formatted questions or use the sample button.');
        return;
      }
      finalQuestions = parsedQuestions;
    } else if (uploadMode === 'pdf') {
      if (!pdfUrl) {
        toast.error('Please select and upload a Question Paper PDF.');
        return;
      }
      finalQuestions = generatePdfQuestions();
    } else if (uploadMode === 'manual') {
      const valid = manualQuestions.filter(q => q.question_text.trim());
      if (valid.length === 0) {
        toast.error('Please add at least one complete question.');
        return;
      }
      finalQuestions = valid;
    }

    if (assignOption === 'batch' && selectedBatchIds.length === 0) {
      toast.error('Please select at least one batch to assign, or choose "Assign Later".');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        title: title.trim(),
        target_exam: targetExam,
        test_type: `${targetExam} Test`,
        syllabus: syllabus.trim(),
        duration_minutes: Number(durationMinutes) || 180,
        passing_marks: Number(passingMarks) || 0,
        negative_marking: Boolean(negativeMarking),
        negative_marks_per_wrong: Number(negativeMarks) || 1,
        question_paper_url: pdfUrl || '',
        questions: finalQuestions,
        assign_to: assignOption,
        batch_ids: assignOption === 'batch' ? selectedBatchIds : [],
      };

      const res = await institutionDashboardService.createCustomTest(instId, payload);

      if (res?.success) {
        toast.success(`"${title}" published and assigned successfully! (${finalQuestions.length} Questions)`);
        if (onTestCreated) onTestCreated(res.test);
        onClose();
      } else {
        toast.error(res?.message || 'Failed to create custom test.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to create test.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ${
          isDarkMode
            ? 'bg-[#0B1528] border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* MODAL HEADER */}
        <div className="p-5 sm:p-6 border-b border-slate-800/80 bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-transparent flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="h-3 w-3" />
              <span>Coaching Custom Test Studio</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Upload Question Paper / Create Test
            </h2>
            <p className="text-xs text-slate-400 max-w-xl">
              Upload your coaching institute's own question paper or enter questions manually. Assign directly to your student batches in seconds without buying external test series.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 custom-scrollbar">
          {/* STEP 1: TEST METADATA */}
          <div className={`p-4 sm:p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <h3 className="text-xs font-black uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Step 1: Test Details & Target Exam</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Title */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Test Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Physics Weekly Test 1 - Laws of Motion"
                  className={`w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border focus:outline-none transition ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500'
                      : 'bg-white border-slate-300 text-slate-900 focus:border-indigo-600'
                  }`}
                />
              </div>

              {/* Target Exam */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Target Exam</label>
                <select
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border focus:outline-none transition ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500'
                      : 'bg-white border-slate-300 text-slate-900 focus:border-indigo-600'
                  }`}
                >
                  <option value="NEET">NEET UG</option>
                  <option value="JEE">JEE Main / Advanced</option>
                  <option value="Foundation">Foundation (Class 9-10)</option>
                  <option value="Class 11">Class 11 Academic</option>
                  <option value="Class 12">Class 12 Academic</option>
                  <option value="General">General Assessment</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Duration (Minutes)</label>
                <input
                  type="number"
                  min="5"
                  max="360"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border focus:outline-none transition ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500'
                      : 'bg-white border-slate-300 text-slate-900 focus:border-indigo-600'
                  }`}
                />
              </div>
            </div>

            {/* Marking Scheme */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3 pt-3 border-t border-slate-800/60">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Marks per Correct Question</label>
                <input
                  type="number"
                  min="1"
                  value={marksPerQuestion}
                  onChange={(e) => setMarksPerQuestion(e.target.value)}
                  className={`w-full px-3 py-2 text-xs font-semibold rounded-xl border focus:outline-none transition ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex items-center gap-3 pt-5">
                <input
                  type="checkbox"
                  id="negToggle"
                  checked={negativeMarking}
                  onChange={(e) => setNegativeMarking(e.target.checked)}
                  className="h-4 w-4 rounded accent-indigo-600 cursor-pointer"
                />
                <label htmlFor="negToggle" className="text-xs font-bold text-slate-300 cursor-pointer">
                  Negative Marking for Wrong Options
                </label>
              </div>

              {negativeMarking && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Negative Marks Deducted</label>
                  <input
                    type="number"
                    min="0"
                    step="0.25"
                    value={negativeMarks}
                    onChange={(e) => setNegativeMarks(e.target.value)}
                    className={`w-full px-3 py-2 text-xs font-semibold rounded-xl border focus:outline-none transition ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              )}
            </div>
          </div>

          {/* STEP 2: UPLOAD MODE SELECTOR */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-indigo-400 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span>Step 2: How would you like to provide the questions?</span>
              </span>
              <span className="text-[11px] text-slate-400 font-semibold lowercase">
                choose the easiest method for you
              </span>
            </h3>

            {/* Mode Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setUploadMode('paste')}
                className={`p-3.5 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
                  uploadMode === 'paste'
                    ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-md'
                    : isDarkMode
                    ? 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900'
                }`}
              >
                <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-black flex items-center gap-1.5">
                    <span>⚡ Quick Text Paste</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-extrabold uppercase">Fastest</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Paste formatted questions from Word or notes. Instant real-time parsing.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setUploadMode('pdf')}
                className={`p-3.5 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
                  uploadMode === 'pdf'
                    ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-md'
                    : isDarkMode
                    ? 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900'
                }`}
              >
                <div className="p-2 rounded-xl bg-purple-600 text-white shrink-0">
                  <FileUp className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-black">
                    📄 Question Paper PDF
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Upload your institute's PDF test paper with digital OMR answer key.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setUploadMode('manual')}
                className={`p-3.5 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
                  uploadMode === 'manual'
                    ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-md'
                    : isDarkMode
                    ? 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900'
                }`}
              >
                <div className="p-2 rounded-xl bg-cyan-600 text-white shrink-0">
                  <Plus className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-black">
                    ✍️ Question by Question
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Build question-by-question with interactive options & solutions form.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* MODE 1: QUICK TEXT PASTE CONTAINER */}
          {uploadMode === 'paste' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  Paste questions with options (A, B, C, D) and answer line (<code className="text-indigo-400">Answer: B</code>).
                </div>
                <button
                  type="button"
                  onClick={() => setRawText(SAMPLE_TEXT)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-bold transition cursor-pointer"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Insert Sample Questions</span>
                </button>
              </div>

              <textarea
                rows={10}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="1. What is the SI unit of electric current?&#10;A) Volt&#10;B) Ampere&#10;C) Ohm&#10;D) Watt&#10;Answer: B&#10;Solution: Electric current is measured in Amperes (A).&#10;&#10;2. ..."
                className={`w-full p-4 text-xs font-mono rounded-2xl border focus:outline-none transition leading-relaxed ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600 focus:border-indigo-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-indigo-600'
                }`}
              />

              {/* PARSED STATUS STRIP */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`h-4 w-4 ${parsedQuestions.length > 0 ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span className="text-xs font-bold text-slate-300">
                    Detected: <strong className="text-white font-black">{parsedQuestions.length} Questions</strong>
                  </span>
                </div>

                {parsedQuestions.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setPreviewTab(!previewTab)}
                    className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>{previewTab ? 'Hide Question Cards' : 'Preview Question Cards'}</span>
                    <ChevronRight className={`h-3.5 w-3.5 transition-transform ${previewTab ? 'rotate-90' : ''}`} />
                  </button>
                )}
              </div>

              {/* LIVE PREVIEW CARDS */}
              {previewTab && parsedQuestions.length > 0 && (
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                  {parsedQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-black text-indigo-400">Q{idx + 1}.</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold">
                          +{q.marks} Marks
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-200">{q.question_text}</p>

                      {/* Question Diagram if present */}
                      {q.image_url && (
                        <div className="my-1.5 flex justify-start">
                          <img
                            src={getMediaUrl(q.image_url)}
                            alt={`Diagram for Q${idx + 1}`}
                            className="max-h-24 max-w-xs object-contain bg-white p-1 rounded-lg border border-slate-700 shadow-2xs"
                            onError={(e) => {
                              if (!e.target.dataset.triedFallback && !q.image_url.startsWith('http')) {
                                e.target.dataset.triedFallback = 'true';
                                e.target.src = `http://127.0.0.1:5000${q.image_url.startsWith('/') ? '' : '/'}${q.image_url}`;
                              }
                            }}
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        {q.options.map((opt, optIdx) => (
                          <div
                            key={optIdx}
                            className={`px-2.5 py-1.5 rounded-xl border ${
                              optIdx === q.correct_index
                                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-black'
                                : 'bg-slate-900 border-slate-800 text-slate-400 font-medium'
                            }`}
                          >
                            <span className="font-bold mr-1">({String.fromCharCode(65 + optIdx)})</span>
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>
                      {q.solution && (
                        <p className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
                          <strong className="text-slate-300">Sol:</strong> {q.solution}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MODE 2: PDF QUESTION PAPER */}
          {uploadMode === 'pdf' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-6 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/40 text-center space-y-3">
                <FileUp className="h-10 w-10 text-indigo-400 mx-auto" />
                <div>
                  <h4 className="text-xs font-extrabold text-white">Select Question Paper PDF</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Upload your institute test paper (.pdf format up to 50MB). Students will view the PDF during CBT.
                  </p>
                </div>
                <div>
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer transition shadow-md">
                    <Upload className="h-4 w-4" />
                    <span>{pdfFile ? 'Change PDF File' : 'Browse PDF File'}</span>
                    <input type="file" accept=".pdf" onChange={handlePdfUpload} className="hidden" />
                  </label>
                </div>
                {uploadingPdf && (
                  <p className="text-xs text-indigo-400 animate-pulse font-bold">Uploading PDF to secure server...</p>
                )}
                {pdfUrl && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{pdfFile?.name || 'Question Paper PDF Uploaded'}</span>
                  </div>
                )}
              </div>

              {/* Answer Key / Number of Questions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl border border-slate-800 bg-slate-900/50">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Number of Questions in Paper
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="200"
                    value={pdfQuestionCount}
                    onChange={(e) => setPdfQuestionCount(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-800 bg-slate-950 text-white"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Digital OMR response circles will be generated for this count.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Answer Key (Optional or enter later)
                  </label>
                  <input
                    type="text"
                    value={pdfAnswerKey}
                    onChange={(e) => setPdfAnswerKey(e.target.value)}
                    placeholder="e.g. 1:A, 2:B, 3:C or ABCDABCD..."
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-800 bg-slate-950 text-white"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Used for instant automatic scoring upon submission.
                  </p>
                </div>
              </div>

              {/* EXTRACTED QUESTIONS PREVIEW */}
              {pdfExtractedQuestions.length > 0 && (
                <div className="space-y-3 p-4 rounded-2xl border border-indigo-500/30 bg-indigo-950/20">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-emerald-400" />
                      <span className="font-extrabold text-white">
                        {pdfExtractedQuestions.length} Questions & Options Extracted from PDF
                      </span>
                    </div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black">
                      Ready to Publish
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                    {pdfExtractedQuestions.map((q, idx) => {
                      const diagramUrl = q.image_url || (Array.isArray(q.media) && q.media[0]?.url) || null;
                      return (
                        <div key={idx} className="p-3 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-black text-indigo-400">Q{idx + 1}.</span>
                            <div className="flex items-center gap-2">
                              {diagramUrl && (
                                <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                                  📊 Diagram Extracted
                                </span>
                              )}
                              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold">
                                +{marksPerQuestion} Marks
                              </span>
                            </div>
                          </div>
                          <p className="text-xs font-bold text-slate-200">{q.question_text}</p>

                          {/* Diagram preview */}
                          {diagramUrl && (
                            <div className="my-1.5 flex justify-start">
                              <img
                                src={getMediaUrl(diagramUrl)}
                                alt={`Diagram for Q${idx + 1}`}
                                className="max-h-24 max-w-xs object-contain bg-white p-1 rounded-lg border border-slate-700 shadow-2xs"
                                onError={(e) => {
                                  if (!e.target.dataset.triedFallback && !diagramUrl.startsWith('http')) {
                                    e.target.dataset.triedFallback = 'true';
                                    e.target.src = `http://127.0.0.1:5000${diagramUrl.startsWith('/') ? '' : '/'}${diagramUrl}`;
                                  }
                                }}
                              />
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                            {(q.options || []).map((opt, oIdx) => (
                              <div
                                key={oIdx}
                                className={`px-2 py-1 rounded-lg border text-[10px] truncate ${
                                  oIdx === q.correct_index
                                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold'
                                    : 'bg-slate-900 border-slate-800 text-slate-400'
                                }`}
                              >
                                <span className="font-bold mr-1">({String.fromCharCode(65 + oIdx)})</span>
                                <span>{opt}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODE 3: MANUAL QUESTIONS FORM */}
          {uploadMode === 'manual' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-4 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                {manualQuestions.map((q, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-black text-indigo-400">Question {idx + 1}</span>
                      {manualQuestions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setManualQuestions(manualQuestions.filter((_, i) => i !== idx))}
                          className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    <textarea
                      rows={2}
                      value={q.question_text}
                      onChange={(e) => {
                        const copy = [...manualQuestions];
                        copy[idx].question_text = e.target.value;
                        setManualQuestions(copy);
                      }}
                      placeholder="Enter question text or problem statement..."
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-800 bg-slate-900 text-white"
                    />

                    {/* 4 Options with Radio */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct_${idx}`}
                            checked={q.correct_index === optIdx}
                            onChange={() => {
                              const copy = [...manualQuestions];
                              copy[idx].correct_index = optIdx;
                              setManualQuestions(copy);
                            }}
                            className="accent-emerald-500 cursor-pointer"
                            title="Mark as correct answer"
                          />
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => {
                              const copy = [...manualQuestions];
                              copy[idx].options[optIdx] = e.target.value;
                              setManualQuestions(copy);
                            }}
                            placeholder={`Option (${String.fromCharCode(65 + optIdx)})`}
                            className={`w-full px-2.5 py-1.5 text-xs rounded-xl border ${
                              q.correct_index === optIdx
                                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 font-bold'
                                : 'border-slate-800 bg-slate-900 text-white'
                            }`}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Explanation */}
                    <input
                      type="text"
                      value={q.solution}
                      onChange={(e) => {
                        const copy = [...manualQuestions];
                        copy[idx].solution = e.target.value;
                        setManualQuestions(copy);
                      }}
                      placeholder="Solution / Explanation (optional)"
                      className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-800 bg-slate-900 text-slate-300"
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  setManualQuestions([
                    ...manualQuestions,
                    {
                      question_text: '',
                      options: ['', '', '', ''],
                      correct_index: 0,
                      marks: 4,
                      solution: '',
                      subject: 'General'
                    }
                  ])
                }
                className="w-full py-2.5 rounded-xl border border-dashed border-slate-700 hover:border-indigo-500 text-indigo-400 hover:text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <Plus className="h-4 w-4" />
                <span>Add Next Question</span>
              </button>
            </div>
          )}

          {/* STEP 3: DIRECT BATCH ASSIGNMENT */}
          <div className={`p-4 sm:p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <h3 className="text-xs font-black uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-2">
              <Send className="h-4 w-4" />
              <span>Step 3: Assign to Your Students Immediately</span>
            </h3>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="assignOption"
                    value="batch"
                    checked={assignOption === 'batch'}
                    onChange={() => setAssignOption('batch')}
                    className="accent-indigo-600"
                  />
                  <span>Assign to Specific Academic Batches</span>
                </label>

                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="assignOption"
                    value="all"
                    checked={assignOption === 'all'}
                    onChange={() => setAssignOption('all')}
                    className="accent-indigo-600"
                  />
                  <span>Assign to All Students in Institution</span>
                </label>

                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="assignOption"
                    value="none"
                    checked={assignOption === 'none'}
                    onChange={() => setAssignOption('none')}
                    className="accent-indigo-600"
                  />
                  <span>Save as Unassigned Test (Assign Later)</span>
                </label>
              </div>

              {/* Batch Selector Grid */}
              {assignOption === 'batch' && (
                <div className="pt-2">
                  <p className="text-[11px] text-slate-400 mb-2">
                    Select which academic batch(es) will immediately see and take this test:
                  </p>
                  {batches.length === 0 ? (
                    <p className="text-xs text-amber-400">
                      No batches created yet. You can create batches in the Batches tab or assign to all students.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {batches.map((b) => {
                        const isSelected = selectedBatchIds.includes(b.id);
                        return (
                          <div
                            key={b.id}
                            onClick={() => toggleBatch(b.id)}
                            className={`p-3 rounded-xl border text-xs font-bold cursor-pointer transition flex items-center justify-between ${
                              isSelected
                                ? 'border-indigo-500 bg-indigo-500/10 text-white'
                                : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                            }`}
                          >
                            <span className="truncate">{b.batch_name || b.name}</span>
                            <span className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-indigo-500 bg-indigo-600 text-white' : 'border-slate-700'
                            }`}>
                              {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 sm:p-5 border-t border-slate-800/80 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            {uploadMode === 'paste' && `${parsedQuestions.length} Questions ready to publish.`}
            {uploadMode === 'pdf' && `${pdfQuestionCount} Questions digital OMR test ready.`}
            {uploadMode === 'manual' && `${manualQuestions.filter(q => q.question_text.trim()).length} Questions added.`}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-900 text-xs font-extrabold text-slate-300 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handlePublish}
              disabled={submitting}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-black shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Publishing Test...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Publish & Assign to Students</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
