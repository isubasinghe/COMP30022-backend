"use strict";

const db = require('../../db');

const read = async (email) => {
  return db.knex('userdata')
    .select()
    .where({ email });
}

const update = async (email, name) => {
  return db.knex('userdata')
    .where({ email })
    .update({ name });
}


module.exports = { read, update };