const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const books = require('./api/books');
const book = require('./api/book');
const users = require('./api/users');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./passport')(passport);

// app.use(express.static('dist'));
app.use('/api/books', books);
app.use('/api/book', book);
app.use('/api/users', users);

app.listen(process.env.PORT || 8080, () => {});
