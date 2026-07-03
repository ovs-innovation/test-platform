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

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Series</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3">
                  <p className="font-medium">{p.user_name}</p>
                  <p className="text-xs text-slate-500">{p.user_email}</p>
                </td>
                <td className="px-4 py-3">{p.series_title}</td>
                <td className="px-4 py-3">₹{Number(p.amount)}</td>
                <td className="px-4 py-3">
                  <Badge color={p.status === 'success' ? 'green' : p.status === 'pending' ? 'amber' : 'red'}>{p.status}</Badge>
                </td>
                <td className="px-4 py-3 text-slate-500">{formatDateTime(p.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
