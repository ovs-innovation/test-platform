import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Trophy,
  GraduationCap,
  Users,
  Building2,
  Award,
  Star,
  CheckCircle2,
  Target,
  BookOpen,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  ExternalLink,
  Check,
} from 'lucide-react';
import { AdminHeader, AdminCard } from '../../components/admin/AdminUI.jsx';
import { LoadingScreen } from '../../components/ui.jsx';
import { adminService } from '../../lib/services.js';
import { useToast } from '../../context/ToastContext.jsx';

const ICON_OPTIONS = [
  { id: 'Trophy', label: 'Trophy (Selections / Achievements)', icon: Trophy },
  { id: 'GraduationCap', label: 'Graduation Cap (Faculty / Teachers)', icon: GraduationCap },
  { id: 'Users', label: 'Students / Community', icon: Users },
  { id: 'Building2', label: 'Centers / Campus', icon: Building2 },
  { id: 'Award', label: 'Award / Badge', icon: Award },
  { id: 'Star', label: 'Star', icon: Star },
  { id: 'Target', label: 'Target / Ranks', icon: Target },
  { id: 'BookOpen', label: 'Books / Material', icon: BookOpen },
];

const COLOR_PRESETS = [
  {
    id: 'cyan',
    name: 'Cyan Blue',
    textColor: 'text-[#0891b2]',
    bgColor: 'bg-cyan-50 border-cyan-200/80 text-[#0891b2]',
    dot: 'bg-cyan-500',
  },
  {
    id: 'blue',
    name: 'Royal Blue',
    textColor: 'text-[#0D6EFD]',
    bgColor: 'bg-blue-50 border-blue-200/80 text-[#0D6EFD]',
    dot: 'bg-blue-600',
  },
  {
    id: 'purple',
    name: 'Purple',
    textColor: 'text-[#7C3AED]',
    bgColor: 'bg-purple-50 border-purple-200/80 text-[#7C3AED]',
    dot: 'bg-purple-600',
  },
  {
    id: 'amber',
    name: 'Amber Gold',
    textColor: 'text-amber-600',
    bgColor: 'bg-amber-50 border-amber-200/80 text-amber-600',
    dot: 'bg-amber-500',
  },
  {
    id: 'emerald',
    name: 'Emerald Green',
    textColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50 border-emerald-200/80 text-emerald-600',
    dot: 'bg-emerald-500',
  },
];

const DEFAULT_ACHIEVEMENTS = {
  eyebrow: 'Trusted by',
  title: 'Our achievements',
  description: 'Selections and structured preparation across JEE, NEET and Foundation programs.',
  items: [
    {
      id: 'faculty',
      target: 25,
      suffix: '+',
      label: 'Expert faculty',
      icon: 'GraduationCap',
      textColor: 'text-[#0D6EFD]',
      bgColor: 'bg-blue-50 border-blue-200/80 text-[#0D6EFD]',
    },
    {
      id: 'students',
      target: 1000,
      suffix: '+',
      label: 'Students trained',
      icon: 'Users',
      textColor: 'text-[#7C3AED]',
      bgColor: 'bg-purple-50 border-purple-200/80 text-[#7C3AED]',
    },
    {
      id: 'neet-jee-selections',
      target: 100,
      suffix: '+',
      label: 'students selected in NEET/JEE',
      icon: 'Trophy',
      textColor: 'text-[#0891b2]',
      bgColor: 'bg-cyan-50 border-cyan-200/80 text-[#0891b2]',
    },
    {
      id: 'centers',
      target: 5,
      suffix: '+',
      label: 'Study centers',
      icon: 'Building2',
      textColor: 'text-[#7C3AED]',
      bgColor: 'bg-purple-50 border-purple-200/80 text-[#7C3AED]',
    },
  ],
};

const DEFAULT_OFFERS = {
  hero_offer: {
    is_enabled: true,
    badge_text: 'Latest',
    title: 'NEET & JEE 2026 Test Series',
    middle_text: 'now live — enroll early & get',
    discount_highlight: '20% off',
    tail_text: 'on all full mocks.',
    button_text: 'View announcements',
    button_link: '/test-series',
  },
};

export default function AdminOffersAndAchievements() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('offers');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [achievements, setAchievements] = useState(DEFAULT_ACHIEVEMENTS);
  const [heroOffer, setHeroOffer] = useState(DEFAULT_OFFERS.hero_offer);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await adminService.landingContent();
      if (data?.achievements) {
        setAchievements({
          ...DEFAULT_ACHIEVEMENTS,
          ...data.achievements,
          items: data.achievements.items?.length ? data.achievements.items : DEFAULT_ACHIEVEMENTS.items,
        });
      }
      if (data?.offers?.hero_offer) {
        setHeroOffer({
          ...DEFAULT_OFFERS.hero_offer,
          ...data.offers.hero_offer,
        });
      }
    } catch (err) {
      toast.error('Failed to load settings: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      await adminService.updateLandingContent({
        achievements,
        offers: {
          hero_offer: heroOffer,
        },
      });
      toast.success('Website highlights updated successfully!');
    } catch (err) {
      toast.error('Failed to save changes: ' + (err.message || err));
    } finally {
      setSaving(false);
    }
  };

  const updateCard = (index, field, value) => {
    setAchievements((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };

  const updateCardColor = (index, preset) => {
    setAchievements((prev) => {
      const items = [...prev.items];
      items[index] = {
        ...items[index],
        textColor: preset.textColor,
        bgColor: preset.bgColor,
      };
      return { ...prev, items };
    });
  };

  const addCard = () => {
    setAchievements((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: 'card-' + Date.now(),
          target: 100,
          suffix: '+',
          label: 'students selected in NEET/JEE',
          icon: 'Trophy',
          textColor: 'text-[#0891b2]',
          bgColor: 'bg-cyan-50 border-cyan-200/80 text-[#0891b2]',
        },
      ],
    }));
  };

  const removeCard = (index) => {
    if (achievements.items.length <= 1) {
      toast.error('At least one achievement card must remain.');
      return;
    }
    setAchievements((prev) => {
      const items = prev.items.filter((_, i) => i !== index);
      return { ...prev, items };
    });
  };

  const resetAchievements = () => {
    if (window.confirm('Reset achievement numbers back to the default 4 cards (including 100+ students selected in NEET/JEE)?')) {
      setAchievements(DEFAULT_ACHIEVEMENTS);
      toast.info('Achievements reset to default. Click Save Changes to commit.');
    }
  };

  if (loading) return <LoadingScreen label="Loading settings..." />;

  return (
    <div className="w-full max-w-full space-y-6">
      {/* Header */}
      <AdminHeader
        title="Homepage Offers & Achievements"
        subtitle="Simple, client-friendly controls for your website announcement bar and student achievement numbers."
        breadcrumbs={['Website Content', 'Offers & Achievements']}
        actions={
          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-xs"
            >
              <ExternalLink className="h-4 w-4" />
              <span>View Website</span>
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 text-xs font-extrabold text-white shadow-md transition cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? 'Saving…' : 'Save Changes'}</span>
            </button>
          </div>
        }
      />

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-3">
        <button
          onClick={() => setActiveTab('offers')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm transition cursor-pointer ${
            activeTab === 'offers'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>Homepage Offer Bar</span>
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm transition cursor-pointer ${
            activeTab === 'achievements'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <Trophy className="h-4 w-4" />
          <span>Our Achievements (4 Cards)</span>
        </button>
      </div>

      {/* ================= TAB 1: HOMEPAGE OFFER BAR ================= */}
      {activeTab === 'offers' && (
        <div className="space-y-6">
          {/* LIVE PREVIEW */}
          <AdminCard
            title="Live Preview of Announcement Bar"
            subtitle="This is exactly how your banner appears right under the hero section on your homepage"
          >
            {heroOffer.is_enabled !== false ? (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-gradient-to-r from-[#f5f3ff] via-white to-[#eff6ff] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex items-start sm:items-center gap-3">
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#7c3aed] px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-wider text-white shadow-sm shadow-purple-500/20">
                    <Sparkles className="h-3 w-3" />
                    {heroOffer.badge_text || 'Latest'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                    {heroOffer.title && (
                      <span className="font-bold text-slate-900">
                        {heroOffer.title}{' '}
                      </span>
                    )}
                    {heroOffer.middle_text || 'now live — enroll early & get'}{' '}
                    {heroOffer.discount_highlight && (
                      <span className="font-extrabold text-[#7c3aed]">
                        {heroOffer.discount_highlight}{' '}
                      </span>
                    )}
                    {heroOffer.tail_text || 'on all full mocks.'}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/60 px-4 py-2 text-xs font-bold text-blue-600 shrink-0">
                  <span>{heroOffer.button_text || 'View announcements'}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-blue-600" />
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-6 text-center text-slate-500 dark:text-slate-400 text-xs">
                ⚠️ Announcement Bar is currently <strong>Hidden</strong> on the website.
              </div>
            )}
          </AdminCard>

          {/* SIMPLE EDIT FORM */}
          <AdminCard
            title="Edit Announcement & Offer"
            subtitle="Change the text, discount offer, or button in one simple place"
          >
            <div className="space-y-5">
              {/* ON/OFF TOGGLE */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Show Announcement Bar on Website
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Turn this ON to show the banner on your homepage, or OFF to hide it.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={heroOffer.is_enabled !== false}
                    onChange={(e) => setHeroOffer({ ...heroOffer, is_enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* 4 SIMPLE FIELDS */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    1. Badge Tag
                  </label>
                  <input
                    type="text"
                    className="input text-xs w-full"
                    value={heroOffer.badge_text || ''}
                    onChange={(e) => setHeroOffer({ ...heroOffer, badge_text: e.target.value })}
                    placeholder="e.g. Latest, Special Offer, Admission Open"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Small colored pill badge at the start</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    2. Headline (Bold Subject)
                  </label>
                  <input
                    type="text"
                    className="input text-xs w-full font-bold"
                    value={heroOffer.title || ''}
                    onChange={(e) => setHeroOffer({ ...heroOffer, title: e.target.value })}
                    placeholder="e.g. NEET & JEE 2026 Test Series"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">First bold title text</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    3. Highlighted Discount / Offer Text
                  </label>
                  <input
                    type="text"
                    className="input text-xs w-full font-extrabold text-purple-600 dark:text-purple-400"
                    value={heroOffer.discount_highlight || ''}
                    onChange={(e) => setHeroOffer({ ...heroOffer, discount_highlight: e.target.value })}
                    placeholder="e.g. 20% off"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Highlighted in bold purple</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    4. Supporting Offer Message
                  </label>
                  <input
                    type="text"
                    className="input text-xs w-full"
                    value={heroOffer.middle_text || ''}
                    onChange={(e) => setHeroOffer({ ...heroOffer, middle_text: e.target.value })}
                    placeholder="now live — enroll early & get"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Text shown before the discount highlight</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    5. Button Text
                  </label>
                  <input
                    type="text"
                    className="input text-xs w-full"
                    value={heroOffer.button_text || ''}
                    onChange={(e) => setHeroOffer({ ...heroOffer, button_text: e.target.value })}
                    placeholder="View announcements"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    6. Button Link URL
                  </label>
                  <input
                    type="text"
                    className="input text-xs w-full font-mono"
                    value={heroOffer.button_link || ''}
                    onChange={(e) => setHeroOffer({ ...heroOffer, button_link: e.target.value })}
                    placeholder="/test-series"
                  />
                </div>
              </div>
            </div>
          </AdminCard>
        </div>
      )}

      {/* ================= TAB 2: OUR ACHIEVEMENTS ================= */}
      {activeTab === 'achievements' && (
        <div className="space-y-6">
          {/* LIVE PREVIEW */}
          <AdminCard
            title="Live Preview of Achievements"
            subtitle="Real-time look of the 4 achievement cards shown on the homepage"
            action={
              <button
                type="button"
                onClick={resetAchievements}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Defaults</span>
              </button>
            }
          >
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F5F6FA] p-6 text-[#1A1F2E]">
              <div className="text-center max-w-xl mx-auto mb-6">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#7C3AED]">
                  {achievements.eyebrow}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {achievements.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {achievements.description}
                </p>
              </div>

              {/* 4 Cards Grid Preview */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {achievements.items.map((item, idx) => {
                  const iconObj = ICON_OPTIONS.find((i) => i.id === item.icon);
                  const Icon = iconObj ? iconObj.icon : Trophy;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-between rounded-2xl border border-slate-200/90 bg-white px-3.5 py-5 text-center shadow-xs"
                    >
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${item.bgColor || 'bg-blue-50 text-[#0D6EFD]'} mb-3`}>
                        <Icon className="h-5.5 w-5.5" strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className={`text-2xl font-extrabold ${item.textColor || 'text-[#0D6EFD]'}`}>
                          {item.target}
                          {item.suffix}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-slate-600 leading-snug">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </AdminCard>

          {/* EDIT CARDS */}
          <AdminCard
            title="Edit Achievement Numbers"
            subtitle="Directly edit the number, suffix, and title for each card shown on your homepage"
            action={
              <button
                type="button"
                onClick={addCard}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add New Card</span>
              </button>
            }
          >
            <div className="space-y-4">
              {achievements.items.map((item, idx) => {
                const iconObj = ICON_OPTIONS.find((i) => i.id === item.icon);
                const Icon = iconObj ? iconObj.icon : Trophy;

                return (
                  <div
                    key={item.id || idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${item.bgColor || 'bg-blue-50 text-[#0D6EFD]'}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                        Card #{idx + 1}
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-2 sm:grid-cols-12 gap-3 w-full">
                      {/* Number */}
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Number
                        </label>
                        <input
                          type="number"
                          className="input text-xs w-full font-mono font-bold"
                          value={item.target}
                          onChange={(e) => updateCard(idx, 'target', Number(e.target.value) || 0)}
                        />
                      </div>

                      {/* Suffix */}
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Suffix
                        </label>
                        <input
                          type="text"
                          className="input text-xs w-full font-mono font-bold"
                          value={item.suffix || ''}
                          onChange={(e) => updateCard(idx, 'suffix', e.target.value)}
                          placeholder="+"
                        />
                      </div>

                      {/* Label */}
                      <div className="col-span-2 sm:col-span-4">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Label Text
                        </label>
                        <input
                          type="text"
                          className="input text-xs w-full font-medium"
                          value={item.label || ''}
                          onChange={(e) => updateCard(idx, 'label', e.target.value)}
                          placeholder="e.g. students selected in NEET/JEE"
                        />
                      </div>

                      {/* Icon */}
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Icon
                        </label>
                        <select
                          className="input text-xs w-full"
                          value={item.icon || 'Trophy'}
                          onChange={(e) => updateCard(idx, 'icon', e.target.value)}
                        >
                          {ICON_OPTIONS.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Color dot picker & delete */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <div className="flex items-center gap-1">
                        {COLOR_PRESETS.map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => updateCardColor(idx, preset)}
                            title={preset.name}
                            className={`h-5 w-5 rounded-full ${preset.dot} transition ${
                              item.textColor === preset.textColor ? 'ring-2 ring-blue-500 scale-110' : 'opacity-70 hover:opacity-100'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeCard(idx)}
                        title="Remove Card"
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </AdminCard>
        </div>
      )}

      {/* Floating Save Footer */}
      <div className="sticky bottom-4 z-20 flex items-center justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-4 shadow-xl backdrop-blur-md">
        <div className="text-xs text-slate-600 dark:text-slate-300">
          Click <strong>Save Changes</strong> to instantly update your website.
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-5 py-2 text-xs font-black text-white shadow-md transition cursor-pointer"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? 'Saving…' : 'Save Changes'}</span>
        </button>
      </div>
    </div>
  );
}
