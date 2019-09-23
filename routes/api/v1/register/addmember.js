"use strict";

const addMember = (req, res) => {
  const { email, register_id } = req.body;

  [email, register_id]
  .forEach(element => {
    if (element === undefined) {
      status(400).json({ error: "incorrect schema" });
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
      res.status(400).json({ error: err.message });
    });
}

module.exports = addMember;