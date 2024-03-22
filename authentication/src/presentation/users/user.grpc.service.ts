import { TokenDatasourceMongoose, TokenRepositoryImpl } from "../../infrastructure";
import { UserDatasourceMongoose } from "../../infrastructure/datasources/mongoose/user.datasource.mongoose";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";
import { gRPCMethods } from "../gRPC/gRPC.service";
import { UsergRPCController } from "./user.grpc.controller";

export class UsergRPCService{

    static get methods():gRPCMethods {
        
        const userDatasource = new UserDatasourceMongoose()
        const userRepository = new UserRepositoryImpl(userDatasource)
        const tokenDatasource = new TokenDatasourceMongoose()
        const tokenRepository = new TokenRepositoryImpl(tokenDatasource)
        const usergRPCController = new UsergRPCController(userRepository, tokenRepository)
        
        return {
            authenticateUser: usergRPCController.authenticateUser,
            registerUser: usergRPCController.registerUser
        }
    }
}