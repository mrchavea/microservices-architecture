const express = require("express");
const router = express.Router();
const { tokengRPCClient, usergRPCClient } = require("../../../gRPCClient");
const {
  sendRefreshCookie,
  sendAccessCookie,
  sendAccessToken
} = require("../../helpers/cookies");

router.get("/refreshToken", async (req, res) => {
  const refresh_token = req.cookies?.jwt_session;
  console.log("REFRESH_COOKIE", refresh_token);
  if (!refresh_token) return res.sendStatus(401);
  const getRefreshToken = () =>
    new Promise((resolve, reject) =>
      tokengRPCClient.refreshToken(
        { refresh_token: refresh_token },
        (err, res) => {
          if (err) return reject(err);
          resolve(res);
        }
      )
    );

  const response = await getRefreshToken();
  console.log("REFRESH?", response);

  if (response?.status?.code == 200) {
    sendAccessToken(
      res,
      response.access_token,
      response.access_token_expiration
    );
    return res.sendStatus(200);
  }
  return res
    .status(response.status.code)
    .send({ error: response.status.error });
});

router.post("/login", async (req, res) => {
  console.time("login");
  const authenticateUser = () =>
    new Promise((resolve, reject) =>
      usergRPCClient.authenticateUser(
        { email: req.body?.email, password: req?.body.password },
        (err, res) => {
          if (err) return reject(err);
          resolve(res);
        }
      )
    );

  const response = await authenticateUser();
  console.timeEnd("login");

  console.log("TOKEN?", response);

  if (response?.status?.code == 200) {
    sendRefreshCookie(
      res,
      response.refresh_token,
      response.refresh_token_expiration
    );
    sendAccessToken(
      res,
      response.access_token,
      response.access_token_expiration
    );
    return res.sendStatus(200);
  }
  return res
    .status(response.status.code)
    .send({ error: response.status.error });
});

router.post("/register", async (req, res) => {
  console.time("register");
  const registerUser = () =>
    new Promise((resolve, reject) =>
      usergRPCClient.registerUser(
        {
          email: req.body?.email,
          password: req?.body.password,
          username: req?.body.username,
          name: req?.body.name,
          client_id: req?.body.client_id
        },
        (err, res) => {
          if (err) return reject(err);
          resolve(res);
        }
      )
    );

  const response = await registerUser();
  console.timeEnd("register");

  console.log("REGISTER?", response);

  if (response?.status?.code == 200) {
    const { name, username, email, access_token, refresh_token, id } = response;
    sendRefreshCookie(res, refresh_token);
    sendAccessToken(res, access_token);
    return res.status(200).json({
      id,
      name,
      email,
      username
    });
  }
  return res
    .status(response.status.code)
    .send({ error: response.status.error });
});

module.exports = router;
