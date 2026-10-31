import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileText,
  Users,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import './DashboardLayout.css';

export default function DashboardLayout({
  title,
  subtitle,
  role,
  children,
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

const [notifications, setNotifications] = useState([]);
const [unreadCount, setUnreadCount] = useState(0);
const [notificationsLoading, setNotificationsLoading] = useState(false);
const [notificationsError, setNotificationsError] = useState('');



React.useEffect(() => {
  if (!notificationsOpen) return;

  const loadNotifications = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setNotificationsError('Please log in again to view notifications.');
      return;
    }

    setNotificationsLoading(true);
    setNotificationsError('');

    try {
      const response = await fetch(
        'http://localhost:3000/api/notifications',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to load notifications.');
      }

      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      setNotificationsError(
        error.message || 'Unable to load notifications.'
      );
    } finally {
      setNotificationsLoading(false);
    }
  };

  loadNotifications();
}, [notificationsOpen]);

React.useEffect(() => {
  if (!notificationsOpen) return;

  const loadNotifications = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setNotificationsError('Please log in again to view notifications.');
      return;
    }

    setNotificationsLoading(true);
    setNotificationsError('');

    try {
      const response = await fetch(
        'http://localhost:3000/api/notifications',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to load notifications.');
      }

      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      setNotificationsError(
        error.message || 'Unable to load notifications.'
      );
    } finally {
      setNotificationsLoading(false);
    }
  };

  loadNotifications();
}, [notificationsOpen]);



  let user = {};
  try {
    user = JSON.parse(localStorage.getItem('user') || '{}');
  } catch {
    user = {};
  }

const navigation = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
  { label: 'Academics', icon: BookOpen, path: '/student/dashboard/academics' },
  { label: 'Timetable', icon: CalendarDays, path: '/student/dashboard/timetable' },
  { label: 'Assignments', icon: ClipboardList, path: '/student/dashboard/assignments' },
  { label: 'Results', icon: FileText, path: '/student/dashboard/results' },
  { label: 'People', icon: Users, path: '/student/dashboard/people' },
  { label: 'Settings', icon: Settings, path: '/student/dashboard/settings' },
];


  function handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  }

  return (
    <div className="dashboard-shell">
      <aside className={`dashboard-sidebar ${menuOpen ? 'is-open' : ''}`}>
        <Link
          to="/"
          className="dashboard-brand"
          onClick={() => setMenuOpen(false)}
        >
          <span className="dashboard-brand-icon">
            <GraduationCap size={25} />
          </span>
          <span>
            <strong>AUD</strong>
            <small>Islamic Secondary School</small>
          </span>
        </Link>

        <div className="dashboard-role">
          <span className="dashboard-avatar">
            {(user.email || 'U').charAt(0).toUpperCase()}
          </span>
          <span>
            <strong>{role}</strong>
            <small>{user.email || 'School portal user'}</small>
          </span>
        </div>

        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`dashboard-nav-link ${
                  item.label === 'Dashboard' ? 'active' : ''
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          className="dashboard-logout"
          type="button"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          Sign out
        </button>
      </aside>

      {menuOpen && (
        <button
          type="button"
          className="dashboard-overlay"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <button
            type="button"
            className="dashboard-menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="dashboard-breadcrumb">
            <span>School Portal</span>
            <span>/</span>
            <strong>{title}</strong>
          </div>

            <button
              type="button"
              className="dashboard-notifications"
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell size={20} />
            </button>

        </header>


{notificationsOpen && (
  <section>

<div className="dashboard-notifications-panel-header">
  <div>
    <h3>Notifications</h3>
    <p>
      {unreadCount > 0
        ? `${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`
        : 'Stay up to date with school activities.'}
    </p>
  </div>

  <button
    type="button"
    onClick={() => setNotificationsOpen(false)}
    aria-label="Close notifications"
  >
    ×
  </button>
</div>

<div className="dashboard-notifications-list">
  {notificationsLoading ? (
    <p className="dashboard-notifications-feedback">
      Loading notifications...
    </p>
  ) : notificationsError ? (
    <p className="dashboard-notifications-feedback">
      {notificationsError}
    </p>
  ) : notifications.length === 0 ? (
    <div className="dashboard-notifications-empty">
      <Bell size={28} />
      <strong>You're all caught up</strong>
      <p>New school announcements and academic updates will appear here.</p>
    </div>
  ) : (
    notifications.map((notification) => (
      <button
        type="button"
        key={notification._id}
        className={`dashboard-notification-item ${
          notification.isRead ? 'is-read' : 'is-unread'
        }`}
        onClick={async () => {
          if (notification.isRead) {
            if (notification.link) navigate(notification.link);
            return;
          }

          const token = localStorage.getItem('accessToken');

          try {
            const response = await fetch(
              `http://localhost:3000/api/notifications/${notification._id}/read`,
              {
                method: 'PATCH',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.message || 'Unable to update notification.');
            }

            setNotifications((current) =>
              current.map((item) =>
                item._id === notification._id
                  ? { ...item, isRead: true }
                  : item
              )
            );

            setUnreadCount((count) => Math.max(0, count - 1));

            if (notification.link) navigate(notification.link);
          } catch (error) {
            setNotificationsError(error.message || 'Unable to update notification.');
          }
        }}
      >
        <span className="dashboard-notification-item-title">
          {notification.title}
        </span>
        <span className="dashboard-notification-item-message">
          {notification.message}
        </span>
        <span className="dashboard-notification-item-date">
          {new Date(notification.createdAt).toLocaleString()}
        </span>
        {!notification.isRead && (
          <span className="dashboard-notification-unread-dot" />
        )}
      </button>
    ))
  )}
</div>

  </section>
)}

{notificationsOpen && (
  <section
    className="dashboard-notifications-panel"
    aria-label="Notifications panel"
  >
    <div className="dashboard-notifications-panel-header">
      <div>
        <h3>Notifications</h3>
        <p>Stay up to date with school activities.</p>
      </div>

      <button
        type="button"
        onClick={() => setNotificationsOpen(false)}
        aria-label="Close notifications"
      >
        ×
      </button>
    </div>

    <div className="dashboard-notifications-empty">
      <Bell size={28} />
      <strong>You're all caught up</strong>
      <p>New school announcements and academic updates will appear here.</p>
    </div>
  </section>
)}


        <section className="dashboard-content">
          <div className="dashboard-page-heading">
            <div>
              <p className="dashboard-eyebrow">{role} PORTAL</p>
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>
            <span className="dashboard-session">
              <span />
              Academic Portal
            </span>
          </div>

          {children}
        </section>
      </main>
    </div>
  );
}

