import ResetPassword from './ResetPassword.jsx';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import ForgotPassword from './ForgotPassword.jsx';
import StudentDashboard from './dashboards/StudentDashboard';
import TeacherDashboard from './dashboards/TeacherDashboard';
import StaffDashboard from './dashboards/StaffDashboard';
import ParentDashboard from './dashboards/ParentDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import SuperAdminDashboard from './dashboards/SuperAdminDashboard';
import ApplicantDashboard from './dashboards/ApplicantDashboard';
import Academics from './dashboards/Academics';
import Timetable from './dashboards/Timetable';
import Assignments from './dashboards/Assignments';
import Results from './dashboards/Results';
import People from './dashboards/People';
import SchoolSettings from './dashboards/SchoolSettings.jsx';
import StudentSettings from './dashboards/StudentSettings.jsx';
import AdminAdmissions from './dashboards/AdminAdmissions';

import AdminUserManagement from './dashboards/AdminUserManagement';


import './home.css';
import {
  GraduationCap,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  Mail,
  Users,
  Leaf,
  FlaskConical,
  Monitor,
  HeartHandshake,
  Star,
  ChevronRight,
} from 'lucide-react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link,
  useSearchParams,
} from 'react-router-dom';
import './index.css';
import './styles.css';

export default function Home() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <div className="school-home">
      <header className="home-header">
        <Link className="home-brand" to="/" onClick={closeMenu}>
          <span className="home-logo">
            <GraduationCap size={29} />
          </span>
          <span className="home-brand-text">
            <strong>AUD</strong>
            <span>Islamic Secondary School</span>
          </span>
        </Link>

        <button
          className="home-menu-toggle"
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`home-nav ${open ? 'is-open' : ''}`}>
          <a href="#about" onClick={closeMenu}>About us</a>
          <a href="#academics" onClick={closeMenu}>Academics</a>
          <a href="#values" onClick={closeMenu}>Our values</a>
          <a href="#admission" onClick={closeMenu}>Admissions</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>

          <Link
            className="home-portal-button"
            to="/login"
            onClick={closeMenu}
          >
            Portal login <ArrowRight size={16} />
          </Link>
        </nav>
      </header>

      <main>
        <section className="home-hero">
          <div className="home-hero-background" />

          <div className="home-hero-content">
            <span className="home-eyebrow">
              <span className="eyebrow-dot" />
              LEARN. GROW. LEAD.
            </span>

            <h1>
              Building confident minds for a{' '}
              <em>better tomorrow.</em>
            </h1>

            <p>
              A modern learning community nurturing academic
              excellence, Islamic character, creativity and the
              confidence to shape tomorrow.
            </p>

            <div className="home-hero-actions">
              <Link className="home-button home-button-green" to="/admission">
                Apply for admission <ArrowRight size={18} />
              </Link>

              <a className="home-button home-button-outline" href="#about">
                Discover our school
              </a>
            </div>

            <div className="home-hero-note">
              <ShieldCheck size={18} />
              <span>Knowledge with character. Learning with purpose.</span>
            </div>
          </div>

          <div className="home-admission-card">
            <div className="home-card-top">
              <span className="home-year">2026 / 2027</span>
              <span className="home-card-icon">
                <ShieldCheck size={21} />
              </span>
            </div>

            <span className="home-card-label">JOIN OUR COMMUNITY</span>
            <h2>Admissions are open</h2>
            <p>
              Take the first step towards a meaningful and
              rewarding educational journey.
            </p>

            <div className="home-card-bottom">
              <span className="home-book-icon">
                <BookOpen size={24} />
              </span>
              <span>
                <strong>Apply online</strong>
                <small>Start your application today</small>
              </span>
              <Link
                to="/admission"
                aria-label="Start your admission application"
              >
                <ArrowRight size={19} />
              </Link>
            </div>
          </div>

          <a className="home-scroll-link" href="#about">
            <span />
            SCROLL TO DISCOVER
          </a>
        </section>

        <section id="about" className="home-pillars">
          <div className="home-pillar">
            <span className="home-pillar-icon">
              <Leaf size={26} />
            </span>
            <span className="home-pillar-number">01</span>
            <h3>Character first</h3>
            <p>Developing integrity, discipline and respect.</p>
          </div>

          <div className="home-pillar">
            <span className="home-pillar-icon">
              <Users size={26} />
            </span>
            <span className="home-pillar-number">02</span>
            <h3>Students at heart</h3>
            <p>Supporting every learner to discover their potential.</p>
          </div>

          <div className="home-pillar">
            <span className="home-pillar-icon">
              <GraduationCap size={28} />
            </span>
            <span className="home-pillar-number">03</span>
            <h3>Academic excellence</h3>
            <p>Building a strong foundation for lifelong learning.</p>
          </div>
        </section>

        <section id="academics" className="home-academics">
          <div className="home-academics-copy">
            <span className="home-eyebrow home-eyebrow-dark">
              OUR APPROACH
            </span>

            <h2>
              Education that prepares students for <em>life.</em>
            </h2>

            <p>
              We believe education should develop the whole student.
              Our learning environment brings academic ambition
              together with good character, curiosity and responsibility.
            </p>

            <a className="home-text-link" href="#values">
              Explore our approach <ArrowRight size={17} />
            </a>
          </div>

          <div className="home-programmes">
            <article className="home-programme-card">
              <span className="programme-icon">
                <BookOpen size={25} />
              </span>
              <span className="programme-index">01 / LEARNING</span>
              <h3>Academic foundations</h3>
              <p>
                A learning culture focused on understanding,
                achievement and continuous improvement.
              </p>
            </article>

            <article className="home-programme-card">
              <span className="programme-icon programme-icon-gold">
                <FlaskConical size={25} />
              </span>
              <span className="programme-index">02 / DISCOVERY</span>
              <h3>Curiosity and innovation</h3>
              <p>
                Encouraging students to ask questions, think
                critically and develop practical skills.
              </p>
            </article>

            <article className="home-programme-card">
              <span className="programme-icon programme-icon-blue">
                <Monitor size={25} />
              </span>
              <span className="programme-index">03 / DIGITAL</span>
              <h3>Technology for learning</h3>
              <p>
                Building digital confidence and preparing
                learners for an increasingly connected world.
              </p>
            </article>

            <article className="home-programme-card">
              <span className="programme-icon programme-icon-rose">
                <HeartHandshake size={25} />
              </span>
              <span className="programme-index">04 / CHARACTER</span>
              <h3>Faith and responsibility</h3>
              <p>
                Promoting compassion, good manners, responsibility
                and respect for others.
              </p>
            </article>
          </div>
        </section>

        <section id="values" className="home-values">
          <div className="home-values-heading">
            <span className="home-eyebrow">WHAT GUIDES US</span>
            <h2>More than lessons. A foundation for life.</h2>
            <p>
              An education experience shaped by knowledge,
              values and a commitment to personal growth.
            </p>
          </div>

          <div className="home-values-grid">
            <article>
              <Star size={21} />
              <h3>Integrity</h3>
              <p>Doing what is right, even when no one is watching.</p>
            </article>

            <article>
              <BookOpen size={21} />
              <h3>Knowledge</h3>
              <p>Remaining curious and committed to lifelong learning.</p>
            </article>

            <article>
              <HeartHandshake size={21} />
              <h3>Respect</h3>
              <p>Showing kindness, consideration and good character.</p>
            </article>
          </div>
        </section>

        <section id="admission" className="home-admission-section">
          <div className="admission-decoration">
            <GraduationCap size={125} strokeWidth={0.8} />
          </div>

          <div className="home-admission-copy">
            <span className="home-eyebrow">YOUR NEXT CHAPTER</span>
            <h2>Your journey starts here.</h2>
            <p>
              Ready to take the next step? Start your application
              online, submit your documents and follow your
              admission progress through the portal.
            </p>
          </div>

          <Link className="home-button home-button-green" to="/admission">
            Start application <ArrowRight size={18} />
          </Link>
        </section>

        <section className="home-portal-strip">
          <div>
            <span className="portal-strip-icon">
              <ShieldCheck size={24} />
            </span>
            <div>
              <h3>Your school journey, connected.</h3>
              <p>
                Access your portal for your school activities and
                academic information.
              </p>
            </div>
          </div>

          <Link className="home-button home-button-light" to="/login">
            Enter student portal <ArrowRight size={17} />
          </Link>
        </section>
      </main>

      <footer id="contact" className="home-footer">
        <div className="home-footer-main">
          <Link className="home-brand home-footer-brand" to="/">
            <span className="home-logo">
              <GraduationCap size={28} />
            </span>
            <span className="home-brand-text">
              <strong>AUD</strong>
              <span>Islamic Secondary School</span>
            </span>
          </Link>

          <p>
            Nurturing knowledge, strengthening character and
            preparing students for a brighter future.
          </p>

          <div className="home-footer-links">
            <a href="#about">About</a>
            <a href="#academics">Academics</a>
            <a href="#admission">Admissions</a>
            <Link to="/login">Portal login</Link>
          </div>
        </div>

        <div className="home-footer-bottom">
          <span>
            © {new Date().getFullYear()} AUD Islamic Secondary School.
          </span>
          <span>Knowledge · Character · Excellence</span>
          <a href="#top" onClick={(event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            Back to top <ChevronRight size={15} />
          </a>
        </div>
      </footer>
    </div>
  );
}


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password) {
      setError('Please enter your email address and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'http://localhost:3000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );


const responseData = await response.json();

if (!response.ok) {
  throw new Error(
    responseData.message || 'Unable to sign in. Please try again.'
  );
}

// The backend returns the login details inside responseData.data.
const data = responseData.data;

if (!data?.accessToken || !data?.user) {
  throw new Error('The server returned an unexpected login response.');
}

localStorage.setItem('accessToken', data.accessToken);
localStorage.setItem('user', JSON.stringify(data.user));


      const roles = Array.isArray(data.user.roles)
  ? data.user.roles
  : [];

const dashboardRoutes = {
  SUPER_ADMIN: '/super-admin/dashboard',
  ADMIN: '/admin/dashboard',
  STAFF: '/staff/dashboard',
  TEACHER: '/teacher/dashboard',
  STUDENT: '/student/dashboard',
  PARENT: '/parent/dashboard',
};

const destination =
  data.user.accountType === 'APPLICANT'
   ? '/applicant/dashboard'
    : roles
        .map((role) => dashboardRoutes[role])
        .find(Boolean);

if (!destination) {
  setError('Your account does not have an assigned dashboard role.');
  return;
}

  setSuccess('Sign-in successful! Your account has been authenticated.');
  setPassword('');
  navigate(destination, { replace: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to connect to the server.'
      );
    } finally {
      setLoading(false);
    }
  }



const [showPassword, setShowPassword] = useState(false);

return (
  <main className="auth-page">
    <header className="auth-header">
      <Link to="/" className="auth-brand">
        <span className="auth-logo">
          <GraduationCap size={28} />
        </span>

        <span className="auth-brand-copy">
          <strong>AUD</strong>
          <span>Islamic Secondary School</span>
        </span>
      </Link>

      <Link to="/admission" className="header-admission">
        Apply for admission <ArrowRight size={16} />
      </Link>
    </header>

    <section className="auth-layout">
      <aside className="auth-showcase">
        <div className="showcase-overlay" />

        <div className="showcase-content">
          <span className="showcase-badge">
            <Sparkles size={15} />
            LEARNING WITH PURPOSE
          </span>

          <h1>
            Knowledge Character.
            <br />
            <span>Faith.</span>
          </h1>

          <p>
            Your journey towards academic excellence and
            strong Islamic values continues here.
          </p>

          <div className="showcase-features">
            <div className="showcase-feature">
              <span><BookOpen size={19} /></span>
              <div>
                <strong>Academic Excellence</strong>
                <small>Learn, grow and achieve more.</small>
              </div>
            </div>

            <div className="showcase-feature">
              <span><ShieldCheck size={19} /></span>
              <div>
                <strong>A Trusted Learning Community</strong>
                <small>Education grounded in strong values.</small>
              </div>
            </div>
          </div>
        </div>

        <div className="showcase-footer">
          <span>BUILDING BRIGHTER FUTURES</span>
          <span>EXCELLENCE WITH VALUES</span>
        </div>
      </aside>

      <section className="auth-main">
        <div className="auth-card">
          <div className="mobile-brand-mark">
            <GraduationCap size={27} />
          </div>

          <span className="auth-eyebrow">
            STUDENT PORTAL
          </span>

          <h2>Welcome back.</h2>
          <p className="auth-description">
            Sign in to access your learning dashboard,
            academic records and school activities.
          </p>

          {error && (
            <div className="auth-message auth-error" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="auth-message auth-success" role="status">
              {success}
            </div>
          )}

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <div className="password-label-row">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              <div className="password-input-wrap">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <button
                  className="password-toggle"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                  aria-pressed={showPassword}
                >
                  {showPassword
                    ? <EyeOff size={19} />
                    : <Eye size={19} />}
                </button>
              </div>
            </div>

            <button
              className="auth-submit"
              type="submit"
              disabled={loading}
            >
              <span>{loading ? 'Signing you in...' : 'Sign in to portal'}</span>
              {!loading && <ArrowRight size={19} />}
            </button>
          </form>

          <div className="auth-divider">
            <span>NEW TO AUD?</span>
          </div>

          <Link to="/admission" className="auth-secondary-link">
            Start an admission application
            <ArrowRight size={16} />
          </Link>

          <div className="auth-security-note">
            <ShieldCheck size={17} />
            <span>Your account and academic information are protected.</span>
          </div>
        </div>

        <footer className="auth-page-footer">
          © {new Date().getFullYear()} AUD Islamic Secondary School.
          <br className="mobile-break" /> All rights reserved.
        </footer>
      </section>
    </section>
  </main>
);
}


function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');

  const isSuccess = status === 'success';
  const isError = status === 'error';

  return (
    <div className="auth">
      <Link className="brand" to="/">
        <span className="logo">
          <GraduationCap size={25} />
        </span>
        <span>
          AUD <b>Islamic Secondary School</b>
        </span>
      </Link>

      <div className="auth-card verification-card">
        <div className={`verification-icon ${isSuccess ? 'success' : 'error'}`}>
          {isSuccess ? (
            <CheckCircle size={42} />
          ) : isError ? (
            <AlertCircle size={42} />
          ) : (
            <Mail size={42} />
          )}
        </div>

        <span className="eyebrow">EMAIL VERIFICATION</span>

        <h1>
          {isSuccess
            ? 'Email verified!'
            : isError
              ? 'Verification unsuccessful'
              : 'Check your verification link'}
        </h1>

        <p>
          {isSuccess
            ? 'Your email address has been verified successfully. You can now continue to the school portal.'
            : isError
              ? 'We could not complete your verification. Please try again or request a new verification email.'
              : 'Open the verification email sent to your inbox and follow the link to verify your account.'}
        </p>

        {isSuccess ? (
          <Link className="primary full" to="/login">
            Continue to login <ArrowRight size={18} />
          </Link>
        ) : (
          <Link className="primary full" to="/login">
            Go to login <ArrowRight size={18} />
          </Link>
        )}

        <p className="muted">
          Need help? Please contact the school administrator.
        </p>

        <Link className="back-link" to="/">
          Return to school website
        </Link>
      </div>
    </div>
  );
}



// function Admission(){
//   return <div className="auth"><Link className="brand" to="/">
//     <span className="logo"><GraduationCap size={25}/></span><span>AUD <b>Islamic Secondary School</b></span>
//     </Link><div className="auth-card">
//       <span className="eyebrow">ADMISSIONS</span>
//       <h1>Start your application.</h1>
//       <p>Online admissions workflow is being built in this milestone.</p>
//       <Link className="primary full" to="/">Back to school website</Link></div>
      
//     </div>}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  children,
  form,
  handleChange,
  fieldStyle,
}) {
  return (
    <label style={{ display: 'grid', gap: '7px', color: '#26344a' }}>
      <span style={{ fontWeight: 600 }}>
        {label}{required ? ' *' : ''}
      </span>

      {children || (
        <input
          style={fieldStyle}
          name={name}
          type={type}
          value={form[name]}
          onChange={handleChange}
          required={required}
        />
      )}
    </label>
  );
}

function Admission() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    address: '',
    stateOfOrigin: '',
    nationality: 'Nigerian',
    guardianFullName: '',
    guardianRelationship: '',
    guardianPhone: '',
    guardianEmail: '',
    requestedClass: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('accessToken');
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    user = null;
  }

  const isApplicant = Array.isArray(user?.roles) &&
    user.roles.includes('STUDENT');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!token || !isApplicant) {
      setError('Please log in with your verified student applicant account before submitting.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'http://localhost:3000/api/admissions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Unable to submit your application.');
      }

      setSuccess(
        'Your admission application has been submitted successfully. Please keep checking for updates from the school.'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to connect to the school server.'
      );
    } finally {
      setLoading(false);
    }
  }

  const fieldStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #d7deea',
    borderRadius: '8px',
    font: 'inherit',
    boxSizing: 'border-box',
    background: '#fff',
  };



return (
  <div
    style={{
      minHeight: '100vh',
      background: '#F4F7F3',
      padding: '28px 18px',
      color: '#17352C',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}
  >
    <style>{`
      .admission-layout {
        max-width: 1180px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 0.78fr 1.22fr;
        gap: 28px;
        align-items: start;
      }
      .admission-input {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #DCE5DE;
        border-radius: 10px;
        padding: 12px 14px;
        background: #FCFDFC;
        color: #17352C;
        font: inherit;
        outline: none;
        transition: border-color .2s, box-shadow .2s;
      }
      .admission-input:focus {
        border-color: #087653;
        box-shadow: 0 0 0 3px rgba(8,118,83,.12);
      }
      .admission-section-title {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 0 0 20px;
        font-size: 18px;
        color: #164A39;
      }
      .admission-section-number {
        display: grid;
        place-items: center;
        width: 34px;
        height: 34px;
        flex-shrink: 0;
        border-radius: 10px;
        background: #E7F3EC;
        color: #087653;
        font-size: 14px;
        font-weight: 800;
      }
      .admission-submit {
        width: 100%;
        min-height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        border: 0;
        border-radius: 12px;
        background: #087653;
        color: white;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
        transition: background .2s, transform .2s;
      }
      .admission-submit:hover:not(:disabled) {
        background: #065D41;
        transform: translateY(-1px);
      }
      .admission-submit:disabled {
        opacity: .65;
        cursor: not-allowed;
      }
      .admission-side {
        position: sticky;
        top: 24px;
        overflow: hidden;
        border-radius: 22px;
        background: linear-gradient(150deg, #075B43, #103B30 75%);
        color: white;
        padding: 32px;
      }
      @media (max-width: 820px) {
        .admission-layout { grid-template-columns: 1fr; }
        .admission-side { position: static; padding: 26px; }
      }
      @media (max-width: 480px) {
        .admission-page-card { padding: 20px !important; }
      }
    `}</style>

    <div style={{ maxWidth: 1180, margin: '0 auto 26px' }}>
      <Link
        className="brand"
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          textDecoration: 'none',
          color: '#164A39',
        }}
      >
        <span
          style={{
            width: 46,
            height: 46,
            display: 'grid',
            placeItems: 'center',
            background: '#087653',
            color: '#F4D68B',
            borderRadius: 14,
          }}
        >
          <GraduationCap size={27} />
        </span>
        <span style={{ fontSize: 15, lineHeight: 1.4 }}>
          <b style={{ display: 'block', fontSize: 18 }}>AUD</b>
          Islamic Secondary School
        </span>
      </Link>
    </div>

    <div className="admission-layout">
      <aside className="admission-side">
        <span
          style={{
            display: 'inline-block',
            color: '#F4D68B',
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 2,
            marginBottom: 22,
          }}
        >
          ADMISSIONS · 2026/2027
        </span>

        <div
          style={{
            width: 58,
            height: 4,
            borderRadius: 8,
            background: '#D8AD52',
            marginBottom: 24,
          }}
        />

        <h1
          style={{
            fontSize: 'clamp(30px, 4vw, 43px)',
            lineHeight: 1.15,
            letterSpacing: -1.2,
            margin: '0 0 18px',
            color: '#FFFFFF',
          }}
        >
          Your future begins with a strong foundation.
        </h1>

        <p
          style={{
            color: '#D8E9DF',
            lineHeight: 1.8,
            fontSize: 14,
            marginBottom: 32,
          }}
        >
          Begin your admission journey with AUD Islamic Secondary School.
          Complete your application carefully so our admissions team can
          review your details.
        </p>

        <h3
          style={{
            fontSize: 13,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: '#F4D68B',
            marginBottom: 22,
          }}
        >
          Your admission journey
        </h3>

        {[
          ['01', 'Complete your application', 'Provide accurate student and guardian information.'],
          ['02', 'School review', 'Our admissions team reviews your application.'],
          ['03', 'Next steps', 'Receive further instructions about the entrance examination and admission decision.'],
        ].map(([number, title, description]) => (
          <div
            key={number}
            style={{
              display: 'flex',
              gap: 14,
              marginBottom: 24,
              alignItems: 'flex-start',
            }}
          >
            <span
              style={{
                flexShrink: 0,
                display: 'grid',
                placeItems: 'center',
                width: 38,
                height: 38,
                border: '1px solid rgba(244,214,139,.45)',
                borderRadius: 12,
                color: '#F4D68B',
                fontWeight: 800,
                fontSize: 12,
              }}
            >
              {number}
            </span>
            <div>
              <b style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>
                {title}
              </b>
              <span
                style={{
                  display: 'block',
                  color: '#D0E2D8',
                  fontSize: 12,
                  lineHeight: 1.7,
                }}
              >
                {description}
              </span>
            </div>
          </div>
        ))}

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,.16)',
            paddingTop: 20,
            marginTop: 8,
            color: '#D8E9DF',
            fontSize: 12,
            lineHeight: 1.8,
          }}
        >
          <b style={{ color: '#F4D68B' }}>Before you begin</b>
          <br />
          Keep your details accurate and use a contact number your guardian
          can be reached on.
        </div>
      </aside>

      <main
        className="admission-page-card"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E5EBE5',
          borderRadius: 22,
          padding: 32,
          boxShadow: '0 12px 45px rgba(23,53,44,.06)',
          minWidth: 0,
        }}
      >
        <div style={{ marginBottom: 28 }}>
          <span
            style={{
              color: '#087653',
              background: '#EAF5EE',
              borderRadius: 30,
              padding: '7px 12px',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            STUDENT APPLICATION
          </span>

          <h2
            style={{
              margin: '18px 0 10px',
              fontSize: 'clamp(25px, 3vw, 32px)',
              lineHeight: 1.25,
              letterSpacing: -.7,
              color: '#17352C',
            }}
          >
            Apply for admission
          </h2>

          <p style={{ color: '#687A70', fontSize: 14, lineHeight: 1.8, margin: 0 }}>
            Fill in the information below. Fields marked with * are required.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            style={{
              padding: 14,
              borderRadius: 12,
              background: '#FFF1F0',
              border: '1px solid #FFD5D2',
              color: '#B42318',
              marginBottom: 20,
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            style={{
              padding: 14,
              borderRadius: 12,
              background: '#ECFDF3',
              border: '1px solid #ABEFC6',
              color: '#067647',
              marginBottom: 20,
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            {success}
          </div>
        )}

        {!token && (
          <div
            style={{
              padding: 15,
              borderRadius: 12,
              background: '#FFFAEB',
              border: '1px solid #FDE2A7',
              color: '#854D0E',
              marginBottom: 24,
              fontSize: 13,
              lineHeight: 1.8,
            }}
          >
            <b style={{ display: 'block', marginBottom: 4 }}>Applicant login required</b>
            Please <Link to="/login" style={{ color: '#087653', fontWeight: 700 }}>log in</Link> with your verified student applicant account before submitting.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 28 }}>
          <section>
            <h3 className="admission-section-title">
              <span className="admission-section-number">01</span>
              Student details
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))',
                gap: 18,
              }}
            >
              <Field
                label="First name *"
                name="firstName"
                required
                form={form}
                handleChange={handleChange}
                fieldStyle={fieldStyle}
              />
              
              <Field
                label="Middle name"
                name="middleName"
                form={form}
                handleChange={handleChange}
                fieldStyle={fieldStyle}
              />

              <Field
                label="Last name *"
                name="lastName"
                required
                form={form}
                handleChange={handleChange}
                fieldStyle={fieldStyle}
              />
              <Field
                label="Date of birth *"
                name="dateOfBirth"
                type="date"
                required
                form={form}
                handleChange={handleChange}
                fieldStyle={fieldStyle}
              />

              <Field
                label="Gender *"
                name="gender"
                required
                form={form}
                handleChange={handleChange}
                fieldStyle={fieldStyle}
              >
                <select
                  className="admission-input"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </Field>

              <Field
                label="Phone number *"
                name="phone"
                required
                form={form}
                handleChange={handleChange}
                fieldStyle={fieldStyle}
              />

              <Field
                label="State of origin *"
                name="stateOfOrigin"
                required
                form={form}
                handleChange={handleChange}
                fieldStyle={fieldStyle}
              />

              <Field
                label="Nationality *"
                name="nationality"
                required
                form={form}
                handleChange={handleChange}
                fieldStyle={fieldStyle}
              />
            </div>

            <div style={{ marginTop: 18 }}>
              <Field label="Residential address *" name="address" required>
                <textarea
                  className="admission-input"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                  required
                  placeholder="Enter your full residential address"
                  style={{ resize: 'vertical' }}
                />
              </Field>
            </div>
          </section>

          <section
            style={{
              borderTop: '1px solid #E8EEE8',
              paddingTop: 26,
            }}
          >
            <h3 className="admission-section-title">
              <span className="admission-section-number">02</span>
              Parent or guardian
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))',
                gap: 18,
              }}
            >
              <Field
              label="Full name *"
              name="guardianFullName"
              required
              form={form}
              handleChange={handleChange}
              fieldStyle={fieldStyle}
            />

            <Field
              label="Relationship *"
              name="guardianRelationship"
              required
              form={form}
              handleChange={handleChange}
              fieldStyle={fieldStyle}
            />

            <Field
              label="Phone number *"
              name="guardianPhone"
              required
              form={form}
              handleChange={handleChange}
              fieldStyle={fieldStyle}
            />

            <Field
              label="Email address"
              name="guardianEmail"
              type="email"
              form={form}
              handleChange={handleChange}
              fieldStyle={fieldStyle}
            />
            </div>
          </section>

          <section
            style={{
              borderTop: '1px solid #E8EEE8',
              paddingTop: 26,
            }}
          >
            <h3 className="admission-section-title">
              <span className="admission-section-number">03</span>
              Class selection
            </h3>

            <Field label="Class applying for *" name="requestedClass" required>
              <select
                className="admission-input"
                name="requestedClass"
                value={form.requestedClass}
                onChange={handleChange}
                required
              >
                <option value="">Choose a class</option>
                {['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'].map((schoolClass) => (
                  <option key={schoolClass} value={schoolClass}>
                    {schoolClass}
                  </option>
                ))}
              </select>
            </Field>
          </section>

          <div
            style={{
              padding: 15,
              background: '#F5F8F5',
              borderRadius: 12,
              color: '#687A70',
              fontSize: 12,
              lineHeight: 1.8,
            }}
          >
            <b style={{ color: '#315447' }}>Please note:</b> Submitting this form does not guarantee admission. The school will review your application and provide further instructions about the entrance examination.
          </div>

          <button
            className="admission-submit"
            type="submit"
            disabled={loading || !token}
          >
            {loading ? 'Submitting application…' : 'Submit application'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div
          style={{
            borderTop: '1px solid #E8EEE8',
            marginTop: 26,
            paddingTop: 20,
            textAlign: 'center',
          }}
        >
          <Link
            className="back-link"
            to="/"
            style={{
              color: '#087653',
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            ← Return to school website
          </Link>
        </div>
      </main>
    </div>

    <p
      style={{
        textAlign: 'center',
        color: '#87958C',
        fontSize: 11,
        margin: '28px auto 0',
      }}
    >
      AUD Islamic Secondary School · Admissions 2026/2027
    </p>
  </div>
);


  // return (
  //   <div className="auth">
  //     <Link className="brand" to="/">
  //       <span className="logo"><GraduationCap size={25} /></span>
  //       <span>AUD <b>Islamic Secondary School</b></span>
  //     </Link>

  //     <div
  //       className="auth-card"
  //       style={{ width: 'min(760px, 100%)', maxWidth: '760px' }}
  //     >
  //       <span className="eyebrow">ADMISSIONS · 2026/2027</span>
  //       <h1>Student admission application</h1>
  //       <p>
  //         Complete the details below carefully. Fields marked with an
  //         asterisk are required.
  //       </p>

  //       {error && (
  //         <p role="alert" style={{ color: '#b42318', background: '#fff1f0', padding: 12, borderRadius: 8 }}>
  //           {error}
  //         </p>
  //       )}

  //       {success && (
  //         <p role="status" style={{ color: '#067647', background: '#ecfdf3', padding: 12, borderRadius: 8 }}>
  //           {success}
  //         </p>
  //       )}

  //       {!token && (
  //         <p style={{ background: '#fff7e6', padding: 12, borderRadius: 8 }}>
  //           Please <Link to="/login">log in</Link> with your verified student
  //           applicant account before submitting. If you have not registered,
  //           return to the portal login page to begin.
  //         </p>
  //       )}

  //       <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 22 }}>
  //         <h2>Student details</h2>

  //         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
  //           <Field label="First name" name="firstName" required />
  //           <Field label="Middle name" name="middleName" />
  //           <Field label="Last name" name="lastName" required />
  //           <Field label="Date of birth" name="dateOfBirth" type="date" required />

  //           <Field label="Gender" name="gender" required>
  //             <select style={fieldStyle} name="gender" value={form.gender} onChange={handleChange} required>
  //               <option value="">Select gender</option>
  //               <option value="MALE">Male</option>
  //               <option value="FEMALE">Female</option>
  //             </select>
  //           </Field>

  //           <Field label="Phone number" name="phone" required />
  //           <Field label="State of origin" name="stateOfOrigin" required />
  //           <Field label="Nationality" name="nationality" required />
  //         </div>

  //         <Field label="Residential address" name="address" required>
  //           <textarea
  //             style={fieldStyle}
  //             name="address"
  //             value={form.address}
  //             onChange={handleChange}
  //             rows={3}
  //             required
  //           />
  //         </Field>

  //         <h2>Parent or guardian details</h2>

  //         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
  //           <Field label="Full name" name="guardianFullName" required />
  //           <Field label="Relationship to student" name="guardianRelationship" required />
  //           <Field label="Phone number" name="guardianPhone" required />
  //           <Field label="Email address" name="guardianEmail" type="email" />
  //         </div>

  //         <h2>Class selection</h2>

  //         <Field label="Class applying for" name="requestedClass" required>
  //           <select
  //             style={fieldStyle}
  //             name="requestedClass"
  //             value={form.requestedClass}
  //             onChange={handleChange}
  //             required
  //           >
  //             <option value="">Choose a class</option>
  //             {['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'].map((schoolClass) => (
  //               <option key={schoolClass} value={schoolClass}>
  //                 {schoolClass}
  //               </option>
  //             ))}
  //           </select>
  //         </Field>

  //         <p style={{ fontSize: 13, color: '#526079' }}>
  //           Submitting this form does not guarantee admission. The school
  //           will review your application and provide further instructions
  //           about the entrance examination.
  //         </p>

  //         <button className="primary full" type="submit" disabled={loading}>
  //           {loading ? 'Submitting application…' : 'Submit application'}
  //           {!loading && <ArrowRight size={18} />}
  //         </button>
  //       </form>

  //       <Link className="back-link" to="/">
  //         Return to school website
  //       </Link>
  //     </div>
  //   </div>
  // );
}


const dashboardRoutes = {
  SUPER_ADMIN: '/super-admin/dashboard',
  ADMIN: '/admin/dashboard',
  STAFF: '/staff/dashboard',
  TEACHER: '/teacher/dashboard',
  STUDENT: '/student/dashboard',
  PARENT: '/parent/dashboard',
};

function ProtectedDashboard({ allowedRole, children }) {
  const token = localStorage.getItem('accessToken');
  const storedUser = localStorage.getItem('user');

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const roles = Array.isArray(user.roles) ? user.roles : [];
  const destination = roles
    .map((role) => dashboardRoutes[role])
    .find(Boolean);

  if (!roles.includes(allowedRole)) {
    return (
      <Navigate
        to={destination || '/login'}
        replace
      />
    );
  }

  return children;
}


function ProtectedApplicantDashboard({ children }) {
  const token = localStorage.getItem('accessToken');
  const storedUser = localStorage.getItem('user');

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.accountType !== 'APPLICANT') {
    return <Navigate to="/login" replace />;
  }

  return children;
}


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admission" element={<Admission />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admission" element={<Admission />} />
      
           <Route
        path="/teacher/dashboard"
        element={
          <ProtectedDashboard allowedRole="TEACHER">
            <TeacherDashboard />
          </ProtectedDashboard>
        }
      />

      <Route
        path="/staff/dashboard"
        element={
          <ProtectedDashboard allowedRole="STAFF">
            <StaffDashboard />
          </ProtectedDashboard>
        }
      />

      <Route
        path="/parent/dashboard"
        element={
          <ProtectedDashboard allowedRole="PARENT">
            <ParentDashboard />
          </ProtectedDashboard>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedDashboard allowedRole="ADMIN">
            <AdminDashboard />
          </ProtectedDashboard>
        }
      />

      <Route
        path="/super-admin/dashboard"
        element={
          <ProtectedDashboard allowedRole="SUPER_ADMIN">
            <SuperAdminDashboard />
          </ProtectedDashboard>
        }
      />

      <Route
        path="/applicant/dashboard"
        element={
          <ProtectedApplicantDashboard>
            <ApplicantDashboard />
          </ProtectedApplicantDashboard>
        }
      />

      <Route
        path="/student/dashboard"
        element={
          <ProtectedDashboard allowedRole="STUDENT">
            <StudentDashboard />
          </ProtectedDashboard>
        }
      />

      <Route
        path="/student/dashboard/academics"
        element={
          <ProtectedDashboard allowedRole="STUDENT">
            <Academics />
          </ProtectedDashboard>
        }
      />
      <Route
  path="/student/dashboard/assignments"
  element={
    <ProtectedDashboard allowedRole="STUDENT">
      <Assignments />
    </ProtectedDashboard>
  }
/>

<Route
  path="/student/dashboard/people"
  element={
    <ProtectedDashboard allowedRole="STUDENT">
      <People />
    </ProtectedDashboard>
  }
/>

<Route
  path="/student/dashboard/results"
  element={
    <ProtectedDashboard allowedRole="STUDENT">
      <Results />
    </ProtectedDashboard>
  }
/>
      <Route
        path="/student/dashboard/timetable"
        element={
          <ProtectedDashboard allowedRole="STUDENT">
            <Timetable />
          </ProtectedDashboard>
        }
      />

      <Route
        path="/student/dashboard/settings"
        element={
          <ProtectedDashboard allowedRole="STUDENT">
            <StudentSettings />
          </ProtectedDashboard>
        }
      />

        <Route
          path="/admin/dashboard/admissions"
          element={
            <ProtectedDashboard allowedRole="ADMIN">
              <AdminAdmissions />
            </ProtectedDashboard>
          }
        />

        <Route
          path="/admin/dashboard/settings"
          element={
            <ProtectedDashboard allowedRole="ADMIN">
              <SchoolSettings />
            </ProtectedDashboard>
          }
        />

        <Route
          path="/admin/dashboard/admissions"
          element={
            <ProtectedDashboard allowedRole="ADMIN">
              <AdminAdmissions />
            </ProtectedDashboard>
          }
        />

        <Route
          path="/super-admin/dashboard/settings"
          element={
            <ProtectedDashboard allowedRole="SUPER_ADMIN">
              <SchoolSettings />
            </ProtectedDashboard>
          }
        />


        <Route
          path="/admin/dashboard/users"
          element={
            <ProtectedDashboard allowedRole="ADMIN">
              <AdminUserManagement />
            </ProtectedDashboard>
          }
        />



    </Routes>

    
  );
}


createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>);
