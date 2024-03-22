const express = require("express");
const router = express.Router();
const gRPCClient = require("../../gRPCClient");

router.get("/refreshToken", async (req, res) => {
  const refresh_token = req.query?.token;
  console.log(req.query);
  if (!refresh_token) return res.sendStatus(401);
  const getRefreshToken = () =>
    new Promise((resolve, reject) =>
      gRPCClient.refreshToken({ refresh_token: refresh_token }, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      })
    );

  const response = await getRefreshToken();
  console.log("REFRESH?", response);
  if (response.status == 0) return res.status(500).send("Upsss");
  return res.status(200).json({ access_token: response.access_token });
});

router.post("/login", async (req, res) => {
  console.time("login");
  const getAccessToken = () =>
    new Promise((resolve, reject) =>
      gRPCClient.authenticateUser(
        { email: req.body?.email, password: req?.body.password },
        (err, res) => {
          if (err) return reject(err);
          resolve(res);
        }
      )
    );

  const response = await getAccessToken();
  console.timeEnd("login");

  console.log("TOKEN?", response);

  if (response.status == 200) {
    return res.status(200).json({
      access_token: response.access_token,
      refresh_token: response.refresh_token
    });
  }
  return res
    .status(response.status.code)
    .send({ error: response.status.error });
});

module.exports = router;
