"use strict";
const logger = require("./utils/logger");
const getUser = require("./utils/auth/cognito");
const db = require("./models/db");
const express = require("express");
const cookieParser = require("cookie-parser");
const httpLogger = require("morgan");

const app = express();
app.locals.logger = logger;
app.locals.db = db;
app.locals.auth = { getUser: getUser };
app.use(httpLogger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;
