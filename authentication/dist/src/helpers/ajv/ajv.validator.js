"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AjvValidator = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const schemas_1 = require("./schemas");
//Singleton pattern
class AjvValidator {
    constructor() {
        this.validators = {};
        this.ajv_validator = new ajv_1.default({ allErrors: true });
    }
    static getInstance() {
        if (!AjvValidator.instance) {
            AjvValidator.instance = new AjvValidator();
        }
        return AjvValidator.instance;
    }
    compileSchema(name, schema) {
        const validator = this.ajv_validator.compile(schema);
        this.validators[name] = validator;
    }
    validate(schemaName, data) {
        const validator = this.validators[schemaName];
        if (!validator)
            throw Error("Validator error!");
        const isValid = validator(data);
        if (!isValid) {
            if (!validator.errors)
                throw Error("Validator error!");
            let errors = [];
            validator.errors.forEach(error => error.message ? errors.push(error.message) : null);
            return errors;
        }
        return [];
    }
    start() {
        (0, ajv_formats_1.default)(this.ajv_validator, { mode: "fast", formats: ["date", "time", "uuid", "email", "password", "url"], keywords: true });
        this.compileSchema("user", schemas_1.UserJsonSchema);
        this.compileSchema("client", schemas_1.ClientJsonSchema);
        this.compileSchema("token", schemas_1.TokenJsonSchema);
    }
}
exports.AjvValidator = AjvValidator;
