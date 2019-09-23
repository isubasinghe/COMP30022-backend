"use strict";
const router = require("express").Router();

const addArtifact = require("./addartifact");
const delArtifact = require("./delartifact");
const updateArtifact = require("./updateartifact");
const addPhoto = require("./addphoto");

router.post("/add", addArtifact);
router.post("/del", delArtifact);
router.post("/update", updateArtifact);
router.post("/addphoto", addPhoto);

module.exports = router;
