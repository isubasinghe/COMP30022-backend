"use strict";

const retrieveArtifacts = (req, res) => {
  res.send(res.locals.authenticatedEmail);
};

module.exports = retrieveArtifacts;
