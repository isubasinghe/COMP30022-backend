"use strict";
const router = require("express").Router();
const addArtifact = require("./addartifact");
const delArtifact = require("./delartifact");
const updateArtifact = require("./updateartifact");

router.post("/add", addArtifact);
router.post("/del", delArtifact);
router.post("/update", updateArtifact);

module.exports = router;
