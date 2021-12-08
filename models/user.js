const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    username: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    image: {
      type: String,
      lowercase: true,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
