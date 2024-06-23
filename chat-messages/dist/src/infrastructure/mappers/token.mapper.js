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
exports.TokenMapper = void 0;
const domain_1 = require("../../domain");
class TokenMapper {
    static tokenFromObject(object) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, value, type, method, expiry_time } = object;
            console.log("Mapper token", user_id, value, type, method, expiry_time);
            if (!user_id)
                throw domain_1.CustomError.badRequest('Missing user_id');
            if (!value)
                throw domain_1.CustomError.badRequest('Missing value');
            if (type == undefined)
                throw domain_1.CustomError.badRequest('Missing type');
            if (method == undefined)
                throw domain_1.CustomError.badRequest('Missing method');
            if (!expiry_time)
                throw domain_1.CustomError.badRequest('Missing expiry_time');
            return new domain_1.Token(value, user_id, type, method, expiry_time);
        });
    }
}
exports.TokenMapper = TokenMapper;
