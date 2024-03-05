const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ allErrors: true, async: true });
addFormats(ajv);

// JSONSchema
const ClientJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 50
    },
    plan_id: {
      type: "uuid"
    },
    subscriptions_id: {
      type: "uuid"
    },
    isActive: {
      type: "boolean"
    }
  },
  required: ["name", "plan_id", "subscriptions_id", "isActive"]
};

const validator = ajv.compile(ClientJsonSchema);

module.exports = validator;
