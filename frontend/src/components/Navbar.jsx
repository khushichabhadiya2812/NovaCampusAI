import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const [isLight, setIsLight] = useState(localStorage.getItem('theme') === 'light');

  useEffect(() => {
    if (isLight) {
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLight]);

  const toggleTheme = () => {
    setIsLight(!isLight);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isCurrent = (path) => location.pathname === path;

  return (
    <nav style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.2rem 6%',
      backgroundColor: 'var(--bg-nav)',
      boxSizing: 'border-box'
    }}>
      {/* Brand Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z"
            fill={isLight ? '#554fe8' : '#a855f7'}
          />
        </svg>

        <span style={{
          fontSize: '1.45rem',
          fontWeight: '800',
          letterSpacing: '-0.4px',
          color: isLight ? '#554fe8' : '#a855f7'
        }}>
          NovaCampusAI
        </span>
      </Link>

      {/* Nav Menu Items */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <Link to="/" style={{
          padding: '0.45rem 1.2rem',
          borderRadius: '9999px',
          textDecoration: 'none',
          fontSize: '0.95rem',
          fontWeight: '600',
          backgroundColor: isCurrent('/') ? 'var(--nav-active-bg)' : 'transparent',
          color: isCurrent('/') ? 'var(--nav-active-text)' : 'var(--nav-link)'
        }}>
          Home
        </Link>

        <Link to="/interview-prep" style={{
          padding: '0.45rem 1.2rem',
          borderRadius: '9999px',
          textDecoration: 'none',
          fontSize: '0.95rem',
          fontWeight: '600',
          backgroundColor: isCurrent('/interview-prep') ? 'var(--nav-active-bg)' : 'transparent',
          color: isCurrent('/interview-prep') ? 'var(--nav-active-text)' : 'var(--nav-link)'
        }}>
          Interview Prep
        </Link>

        <Link to="/summarize" style={{
          padding: '0.45rem 1.2rem',
          borderRadius: '9999px',
          textDecoration: 'none',
          fontSize: '0.95rem',
          fontWeight: '600',
          backgroundColor: isCurrent('/summarize') ? 'var(--nav-active-bg)' : 'transparent',
          color: isCurrent('/summarize') ? 'var(--nav-active-text)' : 'var(--nav-link)'
        }}>
          Summarizer
        </Link>

        <Link to="/my-notes" style={{
          padding: '0.45rem 1.2rem',
          borderRadius: '9999px',
          textDecoration: 'none',
          fontSize: '0.95rem',
          fontWeight: '600',
          backgroundColor: isCurrent('/my-notes') ? 'var(--nav-active-bg)' : 'transparent',
          color: isCurrent('/my-notes') ? 'var(--nav-active-text)' : 'var(--nav-link)'
        }}>
          My Notes
        </Link>

        {/* Circular Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'var(--theme-btn-bg)',
            border: '1px solid var(--theme-btn-border)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            margin: '0 0.4rem'
          }}
        >
          {isLight ? (
            /* Crescent Moon for Light Mode */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#f59e0b" />
            </svg>
          ) : (
            /* Simple Minimal Golden Sun */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4" fill="#facc15" />
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>

        {token ? (
          <button 
            onClick={handleLogout}
            style={{
              padding: '0.55rem 1.2rem',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <Link to="/login" style={{
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: '600',
              padding: '0.5rem 0.8rem'
            }}>
              Login
            </Link>
            <Link to="/register" style={{
              padding: '0.6rem 1.4rem',
              background: '#554fe8',
              color: '#ffffff',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.95rem',
              boxShadow: '0 4px 14px rgba(85, 79, 232, 0.4)',
              display: 'inline-block'
            }}>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;