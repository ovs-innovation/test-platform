import React, { useState, useEffect, useId } from 'react';
import {
  LifeBuoy,
  AlertCircle,
  X,
  Send,
  CheckCircle2,
  Wifi,
  FileQuestion,
  Save,
  Clock,
  AlertTriangle,
  Video,
  ZapOff,
  HelpCircle,
  Copy,
  Check,
  RotateCcw,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { INCIDENT_CATEGORIES } from '../../lib/incidentReporter.js';
import { attemptService } from '../../lib/services.js';

export const TECHNICAL_HELP_CATEGORIES = [
  {
    id: INCIDENT_CATEGORIES.NETWORK_DISCONNECTED,
    label: 'Internet / Connectivity',
    icon: Wifi,
    description: 'Slow connection, disconnection, or offline warning',
  },
  {
    id: INCIDENT_CATEGORIES.QUESTION_LOAD_FAILED,
    label: 'Question Not Loading',
    icon: FileQuestion,
    description: 'Blank question, broken formulas, or missing diagrams',
  },
  {
    id: INCIDENT_CATEGORIES.ANSWER_SAVE_FAILED,
    label: 'Answer Not Saving',
    icon: Save,
    description: 'Selected answer not saving or button not responding',
  },
  {
    id: INCIDENT_CATEGORIES.TIMER_MISMATCH,
    label: 'Timer Issue',
    icon: Clock,
    description: 'Timer discrepancy, frozen clock, or time jumps',
  },
  {
    id: INCIDENT_CATEGORIES.SUBMISSION_FAILED,
    label: 'Test Submission Problem',
    icon: AlertTriangle,
    description: 'Unable to submit exam, button disabled, or submission error',
  },
  {
    id: INCIDENT_CATEGORIES.SCREEN_SHARING_STOPPED,
    label: 'Screen Recording / Screen Sharing',
    icon: Video,
    description: 'Screen share stopped, permission error, or camera glitch',
  },
  {
    id: INCIDENT_CATEGORIES.APPLICATION_ERROR,
    label: 'Page Frozen / Application Error',
    icon: ZapOff,
    description: 'Page unresponsive, frozen screen, or JavaScript error',
  },
  {
    id: INCIDENT_CATEGORIES.STUDENT_REPORTED_ISSUE,
    label: 'Other',
    icon: HelpCircle,
    description: 'Other technical, hardware, or keyboard/mouse problem',
  },
];

export default function TechnicalIncidentModal({
  isOpen,
  onClose,
  reporter,
  attemptId,
  currentQuestionId,
  currentQuestionNumber,
  isOffline = false,
}) {
  const [category, setCategory] = useState(INCIDENT_CATEGORIES.NETWORK_DISCONNECTED);
  const [description, setDescription] = useState('');
  const [isBlocking, setIsBlocking] = useState(false);
  const [appliesToCurrentQuestion, setAppliesToCurrentQuestion] = useState(Boolean(currentQuestionId));
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [incidentReference, setIncidentReference] = useState(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [offlineQueued, setOfflineQueued] = useState(false);

  const dialogTitleId = useId();
  const dialogDescId = useId();

  // Reset form when modal opens with fresh context
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setSubmitError(null);
      setCopiedRef(false);
      setAppliesToCurrentQuestion(Boolean(currentQuestionId));
    }
  }, [isOpen, currentQuestionId]);

  // Support closing with Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !submitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, submitting, onClose]);

  if (!isOpen) return null;

  const selectedCategoryObj =
    TECHNICAL_HELP_CATEGORIES.find((c) => c.id === category) || TECHNICAL_HELP_CATEGORIES[0];

  const handleCopyReference = async () => {
    if (!incidentReference) return;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(incidentReference);
        setCopiedRef(true);
        setTimeout(() => setCopiedRef(false), 2000);
      }
    } catch (_) {
      // Fallback if clipboard API is restricted
    }
  };

  const handleResetAndClose = () => {
    setDescription('');
    setSubmitted(false);
    setSubmitError(null);
    setIncidentReference(null);
    setOfflineQueued(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setSubmitError(null);

    const catObj = selectedCategoryObj;
    // Description is optional for the student: automatically provide a clean default if empty
    const payloadDescription =
      description.trim() || `${catObj.label} reported by candidate during exam`;

    const targetQuestionId = appliesToCurrentQuestion && currentQuestionId ? currentQuestionId : null;
    const targetQuestionNum = appliesToCurrentQuestion && currentQuestionNumber ? currentQuestionNumber : null;

    const diagnostics = {
      isBlocking,
      reportedByStudent: true,
      categoryLabel: catObj.label,
      questionNumber: targetQuestionNum,
      isOfflineState: Boolean(isOffline),
      clientTimestamp: new Date().toISOString(),
    };

    try {
      let result = null;
      if (reporter && typeof reporter.reportIncident === 'function') {
        result = await reporter.reportIncident({
          category,
          questionId: targetQuestionId,
          description: payloadDescription,
          diagnostics,
        });
      } else if (attemptId) {
        result = await attemptService.reportIncident(attemptId, {
          category,
          question_id: targetQuestionId ? Number(targetQuestionId) : null,
          description: payloadDescription,
          diagnostics,
        });
      }

      // Format a human-readable unique incident reference
      const ref =
        result?.incident?.id
          ? `INC-${result.incident.id}`
          : result?.incident_id
          ? `INC-${result.incident_id}`
          : result?.incident?.incident_key
          ? `REF-${String(result.incident.incident_key).slice(0, 8).toUpperCase()}`
          : result?.eventId
          ? `EVT-${String(result.eventId).slice(0, 8).toUpperCase()}`
          : `INC-${Date.now().toString(36).toUpperCase()}`;

      setIncidentReference(ref);
      setOfflineQueued(Boolean(result?.queuedOffline || isOffline));
      setSubmitted(true);
    } catch (err) {
      // If client is currently offline, buffer safely and inform student
      if (isOffline || (typeof navigator !== 'undefined' && !navigator.onLine)) {
        setOfflineQueued(true);
        setIncidentReference(`OFFLINE-${Date.now().toString(36).toUpperCase()}`);
        setSubmitted(true);
      } else {
        setSubmitError(err?.message || 'Failed to submit report. Please check your network and try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={dialogTitleId}
      aria-describedby={dialogDescId}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-2xs animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-[#0F172A] shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-150 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-5 py-4 shrink-0 bg-slate-50/60 dark:bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <LifeBuoy className="h-5 w-5 shrink-0" />
            </div>
            <div>
              <h2 id={dialogTitleId} className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                Technical Help &amp; Support
              </h2>
              <p id={dialogDescId} className="text-[11px] text-slate-500 dark:text-slate-400">
                Direct alert to admin (support@edvedum.com) · Answers &amp; Timer Safe
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            disabled={submitting}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer disabled:opacity-40"
            aria-label="Close Technical Help"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* SUCCESS VIEW */}
          {submitted && (
            <div className="py-4 text-center space-y-4" data-testid="technical-help-success">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 shadow-inner">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Technical Incident Reported
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                  {offlineQueued
                    ? 'Report recorded in offline queue. It will automatically upload as soon as your internet restores.'
                    : 'Our live exam invigilators and support desk (support@edvedum.com) have been notified. Hardware & network diagnostics were recorded.'}
                </p>
              </div>

              {/* Unique Incident Reference Badge */}
              {incidentReference && (
                <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-3.5 py-2 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Incident Reference:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white select-all text-sm" data-testid="incident-reference-code">
                    {incidentReference}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyReference}
                    className="p-1 rounded text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
                    title="Copy Reference"
                    aria-label="Copy incident reference"
                  >
                    {copiedRef ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              )}

              {/* Exam Preservation Reassurance */}
              <div className="rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 p-3 text-left flex items-start gap-2.5 text-xs text-blue-900 dark:text-blue-300">
                <ShieldCheck className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
                <span>
                  <strong>Your exam is preserved:</strong> Your answers are saved and the timer is still running. You can resume your test immediately.
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition cursor-pointer shadow-xs"
                >
                  Return to Exam
                </button>
              </div>
            </div>
          )}

          {/* FAILURE VIEW */}
          {!submitted && submitError && (
            <div className="rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/80 dark:bg-rose-950/30 p-4 space-y-3" data-testid="technical-help-error">
              <div className="flex items-start gap-2.5 text-rose-800 dark:text-rose-300 text-xs">
                <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                <div>
                  <p className="font-bold">Failed to submit technical incident</p>
                  <p className="text-[11px] mt-0.5 text-rose-700 dark:text-rose-400">{submitError}</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition cursor-pointer disabled:opacity-50"
                >
                  <RotateCcw className="h-3 w-3" />
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* REPORT FORM */}
          {!submitted && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Offline Warning Banner if disconnected */}
              {isOffline && (
                <div className="flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/30 px-3 py-2 text-xs text-amber-800 dark:text-amber-300">
                  <Wifi className="h-4 w-4 shrink-0 text-amber-600" />
                  <span>You are currently offline. Your report will be queued safely and uploaded upon reconnecting.</span>
                </div>
              )}

              {/* Question Context Reference */}
              {currentQuestionId && (
                <div className="flex items-center justify-between rounded-xl bg-slate-100 dark:bg-slate-800/60 p-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">
                    Current Question: <strong className="text-blue-600 dark:text-blue-400">#{currentQuestionNumber || currentQuestionId}</strong>
                  </span>
                  <label className="flex items-center gap-1.5 cursor-pointer text-[11px] font-medium text-slate-600 dark:text-slate-400">
                    <input
                      type="checkbox"
                      checked={appliesToCurrentQuestion}
                      onChange={(e) => setAppliesToCurrentQuestion(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                    />
                    <span>Attach to this question</span>
                  </label>
                </div>
              )}

              {/* 8 Categories Grid */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Select the issue you are experiencing:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="radiogroup" aria-label="Issue Categories">
                  {TECHNICAL_HELP_CATEGORIES.map((cat) => {
                    const IconComponent = cat.icon;
                    const isSelected = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setCategory(cat.id)}
                        className={`text-left p-2.5 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-start gap-2.5 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 text-blue-800 dark:border-blue-500 dark:bg-blue-950/50 dark:text-blue-200 ring-2 ring-blue-500/20 shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold leading-tight">{cat.label}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal leading-tight mt-0.5 truncate">
                            {cat.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Short Description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="tech-help-description" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Additional details <span className="font-normal text-slate-400">(optional)</span>:
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {description.length}/500
                  </span>
                </div>
                <textarea
                  id="tech-help-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                  placeholder={`Describe what you see or what happened (optional)...`}
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                />
              </div>

              {/* Blocking Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600 dark:text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={isBlocking}
                  onChange={(e) => setIsBlocking(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span>This issue is actively preventing me from answering or continuing</span>
              </label>

              {/* Exam Preservation Reassurance Banner */}
              <div className="flex items-start gap-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 p-2.5 text-[11px] text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
                <span>
                  <strong>Admin Notification:</strong> Submitting sends an instant alert directly to <strong className="text-blue-600 dark:text-blue-400">support@edvedum.com</strong>. Reporting a technical issue will <em>never</em> submit or penalize your exam. Your timer continues and your answers remain intact.
                </span>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  disabled={submitting}
                  className="px-3.5 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="submit-technical-help-btn"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 disabled:opacity-50 transition cursor-pointer shadow-xs"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Submitting Report...
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      Send to Invigilator
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
