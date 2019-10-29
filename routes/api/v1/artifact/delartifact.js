"use strict";

const delArtifact = (req, res) => {
  const { register_id, artifact_id } = req.body;

  const exit = [register_id, artifact_id].some(element => {
    if (element === undefined) {
      res.status(400).json({ error: "incorrect schema" });
      return true;
    }
    return false;
  });

  if (exit) {
    return;
  }
  req.app.locals.db.artifact
    .del(res.locals.authenticatedEmail, register_id, artifact_id)
    .then(() => {
      res.status(200).json({ message: "successfully deleted artifact" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};

module.exports = delArtifact;
