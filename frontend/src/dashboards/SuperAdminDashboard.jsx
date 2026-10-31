
import React from 'react';
import {
  ShieldCheck,
  Users,
  Settings,
  KeyRound,
  Activity,
  ClipboardList,
  Database,
  FileSearch,
} from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import './DashboardPages.css';

const summaryCards = [
  {
    label: 'User Accounts',
    value: '—',
    note: 'Accounts across the portal',
    icon: Users,
  },
  {
    label: 'Role Configurations',
    value: '—',
    note: 'Configured roles and permissions',
    icon: KeyRound,
  },
  {
    label: 'System Events',
    value: '—',
    note: 'Events available for review',
    icon: Activity,
  },
  {
    label: 'Security Alerts',
    value: '—',
    note: 'Alerts requiring investigation',
    icon: ShieldCheck,
  },
];

const systemServices = [
  {
    title: 'Role and Permission Governance',
    description:
      'Configure authorised access levels for administrators, staff, teachers, students and parents.',
    icon: KeyRound,
  },
  {
    title: 'System Configuration',
    description:
      'Manage global portal settings, academic configuration and approved system-wide options.',
    icon: Settings,
  },
  {
    title: 'Security Monitoring',
    description:
      'Review available security events and investigate unusual account activity.',
    icon: ShieldCheck,
  },
  {
    title: 'Audit Logs',
    description:
      'Inspect recorded administrative actions and changes to sensitive school records.',
    icon: FileSearch,
  },
  {
    title: 'System Health',
    description:
      'Review application health, service availability and operational alerts when monitoring is connected.',
    icon: Activity,
  },
  {
    title: 'Data and Backup Oversight',
    description:
      'Review backup status and data-protection procedures using connected infrastructure tools.',
    icon: Database,
  },
];

export default function SuperAdminDashboard() {
  return (
    <DashboardLayout
      title="Super Admin Dashboard"
      subtitle="Govern portal access, system configuration and security oversight."
      role="Super Administrator"
    >
      <section className="dashboard-welcome">
        <div>
          <span className="welcome-label">SYSTEM GOVERNANCE</span>
          <h2>Welcome to system administration</h2>
          <p>
            Oversee the platform's configuration, review security and
            audit information, and maintain responsible access across
            the school portal.
          </p>
        </div>

        <div className="welcome-icon">
          <ShieldCheck size={42} />
        </div>
      </section>

      <section
        className="dashboard-stat-grid"
        aria-label="System administration overview"
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
            <h2>System Administration Services</h2>
            <p>
              Platform-wide controls for authorised super administrators.
            </p>
          </div>
        </div>

        <div className="teacher-activity-grid">
          {systemServices.map((service) => {
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

      <section className="dashboard-panel teacher-policy-panel">
        <div className="teacher-policy-icon">
          <ShieldCheck size={24} />
        </div>

        <div>
          <h2>Security and Accountability</h2>
          <p>
            Privileged actions should require server-side authorisation,
            appropriate authentication, and audit logging. Sensitive
            changes should be traceable to the account that performed
            them. Super administrator access should be limited to
            trusted, authorised personnel.
          </p>
        </div>
      </section>

      <section className="dashboard-panel teacher-reminders">
        <div className="dashboard-panel-heading">
          <div>
            <h2>System Operations</h2>
            <p>Operational information will appear when monitoring services are connected.</p>
          </div>
        </div>

        <div className="teacher-reminder-row">
          <span className="teacher-reminder-icon">
            <ClipboardList size={20} />
          </span>

          <div>
            <h3>Audit review</h3>
            <p>
              Recorded administrative actions and sensitive changes
              will be available here when audit logging is implemented.
            </p>
          </div>
        </div>

        <div className="teacher-reminder-row">
          <span className="teacher-reminder-icon">
            <Activity size={20} />
          </span>

          <div>
            <h3>Service monitoring</h3>
            <p>
              Application health and security alerts will be displayed
              when connected monitoring services provide the data.
            </p>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
