"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
class Token {
    constructor(value, user_id, type, method, expiry_time) {
        this.value = value;
        this.expiry_time = expiry_time;
        this.user_id = user_id;
        this.type = type;
        this.method = method;
    }
}
exports.Token = Token;
