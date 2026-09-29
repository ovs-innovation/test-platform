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

export const normalizeQuestionBankPayload = (payload = {}) => {
    const questionType = payload.question_type || 'mcq';
    const options = parseOptions(payload.options ?? payload.option_list ?? []);
    const singleValue = payload.correct_index ?? payload.correct_option ?? payload.correctOption ?? null;
    const correctIndices = parseNumberList(
        payload.correct_indices ?? payload.correct_indices_str ?? (questionType === 'multi_select' ? [singleValue] : singleValue)
    );
    const fallbackIndex = Number.isFinite(Number(singleValue)) ? Number(singleValue) : (correctIndices[0] ?? 0);
    const normalizedIndex = Number.isFinite(Number(fallbackIndex)) ? Number(fallbackIndex) : 0;

    return {
        ...payload,
        category: payload.category || payload.subject || 'Physics',
        question_type: questionType,
        options,
        marks: Number(payload.marks ?? 1),
        correct_index: normalizedIndex,
        correct_indices: questionType === 'multi_select' ? correctIndices : (correctIndices.length ? correctIndices : [normalizedIndex]),
        solution: payload.solution ?? payload.solution_text ?? '',
        subject_id: payload.subject_id ?? null,
        chapter_id: payload.chapter_id ?? null,
        difficulty: payload.difficulty || 'medium',
        image_url: payload.image_url || '',
        solution_image_url: payload.solution_image_url || '',
    };
};
