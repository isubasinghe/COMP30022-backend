"use strict";

const router = require("express").Router();
const register = require("./register");
router.use("/register", register);

module.exports = router;
