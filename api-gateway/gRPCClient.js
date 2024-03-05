const path = require("path");
const PROTO_PATH = path.join(__dirname, "config/protos/authentication.proto");

var parseArgs = require("minimist");
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
var authentication_proto =
  grpc.loadPackageDefinition(packageDefinition).authentication;

var argv = parseArgs(process.argv.slice(2), {
  string: "target"
});
var target;
if (argv.target) {
  target = argv.target;
} else {
  target = "microservices-authentication:50051";
}
var client = new authentication_proto.Authentication(
  target,
  grpc.credentials.createInsecure()
);

module.exports = client;
