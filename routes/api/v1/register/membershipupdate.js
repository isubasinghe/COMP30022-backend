"use strict";

const membershipUpdate = (req, res) => {
  const { email, register_id, is_admin } = req.body;

  [email, register_id, is_admin]
  .forEach(element => {
    if (element === undefined) {
      res.send({ message: "incorrect schema"});
      return;
    }
  });

  req.app.locals.db.membership
    .update(res.locals.authenticatedEmail, email, register_id, is_admin)
    .then(() => {
        res.status(200).json({ message: "successfully updated member"});
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
}

module.exports = membershipUpdate;