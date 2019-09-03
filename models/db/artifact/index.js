"use strict";

const db = require('../../db');

const create = (register_id, name, family_members, description, date, lat, lon) => {
  return db.knex('artifact')
    .insert({ register_id, name, family_members, description, date, lat, lon });
}

const read = (artifact_id) => {
  return readArtifactsWithPhotos()
    .where('artifact.artifact_id', artifact_id);
}

const readRegisterArtifacts = (register_id) => {
  return readArtifactsWithPhotos() 
    .where({ register_id });
}

const update = (artifact_id, name, family_members, description, date, lat, lon) => { 
  return db.knex('artifact') 
    .where({ artifact_id })
    .update({ name, family_members, description, date, lat, lon });
}

const del = (artifact_id) => {
  return db.knex('artifact')
    .where({ artifact_id })
    .del();
}

const readArtifactsWithPhotos = () => {
  return db.knex('artifact')
  .leftOuterJoin('photo', 'artifact.artifact_id', 'photo.artifact_id')
  .select(
    'artifact.*',
    db.knex.raw('json_agg(photo.*) as photos') 
  )    
  .groupBy('artifact.artifact_id');
}

module.exports = { create, read, readRegisterArtifacts, update, del };