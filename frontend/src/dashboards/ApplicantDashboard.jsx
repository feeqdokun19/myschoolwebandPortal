
import React from 'react';
import {
  FileText,
  ClipboardCheck,
  GraduationCap,
  Clock3,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  CalendarDays,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import './DashboardPages.css';

const API_URL = 'http://localhost:3000/api';

const statusDetails = {
  DRAFT: {
    label: 'Draft',
    description: 'Your application has not been submitted yet.',
  },
  SUBMITTED: {
    label: 'Submitted',
    description: 'Your application has been received by the school.',
  },
  UNDER_REVIEW: {
    label: 'Under review',
    description: 'The admissions team is reviewing your application.',
  },
  APPROVED: {
    label: 'Approved',
    description: 'Congratulations! Your admission has been approved.',
  },
  REJECTED: {
    label: 'Decision issued',
    description: 'Please review the admission decision and any remarks.',
  },
};

function formatDate(value) {
  if (!value) return 'Not available';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return 'Not available';

  return date.toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function ApplicantDashboard() {
  const [application, setApplication] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  const loadApplication = React.useCallback(async () => {
    setLoading(true);
    setError('');

    const token = localStorage.getItem('accessToken');

    if (!token) {
      setError('Please sign in again to view your admission progress.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/admissions/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || 'Unable to load your admission application.'
        );
      }

      setApplication(result.application || null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to connect to the admissions service.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadApplication();
  }, [loadApplication]);

  let user = {};

  try {
    user = JSON.parse(localStorage.getItem('user') || '{}');
  } catch {
    user = {};
  }

  const details = application?.personalDetails || {};
  const exam = application?.entranceExam || {};
  const status = statusDetails[application?.status] || {
    label: application?.status || 'Not submitted',
    description: 'Check this page for updates to your application.',
  };

  const applicantName =
    [details.firstName, details.lastName].filter(Boolean).join(' ') ||
    user.firstName ||
    user.name ||
    user.email ||
    'Applicant';

  const examStatus = {
    NOT_STARTED: 'Not started',
    IN_PROGRESS: 'In progress',
    SUBMITTED: 'Submitted for marking',
    MARKED: 'Marked',
  }[exam.status] || 'Awaiting application';

  return (
    <DashboardLayout
      title="Applicant Dashboard"
      subtitle="Track your admission application and next steps."
      role="APPLICANT"
    >
      <section className="dashboard-welcome student-welcome">
        <div className="student-welcome-content">
          <span className="dashboard-welcome-label">
            AUD ADMISSIONS PORTAL
          </span>
          <h2>Welcome, {applicantName}!</h2>
          <p>
            Follow your admission journey and check for updates from
            AUD Islamic Secondary School.
          </p>
          <div className="student-welcome-note">
            <ShieldCheck size={18} />
            Keep your account details secure.
          </div>
        </div>
        <div className="student-welcome-icon">
          <GraduationCap size={54} />
        </div>
      </section>

      {loading && (
        <section className="dashboard-panel">
          <div className="dashboard-empty-state">
            <RefreshCw size={28} />
            <h3>Loading your application</h3>
            <p>Please wait while we retrieve your admission information.</p>
          </div>
        </section>
      )}

      {!loading && error && (
        <section className="dashboard-panel">
          <div className="dashboard-empty-state">
            <AlertCircle size={32} />
            <h3>Unable to load your application</h3>
            <p>{error}</p>
            <button
              type="button"
              className="admission-submit"
              onClick={loadApplication}
            >
              <RefreshCw size={17} />
              Try again
            </button>
          </div>
        </section>
      )}

      {!loading && !error && !application && (
        <section className="dashboard-panel">
          <div className="dashboard-empty-state">
            <FileText size={36} />
            <h3>No application found</h3>
            <p>
              You have signed in successfully, but no admission application
              is linked to this account yet.
            </p>
            <Link className="home-button home-button-green" to="/admission">
              Start application <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      )}

      {!loading && !error && application && (
        <>
          <div className="dashboard-stat-grid">
            <article className="dashboard-stat-card">
              <div className="dashboard-stat-icon">
                <FileText size={21} />
              </div>
              <p>Application status</p>
              <h3>{status.label}</h3>
              <small>{status.description}</small>
            </article>

            <article className="dashboard-stat-card">
              <div className="dashboard-stat-icon">
                <GraduationCap size={21} />
              </div>
              <p>Requested class</p>
              <h3>{application.requestedClass || 'Not available'}</h3>
              <small>Your selected entry class</small>
            </article>

            <article className="dashboard-stat-card">
              <div className="dashboard-stat-icon">
                <ClipboardCheck size={21} />
              </div>
              <p>Entrance examination</p>
              <h3>{examStatus}</h3>
              <small>
                {exam.status === 'MARKED' &&
                Number.isFinite(exam.score)
                  ? `Score: ${exam.score}/100`
                  : 'Check for examination instructions'}
              </small>
            </article>

            <article className="dashboard-stat-card">
              <div className="dashboard-stat-icon">
                <CalendarDays size={21} />
              </div>
              <p>Submitted on</p>
              <h3 className="applicant-date-value">
                {formatDate(application.submittedAt)}
              </h3>
              <small>Application submission date</small>
            </article>
          </div>

          <div className="student-lower-grid">
            <section className="dashboard-panel student-status-panel">
              <div className="dashboard-panel-heading">
                <div>
                  <h3>Application details</h3>
                  <p>Your admission record</p>
                </div>
                <span className="student-heading-icon">
                  <FileText size={20} />
                </span>
              </div>

              <div className="student-status-content">
                <div className="student-status-row">
                  <span>Applicant name</span>
                  <strong>{applicantName}</strong>
                </div>
                <div className="student-status-row">
                  <span>Application reference</span>
                  <strong>{application.applicationNumber || 'Not assigned'}</strong>
                </div>
                <div className="student-status-row">
                  <span>Email address</span>
                  <strong>{application.applicant?.email || user.email || 'Not available'}</strong>
                </div>
                <div className="student-status-row">
                  <span>Requested class</span>
                  <strong>{application.requestedClass || 'Not available'}</strong>
                </div>
                <div className="student-status-row">
                  <span>Last updated</span>
                  <strong>{formatDate(application.updatedAt)}</strong>
                </div>
              </div>
            </section>

            <section className="dashboard-panel student-reminders-panel">
              <div className="dashboard-panel-heading">
                <div>
                  <h3>Next steps</h3>
                  <p>What to expect</p>
                </div>
                <span className="student-heading-icon">
                  <Clock3 size={20} />
                </span>
              </div>

              <div className="student-reminder-item">
                <span className="student-reminder-symbol">
                  <CheckCircle2 size={19} />
                </span>
                <div>
                  <strong>Application received</strong>
                  <p>
                    {application.submittedAt
                      ? `Submitted on ${formatDate(application.submittedAt)}.`
                      : 'Your application submission date is not available.'}
                  </p>
                </div>
              </div>

              <div className="student-reminder-item">
                <span className="student-reminder-symbol">
                  <ClipboardCheck size={19} />
                </span>
                <div>
                  <strong>Entrance examination</strong>
                  <p>
                    {exam.status === 'MARKED'
                      ? 'Your examination has been marked.'
                      : 'Check with the school for examination instructions and scheduling.'}
                  </p>
                </div>
              </div>

              <div className="student-reminder-item">
                <span className="student-reminder-symbol">
                  <GraduationCap size={19} />
                </span>
                <div>
                  <strong>Admission decision</strong>
                  <p>{status.description}</p>
                </div>
              </div>

              {application.adminRemarks && (
                <div className="applicant-admin-remarks">
                  <strong>School remarks</strong>
                  <p>{application.adminRemarks}</p>
                </div>
              )}
            </section>
          </div>

          {application.status === 'APPROVED' && (
            <section className="dashboard-panel applicant-success-panel">
              <CheckCircle2 size={26} />
              <div>
                <h3>Admission approved</h3>
                <p>
                  Your admission has been approved. Sign in again if the
                  school has activated your student account.
                </p>
              </div>
            </section>
          )}

          {application.status === 'REJECTED' && (
            <section className="dashboard-panel applicant-decision-panel">
              <AlertCircle size={26} />
              <div>
                <h3>Admission decision</h3>
                <p>
                  Review the school remarks above and contact the admissions
                  office if you need clarification.
                </p>
              </div>
            </section>
          )}
        </>
      )}
    </DashboardLayout>
  );
}
