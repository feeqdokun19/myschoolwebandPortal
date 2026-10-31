
import React from 'react';
import {
  Users,
  BookOpen,
  ClipboardCheck,
  FileCheck,
  CalendarCheck,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import './DashboardPages.css';

const summaryCards = [
  {
    label: 'My Classes',
    value: '—',
    note: 'Classes assigned to you',
    icon: Users,
  },
  {
    label: 'My Subjects',
    value: '—',
    note: 'Assigned teaching subjects',
    icon: BookOpen,
  },
  {
    label: 'To Be Marked',
    value: '—',
    note: 'Submissions awaiting marking',
    icon: ClipboardCheck,
  },
  {
    label: 'Results to Review',
    value: '—',
    note: 'Results requiring attention',
    icon: FileCheck,
  },
];

const teacherActivities = [
  {
    title: 'Class Management',
    description:
      'View your assigned classes and access student class lists.',
    icon: Users,
  },
  {
    title: 'Assignments and Marking',
    description:
      'Review student submissions, provide feedback and record marks.',
    icon: ClipboardCheck,
  },
  {
    title: 'Attendance Register',
    description:
      'Record and review attendance for your assigned classes.',
    icon: CalendarCheck,
  },
  {
    title: 'Results Management',
    description:
      'Prepare assessment results and submit them according to school policy.',
    icon: FileCheck,
  },
];

export default function TeacherDashboard() {
  return (
    <DashboardLayout
      title="Teacher Dashboard"
      subtitle="Manage your classes, assessments and academic responsibilities."
      role="Teacher"
    >
      <section className="dashboard-welcome">
        <div>
          <span className="welcome-label">TEACHING AND LEARNING</span>
          <h2>Welcome to your teaching workspace</h2>
          <p>
            Organise your teaching activities, support your students and
            keep academic records up to date throughout the term.
          </p>
        </div>

        <div className="welcome-icon">
          <BookOpen size={42} />
        </div>
      </section>

      <section
        className="dashboard-stat-grid"
        aria-label="Teaching summary"
      >
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

      <section className="dashboard-panel teacher-activities">
        <div className="dashboard-panel-heading">
          <div>
            <h2>Your Teaching Activities</h2>
            <p>
              Access the main tools for your academic responsibilities.
            </p>
          </div>
        </div>

        <div className="teacher-activity-grid">
          {teacherActivities.map((activity) => {
            const Icon = activity.icon;

            return (
              <article
                className="teacher-activity-card"
                key={activity.title}
              >
                <div className="teacher-activity-icon">
                  <Icon size={22} />
                </div>

                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="dashboard-panel teacher-policy-panel">
        <div className="teacher-policy-icon">
          <ShieldCheck size={24} />
        </div>

        <div>
          <h2>Academic Records Protection</h2>
          <p>
            Submitted results must follow the school's approval process.
            Changes to previously submitted results should be recorded
            and approved by an authorised administrator.
          </p>
        </div>
      </section>

      <section className="dashboard-panel teacher-reminders">
        <div className="dashboard-panel-heading">
          <div>
            <h2>Teaching Reminders</h2>
            <p>Keep track of important academic responsibilities.</p>
          </div>
        </div>

        <div className="teacher-reminder-row">
          <span className="teacher-reminder-icon">
            <Clock size={20} />
          </span>
          <div>
            <h3>Assessment deadlines</h3>
            <p>
              Assignment deadlines and marking schedules will appear
              here when connected to school records.
            </p>
          </div>
        </div>

        <div className="teacher-reminder-row">
          <span className="teacher-reminder-icon">
            <ShieldCheck size={20} />
          </span>
          <div>
            <h3>Result submission policy</h3>
            <p>
              Check submitted results carefully before final submission.
              Post-submission edits will require the configured approval
              workflow.
            </p>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

