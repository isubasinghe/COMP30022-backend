"use strict";

const delRegister = (req, res) => {
  const { register_id } = req.body;

  [register_id]
  .forEach(element => {
    if (element === undefined) {
      res.status(400).json({ error: "incorrect schema" });   
      return;
    }
  });

  req.app.locals.db.register
    .del(res.locals.authenticatedEmail, register_id)
    .then(() => {
      res.status(200).json({ message: "successfully deleted register"});
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: err.message });
    });

       
  return;
}

module.exports = delRegister;