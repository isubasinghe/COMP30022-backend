"use strict";

const router = require("express").Router();
const v1 = require("./v1");
const authMiddleware = require("../../middleware/auth");

//router.use(authMiddleware);
router.use("/v1", v1);

module.exports = router;
