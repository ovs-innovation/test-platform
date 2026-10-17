import React, { useState } from 'react';
import { WifiOff, MessageSquare, Check, LifeBuoy } from 'lucide-react';

export default function TechnicalIncidentStatusBanner({
  isOffline,
  guidanceMessage,
  invigilatorGuidance,
  onDismissGuidance,
  onReportIssue,
}) {
  const [dismissed, setDismissed] = useState(false);
  const activeMessage = guidanceMessage || invigilatorGuidance;

  if (isOffline) {
    return (
      <div className="bg-amber-500 text-slate-950 px-3 py-1.5 text-xs font-bold flex items-center justify-between gap-2 shadow-xs z-20">
        <div className="flex items-center gap-2 min-w-0">
          <WifiOff className="h-4 w-4 shrink-0 text-slate-950 animate-pulse" />
          <span className="truncate">
            Internet Disconnected — Offline Safe Mode Active. Your answers are buffered locally and will automatically sync when reconnected.
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {onReportIssue && (
            <button
              type="button"
              onClick={onReportIssue}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-950 text-amber-300 hover:bg-slate-900 transition text-[11px] font-bold cursor-pointer"
            >
              <LifeBuoy className="h-3 w-3" />
              Technical Help
            </button>
          )}
          <span className="text-[10px] uppercase font-black tracking-wider bg-slate-950/20 px-2 py-0.5 rounded">
            Offline
          </span>
        </div>
      </div>
    );
  }

  if (activeMessage && !dismissed) {
    return (
      <div className="bg-blue-600 text-white px-3 py-2 text-xs font-semibold flex items-center justify-between gap-3 shadow-md z-20 animate-in slide-in-from-top duration-200">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
            <MessageSquare className="h-3.5 w-3.5 text-white" />
          </div>
          <div className="min-w-0">
            <span className="font-extrabold uppercase text-[10px] tracking-wider text-blue-200 block">
              Invigilator Message:
            </span>
            <span className="text-white text-xs font-medium">
              {activeMessage}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {onReportIssue && (
            <button
              type="button"
              onClick={onReportIssue}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition shadow-xs cursor-pointer border border-blue-500"
            >
              <LifeBuoy className="h-3.5 w-3.5 text-amber-300" />
              Help
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setDismissed(true);
              if (typeof onDismissGuidance === 'function') onDismissGuidance();
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-blue-700 text-xs font-bold hover:bg-blue-50 transition shadow-xs cursor-pointer"
          >
            <Check className="h-3.5 w-3.5" />
            Got it
          </button>
        </div>
      </div>
    );
  }

  return null;
}
