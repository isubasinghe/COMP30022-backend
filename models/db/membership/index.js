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

const addMember = (admin_email, user_email, register_id) => {
  return isMember(user_email, register_id)
    .then((member) => {
      if (!member) {
        return isAdmin(admin_email, register_id)
          .then((admin) => {
            if (admin) {
              return create(user_email, register_id, false);
            }

            return false;
          });
      }
      return false;
    });
}

const isMember = (email, register_id) => {
  return read(email, register_id)
    .then((data) => {
      return !!data;
    });
}

const isAdmin = (email, register_id) => {
  return read(email, register_id)
    .then((data) => {
      if (!data) {
        return false;
      }

      return data[0]['is_admin'];
    });;
}

const modifyAdmin = (admin_email, user_email, register_id, is_admin) => {
  return isMember(user_email, register_id)
    .then((member) => {
      if (member && admin_email !== user_email) {
        return isAdmin(admin_email, register_id)
          .then((admin) => {
            if (admin) {
              return update(user_email, register_id, is_admin);
            }

            return false;
          });
      }
      return false;
    });
}

const promote = (admin_email, user_email, register_id) => {
  return modifyAdmin(admin_email, user_email, register_id, true);
}

const demote = (admin_email, user_email, register_id) => {
  return modifyAdmin(admin_email, user_email, register_id, false);
}

module.exports = { create, read, del, addMember, isAdmin, isMember, promote, demote };