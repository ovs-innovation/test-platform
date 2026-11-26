/**
 * AI Configuration & Pricing Directory
 * Centralizes model definitions, fallback chains, rate-limit policies, and token pricing models.
 */

import { env } from '../../config/env.js';

export const AI_CONFIG = {
  // Default provider
  defaultProvider: 'gemini',

  // Supported Gemini Models & Fallback Hierarchy
  models: {
    primary: 'gemini-3.8-flash',
    fallback: 'gemini-2.5-flash',
    legacy: 'gemini-2.0-flash',
    pro: 'gemini-1.5-pro',
  },

  // Allowed models whitelist
  allowedModels: [
    'gemini-3.8-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
  ],

  // Execution Defaults
  defaults: {
    temperature: 0.2, // Low temperature for STEM accuracy and reliable schema conformance
    topP: 0.9,
    maxOutputTokens: 8192,
    timeoutMs: 45000, // 45 seconds per generation call
  },

  // Resiliency & Retry Policy
  retry: {
    maxAttempts: 3,
    initialDelayMs: 1000,
    backoffFactor: 2.0, // 1s -> 2s -> 4s
    jitter: true,
    // Transient error codes that should trigger an automatic retry
    retryableStatusCodes: [429, 500, 502, 503, 504],
    retryableErrorMessages: [
      'RESOURCE_EXHAUSTED',
      'UNAVAILABLE',
      'DEADLINE_EXCEEDED',
      'ETIMEDOUT',
      'ECONNRESET',
      'ENOTFOUND',
      'socket hang up',
      'fetch failed',
      'rate limit',
    ],
  },

  // Token Pricing Table (USD per 1,000,000 Tokens)
  // Used for administrative cost auditing and quota governance
  pricing: {
    'gemini-3.8-flash': {
      inputPerMillion: 0.10,
      outputPerMillion: 0.40,
    },
    'gemini-2.5-flash': {
      inputPerMillion: 0.075,
      outputPerMillion: 0.30,
    },
    'gemini-2.0-flash': {
      inputPerMillion: 0.10,
      outputPerMillion: 0.40,
    },
    'gemini-1.5-pro': {
      inputPerMillion: 1.25,
      outputPerMillion: 5.00,
    },
    'default': {
      inputPerMillion: 0.10,
      outputPerMillion: 0.40,
    },
  },
};

/**
 * Safely resolves the API Key from environment configuration.
 * Never logs or exposes the key string directly.
 */
export function getGeminiApiKey() {
  const key = (env.geminiApiKey || process.env.GEMINI_API_KEY || '').trim();
  return key;
}

/**
 * Checks if a valid AI API key is configured.
 */
export function isAiConfigured() {
  const key = getGeminiApiKey();
  return Boolean(key && key.length > 5);
}

/**
 * Resolves the target model with fallback resolution.
 */
export function resolveModel(requestedModel = '') {
  if (requestedModel && AI_CONFIG.allowedModels.includes(requestedModel)) {
    return requestedModel;
  }
  const envModel = env.geminiModel || process.env.GEMINI_MODEL;
  if (envModel && AI_CONFIG.allowedModels.includes(envModel)) {
    return envModel;
  }
  return AI_CONFIG.models.primary;
}

/**
 * Computes estimated cost in USD for a given token usage footprint.
 */
export function calculateEstimatedCost(modelName, inputTokens = 0, outputTokens = 0) {
  const rates = AI_CONFIG.pricing[modelName] || AI_CONFIG.pricing.default;
  const inputCost = (inputTokens / 1_000_000) * rates.inputPerMillion;
  const outputCost = (outputTokens / 1_000_000) * rates.outputPerMillion;
  return Number((inputCost + outputCost).toFixed(6));
}
