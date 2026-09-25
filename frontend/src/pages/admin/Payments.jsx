import { useEffect, useState, useMemo } from 'react';
import { paymentService, clearCache } from '../../lib/services.js';
import { LoadingScreen, ErrorState, Badge } from '../../components/ui.jsx';
import { AdminHeader } from '../../components/admin/AdminUI.jsx';
import { formatDateTime } from '../../lib/format.js';
import {
  RefreshCw,
  Search,
  Trash2,
  Check,
  Copy,
  AlertTriangle,
  X,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import Modal from '../../components/Modal.jsx';

export default function AdminPayments() {
  const toast = useToast();
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');

  // Filters & Search
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'success' | 'pending' | 'failed'

  // Delete Action Modal
  const [paymentToDelete, setPaymentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const load = async (silent = false) => {
    if (!silent) setState('loading');
    try {
      clearCache('payment_admin');
      const res = await paymentService.admin();
      setData(res);
      setState('done');
    } catch {
      if (!silent) setState('error');
    }
  };

  const handleCopy = (text, id) => {
    if (!text) return;
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleDeletePayment = async () => {
    if (!paymentToDelete) return;
    setIsDeleting(true);
    try {
      await paymentService.adminDelete(paymentToDelete.id);
      toast.success(`Payment #${paymentToDelete.id} deleted successfully`);
      setPaymentToDelete(null);
      await load(true);
    } catch (err) {
      toast.error(err.message || 'Failed to delete payment record');
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Filtered Payments List
  const filteredPayments = useMemo(() => {
    if (!data?.payments) return [];

    return data.payments.filter((p) => {
      // 1. Status Filter
      if (statusFilter !== 'all' && p.status !== statusFilter) {
        return false;
      }

      // 2. Search Filter
      if (search.trim()) {
        const query = search.toLowerCase();
        const studentName = (p.user_name || p.candidate_name || p.name || '').toLowerCase();
        const studentEmail = (p.user_email || p.candidate_email || p.email || '').toLowerCase();
        const studentPhone = (p.user_phone || '').toLowerCase();
        const orderRef = (p.merchant_order_id || p.razorpay_order_id || '').toLowerCase();
        const seriesTitle = (p.series_title || '').toLowerCase();
        const idStr = String(p.id);

        return (
          studentName.includes(query) ||
          studentEmail.includes(query) ||
          studentPhone.includes(query) ||
          orderRef.includes(query) ||
          seriesTitle.includes(query) ||
          idStr.includes(query)
        );
      }

      return true;
    });
  }, [data?.payments, statusFilter, search]);

  if (state === 'loading') return <LoadingScreen label="Loading revenue & gateway records…" />;
  if (state === 'error') return <ErrorState onRetry={() => load(false)} />;

  const { summary = {}, payments = [] } = data || {};

  // Status counts
  const totalCount = payments.length;
  const successCount = payments.filter((p) => p.status === 'success').length;
  const pendingCount = payments.filter((p) => p.status === 'pending').length;
  const failedCount = payments.filter((p) => p.status === 'failed').length;

  return (
    <div className="w-full max-w-full space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <AdminHeader
          title="Revenue & Gateway Transactions"
          subtitle="Manage candidate test series enrollments, PhonePe gateway transactions, and live status."
          breadcrumbs={['Revenue Operations']}
          status="PhonePe Standard Checkout v2 Active"
        />

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => load(false)}
            title="Refresh payments table"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 shadow-xs transition cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Verified Revenue</span>
            <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center font-bold">
              ₹
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            ₹{Number(summary.total || 0).toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
            All-time settled revenue
          </p>
        </div>

        {/* Metric 2 */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Successful Orders</span>
            <div className="h-7 w-7 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {summary.successful || 0}
          </p>
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-1">
            active test series enrollments
          </p>
        </div>

        {/* Metric 3 */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
            <span>PhonePe Gateway</span>
            <div className="h-7 w-7 rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 flex items-center justify-center">
              <CreditCard className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {summary.phonepe_orders || 0}
          </p>
          <p className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 mt-1">
            Standard Checkout v2
          </p>
        </div>

        {/* Metric 4 */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Payment Attempts</span>
            <div className="h-7 w-7 rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {summary.total_orders || 0}
          </p>
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-1">
            {failedCount} failed / cancelled
          </p>
        </div>
      </div>

      {/* Control Bar: Search & Status Filter Tabs (NO DROPDOWN) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 bg-white dark:bg-[#111827] p-3 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, email, order reference, series..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/80'
            }`}
          >
            <span>All</span>
            <span className="text-[10px] font-mono opacity-80">({totalCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('success')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              statusFilter === 'success'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span>Success</span>
            <span className="text-[10px] font-mono font-bold">({successCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('pending')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              statusFilter === 'pending'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Pending</span>
            <span className="text-[10px] font-mono font-bold">({pendingCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('failed')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              statusFilter === 'failed'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
            <span>Failed</span>
            <span className="text-[10px] font-mono font-bold">({failedCount})</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card overflow-hidden p-0 border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xs">
        <div className="w-full overflow-x-auto scrollbar-thin">
          <table className="w-full text-xs min-w-[850px]">
            <thead className="bg-slate-50 dark:bg-slate-900/80 text-left text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200/80 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Student</th>
                <th className="px-4 py-3.5">Order Reference</th>
                <th className="px-4 py-3.5">Gateway</th>
                <th className="px-4 py-3.5">Series / Pack</th>
                <th className="px-4 py-3.5">Amount</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Date</th>
                <th className="px-4 py-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-[#111827]">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-12 text-center text-slate-400">
                    <p className="font-bold text-sm text-slate-700 dark:text-slate-300">
                      No payment transactions found
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Try adjusting your search query or status filter.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => {
                  const studentName = p.user_name || p.candidate_name || p.name || 'Candidate';
                  const studentEmail = p.user_email || p.candidate_email || p.email || '—';
                  const orderRef = p.merchant_order_id || p.razorpay_order_id || `ID_${p.id}`;

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition group"
                    >
                      {/* 1. Student Name & Email */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center text-xs shrink-0">
                            {studentName.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-black text-slate-900 dark:text-white truncate">
                              {studentName}
                            </p>
                            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                              {studentEmail}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* 2. Order Reference with Copy */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 max-w-[150px] truncate"
                            title={orderRef}
                          >
                            {orderRef}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(orderRef, p.id)}
                            title="Copy Order ID"
                            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                          >
                            {copiedId === p.id ? (
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* 3. Gateway Provider */}
                      <td className="px-4 py-3.5">
                        {p.provider === 'phonepe' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/70 text-[10.5px] font-extrabold">
                            <span className="h-1.5 w-1.5 rounded-full bg-purple-600"></span>
                            PhonePe
                          </span>
                        ) : p.provider === 'razorpay' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/70 text-[10.5px] font-extrabold">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                            Razorpay
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10.5px] font-bold">
                            Direct / Free
                          </span>
                        )}
                      </td>

                      {/* 4. Series Title */}
                      <td className="px-4 py-3.5">
                        <p
                          className="font-bold text-slate-800 dark:text-slate-200 max-w-[220px] truncate"
                          title={p.series_title}
                        >
                          {p.series_title || 'Test Series Pack'}
                        </p>
                      </td>

                      {/* 5. Amount */}
                      <td className="px-4 py-3.5">
                        <span
                          className={`font-black text-xs ${
                            p.status === 'success'
                              ? 'text-emerald-600 dark:text-emerald-400 font-extrabold text-sm'
                              : 'text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          ₹{Number(p.amount || 0).toLocaleString('en-IN')}
                        </span>
                      </td>

                      {/* 6. Status Badge */}
                      <td className="px-4 py-3.5">
                        {p.status === 'success' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 text-[10.5px] font-black uppercase tracking-wider">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                            Success
                          </span>
                        ) : p.status === 'pending' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800 text-[10.5px] font-black uppercase tracking-wider">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                            Pending
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800 text-[10.5px] font-black uppercase tracking-wider">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-600"></span>
                            Failed
                          </span>
                        )}
                      </td>

                      {/* 7. Date */}
                      <td className="px-4 py-3.5 text-slate-500 font-medium whitespace-nowrap">
                        {formatDateTime(p.created_at)}
                      </td>

                      {/* 8. Action Column (Direct Delete Button Only) */}
                      <td className="px-4 py-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => setPaymentToDelete(p)}
                          title="Delete Payment Record"
                          className="inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-600 hover:border-rose-200 dark:hover:border-rose-900 bg-white dark:bg-[#111827] hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer active:scale-95"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Count */}
        <div className="px-4 py-3 bg-slate-50/70 dark:bg-slate-900/50 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{filteredPayments.length}</strong> of{' '}
            <strong className="text-slate-800 dark:text-slate-200">{totalCount}</strong> transactions
          </span>
          {(statusFilter !== 'all' || search) && (
            <button
              type="button"
              onClick={() => {
                setStatusFilter('all');
                setSearch('');
              }}
              className="text-blue-600 hover:underline font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* DELETE TRANSACTION CONFIRMATION MODAL                     */}
      {/* ======================================================== */}
      <Modal
        open={Boolean(paymentToDelete)}
        onClose={() => setPaymentToDelete(null)}
        title="Delete Payment Record"
      >
        {paymentToDelete && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs">
              <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-900 dark:text-rose-100">
                  Permanent Record Deletion
                </p>
                <p className="mt-0.5 leading-relaxed">
                  Are you sure you want to permanently delete this payment transaction? This action will remove the record from reports and transaction logs.
                </p>
              </div>
            </div>

            {/* Target Payment Summary */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Student</span>
                <span className="font-extrabold text-slate-900 dark:text-white">
                  {paymentToDelete.user_name || paymentToDelete.name || 'Candidate'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Order Reference</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {paymentToDelete.merchant_order_id || paymentToDelete.razorpay_order_id || `#${paymentToDelete.id}`}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Test Series</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                  {paymentToDelete.series_title}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Amount</span>
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                  ₹{Number(paymentToDelete.amount || 0).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-slate-500">Current Status</span>
                <span className="font-bold uppercase tracking-wider text-[11px] text-rose-600">
                  {paymentToDelete.status}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3">
              <button
                type="button"
                onClick={() => setPaymentToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeletePayment}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-extrabold text-xs shadow-md shadow-rose-600/20 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>{isDeleting ? 'Deleting...' : 'Delete Transaction'}</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
