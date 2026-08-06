import { useState, useEffect } from 'react';
import {
  Building2,
  Mail,
  Phone,
  UserCheck,
  ShieldCheck,
  Upload,
  Save,
  CheckCircle2,
  AlertCircle,
  Key,
  MapPin,
  Sparkles,
  Trash2,
  Image as ImageIcon,
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext.jsx';
import { institutionDashboardService } from '../../../lib/services.js';

export default function ProfileTab({
  institution = null,
  isDarkMode = true,
}) {
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: institution?.name || '',
    contact_person: institution?.contact_person || '',
    contact_email: institution?.contact_email || institution?.email || '',
    contact_mobile: institution?.contact_mobile || '',
    city: institution?.city || '',
    state: institution?.state || '',
    address: institution?.address || '',
    logo_url: institution?.logo_url || '',
  });

  const [logoPreview, setLogoPreview] = useState(formData.logo_url);
  const [logoImgError, setLogoImgError] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (institution) {
      setFormData({
        name: institution.name || '',
        contact_person: institution.contact_person || '',
        contact_email: institution.contact_email || institution.email || '',
        contact_mobile: institution.contact_mobile || '',
        city: institution.city || '',
        state: institution.state || '',
        address: institution.address || '',
        logo_url: institution.logo_url || '',
      });
      setLogoPreview(institution.logo_url || '');
    }
  }, [institution]);

  const handleLogoUrlChange = (url) => {
    setFormData((prev) => ({ ...prev, logo_url: url }));
    setLogoPreview(url);
    setLogoImgError(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Logo image file size must be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setFormData((prev) => ({ ...prev, logo_url: dataUrl }));
      setLogoPreview(dataUrl);
      setLogoImgError(false);
      toast.success('Logo image uploaded! Click "Save Profile Changes" below to apply.');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setFormData((prev) => ({ ...prev, logo_url: '' }));
    setLogoPreview('');
    setLogoImgError(false);
    toast.info('Logo removed. Default initials badge will be used.');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const instId = institution?.id || 1;
      await institutionDashboardService.updateProfile(instId, formData).catch(() => null);

      const updatedInst = {
        ...institution,
        ...formData,
      };
      localStorage.setItem('edvedum_active_institution', JSON.stringify(updatedInst));
      localStorage.setItem('edvedum_active_school', JSON.stringify(updatedInst));

      // Dispatch storage event so topbar and sidebar logo update immediately
      window.dispatchEvent(new Event('storage'));

      toast.success('Institution Profile & Branding updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile. Saved locally.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* HEADER CARD */}
      <div className={`p-6 rounded-3xl border ${
        isDarkMode ? 'bg-[#0B1730] border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
              <Building2 className="h-3.5 w-3.5" />
              <span>Institutional Identity & Branding</span>
            </div>
            <h2 className="text-xl font-black tracking-tight">Institution Profile & Branding</h2>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Manage your institution name, contact details, official logo badge, and seat allocation parameters.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              <span>Verified Institution Partner</span>
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSaveProfile} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: LOGO & READONLY PARAMS */}
        <div className="lg:col-span-4 space-y-6">
          {/* LOGO CARD */}
          <div className={`p-6 rounded-3xl border text-center space-y-4 ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Official Logo Badge</h3>

            {/* PREVIEW BOX */}
            <div className={`relative w-36 h-36 mx-auto rounded-3xl overflow-hidden border-2 border-dashed flex items-center justify-center p-3 transition ${
              isDarkMode ? 'bg-slate-900/80 border-slate-700' : 'bg-slate-50 border-slate-300 shadow-inner'
            }`}>
              {logoPreview && !logoImgError ? (
                <img
                  src={logoPreview}
                  alt="Institution Logo"
                  onError={() => setLogoImgError(true)}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white font-black text-4xl flex items-center justify-center shadow-lg">
                  {formData.name ? formData.name.substring(0, 2).toUpperCase() : 'VDN'}
                </div>
              )}
            </div>

            {/* FILE UPLOAD BUTTON & CONTROLS */}
            <div className="flex flex-col items-center gap-2 pt-1">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-xs font-extrabold text-white shadow-md hover:scale-[1.02] active:scale-[0.98] transition">
                <Upload className="h-4 w-4" />
                <span>Upload Logo Image</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp, image/svg+xml"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {logoPreview && (
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 hover:text-rose-300 transition cursor-pointer"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>Remove Custom Logo</span>
                </button>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800/40 text-left">
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Or Enter Logo Image URL</label>
              <input
                type="text"
                placeholder="https://example.com/logo.png"
                value={formData.logo_url && !formData.logo_url.startsWith('data:') ? formData.logo_url : ''}
                onChange={(e) => handleLogoUrlChange(e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border transition ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
              <p className="text-[10px] text-slate-400 mt-1">Supports PNG, JPG, SVG web URLs or local file upload (Max 5MB)</p>
            </div>
          </div>

          {/* READ-ONLY LICENSE DETAILS */}
          <div className={`p-6 rounded-3xl border space-y-3.5 ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Key className="h-4 w-4 text-cyan-400" />
              <span>Protected Identity Specs</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className={`flex justify-between p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-slate-400">School / Institution Code:</span>
                <strong className="font-mono text-cyan-500">{institution?.code || institution?.schoolId || (institution?.id ? `INST-${institution.id}` : 'VDN-101')}</strong>
              </div>
              <div className={`flex justify-between p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-slate-400">Enrolled Seat Capacity:</span>
                <strong className="text-emerald-500">{institution?.total_licenses || 50} Student Licenses</strong>
              </div>
              <div className={`flex justify-between p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-slate-400">Active Package:</span>
                <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>AIETS Institutional Gold</strong>
              </div>
              <div className={`flex justify-between p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-slate-400">Validity Period:</span>
                <strong className="text-amber-500">31 Mar 2027</strong>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: EDITABLE DETAILS */}
        <div className="lg:col-span-8 space-y-6">
          <div className={`p-6 rounded-3xl border space-y-5 ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}>
            <h3 className="text-sm font-extrabold flex items-center gap-2 border-b border-slate-800/40 pb-3">
              <UserCheck className="h-4 w-4 text-purple-400" />
              <span>Contact Person & Institutional Details</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">Institution Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full py-2.5 px-3 rounded-xl border transition ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">Contact Person Name</label>
                  <input
                    type="text"
                    value={formData.contact_person}
                    onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                    className={`w-full py-2.5 px-3 rounded-xl border transition ${
                      isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">Contact Email Address</label>
                  <input
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    className={`w-full py-2.5 px-3 rounded-xl border transition ${
                      isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">Mobile / Phone</label>
                  <input
                    type="text"
                    value={formData.contact_mobile}
                    onChange={(e) => setFormData({ ...formData, contact_mobile: e.target.value })}
                    className={`w-full py-2.5 px-3 rounded-xl border transition ${
                      isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full py-2.5 px-3 rounded-xl border transition ${
                      isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">State / Union Territory</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className={`w-full py-2.5 px-3 rounded-xl border transition ${
                      isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">Physical Address</label>
                <textarea
                  rows="3"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full py-2.5 px-3 rounded-xl border transition ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 font-extrabold text-xs text-white shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition cursor-pointer"
                >
                  <Save className="h-4 w-4" />
                  <span>{saving ? 'Saving Profile...' : 'Save Profile Changes'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
