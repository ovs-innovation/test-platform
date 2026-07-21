import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { EDVEDUM_LOGO, EDVEDUM_LOGO_ALT, NAV_MENUS } from '../../data/edvedumContent.js';

const MAIN_NAV = [
  { to: '/', label: 'Home', exact: true },
  { to: '/test-series', label: 'Test Series' },
  { label: 'JEE', menuKey: 'jee' },
  { label: 'NEET', menuKey: 'neet' },
  { label: 'Foundation', menuKey: 'foundation' },
  { label: 'Live Test', menuKey: 'livetest' },
];

function SocialIcon({ type }) {
  const cls = 'h-3.5 w-3.5 text-white/80 transition hover:text-white';
  if (type === 'youtube') {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    );
  }
  if (type === 'instagram') {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.2c2.7 0 3 .01 4.04.06 1.02.05 1.57.22 1.94.37.49.19.84.42 1.21.79.37.37.6.72.79 1.21.15.37.32.92.37 1.94.05 1.04.06 1.34.06 4.04s-.01 3-.06 4.04c-.05 1.02-.22 1.57-.37 1.94-.19.49-.42.84-.79 1.21-.37.37-.72.6-1.21.79-.37.15-.92.32-1.94.37-1.04.05-1.34.06-4.04.06s-3-.01-4.04-.06c-1.02-.05-1.57-.22-1.94-.37a3.3 3.3 0 01-1.21-.79 3.3 3.3 0 01-.79-1.21c-.15-.37-.32-.92-.37-1.94C2.21 15 2.2 14.7 2.2 12s.01-3 .06-4.04c.05-1.02.22-1.57.37-1.94.19-.49.42-.84.79-1.21.37-.37.72-.6 1.21-.79.37-.15.92-.32 1.94-.37C9 2.21 9.3 2.2 12 2.2zm0 1.8c-2.65 0-2.96.01-4 .06-.98.04-1.5.2-1.85.33-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.13.35-.29.87-.33 1.85-.04 1.04-.06 1.35-.06 4s.02 2.96.06 4c.04.98.2 1.5.33 1.85.18.47.4.8.75 1.15.35.35.68.57 1.15.75.35.13.87.29 1.85.33 1.04.04 1.35.06 4 .06s2.96-.02 4-.06c.98-.04 1.5-.2 1.85-.33.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.13-.35.29-.87.33-1.85.04-1.04.06-1.35.06-4s-.02-2.96-.06-4c-.04-.98-.2-1.5-.33-1.85a3.08 3.08 0 00-.75-1.15 3.08 3.08 0 00-1.15-.75c-.35-.13-.87-.29-1.85-.33-1.04-.04-1.35-.06-4-.06zm0 3.08a4.92 4.92 0 110 9.84 4.92 4.92 0 010-9.84zm0 1.8a3.12 3.12 0 100 6.24 3.12 3.12 0 000-6.24zm5.02-.72a1.15 1.15 0 110 2.3 1.15 1.15 0 010-2.3z" />
      </svg>
    );
  }
  if (type === 'facebook') {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12a12 12 0 10-13.87 11.85v-8.4H7.9V12h2.23V9.8c0-2.2 1.3-3.42 3.3-3.42.96 0 1.96.17 1.96.17v2.16h-1.1c-1.09 0-1.43.68-1.43 1.38V12h2.43l-.39 2.45h-2.04v8.4A12 12 0 0024 12z" />
      </svg>
    );
  }
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.42v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function EdvedumLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <img src={EDVEDUM_LOGO} alt={EDVEDUM_LOGO_ALT} className="h-[3.25rem] w-auto shrink-0 object-contain edvedum-logo-glow sm:h-14" />
      <div className="text-sm leading-tight">
        <span className="block font-extrabold tracking-wide text-slate-900">EDVEDUM</span>
        <span className="block text-[10px] font-medium tracking-[0.25em] text-slate-600">— ACADEMY —</span>
      </div>
    </div>
  );
}

const DROPDOWN_STYLES = {
  jee: {
    topBorder: 'border-t-2 border-t-[#0D6EFD]/80',
    glow: 'shadow-[0_10px_25px_rgba(13,110,253,0.14)] border-slate-700/60',
    itemHover: 'hover:bg-[#0D6EFD]/12 hover:text-[#38bdf8]',
    iconColor: 'text-[#38bdf8]',
  },
  neet: {
    topBorder: 'border-t-2 border-t-[#00F0FF]/80',
    glow: 'shadow-[0_10px_25px_rgba(0,240,255,0.14)] border-slate-700/60',
    itemHover: 'hover:bg-[#00F0FF]/12 hover:text-[#00F0FF]',
    iconColor: 'text-[#00F0FF]',
  },
  foundation: {
    topBorder: 'border-t-2 border-t-[#4F46E5]/80',
    glow: 'shadow-[0_10px_25px_rgba(79,70,229,0.14)] border-slate-700/60',
    itemHover: 'hover:bg-[#4F46E5]/15 hover:text-[#818cf8]',
    iconColor: 'text-[#818cf8]',
  },
  livetest: {
    topBorder: 'border-t-2 border-t-[#7C3AED]/80',
    glow: 'shadow-[0_10px_25px_rgba(124,58,237,0.14)] border-slate-700/60',
    itemHover: 'hover:bg-[#7C3AED]/15 hover:text-[#c084fc]',
    iconColor: 'text-[#c084fc]',
  },
};

export default function PublicHeader() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { pathname, search } = location;
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);

  // Close dropdowns on route or search query changes
  useEffect(() => {
    setOpenMenu(null);
    setMenuOpen(false);
  }, [pathname, search]);

  // Close dropdown when clicking anywhere outside or on non-dropdown links
  useEffect(() => {
    const close = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const isActive = (item) => (item.exact ? pathname === '/' : pathname.startsWith(item.to));

  const renderMobileLinks = (menuKey) =>
    NAV_MENUS[menuKey].map((link) => (
      <Link
        key={link.to + link.label}
        to={link.to}
        onClick={() => {
          setOpenMenu(null);
          setMenuOpen(false);
        }}
        className="border-b border-slate-50 py-2.5 pl-4 text-sm text-slate-600 hover:text-[#0D6EFD] transition-colors"
      >
        {link.label}
      </Link>
    ));

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#0a1628] text-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 px-4 py-2 text-[11px] sm:px-6 sm:text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <a href="tel:18003383386" className="flex items-center gap-1.5 text-white/85 hover:text-white transition-colors">
              1800-EDVEDUM (3383386)
            </a>
            <a href="mailto:support@edvedum.com" className="hidden text-white/85 hover:text-white sm:inline transition-colors">
              support@edvedum.com
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
            {user ? (
              <>
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  onClick={() => setOpenMenu(null)}
                  className="text-white/85 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(null);
                    logout();
                  }}
                  className="text-white/85 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpenMenu(null)} className="text-white/85 hover:text-white transition-colors">
                  Student Login
                </Link>
                <span className="text-white/30" aria-hidden="true">|</span>
                <Link to="/admin-login" onClick={() => setOpenMenu(null)} className="text-white/85 hover:text-white transition-colors">
                  Center Login
                </Link>
                <span className="text-white/30 hidden sm:inline" aria-hidden="true">|</span>
                <Link to="/blog" onClick={() => setOpenMenu(null)} className="hidden text-white/85 hover:text-white transition-colors sm:inline">
                  Blog
                </Link>
                <span className="text-white/30 hidden md:inline" aria-hidden="true">|</span>
                <Link to="/careers" onClick={() => setOpenMenu(null)} className="hidden text-white/85 hover:text-white transition-colors md:inline">
                  Careers
                </Link>
              </>
            )}
            <div className="flex items-center gap-2 border-l border-white/20 pl-3">
              <SocialIcon type="youtube" />
              <SocialIcon type="instagram" />
              <SocialIcon type="facebook" />
              <SocialIcon type="linkedin" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" onClick={() => setOpenMenu(null)}>
            <EdvedumLogo />
          </Link>

          <nav ref={navRef} className="hidden items-center gap-6 xl:flex">
            {MAIN_NAV.map((item) => {
              if (item.menuKey) {
                const links = NAV_MENUS[item.menuKey];
                const open = openMenu === item.menuKey;
                const theme = DROPDOWN_STYLES[item.menuKey] || DROPDOWN_STYLES.jee;
                return (
                  <div key={item.label} className="relative group">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenu(open ? null : item.menuKey);
                      }}
                      className={`inline-flex items-center gap-1 text-[13px] font-semibold transition-colors cursor-pointer ${
                        open ? 'text-[#0D6EFD]' : 'text-slate-700 hover:text-[#0D6EFD]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <svg className={`h-3.5 w-3.5 transition-transform duration-200 text-slate-500 group-hover:text-[#0D6EFD] ${open ? 'rotate-180 text-[#0D6EFD]' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {open && (
                      <div
                        className={`absolute left-0 top-full z-50 mt-2.5 min-w-[210px] overflow-hidden rounded-xl border bg-[#0c1427]/95 p-1.5 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-1.5 duration-200 ease-out ${theme.topBorder} ${theme.glow}`}
                      >
                        <div className="mb-1.5 px-3 pt-2 pb-1.5 border-b border-[#2A303C]/50">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                            {item.label} Target
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          {links.map((link) => (
                            <Link
                              key={link.to + link.label}
                              to={link.to}
                              onClick={() => setOpenMenu(null)}
                              className={`group/item flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 transition-all duration-200 ease-out ${theme.itemHover}`}
                            >
                              <svg className={`h-4 w-4 shrink-0 opacity-80 transition-transform duration-200 ease-out group-hover/item:scale-110 ${theme.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                              </svg>
                              <span className="flex-1">{link.label}</span>
                              <span className="text-slate-500 text-[10px] transition-transform duration-200 ease-out group-hover/item:translate-x-0.5">→</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              const active = isActive(item);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpenMenu(null)}
                  className={`relative text-[13px] transition ${active
                    ? 'font-semibold text-[#0D6EFD] after:absolute after:-bottom-[22px] after:left-0 after:h-0.5 after:w-full after:bg-[#0D6EFD]'
                    : 'font-medium text-slate-600 hover:text-[#0D6EFD]'
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/signup" className="edvedum-btn-gradient hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md sm:inline-flex">
              Enroll Now
            </Link>
            <button
              type="button"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 xl:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-100 px-4 py-3 xl:hidden">
            <nav className="flex flex-col">
              {MAIN_NAV.map((item) =>
                item.menuKey ? (
                  <div key={item.label}>
                    <p className="py-2 text-xs font-bold uppercase tracking-wide text-slate-400">{item.label}</p>
                    {renderMobileLinks(item.menuKey)}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={`border-b border-slate-50 py-3 text-sm ${isActive(item) ? 'font-semibold text-[#0D6EFD]' : 'font-medium text-slate-700 hover:text-[#0D6EFD]'
                      }`}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="edvedum-btn-gradient mt-3 rounded-full py-3 text-center text-sm font-semibold text-white">
                Enroll Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
