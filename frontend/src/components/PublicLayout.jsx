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

      {/* FOOTER - Compact SaaS Spacing & Proportional Layout */}
      <footer className="border-t border-slate-800 bg-[#0a1628] text-white">
        <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          
          {/* Main Footer Grid - 6 Column Grid giving Legal ample width */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            
            {/* Column 1 & 2: Brand Info & Social Icons */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <img src={EDVEDUM_LOGO} alt={EDVEDUM_LOGO_ALT} className="h-10 w-auto shrink-0 object-contain sm:h-11" />
                <div className="text-left leading-none space-y-1">
                  <span className="block font-serif font-black tracking-wider text-white text-base sm:text-lg uppercase">
                    EDVEDUM
                  </span>
                  <div className="flex items-center gap-1 text-[9.5px] sm:text-[10px] font-bold tracking-[0.28em] text-[#C5A059] uppercase">
                    <span>—</span>
                    <span>ACADEMY</span>
                    <span>—</span>
                  </div>
                </div>
              </div>
              <p className="mt-2.5 max-w-sm text-[12px] leading-relaxed text-white/60">
                {COMPANY.tagline}. {COMPANY.slogan}
              </p>
              <p className="mt-1.5 text-[11px] text-white/50">{COMPANY.headquarters}</p>

              {/* Social Media Icons */}
              <div className="mt-3.5 flex items-center gap-2">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all duration-200 hover:border-cyan-400/50 hover:bg-blue-600/30 hover:text-[#00F0FF] hover:scale-105"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all duration-200 hover:border-cyan-400/50 hover:bg-blue-600/30 hover:text-[#00F0FF] hover:scale-105"
                >
                  <svg className="h-3.5 w-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all duration-200 hover:border-cyan-400/50 hover:bg-blue-600/30 hover:text-[#00F0FF] hover:scale-105"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all duration-200 hover:border-cyan-400/50 hover:bg-blue-600/30 hover:text-[#00F0FF] hover:scale-105"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 3: Company */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Company</h3>
              <ul className="mt-2.5 space-y-1.5">
                {FOOTER_COMPANY.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-[12px] text-white/60 transition-colors hover:text-[#38bdf8]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Student */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Student</h3>
              <ul className="mt-2.5 space-y-1.5">
                {FOOTER_STUDENT.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-[12px] text-white/60 transition-colors hover:text-[#38bdf8]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5 & 6: Legal */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Legal</h3>
              <ul className="mt-2.5 grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
                {LEGAL_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-[12px] text-white/60 transition-colors hover:text-[#38bdf8] leading-tight">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Contact Strip */}
          <div className="mt-5 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5">
            <p className="text-[11px] text-white/60">
              <span className="font-semibold text-white/80">Contact:</span>{' '}
              <a href={`mailto:${CONTACT.supportEmail}`} className="hover:text-[#38bdf8] transition-colors">
                {CONTACT.supportEmail}
              </a>
              {' · '}
              <a href={CONTACT.phoneHref} className="hover:text-[#38bdf8] transition-colors">
                {CONTACT.phone}
              </a>
            </p>
          </div>

          {/* Copyright Line */}
          <div className="mt-4 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 sm:flex-row">
            <p className="text-[11px] text-white/50">
              © {new Date().getFullYear()} {COMPANY.name} — {COMPANY.legalName}
            </p>
            <p className="text-[11px] text-white/40">{COMPANY.website}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
