"use strict";
const getUser = require("../../utils/auth/cognito");

const authenticateCognito = async (req, res, next) => {
  const idToken = req.headers.authorization;
  if (
    idToken === undefined ||
    idToken === null ||
    idToken === "" ||
    idToken.split(".").length !== 3
  ) {
    res.status(403).json({ error: "Authorization header was invalid " });
    return;
  }

  const userRetrieveResult = await getUser(idToken);

  if (userRetrieveResult instanceof Error) {
    res.status(403).json({ error: userRetrieveResult.message });
    return;
  }

  res.locals.authenticatedEmail = userRetrieveResult;
  next();
};

module.exports = authenticateCognito;
