/**
 * Centralized AI Provider Service (Facade & Registry)
 * Exposes a unified interface for structured AI generation, validates responses,
 * and maintains token accounting across providers.
 */

import { GeminiProvider } from './geminiProvider.js';
import { AI_CONFIG } from './aiConfig.js';

export class AiProviderRegistry {
  constructor() {
    this.providers = new Map();
    this.stats = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      totalPromptTokens: 0,
      totalCompletionTokens: 0,
      totalCostUsd: 0,
    };

    // Register primary Gemini Provider
    this.register('gemini', new GeminiProvider());
  }

  /**
   * Registers a new AI provider implementation.
   */
  register(name, providerInstance) {
    if (!name || typeof name !== 'string') {
      throw new Error('Provider name must be a non-empty string');
    }
    if (!providerInstance || typeof providerInstance.generateStructured !== 'function') {
      throw new Error(`Provider "${name}" must implement generateStructured()`);
    }
    this.providers.set(name.toLowerCase(), providerInstance);
  }

  /**
   * Resolves a registered provider by name.
   */
  getProvider(name = AI_CONFIG.defaultProvider) {
    const key = (name || AI_CONFIG.defaultProvider).toLowerCase();
    const provider = this.providers.get(key);
    if (!provider) {
      throw new Error(
        `AI Provider "${name}" is not registered. Available providers: ${Array.from(this.providers.keys()).join(', ')}`
      );
    }
    return provider;
  }

  /**
   * Records token usage metrics for administrative cost governance.
   */
  recordUsage(usage = {}) {
    this.stats.totalRequests += 1;
    this.stats.successfulRequests += 1;
    this.stats.totalPromptTokens += usage.promptTokens || 0;
    this.stats.totalCompletionTokens += usage.completionTokens || 0;
    this.stats.totalCostUsd += usage.estimatedCostUsd || 0;
    // Format to 6 decimal precision
    this.stats.totalCostUsd = Number(this.stats.totalCostUsd.toFixed(6));
  }

  /**
   * Central generation method: Generates structured JSON adhering to Zod schema.
   */
  async generateStructured({
    systemPrompt = '',
    prompt,
    schema,
    schemaName = 'Structured Output',
    model,
    temperature,
    timeoutMs,
    providerName = AI_CONFIG.defaultProvider,
  }) {
    const provider = this.getProvider(providerName);
    try {
      const result = await provider.generateStructured({
        systemPrompt,
        prompt,
        schema,
        schemaName,
        model,
        temperature,
        timeoutMs,
      });

      this.recordUsage(result.usage);
      return result;
    } catch (err) {
      this.stats.totalRequests += 1;
      this.stats.failedRequests += 1;
      throw err;
    }
  }

  /**
   * Central generation method: Generates plain text response.
   */
  async generateText({
    systemPrompt = '',
    prompt,
    model,
    temperature,
    timeoutMs,
    providerName = AI_CONFIG.defaultProvider,
  }) {
    const provider = this.getProvider(providerName);
    try {
      const result = await provider.generateText({
        systemPrompt,
        prompt,
        model,
        temperature,
        timeoutMs,
      });

      this.recordUsage(result.usage);
      return result;
    } catch (err) {
      this.stats.totalRequests += 1;
      this.stats.failedRequests += 1;
      throw err;
    }
  }

  /**
   * Retrieves cumulative token consumption and cost stats.
   */
  getUsageStats() {
    return {
      ...this.stats,
      activeProviders: Array.from(this.providers.keys()),
    };
  }

  /**
   * Resets cumulative metrics (e.g. for testing or new billing window).
   */
  resetUsageStats() {
    this.stats = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      totalPromptTokens: 0,
      totalCompletionTokens: 0,
      totalCostUsd: 0,
    };
  }
}

// Export singleton instance for platform-wide usage
export const aiProvider = new AiProviderRegistry();
