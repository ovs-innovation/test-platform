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
      await onRequestLicenses({ requested_quantity: requestedQty, message: requestMsg });
      toast.success(`Request for ${requestedQty} additional seats submitted to Edvedum Billing.`);
      setShowRequestModal(false);
    } catch (err) {
      toast.error(err.message || 'Failed to submit licence request.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* HEADER */}
      <div className={`rounded-3xl border p-6 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-[#071126] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div>
          <h2 className={`text-lg sm:text-xl font-extrabold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <CreditCard className="h-5 w-5 text-cyan-400" />
            <span>Payments, GST Invoices & Licence Allocation</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Manage your institution package subscription, view GST tax invoices, and request additional student seats.
          </p>
        </div>

        <button
          onClick={() => setShowRequestModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-md hover:scale-105 transition cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Request Additional Licences</span>
        </button>
      </div>

      {/* PACKAGE & LICENCE SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Package Active */}
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-[#071126] border-slate-800' : 'bg-white border-slate-200'}`}>
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">Purchased Package</span>
          <h3 className="text-base font-extrabold text-white">NEET-UG 2027 AIETS Institutional Gold Package</h3>
          <p className="text-xs text-slate-400 mt-1">Valid until: <span className="font-bold text-white">31 March 2027</span></p>
        </div>

        {/* Licence Breakdown */}
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-[#071126] border-slate-800' : 'bg-white border-slate-200'}`}>
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Licence Allocation</span>
          <p className="text-2xl font-black text-white">{usedLic} Used • {availLic} Available</p>
          <p className="text-xs text-slate-400 mt-1">Total Capacity: <span className="font-bold text-white">{totalLic} Seats</span></p>
        </div>

        {/* Billing Status */}
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-[#071126] border-slate-800' : 'bg-white border-slate-200'}`}>
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1">Payment Status</span>
          <p className="text-2xl font-black text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span>Paid in Full</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">GST Tax Invoice Generated</p>
        </div>

      </div>

      {/* GST INVOICES TABLE */}
      <div className={`rounded-3xl border overflow-hidden shadow-xl p-6 space-y-4 ${
        isDarkMode ? 'bg-[#071126] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <h3 className="text-base font-extrabold flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-cyan-400" />
          <span>GST Invoices & Payment History</span>
        </h3>

        {invoices.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className={`border-b text-[11px] font-extrabold uppercase ${
                isDarkMode ? 'border-slate-800 text-slate-400 bg-slate-950/50' : 'border-slate-200 text-slate-600 bg-slate-100'
              }`}>
                <tr>
                  <th className="py-3 px-4">Invoice Number</th>
                  <th className="py-3 px-4">Package Name</th>
                  <th className="py-3 px-4">Licences</th>
                  <th className="py-3 px-4">Amount (Incl. GST)</th>
                  <th className="py-3 px-4">Payment Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">{inv.invoice_number}</td>
                    <td className="py-3.5 px-4 font-bold text-white">{inv.package_name}</td>
                    <td className="py-3.5 px-4 text-slate-300">{inv.license_quantity} Seats</td>
                    <td className="py-3.5 px-4 font-black text-emerald-400">₹{Number(inv.total_amount || 0).toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-slate-400">{new Date(inv.payment_date).toLocaleDateString()}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => toast.success(`Downloading invoice ${inv.invoice_number}...`)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-bold text-cyan-400 hover:bg-slate-700 transition cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-400 py-4 text-center">No billing invoice records found.</p>
        )}
      </div>

      {/* REQUEST LICENCES MODAL */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 space-y-5 ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className="text-lg font-extrabold text-white">Request Additional Student Licences</h3>

            <form onSubmit={handleRequestSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-slate-300 mb-1">Additional Seats Required *</label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  required
                  value={requestedQty}
                  onChange={(e) => setRequestedQty(Number(e.target.value))}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-300 mb-1">Additional Requirements / Notes</label>
                <textarea
                  rows="3"
                  placeholder="Mention target batch or academic stream..."
                  value={requestMsg}
                  onChange={(e) => setRequestMsg(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 font-bold text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-white shadow-md hover:scale-105"
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
