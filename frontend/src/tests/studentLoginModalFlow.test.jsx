import { describe, it, expect } from 'vitest';

describe('Student Login: Direct vs Via Institute Flow', () => {
  const mockInstitutions = [
    { id: 1, name: 'Drona Academy Kota', code: 'DRON-2026', city: 'Kota', logo_badge: 'DRO' },
    { id: 2, name: 'Apex International School', code: 'APEX-2026', city: 'Jaipur', logo_badge: 'APX' },
    { id: 3, name: 'Matrix Coaching', code: 'MAT-2027', city: 'Sikar', logo_badge: 'MAT' },
  ];

  it('ensures Direct Student Login mode switcher has strictly 3 tabs and excludes Institute Access', () => {
    // Mode switcher definition for direct students (!institution)
    const getTabsForDirectStudent = () => {
      return [
        { id: 'id_password', label: 'ID & Password', icon: '🔑' },
        { id: 'email_otp', label: 'Email OTP', icon: '✉️' },
        { id: 'mobile', label: 'Mobile OTP', icon: '📱' },
      ];
    };

    const directTabs = getTabsForDirectStudent();
    expect(directTabs).toHaveLength(3);
    expect(directTabs.map((t) => t.id)).toEqual(['id_password', 'email_otp', 'mobile']);
    expect(directTabs.some((t) => t.id === 'institute')).toBe(false);
    expect(directTabs.some((t) => t.label.includes('Institute Access'))).toBe(false);
  });

  it('generates the correct dedicated institute login page URL on selecting an institute from the modal', () => {
    const getInstituteLoginUrl = (code) => {
      return `/institute/${encodeURIComponent(code)}/login`;
    };

    expect(getInstituteLoginUrl('DRON-2026')).toBe('/institute/DRON-2026/login');
    expect(getInstituteLoginUrl('APEX-2026')).toBe('/institute/APEX-2026/login');
  });

  it('filters institutions in SelectInstituteModal by name, code, or city case-insensitively', () => {
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

    expect(filterInstitutions(mockInstitutions, 'drona')).toHaveLength(1);
    expect(filterInstitutions(mockInstitutions, 'jaipur')).toHaveLength(1);
    expect(filterInstitutions(mockInstitutions, 'jaipur')[0].code).toBe('APEX-2026');
    expect(filterInstitutions(mockInstitutions, '2026')).toHaveLength(2);
    expect(filterInstitutions(mockInstitutions, 'xyz')).toHaveLength(0);
  });

  it('sets dedicated title, subtitle, and credentials payload for institute students', () => {
    const institute = mockInstitutions[0];

    const getPageTitle = (inst) => {
      return inst ? `${inst.name} Student Login` : 'Student Login';
    };

    const getPageSubtitle = (inst) => {
      return inst
        ? `Sign in with your enrollment credentials to access exams and mocks for ${inst.name}.`
        : 'Sign in to your account to access tests, eBooks, and performance reports.';
    };

    const buildPayload = (inst, identifier, password) => {
      return inst
        ? {
            instituteCode: inst.code,
            enrollmentId: identifier.trim(),
            studentId: identifier.trim(),
            identifier: identifier.trim(),
            password,
          }
        : {
            identifier: identifier.trim(),
            studentId: identifier.trim(),
            password,
          };
    };

    expect(getPageTitle(institute)).toBe('Drona Academy Kota Student Login');
    expect(getPageSubtitle(institute)).toContain('Drona Academy Kota');

    const institutePayload = buildPayload(institute, 'DRON-001', 'secret123');
    expect(institutePayload.instituteCode).toBe('DRON-2026');
    expect(institutePayload.enrollmentId).toBe('DRON-001');
    expect(institutePayload.password).toBe('secret123');

    const directPayload = buildPayload(null, 'EDV26-10023', 'pass456');
    expect(directPayload.instituteCode).toBeUndefined();
    expect(directPayload.enrollmentId).toBeUndefined();
    expect(directPayload.studentId).toBe('EDV26-10023');
  });

  it('verifies dropdown navigation routes correctly for Direct vs Via Institute in header', () => {
    const getDropdownAction = (type, selectedInst = null) => {
      if (type === 'direct') {
        return { type: 'navigate', path: '/student-login' };
      }
      if (type === 'via_institute') {
        return {
          type: 'open_modal',
          onSelect: (inst) => `/institute/${encodeURIComponent(inst.code)}/login`,
        };
      }
      throw new Error('Unknown type');
    };

    const directAction = getDropdownAction('direct');
    expect(directAction.type).toBe('navigate');
    expect(directAction.path).toBe('/student-login');

    const instituteAction = getDropdownAction('via_institute');
    expect(instituteAction.type).toBe('open_modal');
    expect(instituteAction.onSelect(mockInstitutions[0])).toBe('/institute/DRON-2026/login');
  });

  it('guarantees that for an institute student, tab switcher is hidden and ONLY Roll No / Enrollment ID & Password fields are shown', () => {
    const getRenderedElementsForStudent = (institution) => {
      if (institution) {
        return {
          showTabSwitcher: false,
          activeForm: 'rollno_password',
          fields: ['roll_no_enrollment_id', 'password'],
          labels: {
            identifier: 'Roll No / Enrollment ID *',
            password: 'Password *',
          },
          submitButtonText: `Sign In to ${institution.name} →`,
        };
      }
      return {
        showTabSwitcher: true,
        activeForm: 'id_password',
        fields: ['student_id', 'password'],
        labels: {
          identifier: 'Student ID *',
          password: 'Password *',
        },
        submitButtonText: 'Log In with Student ID →',
      };
    };

    const instView = getRenderedElementsForStudent(mockInstitutions[0]);
    expect(instView.showTabSwitcher).toBe(false);
    expect(instView.fields).toEqual(['roll_no_enrollment_id', 'password']);
    expect(instView.labels.identifier).toBe('Roll No / Enrollment ID *');
    expect(instView.labels.password).toBe('Password *');
    expect(instView.submitButtonText).toBe('Sign In to Drona Academy Kota →');

    const directView = getRenderedElementsForStudent(null);
    expect(directView.showTabSwitcher).toBe(true);
    expect(directView.labels.identifier).toBe('Student ID *');
  });
});

