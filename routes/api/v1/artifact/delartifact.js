"use strict";

const delArtifact = (req, res) => {
  const { register_id, artifact_id } = req.body;

  [register_id, artifact_id]
  .forEach(element => {
    if (element === undefined) {      
      status(400).json({ error: "incorrect schema" });
      return;
    }
  });

  req.app.locals.db.artifact
    .del(res.locals.authenticatedEmail, register_id, artifact_id)
    .then(() => {
      res.status(200).json({ message: "successfully deleted artifact"});
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: err.message });
    });
  
};

module.exports = delArtifact;
