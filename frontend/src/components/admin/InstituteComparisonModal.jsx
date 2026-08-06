import { useState, useEffect } from 'react';
import { X, Building2, Download, CheckCircle2, TrendingUp, Users, Award, Percent, Layers } from 'lucide-react';
import { adminService } from '../../lib/services.js';
import { useToast } from '../../context/ToastContext.jsx';
import { Spinner } from '../ui.jsx';

export default function InstituteComparisonModal({ selectedSchoolIds = [], onClose, isDarkMode = true }) {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [comparisonData, setComparisonData] = useState([]);

  useEffect(() => {
    if (selectedSchoolIds.length > 0) {
      setLoading(true);
      adminService
        .compareInstitutes(selectedSchoolIds)
        .then((res) => setComparisonData(res.schools || []))
        .catch(() => {
          toast.error('Failed to compare selected institutions');
          setComparisonData([]);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedSchoolIds]);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`w-full max-w-5xl rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 ${
        isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Partner School Side-by-Side Comparison</h3>
              <p className="text-xs text-slate-400">Comparing performance & roster metrics across {selectedSchoolIds.length} partner institutes</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* COMPARISON BODY */}
        {loading ? (
          <div className="p-12 text-center">
            <Spinner className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
            <p className="text-xs font-bold text-slate-400">Generating multi-institute comparison report...</p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {comparisonData.map((s) => (
                <div key={s.school_id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                      {s.school_name ? s.school_name.substring(0, 3).toUpperCase() : 'SCH'}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-white truncate">{s.school_name}</h4>
                      <p className="text-[10px] font-mono text-cyan-400">Code: {s.code}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Enrolled / Licenses:</span>
                      <span className="font-bold text-white">{s.enrolled_students} / {s.total_licenses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Utilization Rate:</span>
                      <span className="font-bold text-cyan-400">{s.license_utilization}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Batches Count:</span>
                      <span className="font-bold text-purple-400">{s.batch_count}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-800/60 pt-2">
                      <span className="text-slate-400">Mean Score %:</span>
                      <span className="font-black text-emerald-400 text-sm">{s.average_score}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Participation Rate:</span>
                      <span className="font-bold text-slate-300">{s.participation_rate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Platform Rank Avg:</span>
                      <span className="font-mono font-bold text-amber-400">#{s.platform_rank_avg}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* COMPARISON METRICS TABLE */}
            <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/60">
              <div className="p-4 border-b border-slate-800">
                <h4 className="text-xs font-extrabold uppercase text-slate-300">Detailed Comparison Matrix</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 border-b border-slate-800 text-[11px] font-extrabold uppercase text-slate-400">
                    <tr>
                      <th className="p-3.5">Institution Name</th>
                      <th className="p-3.5">Roster</th>
                      <th className="p-3.5">Active %</th>
                      <th className="p-3.5">Avg Score</th>
                      <th className="p-3.5">Participation %</th>
                      <th className="p-3.5">Improvement Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {comparisonData.map((s) => (
                      <tr key={s.school_id} className="hover:bg-slate-800/40">
                        <td className="p-3.5 font-bold text-white">{s.school_name}</td>
                        <td className="p-3.5 text-slate-300">{s.enrolled_students}</td>
                        <td className="p-3.5 font-bold text-cyan-400">{s.license_utilization}%</td>
                        <td className="p-3.5 font-black text-emerald-400">{s.average_score}%</td>
                        <td className="p-3.5 text-slate-300">{s.participation_rate}%</td>
                        <td className="p-3.5 font-bold text-purple-400">{s.improvement_trend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* MODAL FOOTER */}
        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800 transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
