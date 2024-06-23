import { TokenDatasourceMongoose, TokenRepositoryImpl } from "../../infrastructure";
import { gRPCMethods } from "../gRPC/gRPC.service";
import { TokengRPCController } from "./token.grpc.controller";

export class TokengRPCService{

    static get methods():gRPCMethods {
        const tokenDatasource = new TokenDatasourceMongoose()
        const tokenRepository = new TokenRepositoryImpl(tokenDatasource)
        const tokengRPCController = new TokengRPCController(tokenRepository)
        return {
            refreshToken: tokengRPCController.refreshToken,
            validateToken: tokengRPCController.validateToken
        }
    }
}