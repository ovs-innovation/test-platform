import { describe, it, expect } from 'vitest';

describe('Institution Co-Branding Metadata Resolver', () => {
  const resolveInstitutionBranding = (user, activeStudent = null, isAdmin = false) => {
    const instId =
      user?.institution?.id ||
      user?.institution_id ||
      user?.institutionId ||
      activeStudent?.institution?.id ||
      activeStudent?.institution_id;

    const instName =
      user?.institution?.name ||
      user?.institution_name ||
      user?.institutionName ||
      activeStudent?.institution?.name ||
      activeStudent?.institution_name;

    const instLogo =
      user?.institution?.logo_url ||
      user?.institution?.logoUrl ||
      user?.institution_logo_url ||
      user?.logoUrl ||
      activeStudent?.institution?.logo_url ||
      activeStudent?.institution_logo_url;

    const instBadge =
      user?.institution?.logo_badge ||
      user?.institution?.badge ||
      user?.institution?.logoBadge ||
      user?.institution_logo_badge ||
      activeStudent?.institution?.logo_badge ||
      activeStudent?.institution?.badge ||
      (instName ? instName.substring(0, 3).toUpperCase() : 'INST');

    const isInstitutionalStudent = !isAdmin && Boolean(instId || instName);

    return {
      instId,
      instName,
      instLogo,
      instBadge,
      isInstitutionalStudent,
    };
  };

  it('correctly resolves Drona Academy student branding', () => {
    const dronaUser = {
      id: 62,
      name: 'Aarav Singhania',
      email: 'aarav.singhania@drona.edu',
      role: 'candidate',
      institution_id: 19,
      roll_number: 'DRON-2026-001',
      institution_name: 'Drona Academy',
      institution_logo_url: '/edvedum/drona-academy-logo.svg',
      institution_logo_badge: 'DRO',
      institution: {
        id: 19,
        name: 'Drona Academy',
        code: 'DRON-2026',
        logo_url: '/edvedum/drona-academy-logo.svg',
        logo_badge: 'DRO',
      },
    };

    const branding = resolveInstitutionBranding(dronaUser);
    expect(branding.isInstitutionalStudent).toBe(true);
    expect(branding.instName).toBe('Drona Academy');
    expect(branding.instLogo).toBe('/edvedum/drona-academy-logo.svg');
    expect(branding.instBadge).toBe('DRO');
  });

  it('correctly resolves Vedantu Coaching student branding', () => {
    const vedantuUser = {
      id: 56,
      name: 'Saurabh Dhami',
      email: 'saurabh@gmail.com',
      role: 'candidate',
      institution_id: 15,
      roll_number: '18',
      institution: {
        id: 15,
        name: 'Vedantu Coaching',
        logo_url: 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1786018134/edvedum/institutions/15/tuyvpew6fligk4we8yiz.jpg',
        logo_badge: 'VED',
      },
    };

    const branding = resolveInstitutionBranding(vedantuUser);
    expect(branding.isInstitutionalStudent).toBe(true);
    expect(branding.instName).toBe('Vedantu Coaching');
    expect(branding.instLogo).toContain('cloudinary.com');
    expect(branding.instBadge).toBe('VED');
  });

  it('keeps EDVEDUM default branding for direct students with no institution', () => {
    const directUser = {
      id: 99,
      name: 'Direct Candidate',
      email: 'direct@edvedum.com',
      role: 'candidate',
      institution_id: null,
      institution: null,
    };

    const branding = resolveInstitutionBranding(directUser);
    expect(branding.isInstitutionalStudent).toBe(false);
  });

  it('keeps platform admin views on standard EDVEDUM branding', () => {
    const adminUser = {
      id: 1,
      name: 'Admin User',
      email: 'admin@assess.io',
      role: 'admin',
      institution_id: 19, // Even if associated with an institution ID internally
    };

    const branding = resolveInstitutionBranding(adminUser, null, true);
    expect(branding.isInstitutionalStudent).toBe(false);
  });

  it('generates a 3-letter fallback badge when logo_badge is not set', () => {
    const userWithoutBadge = {
      id: 70,
      name: 'Student',
      role: 'candidate',
      institution_id: 25,
      institution_name: 'Apex Tutorials',
      institution: {
        id: 25,
        name: 'Apex Tutorials',
        logo_url: null,
        logo_badge: null,
      },
    };

    const branding = resolveInstitutionBranding(userWithoutBadge);
    expect(branding.isInstitutionalStudent).toBe(true);
    expect(branding.instBadge).toBe('APE');
  });
});
