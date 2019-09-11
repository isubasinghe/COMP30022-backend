"use strict";

const delMember = (req, res) => {
	const { email, register_id } = req.body;
	
  [email, register_id]
  .forEach(element => {
    if (element === undefined) {
			res.send({ message: "incorrect schema"});
			return;
    }
  });

  req.app.locals.db.membership
    .del(res.locals.authenticatedEmail, email, register_id)
    .then(() => {
      res.status(200).json({ message: "successfully deleted member"});
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: err.message });
    });
}

module.exports = delMember;