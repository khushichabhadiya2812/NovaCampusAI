const express = require('express');
const router = express.Router();

// Helper to call Gemini using the exact cURL configuration
async function callGemini(promptText) {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': apiKey
        },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: promptText }]
            }]
        })
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error ? data.error.message : 'Gemini API Error');
    }

    return data.candidates[0].content.parts[0].text;
}

// 1. NOTES SUMMARIZER (POST /api/ai/summarize)
router.post('/summarize', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text is required for summarization' });
        }

        const prompt = `You are an academic assistant for college students. Summarize the following study text into clear, high-yield bullet points with key takeaways:\n\n${text}`;
        const summary = await callGemini(prompt);

        res.json({ summary });
    } catch (error) {
        res.status(500).json({ message: 'AI generation failed', error: error.message });
    }
});

// 2. INTERVIEW PREP (POST /api/ai/interview-prep)
router.post('/interview-prep', async (req, res) => {
    try {
        const { topic } = req.body;
        if (!topic) {
            return res.status(400).json({ message: 'Topic is required' });
        }

        const prompt = `Generate 5 common technical interview questions and concise model answers for an MCA/CS student on the topic: "${topic}".`;
        const questions = await callGemini(prompt);

        res.json({ questions });
    } catch (error) {
        res.status(500).json({ message: 'AI generation failed', error: error.message });
    }
});

module.exports = router;