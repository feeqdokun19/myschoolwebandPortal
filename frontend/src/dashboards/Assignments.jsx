
import React from 'react';
import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  CalendarDays,
  ArrowUpRight,
  FileText,
} from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import './DashboardPages.css';

const initialAssignments = [
  {
    id: 1,
    title: 'Algebra and Linear Equations',
    subject: 'Mathematics',
    code: 'MTH',
    description: 'Solve the assigned algebra questions and show all working steps.',
    dueDate: '2026-11-02',
    status: 'Pending',
    type: 'Written work',
  },
  {
    id: 2,
    title: 'Essay Writing Practice',
    subject: 'English Language',
    code: 'ENG',
    description: 'Write a short essay on the importance of education in society.',
    dueDate: '2026-11-04',
    status: 'Pending',
    type: 'Essay',
  },
  {
    id: 3,
    title: 'Introduction to Living Things',
    subject: 'Basic Science',
    code: 'SCI',
    description: 'Describe five characteristics of living things with examples.',
    dueDate: '2026-10-29',
    status: 'Submitted',
    type: 'Written work',
  },
  {
    id: 4,
    title: 'Computer Hardware',
    subject: 'Computer Studies',
    code: 'ICT',
    description: 'Identify the main components of a computer system.',
    dueDate: '2026-11-06',
    status: 'Pending',
    type: 'Classwork',
  },
];

function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function Assignments() {
  const [filter, setFilter] = React.useState('All');
  const [selectedAssignment, setSelectedAssignment] = React.useState(null);

  const assignments = initialAssignments.filter((assignment) => {
    if (filter === 'All') return true;
    return assignment.status === filter;
  });

  const pendingCount = initialAssignments.filter(
    (assignment) => assignment.status === 'Pending'
  ).length;

  const submittedCount = initialAssignments.filter(
    (assignment) => assignment.status === 'Submitted'
  ).length;

  const overdueCount = initialAssignments.filter(
    (assignment) =>
      assignment.status === 'Pending' &&
      new Date(`${assignment.dueDate}T23:59:59`) < new Date()
  ).length;

  return (
    <DashboardLayout
      title="Assignments"
      subtitle="Keep track of your classwork, homework, and submission deadlines."
      role="STUDENT"
    >
      <div className="academics-welcome assignments-welcome">
        <div className="academics-welcome-content">
          <span className="academics-eyebrow">STAY FOCUSED • STAY ON TRACK</span>
          <h2>Every completed task brings you closer to success.</h2>
          <p>Review your work, keep an eye on deadlines, and stay organised throughout the term.</p>
        </div>
        <div className="academics-welcome-icon">
          <ClipboardList size={70} strokeWidth={1.3} />
        </div>
      </div>

      <div className="academics-stats">
        <article className="academics-stat-card academics-stat-blue">
          <div className="academics-stat-top">
            <span>Awaiting Submission</span>
            <span className="academics-stat-icon"><Clock3 size={22} /></span>
          </div>
          <h2>{pendingCount.toString().padStart(2, '0')}</h2>
          <p>Assignments to complete</p>
          <div className="academics-stat-progress"><span style={{ width: `${(pendingCount / initialAssignments.length) * 100}%` }} /></div>
        </article>

        <article className="academics-stat-card academics-stat-purple">
          <div className="academics-stat-top">
            <span>Submitted</span>
            <span className="academics-stat-icon"><CheckCircle2 size={22} /></span>
          </div>
          <h2>{submittedCount.toString().padStart(2, '0')}</h2>
          <p>Work marked as submitted</p>
          <div className="academics-stat-progress"><span style={{ width: `${(submittedCount / initialAssignments.length) * 100}%` }} /></div>
        </article>

        <article className="academics-stat-card academics-stat-green">
          <div className="academics-stat-top">
            <span>Overdue</span>
            <span className="academics-stat-icon"><AlertCircle size={22} /></span>
          </div>
          <h2>{overdueCount.toString().padStart(2, '0')}</h2>
          <p>Pending past the deadline</p>
          <div className="academics-stat-progress"><span style={{ width: `${(overdueCount / initialAssignments.length) * 100}%` }} /></div>
        </article>
      </div>

      <section className="academics-subject-section assignments-section">
        <div className="academics-section-heading">
          <div>
            <span className="academics-section-label">YOUR CLASSWORK</span>
            <h2>My Assignments</h2>
            <p>View task instructions and check your submission status.</p>
          </div>
          <div className="academics-subject-count">
            <FileText size={17} />
            {initialAssignments.length} tasks
          </div>
        </div>

        <div className="assignments-filter" aria-label="Filter assignments">
          {['All', 'Pending', 'Submitted'].map((item) => (
            <button
              type="button"
              key={item}
              className={`assignments-filter-button ${filter === item ? 'is-active' : ''}`}
              onClick={() => setFilter(item)}
            >
              {item}
              <span>
                {item === 'All'
                  ? initialAssignments.length
                  : initialAssignments.filter((assignment) => assignment.status === item).length}
              </span>
            </button>
          ))}
        </div>

        <div className="assignments-list">
          {assignments.map((assignment) => {
            const isOverdue =
              assignment.status === 'Pending' &&
              new Date(`${assignment.dueDate}T23:59:59`) < new Date();

            return (
              <article className="assignment-card" key={assignment.id}>
                <div className="assignment-card-icon">
                  <BookOpen size={22} />
                </div>

                <div className="assignment-card-main">
                  <div className="assignment-card-meta">
                    <span>{assignment.code}</span>
                    <span className="academics-dot">•</span>
                    <span>{assignment.subject}</span>
                  </div>

                  <h3>{assignment.title}</h3>
                  <p>{assignment.description}</p>

                  <div className="assignment-card-footer">
                    <span><CalendarDays size={15} /> Due {formatDate(assignment.dueDate)}</span>
                    <span><FileText size={15} /> {assignment.type}</span>
                  </div>
                </div>

                <div className="assignment-card-actions">
                  <span className={`assignment-status ${assignment.status.toLowerCase()} ${isOverdue ? 'overdue' : ''}`}>
                    {isOverdue ? 'Overdue' : assignment.status}
                  </span>

                  <button
                    type="button"
                    className="assignment-view-button"
                    onClick={() => setSelectedAssignment(assignment)}
                  >
                    View details <ArrowUpRight size={15} />
                  </button>
                </div>
              </article>
            );
          })}

          {assignments.length === 0 && (
            <div className="assignments-empty">
              <ClipboardList size={34} />
              <h3>No assignments in this category</h3>
              <p>Try selecting another filter to view your tasks.</p>
            </div>
          )}
        </div>

        <div className="academics-information">
          <div className="academics-information-icon"><AlertCircle size={22} /></div>
          <div>
            <h3>Assignment records</h3>
            <p>These are sample assignments for the interface preview. Teacher-posted tasks, file uploads, submissions, and marking will need to be connected to the school system.</p>
          </div>
        </div>
      </section>

      {selectedAssignment && (
        <div className="assignment-modal-backdrop" onClick={() => setSelectedAssignment(null)}>
          <section
            className="assignment-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="assignment-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="assignment-modal-close"
              onClick={() => setSelectedAssignment(null)}
              aria-label="Close assignment details"
            >
              ×
            </button>

            <span className="academics-section-label">ASSIGNMENT DETAILS</span>
            <h2 id="assignment-modal-title">{selectedAssignment.title}</h2>
            <p className="assignment-modal-subject">
              {selectedAssignment.subject} · {selectedAssignment.type}
            </p>

            <div className="assignment-modal-info">
              <span>Due date</span>
              <strong>{formatDate(selectedAssignment.dueDate)}</strong>
              <span>Current status</span>
              <strong>{selectedAssignment.status}</strong>
            </div>

            <h3>Instructions</h3>
            <p>{selectedAssignment.description}</p>

            <p className="assignment-modal-note">
              Online submission will be enabled when assignment services are connected.
            </p>

            <button
              type="button"
              className="assignment-view-button assignment-modal-done"
              onClick={() => setSelectedAssignment(null)}
            >
              Close details
            </button>
          </section>
        </div>
      )}
    </DashboardLayout>
  );
}

