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
exports.TokenDatasourceMongoose = void 0;
const models_1 = require("../../../../database/mongoose/models");
const mappers_1 = require("../../mappers");
const domain_1 = require("../../../domain");
const helpers_1 = require("../../../helpers");
class TokenDatasourceMongoose {
    constructor(generateToken = helpers_1.JwtAdapter.generateToken, validateToken = helpers_1.JwtAdapter.validateToken) {
        this.generateToken = generateToken;
        this.validateToken = validateToken;
    }
    generateTokens(user) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: Receive mongoose transaction in order to revert user creation if error
            try {
                const access_token = yield this.generateToken({ user_id: user.id, method: helpers_1.TOKEN_METHOD.LOGIN, type: helpers_1.TOKEN_TYPE.ACESS_TOKEN });
                const refresh_token = yield this.generateToken({ user_id: user.id, method: helpers_1.TOKEN_METHOD.LOGIN, type: helpers_1.TOKEN_TYPE.REFRESH_TOKEN });
                const access_token_expirationDate = (0, helpers_1.addTimeFromNow)(access_token === null || access_token === void 0 ? void 0 : access_token.duration);
                const refresh_token_expirationDate = (0, helpers_1.addTimeFromNow)(refresh_token === null || refresh_token === void 0 ? void 0 : refresh_token.duration);
                //Add refresh token to database
                const userUpdate = { tokens: { refresh_token: refresh_token === null || refresh_token === void 0 ? void 0 : refresh_token.token } };
                yield models_1.UserModel.findOneAndUpdate({ _id: user.id }, userUpdate);
                console.log("date?", access_token_expirationDate, refresh_token_expirationDate);
                const access_token_entity = yield mappers_1.TokenMapper.tokenFromObject({
                    value: access_token === null || access_token === void 0 ? void 0 : access_token.token,
                    user_id: user.id,
                    expiry_time: access_token_expirationDate,
                    type: helpers_1.TOKEN_TYPE.ACESS_TOKEN,
                    method: helpers_1.TOKEN_METHOD.LOGIN
                });
                const refresh_token_entity = yield mappers_1.TokenMapper.tokenFromObject({
                    value: refresh_token === null || refresh_token === void 0 ? void 0 : refresh_token.token,
                    user_id: user.id,
                    expiry_time: refresh_token_expirationDate,
                    type: helpers_1.TOKEN_TYPE.REFRESH_TOKEN,
                    method: helpers_1.TOKEN_METHOD.LOGIN
                });
                return {
                    access_token: access_token_entity,
                    refresh_token: refresh_token_entity
                };
            }
            catch (error) {
                console.log("CATCH", error);
                if (error instanceof domain_1.CustomError)
                    throw error;
                throw domain_1.CustomError.internalServer("Error generating access token");
            }
        });
    }
    refreshAccessToken(refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            //const exist = UserModel.exists({tokens:{refresh_token: refresh_token.value}})
            const savedToken = yield models_1.UserModel.findById(refresh_token.user_id, { tokens: { refresh_token: 1 } });
            if (!savedToken || ((_a = savedToken.tokens) === null || _a === void 0 ? void 0 : _a.refresh_token) != refresh_token.value)
                throw domain_1.CustomError.badRequest("Token does not exist!");
            const access_token = yield this.generateToken({ user_id: refresh_token.user_id, method: helpers_1.TOKEN_METHOD.REFRESH, type: helpers_1.TOKEN_TYPE.ACESS_TOKEN });
            const access_token_expirationDate = (0, helpers_1.addTimeFromNow)(access_token === null || access_token === void 0 ? void 0 : access_token.duration);
            console.log("EXIST?", access_token_expirationDate);
            return mappers_1.TokenMapper.tokenFromObject({
                user_id: refresh_token.user_id,
                value: access_token === null || access_token === void 0 ? void 0 : access_token.token,
                type: helpers_1.TOKEN_TYPE.ACESS_TOKEN,
                method: helpers_1.TOKEN_METHOD.REFRESH,
                expiry_time: access_token_expirationDate
            });
        });
    }
    existsToken(access_token) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    revocateToken(access_token) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
}
exports.TokenDatasourceMongoose = TokenDatasourceMongoose;
