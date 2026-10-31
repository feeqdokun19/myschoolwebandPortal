
import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },

    applicationNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    personalDetails: {
      firstName: { type: String, required: true, trim: true },
      middleName: { type: String, trim: true, default: '' },
      lastName: { type: String, required: true, trim: true },
      dateOfBirth: { type: Date, required: true },
      gender: {
        type: String,
        enum: ['MALE', 'FEMALE'],
        required: true,
      },
      phone: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      stateOfOrigin: { type: String, required: true, trim: true },
      nationality: { type: String, default: 'Nigerian', trim: true },
    },

    guardian: {
      fullName: { type: String, required: true, trim: true },
      relationship: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      email: { type: String, trim: true, lowercase: true },
    },

    requestedClass: {
      type: String,
      enum: ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'],
      required: true,
    },

    documents: [
      {
        documentType: {
          type: String,
          required: true,
          trim: true,
        },
        fileUrl: {
          type: String,
          required: true,
          trim: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    entranceExam: {
      status: {
        type: String,
        enum: ['NOT_STARTED', 'IN_PROGRESS', 'SUBMITTED', 'MARKED'],
        default: 'NOT_STARTED',
      },
      score: { type: Number, min: 0, max: 100, default: null },
      totalQuestions: { type: Number, default: 100 },
      submittedAt: { type: Date, default: null },
      markedAt: { type: Date, default: null },
    },

    status: {
      type: String,
      enum: [
        'DRAFT',
        'SUBMITTED',
        'UNDER_REVIEW',
        'APPROVED',
        'REJECTED',
      ],
      default: 'DRAFT',
      index: true,
    },

    adminRemarks: {
      type: String,
      trim: true,
      default: '',
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    reviewedAt: {
      type: Date,
      default: null,
    },

    submittedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Admission = mongoose.model('Admission', admissionSchema);

