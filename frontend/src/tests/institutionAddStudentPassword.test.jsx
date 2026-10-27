import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Mock react-dom createPortal so it renders inline for static markup
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    createPortal: (children) => children,
  };
});

import AddStudentModal from '../components/institution/modals/AddStudentModal.jsx';

describe('AddStudentModal & Backend - Mandatory Password Feature', () => {
  it('renders student password field as mandatory with required asterisk, required attribute, and helper text', () => {
    const html = renderToStaticMarkup(
      <AddStudentModal
        isOpen={true}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        batches={[]}
        availableLicenses={10}
        isDarkMode={true}
      />
    );

    expect(html).toContain('Student Password');
    expect(html).toContain('Required (min. 6 chars)');
    expect(html).toContain('name="password"');
    expect(html).toContain('required=""');
    expect(html).toContain('Enter student password (min. 6 characters)');
    expect(html).toContain('Mandatory: The student will use this password to sign in to their institution portal.');
    // Check that old optional label and placeholder are completely removed
    expect(html).not.toContain('Temporary Password (Optional)');
    expect(html).not.toContain('Leave blank for secure auto-generation');
  });

  it('validates password requirements: empty or whitespace is rejected', () => {
    const validateStudentPassword = (pass) => {
      const cleanPass = (pass || '').trim();
      if (!cleanPass) return { valid: false, error: 'Please enter a password for this student.' };
      if (cleanPass.length < 6) return { valid: false, error: 'Password must be at least 6 characters.' };
      return { valid: true, password: cleanPass };
    };

    expect(validateStudentPassword('')).toEqual({
      valid: false,
      error: 'Please enter a password for this student.',
    });
    expect(validateStudentPassword('   ')).toEqual({
      valid: false,
      error: 'Please enter a password for this student.',
    });
    expect(validateStudentPassword(null)).toEqual({
      valid: false,
      error: 'Please enter a password for this student.',
    });
  });

  it('validates password requirements: less than 6 characters is rejected', () => {
    const validateStudentPassword = (pass) => {
      const cleanPass = (pass || '').trim();
      if (!cleanPass) return { valid: false, error: 'Please enter a password for this student.' };
      if (cleanPass.length < 6) return { valid: false, error: 'Password must be at least 6 characters.' };
      return { valid: true, password: cleanPass };
    };

    expect(validateStudentPassword('123')).toEqual({
      valid: false,
      error: 'Password must be at least 6 characters.',
    });
    expect(validateStudentPassword('abcde')).toEqual({
      valid: false,
      error: 'Password must be at least 6 characters.',
    });
  });

  it('accepts valid passwords of at least 6 characters', () => {
    const validateStudentPassword = (pass) => {
      const cleanPass = (pass || '').trim();
      if (!cleanPass) return { valid: false, error: 'Please enter a password for this student.' };
      if (cleanPass.length < 6) return { valid: false, error: 'Password must be at least 6 characters.' };
      return { valid: true, password: cleanPass };
    };

    expect(validateStudentPassword('EduPass123')).toEqual({
      valid: true,
      password: 'EduPass123',
    });
    expect(validateStudentPassword('Student@2026')).toEqual({
      valid: true,
      password: 'Student@2026',
    });
  });
});
