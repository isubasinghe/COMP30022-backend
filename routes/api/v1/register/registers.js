"use strict";

const registers = (req, res) => {
  const { email, register_id, is_admin } = req.body;

  [email, register_id, is_admin]
  .forEach(element => {
    if (element === undefined) {
      status(400).json({ error: "incorrect schema" });      
      return;
    }
  });

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