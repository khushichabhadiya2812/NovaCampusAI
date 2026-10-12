import React, { useState } from 'react';
import API from '../services/api';

const InterviewPrep = () => {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError('');
    setResult('');
    setSaveStatus('');

    try {
      const res = await API.post('/ai/interview-prep', { topic });
      setResult(res.data.response || res.data.result || res.data);
    } catch (err) {
      console.error(err);
      setError('AI generation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToNotes = async () => {
    if (!result) return;
    try {
      setSaveStatus('Saving...');
      await API.post('/notes', {
        title: `Interview Prep: ${topic}`,
        content: typeof result === 'string' ? result : JSON.stringify(result, null, 2)
      });
      setSaveStatus('Saved to My Notes! ✓');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      console.error(err);
      setSaveStatus('Failed to save note');
    }
  };

  return (
    <div style={{ minHeight: '80vh', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Badge */}
      <div style={{
        background: 'linear-gradient(90deg, #0284c7, #2563eb)',
        color: '#ffffff',
        padding: '6px 16px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: '600',
        marginBottom: '20px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        ✦ Placement Preparation Engine
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: '36px',
        fontWeight: '800',
        color: '#c084fc',
        margin: '0 0 12px 0',
        textAlign: 'center'
      }}>
        Technical Interview Q&A
      </h1>

      <p style={{
        color: '#94a3b8',
        fontSize: '15px',
        maxWidth: '650px',
        textAlign: 'center',
        margin: '0 0 40px 0',
        lineHeight: '1.5'
      }}>
        Enter any language, library, or engineering topic to generate tailored technical interview questions with model answers.
      </p>

      {/* Input Form Box */}
      <form onSubmit={handleGenerate} style={{
        width: '100%',
        maxWidth: '750px',
        background: '#0d1117',
        border: '1px solid #30363d',
        borderRadius: '14px',
        padding: '8px 10px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. React hooks, Node.js event loop, System design..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#f0f6fc',
            fontSize: '15px',
            padding: '10px 14px'
          }}
        />
        <button
          type="submit"
          disabled={loading || !topic.trim()}
          style={{
            background: '#6366f1',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '12px 24px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading || !topic.trim() ? 0.7 : 1,
            transition: 'background 0.2s',
            whiteSpace: 'nowrap'
          }}
        >
          {loading ? 'Generating Q&A...' : 'Generate Q&A'}
        </button>
      </form>

      {/* Error Card */}
      {error && (
        <div style={{
          width: '100%',
          maxWidth: '750px',
          marginTop: '24px',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          color: '#f87171',
          padding: '14px 18px',
          borderRadius: '10px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      {/* Result Display Card */}
      {result && (
        <div style={{
          width: '100%',
          maxWidth: '750px',
          marginTop: '28px',
          background: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '14px',
          padding: '24px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #30363d',
            paddingBottom: '12px',
            marginBottom: '16px'
          }}>
            <h3 style={{ margin: 0, color: '#c084fc', fontSize: '18px' }}>Model Questions & Solutions</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {saveStatus && <span style={{ fontSize: '13px', color: '#4ade80' }}>{saveStatus}</span>}
              <button
                type="button"
                onClick={handleSaveToNotes}
                style={{
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '7px 14px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Save to My Notes
              </button>
            </div>
          </div>

          <div style={{
            color: '#e6edf3',
            fontSize: '14.5px',
            lineHeight: '1.7',
            whiteSpace: 'pre-wrap'
          }}>
            {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
          </div>
        </div>
      )}

    </div>
  );
};

export default InterviewPrep;