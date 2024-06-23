"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientJsonSchema = void 0;
exports.ClientJsonSchema = {
    $async: true,
    type: "object",
    additionalProperties: false,
    properties: {
        name: {
            type: "string",
            minLength: 2,
            maxLength: 50
        },
        plan_id: {
            type: "string",
            format: "uuid"
        },
        subscriptions_id: {
            type: "string",
            format: "uuid"
        },
        isActive: {
            type: "boolean"
        }
    },
    required: ["name", "plan_id", "subscriptions_id", "isActive"]
};
