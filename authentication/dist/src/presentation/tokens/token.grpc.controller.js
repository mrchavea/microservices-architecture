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
const enums_1 = require("../../helpers/enums");
class TokengRPCController {
    constructor(tokenRepository) {
        this.tokenRepository = tokenRepository;
        this.handleError = (error, callback) => {
            if (error instanceof domain_1.CustomError) {
                return callback(null, { status: { code: error.statusCode, error: error.message } });
            }
            return callback(null, { status: { code: 500, error: "Internal Server Error" } });
        };
        this.validateToken = (call, callback) => __awaiter(this, void 0, void 0, function* () {
            const { token } = call.request;
            try {
                new domain_1.ValidateAccessToken()
                    .execute(token)
                    .then((tokenData) => callback(null, { status: { code: 200 }, user_id: tokenData.user_id }))
                    .catch((err) => this.handleError(err, callback));
            }
            catch (err) {
                this.handleError(err, callback);
            }
        });
        this.refreshToken = (call, callback) => __awaiter(this, void 0, void 0, function* () {
            const { refresh_token } = call.request;
            try {
                const [error, tokenDto] = yield domain_1.TokenDto.makeTokenDto(refresh_token, enums_1.TOKEN_TYPE.REFRESH_TOKEN);
                if (error)
                    throw domain_1.CustomError.badRequest(error);
                new domain_1.RefreshAccessToken(this.tokenRepository)
                    .execute(tokenDto)
                    .then((generatedToken) => callback(null, { status: { code: 200 }, access_token: generatedToken.access_token, access_token_expiration: generatedToken.access_token_expiration }))
                    .catch((err) => this.handleError(err, callback));
            }
            catch (err) {
                this.handleError(err, callback);
            }
        });
    }
}
exports.TokengRPCController = TokengRPCController;
