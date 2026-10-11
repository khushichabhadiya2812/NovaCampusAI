import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      width: '100%',
      backgroundColor: 'var(--bg-nav)',
      borderTop: '1px solid var(--card-border)',
      padding: '4.5rem 6% 2.5rem 6%',
      boxSizing: 'border-box',
      marginTop: 'auto',
      transition: 'background-color 0.25s ease'
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.4fr 0.9fr 1.2fr 1.1fr',
        gap: '3.5rem',
        paddingBottom: '3rem',
        borderBottom: '1px solid var(--card-border)'
      }}>
        {/* Column 1: Brand Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.2rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z"
                fill="var(--heading-color)"
              />
            </svg>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              color: 'var(--heading-color)',
              letterSpacing: '-0.3px'
            }}>
              NovaCampusAI
            </span>
          </div>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            lineHeight: '1.7',
            maxWidth: '360px',
            margin: 0
          }}>
            Empowering students with AI-powered personalized interview preparation, key concept extraction, and smart study revision notes.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h4 style={{
            color: 'var(--text-primary)',
            fontSize: '1.1rem',
            fontWeight: '700',
            marginBottom: '1.2rem'
          }}>
            Navigation
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Home</Link></li>
            <li><Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>About Us</Link></li>
            <li><Link to="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Login</Link></li>
            <li><Link to="/register" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Register</Link></li>
          </ul>
        </div>

        {/* Column 3: Key Features */}
        <div>
          <h4 style={{
            color: 'var(--text-primary)',
            fontSize: '1.1rem',
            fontWeight: '700',
            marginBottom: '1.2rem'
          }}>
            Key Features
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li>
              <Link to="/interview-prep" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>
                AI Interview Prep
              </Link>
            </li>
            <li>
              <Link to="/summarize" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>
                Smart Notes Summarizer
              </Link>
            </li>
            <li>
              <Link to="/my-notes" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>
                Personal Revision Vault
              </Link>
            </li>
            <li>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Technical Model Answers
              </span>
            </li>
          </ul>
        </div>

        {/* Column 4: Connect With Us & Social Icons */}
        <div>
          <h4 style={{
            color: 'var(--text-primary)',
            fontSize: '1.1rem',
            fontWeight: '700',
            marginBottom: '1.2rem'
          }}>
            Connect With Us
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.2rem', margin: '0 0 1.2rem 0' }}>
            Email: support@novacampusai.com
          </p>

          {/* Social Media SVG Icons */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            {/* GitHub */}
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div style={{
        textAlign: 'center',
        paddingTop: '2rem',
        color: 'var(--text-secondary)',
        fontSize: '0.88rem',
        fontWeight: '500'
      }}>
        © 2026 NovaCampusAI. All Rights Reserved. Built with React & MERN Stack.
      </div>
    </footer>
  );
};

export default Footer;