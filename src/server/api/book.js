const express = require('express');
const passport = require('passport');

const router = express.Router();

const Book = require('../models/Book');
const User = require('../models/User');

router.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err =>
      res.status(404).json({ error: 'No book found with that ID' })
    );
});

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newBook = new Book({
      author: req.body.author,
      name: req.body.name,
      published: req.body.published,
      user: req.user.id
    });

    newBook.save().then(book => res.json(book));
  }
);

/**
 *
 * @param {*} userId req.user.id
 * @param {*} bookId req.params.id
 */
const bringBack = (userId, bookId) => {
  User.findOne({ user: userId }).then(user => {
    Book.findById(bookId)
      .then(book => {
        if (book.user.toString() !== userId) {
          return { error: "You can't bring back book you didn't take" };
        }

        book.taken = false;
        book.save().then(book => {
          return book;
        });
      })
      .catch(err => ({
        error: 'No book found'
      }));
  });
};

/**
 *
 * @param {*} userId req.user.id
 * @param {*} bookId req.params.id
 */
const take = (userId, bookId) => {
  User.findOne({ user: userId }).then(user => {
    Book.findById(bookId)
      .then(book => {
        book.taken = true;
        book.user = userId;
        book.takenDate = Date.now();

        book.save().then(book => {
          return book;
        });
      })
      .catch(err => ({
        error: 'No book found'
      }));
  });
};

router.put(
  '/changeStatus/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Book.findById(req.params.id).then(book => {
      if (book.taken) res.json(bringBack(req.user.id, req.params.id));
      else res.json(take(req.user.id, req.params.id));
    });
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Book.findById(req.params.id)
      .then(book => {
        // Delete
        book.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

module.exports = router;
