import { useEffect, useState, useRef } from 'react';
import { Ticket, ChevronDown, Check, Percent, Trash2, Plus, AlertTriangle, X, Calendar, Tag, Bell, GraduationCap, Globe, Lock } from 'lucide-react';
import { adminService, testSeriesService } from '../../lib/services.js';
import { LoadingScreen, Badge } from '../../components/ui.jsx';
import { AdminHeader } from '../../components/admin/AdminUI.jsx';
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
  const [testSeriesList, setTestSeriesList] = useState([]);
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
    max_uses: 1,
    max_uses_per_user: 1,
    valid_until: '',
    test_series_id: '',
    notify_students: false,
    is_public: false,
  });

  const load = () => adminService.coupons().then(setCoupons).finally(() => setLoading(false));
  useEffect(() => {
    load();
    testSeriesService.list().then((list) => setTestSeriesList(list || [])).catch(() => []);
  }, []);

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await adminService.createCoupon(form);
      const notifMsg = res.notified_students > 0 ? ` & notification sent to ${res.notified_students} active students` : '';
      const visibilityMsg = form.is_public ? ' (🌐 Public Promo Offer)' : ' (🔒 Private Student Coupon)';
      toast.success(`Discount coupon "${form.code.toUpperCase()}" created successfully${visibilityMsg}${notifMsg}!`);
      setForm({
        code: '',
        discount_type: 'percent',
        discount_value: 10,
        max_uses: 1,
        max_uses_per_user: 1,
        valid_until: '',
        test_series_id: '',
        notify_students: false,
        is_public: false,
      });
      setShowCreateModal(false);
      load();
    } catch (err) {
      toast.error(err.message || 'Failed to create coupon');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNotifyStudents = async (couponId, code) => {
    try {
      const res = await adminService.notifyCoupon(couponId);
      toast.success(res.message || `Notification sent to students for coupon ${code}!`);
    } catch (err) {
      toast.error(err.message || 'Failed to broadcast notification');
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

  if (loading) return <LoadingScreen label="Loading discount coupons..." />;

  return (
    <div className="w-full max-w-full space-y-6">
      {/* HEADER SECTION */}
      <AdminHeader
        title="Discount Coupons & Promotional Offers"
        subtitle="Create, configure, and manage promotional discount codes for candidate test series purchases."
        breadcrumbs={['Coupons & Promos']}
        actions={
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
          >
            + Create New Coupon
          </button>
        }
      />

      {/* ─── DESKTOP TABLE VIEW ────────────────────────────────────────── */}
      <div className="hidden sm:block card overflow-hidden p-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-sm rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-xs">
            <thead className="bg-slate-100/80 dark:bg-slate-900/80 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-5 py-4">Code</th>
                <th className="px-5 py-4">Visibility</th>
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
                      <div className="mt-1">
                        {c.test_series_title ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 px-1.5 py-0.5 rounded truncate max-w-[220px]" title={c.test_series_title}>
                            <GraduationCap className="w-2.5 h-2.5 shrink-0" />
                            <span className="truncate">{c.test_series_title}</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                            🌐 All Test Series
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {c.is_public ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-2xs" title="Visible publicly on website under Available Promo Offers">
                          <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>Public Offer</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shadow-2xs" title="Private coupon for specific student/child. Hidden from website.">
                          <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>Private / Student</span>
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 font-extrabold text-slate-900 dark:text-white">
                      {c.discount_type === 'percent' ? `${c.discount_value}% OFF` : `₹${c.discount_value} OFF`}
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-700 dark:text-slate-300">
                      <div>
                        <span>{c.used_count}/{c.max_uses ?? '∞'} total</span>
                        <span className="block text-[10px] text-blue-600 dark:text-blue-400 font-bold">
                          Max {c.max_uses_per_user ?? 1}/student
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge color={c.is_active ? 'green' : 'slate'}>{c.is_active ? 'Active' : 'Inactive'}</Badge>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <ActionDropdown
                        items={[
                          {
                            label: c.is_public ? 'Make Private (Hide from Store)' : 'Make Public (Show in Promo Offers)',
                            icon: c.is_public ? Lock : Globe,
                            onClick: async () => {
                              try {
                                await adminService.toggleCouponPublic(c.id);
                                toast.success(`Coupon "${c.code}" is now ${c.is_public ? 'Private (Hidden from public website)' : 'Public (Visible on website store)'}!`);
                                load();
                              } catch (err) {
                                toast.error(err.message || 'Failed to update coupon visibility');
                              }
                            },
                            color: c.is_public ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400',
                          },
                          {
                            label: 'Notify Students',
                            icon: Bell,
                            onClick: () => handleNotifyStudents(c.id, c.code),
                            color: 'text-blue-600 dark:text-blue-400',
                          },
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
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                    <Ticket className="h-8 w-8 mx-auto mb-2 opacity-50 text-slate-400" />
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">No coupons found.</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Click "+ Create New Coupon" above to create your first discount code.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── MOBILE CARD VIEW ────────────────────────────────────────────── */}
      <div className="block sm:hidden space-y-3.5">
        {coupons.length > 0 ? (
          coupons.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-sm space-y-3"
            >
              {/* Header Row */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="h-8 w-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
                    <Tag className="h-4 w-4" />
                  </div>
                  <span className="font-mono font-black text-base text-blue-600 dark:text-blue-400 tracking-wider truncate">
                    {c.code}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {c.is_public ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      <Globe className="w-2.5 h-2.5 text-blue-600" />
                      <span>Public</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      <Lock className="w-2.5 h-2.5 text-amber-600" />
                      <span>Private</span>
                    </span>
                  )}
                  <Badge color={c.is_active ? 'green' : 'slate'}>{c.is_active ? 'Active' : 'Inactive'}</Badge>
                </div>
              </div>

              {/* Specs Box */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Discount Value</span>
                  <span className="font-black text-slate-900 dark:text-white text-sm">
                    {c.discount_type === 'percent' ? `${c.discount_value}% OFF` : `₹${c.discount_value} OFF`}
                  </span>
                  <span className="block text-[10.5px] font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                    {c.test_series_title ? `🎯 ${c.test_series_title}` : '🌐 All Test Series'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Redemptions</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {c.used_count} / {c.max_uses ?? '∞'} used
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    Max {c.max_uses_per_user ?? 1}/student
                  </span>
                </div>
              </div>

              {/* Mobile Actions Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await adminService.toggleCouponPublic(c.id);
                      toast.success(`Coupon "${c.code}" is now ${c.is_public ? 'Private (Hidden)' : 'Public (Visible)'}!`);
                      load();
                    } catch (err) {
                      toast.error(err.message || 'Failed to toggle visibility');
                    }
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1 cursor-pointer ${
                    c.is_public
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                      : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                  }`}
                  title="Toggle Public/Private Visibility"
                >
                  {c.is_public ? <Globe className="h-3.5 w-3.5 text-blue-600" /> : <Lock className="h-3.5 w-3.5 text-amber-600" />}
                  <span>{c.is_public ? 'Public' : 'Private'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNotifyStudents(c.id, c.code)}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-bold border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 transition flex items-center gap-1 cursor-pointer"
                  title="Notify Students"
                >
                  <Bell className="h-3.5 w-3.5" />
                  <span>Notify</span>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    await adminService.toggleCoupon(c.id);
                    load();
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1 cursor-pointer ${
                    c.is_active
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                      : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                  }`}
                >
                  <Ticket className="h-3.5 w-3.5" />
                  <span>{c.is_active ? 'Pause' : 'Activate'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCouponToDelete(c)}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-bold border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-sm space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto border border-blue-200 dark:border-blue-800">
              <Ticket className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white">No Discount Coupons Created</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
              Create promotional discount codes for candidate test series enrollments.
            </p>
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shadow-md transition cursor-pointer inline-flex items-center gap-1.5 mt-1"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Coupon</span>
            </button>
          </div>
        )}
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

          {/* Target Test Series Selection */}
          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-600 dark:text-slate-400 mb-1">
              Apply to Specific Test Series <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <select
              value={form.test_series_id}
              onChange={(e) => setForm((f) => ({ ...f, test_series_id: e.target.value }))}
              className="select w-full rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2.5"
            >
              <option value="">🌐 All Test Series (Universal Platform Discount)</option>
              {testSeriesList.map((ts) => (
                <option key={ts.id} value={ts.id}>
                  🎯 {ts.title} {ts.exam_type ? `(${ts.exam_type})` : ''} - ₹{ts.price}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 mt-1">
              {form.test_series_id
                ? '🔒 Coupon can only be used by students enrolling in this specific test series.'
                : '🌐 Students can apply this discount coupon to any individual test series.'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Max Uses (Total)
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 100"
                className="input w-full rounded-xl"
                value={form.max_uses}
                onChange={(e) => setForm((f) => ({ ...f, max_uses: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Per-Student Limit
              </label>
              <input
                type="number"
                min="1"
                placeholder="1 (Single Use)"
                className="input w-full rounded-xl"
                value={form.max_uses_per_user}
                onChange={(e) => setForm((f) => ({ ...f, max_uses_per_user: e.target.value }))}
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

          {/* Coupon Visibility / Audience */}
          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-600 dark:text-slate-400 mb-1.5">
              Coupon Type & Website Visibility <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, is_public: false, notify_students: false }))}
                className={`p-3 rounded-2xl border text-left transition flex items-start gap-2.5 cursor-pointer ${
                  !form.is_public
                    ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-500/15 text-slate-900 dark:text-white ring-2 ring-amber-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                    🔒 Private / Specific Student
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    Hidden from website. For a specific child, scholarship, or admission voucher. Not visible to everyone.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, is_public: true }))}
                className={`p-3 rounded-2xl border text-left transition flex items-start gap-2.5 cursor-pointer ${
                  form.is_public
                    ? 'border-blue-500 bg-blue-500/10 dark:bg-blue-500/15 text-slate-900 dark:text-white ring-2 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <div className="p-1.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                    🌐 Public Store Offer
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    Visible to all visitors under "Available Promo Offers" on the public test series page.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Broadcast to Students Notification Checkbox or Private Note */}
          {form.is_public ? (
            <div className="p-3 bg-blue-50/60 dark:bg-blue-950/40 rounded-xl border border-blue-200/80 dark:border-blue-900/60">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.notify_students}
                  onChange={(e) => setForm((f) => ({ ...f, notify_students: e.target.checked }))}
                  className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                />
                <div className="text-xs">
                  <span className="font-extrabold text-blue-950 dark:text-blue-200 block">
                    📢 Send In-App Notification to All Active Students
                  </span>
                  <span className="text-[11px] text-blue-700 dark:text-blue-300 font-medium">
                    Students will receive an active discount alert with a direct link to claim this public promo code.
                  </span>
                </div>
              </label>
            </div>
          ) : (
            <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200">
              <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span className="text-[11.5px] leading-snug">
                <strong>Private coupon protection active:</strong> This coupon code will <strong>never</strong> be shown publicly in the test series section. You can share this code directly with the child/parent, and they can enter it at checkout to claim the discount.
              </span>
            </div>
          )}

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
