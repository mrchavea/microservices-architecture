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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const domain_1 = require("../../domain");
class UserMapper {
    static userFromObject(object) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, _id, client_id, name, email, username, password } = object;
            console.log("Mapper", id, _id, client_id, name, email, username, password);
            if (!_id || !id) {
                throw domain_1.CustomError.badRequest('Missing id');
            }
            if (!name)
                throw domain_1.CustomError.badRequest('Missing name');
            if (!email)
                throw domain_1.CustomError.badRequest('Missing email');
            if (!password)
                throw domain_1.CustomError.badRequest('Missing password');
            if (!username)
                throw domain_1.CustomError.badRequest('Missing username');
            return new domain_1.User(id || _id, client_id.toString(), name, email, username, password);
        });
    }
}
exports.UserMapper = UserMapper;
