var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
require("../models/connection");
const User = require("../models/users");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["username", "firstname", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  //création de 3 user user 1 - firstname 1 - mdp1

  // Vérification si l'utilisateur n'a pas été déja enregistré
  User.findOne({
    username: req.body.username,
    firstname: req.body.firstname,
  }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        password: hash,
        token: uid2(32),
        candelete: true,
      });

      // Ajout d'un nouvel utilisateur
      newUser.save().then((newDoc) => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      // Si l'utilisateur existe déja dans la data base
      res.json({ result: false, error: "User already exists" });
    }
  });
});

// Se logger sur l'application
router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["username", "firstname", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({
    username: req.body.username,
    firstname: req.body.firstname,
  }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

module.exports = router;
