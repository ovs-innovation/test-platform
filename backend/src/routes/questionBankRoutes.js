import { Router } from 'express';
import { listCategories, listBankQuestions, importToAssessment, createBankQuestion, updateBankQuestion, deleteBankQuestion, exportBankQuestions, bulkUploadBankQuestions, bulkImportToAssessment } from '../controllers/questionBankController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { bulkUploadSchema, bankBulkImportSchema } from '../validators/schemas.js';

const router = Router();

router.use(authenticate, authorize('admin'));

router.get('/export', exportBankQuestions);
router.get('/categories', listCategories);
router.get('/', listBankQuestions);
router.post('/bulk', validate(bulkUploadSchema), bulkUploadBankQuestions);
router.post('/bulk-import/:assessmentId', validate(bankBulkImportSchema), bulkImportToAssessment);
router.post('/', createBankQuestion);
router.put('/:id', updateBankQuestion);
router.delete('/:id', deleteBankQuestion);
router.post('/:id/import/:assessmentId', importToAssessment);

export default router;
