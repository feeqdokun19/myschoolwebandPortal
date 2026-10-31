import { useNavigate } from 'react-router-dom';
import React from 'react';
import {
  Users,
  ClipboardCheck,
  GraduationCap,
  BookOpen,
  FileCheck,
  BarChart3,
  ShieldCheck,
  Settings,
} from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import './DashboardPages.css';

const summaryCards = [
  {
    label: 'Admission Applications',
    value: '—',
    note: 'Applications awaiting review',
    icon: ClipboardCheck,
  },
  {
    label: 'Active Students',
    value: '—',
    note: 'Registered student accounts',
    icon: GraduationCap,
  },
  {
    label: 'Staff Accounts',
    value: '—',
    note: 'Teacher and staff accounts',
    icon: Users,
  },
  {
    label: 'Result Change Requests',
    value: '—',
    note: 'Requests awaiting approval',
    icon: FileCheck,
  },
];

const adminServices = [
  {
    title: 'Admissions Management',
    description:
      'Review applications, entrance examination outcomes and admission decisions.',
    icon: ClipboardCheck,
    path: '/admin/dashboard/admissions',
  },
  {
    title: 'User and Role Management',
    description:
      'Manage student, teacher, staff and parent accounts within your authority.',
    icon: Users,
    path: '/admin/dashboard/users',
  },
  {
    title: 'Academic Structure',
    description:
      'Manage classes, subjects, academic sessions and term configurations.',
    icon: BookOpen,
  },
  {
    title: 'Results and Approvals',
    description:
      'Review result submissions and process authorised requests to amend submitted results.',
    icon: FileCheck,
  },
  {
    title: 'School Reports',
    description:
      'Review school activity and academic reports using verified records.',
    icon: BarChart3,
  },
  {
    title: 'Portal Administration',
    description:
      'Manage school portal settings and operational configurations available to administrators.',
    icon: Settings,
  },
];

export default function AdminDashboard() {
  
  const navigate = useNavigate();
  
  return (
    
    <DashboardLayout
      title="Admin Dashboard"
      subtitle="Oversee admissions, academic operations and school portal administration."
      role="Administrator"
    >
      <section className="dashboard-welcome">
        <div>
          <span className="welcome-label">SCHOOL ADMINISTRATION</span>
          <h2>Welcome to the administration workspace</h2>
          <p>
            Coordinate school operations, review important requests and
            maintain accurate academic and administrative records.
          </p>
        </div>

        <div className="welcome-icon">
          <ShieldCheck size={42} />
        </div>
      </section>

      <section
        className="dashboard-stat-grid"
        aria-label="Administrative overview"
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
            <h2>Administration Services</h2>
            <p>
              Access administrative functions according to your assigned
              permissions.
            </p>
          </div>
        </div>

        <div className="teacher-activity-grid">
          {adminServices.map((service) => {
            const Icon = service.icon;

            return (
              <article
              className="teacher-activity-card"
              key={service.title}
              onClick={() => service.path && navigate(service.path)}
              role={service.path ? 'button' : undefined}
              tabIndex={service.path ? 0 : undefined}
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
          <h2>Audit and Result Integrity</h2>
          <p>
            Changes to submitted results should require authorised approval
            and an audit record identifying the change, the reason and the
            approving administrator. Sensitive account actions should also
            be recorded.
          </p>
        </div>
      </section>
    </DashboardLayout>
  );
}

