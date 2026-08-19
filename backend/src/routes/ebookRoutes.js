import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { getMyAssignedEbooks } from '../controllers/ebookController.js';

const router = Router();

router.use(authenticate);

router.get('/my', authorize('candidate'), getMyAssignedEbooks);

export default router;
