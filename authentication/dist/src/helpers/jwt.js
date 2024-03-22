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
exports.JwtAdapter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const DURATION = '2h';
class JwtAdapter {
    static generateToken(payload, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const secret = type == 'LOGIN' ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
                const options = type == 'REFRESH' ? { expiresIn: DURATION } : {};
                // todo: generación del seed
                jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, payload), { method: type }), secret, options, (err, token) => {
                    if (err)
                        return resolve(null);
                    resolve({
                        token: token,
                        duration: type == 'REFRESH' ? DURATION : undefined
                    });
                });
            });
        });
    }
    static validateToken(token, type) {
        const secret = type == 'LOGIN' ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
        return new Promise((resolve) => {
            jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
                if (err)
                    return resolve(null);
                resolve(decoded);
            });
        });
    }
}
exports.JwtAdapter = JwtAdapter;
