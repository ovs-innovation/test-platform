import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Layers,
  CheckCircle2,
  Users,
  Check
} from 'lucide-react';
import { institutionDashboardService } from '../../../lib/services.js';
import { useToast } from '../../../context/ToastContext.jsx';

export default function AssignCustomTestModal({
  isOpen,
  onClose,
  test,
  instId,
  batches = [],
  onAssigned,
  isDarkMode = true,
}) {
  const toast = useToast();
  const [assignOption, setAssignOption] = useState('batch');
  const [selectedBatchIds, setSelectedBatchIds] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (test && Array.isArray(test.assignments)) {
      const existingBatchIds = test.assignments
        .filter((a) => a.assigned_to_type === 'batch')
        .map((a) => Number(a.assigned_to_id));
      const hasAll = test.assignments.some((a) => a.assigned_to_type === 'institution');

      if (hasAll) {
        setAssignOption('all');
      } else if (existingBatchIds.length > 0) {
        setAssignOption('batch');
        setSelectedBatchIds(existingBatchIds);
      } else {
        setAssignOption('batch');
        if (batches.length > 0) setSelectedBatchIds([batches[0].id]);
      }
    } else if (batches.length > 0) {
      setSelectedBatchIds([batches[0].id]);
    }
  }, [test, batches]);

  const toggleBatch = (bId) => {
    setSelectedBatchIds((prev) =>
      prev.includes(bId) ? prev.filter((id) => id !== bId) : [...prev, bId]
    );
  };

  const handleSave = async () => {
    if (assignOption === 'batch' && selectedBatchIds.length === 0) {
      toast.error('Please select at least one batch.');
      return;
    }

    setSubmitting(true);
    try {
      await institutionDashboardService.assignCustomTest(instId, test.id, {
        assign_to: assignOption,
        batch_ids: assignOption === 'batch' ? selectedBatchIds : [],
      });

      toast.success(`Assignments for "${test.title}" updated successfully.`);
      if (onAssigned) onAssigned();
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to update assignments.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || !test) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden flex flex-col ${
          isDarkMode ? 'bg-[#0B1528] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="p-5 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between">
          <div>
            <h3 className="text-base font-black">Assign Custom Test</h3>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{test.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="space-y-2 text-xs font-bold text-slate-300">
            <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl hover:bg-slate-900">
              <input
                type="radio"
                name="assignOpt"
                value="batch"
                checked={assignOption === 'batch'}
                onChange={() => setAssignOption('batch')}
                className="accent-indigo-600"
              />
              <span>Assign to Specific Academic Batches</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl hover:bg-slate-900">
              <input
                type="radio"
                name="assignOpt"
                value="all"
                checked={assignOption === 'all'}
                onChange={() => setAssignOption('all')}
                className="accent-indigo-600"
              />
              <span>Assign to All Students in Institution</span>
            </label>
          </div>

          {assignOption === 'batch' && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[11px] font-bold text-slate-400">Select Batches:</span>
              <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
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
                      <span>{b.batch_name || b.name}</span>
                      <span
                        className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-indigo-500 bg-indigo-600 text-white' : 'border-slate-700'
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-900"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={submitting}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            {submitting ? 'Saving...' : 'Save Assignments'}
          </button>
        </div>
      </div>
    </div>
  );
}
