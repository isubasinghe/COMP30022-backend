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

const addMember = (admin_email, user_email, register_id, callback) => {
  isMember(user_email, register_id,
    (member) => {
      if (!member) {
        return isAdmin(admin_email, register_id, 
          (admin) => {
            if (admin) {
              callback(create(user_email, register_id, false));
            }
            callback(false);
          })
      }
      callback(false);
    });
}

const isMember = (email, register_id, callback) => {
  read(email, register_id)
    .then((data) => {
      return callback(!!data);
    });
}

const isAdmin = (email, register_id, callback) => {
  return read(email, register_id)
    .then((data) => {
      return callback(!data || data[0]['is_admin']);
    });
}

const modifyAdmin = (admin_email, user_email, register_id, is_admin, callback) => {
  isMember(user_email, register_id, 
    (member) => {
      if (member && admin_email !== user_email) {
        isAdmin(admin_email, register_id, 
          (admin) => {
            if (admin) {
              callback(update(user_email, register_id, is_admin));
            }
          })
      }
    });
}

const promote = (admin_email, user_email, register_id, callback) => {
  modifyAdmin(admin_email, user_email, register_id, true, callback);
}

const demote = (admin_email, user_email, register_id, callback) => {
  modifyAdmin(admin_email, user_email, register_id, false, callback);
}

module.exports = { create, read, del, addMember, isAdmin, isMember, promote, demote };