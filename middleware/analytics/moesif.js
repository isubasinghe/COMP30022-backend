const moesifExpress = require("moesif-express");

const secrets = require("../../utils/secrets");
// 2. Set the options, the only required field is applicationId.
const moesifMiddleware = moesifExpress({
  applicationId: secrets("MOESIF_KEY"),
  logBody: true
});

module.exports = moesifMiddleware;
