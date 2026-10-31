
import express from 'express';
import {
  getSchoolSettings,
  updateSchoolSettings,
} from './settings.controller.js';
import {
  authenticate,
  requireAdmin,
} from '../auth/auth.middleware.js';

const router = express.Router();

// Only authenticated administrators can access school settings.
router.use(authenticate, requireAdmin);

router.get('/', getSchoolSettings);
router.put('/', updateSchoolSettings);

export default router;
