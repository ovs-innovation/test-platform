import { useEffect, useState } from 'react';
import { paymentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, Badge } from '../../components/ui.jsx';
import { AdminHeader, AdminMetricRail } from '../../components/admin/AdminUI.jsx';
import { formatDateTime } from '../../lib/format.js';
import { RefreshCw, ShieldCheck } from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';

export default function AdminPayments() {
  const toast = useToast();
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');
  const [reconciling, setReconciling] = useState(false);

  const load = async () => {
    setState('loading');
    try {
      setData(await paymentService.admin());
      setState('done');
    } catch {
      setState('error');
    }
  };

  const handleReconcile = async () => {
    setReconciling(true);
    try {
      const res = await paymentService.adminReconcile();
      toast.success(
        `Reconciliation completed. Reconciled: ${res?.result?.reconciledCount || 0}, Failed: ${res?.result?.failedCount || 0}`
      );
      await load();
    } catch (err) {
      toast.error(err.message || 'Reconciliation failed');
    } finally {
      setReconciling(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (state === 'loading') return <LoadingScreen label="Loading revenue & payments…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  const { payments, summary } = data;

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <AdminHeader
          title="Revenue & Gateway Transactions"
          subtitle="Track candidate test series enrollments, verified PhonePe orders, and financial metrics."
          breadcrumbs={['Revenue Operations']}
          status="PhonePe Standard Checkout v2 Active"
        />

        <div className="flex items-center gap-2">
          <button
            onClick={handleReconcile}
            disabled={reconciling}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow hover:bg-slate-800 dark:hover:bg-slate-100 transition disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${reconciling ? 'animate-spin' : ''}`} />
            <span>{reconciling ? 'Reconciling...' : 'Run PhonePe Reconciliation'}</span>
          </button>
        </div>
      </div>

      <AdminMetricRail
        items={[
          {
            label: 'Total Verified Revenue',
            value: `₹${Number(summary.total || 0).toLocaleString('en-IN')}`,
            trend: '14.2%',
            trendUp: true,
            subtext: 'all-time verified volume',
          },
          {
            label: 'Successful Enrollments',
            value: summary.successful || 0,
            trend: '98.5%',
            trendUp: true,
            subtext: 'active paid students',
          },
          {
            label: 'PhonePe Orders',
            value: summary.phonepe_orders || 0,
            subtext: 'Standard v2 transactions',
          },
          {
            label: 'Total Payment Attempts',
            value: summary.total_orders || 0,
            subtext: 'all gateways combined',
          },
        ]}
      />

      {/* Mobile Card List (<md) */}
      <div className="space-y-3 md:hidden">
        {payments.map((p) => {
          const studentName = p.user_name || p.candidate_name || p.name || 'Candidate';
          const studentEmail = p.user_email || p.candidate_email || p.email || 'candidate@edvedum.ac.in';

          return (
            <div
              key={p.id}
              className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-4 shadow-xs space-y-2.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                    {studentName}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {studentEmail}
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                    {p.merchant_order_id || p.razorpay_order_id || `#${p.id}`}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <Badge color={p.status === 'success' ? 'green' : p.status === 'pending' ? 'amber' : 'red'}>
                    {p.status}
                  </Badge>
                  <span className="block text-[10px] font-bold text-slate-500">
                    {p.provider === 'phonepe' ? 'PhonePe' : p.provider === 'razorpay' ? 'Razorpay' : 'Direct'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                <span className="font-bold text-slate-800 dark:text-slate-200">{p.series_title}</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                  ₹{Number(p.amount)}
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-400 text-right">
                {formatDateTime(p.created_at)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View (md+) */}
      <div className="hidden md:block card overflow-hidden p-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xs">
        <div className="w-full overflow-x-auto scrollbar-thin">
          <table className="w-full text-xs min-w-[750px]">
            <thead className="bg-slate-100/80 dark:bg-slate-900/80 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Student</th>
                <th className="px-4 py-3.5">Order Ref</th>
                <th className="px-4 py-3.5">Gateway</th>
                <th className="px-4 py-3.5">Series</th>
                <th className="px-4 py-3.5">Amount</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-[#111827]">
              {payments.map((p) => {
                const studentName = p.user_name || p.candidate_name || p.name || 'Candidate';
                const studentEmail = p.user_email || p.candidate_email || p.email || 'candidate@edvedum.ac.in';

                return (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="px-4 py-3.5">
                      <p className="font-extrabold text-slate-900 dark:text-white">{studentName}</p>
                      <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{studentEmail}</p>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[11px] text-slate-500">
                      {p.merchant_order_id || p.razorpay_order_id || `#${p.id}`}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
                        {p.provider === 'phonepe' ? (
                          <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px]">
                            PhonePe
                          </span>
                        ) : p.provider === 'razorpay' ? (
                          <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px]">
                            Razorpay
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-slate-500/10 text-slate-600 text-[10px]">
                            Direct / Free
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-slate-700 dark:text-slate-200">{p.series_title}</td>
                    <td className="px-4 py-3.5 font-black text-emerald-600 dark:text-emerald-400">
                      ₹{Number(p.amount)}
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge color={p.status === 'success' ? 'green' : p.status === 'pending' ? 'amber' : 'red'}>
                        {p.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 text-slate-400 font-semibold">{formatDateTime(p.created_at)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
