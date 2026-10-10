const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

// 1. CREATE NOTE (POST /api/notes)
router.post('/', async (req, res) => {
    try {
        const { title, subject, content, uploadedBy } = req.body;

        if (!title || !subject || !content) {
            return res.status(400).json({ message: 'Title, subject, and content are required' });
        }

        const newNote = new Note({
            title,
            subject,
            content,
            uploadedBy: uploadedBy || 'Student'
        });

        const savedNote = await newNote.save();
        res.status(201).json({ message: 'Note added successfully!', note: savedNote });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// 2. GET ALL NOTES (GET /api/notes)
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;