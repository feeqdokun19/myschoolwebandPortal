import jwt from 'jsonwebtoken';
import { User } from '../users/user.model.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    const token = authHeader.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token is missing',
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    if (
      decoded.type !== 'access' ||
      typeof decoded.sub !== 'string' ||
      !decoded.sub
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid access token',
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
      decoded.iat &&
      Math.floor(user.passwordChangedAt.getTime() / 1000) >
        decoded.iat
    ) {
      return res.status(401).json({
        success: false,
        message: 'Your session has expired. Please log in again.',
        code: 'SESSION_INVALIDATED',
      });
    }

    req.user = {
      id: user._id.toString(),
      roles: user.roles,
      status: user.status,
      emailVerified: user.emailVerified,
    };

    return next();
  } catch (error) {
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError' ||
      error.name === 'NotBeforeError'
    ) {
      return res.status(401).json({
        success: false,
        message:
          error.name === 'TokenExpiredError'
            ? 'Access token has expired'
            : 'Invalid access token',
      });
    }

    console.error('Authentication middleware error:', error);

    return res.status(500).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    const hasRole = req.user.roles.some((role) =>
      allowedRoles.includes(role)
    );

    if (!hasRole) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to access this resource',
      });
    }

    return next();
  };
};

export const requireStudent = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  if (!req.user.roles.includes('STUDENT')) {
    return res.status(403).json({
      success: false,
      message: 'Student access required',
    });
  }

  User.findById(req.user.id)
    .select('studentNumber admissionApprovedAt status')
    .then((user) => {
      if (
        !user ||
        user.status !== 'ACTIVE' ||
        !user.studentNumber ||
        !user.admissionApprovedAt
      ) {
        return res.status(403).json({
          success: false,
          message: 'Student admission has not been approved.',
          code: 'ADMISSION_NOT_APPROVED',
        });
      }

      return next();
    })
    .catch((error) => {
      console.error('Student authorization error:', error);

      return res.status(500).json({
        success: false,
        message: 'Unable to verify student admission',
      });
    });
};

export const requireTeacher = authorize(
  'TEACHER',
  'ADMIN',
  'SUPER_ADMIN'
);

export const requireStaff = authorize(
  'STAFF',
  'ADMIN',
  'SUPER_ADMIN'
);

export const requireAdmin = authorize(
  'ADMIN',
  'SUPER_ADMIN'
);

export const requireSuperAdmin = authorize('SUPER_ADMIN');

export const authenticateApplicant = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Applicant authentication required',
      });
    }

    const token = authHeader.slice(7).trim();

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    if (
      decoded.type !== 'applicant' ||
      typeof decoded.sub !== 'string' ||
      !decoded.sub
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid applicant token',
      });
    }

    const user = await User.findById(decoded.sub);

    if (
      !user ||
      user.status !== 'PENDING' ||
      !user.emailVerified ||
      !user.roles.includes('STUDENT')
    ) {
      return res.status(403).json({
        success: false,
        message: 'Applicant access is no longer available',
      });
    }

    if (
      user.passwordChangedAt &&
      decoded.iat &&
      Math.floor(user.passwordChangedAt.getTime() / 1000) > decoded.iat
    ) {
      return res.status(401).json({
        success: false,
        message: 'Your session has expired. Please log in again.',
      });
    }

    req.user = {
      id: user._id.toString(),
      roles: user.roles,
      status: user.status,
      emailVerified: user.emailVerified,
    };

    return next();
  } catch (error) {
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError' ||
      error.name === 'NotBeforeError'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired applicant token',
      });
    }

    console.error('Applicant authentication error:', error);

    return res.status(500).json({
      success: false,
      message: 'Applicant authentication failed',
    });
  }
    
};