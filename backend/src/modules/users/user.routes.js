
import express from 'express';
import {
  authenticate,
  requireStudent,
  requireAdmin,
} from '../auth/auth.middleware.js';

import {
  getNotificationPreferences,
  updateNotificationPreferences,
  createStaffAccount,
} from './user.controller.js';

const router = express.Router();

// Create Teacher or Staff accounts (Admin/Super Admin only)
router.post(
  '/staff-accounts',
  authenticate,
  requireAdmin,
  createStaffAccount
);

// Load the logged-in student's notification preferences
router.get(
  '/me/notification-preferences',
  authenticate,
  requireStudent,
  getNotificationPreferences
);

// Save the logged-in student's notification preferences
router.put(
  '/me/notification-preferences',
  authenticate,
  requireStudent,
  updateNotificationPreferences
);

export default router;
