const { Client } = require("./client");
// let studentValidator = require("../validator/")(studentSchema);
const clientValidator = require("./client.schema");

const makeClient = (name, plan_id, subscription_id) =>
  new Client(clientValidator, name, plan_id, subscription_id);

module.exports = makeClient;
