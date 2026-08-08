import React, { useState, useRef, useEffect } from 'react';
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
  ChevronDown
} from 'lucide-react';
import { studentReportService } from '../../lib/services.js';
function renderInlineFormatting(str) {
  if (!str) return '';
  const parts = str.split(/(\*\*.*?\*\*|\`.*?\`|\$.*?\$)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-slate-100 text-indigo-700 px-1.5 py-0.5 rounded font-mono text-[11px] font-medium border border-slate-200">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('$') && part.endsWith('$')) {
      return <span key={i} className="font-mono text-indigo-900 font-semibold bg-indigo-50/80 px-1.5 py-0.5 rounded border border-indigo-200/60">{part.slice(1, -1)}</span>;
    }
    return part;
  });
}

function renderFormattedMarkdownText(text) {
  if (!text) return null;
  const lines = text.split('\n');
  const elements = [];

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={`space-${idx}`} className="h-1.5" />);
      return;
    }

    if (trimmed.startsWith('### ')) {
      const headerText = trimmed.replace(/^###\s+/, '').replace(/^💡\s*/, '').replace(/^📐\s*/, '').replace(/^🎯\s*/, '').replace(/^🚀\s*/, '');
      elements.push(
        <h3 key={idx} className="text-sm font-bold text-indigo-950 mt-3 mb-1.5 flex items-center gap-1.5 border-b border-indigo-100/80 pb-1">
          <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block shadow-2xs" />
          {renderInlineFormatting(headerText)}
        </h3>
      );
      return;
    }

    if (trimmed.startsWith('#### ')) {
      const headerText = trimmed.replace(/^####\s+/, '');
      elements.push(
        <h4 key={idx} className="text-xs font-bold text-slate-800 mt-2 mb-1">
          {renderInlineFormatting(headerText)}
        </h4>
      );
      return;
    }

    if (trimmed.startsWith('✅')) {
      const content = trimmed.replace(/^✅\s*/, '');
      elements.push(
        <div key={idx} className="my-2.5 p-3 bg-emerald-50/90 border border-emerald-200/90 rounded-xl text-emerald-950 font-medium text-xs leading-relaxed shadow-2xs">
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
        <div key={idx} className="my-2.5 p-3 bg-amber-50/90 border border-amber-200/90 rounded-xl text-amber-950 font-medium text-xs leading-relaxed shadow-2xs">
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
          <span className="text-indigo-500 font-bold mt-0.5">•</span>
          <span className="flex-1">{renderInlineFormatting(content)}</span>
        </div>
      );
      return;
    }

    elements.push(
      <p key={idx} className="text-xs leading-relaxed text-slate-700 my-1">
        {renderInlineFormatting(trimmed)}
      </p>
    );
  });

  return <div className="space-y-0.5">{elements}</div>;
}

export default function AIDoubtSolverChatbox({ defaultOpen = false, initialQuery = '' }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isExpanded, setIsExpanded] = useState(false);
  const [questionText, setQuestionText] = useState(initialQuery);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [attachedImage, setAttachedImage] = useState(null); // { base64, mimeType, previewUrl }
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Initial simple welcome message
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: '👋 Hello! I am your AIETS Gemini Academic Mentor. Type any academic doubt or snap/upload a photo of your question to get started!',
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

  // Handle image file selection from device gallery or file system
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
      setErrorMessage('Unable to access camera. Please check camera permissions or upload an image file.');
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

  // Capture current frame from WebCam video element
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

  // Handle submitting doubt question
  const handleSubmitDoubt = async (e) => {
    if (e) e.preventDefault();

    const cleanText = questionText.trim();
    if (!cleanText && !attachedImage) {
      setErrorMessage('Please type a question or capture/upload a photo of your doubt.');
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
    
    // Clear inputs immediately for smooth UX
    const currentText = cleanText;
    const currentImage = attachedImage;
    setQuestionText('');
    setAttachedImage(null);

    try {
      const payload = {
        questionText: currentText,
        imageBase64: currentImage?.base64 || null,
        mimeType: currentImage?.mimeType || 'image/jpeg',
        subject: selectedSubject
      };

      const res = await studentReportService.askAIDoubt(payload);
      
      const aiMsgId = `ai-${Date.now()}`;
      const resText = res.text || res.solution?.text || (typeof res.solution === 'string' ? res.solution : null);

      const newAIMessage = {
        id: aiMsgId,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: resText,
        solution: !resText ? res.solution : null
      };

      setMessages((prev) => [...prev, newAIMessage]);
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

  const presetChips = [
    { label: '📐 Solve Physics Numerical', query: 'Please solve this physics numerical step by step with formulas: ' },
    { label: '🧪 Organic Mechanism', query: 'Explain the organic chemistry reaction mechanism for: ' },
    { label: '🔢 Math Formula Proof', query: 'Derive and explain the mathematical formula for: ' },
    { label: '💡 Exam Shortcut Trick', query: 'What is the fastest short-trick method to solve: ' }
  ];

  return (
    <>
      {/* Floating Trigger Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-5 py-3.5 rounded-full shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 border border-white/20"
          aria-label="Open AI Chatbot Doubt Solver"
        >
          <div className="relative">
            <Sparkles className="w-6 h-6 animate-pulse text-amber-300" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-300"></span>
            </span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm leading-tight flex items-center gap-1.5">
              Ask Chatbot <span className="bg-amber-400/30 text-amber-200 text-[10px] uppercase font-mono px-1.5 py-0.5 rounded">Live</span>
            </span>
            <span className="text-[11px] text-white/80 font-medium">Text or Camera Doubt Solver</span>
          </div>
        </button>
      )}

      {/* Main Chat Drawer / Fullscreen Modal */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden ${
            isExpanded
              ? 'inset-4 md:inset-10 w-auto h-auto'
              : 'bottom-4 right-4 w-[95vw] sm:w-[440px] h-[650px] max-h-[88vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 p-4 border-b border-indigo-800 flex items-center justify-between text-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md p-0.5 flex items-center justify-center shadow-inner border border-white/30">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-base leading-tight">AIETS Chatbot</h3>
                  <span className="inline-flex items-center gap-1 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-medium border border-white/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span> Instant
                  </span>
                </div>
                <p className="text-xs text-indigo-100/90">Ask doubt via text or camera photo upload</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 text-indigo-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title={isExpanded ? 'Minimize' : 'Expand full screen'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  stopCamera();
                  setIsOpen(false);
                }}
                className="p-2 text-indigo-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subject Filter Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-semibold text-slate-500 shrink-0">Subject:</span>
            {['', 'Physics', 'Chemistry', 'Mathematics', 'Biology'].map((subj) => (
              <button
                key={subj || 'all'}
                onClick={() => setSelectedSubject(subj)}
                className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-all font-semibold ${
                  selectedSubject === subj
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {subj || 'All STEM'}
              </button>
            ))}
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
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative flex-1 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-8 border-2 border-indigo-500/50 rounded-lg pointer-events-none flex items-center justify-center">
                  <span className="text-xs text-indigo-200/90 bg-black/60 px-3 py-1 rounded-full font-medium">
                    Position textbook / written question inside box
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-4">
                <button
                  onClick={stopCamera}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={captureCameraFrame}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30"
                >
                  <Camera className="w-4 h-4" /> Snap Photo
                </button>
              </div>
            </div>
          )}

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/80 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 flex-shrink-0 mt-1 shadow-sm">
                    <div className="w-full h-full bg-white rounded-[6px] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                    </div>
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[88%] rounded-2xl p-4 shadow-sm text-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-none shadow-md'
                      : msg.isError
                      ? 'bg-red-50 border border-red-200 text-slate-800 rounded-tl-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                  }`}
                >
                  {/* User Message Rendering */}
                  {msg.sender === 'user' && (
                    <div className="space-y-2">
                      {msg.image && (
                        <div className="rounded-lg overflow-hidden border border-white/20 max-w-[240px]">
                          <img
                            src={msg.image.previewUrl}
                            alt="Uploaded doubt"
                            className="w-full h-auto max-h-48 object-cover"
                          />
                        </div>
                      )}
                      {msg.text && <p className="whitespace-pre-wrap leading-relaxed font-medium">{msg.text}</p>}
                      <div className="text-[10px] text-indigo-100/90 text-right mt-1">{msg.timestamp}</div>
                    </div>
                  )}

                  {/* AI Markdown Formatted Tutor Message (ChatGPT/Gemini Style) */}
                  {msg.sender === 'ai' && msg.text && (
                    <div className="space-y-1 bg-white/95 border border-slate-200/80 p-4 rounded-2xl shadow-xs">
                      {renderFormattedMarkdownText(msg.text)}
                      <div className="text-[10px] text-slate-400 text-right mt-2 border-t border-slate-100 pt-1">{msg.timestamp}</div>
                    </div>
                  )}

                  {/* AI Gemini Message Solution Card */}
                  {msg.sender === 'ai' && msg.solution && (
                    <div className="space-y-3">
                      {/* Solution Header / Badges */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-0.5 rounded-full font-bold border border-indigo-200">
                            {msg.solution.subject || 'STEM'}
                          </span>
                          {msg.solution.topic && (
                            <span className="text-xs text-slate-500 font-semibold truncate max-w-[180px]">
                              {msg.solution.topic}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            handleCopySolution(
                              msg.id,
                              `${msg.solution.summary}\n\nKey Concepts:\n${msg.solution.key_concepts_and_formulas?.join('\n')}\n\nFinal Answer:\n${msg.solution.final_answer}`
                            )
                          }
                          className="text-slate-400 hover:text-slate-700 p-1 rounded transition-colors"
                          title="Copy solution text"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Summary */}
                      <p className="font-semibold text-slate-900 leading-snug">{msg.solution.summary}</p>

                      {/* Key Concepts & Formulas */}
                      {msg.solution.key_concepts_and_formulas && msg.solution.key_concepts_and_formulas.length > 0 && (
                        <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200/80">
                          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-amber-600" /> Core Formulas & Laws
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.solution.key_concepts_and_formulas.map((concept, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-white text-slate-800 font-mono px-2 py-0.5 rounded border border-slate-200 shadow-2xs font-semibold"
                              >
                                {concept}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step by Step Solution */}
                      {msg.solution.step_by_step_solution && (
                        <div className="space-y-2.5 pt-1">
                          <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
                            Step-by-Step Resolution
                          </span>
                          {msg.solution.step_by_step_solution.map((step) => (
                            <div
                              key={step.step_number}
                              className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center border border-indigo-200">
                                  {step.step_number}
                                </span>
                                <span className="font-bold text-slate-900 text-xs">{step.heading}</span>
                              </div>
                              <p className="text-xs text-slate-700 leading-relaxed pl-7 whitespace-pre-wrap font-normal">
                                {step.explanation}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Final Boxed Answer */}
                      {msg.solution.final_answer && (
                        <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-xl flex items-start gap-2.5 text-emerald-950 shadow-2xs">
                          <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-extrabold uppercase tracking-wider block text-emerald-700">
                              Final Result
                            </span>
                            <span className="text-xs leading-relaxed font-mono font-bold text-emerald-900">
                              {msg.solution.final_answer}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Pro Exam Tips */}
                      {msg.solution.pro_tips && msg.solution.pro_tips.length > 0 && (
                        <div className="bg-purple-50 border border-purple-200 p-3 rounded-xl space-y-1">
                          <span className="text-[11px] font-bold text-purple-900 flex items-center gap-1">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Exam Shortcut Tips
                          </span>
                          <ul className="text-xs text-slate-700 space-y-0.5 pl-4 list-disc font-medium">
                            {msg.solution.pro_tips.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="text-[10px] text-slate-400 text-right font-medium">{msg.timestamp}</div>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 flex-shrink-0 mt-1 border border-indigo-200 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Pulsating Typing Indicator while waiting for AI */}
            {isSending && (
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 flex-shrink-0 shadow-sm">
                  <div className="w-full h-full bg-white rounded-[6px] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-semibold">Gemini is solving your doubt</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-bounce delay-150"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-600 animate-bounce delay-300"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Preset Prompt Chips */}
          <div className="bg-slate-50 px-3 py-2 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {presetChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => setQuestionText(chip.query)}
                className="text-[11px] bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 px-2.5 py-1 rounded-lg whitespace-nowrap transition-all flex items-center gap-1 font-medium shadow-2xs"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Attached Image Bar */}
          {attachedImage && (
            <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <img
                  src={attachedImage.previewUrl}
                  alt="Attachment preview"
                  className="w-8 h-8 object-cover rounded border border-indigo-400 shrink-0"
                />
                <span className="text-xs text-slate-700 font-medium truncate max-w-[200px]">
                  {attachedImage.fileName || 'Attached doubt image'}
                </span>
              </div>
              <button
                onClick={() => setAttachedImage(null)}
                className="p-1 hover:bg-slate-200 text-slate-500 hover:text-red-600 rounded-full transition-colors"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Error Banner if any */}
          {errorMessage && (
            <div className="bg-red-50 border-t border-red-200 px-4 py-1.5 text-xs text-red-700 flex items-center justify-between font-medium">
              <span className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" /> {errorMessage}
              </span>
              <button onClick={() => setErrorMessage('')} className="text-red-500 hover:text-red-800">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={handleSubmitDoubt}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            {/* Hidden native file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Image Gallery Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
              title="Upload question photo"
            >
              <ImageIcon className="w-5 h-5" />
            </button>

            {/* Direct Camera Capture Button */}
            <button
              type="button"
              onClick={startCamera}
              className="p-2.5 text-slate-500 hover:text-purple-600 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
              title="Snap camera photo"
            >
              <Camera className="w-5 h-5" />
            </button>

            {/* Question Textarea / Input */}
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Ask any doubt or formula..."
              className="flex-1 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors"
              disabled={isSending}
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={isSending || (!questionText.trim() && !attachedImage)}
              className="p-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shrink-0"
              title="Send question"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
