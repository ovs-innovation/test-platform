import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { uploadImage } from '../controllers/uploadController.js';

const router = Router();

// Upload image (requires authentication)
router.post('/image', authenticate, uploadImage);

export default router;
