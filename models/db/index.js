"use strict";

const secrets = require("../../utils/secrets");

const PG_URL = secrets("DB_URL");
const PG_PORT = secrets("DB_PORT");
const PG_DATABASE = secrets("DB_DATABASE");
const PG_USER = secrets("DB_USER");
const PG_PWD = secrets("DB_PWD");

const optionsPG = {
  client: "pg",
  connection: {
    host: PG_URL,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USER,
    password: PG_PWD
  },
  pool: {
    min: 2,
    max: 3
  }
};

const knex = require("knex")(optionsPG);

knex
  .raw("SELECT version()")
  .then(res => {
    console.log(res.rows[0].version);
  })
  .catch(err => {
    // Crash and exit on database connection error
    throw err;
  });

module.exports = { knex: knex };
