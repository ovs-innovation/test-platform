import React, { useState, useRef, useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import {
  Sparkles,
  Send,
  Camera,
  Image as ImageIcon,
  X,
  Maximize2,
  Minimize2,
  MessageSquare,
  Bot,
  User,
  Check,
  Copy,
  Lightbulb,
  BookOpen,
  HelpCircle,
  RefreshCw,
  AlertCircle,
  Zap,
  ChevronDown,
  Paperclip,
  Trash2,
  Compass,
  BrainCircuit,
  Atom,
  FlaskConical,
  Calculator,
  Dna,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  RotateCcw
} from 'lucide-react';
import { studentReportService } from '../../lib/services.js';

function cleanScienceMathText(str) {
  if (!str || typeof str !== 'string') return str || '';
  let cleaned = str;

  // 1. Strip diagnostic "Mode Detected:" lines and "Mode 1:", "Mode 2:", etc.
  cleaned = cleaned.replace(/^(\*{0,2})Mode Detected:.*$/gmi, '');
  cleaned = cleaned.replace(/^(\*{0,2})Mode \d+:.*$/gmi, '');

  // 2. Strip horizontal divider lines "---" or "==="
  cleaned = cleaned.replace(/^---+$/gm, '');
  cleaned = cleaned.replace(/^===+$/gm, '');

  // 3. Clean LaTeX \frac{a}{b} -> (a / b)
  cleaned = cleaned.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1 / $2)');

  // 4. Fix escaped dollar signs and percent signs: \$ -> $, \% -> %
  cleaned = cleaned.replace(/\\\$([^\$]+)\\\$/g, '$1');
  cleaned = cleaned.replace(/\\\$/g, '$');
  cleaned = cleaned.replace(/\\%/g, '%');

  // 5. Clean \text{...} wrappers
  cleaned = cleaned.replace(/\\text\{\s*([^{}]+)\s*\}/g, '$1');

  // 6. Common LaTeX math symbols to clean Unicode symbols
  cleaned = cleaned.replace(/\\times/g, '×');
  cleaned = cleaned.replace(/\\cdot/g, '·');
  cleaned = cleaned.replace(/\\equiv/g, '≡');
  cleaned = cleaned.replace(/\\longrightarrow/g, '➔');
  cleaned = cleaned.replace(/\\rightarrow/g, '➔');
  cleaned = cleaned.replace(/\\pm/g, '±');
  cleaned = cleaned.replace(/\\leq/g, '≤');
  cleaned = cleaned.replace(/\\geq/g, '≥');
  cleaned = cleaned.replace(/\\neq/g, '≠');
  cleaned = cleaned.replace(/\\approx/g, '≈');
  cleaned = cleaned.replace(/\\alpha/g, 'α');
  cleaned = cleaned.replace(/\\beta/g, 'β');
  cleaned = cleaned.replace(/\\gamma/g, 'γ');
  cleaned = cleaned.replace(/\\delta/g, 'δ');
  cleaned = cleaned.replace(/\\Delta/g, 'Δ');
  cleaned = cleaned.replace(/\\theta/g, 'θ');
  cleaned = cleaned.replace(/\\lambda/g, 'λ');
  cleaned = cleaned.replace(/\\pi/g, 'π');
  cleaned = cleaned.replace(/\\sigma/g, 'σ');
  cleaned = cleaned.replace(/\\mu/g, 'μ');
  cleaned = cleaned.replace(/\\omega/g, 'ω');
  cleaned = cleaned.replace(/\\Omega/g, 'Ω');

  // 7. Superscripts & exponents
  const superMap = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
    '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
    'n': 'ⁿ', 'i': 'ⁱ'
  };

  cleaned = cleaned.replace(/\^{(-?\d+|\+?\d+|[a-z])}/gi, (_, p1) => {
    return p1.split('').map(c => superMap[c] || c).join('');
  });
  cleaned = cleaned.replace(/\^([0-9\+\-n])/gi, (_, p1) => superMap[p1] || p1);

  // 8. Clean LaTeX delimiter wrappers like \( \)
  cleaned = cleaned.replace(/\\\(|\\\)/g, '');

  return cleaned;
}

function KaTeXMath({ math, displayMode = false }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && math) {
      const cleanedMath = cleanScienceMathText(math);
      try {
        katex.render(cleanedMath, containerRef.current, {
          displayMode,
          throwOnError: false,
          output: 'html',
        });
      } catch (err) {
        containerRef.current.textContent = cleanedMath;
      }
    }
  }, [math, displayMode]);

  return <span ref={containerRef} className={displayMode ? "block my-2 text-center text-indigo-950 font-semibold bg-indigo-50/50 p-2 rounded-lg border border-indigo-100/80" : "inline-block px-1 font-semibold text-indigo-950"} />;
}

function renderInlineFormatting(str) {
  if (!str) return '';
  const sanitized = cleanScienceMathText(str);
  const parts = sanitized.split(/(\$\$.*?\$\$|\$.*?\$|\`.*?\`|\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) {
      return <KaTeXMath key={i} math={part.slice(2, -2)} displayMode={true} />;
    }
    if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      return <KaTeXMath key={i} math={part.slice(1, -1)} displayMode={false} />;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-slate-900">{renderInlineFormatting(part.slice(2, -2))}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-slate-100 text-indigo-700 px-1.5 py-0.5 rounded font-mono text-[11px] font-semibold border border-slate-200/80">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

function renderFormattedMarkdownText(text) {
  if (!text) return null;
  const cleanedText = cleanScienceMathText(text);
  const lines = cleanedText.split('\n');
  const elements = [];

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed === '---' || trimmed === '===') {
      return;
    }

    if (/^(\*{0,2})Mode Detected:/i.test(trimmed) || /^(\*{0,2})Mode \d+:/i.test(trimmed)) {
      return;
    }

    if (/^\|[\s\-:|]+\|$/.test(trimmed)) {
      return;
    }

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const cells = trimmed.slice(1, -1).split('|').map(c => c.trim()).filter(Boolean);
      if (cells.length >= 2) {
        if (cells[0].toLowerCase().includes('concept') && cells[1].toLowerCase().includes('why')) {
          elements.push(
            <div key={idx} className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-900 mt-3 mb-1 flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5 text-indigo-600" /> Core Concepts & Laws Applied:
            </div>
          );
          return;
        }

        elements.push(
          <div key={idx} className="my-1.5 p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-1 shadow-xs hover:border-indigo-200 transition-colors">
            <span className="font-bold text-indigo-950 block">{renderInlineFormatting(cells[0])}</span>
            <span className="text-slate-600 block">{renderInlineFormatting(cells[1])}</span>
          </div>
        );
        return;
      }
    }

    if (trimmed.startsWith('### ')) {
      const headerText = trimmed.replace(/^###\s+/, '').replace(/^💡\s*/, '').replace(/^📐\s*/, '').replace(/^🎯\s*/, '').replace(/^🚀\s*/, '');
      elements.push(
        <h3 key={idx} className="text-sm font-bold text-slate-900 mt-3 mb-2 flex items-center gap-2 border-b border-slate-100 pb-1.5">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 inline-block shadow-xs" />
          {renderInlineFormatting(headerText)}
        </h3>
      );
      return;
    }

    if (trimmed.startsWith('#### ') || trimmed.startsWith('## ')) {
      const headerText = trimmed.replace(/^#{2,4}\s+/, '');
      elements.push(
        <h4 key={idx} className="text-xs font-bold text-slate-800 mt-2.5 mb-1 flex items-center gap-1.5">
          {renderInlineFormatting(headerText)}
        </h4>
      );
      return;
    }

    if (/^\d+[\)\.]\s+/.test(trimmed)) {
      const numStr = trimmed.match(/^\d+[\)\.]/)[0];
      const headerText = trimmed.replace(/^\d+[\)\.]\s+/, '');
      elements.push(
        <div key={idx} className="mt-2.5 mb-1 font-bold text-xs text-slate-900 flex items-center gap-2">
          <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md text-[11px] font-mono border border-indigo-100 font-bold">{numStr}</span>
          <span>{renderInlineFormatting(headerText)}</span>
        </div>
      );
      return;
    }

    if (/^Step\s*\d+\s*[-:]/i.test(trimmed)) {
      elements.push(
        <div key={idx} className="mt-2.5 mb-1 font-bold text-xs text-slate-900 flex items-center gap-2">
          <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md text-[11px] font-mono border border-purple-100 font-bold">{trimmed.split(/[-:]/)[0].trim()}</span>
          <span>{renderInlineFormatting(trimmed.replace(/^Step\s*\d+\s*[-:]\s*/i, ''))}</span>
        </div>
      );
      return;
    }

    if (trimmed.startsWith('✅')) {
      const content = trimmed.replace(/^✅\s*/, '');
      elements.push(
        <div key={idx} className="my-3 p-3.5 bg-emerald-50/80 border border-emerald-200/80 rounded-xl text-emerald-950 font-medium text-xs leading-relaxed shadow-xs">
          <div className="flex items-center gap-1.5 mb-1 text-emerald-700 font-bold uppercase text-[10px] tracking-wide">
            <span>✅</span> Final Answer & Key Takeaway
          </div>
          <div>{renderInlineFormatting(content)}</div>
        </div>
      );
      return;
    }

    if (trimmed.startsWith('⚠️')) {
      const content = trimmed.replace(/^⚠️\s*/, '');
      elements.push(
        <div key={idx} className="my-3 p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-xl text-amber-950 font-medium text-xs leading-relaxed shadow-xs">
          <div className="flex items-center gap-1.5 mb-1 text-amber-800 font-bold uppercase text-[10px] tracking-wide">
            <span>⚠️</span> Common Student Trap & Exam Tip
          </div>
          <div>{renderInlineFormatting(content)}</div>
        </div>
      );
      return;
    }

    if (trimmed.startsWith('• ') || trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      const content = trimmed.replace(/^[•\*\-]\s+/, '');
      elements.push(
        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 my-1 leading-relaxed pl-1">
          <span className="text-indigo-500 font-bold mt-1">•</span>
          <span className="flex-1">{renderInlineFormatting(content)}</span>
        </div>
      );
      return;
    }

    elements.push(
      <p key={idx} className="text-xs leading-relaxed text-slate-700 my-1.5">
        {renderInlineFormatting(trimmed)}
      </p>
    );
  });

  return <div className="space-y-1">{elements}</div>;
}

export default function AIDoubtSolverChatbox({ defaultOpen = false, initialQuery = '', testContext = null }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isExpanded, setIsExpanded] = useState(false);
  const [questionText, setQuestionText] = useState(initialQuery);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [attachedImage, setAttachedImage] = useState(null); // { base64, mimeType, previewUrl, fileName }
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [feedbackGiven, setFeedbackGiven] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  // Active test context & chat mode ('doubt' | 'test_mentor' | 'revision')
  const [activeTestContext, setActiveTestContext] = useState(() => {
    if (testContext) return testContext;
    try {
      const stored = sessionStorage.getItem('active_test_context');
      return stored ? JSON.parse(stored) : null;
    } catch (_) {
      return null;
    }
  });

  const [chatMode, setChatMode] = useState(() => {
    return activeTestContext ? 'test_mentor' : 'doubt';
  });

  // Listen for dynamic test context updates from result pages or drawers
  useEffect(() => {
    const handleContextUpdate = () => {
      try {
        const stored = sessionStorage.getItem('active_test_context');
        if (stored) {
          const parsed = JSON.parse(stored);
          setActiveTestContext(parsed);
          setChatMode('test_mentor');
        }
      } catch (_) {}
    };

    window.addEventListener('active_test_context_updated', handleContextUpdate);
    return () => window.removeEventListener('active_test_context_updated', handleContextUpdate);
  }, []);

  useEffect(() => {
    if (testContext) {
      setActiveTestContext(testContext);
      setChatMode('test_mentor');
    }
  }, [testContext]);

  // Initial welcome message
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: '👋 Hello! I am Ask Edvedum. How can I assist your NEET / JEE preparation today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isSending]);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Handle image file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('Image size should be less than 10MB.');
      return;
    }

    setErrorMessage('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Str = event.target?.result;
      setAttachedImage({
        base64: base64Str,
        mimeType: file.type,
        previewUrl: base64Str,
        fileName: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  // Start live WebCam stream
  const startCamera = async () => {
    try {
      setErrorMessage('');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setCameraStream(stream);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setErrorMessage('Unable to access camera. Please check permissions or upload an image file.');
      setIsCameraActive(false);
    }
  };

  // Stop WebCam stream
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  };

  // Capture frame from WebCam video element
  const captureCameraFrame = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setAttachedImage({
        base64: dataUrl,
        mimeType: 'image/jpeg',
        previewUrl: dataUrl,
        fileName: `camera_snap_${Date.now()}.jpg`
      });
      stopCamera();
    }
  };

  // Clear Chat history
  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-welcome',
        sender: 'ai',
        text: '👋 Hello! I am Ask Edvedum. How can I assist your NEET / JEE preparation today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Handle submitting doubt question
  const handleSubmitDoubt = async (e, customQuery = null) => {
    if (e) e.preventDefault();

    const cleanText = (customQuery || questionText).trim();
    if (!cleanText && !attachedImage) {
      setErrorMessage('Please type a question or upload a photo of your doubt.');
      return;
    }

    setErrorMessage('');
    setIsSending(true);

    const userMsgId = `user-${Date.now()}`;
    const newUserMessage = {
      id: userMsgId,
      sender: 'user',
      text: cleanText,
      image: attachedImage ? { ...attachedImage } : null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newUserMessage]);

    const currentText = cleanText;
    const currentImage = attachedImage;
    setQuestionText('');
    setAttachedImage(null);

    try {
      const payload = {
        questionText: currentText,
        imageBase64: currentImage?.base64 || null,
        mimeType: currentImage?.mimeType || 'image/jpeg',
        subject: selectedSubject,
        testContext: chatMode === 'test_mentor' ? activeTestContext : null
      };

      const aiMsgId = `ai-${Date.now()}`;
      let messageAdded = false;

      const res = await studentReportService.askAIDoubtStream(payload, (token, currentFullText) => {
        if (!messageAdded) {
          messageAdded = true;
          setMessages((prev) => [
            ...prev,
            {
              id: aiMsgId,
              sender: 'ai',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              text: currentFullText,
              solution: null
            }
          ]);
        } else {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === aiMsgId ? { ...msg, text: currentFullText } : msg))
          );
        }
      });

      if (!messageAdded) {
        const resText = res?.text || res?.solution?.text || (typeof res?.solution === 'string' ? res.solution : null);
        setMessages((prev) => [
          ...prev,
          {
            id: aiMsgId,
            sender: 'ai',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: resText,
            solution: !resText ? res?.solution : null
          }
        ]);
      }

      setIsSending(false);
    } catch (err) {
      console.error('Failed to solve doubt:', err);
      const errMsgId = `ai-err-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: errMsgId,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true,
          solution: {
            summary: '⚠️ Doubt Processing Issue',
            subject: selectedSubject || 'STEM',
            topic: 'System Notification',
            problem_statement: currentText || 'Uploaded Doubt Image',
            key_concepts_and_formulas: ['Network or Service Timeout'],
            step_by_step_solution: [
              {
                step_number: 1,
                heading: 'Retry Instructions',
                explanation: 'We encountered a momentary connection issue with the AI engine. Please check your internet connection and try sending your doubt again.'
              }
            ],
            final_answer: 'Please click send again to retry.',
            pro_tips: ['Ensure image text is clear and readable.']
          }
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleCopySolution = (id, solutionText) => {
    navigator.clipboard.writeText(solutionText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (msgId, type) => {
    setFeedbackGiven((prev) => ({ ...prev, [msgId]: type }));
  };

  const starterCards = [
    {
      icon: Atom,
      color: 'from-blue-500 to-indigo-600',
      title: 'Physics & Math Numericals',
      desc: 'Step-by-step formula derivations and calculations',
      query: 'Solve this physics numerical step by step with formulas: '
    },
    {
      icon: FlaskConical,
      color: 'from-purple-500 to-pink-600',
      title: 'Organic Chemistry',
      desc: 'Reaction mechanisms, equations & periodic trends',
      query: 'Explain the organic chemistry reaction mechanism for: '
    },
    {
      icon: BrainCircuit,
      color: 'from-emerald-500 to-teal-600',
      title: 'Test Performance Delta',
      desc: 'Analyze marks lost, weak areas & pacing strategy',
      query: activeTestContext ? `Analyze my weak topics in ${activeTestContext.title} and explain why I lost marks.` : 'How can I analyze my weak topics and improve score in mock tests?'
    },
    {
      icon: Zap,
      color: 'from-amber-500 to-orange-600',
      title: 'Speed Tricks & Shortcuts',
      desc: 'Fast elimination tricks for NEET & JEE MCQs',
      query: 'What is the fastest short-trick method to solve: '
    }
  ];

  const subjectsList = [
    { id: '', label: 'All STEM', icon: Sparkles },
    { id: 'Physics', label: 'Physics', icon: Atom },
    { id: 'Chemistry', label: 'Chemistry', icon: FlaskConical },
    { id: 'Mathematics', label: 'Mathematics', icon: Calculator },
    { id: 'Biology', label: 'Biology', icon: Dna }
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-3 rounded-2xl shadow-xl hover:shadow-2xl border border-slate-700/80 transition-all duration-300 hover:scale-105 group cursor-pointer"
          aria-label="Ask Edvedum AI Chat"
        >
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow-xs group-hover:rotate-12 transition-transform">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="font-extrabold text-xs text-white tracking-wide">Ask Edvedum</span>
            <span className="text-[9px] text-indigo-300 font-semibold">Instant AI Mentor</span>
          </div>
        </button>
      )}

      {/* Main SaaS AI Drawer / Fullscreen Modal */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-slate-50 border border-slate-200/90 shadow-2xl overflow-hidden font-sans ${
            isExpanded
              ? 'inset-2 sm:inset-6 rounded-2xl w-auto h-auto'
              : 'bottom-4 right-4 w-[95vw] sm:w-[460px] h-[680px] max-h-[90vh] rounded-2xl'
          }`}
        >
          {/* Top Glassmorphism SaaS Header */}
          <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-3 flex items-center justify-between text-white shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-md shadow-indigo-500/20 shrink-0">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-white text-sm tracking-tight">Ask Edvedum</h3>
                  <span className="inline-flex items-center gap-1 bg-indigo-500/15 text-indigo-300 text-[10px] px-2 py-0.5 rounded-full font-bold border border-indigo-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> v2.5 AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">NEET & JEE Academic Mentor</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Clear Chat History"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title={isExpanded ? 'Minimize' : 'Expand full screen'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  stopCamera();
                  setIsOpen(false);
                }}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Close chat"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Mode Switcher Segmented Control Bar */}
          <div className="bg-slate-950 px-3 py-2 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            <button
              type="button"
              onClick={() => setChatMode('doubt')}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                chatMode === 'doubt'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-indigo-500 shadow-xs'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Atom className="w-3.5 h-3.5 text-cyan-300" /> STEM Doubt Solver
            </button>

            {activeTestContext && (
              <button
                type="button"
                onClick={() => setChatMode('test_mentor')}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 truncate max-w-[280px] cursor-pointer ${
                  chatMode === 'test_mentor'
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-extrabold shadow-xs'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                <span className="truncate">Test: {activeTestContext.title} ({activeTestContext.accuracy || activeTestContext.percentage || ''})</span>
              </button>
            )}
          </div>

          {/* Subject Filter Bar */}
          <div className="bg-white border-b border-slate-200/80 px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            <span className="text-[11px] font-semibold text-slate-500 shrink-0 mr-1">Subject:</span>
            {subjectsList.map((subj) => {
              const SubIcon = subj.icon;
              const isSelected = selectedSubject === subj.id;
              return (
                <button
                  key={subj.id || 'all'}
                  onClick={() => setSelectedSubject(subj.id)}
                  className={`text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap transition-all font-semibold flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 border border-slate-200/80 hover:bg-slate-200/70 hover:text-slate-900'
                  }`}
                >
                  <SubIcon className={`w-3 h-3 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>{subj.label}</span>
                </button>
              );
            })}
          </div>

          {/* Live WebCam Capture Modal Overlay */}
          {isCameraActive && (
            <div className="absolute inset-0 z-40 bg-slate-950/95 flex flex-col p-4">
              <div className="flex items-center justify-between mb-3 text-white">
                <span className="text-sm font-semibold flex items-center gap-2">
                  <Camera className="w-4 h-4 text-indigo-400" /> Snap Question Photo
                </span>
                <button
                  onClick={stopCamera}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative flex-1 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-8 border-2 border-indigo-500/50 rounded-xl pointer-events-none flex items-center justify-center">
                  <span className="text-xs text-indigo-200 bg-black/70 px-3.5 py-1.5 rounded-full font-medium shadow-md">
                    Position textbook / written question inside box
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-4">
                <button
                  onClick={stopCamera}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-sm font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={captureCameraFrame}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
                >
                  <Camera className="w-4 h-4" /> Snap Photo
                </button>
              </div>
            </div>
          )}

          {/* Main Chat Canvas Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-slate-50/70 custom-scrollbar">
            <div className={`mx-auto w-full ${isExpanded ? 'max-w-3xl space-y-5' : 'space-y-4'}`}>
              
              {/* SaaS AI Welcome Banner (When only 1 welcome message exists) */}
              {messages.length <= 1 && (
                <div className="my-2 p-5 bg-white border border-slate-200/90 rounded-2xl shadow-sm text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 mx-auto shadow-md shadow-indigo-500/20">
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900">What would you like to solve today?</h2>
                    <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                      Ask any physics, chemistry, math, or biology doubt, snap a textbook photo, or analyze your mock test performance.
                    </p>
                  </div>

                  {/* Starter Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left pt-1">
                    {starterCards.map((card, idx) => {
                      const CardIcon = card.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSubmitDoubt(null, card.query)}
                          className="p-3 bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/80 hover:border-indigo-200 rounded-xl transition-all text-left group cursor-pointer flex flex-col justify-between"
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className={`p-1.5 rounded-lg bg-gradient-to-r ${card.color} text-white shadow-2xs`}>
                              <CardIcon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{card.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-snug">{card.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Messages Render Loop */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-xl bg-slate-900 text-white p-0.5 flex-shrink-0 mt-0.5 shadow-sm border border-slate-700/60">
                      <div className="w-full h-full rounded-[10px] bg-slate-900 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                      </div>
                    </div>
                  )}

                  <div
                    className={`max-w-[88%] sm:max-w-[85%] text-xs ${
                      msg.sender === 'user'
                        ? 'bg-slate-900 text-white rounded-2xl rounded-tr-xs p-4 shadow-sm border border-slate-800'
                        : msg.isError
                        ? 'bg-red-50 border border-red-200 text-slate-800 rounded-2xl rounded-tl-xs p-4 shadow-sm'
                        : 'bg-white border border-slate-200/90 text-slate-800 rounded-2xl rounded-tl-xs p-4 sm:p-5 shadow-sm'
                    }`}
                  >
                    {/* User Message Rendering */}
                    {msg.sender === 'user' && (
                      <div className="space-y-2">
                        {msg.image && (
                          <div className="rounded-xl overflow-hidden border border-white/20 max-w-[240px] shadow-sm">
                            <img
                              src={msg.image.previewUrl}
                              alt="Uploaded doubt"
                              className="w-full h-auto max-h-48 object-cover"
                            />
                          </div>
                        )}
                        {msg.text && <p className="whitespace-pre-wrap leading-relaxed font-medium text-xs text-white">{msg.text}</p>}
                        <div className="text-[10px] text-slate-400 text-right mt-1 font-mono">{msg.timestamp}</div>
                      </div>
                    )}

                    {/* AI Message Rendering */}
                    {msg.sender === 'ai' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                            Ask Edvedum AI
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
                        </div>

                        {/* Streamed or Markdown Formatted Solution Body */}
                        {msg.text ? (
                          <div className="leading-relaxed">
                            {renderFormattedMarkdownText(msg.text)}
                          </div>
                        ) : msg.solution ? (
                          <div className="space-y-3">
                            {msg.solution.summary && (
                              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-1 flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-indigo-600" />
                                {msg.solution.summary}
                              </h3>
                            )}

                            {msg.solution.problem_statement && (
                              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">Doubt Statement</span>
                                <p className="text-slate-800 font-medium">{msg.solution.problem_statement}</p>
                              </div>
                            )}

                            {msg.solution.step_by_step_solution?.map((step, sIdx) => (
                              <div key={sIdx} className="space-y-1 pt-1">
                                <div className="font-bold text-slate-900 flex items-center gap-2 text-xs">
                                  <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md font-mono text-[11px]">Step {step.step_number || sIdx + 1}</span>
                                  <span>{step.heading}</span>
                                </div>
                                <p className="text-slate-600 pl-1">{step.explanation}</p>
                              </div>
                            ))}

                            {msg.solution.final_answer && (
                              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 font-semibold text-xs">
                                ✅ {msg.solution.final_answer}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-slate-500 py-2">
                            <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
                            <span className="text-xs font-medium">Solving step-by-step...</span>
                          </div>
                        )}

                        {/* AI Response Action Toolbar */}
                        {msg.text && (
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleCopySolution(msg.id, msg.text)}
                                className="flex items-center gap-1 hover:text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md transition-colors cursor-pointer"
                                title="Copy response text"
                              >
                                {copiedId === msg.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    <span className="text-emerald-600 font-semibold">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleFeedback(msg.id, 'like')}
                                className={`p-1 rounded-md hover:bg-slate-100 cursor-pointer transition-colors ${
                                  feedbackGiven[msg.id] === 'like' ? 'text-emerald-600 font-bold' : 'text-slate-400'
                                }`}
                                title="Helpful"
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleFeedback(msg.id, 'dislike')}
                                className={`p-1 rounded-md hover:bg-slate-100 cursor-pointer transition-colors ${
                                  feedbackGiven[msg.id] === 'dislike' ? 'text-rose-600 font-bold' : 'text-slate-400'
                                }`}
                                title="Not helpful"
                              >
                                <ThumbsDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Error Alert Box */}
          {errorMessage && (
            <div className="px-4 py-2 bg-rose-50 border-t border-rose-200 text-rose-700 text-xs font-semibold flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <button onClick={() => setErrorMessage('')} className="p-1 hover:bg-rose-100 rounded-md cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* SaaS Command Input Box Container */}
          <div className="bg-white border-t border-slate-200/90 p-3 sm:p-4 shrink-0 shadow-lg">
            {/* Attachment Preview Box */}
            {attachedImage && (
              <div className="mb-2 p-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between max-w-sm">
                <div className="flex items-center gap-2 truncate">
                  <img
                    src={attachedImage.previewUrl}
                    alt="Preview"
                    className="w-9 h-9 object-cover rounded-lg border border-slate-200"
                  />
                  <div className="truncate">
                    <span className="text-xs font-bold text-slate-800 block truncate">{attachedImage.fileName}</span>
                    <span className="text-[10px] text-slate-400 block">Question image attached</span>
                  </div>
                </div>
                <button
                  onClick={() => setAttachedImage(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Hidden File Input for Image Upload */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <form
              onSubmit={(e) => handleSubmitDoubt(e)}
              className="flex items-center gap-2 bg-slate-50/80 focus-within:bg-white border border-slate-200/90 focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20 rounded-2xl p-1.5 transition-all shadow-xs"
            >
              {/* Image Upload Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors shrink-0 cursor-pointer"
                title="Upload question image (PNG, JPG)"
              >
                <Paperclip className="w-4.5 h-4.5" />
              </button>

              {/* WebCam Camera Snap Button */}
              <button
                type="button"
                onClick={startCamera}
                className="p-2 text-slate-500 hover:text-purple-600 hover:bg-slate-100 rounded-xl transition-colors shrink-0 cursor-pointer"
                title="Snap photo of textbook question"
              >
                <Camera className="w-4.5 h-4.5" />
              </button>

              {/* Input Text Box */}
              <input
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Ask Edvedum any doubt, question, or formula..."
                className="flex-1 bg-transparent border-none text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none px-2 py-1.5"
                disabled={isSending}
              />

              {/* Elevated Gradient Send Button */}
              <button
                type="submit"
                disabled={isSending || (!questionText.trim() && !attachedImage)}
                className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-600/20 shrink-0 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                title="Send doubt"
              >
                {isSending ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <>
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
              <span>Press Enter to send</span>
              <span>Supports text & image OCR doubts</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
