import { Link, Outlet } from 'react-router-dom';
import PublicHeader from './public/PublicHeader.jsx';
import { COMPANY, CONTACT, EDVEDUM_LOGO, EDVEDUM_LOGO_ALT, FOOTER_COMPANY, FOOTER_STUDENT, LEGAL_LINKS } from '../data/edvedumContent.js';

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicHeader />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 bg-[#0a1628] text-white">
        <div className="mx-auto max-w-[1280px] px-4 py-10 lg:px-8 lg:py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2">
                <img src={EDVEDUM_LOGO} alt={EDVEDUM_LOGO_ALT} className="h-12 w-auto object-contain edvedum-logo-glow" />
                <div>
                  <p className="font-extrabold tracking-wide">EDVEDUM Academy</p>
                  <p className="text-[10px] tracking-[0.2em] text-white/60">— ACADEMY —</p>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-white/60">
                {COMPANY.tagline}. {COMPANY.slogan}
              </p>
              <p className="mt-2 text-[12px] text-white/50">{COMPANY.headquarters}</p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">Company</h3>
              <ul className="mt-4 space-y-2">
                {FOOTER_COMPANY.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-[13px] text-white/60 hover:text-white">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">Student</h3>
              <ul className="mt-4 space-y-2">
                {FOOTER_STUDENT.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-[13px] text-white/60 hover:text-white">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">Legal</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {LEGAL_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-[13px] text-white/60 hover:text-white">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-[12px] text-white/60">
              <span className="font-semibold text-white/80">Contact:</span>{' '}
              <a href={`mailto:${CONTACT.supportEmail}`} className="hover:text-white">{CONTACT.supportEmail}</a>
              {' · '}
              <a href={CONTACT.phoneHref} className="hover:text-white">{CONTACT.phone}</a>
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
            <p className="text-[12px] text-white/50">
              © {new Date().getFullYear()} {COMPANY.name} — {COMPANY.legalName}
            </p>
            <p className="text-[12px] text-white/40">{COMPANY.website}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
