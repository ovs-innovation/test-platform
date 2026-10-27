import { describe, it, expect } from 'vitest';

describe('Dedicated Institutional Student Login Features', () => {
  it('correctly resolves institution code from path and query parameters', () => {
    const extractInstituteCode = (pathname, search) => {
      const match = pathname.match(/^\/(?:institute|institution|portal)\/([^/]+)/i);
      if (match && match[1]) {
        return decodeURIComponent(match[1]).toUpperCase();
      }
      const params = new URLSearchParams(search);
      const q = params.get('institute') || params.get('code') || params.get('inst');
      return q ? q.trim().toUpperCase() : null;
    };

    expect(extractInstituteCode('/institute/DRON-2026/login', '')).toBe('DRON-2026');
    expect(extractInstituteCode('/institute/DRON-2026', '')).toBe('DRON-2026');
    expect(extractInstituteCode('/institution/AADA-2026/login', '')).toBe('AADA-2026');
    expect(extractInstituteCode('/portal/VEDANTU-12/login', '')).toBe('VEDANTU-12');
    expect(extractInstituteCode('/student-login', '?institute=DRON-2026')).toBe('DRON-2026');
    expect(extractInstituteCode('/student-login', '?code=KGF-2027')).toBe('KGF-2027');
    expect(extractInstituteCode('/student-login', '')).toBeNull();
  });

  it('generates the appropriate page metadata and title for client institutes', () => {
    const generatePortalMeta = (institution) => {
      if (!institution) {
        return {
          title: 'Student Login | EDVEDUM Academy',
          heading: 'Student Login',
          subtitle: 'Sign in to your account to access tests, eBooks, and performance reports.',
          isCustomBranded: false,
        };
      }
      return {
        title: `${institution.name} — Student Login Portal | EDVEDUM`,
        heading: `${institution.name} Student Login`,
        subtitle: `Sign in with your enrollment credentials to access exams and mocks for ${institution.name}.`,
        isCustomBranded: true,
        logo: institution.logo_url || null,
        badge: institution.logo_badge || institution.name.slice(0, 3).toUpperCase(),
        accentColor: institution.accent_color || '#4f46e5',
      };
    };

    const dronaInst = {
      id: 19,
      name: 'Drona Academy',
      code: 'DRON-2026',
      logo_url: '/edvedum/drona-academy-logo.svg',
      logo_badge: 'DRO',
      accent_color: '#4f46e5',
      tagline: 'Premier NEET & Medical Entrance Academy · Kota',
    };

    const meta = generatePortalMeta(dronaInst);
    expect(meta.isCustomBranded).toBe(true);
    expect(meta.heading).toBe('Drona Academy Student Login');
    expect(meta.title).toContain('Drona Academy');
    expect(meta.logo).toBe('/edvedum/drona-academy-logo.svg');
    expect(meta.badge).toBe('DRO');
    expect(meta.accentColor).toBe('#4f46e5');

    const defaultMeta = generatePortalMeta(null);
    expect(defaultMeta.isCustomBranded).toBe(false);
    expect(defaultMeta.heading).toBe('Student Login');
  });

  it('properly formats the student login payload with locked institute code', () => {
    const buildLoginPayload = (institution, rollNumber, password) => {
      const cleanRoll = rollNumber.trim();
      if (institution) {
        return {
          instituteCode: institution.code,
          enrollmentId: cleanRoll,
          identifier: cleanRoll,
          studentId: cleanRoll,
          password,
        };
      }
      return {
        identifier: cleanRoll,
        studentId: cleanRoll,
        password,
      };
    };

    const dronaInst = { code: 'DRON-2026', name: 'Drona Academy' };
    const payload = buildLoginPayload(dronaInst, 'DRON-2026-001', 'drona123');
    expect(payload.instituteCode).toBe('DRON-2026');
    expect(payload.enrollmentId).toBe('DRON-2026-001');
    expect(payload.password).toBe('drona123');

    const shortRollPayload = buildLoginPayload(dronaInst, '001', 'drona123');
    expect(shortRollPayload.instituteCode).toBe('DRON-2026');
    expect(shortRollPayload.enrollmentId).toBe('001');

    const standardPayload = buildLoginPayload(null, 'EDV26-10023', 'Secret@123');
    expect(standardPayload.instituteCode).toBeUndefined();
    expect(standardPayload.identifier).toBe('EDV26-10023');
  });
});
