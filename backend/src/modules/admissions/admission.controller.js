
import mongoose from 'mongoose';
import { Admission } from './admission.model.js';

const submitAdmissionSchema = {
  required: [
    'firstName',
    'lastName',
    'dateOfBirth',
    'gender',
    'phone',
    'address',
    'stateOfOrigin',
    'guardianFullName',
    'guardianRelationship',
    'guardianPhone',
    'requestedClass',
  ],
};

const allowedClasses = [
  'JSS1',
  'JSS2',
  'JSS3',
  'SS1',
  'SS2',
  'SS3',
];

export const submitAdmission = async (req, res, next) => {
  try {
    const body = req.body || {};
    const missingFields = submitAdmissionSchema.required.filter(
      (field) =>
        body[field] === undefined ||
        body[field] === null ||
        String(body[field]).trim() === ''
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required admission details.',
        missingFields,
      });
    }

    if (!allowedClasses.includes(body.requestedClass)) {
      return res.status(400).json({
        success: false,
        message: 'Please select a valid class.',
      });
    }

    const dateOfBirth = new Date(body.dateOfBirth);

    if (
      Number.isNaN(dateOfBirth.getTime()) ||
      dateOfBirth >= new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid date of birth in the past.',
      });
    }

    if (!['MALE', 'FEMALE'].includes(body.gender)) {
      return res.status(400).json({
        success: false,
        message: 'Gender must be MALE or FEMALE.',
      });
    }

    const existing = await Admission.findOne({
      applicant: req.user.id,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'You already have an admission application.',
        application: existing,
      });
    }

    const application = await Admission.create({
      applicant: req.user.id,
      personalDetails: {
        firstName: String(body.firstName).trim(),
        middleName: String(body.middleName || '').trim(),
        lastName: String(body.lastName).trim(),
        dateOfBirth,
        gender: body.gender,
        phone: String(body.phone).trim(),
        address: String(body.address).trim(),
        stateOfOrigin: String(body.stateOfOrigin).trim(),
        nationality: String(body.nationality || 'Nigerian').trim(),
      },
      guardian: {
        fullName: String(body.guardianFullName).trim(),
        relationship: String(body.guardianRelationship).trim(),
        phone: String(body.guardianPhone).trim(),
        email: String(body.guardianEmail || '').trim().toLowerCase(),
      },
      requestedClass: body.requestedClass,
      status: 'SUBMITTED',
      submittedAt: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: 'Your admission application has been submitted.',
      application,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        message: 'Some admission details are invalid.',
      });
    }

    return next(error);
  }
};

export const getMyAdmission = async (req, res, next) => {
  try {
    const application = await Admission.findOne({
      applicant: req.user.id,
    }).populate('applicant', 'email');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'No admission application was found for your account.',
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllAdmissions = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const pageNumber = Math.max(1, Number(page) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(limit) || 20));

    const filter = {};

    if (status) {
      const allowedStatuses = [
        'DRAFT',
        'SUBMITTED',
        'UNDER_REVIEW',
        'APPROVED',
        'REJECTED',
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid admission status filter.',
        });
      }

      filter.status = status;
    }

    const [applications, total] = await Promise.all([
      Admission.find(filter)
        .populate('applicant', 'email roles status')
        .populate('reviewedBy', 'email')
        .sort({ submittedAt: -1, createdAt: -1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .lean(),

      Admission.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: applications,
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    return next(error);
  }
};


export const reviewAdmission = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid admission application ID.',
      });
    }

    const application = await Admission.findOneAndUpdate(
      {
        _id: id,
        status: 'SUBMITTED',
      },
      {
        $set: {
          status: 'UNDER_REVIEW',
          reviewedBy: req.user.id,
          reviewedAt: new Date(),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!application) {
      return res.status(409).json({
        success: false,
        message:
          'Application not found or it is no longer awaiting review.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Application moved into review.',
      application,
    });
  } catch (error) {
    return next(error);
  }
};

export const approveAdmission = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid admission application ID.',
      });
    }

    const application = await Admission.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Admission application not found.',
      });
    }

    if (application.status !== 'UNDER_REVIEW') {
      return res.status(409).json({
        success: false,
        message: 'Only applications under review can be approved.',
      });
    }

    if (
      application.entranceExam.status !== 'MARKED' ||
      !Number.isFinite(application.entranceExam.score) ||
      application.entranceExam.score < 0 ||
      application.entranceExam.score > 100
    ) {
      return res.status(400).json({
        success: false,
        message: 'The entrance exam must be marked with a valid score before approval.',
      });
    }

    const user = await mongoose.model('User').findById(application.applicant);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Applicant account not found.',
      });
    }

    if (!user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: 'The applicant must verify their email before admission approval.',
      });
    }

    if (user.status === 'SUSPENDED' || user.status === 'DISABLED') {
      return res.status(409).json({
        success: false,
        message: 'This applicant account cannot be activated.',
      });
    }

    if (user.admissionApprovedAt || user.studentNumber) {
      return res.status(409).json({
        success: false,
        message: 'This applicant already has an admission record.',
      });
    }

    const level = application.requestedClass.startsWith('JSS')
      ? 'JSS'
      : 'SSS';

    let studentNumber;
    let studentNumberAssigned = false;

    for (let attempt = 0; attempt < 10; attempt += 1) {
      const suffix = Math.floor(1000 + Math.random() * 9000);
      studentNumber = `AUD-${level}-${new Date().getFullYear()}-${suffix}`;

      const existingNumber = await mongoose
        .model('User')
        .exists({ studentNumber });

      if (!existingNumber) {
        studentNumberAssigned = true;
        break;
      }
    }

    if (!studentNumberAssigned) {
      return res.status(503).json({
        success: false,
        message: 'Unable to generate a unique student number. Please try again.',
      });
    }

    const approvedAt = new Date();

    // Assign the unique student number while the account is still pending.
    const updatedUser = await mongoose.model('User').findOneAndUpdate(
      {
        _id: user._id,
        status: 'PENDING',
        emailVerified: true,
        studentNumber: { $exists: false },
        admissionApprovedAt: null,
      },
      {
        $set: {
          studentNumber,
          admissionApprovedAt: approvedAt,
          admissionApprovedBy: req.user.id,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(409).json({
        success: false,
        message: 'The applicant account changed. Refresh and review the application again.',
      });
    }

    // Record the admission decision before activating student access.
    application.status = 'APPROVED';
    application.reviewedBy = req.user.id;
    application.reviewedAt = approvedAt;

    try {
      await application.save();
    } catch (error) {
      // Compensate if admission approval could not be recorded.
      await mongoose.model('User').updateOne(
        {
          _id: user._id,
          studentNumber,
          status: 'PENDING',
        },
        {
          $unset: {
            studentNumber: 1,
            admissionApprovedAt: 1,
            admissionApprovedBy: 1,
          },
        }
      );

      throw error;
    }

  
    let activation;

    try {
      activation = await mongoose.model('User').updateOne(
        {
          _id: user._id,
          studentNumber,
          status: 'PENDING',
        },
        {
          $set: {
            status: 'ACTIVE',
          },
        }
      );
    } catch (activationError) {
      // Activation threw an error; attempt to restore the admission.
      const rollback = await Admission.updateOne(
        {
          _id: application._id,
          status: 'APPROVED',
          reviewedBy: req.user.id,
          reviewedAt: approvedAt,
        },
        {
          $set: {
            status: 'UNDER_REVIEW',
            reviewedBy: null,
            reviewedAt: null,
          },
        }
      );

      if (rollback.modifiedCount === 1) {
        await mongoose.model('User').updateOne(
          {
            _id: user._id,
            studentNumber,
            status: 'PENDING',
          },
          {
            $unset: {
              studentNumber: 1,
              admissionApprovedAt: 1,
              admissionApprovedBy: 1,
            },
          }
        );
      }

      return next(activationError);
    }

    if (activation.modifiedCount !== 1) {
      const rollback = await Admission.updateOne(
        {
          _id: application._id,
          status: 'APPROVED',
          reviewedBy: req.user.id,
          reviewedAt: approvedAt,
        },
        {
          $set: {
            status: 'UNDER_REVIEW',
            reviewedBy: null,
            reviewedAt: null,
          },
        }
      );

      if (rollback.modifiedCount === 1) {
        await mongoose.model('User').updateOne(
          {
            _id: user._id,
            studentNumber,
            status: 'PENDING',
          },
          {
            $unset: {
              studentNumber: 1,
              admissionApprovedAt: 1,
              admissionApprovedBy: 1,
            },
          }
        );
      }

      return res.status(500).json({
        success: false,
        message:
          'Student activation failed. Please inspect the admission and user records before retrying.',
      });
    }


    if (activation.modifiedCount !== 1) {
      // Attempt to restore a consistent state if activation fails.
      const rollback = await Admission.updateOne(
        {
          _id: application._id,
          status: 'APPROVED',
          reviewedBy: req.user.id,
          reviewedAt: approvedAt,
        },
        {
          $set: {
            status: 'UNDER_REVIEW',
            reviewedBy: null,
            reviewedAt: null,
          },
        }
      );

      if (rollback.modifiedCount === 1) {
        await mongoose.model('User').updateOne(
          {
            _id: user._id,
            studentNumber,
            status: 'PENDING',
          },
          {
            $unset: {
              studentNumber: 1,
              admissionApprovedAt: 1,
              admissionApprovedBy: 1,
            },
          }
        );
      }

      return res.status(500).json({
        success: false,
        message:
          'Student activation failed. Please inspect the admission and user records before retrying.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Admission approved and student account activated.',
      data: {
        applicationId: application._id,
        studentNumber,
        requestedClass: application.requestedClass,
        status: 'APPROVED',
      },
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A duplicate student number was detected. Please retry.',
      });
    }

    return next(error);
  }
};

export const rejectAdmission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const remarks =
      typeof req.body?.adminRemarks === 'string'
        ? req.body.adminRemarks.trim()
        : '';

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid admission application ID.',
      });
    }

    if (remarks.length < 5 || remarks.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Provide a rejection reason between 5 and 1000 characters.',
      });
    }

    const application = await Admission.findOneAndUpdate(
      {
        _id: id,
        status: { $in: ['SUBMITTED', 'UNDER_REVIEW'] },
      },
      {
        $set: {
          status: 'REJECTED',
          adminRemarks: remarks,
          reviewedBy: req.user.id,
          reviewedAt: new Date(),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!application) {
      return res.status(409).json({
        success: false,
        message:
          'Application not found or it can no longer be rejected.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Admission application rejected.',
      application,
    });
  } catch (error) {
    return next(error);
  }
};
