import parseArgs from "minimist";
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

const authentication_proto = (grpc.loadPackageDefinition(packageDefinition) as any).authentication;

const argv = parseArgs(process.argv.slice(2), {
  string: "target"
});

const target = argv.target || "microservices-authentication:50051";

const usergRPCClient = new authentication_proto.User(target, grpc.credentials.createInsecure());

const tokengRPCClient = new authentication_proto.Token(target, grpc.credentials.createInsecure());

export { tokengRPCClient, usergRPCClient };
