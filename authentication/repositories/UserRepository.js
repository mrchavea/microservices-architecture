const jwt = require("jsonwebtoken");
require("dotenv").config();

var refresh_tokens = [];
var TOKEN_EXPIRY_TIME = "1min";

const generateAccessToken = (user) => {
  if (user) {
    return jwt.sign(
      { username: user, method: "LOGIN" },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: TOKEN_EXPIRY_TIME
      }
    );
  }
  return null;
};

const generateRefreshToken = (user) => {
  if (user) {
    return jwt.sign(
      { username: user, method: "REFRESH" },
      process.env.REFRESH_TOKEN_SECRET
    );
  }
  return null;
};

const authenticateUser = (user) => {
  if (user) {
    const access_token = generateAccessToken(user);
    const refresh_token = generateRefreshToken(user);
    refresh_tokens.push(refresh_token);
    return { access_token: access_token, refresh_token: refresh_token };
  }
  return null;
};

const verifyJWT = (access_token) =>
  jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
    if (err) return null;
    return token.username;
  });

const getRefreshToken = (refresh_token) => {
  if (!refresh_tokens.includes(refresh_token)) return null;
  return jwt.verify(
    refresh_token,
    process.env.REFRESH_TOKEN_SECRET,
    (err, token) => {
      if (err) return null;
      return generateAccessToken(token.username);
    }
  );
};

module.exports = { authenticateUser, verifyJWT, getRefreshToken };
