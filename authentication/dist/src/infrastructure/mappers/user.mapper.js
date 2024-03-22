"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const domain_1 = require("../../domain");
const helpers_1 = require("../../helpers");
class UserMapper {
    static userFromObject(object) {
        const { id, _id, client_id, name, email, username, password } = object;
        const validationErrors = helpers_1.AjvValidator.getInstance().validate("user", object);
        if (validationErrors.length > 0) {
            throw domain_1.CustomError.internalServer("Database entity error: " + validationErrors[0]);
        }
        return new domain_1.User(id || _id, client_id, name, email, username, password);
    }
}
exports.UserMapper = UserMapper;
