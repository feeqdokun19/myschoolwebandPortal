
import React, { useEffect, useState } from 'react';
import { ClipboardCheck, RefreshCw } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import './DashboardPages.css';

export default function AdminAdmissions() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadApplications = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        throw new Error('Please log in again to continue.');
      }

      const response = await fetch(
        'http://localhost:3000/api/admissions/admin',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Unable to load admission applications.'
        );
      }

      setApplications(data.data || []);
    } catch (err) {
      setError(err.message || 'Unable to load admission applications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  return (
    <DashboardLayout
      title="Admissions Management"
      subtitle="Review applications and manage admission decisions."
      role="Administrator"
    >
      <section className="dashboard-panel">
        <div className="dashboard-panel-heading">
          <div>
            <h2>
              <ClipboardCheck size={21} /> Admission Applications
            </h2>
            <p>
              Review applicant records and track their admission status.
            </p>
          </div>

          <button type="button" onClick={loadApplications}>
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {loading ? (
          <p>Loading admission applications...</p>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : applications.length === 0 ? (
          <p>No admission applications found.</p>
        ) : (
          <p>
            {applications.length} application
            {applications.length === 1 ? '' : 's'} loaded.
          </p>
        )}
      </section>
    </DashboardLayout>
  );
}
