const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  favorites: [
    {
      original_title: {
        type: String,
      },
      poster_path: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("profile", ProfileSchema);
