"use strict";

const retrieveArtifact = (req, res) => {
  let { artifactId, registerId } = req.params;
  try {
    artifactId = parseInt(artifactId);
    registerId = parseInt(registerId);
  } catch (err) {
    res.status(400).json({ error: err.message });
    return;
  }

  if (isNaN(artifactId) || isNaN(registerId)) {
    res.status(400).json({ error: "unable to parse integer" });
  }
  req.app.locals.db.artifact
    .read(res.locals.authenticatedEmail, registerId, artifactId)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.send(400).json({ error: err.message });
    });
};

module.exports = retrieveArtifact;
