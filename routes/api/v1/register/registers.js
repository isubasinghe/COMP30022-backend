"use strict";

const registers = (req, res) => {
  req.app.locals.db.register
    .readUserRegisters(res.locals.authenticatedEmail)
    .then(() => {
        res.status(200).json({ ... data});
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: err.message });
    });
}

module.exports = registers;