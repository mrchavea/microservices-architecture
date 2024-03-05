const path = require("path");
const PROTO_PATH = path.join(__dirname, "config/protos/authentication.proto");
const {
  authenticateUser,
  verifyJWT,
  getRefreshToken
} = require("./domain/repositories/UserRepository");
const database = require("./infraestructure/database");

const PORT = process.env.PORT || 50051;

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

function getAccessToken(call, callback) {
  const userTokens = authenticateUser(call.request.username);
  callback(null, {
    access_token: userTokens.access_token,
    refresh_token: userTokens.refresh_token,
    status: userTokens.access_token && userTokens.refresh_token ? 1 : 0
  });
}

function verifyToken(call, callback) {
  const username = verifyJWT(call.request.access_token);
  callback(null, { username: username, status: username ? 1 : 0 });
}

function refreshToken(call, callback) {
  const access_token = getRefreshToken(call.request.refresh_token);
  callback(null, { access_token: access_token, status: access_token ? 1 : 0 });
}

function main() {
  var server = new grpc.Server();
  server.addService(authentication_proto.Authentication.service, {
    getAccessToken: getAccessToken,
    verifyToken: verifyToken,
    refreshToken: refreshToken
  });
  server.bindAsync(
    "0.0.0.0:" + PORT,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err != null) {
        return console.error(err);
      }
      console.log(`gRPC listening on ${port}`);
    }
  );
}

database.on("error", (error) => {
  console.error(error);
});

// Only wether connection is succesfully we start the server
database.once("open", () => {
  main();
});
