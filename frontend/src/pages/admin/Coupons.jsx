import { useEffect, useState, useRef } from 'react';
import { Ticket, ChevronDown, Check, Percent } from 'lucide-react';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, PageHeader, Badge } from '../../components/ui.jsx';
import ActionDropdown from '../../components/ActionDropdown.jsx';
import { useToast } from '../../context/ToastContext.jsx';

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
        className="w-full flex items-center justify-between gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2.5 px-3.5 text-xs font-bold text-slate-800 dark:text-slate-100 hover:border-blue-500/80 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
  const [form, setForm] = useState({ code: '', discount_type: 'percent', discount_value: 10, max_uses: 100 });
  const [loading, setLoading] = useState(true);

  const load = () => adminService.coupons().then(setCoupons).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await adminService.createCoupon(form);
      toast.success('Coupon created');
      load();
    } catch (err) { toast.error(err.message); }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div>
      <PageHeader title="Discount Coupons" subtitle="Create and manage discount codes for test series." />
      <form onSubmit={create} className="rounded-2xl mb-6 grid gap-3 p-4 sm:grid-cols-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xs">
        <input className="input uppercase tracking-wider font-mono font-bold rounded-xl" placeholder="CODE" value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))} required />
        <CustomDiscountTypeDropdown
          value={form.discount_type}
          onChange={(val) => setForm((f) => ({ ...f, discount_type: val }))}
        />
        <input className="input rounded-xl" type="number" placeholder="Value" value={form.discount_value} onChange={(e) => setForm((f) => ({ ...f, discount_value: e.target.value }))} />
        <input className="input rounded-xl" type="number" placeholder="Max uses" value={form.max_uses} onChange={(e) => setForm((f) => ({ ...f, max_uses: e.target.value }))} />
        <button type="submit" className="btn-primary rounded-xl font-extrabold cursor-pointer">Create Coupon</button>
      </form>
      <div className="card overflow-hidden p-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
        <table className="w-full text-xs">
          <thead className="bg-slate-100/80 dark:bg-slate-900/80 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-4 py-3.5">Code</th>
              <th className="px-4 py-3.5">Discount</th>
              <th className="px-4 py-3.5">Used</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-[#111827]">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                <td className="px-4 py-3.5 font-mono font-black text-blue-600 dark:text-blue-400">{c.code}</td>
                <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">{c.discount_type === 'percent' ? `${c.discount_value}% OFF` : `₹${c.discount_value} OFF`}</td>
                <td className="px-4 py-3.5 font-semibold text-slate-700 dark:text-slate-300">{c.used_count}/{c.max_uses ?? '∞'}</td>
                <td className="px-4 py-3.5"><Badge color={c.is_active ? 'green' : 'slate'}>{c.is_active ? 'Active' : 'Inactive'}</Badge></td>
                <td className="px-4 py-3.5 text-right">
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
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

