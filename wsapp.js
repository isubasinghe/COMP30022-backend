const ws = require("ws");
const url = require("url");

const wss = new ws.Server({
  noServer: true
});

wss.on("connection", (conn, req) => {
  const ip = req.headers["x-forwarded-for"]
    ? req.headers["x-forwarded-for"].split(/\s*,\s*/)[0]
    : req.connection.remoteAddress;
  const token = url.parse(req.url, true).query.token || "no_token";
});

module.exports = wss;
