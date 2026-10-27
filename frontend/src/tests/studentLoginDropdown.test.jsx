import { describe, it, expect } from 'vitest';

describe('Student Login Institute Dropdown & Mandatory Password Logic', () => {
  const sampleInstitutions = [
    { id: 19, name: 'Drona Academy', code: 'DRON-2026', city: 'Kota', logo_badge: 'DRO' },
    { id: 16, name: 'Aadarsh Public School', code: 'AADA-2026', city: 'Delhi', logo_badge: 'AAD' },
    { id: 15, name: 'Vedantu Coaching', code: 'VEDANTU-12', city: 'Bengaluru', logo_badge: 'VED' },
    { id: 17, name: 'K.G.F School', code: 'KGF-2027', city: 'Kolar', logo_badge: 'KGF' },
  ];

  it('filters institutions by name, code, or city in the dropdown search', () => {
    const filterInstitutions = (list, query) => {
      const q = (query || '').toLowerCase().trim();
      if (!q) return list;
      return list.filter(
        (inst) =>
          inst.name?.toLowerCase().includes(q) ||
          inst.code?.toLowerCase().includes(q) ||
          inst.city?.toLowerCase().includes(q)
      );
    };

    expect(filterInstitutions(sampleInstitutions, 'drona')).toHaveLength(1);
    expect(filterInstitutions(sampleInstitutions, 'drona')[0].code).toBe('DRON-2026');

    expect(filterInstitutions(sampleInstitutions, 'kota')).toHaveLength(1);
    expect(filterInstitutions(sampleInstitutions, '2026')).toHaveLength(2); // Drona and Aadarsh
    expect(filterInstitutions(sampleInstitutions, 'nonexistent')).toHaveLength(0);
  });

  it('strictly validates that password is mandatory for institutional login', () => {
    const validateInstitutionalLogin = ({ instituteCode, enrollmentId, password }) => {
      const code = (instituteCode || '').trim();
      const enrollment = (enrollmentId || '').trim();
      const pass = (password || '').trim();

      if (!code) return { valid: false, error: 'Please select your School / Coaching Institute or enter an Institute Code.' };
      if (!enrollment) return { valid: false, error: 'Please enter your Student Enrollment ID or Roll Number.' };
      if (!pass) return { valid: false, error: 'Password is required. Please enter your account password.' };

      return {
        valid: true,
        payload: {
          instituteCode: code.toUpperCase(),
          enrollmentId: enrollment,
          password: pass,
        },
      };
    };

    // Missing password rejected
    const withoutPass = validateInstitutionalLogin({
      instituteCode: 'DRON-2026',
      enrollmentId: 'DRON-2026-001',
      password: '',
    });
    expect(withoutPass.valid).toBe(false);
    expect(withoutPass.error).toContain('Password is required');

    // Missing password with spaces only rejected
    const whitespacePass = validateInstitutionalLogin({
      instituteCode: 'DRON-2026',
      enrollmentId: 'DRON-2026-001',
      password: '   ',
    });
    expect(whitespacePass.valid).toBe(false);
    expect(whitespacePass.error).toContain('Password is required');

    // Valid with password
    const validLogin = validateInstitutionalLogin({
      instituteCode: 'DRON-2026',
      enrollmentId: 'DRON-2026-001',
      password: 'drona123',
    });
    expect(validLogin.valid).toBe(true);
    expect(validLogin.payload.password).toBe('drona123');
    expect(validLogin.payload.instituteCode).toBe('DRON-2026');
  });

  it('formats custom placeholder according to chosen institute code', () => {
    const getEnrollmentPlaceholder = (selectedInst) => {
      return selectedInst
        ? `e.g. ${selectedInst.code}-001 or 001`
        : 'e.g. DRON-2026-001 or 001';
    };

    expect(getEnrollmentPlaceholder(sampleInstitutions[0])).toBe('e.g. DRON-2026-001 or 001');
    expect(getEnrollmentPlaceholder(sampleInstitutions[1])).toBe('e.g. AADA-2026-001 or 001');
    expect(getEnrollmentPlaceholder(null)).toBe('e.g. DRON-2026-001 or 001');
  });

  it('guarantees handleSelectInstitution updates state with valid code and closes dropdown', () => {
    let state = {
      selectedInst: null,
      instituteCode: '',
      dropdownOpen: true,
    };

    const handleSelectInstitution = (inst) => {
      if (!inst) return;
      state = {
        selectedInst: inst,
        instituteCode: inst.code,
        dropdownOpen: false,
      };
    };

    handleSelectInstitution(sampleInstitutions[0]);
    expect(state.selectedInst.name).toBe('Drona Academy');
    expect(state.instituteCode).toBe('DRON-2026');
    expect(state.dropdownOpen).toBe(false);

    handleSelectInstitution(sampleInstitutions[1]);
    expect(state.selectedInst.name).toBe('Aadarsh Public School');
    expect(state.instituteCode).toBe('AADA-2026');
  });
});
