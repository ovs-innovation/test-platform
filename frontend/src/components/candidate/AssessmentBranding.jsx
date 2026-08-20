import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Building2 } from 'lucide-react';

/**
 * Reusable Co-Branding Header component for Student CBT Assessment Pages.
 * Automatically determines whether candidate is Direct EDVEDUM Student or Institution-Linked.
 * 
 * @param {'instructions' | 'cbt'} variant Layout mode: 'instructions' (for instructions top bar) or 'cbt' (for exam top bar)
 * @param {object} [customInstitution] Optional override institution data object ({ id, name, logo_url, logo_badge })
 */
export default function AssessmentBranding({ variant = 'instructions', customInstitution = null }) {
  const { user } = useAuth();
  const [imgError, setImgError] = useState(false);

  // Authoritative server student institution relationship
  const instId = customInstitution?.id || user?.institution_id || user?.institutionId;
  const instName = customInstitution?.name || user?.institution_name || user?.institutionName;
  const logoUrl = customInstitution?.logo_url || user?.institution_logo_url || user?.logoUrl;
  const logoBadge = customInstitution?.logo_badge || user?.institution_logo_badge || (instName ? instName.substring(0, 3).toUpperCase() : 'INST');

  const isInstitutionLinked = Boolean(instId && instName);

  // Fallback logo renderer (safely handles missing or broken logo images)
  const renderLogo = (sizeClass = 'h-8 w-8') => {
    if (logoUrl && !imgError) {
      return (
        <img
          src={logoUrl}
          alt={instName || 'Institution Logo'}
          className={`${sizeClass} object-contain rounded-md bg-white p-0.5 shadow-xs border border-slate-200 dark:border-slate-700`}
          onError={() => setImgError(true)}
        />
      );
    }
    return (
      <div className={`${sizeClass} flex items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-indigo-700 font-extrabold text-xs text-white shadow-xs`}>
        {logoBadge ? (
          <span>{logoBadge.slice(0, 3)}</span>
        ) : (
          <Building2 className="h-4 w-4" />
        )}
      </div>
    );
  };

  // =========================================================
  // VARIANT A: ASSESSMENT INSTRUCTIONS TOP HEADER
  // =========================================================
  if (variant === 'instructions') {
    if (isInstitutionLinked) {
      return (
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2 bg-[#0f172a] text-white">
          <div className="flex items-center gap-3 min-w-0">
            {renderLogo('h-9 w-9')}
            <div className="min-w-0">
              <h2 className="truncate text-sm font-extrabold tracking-wide uppercase text-white">
                {instName}
              </h2>
              <p className="text-[11px] font-medium text-slate-300">
                Computer Based Test — General Instructions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-200 bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800/60">
            <span className="text-slate-400 font-normal">Powered by</span>
            <span className="font-extrabold tracking-wide text-white">EDVEDUM</span>
          </div>
        </div>
      );
    }

    // Default Direct EDVEDUM Student Header
    return (
      <div className="nta-bar px-4 py-2.5">
        <p className="text-sm font-black uppercase tracking-wide text-white">
          Computer Based Test — General Instructions
        </p>
        <p className="mt-0.5 text-xs font-medium text-blue-100 dark:text-blue-200">
          Read all instructions carefully before proceeding
        </p>
      </div>
    );
  }

  // =========================================================
  // VARIANT B: ACTUAL CBT EXAM HEADER LAYER
  // =========================================================
  if (isInstitutionLinked) {
    return (
      <div className="flex items-center gap-2.5 min-w-0">
        {renderLogo('h-8 w-8')}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-xs font-black uppercase tracking-wider text-amber-300">
              {instName}
            </h2>
            <span className="hidden sm:inline-block text-[10px] font-bold text-blue-200 bg-blue-900/50 px-1.5 py-0.5 rounded border border-blue-700/50">
              Powered by EDVEDUM
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Default Direct EDVEDUM Student CBT Brand
  return null;
}
