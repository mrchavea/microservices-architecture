"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRepositoryImpl = void 0;
class TokenRepositoryImpl {
    constructor(tokenDatasource) {
        this.tokenDatasource = tokenDatasource;
    }
    generateTokens(user) {
        return this.tokenDatasource.generateTokens(user);
    }
    refreshAccessToken(refresh_token) {
        return this.tokenDatasource.refreshAccessToken(refresh_token);
    }
    existsToken(access_token) {
        throw new Error("Method not implemented.");
    }
    revocateToken(access_token) {
        throw new Error("Method not implemented.");
    }
}
exports.TokenRepositoryImpl = TokenRepositoryImpl;
