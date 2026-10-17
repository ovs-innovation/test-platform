import React from 'react';
import { CheckCircle2, RefreshCw, WifiOff, AlertTriangle, Cloud, RotateCcw } from 'lucide-react';
import { SYNC_STATUS } from '../../lib/cbtAnswerSync.js';

export default function CbtAnswerSyncIndicator({
  syncStatus,
  pendingCount = 0,
  failedCount = 0,
  isOffline = false,
  onManualRetry = null,
  submissionError = null,
  onRetrySubmission = null,
  isSubmitting = false,
  incidentRef = null,
  onOpenHelp = null,
}) {
  // Submission error modal takes top priority if submission failed
  if (submissionError) {
    return (
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="submission-error-title"
        className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      >
        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-red-200 space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h3 id="submission-error-title" className="text-lg font-black text-slate-900 leading-tight">
                Exam Submission Pending
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Network connection was interrupted during submission.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1.5">
            <p className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              Your answers are safe on this device.
            </p>
            <p className="text-slate-600 leading-relaxed">
              No answers have been lost. The platform will automatically retry once your connection is restored, or you can click below to retry immediately.
            </p>
            {incidentRef && (
              <p className="text-[11px] font-mono font-bold bg-white/80 px-2 py-1 rounded text-slate-700">
                Incident Reference: {incidentRef}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            {onOpenHelp && (
              <button
                type="button"
                onClick={onOpenHelp}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
              >
                Technical Help
              </button>
            )}
            <button
              type="button"
              onClick={onRetrySubmission}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4" />
                  Retry Submission
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Normal compact top-bar indicator
  if (syncStatus === SYNC_STATUS.SAVING) {
    return (
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-200 shadow-2xs"
        title="Syncing answer with server..."
      >
        <RefreshCw className="h-3 w-3 animate-spin text-blue-600" />
        <span className="hidden sm:inline">Saving...</span>
      </div>
    );
  }

  if (isOffline || pendingCount > 0 || syncStatus === SYNC_STATUS.FAILED || syncStatus === SYNC_STATUS.PENDING) {
    const isError = failedCount > 0 || syncStatus === SYNC_STATUS.FAILED;
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-2xs transition-colors ${
          isError
            ? 'bg-amber-50 text-amber-900 border-amber-300'
            : 'bg-slate-100 text-slate-700 border-slate-300'
        }`}
        title={
          isOffline
            ? 'Offline: Answers are safely saved locally on your device.'
            : `${pendingCount} answer(s) pending sync`
        }
      >
        {isOffline ? (
          <WifiOff className="h-3 w-3 text-amber-600 shrink-0" />
        ) : (
          <Cloud className="h-3 w-3 text-slate-500 shrink-0" />
        )}
        <span>
          {isOffline
            ? 'Saved locally'
            : pendingCount > 0
            ? `${pendingCount} pending sync`
            : 'Retrying sync...'}
        </span>
        {onManualRetry && !isOffline && (
          <button
            type="button"
            onClick={onManualRetry}
            className="ml-1 p-0.5 hover:bg-black/5 rounded text-slate-600 cursor-pointer"
            title="Retry syncing now"
          >
            <RefreshCw className="h-2.5 w-2.5" />
          </button>
        )}
      </div>
    );
  }

  // Default: All answers saved
  return (
    <div
      className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] text-emerald-700 font-semibold"
      title="All answers are safely synced with the server."
    >
      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
      <span className="hidden md:inline text-[11px] text-slate-500">All saved</span>
    </div>
  );
}
