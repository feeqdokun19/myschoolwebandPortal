import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

import { User } from '../users/user.model.js';

import { randomBytes, createHash } from 'node:crypto';

import { EmailVerificationToken } from './email-verification-token.model.js';
import { sendVerificationEmail } from './email.service.js';
import { env } from '../../config/env.js';


import { PasswordResetToken } from './password-reset-token.model.js'; 


// ─────────────────────────────────────────────
// Validation schemas
// ─────────────────────────────────────────────

const registerSchema = z.object({
  email: z
    .string()
    .email('Please provide a valid email address')
    .transform((value) => value.toLowerCase().trim()),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100),

  role: z
    .enum(['STUDENT', 'PARENT'])
    .optional()
    .default('STUDENT'),
});


const loginSchema = z.object({
  email: z
    .string()
    .email('Please provide a valid email address')
    .transform((value) => value.toLowerCase().trim()),

  password: z.string().min(1, 'Password is required'),
});


// ─────────────────────────────────────────────
// JWT helpers
// ─────────────────────────────────────────────

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      roles: user.roles,
      type: 'access',
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    }
  );
};


const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      type: 'refresh',
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    }
  );
};

const generateApplicantToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      roles: user.roles,
      type: 'applicant',
    },
    env.accessSecret,
    {
      expiresIn: '15m',
    }
  );
};

const createAndSendVerificationEmail = async (user) => {
  const rawToken = randomBytes(32).toString('hex');

  const tokenHash = createHash('sha256')
    .update(rawToken)
    .digest('hex');

  // Replace any previous verification token for this user.
  await EmailVerificationToken.deleteMany({
    userId: user._id,
  });

  await EmailVerificationToken.create({
    userId: user._id,
    tokenHash,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  const verificationUrl =
    `${env.apiBaseUrl}/api/auth/verify-email?token=${rawToken}`;

  await sendVerificationEmail({
    to: user.email,
    verificationUrl,
  });
};



// ─────────────────────────────────────────────
// REGISTER
// POST /api/auth/register
// ─────────────────────────────────────────────


const register = async (req, res) => {
  try {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { email, password, role } = validation.data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      passwordHash,
      roles: [role],
      status: 'PENDING',
      emailVerified: false,
    });

    try {
      await createAndSendVerificationEmail(user);
    } catch (emailError) {
      console.error('Verification email error:', emailError);

      return res.status(503).json({
        success: false,
        code: 'VERIFICATION_EMAIL_FAILED',
        message:
          'Your account was created, but the verification email could not be sent. Please request another verification email.',
        data: {
          user: {
            id: user._id,
            email: user.email,
            roles: user.roles,
            status: user.status,
            emailVerified: user.emailVerified,
          },
        },
      });
    }

    return res.status(201).json({
      success: true,
      message:
        'Registration successful. Please check your email and click the verification link before logging in.',
      data: {
        user: {
          id: user._id,
          email: user.email,
          roles: user.roles,
          status: user.status,
          emailVerified: user.emailVerified,
        },
      },
    });
  } catch (error) {
    console.error('Registration error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to create account',
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;

    if (
      typeof token !== 'string' ||
      !/^[a-f0-9]{64}$/i.test(token)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing verification token.',
      });
    }

    const tokenHash = createHash('sha256')
      .update(token)
      .digest('hex');

    const verificationToken =
      await EmailVerificationToken.findOneAndDelete({
        tokenHash,
        expiresAt: { $gt: new Date() },
      });

    if (!verificationToken) {
      return res.status(400).json({
        success: false,
        message:
          'This verification link is invalid, expired, or already used. Please request a new one.',
      });
    }

    const user = await User.findByIdAndUpdate(
      verificationToken.userId,
      {
        $set: {
          emailVerified: true,
          emailVerifiedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'The account associated with this link was not found.',
      });
    }

    // Redirect to the frontend verification success page.
    return res.redirect(
      `${env.clientUrl}/verify-email?status=success`
    );
  } catch (error) {
    console.error('Email verification error:', error);

    return res.redirect(
      `${env.clientUrl}/verify-email?status=error`
    );
  }
};



const resendVerification = async (req, res) => {
  const genericResponse = {
    success: true,
    message:
      'If an unverified account exists for that email, a verification link will be sent.',
  };

  try {
    const validation = z
      .object({
        email: z.string().email().transform(
          (value) => value.toLowerCase().trim()
        ),
      })
      .safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    const user = await User.findOne({
      email: validation.data.email,
      emailVerified: false,
    });

    if (!user) {
      console.log(
        '[Resend verification] No matching unverified account found.'
      );
      return res.status(200).json(genericResponse);
    }

    console.log(
      '[Resend verification] Unverified account found. Attempting email delivery.'
    );

    try {
      const result = await createAndSendVerificationEmail(user);

      console.log(
        '[Resend verification] SES accepted the email.',
        result?.MessageId ?? '(No message ID returned)'
      );
    } catch (emailError) {
      console.error(
        '[Resend verification] Email delivery failed:',
        emailError.name,
        emailError.message
      );
    }

    return res.status(200).json(genericResponse);
  } catch (error) {
    console.error(
      '[Resend verification] Request failed:',
      error.name,
      error.message
    );

    return res.status(200).json(genericResponse);
  }
};


const requestPasswordReset = async (req, res) => {
  const genericResponse = {
    success: true,
    message:
      'If an account exists for that email, a password-reset link will be sent.',
  };

  try {
    const validation = z
      .object({
        email: z.string().email().transform(
          (value) => value.toLowerCase().trim()
        ),
      })
      .safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    const user = await User.findOne({
      email: validation.data.email,
    });

    if (!user) {
      return res.status(200).json(genericResponse);
    }

    const rawToken = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256')
      .update(rawToken)
      .digest('hex');

    await PasswordResetToken.deleteMany({ userId: user._id });

    await PasswordResetToken.create({
      userId: user._id,
      tokenHash,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });

    const resetUrl =
      `${env.clientUrl}/reset-password?token=${rawToken}`;

    try {
      await sendVerificationEmail({
        to: user.email,
        verificationUrl: resetUrl,
        purpose: 'password-reset',

      });
    } catch (emailError) {
      await PasswordResetToken.deleteMany({ userId: user._id });

      console.error(
        'Password-reset email failed:',
        emailError.name,
        emailError.message
      );
    }

    return res.status(200).json(genericResponse);
  } catch (error) {
    console.error('Password-reset request error:', error);

    return res.status(200).json(genericResponse);
  }
};

const resetPassword = async (req, res) => {
  try {
    const validation = z
      .object({
        token: z.string().regex(/^[a-f0-9]{64}$/i),
        password: z.string().min(8).max(100),
      })
      .safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Provide a valid reset token and a password of 8–100 characters.',
      });
    }

    const tokenHash = createHash('sha256')
      .update(validation.data.token)
      .digest('hex');

    const resetToken = await PasswordResetToken.findOneAndDelete({
      tokenHash,
      expiresAt: { $gt: new Date() },
    });

    if (!resetToken) {
      return res.status(400).json({
        success: false,
        message: 'This password-reset link is invalid, expired, or already used.',
      });
    }

    const passwordHash = await bcrypt.hash(
      validation.data.password,
      12
    );

    const user = await User.findByIdAndUpdate(
      resetToken.userId,
      {
        $set: {
          passwordHash,
          passwordChangedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'The account associated with this link was not found.',
      });
    }

    await PasswordResetToken.deleteMany({
      userId: resetToken.userId,
    });

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully. You can now log in.',
    });
  } catch (error) {
    console.error('Password-reset error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to reset the password. Please try again.',
    });
  }
};


// ─────────────────────────────────────────────
// LOGIN
// POST /api/auth/login
// ─────────────────────────────────────────────

const login = async (req, res) => {
  try {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const {
      email,
      password,
    } = validation.data;


    // passwordHash has select:false
    // so we explicitly include it here.
    const user = await User.findOne({ email })
      .select('+passwordHash');


    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }


    // Suspended account
    if (user.status === 'SUSPENDED') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended',
      });
    }


    // Disabled account
    if (user.status === 'DISABLED') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been disabled',
      });
    }


    // Email verification requirement
    if (!user.emailVerified) {
      return res.status(403).json({
        success: false,
        message:
          'Please verify your email address before logging in',

        code: 'EMAIL_NOT_VERIFIED',
      });
    }


    // Compare password
    const passwordMatches = await bcrypt.compare(
      password,
      user.passwordHash
    );


    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }


    // Activate account after verified login
  // Pending accounts must wait for admin approval.
// Pending students receive restricted applicant access only.
if (user.status === 'PENDING') {
  if (!user.roles.includes('STUDENT')) {
    return res.status(403).json({
      success: false,
      message: 'Your account is awaiting school approval.',
      code: 'ACCOUNT_PENDING_APPROVAL',
    });
  }

  user.lastLoginAt = new Date();
  await user.save();

  const applicantToken = generateApplicantToken(user);

  return res.status(200).json({
    success: true,
    message: 'Applicant login successful',
    data: {
      accessToken: applicantToken,
      user: {
        id: user._id,
        email: user.email,
        roles: user.roles,
        status: user.status,
        emailVerified: user.emailVerified,
        lastLoginAt: user.lastLoginAt,
        accountType: 'APPLICANT',
      },
    },
  });
}

user.lastLoginAt = new Date();

await user.save();


    // Generate tokens
    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);


    return res.status(200).json({
      success: true,

      message: 'Login successful',

      data: {
        accessToken,
        refreshToken,

        user: {
          id: user._id,
          email: user.email,
          roles: user.roles,
          status: user.status,
          emailVerified: user.emailVerified,
          lastLoginAt: user.lastLoginAt,
        },
      },
    });

  } catch (error) {
    console.error('Login error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to login',
    });
  }
};


// ─────────────────────────────────────────────
// REFRESH TOKEN
// POST /api/auth/refresh
// ─────────────────────────────────────────────

const refreshToken = async (req, res) => {
  try {
    const token = req.body?.refreshToken;

    if (typeof token !== 'string' || !token) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token is required',
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        env.refreshSecret
      );
    } catch {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token',
      });
    }

    if (
      decoded.type !== 'refresh' ||
      typeof decoded.sub !== 'string' ||
      !decoded.sub ||
      !decoded.iat
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token',
      });
    }

    const user = await User.findById(decoded.sub);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User account not found',
      });
    }

    if (user.status !== 'ACTIVE') {
      return res.status(403).json({
        success: false,
        message: 'Your account is not active',
      });
    }

    if (!user.emailVerified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email address',
        code: 'EMAIL_NOT_VERIFIED',
      });
    }

    if (
      user.passwordChangedAt &&
      Math.floor(user.passwordChangedAt.getTime() / 1000) >
        decoded.iat
    ) {
      return res.status(401).json({
        success: false,
        message: 'Please log in again',
        code: 'SESSION_INVALIDATED',
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        accessToken: generateAccessToken(user),
      },
    });
  } catch (error) {
    console.error(
      'Refresh token error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Unable to refresh authentication token',
    });
  }
};


// ─────────────────────────────────────────────
// CURRENT USER
// GET /api/auth/me
// ─────────────────────────────────────────────

const me = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.id
    ).select('-passwordHash');


    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User account not found',
      });
    }


    return res.status(200).json({
      success: true,

      data: {
        user,
      },
    });

  } catch (error) {
    console.error(
      'Get current user error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Unable to retrieve user account',
    });
  }
};


// ─────────────────────────────────────────────
// LOGOUT
// POST /api/auth/logout
// ─────────────────────────────────────────────

const logout = async (req, res) => {
  /*
   * For V1, logout is handled by removing
   * tokens on the client.
   *
   * Later we will implement refresh-token
   * rotation and server-side revocation.
   */

  return res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
};


// ─────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────


export {
  register,
  login,
  refreshToken,
  me,
  logout,
  resendVerification,
  requestPasswordReset,
  resetPassword,
};