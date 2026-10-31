
import React from 'react';
import {
  CalendarDays,
  Clock3,
  BookOpen,
  MapPin,
  Coffee,
} from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import './DashboardPages.css';

const timetable = [
  {
    day: 'Monday',
    date: 'MON',
    lessons: [
      { time: '08:00 - 08:40', subject: 'Mathematics', room: 'Classroom', color: 'blue' },
      { time: '08:40 - 09:20', subject: 'English Language', room: 'Classroom', color: 'purple' },
      { time: '09:20 - 10:00', subject: 'Basic Science', room: 'Laboratory', color: 'green' },
      { time: '10:00 - 10:30', subject: 'Break Time', room: 'School grounds', color: 'break', isBreak: true },
      { time: '10:30 - 11:10', subject: 'Islamic Studies', room: 'Classroom', color: 'orange' },
      { time: '11:10 - 11:50', subject: 'Computer Studies', room: 'Computer Lab', color: 'blue' },
    ],
  },
  {
    day: 'Tuesday',
    date: 'TUE',
    lessons: [
      { time: '08:00 - 08:40', subject: 'English Language', room: 'Classroom', color: 'purple' },
      { time: '08:40 - 09:20', subject: 'Mathematics', room: 'Classroom', color: 'blue' },
      { time: '09:20 - 10:00', subject: 'Social Studies', room: 'Classroom', color: 'orange' },
      { time: '10:00 - 10:30', subject: 'Break Time', room: 'School grounds', color: 'break', isBreak: true },
      { time: '10:30 - 11:10', subject: 'Basic Science', room: 'Laboratory', color: 'green' },
      { time: '11:10 - 11:50', subject: 'Islamic Studies', room: 'Classroom', color: 'orange' },
    ],
  },
  {
    day: 'Wednesday',
    date: 'WED',
    lessons: [
      { time: '08:00 - 08:40', subject: 'Basic Science', room: 'Laboratory', color: 'green' },
      { time: '08:40 - 09:20', subject: 'Computer Studies', room: 'Computer Lab', color: 'blue' },
      { time: '09:20 - 10:00', subject: 'Mathematics', room: 'Classroom', color: 'blue' },
      { time: '10:00 - 10:30', subject: 'Break Time', room: 'School grounds', color: 'break', isBreak: true },
      { time: '10:30 - 11:10', subject: 'English Language', room: 'Classroom', color: 'purple' },
      { time: '11:10 - 11:50', subject: 'Social Studies', room: 'Classroom', color: 'orange' },
    ],
  },
  {
    day: 'Thursday',
    date: 'THU',
    lessons: [
      { time: '08:00 - 08:40', subject: 'Islamic Studies', room: 'Classroom', color: 'orange' },
      { time: '08:40 - 09:20', subject: 'Mathematics', room: 'Classroom', color: 'blue' },
      { time: '09:20 - 10:00', subject: 'English Language', room: 'Classroom', color: 'purple' },
      { time: '10:00 - 10:30', subject: 'Break Time', room: 'School grounds', color: 'break', isBreak: true },
      { time: '10:30 - 11:10', subject: 'Computer Studies', room: 'Computer Lab', color: 'blue' },
      { time: '11:10 - 11:50', subject: 'Basic Science', room: 'Laboratory', color: 'green' },
    ],
  },
  {
    day: 'Friday',
    date: 'FRI',
    lessons: [
      { time: '08:00 - 08:40', subject: 'Mathematics', room: 'Classroom', color: 'blue' },
      { time: '08:40 - 09:20', subject: 'Social Studies', room: 'Classroom', color: 'orange' },
      { time: '09:20 - 10:00', subject: 'English Language', room: 'Classroom', color: 'purple' },
      { time: '10:00 - 10:30', subject: 'Break Time', room: 'School grounds', color: 'break', isBreak: true },
      { time: '10:30 - 11:10', subject: 'Islamic Studies', room: 'Classroom', color: 'orange' },
      { time: '11:10 - 11:50', subject: 'Weekly Review', room: 'Classroom', color: 'green' },
    ],
  },
];

export default function Timetable() {
  const [selectedDay, setSelectedDay] = React.useState('Monday');
  const activeDay = timetable.find((day) => day.day === selectedDay) || timetable[0];
  const lessonCount = activeDay.lessons.filter((lesson) => !lesson.isBreak).length;

  return (
    <DashboardLayout
      title="Timetable"
      subtitle="Plan your school week and know what lesson comes next."
      role="STUDENT"
    >
      <div className="academics-welcome timetable-welcome">
        <div className="academics-welcome-content">
          <span className="academics-eyebrow">PLAN • PREPARE • PROGRESS</span>
          <h2>Your time, organised for success.</h2>
          <p>Keep track of lessons, classroom locations, and breaks throughout your school day.</p>
        </div>
        <div className="academics-welcome-icon">
          <CalendarDays size={70} strokeWidth={1.3} />
        </div>
      </div>

      <div className="academics-stats">
        <article className="academics-stat-card academics-stat-blue">
          <div className="academics-stat-top">
            <span>School Days</span>
            <span className="academics-stat-icon"><CalendarDays size={22} /></span>
          </div>
          <h2>05</h2>
          <p>Monday to Friday</p>
          <div className="academics-stat-progress"><span style={{ width: '100%' }} /></div>
        </article>

        <article className="academics-stat-card academics-stat-purple">
          <div className="academics-stat-top">
            <span>Lessons Today</span>
            <span className="academics-stat-icon"><BookOpen size={22} /></span>
          </div>
          <h2>{lessonCount}</h2>
          <p>For {activeDay.day}</p>
          <div className="academics-stat-progress"><span style={{ width: `${(lessonCount / 6) * 100}%` }} /></div>
        </article>

        <article className="academics-stat-card academics-stat-green">
          <div className="academics-stat-top">
            <span>First Lesson</span>
            <span className="academics-stat-icon"><Clock3 size={22} /></span>
          </div>
          <h2>08:00</h2>
          <p>Illustrative start time</p>
          <div className="academics-stat-progress"><span style={{ width: '50%' }} /></div>
        </article>
      </div>

      <section className="academics-subject-section timetable-section">
        <div className="academics-section-heading">
          <div>
            <span className="academics-section-label">WEEKLY PLANNER</span>
            <h2>My Class Timetable</h2>
            <p>Select a day to view its lesson schedule.</p>
          </div>
        </div>

        <div className="timetable-day-picker">
          {timetable.map((day) => (
            <button
              type="button"
              key={day.day}
              className={`timetable-day-button ${selectedDay === day.day ? 'is-selected' : ''}`}
              onClick={() => setSelectedDay(day.day)}
            >
              <span>{day.date}</span>
              <strong>{day.day}</strong>
            </button>
          ))}
        </div>

        <div className="timetable-day-heading">
          <div>
            <span className="academics-section-label">DAILY SCHEDULE</span>
            <h3>{activeDay.day}</h3>
          </div>
          <span className="academics-subject-count">{lessonCount} lessons</span>
        </div>

        <div className="timetable-lessons">
          {activeDay.lessons.map((lesson, index) => (
            <article
              key={`${activeDay.day}-${lesson.time}`}
              className={`timetable-lesson ${lesson.isBreak ? 'timetable-break' : ''}`}
            >
              <div className="timetable-time">
                <Clock3 size={15} />
                <span>{lesson.time}</span>
              </div>

              <div className={`timetable-lesson-marker timetable-marker-${lesson.color}`} />

              <div className="timetable-lesson-info">
                <h4>{lesson.subject}</h4>
                <p>
                  {lesson.isBreak ? <Coffee size={14} /> : <MapPin size={14} />}
                  <span>{lesson.room}</span>
                </p>
              </div>

              <span className={`timetable-lesson-tag timetable-tag-${lesson.color}`}>
                {lesson.isBreak ? 'BREAK' : `PERIOD ${index + 1}`}
              </span>
            </article>
          ))}
        </div>

        <div className="academics-information">
          <div className="academics-information-icon"><CalendarDays size={22} /></div>
          <div>
            <h3>Timetable information</h3>
            <p>This is a demonstration timetable. Official lesson times, subjects, and classroom assignments should be supplied by the school administration.</p>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
