/**
 * AI Response Validator & JSON Sanitizer
 * Handles extraction of structured JSON payloads from raw LLM text streams,
 * strips markdown blocks, repairs minor JSON irregularities, and enforces strict Zod schemas.
 */

import { z } from 'zod';

export class AiValidationError extends Error {
  constructor(message, details = [], rawResponse = '') {
    super(message);
    this.name = 'AiValidationError';
    this.details = details;
    this.rawSample = typeof rawResponse === 'string' ? rawResponse.slice(0, 300) : '';
  }
}

/**
 * Robust JSON Extractor & Sanitizer
 * Extracts valid JSON object or array from raw LLM responses.
 *
 * @param {string} rawText
 * @returns {any} parsed JSON object/array
 */
export function cleanAndExtractJson(rawText) {
  if (rawText === null || rawText === undefined) {
    throw new AiValidationError('Received null or undefined response from AI provider');
  }

  const text = String(rawText).trim();
  if (!text) {
    throw new AiValidationError('Received empty response from AI provider');
  }

  // 1. Direct parse attempt
  try {
    return JSON.parse(text);
  } catch (_) {
    // Continue to regex-based extraction
  }

  // 2. Strip markdown code fences: ```json ... ``` or ``` ... ```
  let sanitized = text;
  const fenceMatch = sanitized.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenceMatch && fenceMatch[1]) {
    try {
      return JSON.parse(fenceMatch[1].trim());
    } catch (_) {
      sanitized = fenceMatch[1].trim();
    }
  }

  // 3. Find outer balanced JSON object {...} or array [...]
  const firstBrace = sanitized.indexOf('{');
  const firstBracket = sanitized.indexOf('[');

  let startIndex = -1;
  let isArray = false;

  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    startIndex = firstBrace;
    isArray = false;
  } else if (firstBracket !== -1) {
    startIndex = firstBracket;
    isArray = true;
  }

  if (startIndex !== -1) {
    const endChar = isArray ? ']' : '}';
    const lastIndex = sanitized.lastIndexOf(endChar);

    if (lastIndex > startIndex) {
      const candidate = sanitized.substring(startIndex, lastIndex + 1);
      try {
        return JSON.parse(candidate);
      } catch (_) {
        // Attempt minor repairs on candidate:
        // a. Remove trailing commas before closing braces/brackets
        const cleanedCommas = candidate.replace(/,\s*([}\]])/g, '$1');
        try {
          return JSON.parse(cleanedCommas);
        } catch (_) {}
      }
    }
  }

  throw new AiValidationError(
    'Failed to parse valid JSON from AI response. Output was malformed or incomplete.',
    [],
    text
  );
}

/**
 * Validates a parsed object or array against a Zod schema.
 * Produces structured, readable error paths if validation fails.
 *
 * @param {any} data - Parsed data object
 * @param {z.ZodTypeAny} schema - Zod schema to enforce
 * @param {string} contextName - Human-readable label for error reporting
 * @returns {any} Validated and typed data
 */
export function validateSchema(data, schema, contextName = 'AI Response') {
  if (!schema) {
    return data;
  }

  const result = schema.safeParse(data);
  if (result.success) {
    return result.data;
  }

  const formattedErrors = result.error.issues.map((issue) => {
    const path = issue.path.join('.') || 'root';
    return {
      field: path,
      message: issue.message,
      code: issue.code,
    };
  });

  const summary = formattedErrors
    .slice(0, 3)
    .map((e) => `[${e.field}]: ${e.message}`)
    .join('; ');

  throw new AiValidationError(
    `Schema validation failed for ${contextName}: ${summary}${formattedErrors.length > 3 ? ` (+${formattedErrors.length - 3} more errors)` : ''}`,
    formattedErrors,
    JSON.stringify(data)
  );
}

/**
 * High-level helper: extracts JSON and validates against Zod schema in a single pass.
 */
export function parseAndValidate(rawText, schema, contextName = 'AI Output') {
  const parsed = cleanAndExtractJson(rawText);
  return validateSchema(parsed, schema, contextName);
}
