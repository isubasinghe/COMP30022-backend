"use strict";
const Sequelize = require("sequelize");
let sequalize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB.USER,
  process.env.DB_PASSS,
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 2,
      acquire: 30000,
      idle: 10000
    }
  }
);
