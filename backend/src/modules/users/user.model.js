import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    roles: {
      type: [String],
      enum: [
        'STUDENT',
        'TEACHER',
        'STAFF',
        'ADMIN',
        'PARENT',
        'SUPER_ADMIN',
      ],
      default: ['STUDENT'],
    },

    status: {
      type: String,
      enum: ['PENDING', 'ACTIVE', 'SUSPENDED', 'DISABLED'],
      default: 'PENDING',
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerifiedAt: {
      type: Date,
      default: null,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },

          passwordChangedAt: {
        type: Date,
        default: null,
      },

      studentNumber: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
      },


notificationPreferences: {
  academicUpdates: {
    type: Boolean,
    default: true,
  },
  schoolAnnouncements: {
    type: Boolean,
    default: true,
  },
},


      admissionApprovedAt: {
        type: Date,
        default: null,
      },

      admissionApprovedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
      },
    },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);