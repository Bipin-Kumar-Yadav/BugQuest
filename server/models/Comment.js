const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  bug: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bug',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comment",commentSchema)