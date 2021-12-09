const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 2,
      maxlength: 200,
      required: true,
    },
    category: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: true,
    },
    upvotes: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: true,
    },
    description: {
      type: String,
      minlength: 2,
      maxlength: 200,
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
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
  { versionKey: false }
);

module.exports = mongoose.model("post", postSchema);
