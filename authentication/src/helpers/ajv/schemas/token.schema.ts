export const TokenJsonSchema = {
  $async: true,
  type: "object",
  additionalProperties: false,
  properties: {
    value: {
      type: "string",
      minLength: 2,
    },
    expiry_time: {
      type: "string",
      format: "date-time",
    },
    type: {
      enum: [0, 1]
    },
    method: {
      enum: [0, 1]
    },
    user_id: {
      type: "string",
      format: "objectId",
    },
    iat: {
      type: "number"
    },
    exp:{
      type: "number"
    },
  },
  required: ["value", "type", "method", "user_id"]
};