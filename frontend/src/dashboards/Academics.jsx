
import React from 'react';
import {
  BookOpen,
  Clock3,
  GraduationCap,
  CalendarDays,
} from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import './DashboardPages.css';

const subjects = [
  { name: 'Mathematics', code: 'MTH', teacher: 'To be assigned', periods: 5 },
  { name: 'English Language', code: 'ENG', teacher: 'To be assigned', periods: 5 },
  { name: 'Basic Science', code: 'SCI', teacher: 'To be assigned', periods: 3 },
  { name: 'Islamic Studies', code: 'IRS', teacher: 'To be assigned', periods: 3 },
  { name: 'Social Studies', code: 'SOS', teacher: 'To be assigned', periods: 2 },
  { name: 'Computer Studies', code: 'ICT', teacher: 'To be assigned', periods: 2 },
];

export default function Academics() {


return (
  <DashboardLayout
    title="Academics"
    subtitle="Your learning journey, subjects, and weekly academic schedule."
    role="STUDENT"
  >
    <div className="academics-welcome">
      <div className="academics-welcome-content">
        <span className="academics-eyebrow">LEARN • GROW • EXCEL</span>
        <h2>Knowledge is the key to a brighter future.</h2>
        <p>
          Explore your subjects, stay organised, and make every learning
          opportunity count.
        </p>
      </div>

      <div className="academics-welcome-icon">
        <GraduationCap size={76} strokeWidth={1.3} />
      </div>
    </div>

    <div className="academics-stats">
      <article className="academics-stat-card academics-stat-blue">
        <div className="academics-stat-top">
          <span>Available Subjects</span>
          <span className="academics-stat-icon"><BookOpen size={22} /></span>
        </div>
        <h2>{subjects.length.toString().padStart(2, '0')}</h2>
        <p>Subjects in this sample list</p>
        <div className="academics-stat-progress">
          <span style={{ width: '75%' }} />
        </div>
      </article>

      <article className="academics-stat-card academics-stat-purple">
        <div className="academics-stat-top">
          <span>Weekly Periods</span>
          <span className="academics-stat-icon"><Clock3 size={22} /></span>
        </div>
        <h2>
          {subjects.reduce((total, subject) => total + subject.periods, 0)}
        </h2>
        <p>Illustrative weekly lessons</p>
        <div className="academics-stat-progress">
          <span style={{ width: '60%' }} />
        </div>
      </article>

      <article className="academics-stat-card academics-stat-green">
        <div className="academics-stat-top">
          <span>Assigned Teachers</span>
          <span className="academics-stat-icon"><GraduationCap size={22} /></span>
        </div>
        <h2>Pending</h2>
        <p>Teacher information not yet linked</p>
        <div className="academics-stat-progress">
          <span style={{ width: '25%' }} />
        </div>
      </article>
    </div>

    <section className="academics-subject-section">
      <div className="academics-section-heading">
        <div>
          <span className="academics-section-label">YOUR LEARNING</span>
          <h2>My Subjects</h2>
          <p>Explore the subjects and weekly lessons listed below.</p>
        </div>

        <div className="academics-subject-count">
          <BookOpen size={18} />
          <span>{subjects.length} subjects</span>
        </div>
      </div>

      <div className="academics-subject-list">
        {subjects.map((subject, index) => (
          <article className="academics-subject-row" key={subject.code}>
            <div className={`academics-subject-number academics-subject-color-${index % 4}`}>
              {String(index + 1).padStart(2, '0')}
            </div>

            <div className="academics-subject-details">
              <h3>{subject.name}</h3>
              <p>
                <span>{subject.code}</span>
                <span className="academics-dot">•</span>
                {subject.teacher}
              </p>
            </div>

            <div className="academics-period-badge">
              <Clock3 size={15} />
              <span>{subject.periods} periods/week</span>
            </div>
          </article>
        ))}
      </div>

      <div className="academics-information">
        <div className="academics-information-icon">
          <CalendarDays size={22} />
        </div>
        <div>
          <h3>Your academic records</h3>
          <p>
            These subjects are demonstration entries. Official subjects,
            assigned teachers, and lesson periods will appear when connected
            to your school records.
          </p>
        </div>
      </div>
    </section>
  </DashboardLayout>
);


//   return (
//     <DashboardLayout
//       title="Academics"
//       subtitle="Explore your subjects, teachers, and weekly learning schedule."
//       role="STUDENT"
//     >
//       <div className="dashboard-summary-grid">
//         <article className="dashboard-summary-card">
//           <span className="dashboard-summary-icon"><BookOpen size={21} /></span>
//           <p>Available Subjects</p>
//           <h2>{subjects.length}</h2>
//           <small>Sample subjects</small>
//         </article>

//         <article className="dashboard-summary-card">
//           <span className="dashboard-summary-icon"><Clock3 size={21} /></span>
//           <p>Weekly Periods</p>
//           <h2>{subjects.reduce((total, subject) => total + subject.periods, 0)}</h2>
//           <small>Illustrative schedule</small>
//         </article>

//         <article className="dashboard-summary-card">
//           <span className="dashboard-summary-icon"><GraduationCap size={21} /></span>
//           <p>Assigned Teachers</p>
//           <h2>Pending</h2>
//           <small>Awaiting school records</small>
//         </article>
//       </div>

//       <section className="dashboard-panel">
//         <div className="dashboard-panel-heading">
//           <div>
//             <h2>My Subjects</h2>
//             <p>Review the subjects listed for your learning programme.</p>
//           </div>
//           <CalendarDays size={22} />
//         </div>

//         <div className="dashboard-table-wrap">
//           <table className="dashboard-table">
//             <thead>
//               <tr>
//                 <th>Subject</th>
//                 <th>Code</th>
//                 <th>Teacher</th>
//                 <th>Periods / Week</th>
//               </tr>
//             </thead>
//             <tbody>
//               {subjects.map((subject) => (
//                 <tr key={subject.code}>
//                   <td><strong>{subject.name}</strong></td>
//                   <td>{subject.code}</td>
//                   <td>{subject.teacher}</td>
//                   <td>{subject.periods}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <p className="dashboard-page-note">
//           These are demonstration entries, not official student registrations.
//           Your actual subjects and teachers can be connected to the school database next.
//         </p>
//       </section>
//     </DashboardLayout>
//   );
}
