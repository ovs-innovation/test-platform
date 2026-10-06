import { useEffect, useMemo, useState } from 'react';
import { paymentService, clearCache } from '../../lib/services.js';
import { LoadingScreen, ErrorState } from '../../components/ui.jsx';
import { AdminHeader } from '../../components/admin/AdminUI.jsx';
import { formatDateTime } from '../../lib/format.js';
import { Plus, RefreshCw, Search, History, Pencil, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import Modal from '../../components/Modal.jsx';

const PAYMENT_MODES = [
  { value: 'cash', label: 'Cash' },
  { value: 'direct_upi', label: 'Direct UPI' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'other', label: 'Other' },
];

const MODE_LABELS = Object.fromEntries(PAYMENT_MODES.map((mode) => [mode.value, mode.label]));

const today = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const money = (paise) => `₹${(Number(paise || 0) / 100).toLocaleString('en-IN', {
  minimumFractionDigits: Number(paise || 0) % 100 ? 2 : 0,
  maximumFractionDigits: 2,
})}`;

const statusLabel = {
  fully_paid: 'Fully Paid',
  partially_paid: 'Partially Paid',
  unpaid: 'Unpaid',
  pending: 'Pending',
  failed: 'Failed',
  refunded: 'Refunded',
};

const statusClasses = {
  fully_paid: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  partially_paid: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
  unpaid: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  pending: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
  failed: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300',
  refunded: 'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300',
};

const createRequestKey = () => crypto.randomUUID();

function SourceBadge({ source, provider }) {
  const label = source === 'mixed'
    ? 'Mixed'
    : source === 'manual'
      ? 'Manual — Admin'
      : provider === 'razorpay'
        ? 'Online — Razorpay'
        : 'Online — PhonePe';
  const className = source === 'manual'
    ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
    : source === 'mixed'
      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300'
      : 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300';
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-extrabold ${className}`}>{label}</span>;
}

function PaymentStatus({ status }) {
  return (
    <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-extrabold ${statusClasses[status] || statusClasses.unpaid}`}>
      {statusLabel[status] || status}
    </span>
  );
}

const INITIAL_MANUAL_FORM = {
  user_id: '',
  test_series_id: '',
  total_fee: '',
  amount_received: '0',
  payment_mode: 'cash',
  payment_date: today(),
  reference: '',
  next_due_date: '',
  notes: '',
};

const INITIAL_INSTALLMENT_FORM = {
  amount_received: '',
  payment_mode: 'cash',
  payment_date: today(),
  reference: '',
  notes: '',
};

export default function AdminPayments() {
  const toast = useToast();
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const [options, setOptions] = useState(null);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [manualForm, setManualForm] = useState(INITIAL_MANUAL_FORM);
  const [saving, setSaving] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [installmentForm, setInstallmentForm] = useState(INITIAL_INSTALLMENT_FORM);
  const [correctingEntry, setCorrectingEntry] = useState(null);
  const [correctionForm, setCorrectionForm] = useState({
    replacement_amount: '',
    payment_mode: 'cash',
    payment_date: today(),
    reference: '',
    notes: '',
    reason: '',
  });

  const load = async (silent = false) => {
    if (!silent) setState('loading');
    try {
      clearCache('payment_admin');
      const result = await paymentService.admin();
      setData(result);
      setState('done');
    } catch (error) {
      if (!silent) setState('error');
      else toast.error(error?.message || 'Unable to refresh payment records');
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!addOpen || options) return;
    setOptionsLoading(true);
    paymentService.adminManualOptions()
      .then(setOptions)
      .catch((error) => toast.error(error?.message || 'Unable to load students and courses'))
      .finally(() => setOptionsLoading(false));
  }, [addOpen, options]);

  const existingManualKeys = useMemo(
    () => new Set((options?.existing_manual_records || []).map((record) => `${record.user_id}:${record.test_series_id}`)),
    [options]
  );

  const filteredPayments = useMemo(() => {
    const payments = data?.payments || [];
    const query = search.trim().toLowerCase();
    return payments.filter((payment) => {
      if (statusFilter !== 'all' && payment.status !== statusFilter) return false;
      if (sourceFilter !== 'all' && payment.source !== sourceFilter) return false;
      if (query) {
        const searchable = [
          payment.user_name,
          payment.user_email,
          payment.user_phone,
          payment.series_title,
          payment.merchant_order_id,
          payment.provider_payment_id,
        ].filter(Boolean).join(' ').toLowerCase();
        if (!searchable.includes(query)) return false;
      }
      return true;
    });
  }, [data?.payments, search, sourceFilter, statusFilter]);

  const selectedStudent = options?.students?.find((student) => String(student.id) === manualForm.user_id);
  const selectedCourse = options?.courses?.find((course) => String(course.id) === manualForm.test_series_id);
  const duplicateEnrollment = selectedStudent && selectedCourse
    ? existingManualKeys.has(`${selectedStudent.id}:${selectedCourse.id}`)
    : false;
  const initialAmount = Number(manualForm.amount_received || 0);
  const initialFee = Number(manualForm.total_fee || 0);
  const initialRemaining = Math.max(initialFee - initialAmount, 0);

  const openManualForm = () => {
    setManualForm({ ...INITIAL_MANUAL_FORM, payment_date: today() });
    setAddOpen(true);
  };

  const updateManualField = (field, value) => {
    setManualForm((current) => {
      const next = { ...current, [field]: value };
      if (field === 'test_series_id') {
        const course = options?.courses?.find((item) => String(item.id) === value);
        next.total_fee = course ? String(Number(course.price || 0)) : '';
      }
      if (field === 'amount_received' && Number(value) === 0) {
        next.payment_mode = 'cash';
      }
      return next;
    });
  };

  const submitManualPayment = async (event) => {
    event.preventDefault();
    if (duplicateEnrollment) {
      toast.error('A manual fee record already exists for this student and course.');
      return;
    }
    setSaving(true);
    try {
      await paymentService.adminCreateManual({
        ...manualForm,
        request_key: createRequestKey(),
      });
      toast.success('Manual fee record saved successfully.');
      setAddOpen(false);
      setOptions(null);
      await load(true);
    } catch (error) {
      toast.error(error?.message || 'Unable to save manual payment');
    } finally {
      setSaving(false);
    }
  };

  const openPaymentHistory = async (payment) => {
    setSelectedPayment(payment);
    setCorrectingEntry(null);
    setInstallmentForm({ ...INITIAL_INSTALLMENT_FORM, payment_date: today() });
    if (!payment.fee_record_id) return;
    setDetailLoading(true);
    try {
      const detail = await paymentService.adminManualDetail(payment.fee_record_id);
      setSelectedPayment(detail);
    } catch (error) {
      toast.error(error?.message || 'Unable to load payment history');
    } finally {
      setDetailLoading(false);
    }
  };

  const submitInstallment = async (event) => {
    event.preventDefault();
    if (!selectedPayment?.fee_record_id) return;
    setSaving(true);
    try {
      const result = await paymentService.adminAddManualInstallment(selectedPayment.fee_record_id, {
        ...installmentForm,
        request_key: createRequestKey(),
      });
      setSelectedPayment(result.payment);
      setInstallmentForm({ ...INITIAL_INSTALLMENT_FORM, payment_date: today() });
      toast.success('Further payment added to the existing record.');
      await load(true);
    } catch (error) {
      toast.error(error?.message || 'Unable to add further payment');
    } finally {
      setSaving(false);
    }
  };

  const beginCorrection = (entry) => {
    setCorrectingEntry(entry);
    setCorrectionForm({
      replacement_amount: (Number(entry.amount_paise) / 100).toFixed(2),
      payment_mode: entry.payment_mode || 'cash',
      payment_date: entry.payment_date ? String(entry.payment_date).slice(0, 10) : today(),
      reference: entry.reference || '',
      notes: entry.notes || '',
      reason: '',
    });
  };

  const submitCorrection = async (event) => {
    event.preventDefault();
    if (!selectedPayment?.fee_record_id || !correctingEntry) return;
    setSaving(true);
    try {
      const result = await paymentService.adminCorrectManualInstallment(selectedPayment.fee_record_id, {
        ...correctionForm,
        entry_id: correctingEntry.id,
        request_key: createRequestKey(),
      });
      setSelectedPayment(result.payment);
      setCorrectingEntry(null);
      toast.success('Entry correction recorded with its audit history.');
      await load(true);
    } catch (error) {
      toast.error(error?.message || 'Unable to correct this payment entry');
    } finally {
      setSaving(false);
    }
  };

  if (state === 'loading') return <LoadingScreen label="Loading payment records…" />;
  if (state === 'error') return <ErrorState onRetry={() => load(false)} />;

  const summary = data?.summary || {};
  const payments = data?.payments || [];
  const paymentRows = filteredPayments;
  const unpaidTotal = Number(summary.outstanding_paise || 0);
  const phonePeTotal = Number(summary.phonepe_collected_paise || 0);
  const manualTotal = Number(summary.manual_collected_paise || 0);
  const history = selectedPayment?.history || [];
  const reversedEntries = new Set(history.filter((entry) => entry.reversed_entry_id).map((entry) => String(entry.reversed_entry_id)));

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AdminHeader
          title="Payments"
          subtitle="Online PhonePe transactions and manually recorded student installments."
          breadcrumbs={['Revenue Operations']}
          status="Online & Manual Payments"
        />
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={openManualForm}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> Add Manual Payment
          </button>
          <button
            type="button"
            onClick={() => load(false)}
            title="Refresh payments"
            className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-xs transition hover:bg-slate-50 dark:border-slate-800 dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-slate-800/60"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric title="Total Collected" value={money(summary.collected_paise)} accent="text-emerald-600 dark:text-emerald-400" />
        <Metric title="Outstanding Fees" value={money(unpaidTotal)} accent="text-amber-600 dark:text-amber-400" />
        <Metric title="Online — PhonePe" value={money(phonePeTotal)} accent="text-purple-600 dark:text-purple-400" />
        <Metric title="Manual — Admin" value={money(manualTotal)} accent="text-blue-600 dark:text-blue-400" />
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-[#111827] lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by student, email, phone, course, or reference"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-xs text-slate-900 outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            <option value="all">All sources</option>
            <option value="online">Online — PhonePe</option>
            <option value="manual">Manual — Admin</option>
            <option value="mixed">Mixed</option>
          </select>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            <option value="all">All statuses</option>
            <option value="unpaid">Unpaid</option>
            <option value="partially_paid">Partially Paid</option>
            <option value="fully_paid">Fully Paid</option>
            <option value="pending">Pending online</option>
            <option value="failed">Failed online</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px] text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3.5">Student</th>
                <th className="px-4 py-3.5">Test Series / Course</th>
                <th className="px-4 py-3.5">Payment Source</th>
                <th className="px-4 py-3.5">Total Fee</th>
                <th className="px-4 py-3.5">Total Paid</th>
                <th className="px-4 py-3.5">Remaining Fee</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Last Payment</th>
                <th className="px-4 py-3.5">Next Due</th>
                <th className="px-4 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
              {paymentRows.length === 0 ? (
                <tr><td colSpan={10} className="px-4 py-14 text-center text-slate-500">No payment records match these filters.</td></tr>
              ) : paymentRows.map((payment) => {
                const isSummary = payment.is_fee_summary;
                const studentName = payment.user_name || 'Student';
                return (
                  <tr key={isSummary ? `enrollment-${payment.enrollment_id}` : `online-${payment.id}`} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30">
                    <td className="px-4 py-3.5">
                      <p className="font-extrabold text-slate-900 dark:text-white">{studentName}</p>
                      <p className="mt-0.5 text-[10px] text-slate-500">{payment.user_email || ''}</p>
                    </td>
                    <td className="max-w-[220px] px-4 py-3.5 font-bold text-slate-700 dark:text-slate-200">{payment.series_title || 'Test series'}{!isSummary && payment.merchant_order_id && <p className="mt-0.5 max-w-[200px] truncate font-mono text-[9px] font-medium text-slate-400">{payment.merchant_order_id}</p>}</td>
                    <td className="px-4 py-3.5"><SourceBadge source={payment.source} provider={payment.provider} /></td>
                    <td className="px-4 py-3.5 font-semibold text-slate-700 dark:text-slate-300">{isSummary ? money(payment.total_fee_paise) : '—'}</td>
                    <td className="px-4 py-3.5 font-extrabold text-emerald-700 dark:text-emerald-300">
                      {isSummary ? money(payment.total_paid_paise) : payment.status === 'fully_paid' ? money(payment.amount_paise) : '—'}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-slate-700 dark:text-slate-300">{isSummary ? money(payment.remaining_fee_paise) : '—'}</td>
                    <td className="px-4 py-3.5"><PaymentStatus status={payment.status} /></td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-500">{payment.last_payment_date ? formatDateTime(payment.last_payment_date) : !isSummary ? formatDateTime(payment.created_at) : '—'}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-500">{payment.next_due_date ? formatDateTime(payment.next_due_date) : '—'}</td>
                    <td className="px-4 py-3.5">
                      {isSummary ? (
                        <button type="button" onClick={() => openPaymentHistory(payment)} className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-blue-200 px-2.5 py-1.5 text-[10px] font-extrabold text-blue-700 hover:bg-blue-50 dark:border-blue-900 dark:text-blue-300 dark:hover:bg-blue-950/40">
                          {payment.fee_record_id ? <Pencil className="h-3 w-3" /> : <History className="h-3 w-3" />}
                          {payment.fee_record_id ? 'Manage Payment' : 'View History'}
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-400">Online transaction</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-200 bg-slate-50/70 px-4 py-3 text-[11px] text-slate-500 dark:border-slate-800 dark:bg-slate-900/50">
          Showing {paymentRows.length} of {payments.length} payment records. Collection includes confirmed receipts only; outstanding fees are reported separately.
        </div>
      </div>

      <Modal open={addOpen} onClose={() => !saving && setAddOpen(false)} title="Add Manual Payment" size="lg">
        {optionsLoading ? <p className="py-8 text-center text-sm text-slate-500">Loading students and courses…</p> : (
          <form onSubmit={submitManualPayment} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Registered student">
                <select required value={manualForm.user_id} onChange={(event) => updateManualField('user_id', event.target.value)} className={inputClass}>
                  <option value="">Select a student</option>
                  {(options?.students || []).map((student) => <option key={student.id} value={student.id}>{student.name} — {student.email}{student.phone ? ` — ${student.phone}` : ''}</option>)}
                </select>
              </Field>
              <Field label="Test series / course">
                <select required value={manualForm.test_series_id} onChange={(event) => updateManualField('test_series_id', event.target.value)} className={inputClass}>
                  <option value="">Select a course</option>
                  {(options?.courses || []).map((course) => <option key={course.id} value={course.id}>{course.title}{course.is_active ? '' : ' (inactive)'}</option>)}
                </select>
              </Field>
            </div>
            {duplicateEnrollment && <p className="rounded-xl bg-amber-50 p-3 text-xs font-semibold text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">This student and course already have a manual fee record. Use Manage Payment to add an installment.</p>}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Total agreed fee (₹)">
                <input required type="number" min="0.01" step="0.01" value={manualForm.total_fee} onChange={(event) => updateManualField('total_fee', event.target.value)} className={inputClass} placeholder="e.g. 10000" />
              </Field>
              <Field label="Amount received now (₹)">
                <input required type="number" min="0" step="0.01" max={manualForm.total_fee || undefined} value={manualForm.amount_received} onChange={(event) => updateManualField('amount_received', event.target.value)} className={inputClass} placeholder="0 if no installment received" />
              </Field>
            </div>
            {initialFee > 0 && (
              <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-900">
                <ComputedAmount label="Total fee" amount={initialFee} />
                <ComputedAmount label="Total paid" amount={initialAmount} />
                <ComputedAmount label="Remaining fee" amount={initialRemaining} />
              </div>
            )}
            {initialAmount > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Payment mode">
                  <PaymentModeSelect value={manualForm.payment_mode} onChange={(value) => updateManualField('payment_mode', value)} />
                </Field>
                <Field label="Payment date">
                  <input required type="date" value={manualForm.payment_date} onChange={(event) => updateManualField('payment_date', event.target.value)} className={inputClass} />
                </Field>
                <Field label="Reference / UTR (optional)">
                  <input value={manualForm.reference} maxLength={160} onChange={(event) => updateManualField('reference', event.target.value)} className={inputClass} />
                </Field>
                <Field label="Next payment due date (optional)">
                  <input type="date" value={manualForm.next_due_date} onChange={(event) => updateManualField('next_due_date', event.target.value)} className={inputClass} />
                </Field>
              </div>
            )}
            {initialAmount === 0 && (
              <Field label="Next payment due date (optional)">
                <input type="date" value={manualForm.next_due_date} onChange={(event) => updateManualField('next_due_date', event.target.value)} className={inputClass} />
              </Field>
            )}
            <Field label="Notes (optional)">
              <textarea rows={2} maxLength={2000} value={manualForm.notes} onChange={(event) => updateManualField('notes', event.target.value)} className={inputClass} />
            </Field>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setAddOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300">Cancel</button>
              <button type="submit" disabled={saving || optionsLoading || duplicateEnrollment} className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-extrabold text-white hover:bg-blue-700 disabled:opacity-50">{saving ? 'Saving…' : 'Save Manual Fee'}</button>
            </div>
          </form>
        )}
      </Modal>

      <Modal
        open={Boolean(selectedPayment)}
        onClose={() => {
          if (!saving) {
            setSelectedPayment(null);
            setCorrectingEntry(null);
          }
        }}
        title="Payment History & Management"
        size="lg"
      >
        {selectedPayment && (
          <div className="space-y-5">
            <div className="grid gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900 sm:grid-cols-2">
              <div><p className="text-[10px] font-bold uppercase text-slate-400">Student / Course</p><p className="mt-1 text-sm font-extrabold text-slate-900 dark:text-white">{selectedPayment.user_name} · {selectedPayment.series_title}</p></div>
              <div><p className="text-[10px] font-bold uppercase text-slate-400">Payment Source</p><div className="mt-1"><SourceBadge source={selectedPayment.source} /></div></div>
              <ComputedAmount label="Total fee" paise={selectedPayment.total_fee_paise} />
              <ComputedAmount label="Total paid" paise={selectedPayment.total_paid_paise} />
              <ComputedAmount label="Remaining fee" paise={selectedPayment.remaining_fee_paise} />
              <div><p className="text-[10px] font-bold uppercase text-slate-400">Payment status</p><div className="mt-1"><PaymentStatus status={selectedPayment.status} /></div></div>
              {selectedPayment.next_due_date && <div><p className="text-[10px] font-bold uppercase text-slate-400">Next due date</p><p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-200">{formatDateTime(selectedPayment.next_due_date)}</p></div>}
            </div>

            <section className="space-y-2">
              <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-100">Payment history and audit trail</h3>
              {detailLoading ? <p className="py-4 text-center text-xs text-slate-500">Loading history…</p> : history.length === 0 ? <p className="rounded-xl border border-dashed border-slate-300 p-4 text-center text-xs text-slate-500 dark:border-slate-700">No payments recorded yet.</p> : (
                <div className="max-h-64 space-y-2 overflow-y-auto">
                  {history.map((entry) => {
                    const reversed = entry.entry_type === 'payment' && reversedEntries.has(String(entry.id));
                    const isReversal = entry.entry_type === 'reversal';
                    return (
                      <div key={`${entry.source}-${entry.id}`} className={`rounded-xl border p-3 ${isReversal || reversed ? 'border-rose-200 bg-rose-50/60 dark:border-rose-900/60 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-800'}`}>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <p className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                              {entry.source === 'online' ? `Online — ${entry.provider === 'razorpay' ? 'Razorpay' : 'PhonePe'}` : isReversal ? `Reversal of manual entry #${entry.reversed_entry_id}` : `Manual — ${MODE_LABELS[entry.payment_mode] || entry.payment_mode}`}
                              {reversed && <span className="ml-2 text-[10px] text-rose-600">Corrected</span>}
                            </p>
                            <p className="mt-1 text-[10px] text-slate-500">{entry.payment_date ? formatDateTime(entry.payment_date) : '—'}{entry.reference ? ` · Ref: ${entry.reference}` : ''}{entry.admin_name ? ` · Recorded by ${entry.admin_name}` : ''}</p>
                          </div>
                          <p className={`text-sm font-black ${Number(entry.amount_paise) < 0 ? 'text-rose-600' : 'text-emerald-700 dark:text-emerald-300'}`}>{money(entry.amount_paise)}</p>
                        </div>
                        {entry.notes && <p className="mt-1 text-[10px] text-slate-600 dark:text-slate-400">{entry.notes}</p>}
                        {entry.correction_reason && <p className="mt-1 text-[10px] font-semibold text-rose-700 dark:text-rose-300">Correction reason: {entry.correction_reason}</p>}
                        {entry.source === 'manual' && entry.entry_type === 'payment' && !reversed && (
                          <button type="button" onClick={() => beginCorrection(entry)} className="mt-2 text-[10px] font-extrabold text-rose-700 underline dark:text-rose-300">Correct mistaken entry</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {correctingEntry ? (
              <form onSubmit={submitCorrection} className="space-y-3 rounded-2xl border border-rose-200 p-4 dark:border-rose-900/70">
                <div className="flex items-center justify-between"><h3 className="text-xs font-extrabold text-rose-800 dark:text-rose-200">Correct manual entry #{correctingEntry.id}</h3><button type="button" onClick={() => setCorrectingEntry(null)} aria-label="Cancel correction"><X className="h-4 w-4 text-slate-500" /></button></div>
                <p className="text-[10px] leading-relaxed text-slate-500">The original entry will remain in the audit trail and be reversed. Enter zero to reverse without replacing.</p>
                <Field label="Replacement amount (₹)">
                  <input type="number" min="0" step="0.01" required value={correctionForm.replacement_amount} onChange={(event) => setCorrectionForm((current) => ({ ...current, replacement_amount: event.target.value }))} className={inputClass} />
                </Field>
                {Number(correctionForm.replacement_amount) > 0 && <div className="grid gap-3 sm:grid-cols-2"><Field label="Payment mode"><PaymentModeSelect value={correctionForm.payment_mode} onChange={(value) => setCorrectionForm((current) => ({ ...current, payment_mode: value }))} /></Field><Field label="Payment date"><input type="date" required value={correctionForm.payment_date} onChange={(event) => setCorrectionForm((current) => ({ ...current, payment_date: event.target.value }))} className={inputClass} /></Field><Field label="Reference / UTR"><input value={correctionForm.reference} maxLength={160} onChange={(event) => setCorrectionForm((current) => ({ ...current, reference: event.target.value }))} className={inputClass} /></Field><Field label="Replacement notes"><input value={correctionForm.notes} maxLength={2000} onChange={(event) => setCorrectionForm((current) => ({ ...current, notes: event.target.value }))} className={inputClass} /></Field></div>}
                <Field label="Required correction reason">
                  <textarea required minLength={5} maxLength={1000} rows={2} value={correctionForm.reason} onChange={(event) => setCorrectionForm((current) => ({ ...current, reason: event.target.value }))} className={inputClass} placeholder="Explain why this entry needs correction" />
                </Field>
                <button type="submit" disabled={saving} className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-extrabold text-white disabled:opacity-50">{saving ? 'Saving audit correction…' : 'Reverse and Replace Entry'}</button>
              </form>
            ) : selectedPayment.fee_record_id && selectedPayment.remaining_fee_paise > 0 ? (
              <form onSubmit={submitInstallment} className="space-y-3 rounded-2xl border border-blue-200 p-4 dark:border-blue-900/70">
                <h3 className="text-xs font-extrabold text-blue-800 dark:text-blue-200">Add Further Payment</h3>
                <p className="text-[10px] text-slate-500">Remaining fee: <strong>{money(selectedPayment.remaining_fee_paise)}</strong></p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="New Amount Received (₹)">
                    <input required type="number" min="0.01" step="0.01" max={Number(selectedPayment.remaining_fee_paise) / 100} value={installmentForm.amount_received} onChange={(event) => setInstallmentForm((current) => ({ ...current, amount_received: event.target.value }))} className={inputClass} placeholder="Enter this installment only" />
                  </Field>
                  <Field label="Payment mode"><PaymentModeSelect value={installmentForm.payment_mode} onChange={(value) => setInstallmentForm((current) => ({ ...current, payment_mode: value }))} /></Field>
                  <Field label="Payment date"><input required type="date" value={installmentForm.payment_date} onChange={(event) => setInstallmentForm((current) => ({ ...current, payment_date: event.target.value }))} className={inputClass} /></Field>
                  <Field label="Reference / UTR (optional)"><input value={installmentForm.reference} maxLength={160} onChange={(event) => setInstallmentForm((current) => ({ ...current, reference: event.target.value }))} className={inputClass} /></Field>
                </div>
                <Field label="Notes (optional)"><textarea rows={2} maxLength={2000} value={installmentForm.notes} onChange={(event) => setInstallmentForm((current) => ({ ...current, notes: event.target.value }))} className={inputClass} /></Field>
                <button type="submit" disabled={saving} className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-extrabold text-white disabled:opacity-50">{saving ? 'Saving…' : 'Add Payment Installment'}</button>
              </form>
            ) : null}
          </div>
        )}
      </Modal>
    </div>
  );
}

const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100';

function Field({ label, children }) {
  return <label className="block space-y-1.5"><span className="block text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</span>{children}</label>;
}

function PaymentModeSelect({ value, onChange }) {
  return <select required value={value} onChange={(event) => onChange(event.target.value)} className={inputClass}>{PAYMENT_MODES.map((mode) => <option key={mode.value} value={mode.value}>{mode.label}</option>)}</select>;
}

function ComputedAmount({ label, amount, paise }) {
  const value = paise === undefined ? Number(amount || 0) * 100 : Number(paise || 0);
  return <div><p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 text-xs font-extrabold text-slate-800 dark:text-slate-100">{money(value)}</p></div>;
}

function Metric({ title, value, accent }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-[#111827]"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{title}</p><p className={`mt-2 text-2xl font-black ${accent}`}>{value}</p></div>;
}
