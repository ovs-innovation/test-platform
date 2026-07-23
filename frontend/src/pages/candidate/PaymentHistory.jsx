import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { paymentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, PageHeader, Badge, DataTable, EmptyState } from '../../components/ui.jsx';
import { formatDateTime } from '../../lib/format.js';

const statusColor = { success: 'green', pending: 'amber', failed: 'red' };

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [state, setState] = useState('loading');

  const load = async () => {
    setState('loading');
    try {
      setPayments(await paymentService.history());
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => { load(); }, []);

  if (state === 'loading') return <LoadingScreen label="Loading payment history…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  const totalSpent = payments.filter((p) => p.status === 'success').reduce((s, p) => s + Number(p.amount), 0);

  return (
    <div className="space-y-6 pb-12">
      <PageHeader title="Payment History" subtitle="All your test series purchases, receipts, and order invoices." />

      {/* Always-visible Summary Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-5 shadow-xl">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Invested</p>
          <p className="mt-2 text-3xl font-extrabold text-cyan-300 tabular-nums">₹{totalSpent.toLocaleString('en-IN')}</p>
        </div>
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-5 shadow-xl">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Orders</p>
          <p className="mt-2 text-3xl font-extrabold text-white tabular-nums">{payments.length}</p>
        </div>
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-5 shadow-xl">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Successful Purchases</p>
          <p className="mt-2 text-3xl font-extrabold text-emerald-400 tabular-nums">{payments.filter((p) => p.status === 'success').length}</p>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="space-y-6">
          <EmptyState
            title="No Payment Invoices Recorded Yet"
            message="Your official receipts, GST invoices, and test pack subscription orders will appear here once you purchase a test series."
            action={
              <Link
                to="/test-series"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-6 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition hover:scale-105"
              >
                Browse Test Series Catalog →
              </Link>
            }
          />
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-800/90 bg-[#0b1430] shadow-2xl">
          <DataTable
            columns={[
              { key: 'series_title', label: 'Test Series', render: (p) => <span className="font-extrabold text-white">{p.series_title}</span> },
              { key: 'amount', label: 'Amount', render: (p) => <span className="font-extrabold text-cyan-300">₹{Number(p.amount).toLocaleString('en-IN')}</span> },
              { key: 'status', label: 'Status', render: (p) => <Badge color={statusColor[p.status] || 'slate'}>{p.status}</Badge> },
              { key: 'created_at', label: 'Date', render: (p) => <span className="text-slate-400 font-medium">{formatDateTime(p.created_at)}</span> },
            ]}
            rows={payments}
          />
        </div>
      )}
    </div>
  );
}
