const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// User Model
const User = require('../../models/User');

// @route   GET api/users
// @desc    Get one Users
// @access  Public
router.get('/', (req, res) => {
    User.findOne()
        .sort({ username: -1 })
        .then(user => res.json(user));
})

// @route   POST api/users
// @desc    Create A User
// @access  Public
router.post('/', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(user => {
                res.json({
                    user: {
                        username: user.username,
                        password: user.password
                    }
                });
            });
        });
    });
});


module.exports = router;