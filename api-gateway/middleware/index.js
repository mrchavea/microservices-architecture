const gRPCClient = require("../gRPCClient");

async function authenticateToken(req, res, next) {
  //Disable authentication for authentication microservice and functionalities
  if (req.path.startsWith("/auth")) return next();
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  const verifyToken = () =>
    new Promise((resolve, reject) =>
      gRPCClient.verifyToken({ access_token: token }, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      })
    );
  const response = await verifyToken();
  if (!response?.username || response.status != 1) return res.sendStatus(403);
  req.username = response?.username;
  next();
}

module.exports = authenticateToken;
