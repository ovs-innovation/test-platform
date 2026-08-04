import { useState } from 'react';
import { CreditCard, Download, ShieldCheck, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '../../../context/ToastContext.jsx';

export default function PaymentsTab({
  institution,
  invoices = [],
  onRequestLicenses,
  isDarkMode = true,
}) {
  const toast = useToast();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestedQty, setRequestedQty] = useState(50);
  const [requestMsg, setRequestMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const totalLic = institution?.total_licenses || 50;
  const usedLic = institution?.used_licenses || 0;
  const availLic = Math.max(0, totalLic - usedLic);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (onRequestLicenses) {
        await onRequestLicenses({ requested_quantity: requestedQty, message: requestMsg });
      }
      toast.success(`Request for ${requestedQty} additional seats submitted to Edvedum Billing.`);
      setShowRequestModal(false);
    } catch (err) {
      toast.error(err.message || 'Licence request submitted.');
      setShowRequestModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* HEADER */}
      <div className={`rounded-3xl border p-6 backdrop-blur-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
            <CreditCard className="h-3.5 w-3.5" />
            <span>Institutional Subscriptions</span>
          </div>
          <h2 className={`text-lg sm:text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Payments, GST Invoices & Licence Allocation
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Manage your institution package subscription, view GST tax invoices, and request additional student seats.
          </p>
        </div>

        <button
          onClick={() => setShowRequestModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:scale-105 transition cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Request Additional Licences</span>
        </button>
      </div>

      {/* PACKAGE & LICENCE SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'}`}>
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">Purchased Package</span>
          <h3 className={`text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            NEET-UG 2027 AIETS Institutional Gold Package
          </h3>
          <p className="text-xs text-slate-400 mt-1">Valid until: <strong className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>31 March 2027</strong></p>
        </div>

        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'}`}>
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Licence Allocation</span>
          <p className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{usedLic} Used • {availLic} Available</p>
          <p className="text-xs text-slate-400 mt-1">Total Capacity: <strong className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{totalLic} Seats</strong></p>
        </div>

        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'}`}>
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1">Payment Status</span>
          <p className="text-2xl font-black text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span>Paid in Full</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">GST Tax Invoice Generated</p>
        </div>
      </div>

      {/* REQUEST LICENCES MODAL */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 space-y-5 ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Request Additional Student Licences
            </h3>

            <form onSubmit={handleRequestSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-400 mb-1">Additional Seats Required</label>
                <input
                  type="number"
                  min={10}
                  max={1000}
                  value={requestedQty}
                  onChange={(e) => setRequestedQty(Number(e.target.value))}
                  className={`w-full py-2.5 px-3 rounded-xl border transition ${
                    isDarkMode ? 'border-slate-800 bg-slate-900 text-white' : 'border-slate-200 bg-slate-100 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">Request Notes (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Reason for expansion or purchase order details..."
                  value={requestMsg}
                  onChange={(e) => setRequestMsg(e.target.value)}
                  className={`w-full py-2.5 px-3 rounded-xl border transition ${
                    isDarkMode ? 'border-slate-800 bg-slate-900 text-white' : 'border-slate-200 bg-slate-100 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className={`px-4 py-2 rounded-xl border font-bold ${
                    isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 font-bold text-white hover:bg-blue-500 shadow-md"
                >
                  {submitting ? 'Submitting...' : 'Submit Expansion Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
