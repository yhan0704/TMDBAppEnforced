const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  favorites: [
    {
      original_title: {
        type: String,
      },
      poster_path: {
        type: String,
      },
      movieId: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("user", UserSchema);
