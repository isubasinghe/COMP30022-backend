"use strict";

const secrets = require('../../utils/secrets');

const PG_URL=secrets('DB_URL');
const PG_PORT=secrets('DB_PORT');
const PG_DATABASE=secrets('DB_DATABASE');
const PG_USER=secrets('DB_USER');
const PG_PWD=secrets('DB_PWD');

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: PG_URL,
        port: PG_PORT,
        database: PG_DATABASE,
        user: PG_USER,
        password: PG_PWD,
    },
    pool: {
        min: 2,
        max: 3
    }
});

knex.on('disconnect', err => {
    console.log(err);
    throw err;
})

module.exports = {knex: knex};