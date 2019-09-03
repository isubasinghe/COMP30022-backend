"use strict";

const db = require('../../db');

const read = (email) => {
  return db.knex('userdata')
    .select()
    .where({ email });
}

const update = (email, name) => {
  return db.knex('userdata')
    .where({ email })
    .update({ name });
}

module.exports = { read, update };