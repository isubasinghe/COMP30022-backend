"use strict";

const db = require('../../db');

const create = (email, register_id, artifact_id, url) => {
  return db.knex('membership')
    .join('artifact', 'artifact.register_id', 'membership.register_id')
    .where({ email, is_admin: true })
    .where('artifact.register_id', register_id)
    .then((data) => {
      if (data && data.length !== 0) {
        return db.knex('photo')
          .insert({ artifact_id, url });
      }

      return new Error('member is not an admin, register does not exist, or artifact does not exist');
    });
}

const read = (email, register_id, artifact_id) => {
  return db.knex('photo')
    .where({ artifact_id })
    .whereIn('artifact_id', function() {
      this.select('artifact_id')
        .from('membership')
        .join('artifact', 'artifact.register_id', 'membership.register_id')
        .where({ email, is_admin: true })
        .where('artifact.register_id', register_id)
    });
}

const del = (email, register_id, artifact_id, url) => {
  return db.knex('photo')
    .where({ artifact_id, url })
    .whereIn('artifact_id', function() {
      this.select('artifact_id')
        .from('membership')
        .join('artifact', 'artifact.register_id', 'membership.register_id')
        .where({ email, is_admin: true })
        .where('artifact.register_id', register_id)
    })
    .del();
}

module.exports = { create, read, del };