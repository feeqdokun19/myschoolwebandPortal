

import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    type: {
      type: String,
      enum: [
        'ACADEMIC',
        'ANNOUNCEMENT',
        'ASSIGNMENT',
        'RESULT',
        'TIMETABLE',
        'GENERAL',
      ],
      default: 'GENERAL',
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    link: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ recipient: 1, createdAt: -1 });

export const Notification = mongoose.model(
  'Notification',
  notificationSchema
);
