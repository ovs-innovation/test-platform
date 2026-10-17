import React from 'react';
import { Video, Lock, CheckCircle2, X } from 'lucide-react';

/**
 * ScreenShareConsentModal (Optional Student Local Recording)
 *
 * Allows the student to optionally record their test session for personal study/revision.
 * Completely private and voluntary: never sent to administrators or external servers.
 */
export default function ScreenShareConsentModal({
  isOpen,
  errorMessage,
  onConfirm,
  onDismiss,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800 dark:text-white">
                Record Your Test Session? (Optional)
              </h2>
              <p className="text-xs text-slate-500">Personal study &amp; revision video</p>
            </div>
          </div>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Close and continue without recording"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content body */}
        <div className="p-6 space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {errorMessage && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-800 dark:text-amber-300 font-medium">
              {errorMessage}
            </div>
          )}

          <p>
            You have the option to record your screen during this test session for your own practice, revision, and performance analysis.
          </p>

          <div className="bg-emerald-50/80 dark:bg-emerald-950/30 rounded-xl p-3.5 border border-emerald-200/80 dark:border-emerald-800/50 space-y-2">
            <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 text-xs">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>100% Private &amp; Local to Your Device</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-emerald-900/90 dark:text-emerald-200/90 pl-1">
              <li>Your recording is saved <strong>only on your local computer</strong>.</li>
              <li>It is <strong>never transmitted to administrators or servers</strong>.</li>
              <li>When your test is finished, you can download the video file directly.</li>
              <li>Recording is <strong>completely voluntary</strong> — you can skip this without penalty.</li>
            </ul>
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
            >
              No Thanks / Skip
            </button>
          )}
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
          >
            <Video className="w-4 h-4" />
            <span>Record My Test Locally</span>
          </button>
        </div>
      </div>
    </div>
  );
}
