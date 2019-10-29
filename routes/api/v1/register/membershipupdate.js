"use strict";

const membershipUpdate = (req, res) => {
  const { email, register_id, is_admin } = req.body;

  const exit = [email, register_id, is_admin].forEach(element => {
    if (element === undefined) {
      res.status(400).json({ error: "incorrect schema" });
      return true;
    }
    return false;
  });

  if (exit) {
    return;
  }

  req.app.locals.db.membership
    .update(res.locals.authenticatedEmail, email, register_id, is_admin)
    .then(() => {
      res.status(200).json({ message: "successfully updated member" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};

module.exports = membershipUpdate;
