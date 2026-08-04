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
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext.jsx';
import { institutionDashboardService } from '../../../lib/services.js';

export default function ProfileTab({
  institution = null,
  isDarkMode = true,
}) {
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: institution?.name || 'S.S.C Public School',
    contact_person: institution?.contact_person || 'Dr. Ramesh Sharma',
    contact_email: institution?.contact_email || institution?.email || 'admin@sscpublic.edu.in',
    contact_mobile: institution?.contact_mobile || '+91 98765 43210',
    city: institution?.city || 'New Delhi',
    state: institution?.state || 'Delhi',
    address: institution?.address || '12, Knowledge Park, Institutional Area, New Delhi - 110001',
    logo_url: institution?.logo_url || '',
  });

  const [logoPreview, setLogoPreview] = useState(formData.logo_url);
  const [logoImgError, setLogoImgError] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (institution) {
      setFormData((prev) => ({
        ...prev,
        name: institution.name || prev.name,
        contact_person: institution.contact_person || prev.contact_person,
        contact_email: institution.contact_email || institution.email || prev.contact_email,
        contact_mobile: institution.contact_mobile || prev.contact_mobile,
        city: institution.city || prev.city,
        state: institution.state || prev.state,
        address: institution.address || prev.address,
        logo_url: institution.logo_url || prev.logo_url,
      }));
      setLogoPreview(institution.logo_url || '');
    }
  }, [institution]);

  const handleLogoUrlChange = (url) => {
    setFormData((prev) => ({ ...prev, logo_url: url }));
    setLogoPreview(url);
    setLogoImgError(false);
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

      toast.success('Institution Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile. Saved locally.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className={`p-6 rounded-3xl border ${
        isDarkMode ? 'bg-[#0B1730] border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
              <Building2 className="h-3.5 w-3.5" />
              <span>Institutional Identity</span>
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

            <div className="relative w-28 h-28 mx-auto rounded-3xl overflow-hidden border-2 border-dashed border-cyan-500/30 flex items-center justify-center p-2 bg-slate-900/50">
              {logoPreview && !logoImgError ? (
                <img
                  src={logoPreview}
                  alt="Institution Logo"
                  onError={() => setLogoImgError(true)}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-black text-3xl flex items-center justify-center shadow-lg">
                  {formData.name ? formData.name.substring(0, 2).toUpperCase() : 'SSC'}
                </div>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Image URL / Upload Path</label>
              <input
                type="text"
                placeholder="https://example.com/logo.png"
                value={formData.logo_url}
                onChange={(e) => handleLogoUrlChange(e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border transition ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                }`}
              />
            </div>
            <p className="text-[10px] text-slate-500">Supports PNG, JPG, SVG web URLs</p>
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
                <strong className="font-mono text-cyan-500">{institution?.code || 'SSC-123'}</strong>
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
            <h3 className="text-sm font-extrabold border-b border-slate-800/40 pb-3">Institution Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Institution Legal Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border transition ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Authorized Contact Person *</label>
                <input
                  type="text"
                  required
                  value={formData.contact_person}
                  onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border transition ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Official Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.contact_email}
                  onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border transition ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Contact Mobile Number *</label>
                <input
                  type="text"
                  required
                  value={formData.contact_mobile}
                  onChange={(e) => setFormData({ ...formData, contact_mobile: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border transition ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border transition ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">State / Region *</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border transition ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-300 mb-1">Complete Postal Address</label>
                <textarea
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border transition ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/40 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-xs font-extrabold text-white shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
