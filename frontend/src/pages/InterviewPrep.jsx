import React, { useState } from 'react';
import API from '../services/api';

const InterviewPrep = () => {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  // 1. AI Q&A generate karne ka logic (Loading state ke sath)
  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError('');
    setResult('');
    setSaveStatus('');

    try {
      const res = await API.post('/ai/interview-prep', { topic });
      // Backend response structure ke hisab se data set karein
      setResult(res.data.response || res.data.result || res.data);
    } catch (err) {
      console.error(err);
      setError('AI generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Result ko direct "My Notes" me save karne ka logic
  const handleSaveToNotes = async () => {
    if (!result) return;
    try {
      setSaveStatus('Saving to notes...');
      await API.post('/notes', {
        title: `Interview Prep: ${topic}`,
        content: typeof result === 'string' ? result : JSON.stringify(result, null, 2)
      });
      setSaveStatus('Saved to My Notes successfully! 🎉');
      setTimeout(() => setSaveStatus(''), 3500);
    } catch (err) {
      console.error(err);
      setSaveStatus('Failed to save note. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 flex flex-col items-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-3xl space-y-8">
        
        {/* Header Tag */}
        <div className="text-center space-y-3">
          <span className="inline-block px-3 py-1 bg-purple-900/60 border border-purple-500/40 text-purple-300 rounded-full text-xs font-semibold tracking-wide">
            ✦ Placement Preparation Engine
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
            Technical Interview Q&A
          </h1>
          <p className="text-sm text-gray-400 max-w-lg mx-auto">
            Enter any language, library, or engineering topic to generate tailored technical interview questions with model answers.
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. React hooks, Node.js event loop, System design..."
            className="flex-1 px-4 py-3 bg-[#161b22] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
          />
          <button
            type="submit"
            disabled={loading || !topic.trim()}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium rounded-lg transition duration-200 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? 'Generating Q&A...' : 'Generate Q&A'}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-950/40 border border-red-800 text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Output & Save Section */}
        {result && (
          <div className="p-6 bg-[#161b22] border border-gray-800 rounded-xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h2 className="text-lg font-semibold text-purple-300">Generated Questions & Solutions</h2>
              <button
                type="button"
                onClick={handleSaveToNotes}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium rounded-md transition cursor-pointer"
              >
                Save to My Notes
              </button>
            </div>

            {/* Save Status Message */}
            {saveStatus && (
              <p className="text-xs font-medium text-emerald-400">
                {saveStatus}
              </p>
            )}

            {/* Result Content */}
            <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
              {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default InterviewPrep;