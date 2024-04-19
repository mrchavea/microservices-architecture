"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokengRPCService = void 0;
const infrastructure_1 = require("../../infrastructure");
const token_grpc_controller_1 = require("./token.grpc.controller");
class TokengRPCService {
    static get methods() {
        const tokenDatasource = new infrastructure_1.TokenDatasourceMongoose();
        const tokenRepository = new infrastructure_1.TokenRepositoryImpl(tokenDatasource);
        const tokengRPCController = new token_grpc_controller_1.TokengRPCController(tokenRepository);
        return {
            refreshToken: tokengRPCController.refreshToken,
            validateToken: tokengRPCController.validateToken
        };
    }
}
exports.TokengRPCService = TokengRPCService;
