const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

const Book = require('../models/Book');

router.get('/', (req, res) => {
  Book.find()
    .sort({ name: 1 })
    .then(books => res.json(books))
    .catch(err => res.json({ error: 'No books found' }));
});

router.get('/taken', (req, res) => {
  Book.find({ taken: true })
    .sort({ takenDate: -1 })
    .then(books => res.json(books))
    .catch(err => res.json({ error: 'No taken books found' }));
});

module.exports = router;
