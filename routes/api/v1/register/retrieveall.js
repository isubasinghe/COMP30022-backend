"use strict";

const retrieveArtifacts = (req, res) => {
  console.log(req.params);
  let { registerId } = req.params;
  try {
    registerId = parseInt(registerId);
  } catch (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  req.app.locals.db.artifact
    .readAll(res.locals.authenticatedEmail, registerId)
    .then(data => {
      res.send({ ...data, register_id: registerId });
    })
    .catch(err => {
      console.log(err);
      res.send(400).json({ error: err.message });
    });
};

module.exports = retrieveArtifacts;
