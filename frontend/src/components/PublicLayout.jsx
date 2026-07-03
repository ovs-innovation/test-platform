import { Link, Outlet } from 'react-router-dom';
import PublicHeader from './public/PublicHeader.jsx';

const FOOTER_LINKS = [
  { to: '/test-series', label: 'Test series' },
  { to: '/free-mock', label: 'Free mock' },
  { to: '/faqs', label: 'FAQ' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
  { to: '/contact', label: 'Contact' },
];

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicHeader />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-slate-50 py-8">
        <div className="container-app flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} AssessPro — NTA-style mock tests for students.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {FOOTER_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="text-sm text-slate-500 hover:text-slate-800">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
