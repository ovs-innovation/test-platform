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

const OPTION_KEYS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

const normalizeOptionItem = (item, idx) => {
    if (item == null) return null;
    const defaultKey = OPTION_KEYS[idx] || String.fromCharCode(65 + idx);

    if (typeof item === 'object') {
        const text = typeof item.text === 'string'
            ? item.text.trim()
            : (typeof item.label === 'string' ? item.label.trim() : (typeof item.value === 'string' ? item.value.trim() : ''));
        const imageUrl = typeof item.image_url === 'string'
            ? item.image_url.trim()
            : (typeof item.image === 'string' ? item.image.trim() : (typeof item.url === 'string' ? item.url.trim() : ''));
        const key = typeof item.key === 'string' && item.key.trim() ? item.key.trim().toUpperCase() : defaultKey;

        if (imageUrl || text) {
            return {
                key,
                text,
                image_url: imageUrl,
                media: Array.isArray(item.media) && item.media.length ? item.media : (imageUrl ? [{ url: imageUrl }] : [])
            };
        }
        return null;
    }

    const str = String(item).trim();
    if (!str) return null;

    if (str.startsWith('{') && str.endsWith('}')) {
        try {
            const parsed = JSON.parse(str);
            if (typeof parsed === 'object' && parsed !== null) {
                return normalizeOptionItem(parsed, idx);
            }
        } catch (_) {}
    }

    return {
        key: defaultKey,
        text: str,
        image_url: '',
        media: []
    };
};

const parseOptions = (value) => {
    if (Array.isArray(value)) {
        return value.map((item, idx) => normalizeOptionItem(item, idx)).filter(Boolean);
    }

    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) return [];

        if (trimmed.startsWith('[')) {
            try {
                const parsed = JSON.parse(trimmed);
                if (Array.isArray(parsed)) {
                    return parsed.map((item, idx) => normalizeOptionItem(item, idx)).filter(Boolean);
                }
            } catch {
                // fall through to string splitting
            }
        }

        return trimmed
            .split(/\s*\|\s*/)
            .map((item, idx) => normalizeOptionItem(item, idx))
            .filter(Boolean);
    }

    return [];
};

import { resolveStandardChapter } from './chapterResolver.js';

export const normalizeQuestionBankPayload = (payload = {}) => {
    const questionType = payload.question_type || 'mcq';
    const isIntegerType = questionType === 'integer' || questionType === 'numerical';
    const singleValue = payload.correct_index ?? payload.correct_option ?? payload.correctOption ?? null;

    const optionsProvided = payload.options !== undefined || payload.option_list !== undefined;
    const rawOptions = optionsProvided ? parseOptions(payload.options ?? payload.option_list ?? []) : undefined;
    const options = isIntegerType ? (Array.isArray(payload.options) && payload.options.length ? rawOptions : []) : rawOptions;

    const correctIndices = isIntegerType ? [] : parseNumberList(
        payload.correct_indices ?? payload.correct_indices_str ?? (questionType === 'multi_select' ? [singleValue] : singleValue)
    );
    const fallbackIndex = Number.isFinite(Number(singleValue)) ? Number(singleValue) : (correctIndices[0] ?? 0);
    const normalizedIndex = isIntegerType ? null : (Number.isFinite(Number(fallbackIndex)) ? Number(fallbackIndex) : 0);

    const category = (payload.category !== undefined || payload.subject !== undefined) ? (payload.category || payload.subject) : undefined;
    const effectiveCategoryForChapter = category || 'Physics';
    const rawChapter = (payload.chapter || '').trim();
    const rawTopic = (payload.topic || '').trim();
    const resolvedChapter = resolveStandardChapter(effectiveCategoryForChapter, rawTopic, payload.question_text || '', rawChapter);
    const finalTopic = rawTopic && rawTopic.toLowerCase() !== resolvedChapter.toLowerCase() ? rawTopic : '';

    const numericAnswer = payload.numeric_answer !== undefined && payload.numeric_answer !== null && payload.numeric_answer !== '' && !isNaN(Number(payload.numeric_answer))
        ? Number(payload.numeric_answer)
        : (isIntegerType && singleValue !== null && !isNaN(Number(singleValue)) ? Number(singleValue) : null);

    return {
        ...payload,
        ...(category !== undefined ? { category } : {}),
        question_type: questionType,
        ...(options !== undefined ? { options } : {}),
        marks: Number(payload.marks ?? 1),
        correct_index: normalizedIndex,
        correct_indices: questionType === 'multi_select' ? correctIndices : (correctIndices.length ? correctIndices : (normalizedIndex !== null ? [normalizedIndex] : [])),
        numeric_answer: numericAnswer,
        numerical_tolerance: payload.numerical_tolerance !== undefined && payload.numerical_tolerance !== null ? Number(payload.numerical_tolerance) : (questionType === 'numerical' ? 0.01 : 0),
        solution: payload.solution ?? payload.solution_text ?? '',
        subject_id: payload.subject_id ?? null,
        chapter_id: payload.chapter_id ?? null,
        difficulty: payload.difficulty || 'medium',
        image_url: payload.image_url !== undefined ? payload.image_url : undefined,
        solution_image_url: payload.solution_image_url !== undefined ? payload.solution_image_url : undefined,
        chapter: resolvedChapter,
        topic: finalTopic,
        ...(category !== undefined ? { subject: payload.subject || category } : {}),
        ...(payload.status !== undefined ? { status: payload.status } : {}),
    };
};


