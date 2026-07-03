import { useEffect, useState } from 'react';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, PageHeader, Spinner } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function AdminCMS() {
  const toast = useToast();
  const [pages, setPages] = useState([]);
  const [form, setForm] = useState({ slug: '', title: '', content: '', page_type: 'blog', excerpt: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = () => adminService.cms().then(setPages).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminService.saveCms(form);
      toast.success('Saved');
      setForm({ slug: '', title: '', content: '', page_type: 'blog', excerpt: '' });
      load();
    } catch (err) { toast.error(err.message); }
    finally { setSaving(false); }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div>
      <PageHeader title="CMS" subtitle="Blog posts, FAQs and static pages." />
      <form onSubmit={save} className="card mb-6 space-y-3 p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <input className="input" placeholder="slug-url" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} required />
          <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
          <select className="input" value={form.page_type} onChange={(e) => setForm((f) => ({ ...f, page_type: e.target.value }))}>
            <option value="blog">Blog</option>
            <option value="faq">FAQ</option>
            <option value="page">Page</option>
          </select>
        </div>
        <input className="input" placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} />
        <textarea className="input" rows={5} placeholder="HTML content" value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} />
        <button type="submit" className="btn-primary" disabled={saving}>{saving ? <Spinner className="h-4 w-4" /> : 'Save page'}</button>
      </form>
      <div className="space-y-2">
        {pages.map((p) => (
          <div key={p.id} className="card flex items-center justify-between p-4 text-sm">
            <div><span className="badge bg-slate-100">{p.page_type}</span> <strong className="ml-2">{p.title}</strong> <span className="text-slate-400">/{p.slug}</span></div>
            <button type="button" className="text-red-600" onClick={async () => { await adminService.deleteCms(p.id); load(); }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
