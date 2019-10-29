"use strict";

const retrieveArtifacts = (req, res) => {
  let { registerId } = req.params;
  try {
    registerId = parseInt(registerId, 10);
  } catch (err) {
    res.status(400).json({ error: err.message });
    return;
  }

  if (!isNaN(registerId)) {
    req.app.locals.db.artifact
      .readAll(res.locals.authenticatedEmail, registerId)
      .then(data => {
        res.send({ ...data });
      })
      .catch(err => {
        res.send(400).json({ error: err.message });
      });
  } else {
    res.status(400).json({ error: "unable to parse integer" });
  }
};

module.exports = retrieveArtifacts;
