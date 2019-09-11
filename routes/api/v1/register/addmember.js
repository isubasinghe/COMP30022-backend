"use strict";

const addMember = (req, res) => {
  const { email, register_id } = req.body;

  [email, register_id]
  .forEach(element => {
    if (element === undefined) {
      res.send({ message: "incorrect schema"});
      return;
    }
  });

  req.app.locals.db.membership
    .addMember(res.locals.authenticatedEmail, email, register_id)
    .then(() => {
      res.status(200).json({ message: "successfully added member"});
    })
    .catch(err => {
      console.log(err);
      res.send(400).json({ error: err.message });
    });
}

module.exports = addMember;