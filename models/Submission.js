const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SubmissionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        default: "Test Author"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Submission = mongoose.model('submission', SubmissionSchema);