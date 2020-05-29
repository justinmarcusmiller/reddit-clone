const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");

// @route   GET api/users
// @desc    Get one Users
// @access  Public
router.get("/", (req, res) => {
  User.find()
    .sort({ username: -1 })
    .then((users) => res.json(users));
});

// @route   POST api/users
// @desc    Create A User
// @access  Public
router.post("/", (req, res) => {
  const { username, password } = req.body;

  if(!username || !password) {
    return res.status(400).json({msg: 'Please enter all fields '});
  }

  // Check for existing user
  User.findOne({ username }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id},
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.username,
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
