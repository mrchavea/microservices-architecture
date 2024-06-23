"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AjvValidator = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv_errors_1 = __importDefault(require("ajv-errors"));
const schemas_1 = require("./schemas");
const domain_1 = require("../../domain");
//Singleton pattern
class AjvValidator {
    constructor() {
        this.validators = {};
        this.ajv_validator = new ajv_1.default({ allErrors: true, messages: true, $data: true });
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
        return __awaiter(this, void 0, void 0, function* () {
            console.log("DATA TO VALIDATE", data);
            const validator = this.validators[schemaName];
            if (!validator)
                throw Error("Validator error!");
            try {
                const isValid = yield validator(data);
                if (isValid)
                    return [];
            }
            catch (error) {
                console.log("CATCH", error);
                if (error instanceof ajv_1.default.ValidationError && error.errors) {
                    let errors = [];
                    error === null || error === void 0 ? void 0 : error.errors.forEach((error) => error.message ? errors.push(error.message) : null);
                    return errors;
                }
            }
            throw domain_1.CustomError.internalServer("Critical validation error!");
        });
    }
    start() {
        (0, ajv_errors_1.default)(this.ajv_validator);
        (0, ajv_formats_1.default)(this.ajv_validator, { mode: "fast", formats: ["date", "date-time", "time", "uuid", "email", "password", "url"], keywords: true });
        // Registrar el formato personalizado para ObjectId
        this.ajv_validator.addFormat('objectId', {
            type: 'string',
            validate: (data) => /^[0-9a-fA-F]{24}$/.test(data),
        });
        this.compileSchema("user", schemas_1.UserJsonSchema);
        this.compileSchema("client", schemas_1.ClientJsonSchema);
        this.compileSchema("token", schemas_1.TokenJsonSchema);
    }
}
exports.AjvValidator = AjvValidator;
