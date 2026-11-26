export {
  AiQuestionValidationEngine,
  QUESTION_STATUSES,
} from './aiQuestionValidationEngine.js';

export { validateJsonSchema } from './modules/jsonSchemaValidator.js';
export { validateQuestionFormat, normalizeQuestionType } from './modules/questionFormatValidator.js';
export { validateOptions } from './modules/optionValidator.js';
export { validateAnswerConsistency } from './modules/answerConsistencyValidator.js';
export { validateExplanationConsistency } from './modules/explanationConsistencyValidator.js';
export { detectDuplicates, computeJaccardSimilarity, normalizeQuestionText } from './modules/duplicateDetector.js';
export { validateCurriculum } from './modules/curriculumValidator.js';
export { validateDifficulty } from './modules/difficultyValidator.js';
export { validateDiagramMarkers } from './modules/diagramMarkerValidator.js';
export { validateDiagramQuestionConsistency } from './modules/diagramQuestionConsistencyValidator.js';
export { checkScientificAccuracy } from './modules/scientificAccuracyChecker.js';
export { validateMarkingScheme } from './modules/markingSchemeValidator.js';
