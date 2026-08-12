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
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Payment & Billing History</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Test series purchases, enrollment receipts, and transaction history.
          </p>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="p-4 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl space-y-1 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Invested</p>
          <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">₹{totalSpent.toLocaleString('en-IN')}</p>
        </div>
        <div className="p-4 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl space-y-1 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Enrollments</p>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">{payments.length}</p>
        </div>
        <div className="p-4 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl space-y-1 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Successful Purchases</p>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">{payments.filter((p) => p.status === 'success').length}</p>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="space-y-4">
          <EmptyState
            title="No Payment Invoices Recorded Yet"
            message="Your official receipts, GST invoices, and test pack subscription enrollments will appear here once you purchase a test series."
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
        <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-xs">
          <DataTable
            columns={[
              { key: 'series_title', label: 'Test Series', render: (p) => <span className="font-bold text-slate-900 dark:text-white text-xs">{p.series_title}</span> },
              { key: 'amount', label: 'Amount', render: (p) => <span className="font-bold text-blue-600 dark:text-blue-400 text-xs">₹{Number(p.amount).toLocaleString('en-IN')}</span> },
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
