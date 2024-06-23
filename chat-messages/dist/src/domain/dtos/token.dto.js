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
exports.TokenDto = void 0;
const helpers_1 = require("../../helpers");
const error_entity_1 = require("../entities/error.entity");
class TokenDto {
    constructor(value, user_id, type, method, expiry_time) {
        this.value = value;
        this.expiry_time = expiry_time;
        this.user_id = user_id;
        this.type = type;
        this.method = method;
    }
    static makeTokenDto(encoded_token, tokenType) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenPayload = yield helpers_1.JwtAdapter.validateToken(encoded_token, tokenType);
            if (!tokenPayload)
                return ['The token is wrong or expired', undefined];
            const validationErrors = yield helpers_1.AjvValidator.getInstance().validate("token", Object.assign(Object.assign({}, tokenPayload), { value: encoded_token }));
            if (validationErrors.length > 0)
                throw error_entity_1.CustomError.badRequest(validationErrors[0]);
            const { user_id, type, method } = tokenPayload;
            return [undefined, new TokenDto(encoded_token, user_id, type, method)];
        });
    }
}
exports.TokenDto = TokenDto;
