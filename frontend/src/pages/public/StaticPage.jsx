export default function StaticPage({ title, children }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
      <div className="prose prose-slate mt-6 max-w-none text-slate-600">{children}</div>
    </div>
  );
}
