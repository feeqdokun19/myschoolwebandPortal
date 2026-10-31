
import express from 'express';

import {
  submitAdmission,
  getMyAdmission,
  getAllAdmissions,
  reviewAdmission,
  approveAdmission,
  rejectAdmission,
} from './admission.controller.js';



import {
  authenticate,
  authenticateApplicant,
  requireAdmin
} from '../auth/auth.middleware.js';


const router = express.Router();

router.post('/', authenticateApplicant, submitAdmission);

router.get('/me', authenticateApplicant, getMyAdmission);

router.get('/admin', authenticate, requireAdmin, getAllAdmissions);

router.patch('/admin/:id/review', authenticate, requireAdmin, reviewAdmission);

router.patch('/admin/:id/approve', authenticate, requireAdmin, approveAdmission);

router.patch('/admin/:id/reject', authenticate, requireAdmin, rejectAdmission);

export default router;

