import React, { useEffect, useState } from 'react';
import API from '../services/api';

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await API.get('/notes');
      setNotes(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Login to view your saved notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      alert('Could not delete note');
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '3rem auto', padding: '0 1.5rem', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{
            fontSize: '2.6rem',
            fontWeight: '900',
            letterSpacing: '-1px',
            color: 'var(--heading-color)',
            margin: 0
          }}>
            My Saved Notes 📚
          </h1>
          <p style={{ color: 'var(--text-secondary)', margin: '0.4rem 0 0 0', fontSize: '1.05rem' }}>
            Your personalized study revision library
          </p>
        </div>
      </div>

      {loading && (
        <div style={{ color: 'var(--heading-color)', textAlign: 'center', padding: '3rem', fontWeight: '600' }}>
          Loading your notes...
        </div>
      )}

      {error && (
        <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '12px' }}>
          {error}
        </div>
      )}

      {!loading && notes.length === 0 && !error && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: 'var(--btn-secondary-bg)',
          borderRadius: '20px',
          border: '1.5px dashed var(--btn-secondary-border)',
          color: 'var(--text-secondary)'
        }}>
          No notes saved yet. Head over to the Summarizer to save your first note!
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {notes.map((note) => (
          <div key={note._id} style={{
            backgroundColor: 'var(--btn-secondary-bg)',
            border: '1.5px solid var(--btn-secondary-border)',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.04)'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.15rem', fontWeight: '700', margin: 0 }}>
                  {note.title}
                </h3>
                <button
                  onClick={() => handleDelete(note._id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    padding: '0.2rem'
                  }}
                >
                  ✕
                </button>
              </div>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.92rem',
                lineHeight: '1.65',
                whiteSpace: 'pre-wrap',
                maxHeight: '180px',
                overflowY: 'auto'
              }}>
                {note.content}
              </p>
            </div>
            <div style={{
              borderTop: '1px solid var(--btn-secondary-border)',
              paddingTop: '0.8rem',
              marginTop: '1.2rem',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)'
            }}>
              Saved on {new Date(note.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyNotes;