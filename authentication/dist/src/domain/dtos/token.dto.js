"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenDto = void 0;
const jwt = require("jsonwebtoken");
require("dotenv").config();
class TokenDto {
    constructor(value, user_id, type, expiry_time) {
        this.value = value;
        this.expiry_time = expiry_time;
        this.user_id = user_id;
        this.type = type;
    }
    static makeTokenDto(encoded_token, tokenType) {
        const privateKey = tokenType == 'LOGIN' ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
        const tokenPayload = jwt.verify(encoded_token, privateKey, (err, payload) => {
            if (err)
                return null;
            return payload;
        });
        if (!tokenPayload)
            return ['The token is wrong or expired', undefined];
        const { user_id, type } = tokenPayload;
        if (!user_id || !type)
            return ['Token payload incorrect', undefined];
        if (type != 'LOGIN' && type != 'REFRESH_TOKEN')
            return ['Token type incorrect', undefined];
        return [undefined, new TokenDto(encoded_token, user_id, type)];
    }
}
exports.TokenDto = TokenDto;
