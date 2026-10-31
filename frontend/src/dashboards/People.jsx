
import React, { useMemo, useState } from 'react';
import {
  Users,
  Search,
  GraduationCap,
  BookOpen,
  Mail,
  Phone,
  X,
  UserRound,
  Info,
} from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import './DashboardPages.css';

const samplePeople = [
  {
    name: 'Amina Yusuf',
    role: 'Teacher',
    subject: 'Mathematics',
    className: 'SS 1',
    email: 'amina.yusuf@example.com',
    phone: 'Not provided',
  },
  {
    name: 'Ibrahim Bello',
    role: 'Teacher',
    subject: 'English Language',
    className: 'SS 1',
    email: 'ibrahim.bello@example.com',
    phone: 'Not provided',
  },
  {
    name: 'Fatimah Sule',
    role: 'Teacher',
    subject: 'Basic Science',
    className: 'SS 1',
    email: 'fatimah.sule@example.com',
    phone: 'Not provided',
  },
  {
    name: 'School Administrator',
    role: 'Staff',
    subject: 'Administration',
    className: 'School Office',
    email: 'admin@example.com',
    phone: 'Not provided',
  },
];

function People() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedPerson, setSelectedPerson] = useState(null);

  const filteredPeople = useMemo(() => {
    const term = search.trim().toLowerCase();

    return samplePeople.filter((person) => {
      const matchesRole =
        roleFilter === 'All' || person.role === roleFilter;

      const matchesSearch =
        !term ||
        person.name.toLowerCase().includes(term) ||
        person.subject.toLowerCase().includes(term) ||
        person.className.toLowerCase().includes(term);

      return matchesRole && matchesSearch;
    });
  }, [search, roleFilter]);

  return (
    <DashboardLayout role="STUDENT">
      <div className="people-page">
        <section className="academics-welcome">
          <div>
            <span className="academics-eyebrow">YOUR SCHOOL COMMUNITY</span>
            <h1>People</h1>
            <p>Find your teachers and school contacts in one place.</p>
          </div>
          <div className="academics-welcome-icon">
            <Users size={32} />
          </div>
        </section>

        <section className="academics-stats">
          <article className="academics-stat-card">
            <div className="academics-stat-icon">
              <Users size={21} />
            </div>
            <span>Directory entries</span>
            <strong>{samplePeople.length}</strong>
            <small>Sample directory data</small>
          </article>
          <article className="academics-stat-card">
            <div className="academics-stat-icon">
              <GraduationCap size={21} />
            </div>
            <span>Teachers</span>
            <strong>
              {samplePeople.filter((person) => person.role === 'Teacher').length}
            </strong>
            <small>Shown in this preview</small>
          </article>
          <article className="academics-stat-card">
            <div className="academics-stat-icon">
              <BookOpen size={21} />
            </div>
            <span>Subjects</span>
            <strong>
              {new Set(
                samplePeople
                  .filter((person) => person.role === 'Teacher')
                  .map((person) => person.subject)
              ).size}
            </strong>
            <small>Represented in this preview</small>
          </article>
        </section>

        <section className="people-directory">
          <div className="people-directory-header">
            <div>
              <h2>School Directory</h2>
              <p>Search the sample directory by name, subject, or class.</p>
            </div>
            <label className="people-search">
              <Search size={18} />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search people..."
                aria-label="Search people"
              />
            </label>
          </div>

          <div className="people-filters">
            {['All', 'Teacher', 'Staff'].map((role) => (
              <button
                key={role}
                type="button"
                className={`people-filter-button ${roleFilter === role ? 'active' : ''}`}
                onClick={() => setRoleFilter(role)}
              >
                {role === 'All' ? 'Everyone' : role}
              </button>
            ))}
          </div>

          <div className="people-grid">
            {filteredPeople.map((person) => (
              <article className="people-card" key={person.email}>
                <div className="people-avatar">
                  <UserRound size={27} />
                </div>
                <div className="people-card-content">
                  <span className="people-role">{person.role}</span>
                  <h3>{person.name}</h3>
                  <p>{person.subject}</p>
                  <div className="people-class">
                    <GraduationCap size={15} />
                    <span>{person.className}</span>
                  </div>
                  <button
                    type="button"
                    className="people-view-button"
                    onClick={() => setSelectedPerson(person)}
                  >
                    View contact
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredPeople.length === 0 && (
            <div className="assignments-empty">
              <Search size={28} />
              <h3>No people found</h3>
              <p>Try another name, subject, class, or role filter.</p>
            </div>
          )}

          <div className="people-sample-notice">
            <Info size={18} />
            <span>
              This is demonstration data. Real staff profiles and contact
              details should come from the school directory.
            </span>
          </div>
        </section>

        {selectedPerson && (
          <div
            className="assignment-modal-backdrop"
            onClick={() => setSelectedPerson(null)}
          >
            <section
              className="assignment-modal"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="people-modal-title"
            >
              <button
                className="assignment-modal-close"
                onClick={() => setSelectedPerson(null)}
                aria-label="Close contact details"
              >
                <X size={20} />
              </button>

              <div className="people-modal-avatar">
                <UserRound size={30} />
              </div>
              <h2 id="people-modal-title">{selectedPerson.name}</h2>
              <p>{selectedPerson.role} · {selectedPerson.subject}</p>

              <div className="assignment-modal-info">
                <div>
                  <GraduationCap size={17} />
                  <span>Class / department: <strong>{selectedPerson.className}</strong></span>
                </div>
                <div>
                  <Mail size={17} />
                  <span>Email: <strong>{selectedPerson.email}</strong></span>
                </div>
                <div>
                  <Phone size={17} />
                  <span>Phone: <strong>{selectedPerson.phone}</strong></span>
                </div>
              </div>

              <div className="assignment-modal-note">
                Contact information shown here is sample data. Confirm official
                school contact details before using them.
              </div>

              <button
                className="assignment-view-button assignment-modal-done"
                onClick={() => setSelectedPerson(null)}
              >
                Close details
              </button>
            </section>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default People;
