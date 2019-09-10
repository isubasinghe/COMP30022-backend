"use strict";
const router = require("express").Router();
const retriveArtifacts = require("./retrieveall");
const retrieveArtifact = require("./retrieveartifact");

router.get("/all/:registerId", retriveArtifacts);
router.get("/artifact/:registerId/:artifactId", retrieveArtifact);

module.exports = router;
