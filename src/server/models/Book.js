const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const BookSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  author: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  published: {
    type: Date,
    default: Date.now
  },
  taken: {
    type: Boolean,
    required: true,
    default: false
  },
  takenDate: {
    type: Date
  }
});

module.exports = Book = mongoose.model('books', BookSchema);
