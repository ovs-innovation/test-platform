import { useEffect, useState } from 'react';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, PageHeader, Badge } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';

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
      <form onSubmit={create} className="card mb-6 grid gap-3 p-4 sm:grid-cols-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
        <input className="input uppercase tracking-wider font-mono font-bold" placeholder="CODE" value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))} required />
        <select className="input" value={form.discount_type} onChange={(e) => setForm((f) => ({ ...f, discount_type: e.target.value }))}>
          <option value="percent">Percent (%)</option>
          <option value="fixed">Fixed (₹)</option>
        </select>
        <input className="input" type="number" placeholder="Value" value={form.discount_value} onChange={(e) => setForm((f) => ({ ...f, discount_value: e.target.value }))} />
        <input className="input" type="number" placeholder="Max uses" value={form.max_uses} onChange={(e) => setForm((f) => ({ ...f, max_uses: e.target.value }))} />
        <button type="submit" className="btn-primary">Create Coupon</button>
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
                  <button type="button" className="btn-secondary !p-1.5 text-blue-600 dark:text-blue-400" onClick={async () => { await adminService.toggleCoupon(c.id); load(); }}>
                    {c.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

