"use strict";
const router = require("express").Router();
const addArtifact = require("./addartifact");
const delArtifact = require("./delartifact");

router.post("/addartifact", addArtifact);
router.post("/delartifact", delArtifact);

module.exports = router;
