import { useEffect, useState } from 'react';
import { paymentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, PageHeader, StatCard, Badge } from '../../components/ui.jsx';
import { formatDateTime } from '../../lib/format.js';

export default function AdminPayments() {
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');

  const load = async () => {
    setState('loading');
    try {
      setData(await paymentService.admin());
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => { load(); }, []);

  if (state === 'loading') return <LoadingScreen label="Loading revenue…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  const { payments, summary } = data;

  return (
    <div>
      <PageHeader title="Revenue & payments" subtitle="Track all test series purchases." />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total revenue" value={`₹${Number(summary.total).toLocaleString('en-IN')}`} accent="text-emerald-600" />
        <StatCard label="Successful orders" value={summary.successful} />
        <StatCard label="Total orders" value={summary.total_orders} />
      </div>

      <div className="card overflow-hidden p-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
        <table className="w-full text-xs">
          <thead className="bg-slate-100/80 dark:bg-slate-900/80 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-4 py-3.5">Student</th>
              <th className="px-4 py-3.5">Series</th>
              <th className="px-4 py-3.5">Amount</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-[#111827]">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                <td className="px-4 py-3.5">
                  <p className="font-extrabold text-slate-900 dark:text-white">{p.user_name}</p>
                  <p className="text-[11px] font-semibold text-slate-400">{p.user_email}</p>
                </td>
                <td className="px-4 py-3.5 font-bold text-slate-700 dark:text-slate-200">{p.series_title}</td>
                <td className="px-4 py-3.5 font-black text-emerald-600 dark:text-emerald-400">₹{Number(p.amount)}</td>
                <td className="px-4 py-3.5">
                  <Badge color={p.status === 'success' ? 'green' : p.status === 'pending' ? 'amber' : 'red'}>{p.status}</Badge>
                </td>
                <td className="px-4 py-3.5 text-slate-400 font-semibold">{formatDateTime(p.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
