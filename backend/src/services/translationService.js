import { pool } from '../config/db.js';
import { env } from '../config/env.js';

// In-memory cache for ultra-fast translations (< 1ms cache hits)
const translationMemoryCache = new Map();

/**
 * Translates a single text string while preserving LaTeX formulas, math symbols, and code tokens.
 */
export const translateText = async (text, targetLang = 'hi', sourceLang = 'en') => {
  if (!text || typeof text !== 'string' || !text.trim()) {
    return text;
  }

  const cacheKey = `${sourceLang}:${targetLang}:${text.trim()}`;
  if (translationMemoryCache.has(cacheKey)) {
    return translationMemoryCache.get(cacheKey);
  }

  try {
    const mathTokens = [];
    // Tokenize LaTeX formulas ($$...$$ or $...$), chemical formulas, or HTML tags
    const tokenized = text.replace(/(\$\$[\s\S]*?\$\$|\$[^\$]+?\$|<[^>]+>)/g, (match) => {
      const idx = mathTokens.length;
      mathTokens.push(match);
      return ` [[TOKEN_${idx}]] `;
    });

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(tokenized)}`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) {
      throw new Error(`Google translate error: ${res.statusText}`);
    }

    const data = await res.json();
    let translated = Array.isArray(data?.[0])
      ? data[0].map((s) => s[0]).join('')
      : tokenized;

    // Restore preserved tokens
    mathTokens.forEach((orig, idx) => {
      const regex = new RegExp(`\\[\\[\\s*TOKEN_${idx}\\s*\\]\\]`, 'gi');
      translated = translated.replace(regex, orig);
    });

    translated = translated.trim();
    translationMemoryCache.set(cacheKey, translated);
    return translated;
  } catch (err) {
    // If public translation endpoint has an issue, fallback to Gemini if key available
    if (env.geminiApiKey) {
      try {
        const { GoogleGenAI } = await import('@google/genai');
        const ai = new GoogleGenAI({ apiKey: env.geminiApiKey });
        const prompt = `Translate the following exam question text from ${sourceLang} to Hindi. Keep LaTeX math expressions like $...$ or $$...$$ unchanged. Only output the translated Hindi text without conversational filler.\n\nText:\n${text}`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        const out = response.text?.trim() || text;
        translationMemoryCache.set(cacheKey, out);
        return out;
      } catch (geminiErr) {
        console.warn('[translationService] Gemini fallback failed:', geminiErr.message);
      }
    }

    console.warn('[translationService] Translation failed, returning original:', err.message);
    return text;
  }
};

/**
 * Translates an option string, preserving (A), (B), (C), (D) or A., B., C., D. labels
 */
export const translateOption = async (option, targetLang = 'hi') => {
  if (!option) return option;

  let optText = '';
  let optObj = null;

  if (typeof option === 'object') {
    optObj = option;
    optText = option.text ?? '';
  } else {
    optText = String(option);
  }

  if (!optText.trim()) return option;

  // Check for prefix like (A), (B), A., 1., etc.
  const prefixMatch = optText.match(/^(\([A-Za-z0-9]+\)|[A-Za-z0-9]+[.)])\s*/);
  let prefix = '';
  let body = optText;

  if (prefixMatch) {
    prefix = prefixMatch[0];
    body = optText.slice(prefix.length);
  }

  // If body is pure math or numbers, keep as is
  if (/^[\s\d+\-*/=().,^\\%_$\{\}]+$/.test(body.trim())) {
    return option;
  }

  const translatedBody = await translateText(body, targetLang);
  const resultText = `${prefix}${translatedBody}`;

  if (optObj) {
    return { ...optObj, text: resultText };
  }
  return resultText;
};

/**
 * Translates a complete question payload into target language (default: Hindi 'hi')
 * Caches in memory and persists into database `questions.translations` if question_id is provided.
 */
export const translateQuestion = async ({
  question_id,
  question_text,
  assertion_text,
  reason_text,
  options = [],
  target_lang = 'hi',
}) => {
  const langKey = target_lang.toLowerCase();

  // 1. Check if DB already has translation if question_id provided
  if (question_id) {
    try {
      const qRes = await pool.query(
        'SELECT translations FROM questions WHERE id = $1',
        [question_id]
      );
      const existing = qRes.rows[0]?.translations?.[langKey];
      if (existing && existing.question_text) {
        return {
          question_id,
          target_lang: langKey,
          ...existing,
          cached: true,
        };
      }
    } catch (_) {}
  }

  // 2. Perform parallel translation of question components
  const promises = [];

  // Question statement
  promises.push(translateText(question_text, langKey));

  // Assertion & Reason
  if (assertion_text) promises.push(translateText(assertion_text, langKey));
  else promises.push(Promise.resolve(null));

  if (reason_text) promises.push(translateText(reason_text, langKey));
  else promises.push(Promise.resolve(null));

  // Options
  const optionPromises = (Array.isArray(options) ? options : []).map((opt) =>
    translateOption(opt, langKey)
  );
  promises.push(Promise.all(optionPromises));

  const [translatedQuestion, translatedAssertion, translatedReason, translatedOptions] =
    await Promise.all(promises);

  const translationResult = {
    question_text: translatedQuestion,
    assertion_text: translatedAssertion,
    reason_text: translatedReason,
    options: translatedOptions,
  };

  // 3. Save to database translations column in background if question_id exists
  if (question_id) {
    pool.query(
      `UPDATE questions
       SET translations = jsonb_set(COALESCE(translations, '{}'::jsonb), $1::text[], $2::jsonb, true)
       WHERE id = $3`,
      [[langKey], JSON.stringify(translationResult), question_id]
    ).catch((err) => {
      console.warn('[translateQuestion] DB persist warning:', err.message);
    });
  }

  return {
    question_id,
    target_lang: langKey,
    ...translationResult,
    cached: false,
  };
};
