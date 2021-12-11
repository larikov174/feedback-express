const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 2,
      maxlength: 300,
      required: true,
    },
    category: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    status: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    upvotes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        default: [],
      },
    ],
    description: {
      type: String,
      minlength: 2,
      maxlength: 400,
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
    comments: [
      {
        replies: [{}],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('post', postSchema);
