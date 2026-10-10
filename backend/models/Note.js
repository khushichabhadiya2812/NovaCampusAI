const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: String,
        default: 'Student'
    }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);