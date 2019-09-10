"use strict";

const router = require("express").Router();
const registerRouter = require("./register");
const artifactRouter = require("./artifact");
router.use("/register", registerRouter);
router.use("/artifact", artifactRouter);

module.exports = router;
