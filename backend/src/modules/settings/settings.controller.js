
import { SchoolSettings } from './settings.model.js';

const DEFAULT_SETTINGS_ID = 'school-settings-main';

export async function getSchoolSettings(req, res, next) {
  try {
    let settings = await SchoolSettings.findOne({
      settingsKey: DEFAULT_SETTINGS_ID,
    });

    if (!settings) {
      settings = await SchoolSettings.create({
        settingsKey: DEFAULT_SETTINGS_ID,
      });
    }

    res.json({ settings });
  } catch (error) {
    next(error);
  }
}

export async function updateSchoolSettings(req, res, next) {
  try {
    const allowedFields = [
      'schoolName',
      'schoolEmail',
      'schoolPhone',
      'schoolAddress',
      'currentSession',
      'currentTerm',
      'admissionsOpen',
      'portalMaintenanceMode',
      'announcement',
      'resultPublicationEnabled',
      'grading',
      'notificationsEnabled',
      'emailNotificationsEnabled',
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: 'No valid settings were provided.',
      });
    }

    const settings = await SchoolSettings.findOneAndUpdate(
      { settingsKey: DEFAULT_SETTINGS_ID },
      { $set: updates },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    res.json({
      message: 'School settings updated successfully.',
      settings,
    });
  } catch (error) {
    next(error);
  }
}
