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
            if (error instanceof domain_1.CustomError) {
                return callback(null, { status: { code: error.statusCode,
                        error: error.message }
                });
            }
            console.log(error); // Winston
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
                    access_token: tokens.access_token,
                    refresh_token: tokens.refresh_token
                }))
                    .catch(err => this.handleError(err, callback));
            }
            catch (err) {
                this.handleError(err, callback);
            }
        });
        this.registerUser = (call, callback) => __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.UsergRPCController = UsergRPCController;
