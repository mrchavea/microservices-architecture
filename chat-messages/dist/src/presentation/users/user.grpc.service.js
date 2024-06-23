"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsergRPCService = void 0;
const infrastructure_1 = require("../../infrastructure");
const user_datasource_mongoose_1 = require("../../infrastructure/datasources/mongoose/user.datasource.mongoose");
const user_repository_impl_1 = require("../../infrastructure/repositories/user.repository.impl");
const user_grpc_controller_1 = require("./user.grpc.controller");
class UsergRPCService {
    static get methods() {
        const userDatasource = new user_datasource_mongoose_1.UserDatasourceMongoose();
        const userRepository = new user_repository_impl_1.UserRepositoryImpl(userDatasource);
        const tokenDatasource = new infrastructure_1.TokenDatasourceMongoose();
        const tokenRepository = new infrastructure_1.TokenRepositoryImpl(tokenDatasource);
        const usergRPCController = new user_grpc_controller_1.UsergRPCController(userRepository, tokenRepository);
        return {
            authenticateUser: usergRPCController.authenticateUser,
            registerUser: usergRPCController.registerUser
        };
    }
}
exports.UsergRPCService = UsergRPCService;
