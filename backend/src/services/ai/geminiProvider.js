/**
 * Google Gemini AI Provider
 * Production-ready integration using the official @google/genai SDK.
 * Features: Timeout management, exponential backoff retries, rate-limit recovery,
 * token accounting, and cost tracking.
 */

import { GoogleGenAI } from '@google/genai';
import {
  AI_CONFIG,
  getGeminiApiKey,
  resolveModel,
  calculateEstimatedCost,
} from './aiConfig.js';
import { parseAndValidate, cleanAndExtractJson } from './aiResponseValidator.js';

export class AiProviderError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'AiProviderError';
    this.provider = options.provider || 'gemini';
    this.statusCode = options.statusCode || 500;
    this.isRetryable = Boolean(options.isRetryable);
    this.attempts = options.attempts || 1;
    this.model = options.model || '';
    this.cause = options.cause || null;
  }
}

export class AiTimeoutError extends AiProviderError {
  constructor(timeoutMs, model) {
    super(`AI Generation request timed out after ${timeoutMs}ms`, {
      provider: 'gemini',
      statusCode: 408,
      isRetryable: true,
      model,
    });
    this.name = 'AiTimeoutError';
    this.timeoutMs = timeoutMs;
  }
}

export class GeminiProvider {
  constructor(options = {}) {
    this.name = 'gemini';
    this.client = null;
    this.options = { ...options };
  }

  /**
   * Lazy-initializes the GoogleGenAI client singleton.
   */
  getClient() {
    if (this.client) return this.client;
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      throw new AiProviderError('GEMINI_API_KEY is not configured on the backend server', {
        provider: 'gemini',
        statusCode: 500,
        isRetryable: false,
      });
    }
    this.client = new GoogleGenAI({ apiKey });
    return this.client;
  }

  /**
   * Determines whether an error is transient and safe to retry.
   */
  isRetryableError(err) {
    if (!err) return false;
    const status = err.status || err.statusCode || err.response?.status;
    if (status && AI_CONFIG.retry.retryableStatusCodes.includes(Number(status))) {
      return true;
    }

    const msg = String(err.message || err).toLowerCase();
    for (const term of AI_CONFIG.retry.retryableErrorMessages) {
      if (msg.includes(term.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  /**
   * Executes an asynchronous AI call wrapped in a strict timeout.
   */
  async withTimeout(promise, timeoutMs, model) {
    let timerId;
    const timeoutPromise = new Promise((_, reject) => {
      timerId = setTimeout(() => {
        reject(new AiTimeoutError(timeoutMs, model));
      }, timeoutMs);
    });

    try {
      const result = await Promise.race([promise, timeoutPromise]);
      return result;
    } finally {
      clearTimeout(timerId);
    }
  }

  /**
   * Executes a call with exponential backoff and jitter.
   */
  async executeWithRetry(operationFn, context = {}) {
    const maxAttempts = context.maxAttempts || AI_CONFIG.retry.maxAttempts;
    let attempt = 0;
    let lastError = null;

    while (attempt < maxAttempts) {
      attempt++;
      try {
        const res = await operationFn(attempt);
        return res;
      } catch (err) {
        lastError = err;
        const retryable = this.isRetryableError(err) || err.name === 'AiTimeoutError';

        if (!retryable || attempt >= maxAttempts) {
          throw new AiProviderError(err.message || 'AI generation failed', {
            provider: 'gemini',
            statusCode: err.status || err.statusCode || 500,
            isRetryable: retryable,
            attempts: attempt,
            model: context.model,
            cause: err,
          });
        }

        // Calculate exponential backoff delay with jitter
        const baseDelay =
          AI_CONFIG.retry.initialDelayMs * Math.pow(AI_CONFIG.retry.backoffFactor, attempt - 1);
        const jitter = Math.random() * 300;
        const delay = Math.min(baseDelay + jitter, 10000);

        console.warn(
          `[GeminiProvider] Transient error on attempt ${attempt}/${maxAttempts} (${err.message}). Retrying in ${Math.round(delay)}ms...`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  }

  /**
   * Low-level raw generation with timeout, retry, and token usage accounting.
   */
  async generateRaw({
    contents,
    model: requestedModel,
    temperature = AI_CONFIG.defaults.temperature,
    maxOutputTokens = AI_CONFIG.defaults.maxOutputTokens,
    responseMimeType,
    timeoutMs = AI_CONFIG.defaults.timeoutMs,
  }) {
    const client = this.getClient();
    const model = resolveModel(requestedModel);
    const startTime = Date.now();

    const result = await this.executeWithRetry(
      async (attempt) => {
        const config = {
          temperature,
          maxOutputTokens,
        };
        if (responseMimeType) {
          config.responseMimeType = responseMimeType;
        }

        const callPromise = client.models.generateContent({
          model,
          contents,
          config,
        });

        return this.withTimeout(callPromise, timeoutMs, model);
      },
      { model }
    );

    const durationMs = Date.now() - startTime;
    const rawText = result?.text?.trim() || '';

    // Extract token usage metrics from Gemini response
    const usage = result?.usageMetadata || {};
    const promptTokens = usage.promptTokenCount || 0;
    const completionTokens = usage.candidatesTokenCount || 0;
    const totalTokens = usage.totalTokenCount || (promptTokens + completionTokens);
    const estimatedCostUsd = calculateEstimatedCost(model, promptTokens, completionTokens);

    // Log sanitized token accounting metrics (never log prompts or API keys)
    console.info(
      `[GeminiProvider] Model: ${model} | Tokens: In=${promptTokens}, Out=${completionTokens}, Total=${totalTokens} | Latency: ${durationMs}ms | Cost: $${estimatedCostUsd}`
    );

    return {
      text: rawText,
      model,
      usage: {
        promptTokens,
        completionTokens,
        totalTokens,
        estimatedCostUsd,
        durationMs,
      },
    };
  }

  /**
   * Generates structured output validated against a Zod schema.
   *
   * @param {Object} options
   * @param {string} [options.systemPrompt]
   * @param {string} options.prompt
   * @param {z.ZodTypeAny} [options.schema]
   * @param {string} [options.schemaName]
   * @param {string} [options.model]
   * @param {number} [options.temperature]
   * @param {number} [options.timeoutMs]
   * @returns {Promise<{ success: boolean, data: any, usage: Object, model: string }>}
   */
  async generateStructured({
    systemPrompt = '',
    prompt,
    schema,
    schemaName = 'Structured Output',
    model,
    temperature = AI_CONFIG.defaults.temperature,
    timeoutMs = AI_CONFIG.defaults.timeoutMs,
  }) {
    if (!prompt) {
      throw new AiProviderError('Prompt text is required for structured generation', {
        provider: 'gemini',
        statusCode: 400,
      });
    }

    const parts = [];
    if (systemPrompt) {
      parts.push({ text: `System Instructions:\n${systemPrompt}\n\n` });
    }
    parts.push({ text: prompt });

    const contents = [{ role: 'user', parts }];

    const rawResult = await this.generateRaw({
      contents,
      model,
      temperature,
      responseMimeType: 'application/json',
      timeoutMs,
    });

    // Parse and validate through the response validator
    const validatedData = schema
      ? parseAndValidate(rawResult.text, schema, schemaName)
      : cleanAndExtractJson(rawResult.text);

    return {
      success: true,
      data: validatedData,
      usage: rawResult.usage,
      model: rawResult.model,
      rawText: rawResult.text,
    };
  }

  /**
   * Generates standard text response.
   */
  async generateText({
    systemPrompt = '',
    prompt,
    model,
    temperature = AI_CONFIG.defaults.temperature,
    timeoutMs = AI_CONFIG.defaults.timeoutMs,
  }) {
    if (!prompt) {
      throw new AiProviderError('Prompt text is required for text generation', {
        provider: 'gemini',
        statusCode: 400,
      });
    }

    const parts = [];
    if (systemPrompt) {
      parts.push({ text: `System Instructions:\n${systemPrompt}\n\n` });
    }
    parts.push({ text: prompt });

    const contents = [{ role: 'user', parts }];

    const rawResult = await this.generateRaw({
      contents,
      model,
      temperature,
      timeoutMs,
    });

    return {
      success: true,
      text: rawResult.text,
      usage: rawResult.usage,
      model: rawResult.model,
    };
  }
}
