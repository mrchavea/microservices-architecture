"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRepositoryImpl = void 0;
class TokenRepositoryImpl {
    constructor(tokenDatasource) {
        this.tokenDatasource = tokenDatasource;
    }
    generateAccessTokens(user) {
        return this.tokenDatasource.generateAccessTokens(user);
    }
    generateRefreshToken(refresh_token) {
        throw new Error("Method not implemented.");
    }
    existsToken(access_token) {
        throw new Error("Method not implemented.");
    }
    revocateToken(access_token) {
        throw new Error("Method not implemented.");
    }
}
exports.TokenRepositoryImpl = TokenRepositoryImpl;
