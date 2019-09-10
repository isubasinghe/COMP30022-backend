"use strict";
const knex = require('./conn');
const artifact = require('./artifact');
const membership = require('./membership');
const photo = require('./photo');
const register = require('./register');
const user = require('./user');



module.exports = {knex: knex, artifact, membership, photo, register, user};