
import React from 'react';
import {
  ClipboardList,
  UserRoundSearch,
  FolderOpen,
  Wallet,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import './DashboardPages.css';

const summaryCards = [
  {
    label: 'Pending Tasks',
    value: '—',
    note: 'Tasks awaiting action',
    icon: ClipboardList,
  },
  {
    label: 'Student Records',
    value: '—',
    note: 'Records available to you',
    icon: FolderOpen,
  },
  {
    label: 'Admission Reviews',
    value: '—',
    note: 'Applications assigned to you',
    icon: UserRoundSearch,
  },
  {
    label: 'Pending Documents',
    value: '—',
    note: 'Documents needing attention',
    icon: FileText,
  },
];

const staffServices = [
  {
    title: 'Admissions Support',
    description:
      'Review assigned admission applications and check submitted documents.',
    icon: UserRoundSearch,
  },
  {
    title: 'Student Records',
    description:
      'Access and maintain student records according to your permissions.',
    icon: FolderOpen,
  },
  {
    title: 'Administrative Tasks',
    description:
      'Manage assigned school operations and follow up on pending tasks.',
    icon: ClipboardList,
  },
  {
    title: 'Bursary and Payments',
    description:
      'Access authorised fee and payment records where your role permits.',
    icon: Wallet,
  },
];

export default function StaffDashboard() {
  return (
    <DashboardLayout
      title="Staff Dashboard"
      subtitle="Manage your assigned duties and support daily school operations."
      role="Staff"
    >
      <section className="dashboard-welcome">
        <div>
          <span className="welcome-label">SCHOOL OPERATIONS</span>
          <h2>Welcome to your staff workspace</h2>
          <p>
            Access your assigned tasks, support school administration
            and help keep daily operations running smoothly.
          </p>
        </div>

        <div className="welcome-icon">
          <ClipboardList size={42} />
        </div>
      </section>

      <section
        className="dashboard-stat-grid"
        aria-label="Staff work summary"
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
            <h2>Staff Services</h2>
            <p>
              Your available services will depend on your assigned
              department and permissions.
            </p>
          </div>
        </div>

        <div className="teacher-activity-grid">
          {staffServices.map((service) => {
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
          <h2>Responsible Access to School Records</h2>
          <p>
            Student information, financial records and admission documents
            must be handled confidentially. Access and changes should be
            limited to the duties authorised for your staff account.
          </p>
        </div>
      </section>
    </DashboardLayout>
  );
}

