"use strict";

const delArtifact = (req, res) => {
  const { register_id, artifact_id } = req.body;

  [register_id, artifact_id]
  .forEach(element => {
    if (element === undefined) {
      res.send({ message: "incorrect schema"});
      return;
    }
  });

  req.app.locals.db.artifact
    .del(res.locals.authenticatedEmail, register_id, artifact_id)
    .then(() => {
      res.status(200).json({ message: "successfully added artifact"});
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
  
};

module.exports = delArtifact;
