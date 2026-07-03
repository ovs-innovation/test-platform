import { Router } from 'express';
import { getInvite } from '../controllers/inviteController.js';

const router = Router();

router.get('/:token', getInvite);

export default router;
