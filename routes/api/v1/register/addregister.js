"use strict";

const addRegister = (req, res) => {
  const { name } = req.body;

  [name]
  .forEach(element => {
    if (element === undefined) {
      res.send({ message: "incorrect schema"});
      return;
    }
  });

  req.app.locals.db.register
    .create(res.locals.authenticatedEmail, name)
    .then(() => {
      res.status(200).json({ message: "successfully added register"});
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
}

module.exports = addRegister;