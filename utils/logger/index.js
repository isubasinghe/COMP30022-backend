const logdna = require('logdna');
const options = {
    env: process.env.NODE_ENV
}

const logger = logdna.createLogger(process.env.LOGDNA_INGESTION_KEY, options);



module.exports = logger;