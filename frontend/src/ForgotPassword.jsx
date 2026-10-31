
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitted(false);

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError('Please enter your registered email address.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || data?.success === false) {
        throw new Error(
          data?.message || 'We could not process your request. Please try again.'
        );
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof TypeError
          ? 'Unable to connect to the server. Please ensure the school portal backend is running and try again.'
          : err.message || 'Something went wrong. Please try again.'
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
        <Link
          to="/login"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-700"
        >
          <span aria-hidden="true">←</span> Back to login
        </Link>

        <div className="mb-7 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
            {submitted ? '✉️' : '🔐'}
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
            AUD Islamic Secondary School
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-blue-950">
            {submitted ? 'Check your email' : 'Forgot password?'}
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            {submitted
              ? 'If an account exists for this email address, a password-reset link will be sent. Check your inbox and spam folder.'
              : 'It happens. Enter the email address linked to your school portal account and we’ll help you get back in.'}
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="reset-email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email address
              </label>

              <input
                id="reset-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                maxLength={254}
                disabled={loading}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3.5 font-bold text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Sending request…' : 'Send reset link'}
              {!loading && <span aria-hidden="true">→</span>}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div
              role="status"
              className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800"
            >
              Your request has been received. If the account exists, the email
              will contain a link to reset your password. The link expires
              after 15 minutes.
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setError('');
              }}
              className="w-full rounded-xl border border-blue-200 px-4 py-3 font-semibold text-blue-800 transition hover:bg-blue-50"
            >
              Try another email
            </button>
          </div>
        )}

        <div className="mt-7 border-t border-gray-100 pt-5 text-center">
          <p className="text-sm text-gray-500">
            Remember your password?{' '}
            <Link
              to="/login"
              className="font-bold text-blue-700 hover:text-blue-900"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Secure access to your school portal
        </p>
      </section>
    </main>
  );
}
