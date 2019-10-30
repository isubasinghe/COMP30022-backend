"use strict";
const router = require("express").Router();
const basicHealth = require("./health");

router.get("/health", basicHealth);

module.exports = router;
