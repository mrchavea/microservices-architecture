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
exports.UsergRPCController = void 0;
const domain_1 = require("../../domain");
class UsergRPCController {
    constructor(userRepository, tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.handleError = (error, callback) => {
            console.log("CONTR ERR", error);
            if (error instanceof domain_1.CustomError) {
                return callback(null, { status: { code: error.statusCode,
                        error: error.message }
                });
            }
            return callback(null, { status: { code: 500,
                    error: 'Internal Server Error' }
            });
        };
        this.authenticateUser = (call, callback) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = call.request;
            try {
                const [error, logInUserDto] = domain_1.LogInUserDto.makeLoginUserDto({ email, password });
                if (error)
                    throw domain_1.CustomError.badRequest(error);
                new domain_1.LogInUser(this.userRepository, this.tokenRepository)
                    .execute(logInUserDto)
                    .then(tokens => callback(null, { status: { code: 200 },
                    access_token: tokens.access_token.value,
                    refresh_token: tokens.refresh_token.value,
                    access_token_expiration: tokens.access_token.expiry_time.toUTCString(),
                    refresh_token_expiration: tokens.refresh_token.expiry_time.toUTCString(),
                }))
                    .catch(err => this.handleError(err, callback));
            }
            catch (err) {
                this.handleError(err, callback);
            }
        });
        this.registerUser = (call, callback) => __awaiter(this, void 0, void 0, function* () {
            const { username, email, name, password, client_id } = call.request;
            try {
                const [error, registerUserDto] = yield domain_1.RegisterUserDto.makeUser({ name, email, username, password, client_id });
                console.log("validator ERR", error);
                if (error)
                    throw domain_1.CustomError.badRequest(error);
                new domain_1.RegisterUser(this.userRepository, this.tokenRepository)
                    .execute(registerUserDto)
                    .then(userAndTokens => callback(null, { status: { code: 200 },
                    acces_token: userAndTokens.tokens.access_token.value,
                    access_token_expiration: userAndTokens.tokens.access_token.expiry_time,
                    refresh_token: userAndTokens.tokens.refresh_token.value,
                    refrehs_token_expiration: userAndTokens.tokens.refresh_token.expiry_time,
                    name: userAndTokens.user.name,
                    email: userAndTokens.user.email,
                    username: userAndTokens.user.username,
                    id: userAndTokens.user.id
                }))
                    .catch(err => this.handleError(err, callback));
            }
            catch (err) {
                this.handleError(err, callback);
            }
        });
    }
}
exports.UsergRPCController = UsergRPCController;
