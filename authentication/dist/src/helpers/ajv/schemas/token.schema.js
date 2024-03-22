"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenJsonSchema = void 0;
exports.TokenJsonSchema = {
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
            format: "date",
        },
        type: {
            enum: ["LOGIN", "REFRESH"]
        },
        user_id: {
            type: "string",
            format: "uuid",
        }
    },
    required: ["value", "type", "user_id"]
};
