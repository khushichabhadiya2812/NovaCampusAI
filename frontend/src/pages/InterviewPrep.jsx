import React, { useState } from 'react';
import API from '../services/api';

const InterviewPrep = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError('');
    setQuestions('');

    try {
      const response = await API.post('/ai/interview-prep', { topic });
      setQuestions(response.data.questions);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate interview questions');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(questions);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '3rem auto', padding: '0 1.5rem', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.4rem 1.1rem',
          borderRadius: '9999px',
          backgroundColor: 'var(--badge-bg)',
          color: 'var(--badge-text)',
          fontSize: '0.85rem',
          fontWeight: '700',
          marginBottom: '1.2rem',
          boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)'
        }}>
          ✦ Placement Preparation Engine
        </div>
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: '900',
          letterSpacing: '-1.2px',
          color: 'var(--heading-color)',
          marginBottom: '0.6rem'
        }}>
          Technical Interview Q&A
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto', lineHeight: '1.6' }}>
          Enter any language, library, or engineering topic to generate tailored technical interview questions with model answers.
        </p>
      </div>

      {/* Input Box Card */}
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        gap: '0.8rem',
        padding: '0.6rem',
        borderRadius: '16px',
        backgroundColor: 'var(--btn-secondary-bg)',
        border: '1.5px solid var(--btn-secondary-border)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
        marginBottom: '2rem'
      }}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. React Virtual DOM, MongoDB Sharding, Docker Containers..."
          style={{
            flex: 1,
            padding: '0.9rem 1.2rem',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.9rem 1.8rem',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: loading ? '#94a3b8' : 'var(--btn-primary-bg)',
            color: '#fff',
            fontWeight: '700',
            fontSize: '0.95rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 14px var(--btn-primary-shadow)',
            transition: 'all 0.2s ease'
          }}
        >
          {loading ? 'Analyzing...' : 'Generate Q&A'}
        </button>
      </form>

      {/* Error View */}
      {error && (
        <div style={{
          padding: '1rem 1.2rem',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '12px',
          color: '#ef4444',
          marginBottom: '1.5rem',
          fontSize: '0.95rem'
        }}>
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          borderRadius: '16px',
          border: '1.5px dashed var(--btn-secondary-border)',
          color: 'var(--heading-color)',
          fontSize: '1.1rem',
          fontWeight: '600'
        }}>
          ✦ Gemini is creating personalized technical questions for {topic}...
        </div>
      )}

      {/* Result Card */}
      {questions && (
        <div style={{
          backgroundColor: 'var(--btn-secondary-bg)',
          border: '1.5px solid var(--btn-secondary-border)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.4rem',
            borderBottom: '1px solid var(--btn-secondary-border)',
            paddingBottom: '0.9rem'
          }}>
            <span style={{ color: 'var(--heading-color)', fontWeight: '800', fontSize: '1.2rem' }}>
              Generated Interview Q&A
            </span>
            <button
              onClick={handleCopy}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '8px',
                border: '1px solid var(--btn-secondary-border)',
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {copied ? '✓ Copied' : 'Copy Questions'}
            </button>
          </div>

          <div style={{
            color: 'var(--text-primary)',
            lineHeight: '1.8',
            fontSize: '1rem',
            whiteSpace: 'pre-wrap'
          }}>
            {questions}
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPrep;