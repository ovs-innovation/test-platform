import { useEffect, useState, useRef } from 'react';
import { Ticket, ChevronDown, Check, Percent, Trash2, Plus, AlertTriangle, X, Calendar, Tag } from 'lucide-react';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, PageHeader, Badge } from '../../components/ui.jsx';
import ActionDropdown from '../../components/ActionDropdown.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import Modal from '../../components/Modal.jsx';

function CustomDiscountTypeDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: 'percent', label: 'Percent (%)', desc: 'Percentage discount' },
    { value: 'fixed', label: 'Fixed (₹)', desc: 'Flat rupee discount' },
  ];

  const selected = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-3 px-3.5 text-xs font-bold text-slate-800 dark:text-slate-100 hover:border-blue-500/80 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <div className="flex items-center gap-2 min-w-0">
          <Percent className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="truncate">{selected.label}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ${open ? 'rotate-180 text-blue-600' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1.5 w-full z-50 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-2xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-extrabold border border-blue-200 dark:border-blue-800/80 shadow-2xs'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold'
                }`}
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <p className="text-xs font-bold leading-tight">{opt.label}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">{opt.desc}</p>
                </div>
                {isSelected && <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminCoupons() {
  const toast = useToast();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Form State
  const [form, setForm] = useState({
    code: '',
    discount_type: 'percent',
    discount_value: 10,
    max_uses: 100,
    valid_until: '',
  });

  const load = () => adminService.coupons().then(setCoupons).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await adminService.createCoupon(form);
      toast.success(`Discount coupon "${form.code.toUpperCase()}" created successfully!`);
      setForm({ code: '', discount_type: 'percent', discount_value: 10, max_uses: 100, valid_until: '' });
      setShowCreateModal(false);
      load();
    } catch (err) {
      toast.error(err.message || 'Failed to create coupon');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCoupon = async () => {
    if (!couponToDelete) return;
    setDeleting(true);
    try {
      await adminService.deleteCoupon(couponToDelete.id);
      toast.success(`Coupon "${couponToDelete.code}" deleted successfully.`);
      setCouponToDelete(null);
      load();
    } catch (err) {
      toast.error(err.message || 'Failed to delete coupon');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader title="Discount Coupons" subtitle="Create and manage discount codes for test series." />
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="btn-primary rounded-xl px-4 py-2.5 text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Coupon</span>
        </button>
      </div>

      {/* COUPONS TABLE */}
      <div className="card overflow-hidden p-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-sm rounded-3xl">
        <table className="w-full text-xs">
          <thead className="bg-slate-100/80 dark:bg-slate-900/80 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-5 py-4">Code</th>
              <th className="px-5 py-4">Discount</th>
              <th className="px-5 py-4">Used</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-[#111827]">
            {coupons.length > 0 ? (
              coupons.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-blue-500 shrink-0" />
                      <span className="font-mono font-black text-sm text-blue-600 dark:text-blue-400 tracking-wider">
                        {c.code}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-extrabold text-slate-900 dark:text-white">
                    {c.discount_type === 'percent' ? `${c.discount_value}% OFF` : `₹${c.discount_value} OFF`}
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-700 dark:text-slate-300">
                    {c.used_count}/{c.max_uses ?? '∞'}
                  </td>
                  <td className="px-5 py-4">
                    <Badge color={c.is_active ? 'green' : 'slate'}>{c.is_active ? 'Active' : 'Inactive'}</Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <ActionDropdown
                      items={[
                        {
                          label: c.is_active ? 'Deactivate Coupon' : 'Activate Coupon',
                          icon: Ticket,
                          onClick: async () => {
                            await adminService.toggleCoupon(c.id);
                            load();
                          },
                          warning: c.is_active,
                          color: !c.is_active ? 'text-emerald-600 dark:text-emerald-400' : undefined,
                        },
                        {
                          label: 'Delete Coupon',
                          icon: Trash2,
                          onClick: () => setCouponToDelete(c),
                          danger: true,
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                  <Ticket className="h-8 w-8 mx-auto mb-2 opacity-50 text-slate-400" />
                  <p className="text-xs font-bold">No coupons found.</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Click "+ Create New Coupon" above to create your first discount code.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ─── CREATE COUPON MODAL POPUP ────────────────────────────────────────── */}
      <Modal open={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create Discount Coupon" size="md">
        <form onSubmit={handleCreateCoupon} className="space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Generate promotional discount codes for candidate test series enrollments.
          </p>

          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-600 dark:text-slate-400 mb-1">
              Coupon Code <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. SAVE20, WELCOME50"
              className="input uppercase tracking-wider font-mono font-bold w-full rounded-xl"
              value={form.code}
              onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Discount Type
              </label>
              <CustomDiscountTypeDropdown
                value={form.discount_type}
                onChange={(val) => setForm((f) => ({ ...f, discount_type: val }))}
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Discount Value <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                placeholder={form.discount_type === 'percent' ? 'e.g. 20 (%)' : 'e.g. 500 (₹)'}
                className="input w-full rounded-xl"
                value={form.discount_value}
                onChange={(e) => setForm((f) => ({ ...f, discount_value: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Max Usage Limit
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 100 (Leave empty for ∞)"
                className="input w-full rounded-xl"
                value={form.max_uses}
                onChange={(e) => setForm((f) => ({ ...f, max_uses: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Expiration Date
              </label>
              <input
                type="date"
                className="input w-full rounded-xl text-xs font-bold"
                value={form.valid_until}
                onChange={(e) => setForm((f) => ({ ...f, valid_until: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary rounded-xl px-5 py-2.5 text-xs font-extrabold cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'Creating Coupon…' : 'Create Coupon'}
            </button>
          </div>
        </form>
      </Modal>

      {/* ─── DELETE CONFIRMATION MODAL POPUP ─────────────────────────────────── */}
      <Modal open={!!couponToDelete} onClose={() => setCouponToDelete(null)} title="Delete Coupon Confirmation" size="sm">
        {couponToDelete && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="h-6 w-6 shrink-0" />
              <div>
                <p className="font-extrabold text-sm">Permanently Delete Coupon?</p>
                <p className="text-[11px] opacity-90 mt-0.5">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to delete coupon <span className="font-mono font-black text-rose-500 uppercase">{couponToDelete.code}</span>?
              Candidates will no longer be able to use this code at checkout.
            </p>

            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Coupon Code:</span>
                <span className="font-bold text-slate-900 dark:text-white">{couponToDelete.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Discount Value:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {couponToDelete.discount_type === 'percent' ? `${couponToDelete.discount_value}% OFF` : `₹${couponToDelete.discount_value} OFF`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Redemptions:</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">{couponToDelete.used_count}/{couponToDelete.max_uses ?? '∞'}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setCouponToDelete(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteCoupon}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-sm transition cursor-pointer disabled:opacity-50"
              >
                {deleting ? 'Deleting…' : 'Delete Coupon'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
