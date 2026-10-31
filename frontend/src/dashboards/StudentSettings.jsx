import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import './StudentSettings.css';

export default function StudentSettings() {


  const [academicUpdates, setAcademicUpdates] = useState(true);
  const [schoolAnnouncements, setSchoolAnnouncements] = useState(true);
  const [preferencesLoading, setPreferencesLoading] = useState(true);
  const [preferencesSaving, setPreferencesSaving] = useState(false);
  const [preferencesMessage, setPreferencesMessage] = useState('');

  useEffect(() => {
    const loadPreferences = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        setPreferencesMessage('Please log in again to manage your preferences.');
        setPreferencesLoading(false);
        return;
      }

      try {
        const response = await fetch(
          'http://localhost:3000/api/users/me/notification-preferences',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Unable to load preferences.');
        }

        setAcademicUpdates(
          data.notificationPreferences.academicUpdates
        );
        setSchoolAnnouncements(
          data.notificationPreferences.schoolAnnouncements
        );
      } catch (error) {
        setPreferencesMessage(
          error.message || 'Unable to load notification preferences.'
        );
      } finally {
        setPreferencesLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const savePreferences = async (academic, announcements) => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setPreferencesMessage('Please log in again to save your preferences.');
      return;
    }

    setPreferencesSaving(true);
    setPreferencesMessage('');

    try {
      const response = await fetch(
        'http://localhost:3000/api/users/me/notification-preferences',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            academicUpdates: academic,
            schoolAnnouncements: announcements,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to save preferences.');
      }

      setPreferencesMessage('Notification preferences saved successfully.');
    } catch (error) {
      setPreferencesMessage(
        error.message || 'Unable to save notification preferences.'
      );
    } finally {
      setPreferencesSaving(false);
    }
  };




 
return (
  <DashboardLayout
    title="Settings"
    subtitle="Personalise your school portal experience."
    role="STUDENT"
  >
    <div className="student-settings-page">
      <section className="student-settings-hero">
        <div className="student-settings-hero-content">
          <span className="student-settings-eyebrow">
            YOUR ACCOUNT
          </span>
          <h2>Make your portal work for you.</h2>
          <p>
            Manage your preferences, stay informed, and keep your
            student account organised.
          </p>
        </div>

        <div className="student-settings-hero-icon" aria-hidden="true">
          <span>⚙</span>
        </div>
      </section>

      <section className="student-settings-profile">
        <div className="student-settings-avatar">
          {(JSON.parse(localStorage.getItem('user') || '{}').firstName || 'S')
            .charAt(0)
            .toUpperCase()}
        </div>

        <div className="student-settings-profile-info">
          <span className="student-settings-label">STUDENT ACCOUNT</span>
          <h3>
            {(() => {
              try {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                return (
                  [user.firstName, user.lastName].filter(Boolean).join(' ') ||
                  user.name ||
                  'Student'
                );
              } catch {
                return 'Student';
              }
            })()}
          </h3>
          <p>
            {(() => {
              try {
                return JSON.parse(localStorage.getItem('user') || '{}').email ||
                  'Your school portal account';
              } catch {
                return 'Your school portal account';
              }
            })()}
          </p>
        </div>

        <span className="student-settings-status">
          <span /> Account
        </span>
      </section>

      <div className="student-settings-section-heading">
        <div>
          <h2>Preferences</h2>
          <p>Choose how you want to use your portal.</p>
        </div>
      </div>

      <div className="student-settings-grid">
        <section className="student-settings-card">
          <div className="student-settings-card-heading">
            <div className="student-settings-icon blue">♧</div>
            <div>
              <h3>Account information</h3>
              <p>Your personal account details</p>
            </div>
          </div>

          <div className="student-settings-detail">
            <span>Email address</span>
            <strong>
              {(() => {
                try {
                  return JSON.parse(localStorage.getItem('user') || '{}').email ||
                    'Not provided';
                } catch {
                  return 'Not provided';
                }
              })()}
            </strong>
          </div>

          <div className="student-settings-detail">
            <span>Account role</span>
            <strong>Student</strong>
          </div>

          <p className="student-settings-note">
            Need to correct your personal details? Contact your school
            administrator for assistance.
          </p>
        </section>

        <section className="student-settings-card">
          <div className="student-settings-card-heading">
            <div className="student-settings-icon purple">♧</div>
            <div>
              <h3>Notifications</h3>
              <p>Stay updated with school activities</p>
            </div>
          </div>

          
  <label className="student-settings-toggle">
    <span>
      <strong>Academic updates</strong>
      <small>Assignments, results, and timetable updates</small>
    </span>
    <input
      type="checkbox"
      checked={academicUpdates}
      disabled={preferencesLoading || preferencesSaving}
      onChange={(event) => {
        const value = event.target.checked;
        setAcademicUpdates(value);
        savePreferences(value, schoolAnnouncements);
      }}
    />
  </label>

  <label className="student-settings-toggle">
    <span>
      <strong>School announcements</strong>
      <small>Important notices from school management</small>
    </span>
    <input
      type="checkbox"
      checked={schoolAnnouncements}
      disabled={preferencesLoading || preferencesSaving}
      onChange={(event) => {
        const value = event.target.checked;
        setSchoolAnnouncements(value);
        savePreferences(academicUpdates, value);
      }}
    />
  </label>

  <p className="student-settings-note" role="status">
    {preferencesLoading
      ? 'Loading your preferences...'
      : preferencesSaving
        ? 'Saving your preferences...'
        : preferencesMessage || 'Your notification preferences are up to date.'}
  </p>


          <p className="student-settings-note">
            These controls are a visual preview; notification preferences
            are not saved yet.
          </p>
        </section>

        <section className="student-settings-card">
          <div className="student-settings-card-heading">
            <div className="student-settings-icon green">◉</div>
            <div>
              <h3>Privacy & security</h3>
              <p>Keep your account safe</p>
            </div>
          </div>

          <div className="student-settings-security-item">
            <div>
              <strong>Password and access</strong>
              <p>Never share your password with anyone.</p>
            </div>
            <span className="student-settings-security-badge">
              Protected
            </span>
          </div>

          <div className="student-settings-security-item">
            <div>
              <strong>Sign-in session</strong>
              <p>Sign out when using a shared computer.</p>
            </div>
          </div>
        </section>

        <section className="student-settings-card">
          <div className="student-settings-card-heading">
            <div className="student-settings-icon amber">?</div>
            <div>
              <h3>Help & support</h3>
              <p>We're here to help you</p>
            </div>
          </div>

          <p className="student-settings-support-text">
            For login problems, incorrect account information, or other
            portal issues, contact the school administrator.
          </p>

          <div className="student-settings-support-footer">
            <span>Need assistance?</span>
            <strong>Contact School Admin</strong>
          </div>
        </section>
      </div>

      <footer className="student-settings-footer">
        <span>AUD Islamic Secondary School</span>
        <span>Student Portal · Settings</span>
      </footer>
    </div>
  </DashboardLayout>
);

}
