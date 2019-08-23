"use strict";
const db = require('./models/db');
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();
app.locals.db = db; 

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;
