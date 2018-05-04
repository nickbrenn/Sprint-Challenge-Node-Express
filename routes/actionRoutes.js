const express = require("express");

const db = require("../data/helpers/actionModel");
const projectDb = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  db
    .get()
    .then(actions => {
      res.json(actions);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Actions could not be gotten." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db
    .get(id)
    .then(action => {
      res.json(action);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The action with this id could not be found." });
    });
});

router.post("/", (req, res) => {
  const body = {
    project_id: req.body.project_id,
    description: req.body.description,
    notes: req.body.notes,
    completed: req.body.completed
  };
  if (!body.project_id || typeof body.project_id !== "number") {
    res.json({
      errorMessage:
        "A project_id property with the value of a number is required."
    });
  } else if (
    undefined !== body.completed &&
    typeof body.completed !== "boolean"
  ) {
    res.json({
      errorMessage: "The completed property must be a boolean value."
    });
  } else if (undefined !== body.description && body.description.length <= 128) {
    projectDb
      .get(body.project_id)
      .then(project => {
        if (project) {
          db.insert(body).then(action => {
            db.get(action.id).then(newAction => {
              res.json(newAction);
            });
          });
        }
      })
      .catch(err =>
        res.json({
          errorMessage:
            "There is no project id that corresponds with this actions project_id."
        })
      );
  } else {
    if (body.description) {
      res.json({
        errorMessage:
          "Please include a description property with a maximum of 128 value length.",
        descriptionLength: body.description.length
      });
    } else {
      res.json({
        errorMessage:
          "Please include a description property with a maximum of 128 value length."
      });
    }
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  description = req.body.description;
  const body = {
    project_id: req.body.project_id,
    description: req.body.description,
    notes: req.body.notes,
    completed: req.body.completed
  };
  if (undefined !== body.completed && typeof body.completed !== "boolean") {
    res.json({
      errorMessage: "The completed property must be a boolean value."
    });
  } else if (undefined !== body.description && body.description.length <= 128) {
    projectDb
      .get(body.project_id)
      .then(project => {
        if (project) {
          db.update(id, body).then(action => {
            db.get(action.id).then(newAction => {
              res.json(newAction);
            });
          });
        }
      })
      .catch(err =>
        res.json({
          errorMessage:
            "There is no project id that corresponds with this actions project_id."
        })
      );
  } else {
    if (description) {
      res.json({
        errorMessage:
          "Please include a description property with a maximum of 128 value length.",
        descriptionLength: description.length
      });
    } else {
      res.json({
        errorMessage:
          "Please include a description property with a maximum of 128 value length."
      });
    }
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db
    .get(id)
    .then(action => {
      db.remove(id).then(response => {
        res.json({ ...action });
      });
    })
    .catch(err =>
      res.json({
        errorMessage:
          "This action could not be deleted or the given id does not exist."
      })
    );
});

module.exports = router;
