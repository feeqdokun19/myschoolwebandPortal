
import React from 'react';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  FileText,
  Bell,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import './DashboardPages.css';

const summaryCards = [
  {
    label: 'Linked Children',
    value: '—',
    note: 'Children linked to your account',
    icon: Users,
  },
  {
    label: 'Attendance',
    value: '—',
    note: 'Attendance records available',
    icon: CalendarCheck,
  },
  {
    label: 'Published Results',
    value: '—',
    note: 'Results released by the school',
    icon: FileText,
  },
  {
    label: 'School Updates',
    value: '—',
    note: 'Announcements for your attention',
    icon: Bell,
  },
];

const parentServices = [
  {
    title: 'Academic Progress',
    description:
      'Review your child’s published results and follow academic progress.',
    icon: GraduationCap,
  },
  {
    title: 'Attendance Records',
    description:
      'View available attendance records and monitor school participation.',
    icon: CalendarCheck,
  },
  {
    title: 'School Announcements',
    description:
      'Stay informed about school notices, events and important dates.',
    icon: Bell,
  },
  {
    title: 'School Communication',
    description:
      'Access authorised communication channels for parent enquiries.',
    icon: MessageSquare,
  },
];

export default function ParentDashboard() {
  return (
    <DashboardLayout
      title="Parent Dashboard"
      subtitle="Stay connected with your child's education and school life."
      role="Parent"
    >
      <section className="dashboard-welcome">
        <div>
          <span className="welcome-label">FAMILY AND SCHOOL PARTNERSHIP</span>
          <h2>Welcome to your parent portal</h2>
          <p>
            Follow your child's learning journey, stay informed about
            school activities and work together with the school to
            support academic success.
          </p>
        </div>

        <div className="welcome-icon">
          <GraduationCap size={42} />
        </div>
      </section>

      <section
        className="dashboard-stat-grid"
        aria-label="Parent overview"
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

      <section className="dashboard-panel">
        <div className="dashboard-panel-heading">
          <div>
            <h2>Family and School Services</h2>
            <p>
              Access your child's school information and available
              parent services.
            </p>
          </div>
        </div>

        <div className="teacher-activity-grid">
          {parentServices.map((service) => {
            const Icon = service.icon;

            return (
              <article
                className="teacher-activity-card"
                key={service.title}
              >
                <div className="teacher-activity-icon">
                  <Icon size={22} />
                </div>

                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="dashboard-panel teacher-reminders">
        <div className="dashboard-panel-heading">
          <div>
            <h2>School Updates</h2>
            <p>Important information from the school.</p>
          </div>
        </div>

        <div className="dashboard-empty-state">
          <div className="empty-state-icon">
            <Bell size={25} />
          </div>
          <h3>No updates to display yet</h3>
          <p>
            School announcements, event reminders and parent notices
            will appear here when the notification service is connected.
          </p>
        </div>
      </section>

      <section className="dashboard-panel teacher-policy-panel">
        <div className="teacher-policy-icon">
          <ShieldCheck size={24} />
        </div>

        <div>
          <h2>Your Child's Privacy</h2>
          <p>
            Parent accounts should only display information for children
            formally linked to the account. Academic records and personal
            information must remain protected.
          </p>
        </div>
      </section>
    </DashboardLayout>
  );
}

