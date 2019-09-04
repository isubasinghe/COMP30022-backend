"use strict";

const db = require('../../db');

const create = (email, register_id, is_admin) => {
  return db.knex('membership')
    .insert({ email, register_id, is_admin });
}

const read = (email, register_id) => {
  return db.knex('membership')
    .where({ email, register_id });
}

const update = (admin_email, email, register_id, is_admin) => {
  return db.knex('membership')
    .where({ email, register_id })
    .update({ is_admin })
    .whereExists(function() {
      this.select()
        .from('membership')
        .where({'email': admin_email, register_id, 'is_admin': true })
    });
}

const del = (admin_email, email, register_id) => {
  return db.knex('membership')
    .where({ email, register_id })
    .whereExists(function() {
      this.select()
        .from('membership')
        .where({'email': admin_email, register_id, 'is_admin': true })
    })
    .del();
}

const addMember = (admin_email, user_email, register_id) => {
  return db.knex('membership')
    .where({ 'email': admin_email, register_id, 'is_admin': true })
    .returning('is_admin')
    .then((data) => {
      const is_admin = data[0];
      
      if (is_admin) {
        return create(user_email, register_id, false);
      }
    });
}

module.exports = { create, read, update, del, addMember };