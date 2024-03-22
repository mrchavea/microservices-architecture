"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
class RegisterUser {
    constructor(userRepository, tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }
    execute(registerUserDto) {
        throw new Error("Method not implemented.");
    }
}
exports.RegisterUser = RegisterUser;
