import { useEffect, useState } from 'react';
import { paymentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, PageHeader, Badge, DataTable } from '../../components/ui.jsx';
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

  if (state === 'loading') return <LoadingScreen label="Loading payments…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  const totalSpent = payments.filter((p) => p.status === 'success').reduce((s, p) => s + Number(p.amount), 0);

  return (
    <div>
      <PageHeader title="Payment history" subtitle="All your test series purchases and invoices." />

      {payments.length > 0 && (
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="card p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Total spent</p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">₹{totalSpent.toLocaleString('en-IN')}</p>
          </div>
          <div className="card p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Orders</p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{payments.length}</p>
          </div>
          <div className="card p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Successful</p>
            <p className="mt-1 text-2xl font-bold text-emerald-600">{payments.filter((p) => p.status === 'success').length}</p>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <DataTable
          columns={[
            { key: 'series_title', label: 'Test series', render: (p) => <span className="font-medium text-slate-900 dark:text-white">{p.series_title}</span> },
            { key: 'amount', label: 'Amount', render: (p) => `₹${Number(p.amount).toLocaleString('en-IN')}` },
            { key: 'status', label: 'Status', render: (p) => <Badge color={statusColor[p.status] || 'slate'}>{p.status}</Badge> },
            { key: 'created_at', label: 'Date', render: (p) => <span className="text-muted">{formatDateTime(p.created_at)}</span> },
          ]}
          rows={payments}
          emptyMessage="No payments yet. Browse test series to get started."
        />
      </div>
    </div>
  );
}
