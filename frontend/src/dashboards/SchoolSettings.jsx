
import { useEffect, useState } from 'react';
import './SchoolSettings.css';

const API_URL = 'http://localhost:3000/api/settings';

const initialSettings = {
  schoolName: '',
  schoolEmail: '',
  schoolPhone: '',
  schoolAddress: '',
  currentSession: '',
  currentTerm: 'FIRST',
  admissionsOpen: true,
  portalMaintenanceMode: false,
  announcement: '',
  resultPublicationEnabled: false,
  grading: [],
  notificationsEnabled: true,
  emailNotificationsEnabled: true,
};

export default function SchoolSettings() {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadSettings() {
      try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Unable to load school settings.');
        }

        setSettings({ ...initialSettings, ...data.settings });
      } catch (err) {
        setError(err.message || 'Unable to load school settings.');
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  function updateField(field, value) {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function updateGrade(index, field, value) {
    setSettings((previous) => ({
      ...previous,
      grading: previous.grading.map((grade, i) =>
        i === index
          ? {
              ...grade,
              [field]:
                field === 'minScore' ? Number(value) : value,
            }
          : grade
      ),
    }));
  }

  function addGrade() {
    setSettings((previous) => ({
      ...previous,
      grading: [
        ...previous.grading,
        { grade: '', minScore: 0, remark: '' },
      ],
    }));
  }

  function removeGrade(index) {
    setSettings((previous) => ({
      ...previous,
      grading: previous.grading.filter((_, i) => i !== index),
    }));
  }

  async function saveSettings(event) {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('accessToken');

      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to save settings.');
      }

      setSettings({ ...initialSettings, ...data.settings });
      setMessage('School settings saved successfully.');
    } catch (err) {
      setError(err.message || 'Unable to save settings.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="school-settings"><p>Loading school settings...</p></div>;
  }

  return (
    <main className="school-settings">
      <header className="settings-header">
        <div>
          <p className="settings-eyebrow">ADMINISTRATION</p>
          <h1>School Settings</h1>
          <p>Manage your school's profile, academics and portal preferences.</p>
        </div>
      </header>

      {message && <div className="settings-message success">{message}</div>}
      {error && <div className="settings-message error">{error}</div>}

      <form onSubmit={saveSettings}>
        <section className="settings-card">
          <h2>School Profile</h2>
          <div className="settings-grid">
            <label>
              School name
              <input
                required
                value={settings.schoolName}
                onChange={(e) => updateField('schoolName', e.target.value)}
              />
            </label>
            <label>
              School email
              <input
                type="email"
                value={settings.schoolEmail}
                onChange={(e) => updateField('schoolEmail', e.target.value)}
              />
            </label>
            <label>
              Phone number
              <input
                value={settings.schoolPhone}
                onChange={(e) => updateField('schoolPhone', e.target.value)}
              />
            </label>
            <label>
              School address
              <input
                value={settings.schoolAddress}
                onChange={(e) => updateField('schoolAddress', e.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="settings-card">
          <h2>Academic Configuration</h2>
          <div className="settings-grid">
            <label>
              Current academic session
              <input
                required
                placeholder="2026/2027"
                value={settings.currentSession}
                onChange={(e) => updateField('currentSession', e.target.value)}
              />
            </label>
            <label>
              Current term
              <select
                value={settings.currentTerm}
                onChange={(e) => updateField('currentTerm', e.target.value)}
              >
                <option value="FIRST">First Term</option>
                <option value="SECOND">Second Term</option>
                <option value="THIRD">Third Term</option>
              </select>
            </label>
          </div>

          <h3>Grading Scale</h3>
          <p className="settings-help">
            Configure grade labels, minimum scores and remarks.
          </p>

          {settings.grading.map((grade, index) => (
            <div className="grade-row" key={`${grade.grade}-${index}`}>
              <label>
                Grade
                <input
                  required
                  value={grade.grade}
                  onChange={(e) => updateGrade(index, 'grade', e.target.value)}
                />
              </label>
              <label>
                Minimum score
                <input
                  required
                  type="number"
                  min="0"
                  max="100"
                  value={grade.minScore}
                  onChange={(e) => updateGrade(index, 'minScore', e.target.value)}
                />
              </label>
              <label>
                Remark
                <input
                  value={grade.remark || ''}
                  onChange={(e) => updateGrade(index, 'remark', e.target.value)}
                />
              </label>
              <button
                type="button"
                className="remove-grade"
                onClick={() => removeGrade(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <button type="button" className="secondary-button" onClick={addGrade}>
            + Add grade
          </button>
        </section>

        <section className="settings-card">
          <h2>Admissions and Portal</h2>

          <label className="toggle-row">
            <span>
              <strong>Admissions open</strong>
              <small>Allow new admission applications.</small>
            </span>
            <input
              type="checkbox"
              checked={settings.admissionsOpen}
              onChange={(e) => updateField('admissionsOpen', e.target.checked)}
            />
          </label>

          <label className="toggle-row">
            <span>
              <strong>Maintenance mode</strong>
              <small>Save the maintenance preference for future portal integration.</small>
            </span>
            <input
              type="checkbox"
              checked={settings.portalMaintenanceMode}
              onChange={(e) => updateField('portalMaintenanceMode', e.target.checked)}
            />
          </label>

          <label className="toggle-row">
            <span>
              <strong>Publish results</strong>
              <small>Save whether results are approved for publication.</small>
            </span>
            <input
              type="checkbox"
              checked={settings.resultPublicationEnabled}
              onChange={(e) =>
                updateField('resultPublicationEnabled', e.target.checked)
              }
            />
          </label>

          <label className="full-width-field">
            Portal announcement
            <textarea
              maxLength={1000}
              rows={4}
              value={settings.announcement}
              onChange={(e) => updateField('announcement', e.target.value)}
              placeholder="Enter an announcement for the school portal..."
            />
          </label>
        </section>

        <section className="settings-card">
          <h2>Notifications</h2>

          <label className="toggle-row">
            <span>
              <strong>Notifications enabled</strong>
              <small>Enable the general notification preference.</small>
            </span>
            <input
              type="checkbox"
              checked={settings.notificationsEnabled}
              onChange={(e) =>
                updateField('notificationsEnabled', e.target.checked)
              }
            />
          </label>

          <label className="toggle-row">
            <span>
              <strong>Email notifications</strong>
              <small>Enable the email notification preference.</small>
            </span>
            <input
              type="checkbox"
              checked={settings.emailNotificationsEnabled}
              onChange={(e) =>
                updateField('emailNotificationsEnabled', e.target.checked)
              }
            />
          </label>
        </section>

        <div className="settings-actions">
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save School Settings'}
          </button>
        </div>
      </form>
    </main>
  );
}
