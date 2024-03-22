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
exports.RegisterUserDto = void 0;
const helpers_1 = require("../../helpers");
class RegisterUserDto {
    constructor(name, username, email, password, client_id) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.client_id = client_id;
    }
    static makeUser(object) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, username, email, password, client_id } = object;
            const validationErrors = helpers_1.AjvValidator.getInstance().validate("user", object);
            if (validationErrors.length > 0) {
                return [validationErrors[0], undefined];
            }
            return [undefined, new RegisterUserDto(name, username, email, password, client_id)];
        });
    }
}
exports.RegisterUserDto = RegisterUserDto;
