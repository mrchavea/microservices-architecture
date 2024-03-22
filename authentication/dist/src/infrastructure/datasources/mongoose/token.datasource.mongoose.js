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
const domain_1 = require("../../../domain");
const jwt_1 = require("../../../helpers/jwt");
const mappers_1 = require("../../mappers");
class TokenDatasourceMongoose {
    constructor(generateToken = jwt_1.JwtAdapter.generateToken, validateToken = jwt_1.JwtAdapter.validateToken) {
        this.generateToken = generateToken;
        this.validateToken = validateToken;
    }
    generateAccessTokens(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const access_token = yield this.generateToken({ id: user.id }, 'LOGIN');
                const refresh_token = yield this.generateToken({ id: user.id }, 'REFRESH');
                //Add refresh token to database
                const userUpdate = { tokens: { refresh_token: refresh_token } };
                yield models_1.UserModel.findOneAndUpdate({ id: user.id }, userUpdate);
                const access_token_entity = yield mappers_1.TokenMapper.tokenFromObject({
                    value: access_token === null || access_token === void 0 ? void 0 : access_token.token,
                    user_id: user.id,
                    expiry_time: undefined,
                    type: 'LOGIN'
                });
                const refresh_token_entity = yield mappers_1.TokenMapper.tokenFromObject({
                    value: refresh_token === null || refresh_token === void 0 ? void 0 : refresh_token.token,
                    user_id: user.id,
                    expiry_time: refresh_token === null || refresh_token === void 0 ? void 0 : refresh_token.duration,
                    type: 'REFRESH'
                });
                return {
                    access_token: access_token_entity,
                    refresh_token: refresh_token_entity
                };
            }
            catch (error) {
                if (error instanceof domain_1.CustomError)
                    throw error;
                throw domain_1.CustomError.internalServer("Error generating access token");
            }
        });
    }
    generateRefreshToken(refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            // const databaseUser = await UserModel.findOneAndUpdate({_id:user.id}, {tokens : })
            // if()
            // await token.save()
            // return TokenMapper.tokenFromObject(token)
            throw new Error("Method not implemented.");
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
