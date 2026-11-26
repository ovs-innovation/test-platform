import { describe, it, expect, vi, beforeEach } from 'vitest';
import { z } from 'zod';
import {
  cleanAndExtractJson,
  validateSchema,
  parseAndValidate,
  AiValidationError,
} from '../../src/services/ai/aiResponseValidator.js';
import {
  AI_CONFIG,
  resolveModel,
  calculateEstimatedCost,
} from '../../src/services/ai/aiConfig.js';
import {
  GeminiProvider,
  AiProviderError,
  AiTimeoutError,
} from '../../src/services/ai/geminiProvider.js';
import { AiProviderRegistry } from '../../src/services/ai/aiProvider.js';

describe('AI Provider Integration Suite', () => {
  // =========================================================================
  // 1. aiResponseValidator Tests
  // =========================================================================
  describe('aiResponseValidator', () => {
    it('successfully parses clean direct JSON string', () => {
      const input = '{"question":"What is momentum?","marks":4}';
      const result = cleanAndExtractJson(input);
      expect(result).toEqual({ question: 'What is momentum?', marks: 4 });
    });

    it('successfully extracts JSON enclosed in markdown code fences', () => {
      const input = `Here is the requested question:
\`\`\`json
{
  "subject": "Physics",
  "difficulty": "medium",
  "items": [1, 2, 3]
}
\`\`\`
Hope this helps!`;
      const result = cleanAndExtractJson(input);
      expect(result.subject).toBe('Physics');
      expect(result.items).toHaveLength(3);
    });

    it('extracts JSON arrays from conversational text', () => {
      const input = `Sure, here are the topics:
[
  {"name": "Kinematics"},
  {"name": "Thermodynamics"}
]
Let me know if you need more.`;
      const result = cleanAndExtractJson(input);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Kinematics');
    });

    it('repairs trailing commas in JSON object', () => {
      const input = '{"title": "NEET Mock", "questions": 50, }';
      const result = cleanAndExtractJson(input);
      expect(result.title).toBe('NEET Mock');
      expect(result.questions).toBe(50);
    });

    it('throws AiValidationError on unparseable/malformed text', () => {
      const malformed = 'Not a JSON at all { this is completely broken';
      expect(() => cleanAndExtractJson(malformed)).toThrow(AiValidationError);
    });

    it('throws AiValidationError on null or empty input', () => {
      expect(() => cleanAndExtractJson('')).toThrow(AiValidationError);
      expect(() => cleanAndExtractJson(null)).toThrow(AiValidationError);
    });

    it('validates against Zod schema and returns typed data', () => {
      const schema = z.object({
        question_text: z.string().min(5),
        options: z.array(z.string()).length(4),
        correct_index: z.number().int().min(0).max(3),
      });

      const validData = {
        question_text: 'What is the SI unit of electric flux?',
        options: ['V·m', 'N/C', 'J/K', 'T·m'],
        correct_index: 0,
      };

      const validated = validateSchema(validData, schema, 'Sample MCQ');
      expect(validated.correct_index).toBe(0);
      expect(validated.options).toHaveLength(4);
    });

    it('throws structured AiValidationError when Zod schema check fails', () => {
      const schema = z.object({
        question_text: z.string().min(10),
        options: z.array(z.string()).length(4, 'Must have exactly 4 options'),
      });

      const invalidData = {
        question_text: 'Short',
        options: ['Opt A', 'Opt B'], // Only 2 options
      };

      expect(() => validateSchema(invalidData, schema, 'Invalid MCQ')).toThrow(AiValidationError);
    });

    it('parseAndValidate performs extract and schema enforcement in one call', () => {
      const rawLlmOutput = `\`\`\`json
{
  "status": "success",
  "count": 5
}
\`\`\``;
      const schema = z.object({ status: z.string(), count: z.number() });
      const result = parseAndValidate(rawLlmOutput, schema, 'StatusCheck');
      expect(result.count).toBe(5);
    });
  });

  // =========================================================================
  // 2. aiConfig Tests
  // =========================================================================
  describe('aiConfig & Cost Calculations', () => {
    it('resolves primary model when requested model is invalid or empty', () => {
      expect(resolveModel('')).toBe(AI_CONFIG.models.primary);
      expect(resolveModel('unknown-model-xyz')).toBe(AI_CONFIG.models.primary);
    });

    it('accepts valid whitelisted models', () => {
      expect(resolveModel('gemini-2.5-flash')).toBe('gemini-2.5-flash');
      expect(resolveModel('gemini-1.5-pro')).toBe('gemini-1.5-pro');
    });

    it('correctly calculates estimated token cost in USD', () => {
      // gemini-3.8-flash: $0.10/M input, $0.40/M output
      // 10,000 input tokens = $0.001
      // 5,000 output tokens = $0.002
      // Total = $0.003
      const cost = calculateEstimatedCost('gemini-3.8-flash', 10000, 5000);
      expect(cost).toBeCloseTo(0.003, 5);
    });
  });

  // =========================================================================
  // 3. geminiProvider Resiliency, Timeout & Retry Tests
  // =========================================================================
  describe('GeminiProvider', () => {
    let provider;

    beforeEach(() => {
      provider = new GeminiProvider();
    });

    it('correctly identifies retryable transient errors', () => {
      expect(provider.isRetryableError({ status: 429 })).toBe(true);
      expect(provider.isRetryableError({ status: 503 })).toBe(true);
      expect(provider.isRetryableError(new Error('RESOURCE_EXHAUSTED'))).toBe(true);
      expect(provider.isRetryableError(new Error('ETIMEDOUT'))).toBe(true);
      expect(provider.isRetryableError(new Error('socket hang up'))).toBe(true);
    });

    it('identifies non-retryable client errors', () => {
      expect(provider.isRetryableError({ status: 400 })).toBe(false);
      expect(provider.isRetryableError({ status: 401 })).toBe(false);
      expect(provider.isRetryableError({ status: 403 })).toBe(false);
      expect(provider.isRetryableError(new Error('Invalid argument provided'))).toBe(false);
    });

    it('times out and throws AiTimeoutError when execution exceeds timeoutMs', async () => {
      const slowPromise = new Promise((resolve) => setTimeout(resolve, 200));
      await expect(
        provider.withTimeout(slowPromise, 50, 'gemini-3.8-flash')
      ).rejects.toThrow(AiTimeoutError);
    });

    it('retries transient failures and returns result when a subsequent attempt succeeds', async () => {
      let callCount = 0;
      const operation = vi.fn(async (attempt) => {
        callCount++;
        if (attempt === 1) {
          const err = new Error('RESOURCE_EXHAUSTED');
          err.status = 429;
          throw err;
        }
        return { success: true, text: '{"result":"recovered"}' };
      });

      const res = await provider.executeWithRetry(operation, {
        maxAttempts: 3,
        model: 'gemini-3.8-flash',
      });

      expect(callCount).toBe(2);
      expect(res.success).toBe(true);
    });

    it('throws AiProviderError when retry attempts are completely exhausted', async () => {
      const operation = vi.fn(async () => {
        const err = new Error('Service Unavailable');
        err.status = 503;
        throw err;
      });

      await expect(
        provider.executeWithRetry(operation, { maxAttempts: 2, model: 'gemini-3.8-flash' })
      ).rejects.toThrow(AiProviderError);
    });
  });

  // =========================================================================
  // 4. AiProviderRegistry & Facade Tests
  // =========================================================================
  describe('AiProviderRegistry Facade', () => {
    let registry;

    beforeEach(() => {
      registry = new AiProviderRegistry();
    });

    it('registers gemini as the default provider out of the box', () => {
      const p = registry.getProvider('gemini');
      expect(p).toBeDefined();
      expect(p.name).toBe('gemini');
    });

    it('throws an error if an unknown provider is requested', () => {
      expect(() => registry.getProvider('unknown-llm')).toThrow(/not registered/);
    });

    it('allows registering a custom provider implementation (extensibility)', async () => {
      const mockProvider = {
        name: 'mock-provider',
        generateStructured: vi.fn().mockResolvedValue({
          success: true,
          data: { generated: true },
          usage: { promptTokens: 100, completionTokens: 50, estimatedCostUsd: 0.0001 },
          model: 'mock-model-v1',
        }),
        generateText: vi.fn(),
      };

      registry.register('mock-provider', mockProvider);
      const res = await registry.generateStructured({
        prompt: 'Generate question',
        providerName: 'mock-provider',
      });

      expect(res.success).toBe(true);
      expect(res.data.generated).toBe(true);
      expect(mockProvider.generateStructured).toHaveBeenCalledTimes(1);
    });

    it('tracks cumulative token consumption and cost stats', () => {
      registry.recordUsage({
        promptTokens: 500,
        completionTokens: 250,
        estimatedCostUsd: 0.00015,
      });

      registry.recordUsage({
        promptTokens: 1000,
        completionTokens: 500,
        estimatedCostUsd: 0.0003,
      });

      const stats = registry.getUsageStats();
      expect(stats.totalRequests).toBe(2);
      expect(stats.successfulRequests).toBe(2);
      expect(stats.totalPromptTokens).toBe(1500);
      expect(stats.totalCompletionTokens).toBe(750);
      expect(stats.totalCostUsd).toBeCloseTo(0.00045, 6);

      registry.resetUsageStats();
      const resetStats = registry.getUsageStats();
      expect(resetStats.totalRequests).toBe(0);
      expect(resetStats.totalCostUsd).toBe(0);
    });
  });
});
