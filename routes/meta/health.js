"use strict";
const healthCheck = (req, res) => {
  req.app.locals.db.knex.knex
    .raw("SELECT version()")
    .then(() => {
      res.status(200).json({ message: "healthy, database up" });
    })
    .catch(err => {
      res.status(400).json({ message: "severe error, database not connected" });
    });
};

module.exports = healthCheck;
