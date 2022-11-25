const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  tweet: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  hastag: String,
  lastweet: Date,
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
