import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { paymentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, PageHeader, Badge, DataTable, EmptyState } from '../../components/ui.jsx';
import { formatDateTime } from '../../lib/format.js';
import { CreditCard, Compass } from 'lucide-react';

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
    <div className="space-y-4 max-w-[1440px] mx-auto pb-12">
      <PageHeader title="Payment History" subtitle="All your test series purchases, receipts, and order invoices." />

      {/* Summary Stats Cards */}
      <div className="grid gap-2.5 sm:grid-cols-3">
        <div className="saas-card p-3.5 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-0.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Invested</p>
          <p className="text-xl font-black text-[#2563eb] dark:text-cyan-300 tabular-nums">₹{totalSpent.toLocaleString('en-IN')}</p>
        </div>
        <div className="saas-card p-3.5 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-0.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Orders</p>
          <p className="text-xl font-black text-slate-900 dark:text-white tabular-nums">{payments.length}</p>
        </div>
        <div className="saas-card p-3.5 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-0.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Successful Purchases</p>
          <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">{payments.filter((p) => p.status === 'success').length}</p>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="space-y-4">
          <EmptyState
            title="No Payment Invoices Recorded Yet"
            message="Your official receipts, GST invoices, and test pack subscription orders will appear here once you purchase a test series."
            action={
              <Link
                to="/test-series"
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-md hover:bg-blue-500 transition"
              >
                <Compass className="h-4 w-4" />
                <span>Browse Test Series Catalog →</span>
              </Link>
            }
          />
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#111827]">
          <DataTable
            columns={[
              { key: 'series_title', label: 'Test Series', render: (p) => <span className="font-extrabold text-slate-900 dark:text-white">{p.series_title}</span> },
              { key: 'amount', label: 'Amount', render: (p) => <span className="font-extrabold text-blue-600 dark:text-cyan-300">₹{Number(p.amount).toLocaleString('en-IN')}</span> },
              { key: 'status', label: 'Status', render: (p) => <Badge color={statusColor[p.status] || 'slate'}>{p.status}</Badge> },
              { key: 'created_at', label: 'Date', render: (p) => <span className="text-slate-500 dark:text-slate-400 font-medium text-xs">{formatDateTime(p.created_at)}</span> },
            ]}
            rows={payments}
          />
        </div>
      )}
    </div>
  );
}
