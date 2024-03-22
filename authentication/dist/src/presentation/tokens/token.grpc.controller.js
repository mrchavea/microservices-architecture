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
exports.TokengRPCController = void 0;
const domain_1 = require("../../domain");
class TokengRPCController {
    constructor(tokenRepository) {
        this.tokenRepository = tokenRepository;
        //No need to implement that call. It should be called logInUser instead
        // public generateAccessToken:gRPCFunction = async (call, callback) => {
        //     const {} = call
        //     const token = this.tokenRepository.generateAccessToken()
        // }
        // public getAccessToken:gRPCFunction = async (call, callback) => {
        //     const [error, ]
        // }
        this.verifyToken = (call, callback) => __awaiter(this, void 0, void 0, function* () {
        });
        this.refreshToken = (call, callback) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const [error, tokenDto] = domain_1.TokenDto.makeTokenDto((_a = call === null || call === void 0 ? void 0 : call.request) === null || _a === void 0 ? void 0 : _a.access_token, "REFRESH_TOKEN");
            if (error)
                callback(null, { access_token: null, status: 0 });
            this.tokenRepository.generateRefreshToken(tokenDto)
                .then(token => callback(null, { access_token: token.value, status: 1 }))
                .catch(err => callback(null, { access_token: null, status: 0 }));
        });
    }
}
exports.TokengRPCController = TokengRPCController;
