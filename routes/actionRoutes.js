const express = require("express");

const db = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  db
    .get()
    .then(actions => {
      res.json(actions);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
