
import React, { useState } from 'react';
import { UserPlus, Users } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import './DashboardPages.css';

export default function AdminUserManagement() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'TEACHER',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        throw new Error('Please log in again to continue.');
      }

      const response = await fetch(
        'http://localhost:3000/api/users/staff-accounts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to create account.');
      }

      setMessage(data.message || 'Account created successfully.');
      setForm({ email: '', password: '', role: 'TEACHER' });
    } catch (err) {
      setError(err.message || 'Unable to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      title="User and Role Management"
      subtitle="Create and manage authorised school staff accounts."
      role="Administrator"
    >
      <section className="dashboard-panel">
        <div className="dashboard-panel-heading">
          <div>
            <h2><Users size={21} /> Create Staff Account</h2>
            <p>
              Add a teacher or staff member to the school portal.
              Admin and Super Admin accounts cannot be created here.
            </p>
          </div>
        </div>

        {message && <p role="status">{message}</p>}
        {error && <p role="alert">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="staff-email">Email address</label>
            <input
              id="staff-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="staff@school.com"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="staff-role">Account role</label>
            <select
              id="staff-role"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="TEACHER">Teacher</option>
              <option value="STAFF">Staff</option>
            </select>
          </div>

          <div>
            <label htmlFor="staff-password">Temporary password</label>
            <input
              id="staff-password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              minLength={12}
              maxLength={100}
              autoComplete="new-password"
              placeholder="At least 12 characters"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            <UserPlus size={17} />
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
      </section>
    </DashboardLayout>
  );
}