const mongoose = require("mongoose");
const env = require("./environment/env");

mongoose.Promise = global.Promise;

const mongoUri = `mongodb://${env.hostName}:${env.key}@${env.hostName}.mongo.cosmos.azure.com:${env.port}/${env.dbName}?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@${env.dbName}@`

function connect() {
  return mongoose.connect(mongoUri, { auth: { username: env.hostName, password: env.key }});
}

module.exports = {
  connect,
  mongoose
}