"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usergRPCClient = exports.tokengRPCClient = void 0;
const minimist_1 = __importDefault(require("minimist"));
const path = require("path");
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = path.join(__dirname, "config/protos/authentication.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const authentication_proto = grpc.loadPackageDefinition(packageDefinition).authentication;
const argv = (0, minimist_1.default)(process.argv.slice(2), {
    string: "target"
});
const target = argv.target || "microservices-authentication:50051";
const usergRPCClient = new authentication_proto.User(target, grpc.credentials.createInsecure());
exports.usergRPCClient = usergRPCClient;
const tokengRPCClient = new authentication_proto.Token(target, grpc.credentials.createInsecure());
exports.tokengRPCClient = tokengRPCClient;
