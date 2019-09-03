"use strict";

const db = require('../../db');

const create = (artifact_id, url) => {
  return db.knex('membership')
    .insert({ artifact_id, url });
}

const read = (artifact_id) => {
  return db.knex('photo')
    .where({ artifact_id });
}

const del = (artifact_id, url) => {
  return db.knex('membership')
    .where({ artifact_id, url })
    .del();
}


module.exports = { create, read, del };