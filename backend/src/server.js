import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { env } from './config/env.js';
import { connectDB } from './config/db.js';

import authRoutes from './modules/auth/auth.routes.js';

import admissionRoutes from './modules/admissions/admission.routes.js';

import settingsRoutes from './modules/settings/settings.routes.js';

import { errorHandler } from './middleware/error.js';

import userRoutes from './modules/users/user.routes.js';

import notificationRoutes from './modules/notifications/notification.routes.js';


const app = express();


// ─────────────────────────────────────────────
// SECURITY
// ─────────────────────────────────────────────

app.use(helmet());

app.use(
  cors({
    origin: env.clientUrl,
  })
);


// ─────────────────────────────────────────────
// BODY PARSER
// ─────────────────────────────────────────────

app.use(
  express.json({
    limit: '2mb',
  })
);


// ─────────────────────────────────────────────
// AUTH RATE LIMITER
// ─────────────────────────────────────────────

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: 'Too many authentication requests. Please try again later.',
  },
});


// ─────────────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'AUD School Portal API',
    timestamp: new Date().toISOString(),
  });
});


// ─────────────────────────────────────────────
// AUTH ROUTES
// ─────────────────────────────────────────────

app.use('/api/auth', authRateLimiter, authRoutes);

app.use('/api/admissions', admissionRoutes);

app.use('/api/settings', settingsRoutes);

app.use('/api/users', userRoutes);

app.use('/api/notifications', notificationRoutes);


// ─────────────────────────────────────────────
// ERROR HANDLER
// ─────────────────────────────────────────────

app.use(errorHandler);


// ─────────────────────────────────────────────
// DATABASE + SERVER
// ─────────────────────────────────────────────

connectDB()
  .then(() => {
    app.listen(env.port, () => {
      console.log(
        `API running on http://localhost:${env.port}`
      );
    });
  })
  .catch((error) => {
    console.error('Startup failed:', error);
    process.exit(1);
  });
