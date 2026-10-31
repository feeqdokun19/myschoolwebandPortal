
import { User } from './user.model.js';

export const getNotificationPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      'notificationPreferences'
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User account not found.',
      });
    }

    return res.status(200).json({
      success: true,
      notificationPreferences: {
        academicUpdates:
          user.notificationPreferences?.academicUpdates ?? true,
        schoolAnnouncements:
          user.notificationPreferences?.schoolAnnouncements ?? true,
      },
    });
  } catch (error) {
    console.error('Get notification preferences error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to load notification preferences.',
    });
  }
};

export const updateNotificationPreferences = async (req, res) => {
  try {
    const { academicUpdates, schoolAnnouncements } = req.body;

    if (
      typeof academicUpdates !== 'boolean' ||
      typeof schoolAnnouncements !== 'boolean'
    ) {
      return res.status(400).json({
        success: false,
        message: 'Both notification preferences must be true or false.',
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          'notificationPreferences.academicUpdates': academicUpdates,
          'notificationPreferences.schoolAnnouncements':
            schoolAnnouncements,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select('notificationPreferences');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User account not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Notification preferences saved successfully.',
      notificationPreferences: user.notificationPreferences,
    });
  } catch (error) {
    console.error('Update notification preferences error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to save notification preferences.',
    });
  }
};






import bcrypt from 'bcryptjs';
import { z } from 'zod';

const createStaffAccountSchema = z.object({
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  password: z.string().min(12, 'Password must be at least 12 characters long').max(100),
  role: z.enum(['TEACHER', 'STAFF']),
});

export const createStaffAccount = async (req, res) => {
  try {
    const validation = createStaffAccountSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email, a password of at least 12 characters, and a permitted role.',
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { email, password, role } = validation.data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      passwordHash,
      roles: [role],
      status: 'ACTIVE',
      emailVerified: true,
    });

    return res.status(201).json({
      success: true,
      message: `${role === 'TEACHER' ? 'Teacher' : 'Staff'} account created successfully.`,
      data: {
        user: {
          id: user._id.toString(),
          email: user.email,
          roles: user.roles,
          status: user.status,
          emailVerified: user.emailVerified,
        },
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    console.error('Create staff account error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to create the account.',
    });
  }
};
