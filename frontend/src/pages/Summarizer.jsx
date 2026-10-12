import React, { useState } from 'react';
import API from '../services/api';

const Summarizer = () => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
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
      const res = await API.post('/ai/summarize', { text });
      const output = res.data.summary || res.data.result || res.data;
      setSummary(typeof output === 'string' ? output : JSON.stringify(output, null, 2));
    } catch (err) {
      console.error(err);
      setError('AI generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToNotes = async () => {
    if (!summary) return;
    try {
      setSaveStatus('Saving...');
      await API.post('/notes', {
        title: title || subject ? `Summary: ${title || subject}` : 'Study Notes Summary',
        content: summary
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
        ✦ Smart Notes Summarizer
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: '36px',
        fontWeight: '800',
        color: '#c084fc',
        margin: '0 0 12px 0',
        textAlign: 'center'
      }}>
        AI Notes Summarizer
      </h1>

      <p style={{
        color: '#94a3b8',
        fontSize: '15px',
        maxWidth: '650px',
        textAlign: 'center',
        margin: '0 0 35px 0',
        lineHeight: '1.5'
      }}>
        Paste your raw study notes, textbook paragraphs, or syllabus topics to condense them into clean, revision-ready bullet points.
      </p>

      {/* Main Container Card */}
      <form onSubmit={handleSummarize} style={{
        width: '100%',
        maxWidth: '800px',
        background: '#0d1117',
        border: '1px solid #30363d',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {/* Top 2 Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Topic / Title (e.g. LSRW)"
            style={{
              background: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '10px',
              color: '#f0f6fc',
              fontSize: '14px',
              padding: '12px 14px',
              outline: 'none'
            }}
          />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject / Category"
            style={{
              background: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '10px',
              color: '#f0f6fc',
              fontSize: '14px',
              padding: '12px 14px',
              outline: 'none'
            }}
          />
        </div>

        {/* Text Area */}
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste raw notes or textbook concepts here..."
          style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '10px',
            color: '#f0f6fc',
            fontSize: '14px',
            padding: '14px',
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
        />

        {/* Action Button */}
        <div>
          <button
            type="submit"
            disabled={loading || !text.trim()}
            style={{
              background: '#6366f1',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: loading || !text.trim() ? 'not-allowed' : 'pointer',
              opacity: loading || !text.trim() ? 0.6 : 1,
              transition: 'background 0.2s'
            }}
          >
            {loading ? 'Summarizing...' : 'Summarize Notes'}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div style={{
          width: '100%',
          maxWidth: '800px',
          marginTop: '20px',
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

      {/* Summary Output Card */}
      {summary && (
        <div style={{
          width: '100%',
          maxWidth: '800px',
          marginTop: '24px',
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
            <h3 style={{ margin: 0, color: '#c084fc', fontSize: '18px' }}>Key Takeaways & Summary</h3>
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
            {summary}
          </div>
        </div>
      )}

    </div>
  );
};

export default Summarizer;