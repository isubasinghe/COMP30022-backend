const winston = require("winston");

const secrets = require("../secrets");

require("winston-papertrail").Papertrail;
const logger = new winston.transports.Papertrail({
  host: secrets("PAPER_TRAIL_HOST"),
  port: parseInt(secrets("PAPER_TRAIL_PORT")),
  handleExceptions: true
});
module.exports = logger;
