import React, { useState } from 'react';
import API from '../services/api';

const Summarizer = () => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  const handleSummarize = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError('');
    setSummary('');
    setSaveStatus('');

    try {
      const response = await API.post('/ai/summarize', { text });
      setSummary(response.data.summary);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to summarize text');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToNotes = async () => {
    const noteTitle = title.trim() || 'AI Summary Notes';
    const noteSubject = subject.trim() || 'General';

    try {
      setSaveStatus('Saving...');
      // Yahan ab title, subject, aur content teeno fields jaa rahi hain
      await API.post('/notes', {
        title: noteTitle,
        subject: noteSubject,
        content: summary
      });
      setSaveStatus('Saved to My Notes! ✓');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      setSaveStatus(err.response?.data?.message || 'Please login to save notes.');
    }
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
          ✦ Smart Study Notes Engine
        </div>
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: '900',
          letterSpacing: '-1.2px',
          color: 'var(--heading-color)',
          marginBottom: '0.6rem'
        }}>
          AI Notes Summarizer
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto', lineHeight: '1.6' }}>
          Paste lecture scripts, textbooks, or documentation to generate clear, revision-ready bullet points.
        </p>
      </div>

      {/* Form Input Card */}
      <form onSubmit={handleSummarize} style={{
        backgroundColor: 'var(--btn-secondary-bg)',
        border: '1.5px solid var(--btn-secondary-border)',
        borderRadius: '20px',
        padding: '1.8rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Topic / Note Title (e.g. ADO.NET Architecture)"
            style={{
              padding: '0.9rem 1.2rem',
              backgroundColor: 'transparent',
              border: '1px solid var(--btn-secondary-border)',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />

          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject / Category (e.g. Database Systems, Web Dev)"
            style={{
              padding: '0.9rem 1.2rem',
              backgroundColor: 'transparent',
              border: '1px solid var(--btn-secondary-border)',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />
        </div>

        <textarea
          rows="7"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your study materials or concepts here..."
          style={{
            padding: '1rem 1.2rem',
            backgroundColor: 'transparent',
            border: '1px solid var(--btn-secondary-border)',
            borderRadius: '12px',
            color: 'var(--text-primary)',
            fontSize: '0.95rem',
            outline: 'none',
            resize: 'vertical',
            lineHeight: '1.6'
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            alignSelf: 'flex-start',
            padding: '0.9rem 1.9rem',
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
          {loading ? 'Summarizing...' : 'Summarize Notes'}
        </button>
      </form>

      {/* Error Message */}
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

      {/* Loading State */}
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
          ✦ Gemini is extracting high-yield points from your notes...
        </div>
      )}

      {/* Summary Output Card */}
      {summary && (
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
            <div>
              <span style={{ color: 'var(--heading-color)', fontWeight: '800', fontSize: '1.2rem', display: 'block' }}>
                {title.trim() || 'Summary Output'}
              </span>
              {subject.trim() && (
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Category: {subject}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'center' }}>
              {saveStatus && (
                <span style={{
                  color: saveStatus.includes('✓') ? '#10b981' : '#f87171',
                  fontSize: '0.88rem',
                  fontWeight: '600'
                }}>
                  {saveStatus}
                </span>
              )}
              <button
                onClick={handleSaveToNotes}
                style={{
                  padding: '0.55rem 1.2rem',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#10b981',
                  color: '#fff',
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}
              >
                Save to Database
              </button>
            </div>
          </div>

          <div style={{
            color: 'var(--text-primary)',
            lineHeight: '1.8',
            fontSize: '1rem',
            whiteSpace: 'pre-wrap'
          }}>
            {summary}
          </div>
        </div>
      )}
    </div>
  );
};

export default Summarizer;