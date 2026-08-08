import { CONTACT } from '../../data/edvedumContent.js';

export function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.705 1.454h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function WhatsAppSupportButton({
  variant = 'button', // 'button' | 'floating' | 'card'
  type = 'student',   // 'student' | 'institute'
  label = 'WhatsApp Support',
  className = ''
}) {
  const targetHref = type === 'institute'
    ? (CONTACT.whatsappInstituteHref || CONTACT.whatsappHref)
    : (CONTACT.whatsappStudentHref || CONTACT.whatsappHref);

  if (variant === 'floating') {
    return (
      <a
        href={targetHref}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp (+91 91514 24445)"
        aria-label="Chat on WhatsApp"
        className={`fixed bottom-6 right-6 z-[9999] group flex items-center justify-center ${className}`}
      >
        {/* Glowing Ambient Aura Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-70 blur-md animate-pulse group-hover:opacity-100 transition-opacity" />
        
        {/* Animated Ripple Ping Ring */}
        <span className="absolute h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping" />

        {/* Main Circular Button Container */}
        <div className="relative flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-900/50 hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300">
          <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8 fill-current drop-shadow-md" />
        </div>

        {/* Hover Tooltip Label */}
        <div className="absolute right-full mr-3 hidden rounded-xl bg-slate-900/95 px-3 py-1.5 text-xs font-extrabold text-white shadow-2xl group-hover:flex items-center gap-1.5 whitespace-nowrap animate-in fade-in zoom-in-95 duration-150 border border-slate-800 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>Chat on WhatsApp</span>
        </div>
      </a>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`rounded-2xl border p-4 sm:p-5 backdrop-blur-md shadow-sm transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <WhatsAppIcon className="h-5 w-5 text-emerald-500 fill-current" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
              {type === 'institute' ? 'Institutional Customer Care & Admin Support' : 'Student Helpdesk & Admin Support'}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {type === 'institute' 
                ? 'Chat directly with EDVEDUM Admin on WhatsApp for batch management, custom CBT test series, or technical help.'
                : 'Need help with test series, payment issues, or login query? Contact our 24/7 WhatsApp customer care.'}
            </p>
          </div>
        </div>

        <a
          href={targetHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-extrabold text-white shadow-md shadow-emerald-600/20 hover:scale-105 transition shrink-0 cursor-pointer"
        >
          <WhatsAppIcon className="h-4 w-4 fill-current" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    );
  }

  return (
    <a
      href={targetHref}
      target="_blank"
      rel="noopener noreferrer"
      title="Contact Admin / Customer Care on WhatsApp"
      className={`inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-extrabold text-white shadow-sm shadow-emerald-600/20 transition hover:scale-105 active:scale-95 cursor-pointer ${className}`}
    >
      <WhatsAppIcon className="h-3.5 w-3.5 fill-current text-white shrink-0" />
      <span>{label}</span>
    </a>
  );
}
