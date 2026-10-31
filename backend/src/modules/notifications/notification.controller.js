
import { Notification } from './notification.model.js';

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    const unreadCount = await Notification.countDocuments({
      recipient: req.user.id,
      isRead: false,
    });

    return res.status(200).json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.error('Get notifications error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to load notifications.',
    });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        recipient: req.user.id,
      },
      {
        $set: { isRead: true },
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Notification marked as read.',
      notification,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid notification ID.',
      });
    }

    console.error('Mark notification as read error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to update notification.',
    });
  }
};
