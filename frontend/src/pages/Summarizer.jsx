import React, { useState } from 'react';
import axios from 'axios';

// Backend Render URL
const API_BASE_URL = 'https://novacampusai.onrender.com';

const Summarizer = () => {
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [notesText, setNotesText] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [saveStatus, setSaveStatus] = useState('');

    // AI Summary Trigger
    const handleSummarize = async () => {
        if (!notesText.trim()) {
            setErrorMessage('Please enter notes to summarize.');
            return;
        }

        setLoading(true);
        setErrorMessage('');
        setSaveStatus('');

        try {
            const response = await axios.post(`${API_BASE_URL}/api/ai/summarize`, {
                text: notesText
            });

            const resultText = response.data.summary || response.data.result;
            setSummary(resultText);
        } catch (error) {
            console.error('Summarize Error:', error);
            setErrorMessage('AI generation failed. Server may be spinning up, please try once more.');
        } finally {
            setLoading(false);
        }
    };

    // Save to Database Trigger
    const handleSaveNote = async () => {
        if (!summary) return;

        setSaveLoading(true);
        setSaveStatus('');

        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            await axios.post(
                `${API_BASE_URL}/api/notes`,
                {
                    title: topic.trim() || subject.trim() || 'Study Revision',
                    subject: subject.trim() || 'General',
                    content: summary
                },
                { headers }
            );

            setSaveStatus('Note saved successfully!');
        } catch (error) {
            console.error('Save Note Error:', error);
            setSaveStatus('Failed to save note');
        } finally {
            setSaveLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#090d16] text-white flex flex-col items-center py-12 px-4 sm:px-6">
            <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-medium mb-6">
                <span>✦ Smart Notes Summarizer</span>
            </div>

            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-3 text-center">
                AI Notes Summarizer
            </h1>
            <p className="text-gray-400 max-w-xl text-center text-sm mb-8">
                Paste your raw study notes, textbook paragraphs, or syllabus topics to condense them into clean, revision-ready bullet points.
            </p>

            {/* Input Container */}
            <div className="w-full max-w-2xl bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#1F2937] border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full bg-[#1F2937] border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <textarea
                    rows="6"
                    placeholder="Enter notes here..."
                    value={notesText}
                    onChange={(e) => setNotesText(e.target.value)}
                    className="w-full bg-[#1F2937] border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 mb-5 resize-none"
                ></textarea>

                <button
                    onClick={handleSummarize}
                    disabled={loading}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/30 disabled:opacity-50"
                >
                    {loading ? 'Summarizing...' : 'Summarize Notes'}
                </button>

                {errorMessage && (
                    <div className="mt-4 p-3 bg-red-950/40 border border-red-800 text-red-400 rounded-xl text-xs">
                        {errorMessage}
                    </div>
                )}
            </div>

            {/* Summary Output Container */}
            {summary && (
                <div className="w-full max-w-2xl bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-5">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                                Key Takeaways & Summary
                            </h2>
                            {saveStatus && (
                                <span className={`text-xs ${saveStatus.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                                    {saveStatus}
                                </span>
                            )}
                        </div>

                        <button
                            onClick={handleSaveNote}
                            disabled={saveLoading}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition disabled:opacity-50"
                        >
                            {saveLoading ? 'Saving...' : 'Save to My Notes'}
                        </button>
                    </div>

                    <div className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm">
                        {summary}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Summarizer;