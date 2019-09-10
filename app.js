"use strict";
const logger = require("./utils/logger");
const db = require("./models/db");
const routes = require("./routes");
const express = require("express");
const cookieParser = require("cookie-parser");
const httpLogger = require("morgan");
const app = express();
app.locals.logger = logger;
app.locals.db = db;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(httpLogger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", routes);

module.exports = app;
