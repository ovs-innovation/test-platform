const parseNumberList = (value) => {
    if (Array.isArray(value)) {
        return value
            .map((item) => Number(item))
            .filter((item) => Number.isInteger(item) && item >= 0);
    }

    if (typeof value === 'string') {
        const maybeJson = value.trim();
        if (!maybeJson) return [];

        const parsed = maybeJson.replace(/\[|\]/g, '').split(/[\s,|]+/).map((item) => item.trim()).filter(Boolean);
        return parsed.map((item) => Number(item)).filter((item) => Number.isInteger(item) && item >= 0);
    }

    return [];
};

const parseOptions = (value) => {
    if (Array.isArray(value)) {
        return value
            .map((item) => String(item ?? '').trim())
            .filter((item) => item.length > 0);
    }

    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) return [];

        if (trimmed.startsWith('[')) {
            try {
                const parsed = JSON.parse(trimmed);
                if (Array.isArray(parsed)) {
                    return parsed.map((item) => String(item ?? '').trim()).filter((item) => item.length > 0);
                }
            } catch {
                // fall through to string splitting
            }
        }

        return trimmed
            .split(/\s*\|\s*/)
            .map((item) => item.trim())
            .filter((item) => item.length > 0);
    }

    return [];
};

import { resolveStandardChapter } from './chapterResolver.js';

export const normalizeQuestionBankPayload = (payload = {}) => {
    const questionType = payload.question_type || 'mcq';
    const isIntegerType = questionType === 'integer' || questionType === 'numerical';
    const singleValue = payload.correct_index ?? payload.correct_option ?? payload.correctOption ?? null;

    // For integer/numerical questions, options are typically empty unless explicit option objects exist
    const rawOptions = parseOptions(payload.options ?? payload.option_list ?? []);
    const options = isIntegerType ? (Array.isArray(payload.options) && payload.options.length ? rawOptions : []) : rawOptions;

    const correctIndices = isIntegerType ? [] : parseNumberList(
        payload.correct_indices ?? payload.correct_indices_str ?? (questionType === 'multi_select' ? [singleValue] : singleValue)
    );
    const fallbackIndex = Number.isFinite(Number(singleValue)) ? Number(singleValue) : (correctIndices[0] ?? 0);
    const normalizedIndex = isIntegerType ? null : (Number.isFinite(Number(fallbackIndex)) ? Number(fallbackIndex) : 0);

    const category = payload.category || payload.subject || 'Physics';
    const rawChapter = (payload.chapter || '').trim();
    const rawTopic = (payload.topic || '').trim();
    const resolvedChapter = resolveStandardChapter(category, rawTopic, payload.question_text || '', rawChapter);
    const finalTopic = rawTopic && rawTopic.toLowerCase() !== resolvedChapter.toLowerCase() ? rawTopic : '';

    const numericAnswer = payload.numeric_answer !== undefined && payload.numeric_answer !== null && payload.numeric_answer !== '' && !isNaN(Number(payload.numeric_answer))
        ? Number(payload.numeric_answer)
        : (isIntegerType && singleValue !== null && !isNaN(Number(singleValue)) ? Number(singleValue) : null);

    return {
        ...payload,
        category,
        question_type: questionType,
        options,
        marks: Number(payload.marks ?? 1),
        correct_index: normalizedIndex,
        correct_indices: questionType === 'multi_select' ? correctIndices : (correctIndices.length ? correctIndices : (normalizedIndex !== null ? [normalizedIndex] : [])),
        numeric_answer: numericAnswer,
        numerical_tolerance: payload.numerical_tolerance !== undefined && payload.numerical_tolerance !== null ? Number(payload.numerical_tolerance) : (questionType === 'numerical' ? 0.01 : 0),
        solution: payload.solution ?? payload.solution_text ?? '',
        subject_id: payload.subject_id ?? null,
        chapter_id: payload.chapter_id ?? null,
        difficulty: payload.difficulty || 'medium',
        image_url: payload.image_url || '',
        solution_image_url: payload.solution_image_url || '',
        chapter: resolvedChapter,
        topic: finalTopic,
        subject: payload.subject || category,
    };
};

