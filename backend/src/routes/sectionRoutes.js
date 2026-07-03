import { Router } from 'express';
import { updateSection, deleteSection } from '../controllers/sectionController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { sectionSchema } from '../validators/schemas.js';

const sectionUpdateSchema = sectionSchema.partial();

const router = Router();

router.use(authenticate, authorize('admin'));

router.put('/:id', validate(sectionUpdateSchema), updateSection);
router.delete('/:id', deleteSection);

export default router;
