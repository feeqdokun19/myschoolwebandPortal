import React from 'react';
import {
  BookOpen,
  ClipboardList,
  CalendarDays,
  Award,
  ArrowRight,
  Clock3,
  GraduationCap,
  FileText,
  Bell,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import './DashboardPages.css';

const summaryCards = [
  {
    label: 'Registered Subjects',
    value: '—',
    note: 'Subjects for the current term',
    icon: BookOpen,
  },
  {
    label: 'Pending Assignments',
    value: '—',
    note: 'Work awaiting submission',
    icon: ClipboardList,
  },
  {
    label: 'Upcoming Exams',
    value: '—',
    note: 'Your assessment schedule',
    icon: CalendarDays,
  },
  {
    label: 'Latest Average',
    value: '—',
    note: 'Published results only',
    icon: Award,
  },
];

const quickActions = [
  {
    title: 'Subject Registration',
    description: 'Choose subjects for the current term.',
    icon: BookOpen,
    to: '/student/subjects',
  },
  {
    title: 'Assignments',
    description: 'View tasks and submit your work.',
    icon: ClipboardList,
    to: '/student/assignments',
  },
  {
    title: 'Timetable',
    description: 'Keep track of classes and activities.',
    icon: CalendarDays,
    to: '/student/timetable',
  },
  {
    title: 'My Results',
    description: 'Review results released by your teachers.',
    icon: Award,
    to: '/student/results',
  },
];

export default function StudentDashboard() {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    user = null;
  }

  const displayName =
    user?.firstName ||
    user?.name ||
    user?.fullName ||
    'Student';

  return (
    <DashboardLayout
      title="Student Dashboard"
      subtitle="Your learning, activities and school updates in one place."
      role="Student"
    >
      <section className="dashboard-welcome student-welcome">
        <div className="student-welcome-content">
          <span className="welcome-label">AUD ISLAMIC SECONDARY SCHOOL</span>
          <h2>Welcome back, {displayName}!</h2>
          <p>
            Every new day is an opportunity to learn, grow and achieve.
            Keep your school activities organised and stay on track this term.
          </p>
          <div className="student-welcome-note">
            <GraduationCap size={19} />
            <span>Learn with purpose. Grow with confidence.</span>
          </div>
        </div>
        <div className="welcome-icon student-welcome-icon">
          <BookOpen size={42} />
        </div>
      </section>

      <section className="dashboard-stat-grid" aria-label="Academic summary">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <article className="dashboard-stat-card" key={card.label}>
              <div className="stat-card-top">
                <span>{card.label}</span>
                <span className="stat-card-icon">
                  <Icon size={21} />
                </span>
              </div>
              <strong className="stat-card-value">{card.value}</strong>
              <p>{card.note}</p>
            </article>
          );
        })}
      </section>

      <section className="dashboard-panel student-actions-panel">
        <div className="dashboard-panel-heading">
          <div>
            <h2>Quick actions</h2>
            <p>Go directly to the tools you need for your schoolwork.</p>
          </div>
        </div>

        <div className="student-quick-actions">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                className="student-quick-action"
                to={action.to}
                key={action.title}
              >
                <span className="student-action-icon">
                  <Icon size={22} />
                </span>
                <span className="student-action-copy">
                  <strong>{action.title}</strong>
                  <small>{action.description}</small>
                </span>
                <ArrowRight
                  className="student-action-arrow"
                  size={18}
                />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="student-lower-grid">
        <article className="dashboard-panel student-status-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h2>Academic status</h2>
              <p>Your school record at a glance.</p>
            </div>
            <span className="student-heading-icon">
              <FileText size={20} />
            </span>
          </div>

          <div className="student-status-content">
            <div className="student-status-row">
              <span>Current term</span>
              <strong>Awaiting school update</strong>
            </div>
            <div className="student-status-row">
              <span>Class</span>
              <strong>Awaiting school record</strong>
            </div>
            <div className="student-status-row">
              <span>Student number</span>
              <strong>Not available yet</strong>
            </div>
          </div>

          <p className="student-info-note">
            Your official details will appear here once they are available
            in your school record.
          </p>
        </article>

        <article className="dashboard-panel student-reminders-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h2>Stay on track</h2>
              <p>Helpful reminders for your school journey.</p>
            </div>
            <span className="student-heading-icon">
              <Bell size={20} />
            </span>
          </div>

          <div className="student-reminder-item">
            <span className="student-reminder-symbol">
              <Clock3 size={19} />
            </span>
            <div>
              <strong>Check your timetable</strong>
              <p>Review your class schedule before the school day begins.</p>
            </div>
          </div>

          <div className="student-reminder-item">
            <span className="student-reminder-symbol">
              <ClipboardList size={19} />
            </span>
            <div>
              <strong>Keep assignments up to date</strong>
              <p>Check for tasks and submit work before the deadline.</p>
            </div>
          </div>

          <div className="student-reminder-item">
            <span className="student-reminder-symbol">
              <Award size={19} />
            </span>
            <div>
              <strong>Review published results</strong>
              <p>Check your results when your teachers release them.</p>
            </div>
          </div>
        </article>
      </section>
    </DashboardLayout>
  );
}
