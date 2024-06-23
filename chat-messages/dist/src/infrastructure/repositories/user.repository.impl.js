"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImpl = void 0;
class UserRepositoryImpl {
    constructor(userDatasource) {
        this.userDatasource = userDatasource;
    }
    registerUser(registerUserDto) {
        return this.userDatasource.registerUser(registerUserDto);
    }
    authenticateUser(LogInUserDto) {
        return this.userDatasource.authenticateUser(LogInUserDto);
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
