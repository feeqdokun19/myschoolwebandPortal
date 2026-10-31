
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ResetPassword() {
  const token = new URLSearchParams(window.location.search).get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!token) {
      setError('This password-reset link is missing its token. Please request a new link.');
      return;
    }

    if (password.length < 8 || password.length > 100) {
      setError('Your password must be between 8 and 100 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('The passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'http://localhost:3000/api/auth/reset-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, password }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message || 'Unable to reset your password. Please request a new link.'
        );
      }

      setCompleted(true);
      setMessage(
        data.message || 'Your password has been reset successfully.'
      );
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(
        err.message || 'Unable to connect to the server. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };


return (
  <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 px-4 py-10">
    <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

    <section className="relative w-full max-w-md rounded-3xl border border-white/50 bg-white p-7 shadow-2xl sm:p-9">
      <div className="mb-7 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
          {completed ? '✓' : '🔐'}
        </div>

        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
          AUD Islamic Secondary School
        </p>

        <h1 className="text-3xl font-extrabold tracking-tight text-blue-950">
          {completed ? 'Password updated' : 'Create a new password'}
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          {completed
            ? 'Your password has been changed. You can now sign in using your new password.'
            : 'Choose a strong password to secure your school portal account.'}
        </p>
      </div>

      {message && (
        <div
          role="status"
          className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
        >
          {message}
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {!completed && (
        !token ? (
          <div className="space-y-4">
            <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
              This reset link is missing its token. Please request a new
              password-reset link.
            </p>

            <Link
              to="/forgot-password"
              className="block w-full rounded-xl bg-blue-700 px-4 py-3.5 text-center font-bold text-white transition hover:bg-blue-800"
            >
              Request a new link
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="new-password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                New password
              </label>

              <input
                id="new-password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
                minLength={8}
                maxLength={100}
                required
                disabled={loading}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Confirm new password
              </label>

              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Enter the password again"
                minLength={8}
                maxLength={100}
                required
                disabled={loading}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:opacity-60"
              />
            </div>

            <p className="text-xs leading-5 text-gray-500">
              Use 8–100 characters. Your confirmation must match your new
              password.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-700 px-4 py-3.5 font-bold text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Updating password…' : 'Update password'}
            </button>
          </form>
        )
      )}

      <div className="mt-7 border-t border-gray-100 pt-5 text-center">
        <Link
          to="/login"
          className="text-sm font-bold text-blue-700 transition hover:text-blue-900"
        >
          {completed ? 'Continue to login' : 'Back to login'}
        </Link>
      </div>

      <p className="mt-6 text-center text-xs text-gray-400">
        Secure access to your school portal
      </p>
    </section>
  </main>
);

}
