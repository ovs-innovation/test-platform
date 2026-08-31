/**
 * Validation utilities for Email Address, Center ID, and Institution ID inputs.
 */

// Email regex: starts with alphanumeric character, valid username characters, @, domain, tld (at least 2 chars)
const EMAIL_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Center / Institution ID regex: alphanumeric characters, optional internal hyphens/underscores/dots, min 2 chars
const ID_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]$|^[a-zA-Z0-9]{2,}$/;

/**
 * Validates an input string to ensure it is a valid email address or Center/Institution ID.
 * Rejects leading signs (+, -, ., etc.), sign-only strings (+-+-+), and invalid special symbols.
 * 
 * @param {string} value The string to validate
 * @param {string} fieldName Field name label for user error messages
 * @returns {{ isValid: boolean, error: string }}
 */
export function validateEmailOrId(value, fieldName = 'Email Address or ID') {
  const clean = (value || '').trim();

  if (!clean) {
    return {
      isValid: false,
      error: `Please enter your ${fieldName}.`,
    };
  }

  // 1. Check for leading special signs/symbols (+, -, ., @, _, =, /, *, etc.)
  if (/^[+\-._@=/\\*!#$%^&*()<>?:;"'{}|[\]~`]/.test(clean)) {
    return {
      isValid: false,
      error: `${fieldName} cannot start with special signs or symbols (such as +, -, .).`,
    };
  }

  // 2. Check for strings consisting only of signs/symbols (e.g. "+-+-+-", "-+-+", "+++", "---")
  if (/^[+\-._@=/\\*!#$%^&*()<>?:;"'{}|[\]~`\s]+$/.test(clean)) {
    return {
      isValid: false,
      error: `Please enter a valid ${fieldName}. Isolated signs or symbols are not allowed.`,
    };
  }

  // 3. Check for disallowed special characters/symbols (=, <, >, ", ', ;, :, {, }, [, ], \, /, ^, $, *, ?, !)
  if (/[=<>"'`;:(){}[\]\\/\^$*?!]/.test(clean)) {
    return {
      isValid: false,
      error: `${fieldName} contains invalid special characters.`,
    };
  }

  // 4. Validate format based on presence of '@'
  if (clean.includes('@')) {
    if (!EMAIL_REGEX.test(clean)) {
      return {
        isValid: false,
        error: 'Please enter a valid email address format (e.g. name@domain.com).',
      };
    }
  } else {
    if (!ID_REGEX.test(clean) || clean.length < 2) {
      return {
        isValid: false,
        error: 'Please enter a valid email address or ID (alphanumeric format, e.g. CEN01).',
      };
    }
  }

  return {
    isValid: true,
    error: '',
  };
}
