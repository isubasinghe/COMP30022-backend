"use strict";

const db = require('../../db');

const create = (email, register_id, is_admin) => {
  return db.knex('membership')
    .insert({ email, register_id, is_admin });
}

const read = (email, register_id) => {
  return db.knex('membership')
    .select()
    .where({ email, register_id });
}

const update = (email, register_id, is_admin) => {
  return db.knex('membership')
    .where({ email, register_id })
    .update({ is_admin });
}

const del = (email, register_id) => {
  return db.knex('membership')
    .where({ email, register_id })
    .del();
}

module.exports = { create, read, update, del };