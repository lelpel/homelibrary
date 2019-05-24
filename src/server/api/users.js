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

router.get('/', (req, res) => {
  User.find()
    .sort({ name: 1 })
    .then(books => res.json(books))
    .catch(err => res.json({ error: 'No books found' }));
});

router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  // return res.status(404);
  // const { errors, isValid } = validateRegisterInput(req.body);

  //   if (!isValid) {
  //     return res.status(400).json(errors);
  //   }

  console.log(req.body);

  User.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({
      name: req.body.name,
      password: req.body.password
    });

    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        // if (err) throw err;
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
  const { name, password } = req.body;

  User.findOne({ name }).then(user => {
    // Check for user
    if (!user) {
      const error = {
        name: 'Absolutely no user'
      };
      return res.status(404).json(error);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name }; // JWT Payload

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
