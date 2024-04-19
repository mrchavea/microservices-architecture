"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_TYPE = exports.TOKEN_METHOD = void 0;
var TOKEN_METHOD;
(function (TOKEN_METHOD) {
    TOKEN_METHOD[TOKEN_METHOD["LOGIN"] = 0] = "LOGIN";
    TOKEN_METHOD[TOKEN_METHOD["REFRESH"] = 1] = "REFRESH";
})(TOKEN_METHOD || (exports.TOKEN_METHOD = TOKEN_METHOD = {}));
var TOKEN_TYPE;
(function (TOKEN_TYPE) {
    TOKEN_TYPE[TOKEN_TYPE["ACESS_TOKEN"] = 0] = "ACESS_TOKEN";
    TOKEN_TYPE[TOKEN_TYPE["REFRESH_TOKEN"] = 1] = "REFRESH_TOKEN";
})(TOKEN_TYPE || (exports.TOKEN_TYPE = TOKEN_TYPE = {}));
