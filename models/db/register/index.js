"use strict";

const db = require('../../db');

const create = (register_id, name) => {
  return db.knex('register')
    .insert({ register_id, name });
}

const update = (register_id, name) => {
  return db.knex('register')
    .where({ register_id })
    .update({ name });
}

const read = (register_id) => {
  return db.knex('register')
    .select()
    .where({ register_id });
}

const readUserRegisters = (email) => {
  return db.knex('register')
    .join('membership', 'register.register_id', 'membership.register_id')
    .join('userdata', 'userdata.email', 'membership.email')
    .select('register.*')
    .where({ email });
}

const del = (register_id) => {
  return db.knex('register')
    .where({ register_id })
    .del();
}

module.exports = { create, update, read, readUserRegisters, del };