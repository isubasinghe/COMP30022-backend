"use strict";
const logger = require("./utils/logger");
const analytics = require("./middleware/analytics/moesif");
const db = require("./models/db");
const routes = require("./routes");
const express = require("express");
const cookieParser = require("cookie-parser");
const httpLogger = require("morgan");
const expressWinston = require("express-winston");
const app = express();
const cors = require("cors");
const Sentry = require("@sentry/node");

Sentry.init({ dsn: process.env.SENTRY_DSN });

app.locals.db = db;

app.use(Sentry.Handlers.requestHandler());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", routes);

// 3 Enable the Moesif middleware to start capturing incoming API Calls hitting your own APIs.
app.use(analytics);

const formatStr = `{{req.ip}} - {{res.statusCode}} - {{req.method}} - {{res.responseTime}}ms - {{req.url}} - {{req.headers['user-agent']}}`;
app.use(
  expressWinston.logger({
    // use logger to log every requests
    transports: [logger],
    meta: false, // optional: control whether you want to log the meta data about the request (default to true)
    msg: formatStr, // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: false // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  })
);

app.use(Sentry.Handlers.errorHandler());
module.exports = app;
