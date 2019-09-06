"use strict";
const router = require("express").Router();
const retriveArtifacts = require("./retrieve");

router.get("/retrieve/:registerId", retriveArtifacts);

module.exports = router;
