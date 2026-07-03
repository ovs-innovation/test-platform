import { Router } from 'express';
import { updateQuestion, deleteQuestion } from '../controllers/questionController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { questionUpdateSchema } from '../validators/schemas.js';

const router = Router();

router.use(authenticate, authorize('admin'));

router.put('/:id', validate(questionUpdateSchema), updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;
