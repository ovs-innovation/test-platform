/**
 * Blueprint Routes
 * API endpoints for managing, versioning, and validating Exam Blueprints.
 */

import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  listBlueprints,
  getBlueprintById,
  createBlueprint,
  updateBlueprint,
  duplicateBlueprint,
  deleteBlueprint,
  validateBlueprintEndpoint,
} from '../controllers/blueprintController.js';

const router = Router();

// Protect all blueprint routes with authentication and admin authorization
router.use(authenticate, authorize('admin'));

router.get('/', listBlueprints);
router.get('/:id', getBlueprintById);
router.post('/', createBlueprint);
router.put('/:id', updateBlueprint);
router.post('/:id/duplicate', duplicateBlueprint);
router.delete('/:id', deleteBlueprint);
router.post('/validate', validateBlueprintEndpoint);

export default router;
