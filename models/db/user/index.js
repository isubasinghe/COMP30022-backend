"use strict";

const db = require('../conn');

const create = (email, name) => {
  return db.knex('userdata')
    .insert({ email, name });
}

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

const del = (email) => {
  return db.knex('userdata')
    .where({ email })
    .del();
}

module.exports = { create, read, update, del };