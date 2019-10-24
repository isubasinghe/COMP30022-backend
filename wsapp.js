const ws = require("ws");
const url = require("url");
const db = require("./models/db");
const getUser = require("./utils/auth/cognito");
const wss = new ws.Server({
  noServer: true
});

wss.on("connection", (conn, req) => {
  const ip = req.headers["x-forwarded-for"]
    ? req.headers["x-forwarded-for"].split(/\s*,\s*/)[0]
    : req.connection.remoteAddress;
  const token = url.parse(req.url, true).query.token || "no_token";
  getUser(token)
    .then(user => {
      if (!(user instanceof Error)) {
        console.log(user);
        return db.register.readUserRegisters(user);
      } else {
        throw new Error(user.message);
      }
    })
    .then(registers => {
      if (registers.length > 0) {
      }
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = wss;
