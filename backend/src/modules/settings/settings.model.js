
import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
    
  {
settingsKey: {
  type: String,
  default: 'school-settings-main',
  unique: true,
  immutable: true,
},
    schoolName: {
      type: String,
      default: 'AUD Islamic Secondary School',
      trim: true,
    },

    schoolEmail: {
      type: String,
      default: '',
      trim: true,
      lowercase: true,
    },

    schoolPhone: {
      type: String,
      default: '',
      trim: true,
    },

    schoolAddress: {
      type: String,
      default: '',
      trim: true,
    },

    currentSession: {
      type: String,
      default: '2026/2027',
      trim: true,
    },

    currentTerm: {
      type: String,
      enum: ['FIRST', 'SECOND', 'THIRD'],
      default: 'FIRST',
    },

    admissionsOpen: {
      type: Boolean,
      default: true,
    },

    portalMaintenanceMode: {
      type: Boolean,
      default: false,
    },

    announcement: {
      type: String,
      default: '',
      trim: true,
      maxlength: 1000,
    },

    resultPublicationEnabled: {
      type: Boolean,
      default: false,
    },

    grading: {
      type: [
        {
          grade: { type: String, required: true, trim: true },
          minScore: { type: Number, required: true, min: 0, max: 100 },
          remark: { type: String, default: '', trim: true },
        },
      ],
      default: [
        { grade: 'A', minScore: 70, remark: 'Excellent' },
        { grade: 'B', minScore: 60, remark: 'Very Good' },
        { grade: 'C', minScore: 50, remark: 'Good' },
        { grade: 'D', minScore: 45, remark: 'Pass' },
        { grade: 'E', minScore: 40, remark: 'Fair' },
        { grade: 'F', minScore: 0, remark: 'Fail' },
      ],
    },

    notificationsEnabled: {
      type: Boolean,
      default: true,
    },

    emailNotificationsEnabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const SchoolSettings = mongoose.model(
  'SchoolSettings',
  settingsSchema
);
