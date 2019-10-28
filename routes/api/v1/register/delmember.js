"use strict";

const delMember = (req, res) => {
  const { email, register_id } = req.body;

  const exit = [email, register_id].some(element => {
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
    .del(res.locals.authenticatedEmail, email, register_id)
    .then(() => {
      res.status(200).json({ message: "successfully deleted member" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};

module.exports = delMember;
