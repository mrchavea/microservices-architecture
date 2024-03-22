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
exports.gRPC_Server = void 0;
const path = require("path");
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
class gRPC_Server {
    constructor(options) {
        this.server = new grpc.Server();
        this.PROTO_PATH = path.join(__dirname, "../../../config/protos/authentication.proto");
        const { PROTO_NAME, PORT = 50051 } = options;
        this.options = options;
        this.port = PORT;
        this.proto = this.loadPackage(this.PROTO_PATH, PROTO_NAME);
    }
    loadPackage(PROTO_PATH, PROTO_NAME) {
        const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
        return grpc.loadPackageDefinition(packageDefinition)[PROTO_NAME];
    }
    addService(serviceName, methods) {
        this.server.addService(this.proto[serviceName].service, methods);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const service of this.options.services) {
                this.addService(service.service, service.methods);
            }
            this.server.bindAsync("0.0.0.0:" + this.port, grpc.ServerCredentials.createInsecure(), (err, port) => {
                if (err != null) {
                    return console.error(err);
                }
                console.log(`gRPC listening on ${port}`);
            });
        });
    }
}
exports.gRPC_Server = gRPC_Server;
