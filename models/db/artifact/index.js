"use strict";

const db = require('../conn');

const create = (email, register_id, name, family_members, description, date, lat, lon) => {
  return db.knex('membership')
    .where({ 'email': email, register_id, 'is_admin': true })
    .then((data) => {
      if (data && data.length !== 0) {
        return db.knex('artifact')
          .insert({ register_id, name, family_members, description, date, lat, lon })
          .returning('artifact_id');
      }

      return new Error('member is not an admin, or register does not exist');
    });
}

const read = (email, register_id, artifact_id) => {
  return readAll(email, register_id)
    .where('artifact.artifact_id', artifact_id);
}

const readAll = (email, register_id) => {
  return db.knex('artifact')
    .leftOuterJoin('photo', 'artifact.artifact_id', 'photo.artifact_id')
    .select(
      'artifact.*',
      db.knex.raw('coalesce(json_agg(photo.*) filter (where photo is not null), \'[]\') as photos') 
    )    
    .groupBy('artifact.artifact_id')
    .whereIn('register_id', function() {
      this.select('register_id')
        .from('membership')
        .where({ email, register_id })
    });
}

const update = (email, register_id, artifact_id, name, family_members, description, date, lat, lon) => {   
  return db.knex('artifact') 
    .update({ name, family_members, description, date, lat, lon })
    .where({ artifact_id, register_id })
    .whereExists(function() {
      this.select()
        .from('membership')
        .where({ email, register_id, 'is_admin': true })
    });
}

const del = (email, register_id, artifact_id) => {
  return db.knex('artifact')
    .where({ artifact_id, register_id })
    .whereExists(function() {
      this.select()
        .from('membership')
        .where({ email, register_id, 'is_admin': true })
    })
    .del();
}

module.exports = { create, read, readAll, update, del };