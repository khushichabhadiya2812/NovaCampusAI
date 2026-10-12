import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = 'https://novacampusai.onrender.com';

const Summarizer = () => {
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [notesText, setNotesText] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [saveMsg, setSaveMsg] = useState('');

    // AI se summary mangwane ka function
    const handleSummarize = async () => {
        if (!notesText.trim()) {
            setErrorMsg('Please enter notes text to summarize.');
            return;
        }

        setLoading(true);
        setErrorMsg('');
        setSaveMsg('');

        try {
            const res = await axios.post(`${BACKEND_URL}/api/ai/summarize`, {
                text: notesText
            });

            const resultText = res.data.summary || res.data.result;
            setSummary(resultText);
        } catch (err) {
            console.error('AI Error:', err);
            setErrorMsg('AI generation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Note ko Database me Save karne ka function
    const handleSaveNote = async () => {
        if (!summary) return;

        setSaveLoading(true);
        setSaveMsg('');

        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            await axios.post(
                `${BACKEND_URL}/api/notes`,
                {
                    title: topic || subject || 'Study Revision',
                    subject: subject || 'General',
                    content: summary
                },
                { headers }
            );

            setSaveMsg('Note saved successfully!');
        } catch (err) {
            console.error('Save Note Error:', err);
            setSaveMsg('Failed to save note');
        } finally {
            setSaveLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#070b14] text-white flex flex-col items-center py-10 px-4">
            {/* Header Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 text-xs font-semibold mb-6">
                <span>✦ Smart Notes Summarizer</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
                AI Notes Summarizer
            </h1>
            <p className="text-gray-400 text-sm text-center max-w-lg mb-8">
                Paste your raw study notes, textbook paragraphs, or syllabus topics to condense them into clean, revision-ready bullet points.
            </p>

            {/* Input Card */}
            <div className="w-full max-w-2xl bg-[#0f172a] border border-gray-800 rounded-xl p-6 shadow-xl mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <input
                        type="text"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="bg-[#1e293b] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="bg-[#1e293b] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                </div>

                <textarea
                    rows="6"
                    placeholder="Enter study notes here..."
                    value={notesText}
                    onChange={(e) => setNotesText(e.target.value)}
                    className="w-full bg-[#1e293b] border border-gray-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-500 mb-4 resize-none"
                ></textarea>

                <button
                    onClick={handleSummarize}
                    disabled={loading}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-lg transition disabled:opacity-50"
                >
                    {loading ? 'Summarizing...' : 'Summarize Notes'}
                </button>

                {errorMsg && (
                    <div className="mt-4 p-3 bg-red-950/40 border border-red-800 text-red-400 rounded-lg text-xs">
                        {errorMsg}
                    </div>
                )}
            </div>

            {/* Output Summary Card */}
            {summary && (
                <div className="w-full max-w-2xl bg-[#0f172a] border border-gray-800 rounded-xl p-6 shadow-xl">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
                        <div>
                            <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                                Key Takeaways & Summary
                            </h2>
                            {saveMsg && (
                                <span className={`text-xs ${saveMsg.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                                    {saveMsg}
                                </span>
                            )}
                        </div>

                        <button
                            onClick={handleSaveNote}
                            disabled={saveLoading}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition disabled:opacity-50"
                        >
                            {saveLoading ? 'Saving...' : 'Save to My Notes'}
                        </button>
                    </div>

                    <div className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                        {summary}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Summarizer;