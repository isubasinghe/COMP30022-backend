"use strict";
const router = require("express").Router();
const authMiddleware = require("../middleware/auth");

const api = require("./api");
const metrics = require("./meta");

router.use("/meta", metrics);
router.use(authMiddleware);
router.use("/api", api);

module.exports = router;
