const express = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const passport = require('passport');
const keys = require('../keys');

const router = express.Router();

// const validateRegisterInput = require('../../validation/register');
// const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('./../models/User');

router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  // const { errors, isValid } = validateRegisterInput(req.body);

  //   if (!isValid) {
  //     return res.status(400).json(errors);
  //   }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({
      name: req.body.name,
      password: req.body.password
    });

    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  // const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  //   if (!isValid) {
  //     return res.status(400).json(errors);
  //   }

  const { name, password } = req.body;

  // Find user by email
  User.findOne({ name }).then(user => {
    // Check for user
    if (!user) {
      const error = {
        name: 'User already exists'
      };
      return res.status(404).json(error);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        const error = {
          name: 'Password incorrect'
        };
        return res.status(400).json(error);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name
    });
  }
);

module.exports = router;
