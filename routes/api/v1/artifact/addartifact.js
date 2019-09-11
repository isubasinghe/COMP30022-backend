"use strict";

const addArtifact = (req, res) => {
  const { register_id, name, family_members, description, date, lat, lon } = req.body;

  [register_id, name, family_members, description, date, lat, lon]
  .forEach(element => {
    if (element === undefined) {
      res.send({ message: "incorrect schema"});
      return;
    }
  });

  req.app.locals.db.artifact
    .create(res.locals.authenticatedEmail, register_id, name, family_members, description, date, lat, lon)
    .then(() => {
      res.status(200).json({ message: "successfully added artifact"});
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
  
};

module.exports = addArtifact;
