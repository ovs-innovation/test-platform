import React, { useState } from 'react';
import { RECORDING_STATUS } from '../../lib/screenRecorder.js';
import { Video, Download, Square, Check, X } from 'lucide-react';

/**
 * ScreenRecordingIndicator (Voluntary Local Student Recorder)
 *
 * Provides a clean, non-intrusive control in the exam header bar:
 * - Allows candidate to optionally record test locally
 * - Shows recording timer when active
 * - Provides immediate .webm download when stopped or exam completed
 * - 100% private to candidate: never uploaded or sent to admin
 */
export default function ScreenRecordingIndicator({
  status,
  isRecording = false,
  hasRecording = false,
  elapsedSeconds = 0,
  onStartRecording,
  onStopRecording,
  onDownload,
}) {
  const [downloadDismissed, setDownloadDismissed] = useState(false);

  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // 1. While recording is active
  if (isRecording || status === RECORDING_STATUS.RECORDING) {
    return (
      <div className="flex items-center gap-2 px-2.5 py-1 bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-800 rounded-lg text-xs font-semibold shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
        </span>
        <span className="font-bold">REC (Local)</span>
        <span className="font-mono text-[11px] opacity-90">{formatTime(elapsedSeconds)}</span>
        {onStopRecording && (
          <button
            type="button"
            onClick={onStopRecording}
            className="inline-flex items-center gap-1 ml-1 px-1.5 py-0.5 rounded bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold transition cursor-pointer"
            title="Stop recording"
          >
            <Square className="w-2.5 h-2.5 fill-current" />
            <span>Stop</span>
          </button>
        )}
      </div>
    );
  }

  // 2. Requesting display permission
  if (status === RECORDING_STATUS.REQUESTING_PERMISSION) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-semibold animate-pulse shrink-0">
        <Video className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span>Select screen in browser prompt...</span>
      </div>
    );
  }

  // 3. Stopped and has a recording available to download
  if (hasRecording && !downloadDismissed) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-semibold shrink-0">
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex items-center gap-1.5 font-bold hover:underline cursor-pointer"
          title="Save recorded video to your computer"
        >
          <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Download Test Video</span>
        </button>
        <button
          type="button"
          onClick={() => setDownloadDismissed(true)}
          className="ml-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-0.5"
          title="Dismiss"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    );
  }

  // 4. Default: Optional record button
  return (
    <button
      type="button"
      onClick={onStartRecording}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition cursor-pointer shrink-0 border border-white/20"
      title="Optionally record your test session locally for revision (not sent to admin)"
    >
      <Video className="w-3.5 h-3.5 text-blue-200" />
      <span className="hidden sm:inline">Record Test (Optional)</span>
      <span className="inline sm:hidden">Record</span>
    </button>
  );
}
