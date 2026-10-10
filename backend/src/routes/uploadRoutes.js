import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { uploadImage, uploadBrochure, uploadEbook } from '../controllers/uploadController.js';

const router = Router();

// Upload image (requires authentication)
router.post('/image', authenticate, uploadImage);

// Upload brochure PDF / document (requires authentication)
router.post('/brochure', authenticate, uploadBrochure);

// Upload eBook / notes PDF (requires authentication)
router.post('/ebook', authenticate, uploadEbook);

export default router;
