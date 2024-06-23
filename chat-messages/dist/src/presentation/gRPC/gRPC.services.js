"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gRPCServices = void 0;
const gRPC_service_1 = require("./gRPC.service");
const token_grpc_service_1 = require("../tokens/token.grpc.service");
const user_grpc_service_1 = require("../users/user.grpc.service");
class gRPCServices {
    static get services() {
        const tokengRPCService = new gRPC_service_1.gRPCService('Token', token_grpc_service_1.TokengRPCService.methods);
        const usergRPCService = new gRPC_service_1.gRPCService('User', user_grpc_service_1.UsergRPCService.methods);
        // const tokengRPCService = new gRPCService('token', TokengRPCService.methods)
        return [tokengRPCService, usergRPCService];
    }
}
exports.gRPCServices = gRPCServices;
