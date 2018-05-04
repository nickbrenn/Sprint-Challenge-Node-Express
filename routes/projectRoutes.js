const express = require("express");

const db = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  db
    .get()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db
    .get(id)
    .then(project => {
      res.json(project);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res) => {
  name = req.body.name;
  description = req.body.description;
  const body = {
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed
  };
  if (undefined !== body.completed && typeof body.completed !== "boolean") {
    res.json({
      errorMessage: "The completed property must be a boolean value."
    });
  } else if (
    undefined !== body.name &&
    name.length <= 128 &&
    undefined !== body.description &&
    description.length <= 128
  ) {
    db.insert(body).then(project => {
      db
        .get(project.id)
        .then(newProject => {
          res.json(newProject);
        })
        .catch(err => res.json({ error: err }));
    });
  } else {
    if (name && description) {
      res.json({
        errorMessage:
          "Please include name and description properties with a maximum of 128 value length.",
        nameLength: name.length,
        descriptionLength: description.length
      });
    } else if (name) {
      res.json({
        errorMessage:
          "Please include name and description properties with a maximum of 128 value length.",
        nameLength: name.length
      });
    } else if (description) {
      res.json({
        errorMessage:
          "Please include name and description properties with a maximum of 128 value length.",
        descriptionLength: description.length
      });
    } else {
      res.json({
        errorMessage:
          "Please include name and description properties with a maximum of 128 value length."
      });
    }
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  name = req.body.name;
  description = req.body.description;
  const body = {
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed
  };
  if (undefined !== body.completed && typeof body.completed !== "boolean") {
    res.json({
      errorMessage: "The completed property must be a boolean value."
    });
  } else if (
    undefined !== body.description &&
    body.description.length <= 128 &&
    (undefined !== body.name && body.name.length <= 128)
  ) {
    db.update(id, body).then(project => {
      db
        .get(project.id)
        .then(newProject => {
          res.json(newProject);
        })
        .catch(err => res.json({ error: err }));
    });
  } else {
    if (name && description) {
      res.json({
        errorMessage:
          "Please include name and description properties with a maximum of 128 value length.",
        nameLength: name.length,
        descriptionLength: description.length
      });
    } else if (name) {
      res.json({
        errorMessage:
          "Please include name and description properties with a maximum of 128 value length.",
        nameLength: name.length
      });
    } else if (description) {
      res.json({
        errorMessage:
          "Please include name and description properties with a maximum of 128 value length.",
        descriptionLength: description.length
      });
    } else {
      res.json({
        errorMessage:
          "Please include name and description properties with a maximum of 128 value length."
      });
    }
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db
    .get(id)
    .then(project => {
      db.remove(id).then(response => {
        res.json({ ...project });
      });
    })
    .catch(err =>
      res.json({
        errorMessage:
          "This project could not be deleted or the given id does not exist."
      })
    );
});

module.exports = router;
