const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Post Model
const Submission = require('../../models/Submission');

// @route   GET api/posts
// @desc    Get All Posts
// @access  Public
router.get('/',  (req, res) => {
    Submission.find()
        .sort({ date: -1 })
        .then(submissions => res.json(submissions))
});

// @route   GET api/posts/:id
// @desc    Get Specific Post
// @access  Public
router.get('/:id', (req, res) => {
    Submission.findById(req.params.id)
    .then(submission => res.json({submission}))
});

// @route   POST api/posts
// @desc    Create A Posts
// @access  Public
router.post('/', auth, (req, res) => {
    const newSubmission = new Submission({
        title: req.body.title,
        url: req.body.url,
        author: req.body.author
    });
    newSubmission.save().then(submission => res.json(submission));
});

// @route   DELETE api/posts/:id
// @desc    Delete A Post
// @access  Public
router.delete('/:id', auth, (req, res) => {
    Submission.findById(req.params.id)
    .then(submission => submission.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});



module.exports = router;