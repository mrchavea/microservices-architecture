const { tokengRPCClient } = require("../gRPCClient");

async function authenticateToken(req, res, next) {
  console.time("validating");
  //Disable authentication for authentication microservice and functionalities
  if (req.path.startsWith("/auth")) return next();
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  const validateToken = () =>
    new Promise((resolve, reject) =>
      tokengRPCClient.validateToken({ token }, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      })
    );

  const response = await validateToken();
  console.log("RES", response);
  console.timeEnd("validating");
  if (response?.status?.code != 200) return res.sendStatus(403);
  req.user_id = response?.user_id;
  next();
}

module.exports = authenticateToken;
