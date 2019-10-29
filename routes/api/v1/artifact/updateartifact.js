"use strict";

const updateArtifact = (req, res) => {
  const {
    register_id,
    artifact_id,
    name,
    family_members,
    description,
    date,
    lat,
    lon
  } = req.body;

  const exit = [
    register_id,
    artifact_id,
    name,
    family_members,
    description,
    date,
    lat,
    lon
  ].some(element => {
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
    .update(
      res.locals.authenticatedEmail,
      register_id,
      artifact_id,
      name,
      family_members,
      description,
      date,
      lat,
      lon
    )
    .then(() => {
      res.status(200).json({ message: "successfully updated artifact" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};

module.exports = updateArtifact;
