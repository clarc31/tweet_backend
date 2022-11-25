var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
require("../models/connection");
const Tweet = require("../models/tweets");

router.post("/add", (req, res) => {
  if (!checkBody(req.body, ["username", "tweet"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  Tweet.findOne({
    username: req.body.username,
    tweet: req.body.tweet,
  }).then((data) => {
    if (data === null) {
      const newTweet = new Tweet({
        tweet: req.body.tweet,
      });

  newTweet.save().then((newDoc) => {
    res.json({ result: true, newDoc });
  });
}
  });
});

module.exports = router; 
