"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserJsonSchema = void 0;
exports.UserJsonSchema = {
    $async: true,
    type: "object",
    additionalProperties: false,
    properties: {
        name: {
            type: "string",
            minLength: 2,
            maxLength: 50,
            errorMessage: {
                required: "Date of Birth is Required Property",
                pattern: "Correct format of Date Of Birth is dd-mmm-yyyy",
                format: "INCORRECT FORMAT"
            },
        },
        id: {
            type: "string",
            format: "objectId",
        },
        client_id: {
            type: "string",
            format: "objectId",
        },
        username: {
            type: "string",
            minLength: 2,
            maxLength: 50,
        },
        email: {
            type: "string",
            format: "email",
        },
        password: {
            type: "string",
            format: "password",
        },
    },
    errorMessage: {
        properties: {
            name: "Name is invalid",
            client_id: "client_id is invalid",
            username: "Username is invalid",
            email: "Email is invalid",
            password: "Password is invalid",
        }
    },
    required: ["name", "username", "password", "email", "client_id"]
};
