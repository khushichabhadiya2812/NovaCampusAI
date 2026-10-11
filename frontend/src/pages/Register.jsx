import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await API.post('/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '440px', margin: '4.5rem auto', padding: '0 1rem' }}>
      <div style={{
        backgroundColor: '#0d1222',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        padding: '2.5rem 2rem',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.9rem',
            fontWeight: '800',
            letterSpacing: '-0.5px',
            background: 'linear-gradient(135deg, #e2e8f0 0%, #c084fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.4rem'
          }}>
            Create Account
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Join NovaCampusAI for smart revision & prep</p>
        </div>

        {error && (
          <div style={{
            padding: '0.8rem 1rem',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            borderRadius: '8px',
            marginBottom: '1.2rem',
            fontSize: '0.88rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1' }}>Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Alex Sharma"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                color: '#fff',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1' }}>Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="student@campus.edu"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                color: '#fff',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1' }}>Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                color: '#fff',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '0.6rem',
              padding: '0.85rem',
              borderRadius: '10px',
              border: 'none',
              background: loading ? '#475569' : 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)',
              color: '#fff',
              fontWeight: '600',
              fontSize: '0.95rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 0 16px rgba(147, 51, 234, 0.45)'
            }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.8rem', fontSize: '0.88rem', color: '#94a3b8' }}>
          Already registered?{' '}
          <Link to="/login" style={{ color: '#c084fc', textDecoration: 'none', fontWeight: '600' }}>
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;