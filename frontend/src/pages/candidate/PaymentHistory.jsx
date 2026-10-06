import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { paymentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, Badge, DataTable, EmptyState } from '../../components/ui.jsx';
import { formatDateTime } from '../../lib/format.js';
import { Compass, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

const statusColor = { success: 'green', pending: 'amber', failed: 'red' };
const feeStatusLabel = { fully_paid: 'Fully Paid', partially_paid: 'Partially Paid', unpaid: 'Unpaid' };
const feeStatusColor = { fully_paid: 'green', partially_paid: 'amber', unpaid: 'red' };
const money = (paise) => `₹${(Number(paise || 0) / 100).toLocaleString('en-IN', {
  minimumFractionDigits: Number(paise || 0) % 100 ? 2 : 0,
  maximumFractionDigits: 2,
})}`;

export default function PaymentHistory() {
  const [data, setData] = useState({ payments: [], fee_summaries: [] });
  const [state, setState] = useState('loading');
  const [expandedEnrollment, setExpandedEnrollment] = useState(null);

  const load = async () => {
    setState('loading');
    try {
      setData(await paymentService.history(true));
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => { load(); }, []);

  if (state === 'loading') return <LoadingScreen label="Loading payment history…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  const { payments = [], fee_summaries: feeSummaries = [] } = data || {};
  const totalPaidPaise = feeSummaries.reduce((sum, item) => sum + Number(item.total_paid_paise || 0), 0);
  const totalRemaining = feeSummaries.reduce((sum, item) => sum + Number(item.remaining_fee_paise || 0), 0);
  const successfulCount = feeSummaries.filter((item) => item.status === 'fully_paid').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Payment & Billing History</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Online purchases, admin-recorded installments, remaining fees, and payment history.
          </p>
        </div>
        <button type="button" onClick={load} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <div className="p-4 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl space-y-1 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Paid</p>
          <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">{money(totalPaidPaise)}</p>
        </div>
        <div className="p-4 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl space-y-1 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Remaining Fee</p>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">{money(totalRemaining)}</p>
        </div>
        <div className="p-4 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl space-y-1 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Course Fee Records</p>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">{feeSummaries.length}</p>
        </div>
        <div className="p-4 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl space-y-1 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Fully Paid Courses</p>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">{successfulCount}</p>
        </div>
      </div>

      {feeSummaries.length === 0 && payments.length === 0 ? (
        <div className="space-y-4">
          <EmptyState
            title="No Payment Records Yet"
            message="Your course fees, online transactions, and admin-recorded installments will appear here."
            action={
              <Link
                to="/test-series"
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-500 transition"
              >
                <Compass className="h-4 w-4" />
                <span>Browse Test Series Catalog →</span>
              </Link>
            }
          />
        </div>
      ) : (
        <>
          {feeSummaries.length > 0 && (
            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs dark:border-slate-800 dark:bg-[#0F172A]">
              <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">Course Fee Summary</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[880px] text-left text-xs">
                  <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                    <tr>
                      <th className="px-4 py-3">Test Series / Course</th>
                      <th className="px-4 py-3">Total Fee</th>
                      <th className="px-4 py-3">Total Paid</th>
                      <th className="px-4 py-3">Remaining Fee</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Next Due</th>
                      <th className="px-4 py-3">History</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                    {feeSummaries.map((fee) => {
                      const expanded = String(expandedEnrollment) === String(fee.enrollment_id);
                      const history = fee.history || [];
                      return (
                        <PaymentSummaryRows
                          key={fee.enrollment_id}
                          fee={fee}
                          expanded={expanded}
                          history={history}
                          onToggle={() => setExpandedEnrollment(expanded ? null : fee.enrollment_id)}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {payments.some((payment) => payment.status !== 'success' || !payment.enrollment_id) && (
            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs dark:border-slate-800 dark:bg-[#0F172A]">
              <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">Online Payment Attempts</h2>
                <p className="mt-1 text-[10px] text-slate-500">Pending and failed attempts, plus any verified payment not linked to a course enrollment.</p>
              </div>
              <DataTable
                columns={[
                  { key: 'series_title', label: 'Test Series', render: (payment) => <div><span className="block text-xs font-bold text-slate-900 dark:text-white">{payment.series_title || 'Enrolled Course/Mock'}</span><span className="font-mono text-[10px] text-slate-400">{payment.merchant_order_id || payment.razorpay_order_id || `#${payment.id}`}</span></div> },
                  { key: 'provider', label: 'Payment Source', render: (payment) => <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Online — {payment.provider === 'razorpay' ? 'Razorpay' : 'PhonePe'}</span> },
                  { key: 'amount', label: 'Attempted Amount', render: (payment) => <span className="text-xs font-bold text-slate-700 dark:text-slate-300">₹{Number(payment.amount).toLocaleString('en-IN')}</span> },
                  { key: 'status', label: 'Status', render: (payment) => <Badge color={statusColor[payment.status] || 'slate'}>{payment.status}</Badge> },
                  { key: 'created_at', label: 'Date', render: (payment) => <span className="text-xs text-slate-500">{formatDateTime(payment.created_at)}</span> },
                  { key: 'action', label: 'Action', render: (payment) => payment.status === 'pending' && payment.merchant_order_id ? <Link to={`/payment/status?merchantOrderId=${payment.merchant_order_id}`} className="rounded-lg bg-amber-500/10 px-2.5 py-1 text-[11px] font-bold text-amber-600">Check Status</Link> : <span className="text-[11px] text-slate-400">—</span> },
                ]}
                rows={payments.filter((payment) => payment.status !== 'success' || !payment.enrollment_id)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function PaymentSummaryRows({ fee, expanded, history, onToggle }) {
  return (
    <>
      <tr className="text-slate-700 dark:text-slate-200">
        <td className="px-4 py-3.5"><span className="block font-extrabold text-slate-900 dark:text-white">{fee.series_title || 'Course'}</span><span className="text-[10px] text-slate-500">{fee.source === 'mixed' ? 'Online + Admin recorded' : fee.source === 'manual' ? 'Admin recorded' : 'Online payment'}</span></td>
        <td className="px-4 py-3.5 font-semibold">{money(fee.total_fee_paise)}</td>
        <td className="px-4 py-3.5 font-extrabold text-emerald-700 dark:text-emerald-300">{money(fee.total_paid_paise)}</td>
        <td className="px-4 py-3.5 font-semibold">{money(fee.remaining_fee_paise)}</td>
        <td className="px-4 py-3.5"><Badge color={feeStatusColor[fee.status] || 'slate'}>{feeStatusLabel[fee.status] || fee.status}</Badge></td>
        <td className="px-4 py-3.5 whitespace-nowrap text-slate-500">{fee.next_due_date ? formatDateTime(fee.next_due_date) : '—'}</td>
        <td className="px-4 py-3.5"><button type="button" onClick={onToggle} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[10px] font-extrabold text-blue-700 hover:bg-blue-50 dark:border-slate-700 dark:text-blue-300 dark:hover:bg-slate-800">{expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}{expanded ? 'Hide' : `View (${history.length})`}</button></td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={7} className="bg-slate-50/70 px-4 py-4 dark:bg-slate-900/50">
            {history.length === 0 ? <p className="text-xs text-slate-500">No payments recorded yet.</p> : (
              <div className="space-y-2">
                {history.map((entry) => (
                  <div key={`${entry.source}-${entry.id}`} className="flex flex-wrap items-start justify-between gap-2 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-[#0F172A]">
                    <div>
                      <p className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                        {entry.source === 'online' ? `Online — ${entry.provider === 'razorpay' ? 'Razorpay' : 'PhonePe'}` : entry.entry_type === 'reversal' ? `Correction reversal (entry #${entry.reversed_entry_id})` : `Admin payment — ${entry.payment_mode?.replace('_', ' ') || 'Payment'}`}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">{entry.payment_date ? formatDateTime(entry.payment_date) : '—'}{entry.reference ? ` · Ref: ${entry.reference}` : ''}{entry.admin_name ? ` · Recorded by ${entry.admin_name}` : ''}</p>
                      {entry.correction_reason && <p className="mt-1 text-[10px] text-rose-700 dark:text-rose-300">Correction reason: {entry.correction_reason}</p>}
                      {entry.notes && <p className="mt-1 text-[10px] text-slate-600 dark:text-slate-400">{entry.notes}</p>}
                    </div>
                    <span className={`text-xs font-black ${Number(entry.amount_paise) < 0 ? 'text-rose-600' : 'text-emerald-700 dark:text-emerald-300'}`}>{money(entry.amount_paise)}</span>
                  </div>
                ))}
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
