"use strict";
const router = require("express").Router();
const retriveArtifacts = require("./retrieveall");
const retrieveArtifact = require("./retrieveartifact");
const addMember = require("./addmember");
const delMember = require("./delmember");
const updateMember = require("./membershipupdate");

router.get("/all/:registerId", retriveArtifacts);
router.get("/artifact/:registerId/:artifactId", retrieveArtifact);

router.post("/addmember", addMember);
router.post("/delmember", delMember);
router.post("/updatemember", updateMember);

module.exports = router;
