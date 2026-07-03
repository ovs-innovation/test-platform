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
      <PageHeader title="Coupons" subtitle="Discount codes for test series." />
      <form onSubmit={create} className="card mb-6 grid gap-3 p-4 sm:grid-cols-5">
        <input className="input" placeholder="CODE" value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))} required />
        <select className="input" value={form.discount_type} onChange={(e) => setForm((f) => ({ ...f, discount_type: e.target.value }))}>
          <option value="percent">Percent</option>
          <option value="fixed">Fixed ₹</option>
        </select>
        <input className="input" type="number" placeholder="Value" value={form.discount_value} onChange={(e) => setForm((f) => ({ ...f, discount_value: e.target.value }))} />
        <input className="input" type="number" placeholder="Max uses" value={form.max_uses} onChange={(e) => setForm((f) => ({ ...f, max_uses: e.target.value }))} />
        <button type="submit" className="btn-primary">Create</button>
      </form>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr><th className="px-4 py-3">Code</th><th className="px-4 py-3">Discount</th><th className="px-4 py-3">Used</th><th className="px-4 py-3">Status</th><th className="px-4 py-3" /></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {coupons.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3 font-mono font-bold">{c.code}</td>
                <td className="px-4 py-3">{c.discount_type === 'percent' ? `${c.discount_value}%` : `₹${c.discount_value}`}</td>
                <td className="px-4 py-3">{c.used_count}/{c.max_uses ?? '∞'}</td>
                <td className="px-4 py-3"><Badge color={c.is_active ? 'green' : 'slate'}>{c.is_active ? 'Active' : 'Inactive'}</Badge></td>
                <td className="px-4 py-3"><button type="button" className="text-xs text-brand-600" onClick={async () => { await adminService.toggleCoupon(c.id); load(); }}>Toggle</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
