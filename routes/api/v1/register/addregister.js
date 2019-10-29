"use strict";

const addRegister = (req, res) => {
  const { name } = req.body;

  const exit = [name].some(element => {
    if (element === undefined) {
      res.status(400).json({ error: "incorrect schema" });
      return true;
    }
    return false;
  });
  if (exit) {
    return;
  }

  req.app.locals.db.register
    .create(res.locals.authenticatedEmail, name)
    .then(() => {
      res.status(200).json({ message: "successfully added register" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });

  return;
};

module.exports = addRegister;
