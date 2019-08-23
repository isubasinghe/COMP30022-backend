"use strict";
const logger = require('./utils/logger');
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const httpLogger = require("morgan");

const app = express();
app.locals.logger = logger;
app.use(httpLogger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
