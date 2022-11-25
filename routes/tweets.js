var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
require("../models/connection");
const Tweet = require("../models/tweets");
const { db } = require("../models/tweets");

router.post("/add", (req, res) => {
  console.log("data received from the client", req.body);
  const options = {
    table: "tweets",
    records: [req.body],
  };
  db.insert(options, (err, res) => {
    if (err) {
      console.log("error in insert", err);
      res.statusCode(500).send("error");
    } else {
      console.log(res);
      res.send("result", "tweet added sucessfully");
    }
  });
}),
  /*Tweet.findOne({ username: req.body.username, firstname: req.body.firstname })
    .populate("users")
    .then((data) => {
      console.log(data);
    });
});*/

  router.get("/getAll", function (req, res) {
    res.send("Tweet route accessed");
    const options = {
      table: "tweets",
      searchAttribute: "userhandle",
      searchValue: "",
      attributes: ["*"],
    };
    db.searchByValue(option, (err, res) => {});
  });

module.exports = router;
