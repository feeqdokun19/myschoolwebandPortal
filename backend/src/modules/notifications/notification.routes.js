
import express from 'express';

import {
  authenticate,
  requireStudent,
} from '../auth/auth.middleware.js';

import {
  getMyNotifications,
  markNotificationAsRead,
} from './notification.controller.js';

const router = express.Router();

// Get notifications belonging to the logged-in student
router.get('/', authenticate, requireStudent, getMyNotifications);

// Mark one of the student's own notifications as read
router.patch(
  '/:id/read',
  authenticate,
  requireStudent,
  markNotificationAsRead
);

export default router;

