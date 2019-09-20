"use strict";

const db = require('../conn');
const membership = require('../membership');

const create = (email, name) => {
  return db.knex('register')
    .insert({ name })
    .returning('register_id')
    .then((data) => {
      const register_id = data[0];

      return membership.create(email, register_id, true);
    });
}

const update = (email, register_id, name) => {
  return db.knex('register')
    .update({ name })
    .where({ register_id })
    .whereIn('register_id', function() {
      this.select('register_id')
        .from('membership')
        .where({ email, is_admin: true})
    });
}

const read = (register_id) => {
  return db.knex('register')
    .select()
    .where({ register_id });
}

const readUserRegisters = (email) => {
  return db.knex('register')
    .select('register.*', 'membership.is_admin')
    .join('membership', 'register.register_id', 'membership.register_id')
    .where('membership.email', email);
}

const del = (email, register_id) => {
  return db.knex('register')
    .where({ register_id })
    .whereIn('register_id', function() {
      this.select('register_id')
        .from('membership')
        .where({ email, is_admin: true})
    })
    .del();
}

module.exports = { create, update, read, readUserRegisters, del };